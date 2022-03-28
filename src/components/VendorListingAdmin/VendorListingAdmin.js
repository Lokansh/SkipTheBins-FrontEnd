import "./VendorListingAdmin.css"
import {useEffect, useState} from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import StatusDisplay from "../StatusDisplay/StatusDisplay";

const VendorListingAdmin = () => {

    const [vendorData, setVendorData] = useState([]);
    const getVendorData = async () => {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/admin/get-all-vendors'
        };
        axios(config)
            .then(function (response) {
                setVendorData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const columns = [
        { dataField: "vendorName", text: "Vendor Name"},
        { dataField: "email", text: "Email"},
        { dataField: "contact", text: "Contact No"},
        { dataField: "status", text: "Status", formatter: (cellContent, row) => ( <StatusDisplay status={row.status} />)},
    ]

    const CaptionElement = () => <h3 style={{ textAlign: 'center', color: '#495057', padding: '10px' }}>Vendor Dashboard</h3>;

    useEffect(() => {
        getVendorData();
    }, []);
    return (
        <BootstrapTable
            classes="table"
            keyField="name"
            data={vendorData}
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
