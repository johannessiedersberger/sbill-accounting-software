import './App.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import MainDashboard from './components/MainDashboard';
import { BrowserRouter, HashRouter, Route, Router, Routes, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
