import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Currencies from './Currencies.jsx'
import Loader from './Loader.jsx'


function App() {


  return (
    <>
      <BrowserRouter>
        <h1>CurrentCurrency</h1>
        <Currencies />
      </BrowserRouter>

    </>
  )
}

export default App
