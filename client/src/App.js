import MainDashboard from './components/MainDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from "./components/FrontPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/" element={<FrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
