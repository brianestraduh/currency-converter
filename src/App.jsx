import { BrowserRouter } from 'react-router-dom'
import useFetch from "./useFetch.js"
import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [countryCurrency, setCountryCurrency] = useState([])

  const fetch = useFetch('https://v6.exchangerate-api.com/v6/b560af4e412f93257f414644')

 useEffect(() => {
    fetch.get('/codes')
    .then(data => {
      console.log(data.supported_codes)
      setCountryCurrency(data.supported_codes)
    })
}, [])

  return (
    <>
      <BrowserRouter>
        <h1>React App</h1>
      </BrowserRouter>

    </>
  )
}

export default App
