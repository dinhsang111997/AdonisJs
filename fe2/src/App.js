// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Register />
//       <Login />
//     </div>
//   );
// }

// export default App;

import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Navbar from './components/sidebar/Navbar';
import Register from './components/signup/Register';

function App() {
  return (
    <Navbar />
    /* <Routes>

      <Route path="/register" exact element={<Register />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes> */
  );
}

export default App;
