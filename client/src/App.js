import MainDashboard from './components/dashboard/MainDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from "./components/frontpages/FrontPage";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import LoginPage from './components/login/LoginPage';
import SignUpPage from './components/login/SignUpPage';
import PasswordResetPage from './components/login/PasswordResetPage';
import SendPasswordResetEmail from './components/login/SendPasswordResetEmail';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit-core.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import FeaturesPage from './components/frontpages/FeaturesPage';
import PricingPage from './components/frontpages/PricingPage';
import AccountActivatedPage from './components/login/AccountActivatedPage';
import CheckEmailPage from './components/login/CheckEmailPage';
import InvoicePage from './components/invoices/InvoicePage';
import InvoiceList from './components/invoices/InvoiceList';

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
        <Route path="/reset-password/:userId/:token" element={<PasswordResetPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path='/account-activated/:uniqueString' element={<AccountActivatedPage />} />
        <Route path='/check-email' element={<CheckEmailPage />} />
        <Route path='/invoices' element={<InvoiceList />} />
        <Route path='/invoice' element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
