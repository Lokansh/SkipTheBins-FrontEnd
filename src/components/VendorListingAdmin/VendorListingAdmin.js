/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

import "./VendorListingAdmin.css"
import { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import StatusDisplay from "../StatusDisplay/StatusDisplay";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import API from "../../api";


const VendorListingAdmin = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const [vendorData, setVendorData] = useState([]);
    const getVendorData = async () => {
        API.get('/admin/get-all-users')
            .then(function (response) {
                setVendorData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const finalVendorData = vendorData.filter((user) => user.role === "vendor")

    const columns = [
        { dataField: "organizationName", text: "Organization Name" },
        { dataField: "email", text: "Email" },
        { dataField: "mobileNumber", text: "Contact No" },
        { dataField: "status", text: "Status", formatter: (cellContent, row) => (<StatusDisplay status={row.isApprovedByAdminIfVendorRole} />) },
    ]

    const CaptionElement = () => <h3 style={{ textAlign: 'center', color: '#495057', padding: '10px' }}>Vendor Dashboard</h3>;


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
        getVendorData();
    }, []);
    return (
        <BootstrapTable
            classes="table"
            keyField="name"
            data={finalVendorData}
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

export default VendorListingAdmin;
