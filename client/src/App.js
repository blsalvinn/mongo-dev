import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Auth from './views/Auth';


function App() {
  return (
    <Routes>
      <Route path='landing' element={<Landing />} />
      {/* <Route
        path='login'
        render={props => (
          <Auth routeProps={props} authRouter='login' />
        )}
      />
      <Route
        path='register'
        render={props => <Auth {...props} authRouter='register' />}
      /> */}
      <Route path="login" element={<Auth authRouter='login' />} />
      <Route path="register" element={<Auth authRouter='register' />} />
    </Routes>

  );
}

export default App;
