import "./RewardListingAdmin.css"
import {useEffect, useState} from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import StatusDisplay from "../StatusDisplay/StatusDisplay";
import {WEB_API_URL} from "../../constants";

const RewardListingAdmin = () => {

    const [rewardData, setRewardData] = useState([]);
    const getRewardData = async () => {
        const config = {
            method: 'get',
            url: WEB_API_URL + '/admin/get-all-rewards'
        };
        axios(config)
            .then(function (response) {
                setRewardData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const columns = [
        { dataField: "rewardId", text: "Reward ID"},
        { dataField: "vendorName", text: "Vendor Name"},
        { dataField: "userCount", text: "User Count"},
        { dataField: "status", text: "Status", formatter: (cellContent, row) => ( <StatusDisplay status={row.status} />)},
    ]

    const CaptionElement = () => <h3 style={{ textAlign: 'center', color: '#495057', padding: '10px' }}>Reward Dashboard</h3>;

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
