import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import Register from './pages/Register';
import ExperienceDetail from './pages/ExperienceDetail';
import ErrorPage from './pages/ErrorPage';
import Backoffice from './pages/Dashboard/Backoffice';
import SearchResult from './pages/SearchResult';
// import ProtectedRoute from './middlewares/ProtectedRoute';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/experiences/:experienceId" element={<ExperienceDetail />} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/user/profile" element={<UserPage/>}/>
          <Route path="/backoffice" element={<Backoffice/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
