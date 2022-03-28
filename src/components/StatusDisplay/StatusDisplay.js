import "./StatusDisplay.css"

function StatusDisplay({status}) {
    if (status == 'Active') {
        return (
            <h5>
                <span className="label label-active"> Active </span>
            </h5>
        );
    } else if ( status === 'Inactive' ) {
        return (
            <h5>
                <span className="label label-inactive"> Inactive </span>
            </h5>
        );
    }
    else if ( status == 'Pending' ) {
        return (
            <h5>
                <span className="label label-pending"> Pending </span>
            </h5>
        );
    }

}

export default StatusDisplay;
