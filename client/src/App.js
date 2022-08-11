import MainDashboard from './components/MainDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from "./components/FrontPage";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PasswordResetPage from './components/PasswordResetPage';
import SendPasswordResetEmail from './components/SendPasswordResetEmail';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit-core.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';

function App() {
  UIkit.use(Icons);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<FrontPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password-email" element={<SendPasswordResetEmail />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
