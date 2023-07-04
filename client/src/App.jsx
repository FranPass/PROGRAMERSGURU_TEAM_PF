import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './components/views/HomePage/HomePage';
import LandingPage from './components/views/LandingPage/LandingPage';
import CoursePage from './components/views/CoursePage/CoursePage';
import NavBar from './components/bars/navBar/navBar';
import Perfil from './components/views/Perfil/Perfil';
import Compras from './components/views/Compras/Compras';


function App () {

  const navigate = useNavigate();
  const location = useLocation().pathname;


  return (
    <div>
      {
        location !== "/" && <NavBar/>
      }
      <Routes>
        <Route path="/" element = {<LandingPage/>} />
        <Route path="/HomePage" element = {<HomePage/>} />
        <Route path="/CoursePage" element = {<CoursePage/>} /> 
        <Route path="/Profile" element = {<Perfil/>} />
        <Route path="/Compras" element = {<Compras/>} />
      </Routes>
    </div>
  )
}

export default App;
