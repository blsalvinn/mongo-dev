import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';


function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='landing' element={<Landing />} />


        <Route path="login" element={<Auth authRouter='login' />} />
        <Route path="register" element={<Auth authRouter='register' />} />


        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
