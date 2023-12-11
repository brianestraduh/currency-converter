import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Currencies from './Currencies.jsx'
import ResultsPage from './ResultsPage.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Currencies />}></Route>
          <Route path="/:baseCurrCode/:targetCurrCode" element={<ResultsPage />}></Route> 
        </Routes>
        <Footer></Footer>
      </BrowserRouter>

    </>
  )
}

export default App
