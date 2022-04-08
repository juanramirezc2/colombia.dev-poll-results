import './App.css';
import Papa from 'papaparse';
import {
  SALARY_COLUMN,
  TITULO_LINKEDIN_COLUMN,
  EXPERIENCE_COLUMN,
  SENIORITY_COLUMN,
  LANGUAGE_COLUMN,
  JOBSITES_COLUMN,
  COMPANYTYPE_COLUMN,
  COMPANYAGE_COLUMN,
  DOB_COLUMN,
} from './contants';
import { useState, useEffect } from 'react';

function App() {
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (filteredData.length === 0) {
      Papa.parse(
        `https://raw.githubusercontent.com/colombia-dev/data/master/salaries/2021/raw.csv`,
        {
          download: true,
          header: true,
          complete: function (results) {
            const data = results.data
              .filter(
                (d) =>
                  d[
                    `¿A usted le pagan en pesos colombianos (COP) o dólares (USD)?`
                  ] !== 'Pesos' && d[SALARY_COLUMN] !== ''
              )
              .sort((a, b) =>
                a[TITULO_LINKEDIN_COLUMN].localeCompare(
                  b[TITULO_LINKEDIN_COLUMN]
                )
              );
            console.log(data);
            setFilteredData(data);
          },
        }
      );
    }
  }, [filteredData.length]);

  return (
    <div className="App">
      <h1>Salarios en USD</h1>
      <table style={{ margin: '0 auto' }} border="1px solid black">
        <thead>
          <tr>
            <th>Salario Mensual(USD)</th>
            <th>Titulo en Linkedin</th>
            <th>Experiencia</th>
            <th>Seniority</th>
            <th>Languaje mas usado</th>
            <th>Sitio web trabajos</th>
            <th>Tipo de empresa</th>
            <th>Edad de la compania</th>
            <th>Fecha de nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((d) => {
            return (
              <tr>
                <td>{d[SALARY_COLUMN] / 12}</td>
                <td>{d[TITULO_LINKEDIN_COLUMN]}</td>
                <td>{d[EXPERIENCE_COLUMN]}</td>
                <td>{d[SENIORITY_COLUMN]}</td>
                <td>{d[LANGUAGE_COLUMN]}</td>
                <td>{d[JOBSITES_COLUMN]}</td>
                <td>{d[COMPANYTYPE_COLUMN]}</td>
                <td>{d[COMPANYAGE_COLUMN]}</td>
                <td>{d[DOB_COLUMN]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
