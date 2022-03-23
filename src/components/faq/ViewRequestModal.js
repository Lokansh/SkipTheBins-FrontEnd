import { useEffect, useRef, useState } from 'react';
import { Modal,Button } from 'react-bootstrap';

function ViewRequestsModal(props) {
   

    return (
        <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>FAQ Requests</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
         No Requests found!!
        </Modal.Body>
      
      </Modal>

    );
}

export default ViewRequestsModal;

