import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Currencies from './Currencies.jsx'
import ResultsPage from './ResultsPage.jsx'


function App() {


  return (
    <>
      <BrowserRouter>
      <nav>
        <div className='nav-container'>
          <div className='logo-title'>
            <img src="public/assets/logo-currency.svg" alt="logo" width="auto" height="40px" />
            <p className='company-logo'>CurrentCurrency</p>
          </div>
        </div>
        
        </nav>
        <Routes>
          <Route path="/" element={<Currencies />}></Route>
          <Route path="/:baseCurrCode/:targetCurrCode" element={<ResultsPage />}></Route> 
        </Routes>
        
      </BrowserRouter>

    </>
  )
}

export default App
