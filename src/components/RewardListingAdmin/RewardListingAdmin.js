/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

import "./RewardListingAdmin.css"
import { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import StatusDisplay from "../StatusDisplay/StatusDisplay";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api";

const RewardListingAdmin = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const [rewardData, setRewardData] = useState([]);
    const getRewardData = async () => {
        API.get('/admin/get-all-rewards')
            .then(function (response) {
                setRewardData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const columns = [
        { dataField: "rewardId", text: "Reward ID" },
        { dataField: "vendorName", text: "Vendor Name" },
        { dataField: "userCount", text: "User Count" },
        { dataField: "status", text: "Status", formatter: (cellContent, row) => (<StatusDisplay status={row.status} />) },
    ]

    const CaptionElement = () => <h3 style={{ textAlign: 'center', color: '#495057', padding: '10px' }}>Reward Dashboard</h3>;


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
        getRewardData();
    }, []);
    return (
        <BootstrapTable
            classes="table"
            keyField="name"
            data={rewardData}
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

export default RewardListingAdmin;
