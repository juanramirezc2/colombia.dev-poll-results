import React,{useState} from 'react';
import classnames from 'classnames';
// you should import `lodash` as a whole module
import {debounce} from 'lodash';
import axios from 'axios';

const ITEMS_API_URL = 'https://example.com/api/items';
const DEBOUNCE_DELAY = 500;



const searchFunction = (
  queryParam,
  setResults,
  setIsLoading
) => {
  axios
    .get(ITEMS_API_URL, {
      params: {
        q: queryParam
      }
    })
    .then(({ data }) => {
      setIsLoading(false);
      setResults(data);
    });
};

// the exported component can be either a function or a class
const debouncedSearch = debounce(searchFunction, DEBOUNCE_DELAY);

export default function Autocomplete({onSelectItem}) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = (v) => {
    const search = debouncedSearch;
    search(v, setResults, setIsLoading);
  };

  return (
    <div className="wrapper">
      <div  className={`${isLoading? 'is-loading':''} control`} >
        <input type="text"  
          onChange={(e) =>{

    setIsLoading(true);
onSearch(e.target.value)
          } }
          className="input"
          />
      </div>
      {results.length != 0 && !isLoading && <div className="list is-hoverable" >
        {results.map((r) => (
          <a className="list-item" key={r} onClick={()=>onSelectItem(r)}>
            {r}
          </a>
        ))}
      </div> }
    </div>
  );
}

