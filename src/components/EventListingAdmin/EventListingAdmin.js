/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

import "./EventListingAdmin.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import StatusDisplay from "../StatusDisplay/StatusDisplay";
import {WEB_API_URL} from '../../constants';
import {Button} from "react-bootstrap";

const EventListingAdmin = () => {

    const [userData, setUserData] = useState([]);
    const getUserData = async () => {
        const config = {
            method: 'get',
            url: WEB_API_URL + '/admin/get-all-users'
        };
        axios(config)
            .then(function (response) {
                setUserData(response.data.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const finalUserData = userData.filter((user) => user.role === "normaluser")

    const columns = [
        {dataField: "firstName", text: "First Name"},
        {dataField: "lastName", text: "Last Name"},
        {dataField: "email", text: "Email"},
        {dataField: "mobileNumber", text: "Contact No"},
        {
            dataField: "status",
            text: "Status",
            formatter: (cellContent, row) => (<StatusDisplay status={row.isVerified}/>)
        },
    ]

    const CaptionElement = () => <h3 style={{textAlign: 'center', color: '#495057', padding: '10px'}}>Event
        Dashboard</h3>;

    useEffect(() => {
        getUserData();
    }, []);
    return (
        <>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "right"
            }}>
                <Button className="cardButton" variant="success">
                    Add
                </Button>
            </div>

            <BootstrapTable
                classes="table"
                keyField="name"
                data={finalUserData}
                caption={<CaptionElement/>}
                columns={columns}
                pagination={paginationFactory()}
                noDataIndication="No Data Available"
                striped
                hover
                condensed
            />
        </>

    );
}

export default EventListingAdmin;
