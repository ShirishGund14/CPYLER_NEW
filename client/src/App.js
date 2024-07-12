import logo from './logo.svg';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { Routes,Route } from 'react-router-dom'; 
import Home from './Pages/Home';
import Compiler from './Pages/Compiler';
import AllCodes from './Pages/AllCodes';
import { ModalProvider } from './ContextAPI/ModalContext';
import { Toaster } from "react-hot-toast";
import Dashboard from './Pages/Dashboard';
import ProtectedPage from './Components/ProtectedPage';


function App() {
  return (
    <div className="App">
      <ModalProvider>
         <Toaster />
         <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/compiler' element={<Compiler/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/codes' element={<ProtectedPage><AllCodes/></ProtectedPage>}/>
          <Route path='/dashboard' element={<ProtectedPage><Dashboard/></ProtectedPage>}/>
          
          
          
         </Routes>
         
         </ModalProvider>
    </div>
  );
}

export default App;
