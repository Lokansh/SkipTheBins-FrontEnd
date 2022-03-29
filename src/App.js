import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Faq from "./components/faq/Faq";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
import ContactUs from "./components/contactUs/ContactUs";
import SubmitQueryForm from "./components/contactUs/SubmitQueryForm";
import AdminDisplayQueries from "./components/contactUs/AdminDisplayQueries";
import AdminModifyVendors from "./components/contactUs/AdminModifyVendors";
import UserListingAdmin from "./components/UserListingAdmin/UserListingAdmin";
import VendorListingAdmin from "./components/VendorListingAdmin/VendorListingAdmin";
import RewardListingAdmin from "./components/RewardListingAdmin/RewardListingAdmin";

// import AdminHeader from "./components/AdminHeader/AdminHeader";

function App() {
    return (
        <div>
            {/*<AdminHeader/>*/}
            <Header/>
            <div className="m-4 body-container">
                <Router>
                    <Routes>
                        <Route
                            path="/faq"
                            exact
                            element={<Faq editMode={false} role="user"/>}
                        />
                        <Route
                            path="/faq-vendor"
                            element={<Faq editMode={true} role="vendor"/>}
                        />
                        <Route
                            path="/faq-admin"
                            exact
                            element={<Faq editMode={true} role="admin"/>}
                        />
                        <Route path="/user/pickups">
                            <Route
                                path="/user/pickups/schedule"
                                element={<SchedulePickup/>}
                            />
                            <Route
                                path="/user/pickups/confirm"
                                element={<ScheduleConfirm/>}
                            />
                            <Route path="/user/pickups/view" element={<ViewPickup/>}/>
                            <Route path="/user/pickups/edit" element={<EditPickup/>}/>
                            <Route
                                path="/user/pickups/cancel"
                                element={<CancelPickup/>}
                            />
                            <Route index element={<PickupHomeUser/>}/>
                        </Route>
                        <Route path="/vendor/pickups">
                            <Route
                                path="/vendor/pickups/schedule"
                                element={<CreateSchedule/>}
                            />
                            <Route
                                path="/vendor/pickups/confirm"
                                element={<ConfirmSchedule/>}
                            />
                            <Route
                                path="/vendor/pickups/view"
                                element={<ViewSchedule/>}
                            />
                            <Route
                                path="/vendor/pickups/edit"
                                element={<EditSchedule/>}
                            />
                            <Route
                                path="/vendor/pickups/delete"
                                element={<DeleteSchedule/>}
                            />
                            <Route index element={<PickupHomeVendor/>}/>
                        </Route>
                        <Route path="/contactus">
                            {/* <Route path="/submitquery" element={<SubmitQueryForm />}></Route> */}
                            <Route index element={<ContactUs/>}/>
                        </Route>
                        <Route
                            path="/contactus/submitquery"
                            element={<SubmitQueryForm/>}
                        />
                        <Route
                            path="/contactus/viewqueries"
                            element={<AdminDisplayQueries/>}
                        />
                        <Route
                            path="/contactus/modifyvendors"
                            element={<AdminModifyVendors/>}
                        />
                        <Route path='/user-dashboard' exact element={<UserListingAdmin/>}/>
                        <Route path='/vendor-dashboard' exact element={<VendorListingAdmin/>}/>
                        <Route path='/reward-dashboard' exact element={<RewardListingAdmin/>}/>
                    </Routes>
                </Router>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
