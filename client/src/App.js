import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
function App() {
  return (
    <Routes>
        <Route path='landing' element={<Landing />} />
        <Route path='login' element={<Login />} />
    </Routes>

  );
}

export default App;
