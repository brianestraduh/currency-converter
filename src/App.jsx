import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Currencies from './Currencies.jsx'
import ResultsPage from './ResultsPage.jsx'
import Loader from './Loader.jsx'


function App() {


  return (
    <>
      <BrowserRouter>
        <h1>CurrentCurrency</h1>
        <Routes>
          <Route path="/" element={<Currencies />}></Route>
          <Route path="/:baseCurrCode/:targetCurrCode" element={<ResultsPage />}></Route> 
        </Routes>
        
      </BrowserRouter>

    </>
  )
}

export default App
