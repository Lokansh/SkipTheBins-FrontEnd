import "./VendorListingAdmin.css"
import {useEffect, useState} from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import StatusDisplay from "../StatusDisplay/StatusDisplay";
import {WEB_API_URL} from "../../constants";

const VendorListingAdmin = () => {

    const [vendorData, setVendorData] = useState([]);
    const getVendorData = async () => {
        const config = {
            method: 'get',
            url: WEB_API_URL + '/admin/get-all-users'
        };
        axios(config)
            .then(function (response) {
                setVendorData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const finalVendorData = vendorData.filter((user) => user.role === "vendor")

    const columns = [
        { dataField: "organizationName", text: "Organization Name"},
        { dataField: "email", text: "Email"},
        { dataField: "mobileNumber", text: "Contact No"},
        { dataField: "status", text: "Status", formatter: (cellContent, row) => ( <StatusDisplay status={row.isApprovedByAdminIfVendorRole} />)},
    ]

    const CaptionElement = () => <h3 style={{ textAlign: 'center', color: '#495057', padding: '10px' }}>Vendor Dashboard</h3>;

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
