import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import EmployeeForm from './pages/EmployeeForm';
import Home from './pages/Home';
import AllRequests from './pages/AllRequests';

function App() {
  return (

    <Router>

      <Routes  >
        <Route path="/" element={<Home />} />
        <Route path="/employee-request" element={<EmployeeForm />} />
        <Route path="/show-request" element={<AllRequests />} />

      </Routes>
    </Router>

  );
}

export default App;
