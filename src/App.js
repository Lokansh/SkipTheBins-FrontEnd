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

function App() {
  return (
    <div>
      <Header />
      <div className="m-4 body-container">
        <Router>
          <Routes>
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
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
