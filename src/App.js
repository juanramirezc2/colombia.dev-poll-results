import './App.css';
import Papa from 'papaparse';
import { useState, useEffect } from 'react';
const SALARY_COLUMN = "¿Cuánto es su remuneración en su ACTUAL trabajo?Salario ANUAL Base - Su salario mensual * 12 (sin incluir bono, o primas, ni deducir impuestos). Si usted gana 3 millones de pesos al mes, entonces su remuneración base es 36,000,000 de pesos al año si gana 3000 dolares, es 36000.Bonos ANUAL - No incluye su salario base. si ud gana 36 millones al año, y a fin de año clasifica a un bono de 10% entonces su remuneración adicional es de 3,600,000 pesos.Acciones - Conocido también como strike price, es decir el precio que le dieron al firmar la oferta y no el valor actual. Si tiene varios grants, use el precio del grant con más acciones."
const TITULO_LINKEDIN_COLUMN = "¿Cuál es su título en la empresa en la que trabaja actualmente?¿Por ejemplo que escribe usted en LinkedIn? Software Engineer, Frontend Engineer."

const EXPERIENCE_COLUMN = "¿Cuántos años de experiencia en desarrollo de software profesional tiene?Incluyendo prácticas profesionales y consultorías"

const LANGUAGE_COLUMN = `¿En cuál de los siguientes lenguajes de programación ocupa la mayor parte de su tiempo laboral?Listado extraído de GitHut 2.0Si su respuesta es "otro" por favor use el nombre encontrado en List of programming languages in Wikipedia`

const JOBSITES_COLUMN = `¿En qué sitio web busca oportunidades laborales principalmente?`

const SENIORITY_COLUMN = "¿Cómo considera su seniority?"

const COMPANYTYPE_COLUMN = `¿Para qué tipo de empresa trabaja?Se considera como empresa colombiana a las empresas que fueron constituidas en Colombia primero, o que los fundadores son de Colombia. Las empresas con sede en Colombia, pero nacidas en otro país no cuentan como empresas colombianas.`

const COMPANYAGE_COLUMN = `¿Cuántos años de fundada tiene la empresa para la que trabaja?`

const DOB_COLUMN = "¿En qué año nació?"

function App() {
  const [filteredData,setFilteredData] =  useState([])
  useEffect(() => {
    if(filteredData.length === 0){

      Papa.parse(`https://raw.githubusercontent.com/colombia-dev/data/master/salaries/2021/raw.csv`, {
        download: true,
        header: true,
        complete: function(results) {
          const data = results.data.filter(d => d[`¿A usted le pagan en pesos colombianos (COP) o dólares (USD)?`] !== "Pesos" && d[SALARY_COLUMN] !== "").sort((a, b) => a[TITULO_LINKEDIN_COLUMN].localeCompare(b[TITULO_LINKEDIN_COLUMN]));
          console.log(data)
          setFilteredData(data)

          }
  });
    }
  }, [filteredData.length])

  return (
    <div className="App">
      <h1>Salarios en USD</h1>
      <table  style={{margin: '0 auto'}} border="1px solid black">
        <thead>
          <tr>
            <th>Salario Mensual</th>
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
          {filteredData.map(d => {
            return (
            <tr>
              <td>{d[SALARY_COLUMN]/12}</td>
              <td>{d[TITULO_LINKEDIN_COLUMN]}</td>
              <td>{d[EXPERIENCE_COLUMN]}</td>
              <td>{d[SENIORITY_COLUMN]}</td>
              <td>{d[LANGUAGE_COLUMN]}</td>
              <td>{d[JOBSITES_COLUMN]}</td>
              <td>{d[COMPANYTYPE_COLUMN]}</td>
              <td>{d[COMPANYAGE_COLUMN]}</td>
              <td>{d[DOB_COLUMN]}</td>
            </tr>
            )})
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
