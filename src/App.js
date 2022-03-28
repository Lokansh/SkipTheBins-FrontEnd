import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Faq from './components/faq/Faq';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHeader from "./components/AdminHeader/AdminHeader";
import UserListingAdmin from "./components/UserListingAdmin/UserListingAdmin";
import VendorListingAdmin from "./components/VendorListingAdmin/VendorListingAdmin";
import RewardListingAdmin from "./components/RewardListingAdmin/RewardListingAdmin";

function App() {
  return (
    <div>
      <AdminHeader />
      <div className="m-4 body-container">
      <Router>
      <Routes>
        <Route path='/' exact element={<Faq editMode={true} />} ></Route>
        <Route path='/user-dashboard' exact element={<UserListingAdmin />} ></Route>
        <Route path='/vendor-dashboard' exact element={<VendorListingAdmin />} ></Route>
        <Route path='/reward-dashboard' exact element={<RewardListingAdmin />} ></Route>
      </Routes>
    </Router>  
      </div>
      <Footer />
    </div>
  );
}

export default App;
