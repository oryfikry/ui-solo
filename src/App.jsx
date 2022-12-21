import React, {
  useState,
  useEffect
} from 'react';
import './App.css';

import { useParams } from "react-router-dom";
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] =  useState(true)
 // Get the entire query string
const hostUrl = window.location.host
const queryString = window.location.search; // "?param1=value1&param2=value2"
// Parse the query string to get the individual parameters
const params = new URLSearchParams(queryString);
const paramPage = params.get('pages'); // "value1"
// console.log(hostUrl+' browserUrl');
// console.log(paramPage+' param');

  async function getData(id){
    const url = 'http://192.168.27.2:3000/baca/'+id;

    axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setIsLoading(false)
        setData(response.data[0])
        // console.log(response.data[0])
        // do something with the response
      })
      .catch(error => {
        console.log(error);
        // handle the error
      });
  }
  useEffect(() => {
    getData(paramPage)

  }, []);

  console.log(hostUrl+"?pages="+(parseInt(paramPage)+1))
  if(isLoading){
      return <>Loading...</>
  }else{
    return(
      <div>
            <nav className="floating-menu">
              {/* <a href={hostUrl+"?pages="+(parseInt(paramPage)-1)}>Prev</a> */}
              <a href={"?pages="+(parseInt(paramPage)+1)}>Next</a>
            </nav>
        {
            data.url.map((e,i)=>{
              return <p key={i}> <img src={e} alt="" key={i}/> </p>
            })
  
        }
      </div>
    )
  }


  }
  export default App;