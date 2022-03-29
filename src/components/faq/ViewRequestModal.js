import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { WEB_API_URL } from '../../constants';
import './ViewRequestModal.css';
function ViewRequestsModal(props) {
  const [requestCount, setCount] = useState(0);
  const [requests, setrequests] = useState([]);
  const initialMount = useRef(true);

  const getData = () => {
    axios.get(WEB_API_URL + '/faq/requests').then(res => {
      setCount(res.data.data.length)
      setrequests(res.data.data);
    }).catch(err => {
      console.log(err)
    });
  }
  const approve = (req) => {
    axios.post(WEB_API_URL + '/faq/approve-request', req).then(_ => {
      getData();
    }).catch(err => {
      console.log(err);
    })
  }
  const deny = (id) => {
    axios.delete(WEB_API_URL + '/faq/deny-request/' + id).then(_ => {
      getData();
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    if (initialMount.current) {
      getData();
      initialMount.current = false;
    }
  });

  return (
    <Modal show={props.show} onHide={props.close} onEnter={getData}>
      <Modal.Header closeButton>
        <Modal.Title>FAQ Requests</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {requestCount == 0 &&
          <span> No Requests found!!
          </span>}
        {requestCount != 0 &&
          <ul className="list-group">
            {requests.map((req, index) =>
              <li className="list-group-item" key={index}>
                <div className="row">
                  <div className="col-7">
                    <div>
                      <b>Author : {req.author}</b>
                    </div>
                    <div><b>Type : {req.type}</b></div>
                  </div>
                  <div className="col-5 btn-position">
                    <Button variant="primary" className='mx-2 btn-sm' onClick={() => approve(req)}>Approve</Button>
                    <Button variant="danger" className='mx-2 btn-sm' onClick={() => deny(req._id)}>Deny</Button>
                  </div>
                </div>
                {req.type == 'update' && <>
                  <div><b>Old Question :</b> {req.oldQuestion}</div>
                  <div><b>New Question :</b> {req.newQuestion}</div>
                  <div><b>Old Answer :</b> {req.oldAnswer}</div>
                  <div><b>New Answer :</b> {req.newAnswer}</div>
                </>}
                {req.type == 'add' && <>
                  <div><b>Question :</b> {req.newQuestion}</div>
                  <div><b>Answer :</b> {req.newAnswer}</div>
                </>}
                {req.type == 'delete' && <>
                  <div><b>Question :</b> {req.oldQuestion}</div>
                  <div><b>Answer :</b> {req.oldAnswer}</div>
                </>}

              </li>
            )}
          </ul>

        }
      </Modal.Body>
    </Modal>


  );
}

export default ViewRequestsModal;

