/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

import "./UserListingAdmin.css"
import { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import StatusDisplay from "../StatusDisplay/StatusDisplay";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import API from "../../api";

const UserListingAdmin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const [userData, setUserData] = useState([]);

    const getUserData = async () => {
        API.get('/admin/get-all-users')
            .then(function (response) {
                setUserData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const finalUserData = userData.filter((user) => user.role === "normaluser")

    const columns = [
        { dataField: "firstName", text: "First Name" },
        { dataField: "lastName", text: "Last Name" },
        { dataField: "email", text: "Email" },
        { dataField: "mobileNumber", text: "Contact No" },
        { dataField: "status", text: "Status", formatter: (cellContent, row) => (<StatusDisplay status={row.isVerified} />) },
    ]

    const CaptionElement = () => <h3 style={{ textAlign: 'center', color: '#495057', padding: '10px' }}>User Dashboard</h3>;

    useEffect(() => {
        if (!user || user?.result?.role !== "admin") {
            toast.error("Please login to continue");
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [localStorage.getItem("profile")]);

    useEffect(() => {
        getUserData();
    }, []);
    return (

        <BootstrapTable
            classes="table"
            keyField="name"
            data={finalUserData}
            caption={<CaptionElement />}
            columns={columns}
            pagination={paginationFactory()}
            noDataIndication="No Data Available"
            striped
            hover
            condensed
        />

    );
}

export default UserListingAdmin;
