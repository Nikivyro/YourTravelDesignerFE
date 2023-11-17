import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './reducers/store';
import Home from './pages/Home';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import Register from './pages/Register';
import ExperienceDetail from './pages/ExperienceDetail';
import ErrorPage from './pages/ErrorPage';
import Backoffice from './pages/Dashboard/Backoffice';
import SearchResult from './pages/SearchResult';
import CityPage from './pages/CityPage';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setUser } from './reducers/authSlice';
import ProtectedRoute from './middlewares/ProtectedRoute';
import { useDispatch } from 'react-redux';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        dispatch(setUser(decodedToken));
      } catch (error) {
        console.error('Errore durante la decodifica del token:', error);
      }
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/user/login' element={<Login/>}/>
          <Route path='/user/register' element={<Register/>}/>
          <Route path="/experiences/:experienceId" element={<ExperienceDetail />} />
          <Route path="/city/:cityName" element={<CityPage />} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/backoffice" element={<Backoffice/>}/>
            <Route path="/user/profile" element={<UserPage />} />
          </Route>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
