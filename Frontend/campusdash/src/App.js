import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/auth/Signup'; 
import Signin from './components/auth/Signin';
import Marketplace from './components/Marketplace';
import Deliverysetup from './components/Deliverysetup';
import Ordersummary from './components/Ordersummary';
import EarnMoney from './components/EarnMoney';
function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth/signup' element={<Signup/>} />
        <Route path='/auth/signin' element={<Signin/>} />
        <Route path='/Marketplace' element={<Marketplace/>} />
        <Route path='/delivery-setup' element={<Deliverysetup/>} />
        <Route path='/order-summary' element={<Ordersummary/>} />
        <Route path='/earn-money' element={<EarnMoney/>} />
      </Routes>
    </div>
  );
}

export default App;
