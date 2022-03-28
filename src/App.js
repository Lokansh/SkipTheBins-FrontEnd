<<<<<<< HEAD
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Faq from "./components/faq/Faq";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PickupHomeUser from "./components/Pickups/User/PickupHomeUser";
import SchedulePickup from "./components/Pickups/User/SchedulePickup";
import ViewPickup from "./components/Pickups/User/ViewPickup";
import EditPickup from "./components/Pickups/User/EditPickup";
import CancelPickup from "./components/Pickups/User/CancelPickup";
import ScheduleConfirm from "./components/Pickups/User/ScheduleConfirm";

import PickupHomeVendor from "./components/Pickups/Vendor/PickupHomeVendor";
import CreateSchedule from "./components/Pickups/Vendor/CreateSchedule";
import ConfirmSchedule from "./components/Pickups/Vendor/ConfirmSchedule";
import ViewSchedule from "./components/Pickups/Vendor/ViewSchedule";
import DeleteSchedule from "./components/Pickups/Vendor/DeleteSchedule";
import EditSchedule from "./components/Pickups/Vendor/EditSchedule";
=======
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Faq from "./components/faq/Faq";
import ContactUs from "./components/contactUs/ContactUs";
import SubmitQueryForm from "./components/contactUs/SubmitQueryForm";
import AdminDisplayQueries from "./components/contactUs/AdminDisplayQueries";
import AdminModifyVendors from "./components/contactUs/AdminModifyVendors";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
>>>>>>> 3df3b7ed (static frontend)

function App() {
  return (
    <div>
      <Header />
      <div className="m-4 body-container">
        <Router>
          <Routes>
<<<<<<< HEAD
            <Route path='/faq' exact element={<Faq editMode={false} role='user' />} ></Route>
            <Route path='/faq-vendor'  element={<Faq editMode={true} role='vendor' />} ></Route>
            <Route path='/faq-admin' exact element={<Faq editMode={true} role='admin' />} ></Route>
            <Route path="/user/pickups">
              <Route
                path="/user/pickups/schedule"
                element={<SchedulePickup />}
              ></Route>
              <Route
                path="/user/pickups/confirm"
                element={<ScheduleConfirm />}
              ></Route>
              <Route path="/user/pickups/view" element={<ViewPickup />}></Route>
              <Route path="/user/pickups/edit" element={<EditPickup />}></Route>
              <Route
                path="/user/pickups/cancel"
                element={<CancelPickup />}
              ></Route>
              <Route index element={<PickupHomeUser />}></Route>
            </Route>
            <Route path="/vendor/pickups">
              <Route
                path="/vendor/pickups/schedule"
                element={<CreateSchedule />}
              ></Route>
              <Route
                path="/vendor/pickups/confirm"
                element={<ConfirmSchedule />}
              ></Route>
              <Route
                path="/vendor/pickups/view"
                element={<ViewSchedule />}
              ></Route>
              <Route
                path="/vendor/pickups/edit"
                element={<EditSchedule />}
              ></Route>
              <Route
                path="/vendor/pickups/delete"
                element={<DeleteSchedule />}
              ></Route>
              <Route index element={<PickupHomeVendor />}></Route>
            </Route>
=======
            <Route path="/faq" element={<Faq editMode={true} />}></Route>
            <Route path="/contactus">
              {/* <Route path="/submitquery" element={<SubmitQueryForm />}></Route> */}
              <Route index element={<ContactUs />}></Route>
            </Route>
            <Route
              path="/contactus/submitquery"
              element={<SubmitQueryForm />}
            ></Route>
            <Route
              path="/contactus/viewqueries"
              element={<AdminDisplayQueries />}
            ></Route>
            <Route
              path="/contactus/modifyvendors"
              element={<AdminModifyVendors />}
            ></Route>
>>>>>>> 3df3b7ed (static frontend)
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
