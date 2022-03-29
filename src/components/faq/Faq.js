import { Accordion, Button } from 'react-bootstrap';
import "./Faq.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faQ } from '@fortawesome/free-solid-svg-icons'
import UpdateModal from './UpdateModal';
import AddModal from './AddModal';
import { useEffect, useRef, useState } from 'react';
import ViewRequestsModal from './ViewRequestModal';
import axios from 'axios';
import { WEB_API_URL } from '../../constants';
import { getDefaultNormalizer } from '@testing-library/react';
function Faq(props) {
    const [faqData, setFaq] = useState([]);
    const [updateModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addModal, setAdd] = useState(false);
    const handleAddClose = () => setAdd(false);
    const handleAddShow = () => setAdd(true);
    const [viewModal, setView] = useState(false);
    const handleViewClose = () => {
        getData();
        setView(false);
    }
    const handleViewShow = () => setView(true);
    const initialMount = useRef(true);
    const getData = () => {
        axios.get(WEB_API_URL + '/faq').then(res => {
            console.log(111, res);
            setFaq(res.data.data);
        }).catch(err => {
            console.log(err)
        });
    }
    useEffect(() => {
        if (initialMount.current) {
            getData();
            initialMount.current = false;
        }
    });


    const [data, setdata] = useState({
        "question": "",
        "answer": ""
    });
    const editFAQ = _ => {
        setdata(_);
        handleShow();
    }

    const modifyData = (faq) => {
        let modifiedFaq={question:faq.question,answer:faq.answer}
        if (props.role == 'admin') {
            axios.put(WEB_API_URL + '/faq/'+faq.id, modifiedFaq).then(_ => {
                getData();
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            let newFaq = { oldAnswer:faq.oldAnswer,newAnswer:faq.newAnswer,newQuestion: faq.question, newAnswer: faq.answer,faqId:faq.id, type: 'update' }
            axios.post(WEB_API_URL + '/faq/create-request', newFaq).then(_ => {

            }).catch(err => {
                console.log(err);
            })
        }
    }

    const addData = (faq) => {
        if (props.role == 'admin') {
            axios.post(WEB_API_URL + '/faq', faq).then(_ => {
                getData();
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            let newFaq = { newQuestion: faq.question, newAnswer: faq.answer, type: 'add' }
            axios.post(WEB_API_URL + '/faq/create-request', newFaq).then(_ => {

            }).catch(err => {
                console.log(err);
            })
        }
    }

const deleteData = (faq) => {
    if (props.role == 'admin') {
        axios.delete(WEB_API_URL + '/faq/'+faq._id).then(_ => {
            getData();
        }).catch(err => {
            console.log(err);
        })
    }
    else {
        let delFaq = { oldQuestion: faq.question, oldAnswer: faq.answer, type: 'delete', faqId:faq._id }
        axios.post(WEB_API_URL + '/faq/create-request', delFaq).then(_ => {
        }).catch(err => {
            console.log(err);
        })
    }
}
return (
    <>
        <div className='faqContainer'>
            <span className='faq-heading'>Frequenly asked questions</span>
            {props.editMode && props.role == 'admin' && <div className='btn-position'>
                <Button variant="secondary" className='btn-position-button' onClick={handleViewShow}>View Requests</Button>
            </div>}
            <UpdateModal show={updateModal} close={handleClose} data={data} role={props.role} delete={deleteData} update={modifyData} />
            <AddModal show={addModal} close={handleAddClose} role={props.role} add={addData} />
            <ViewRequestsModal show={viewModal} close={handleViewClose} />
            <Accordion defaultActiveKey="0">
                {faqData.map((_, index) => {
                    return <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header>{props.editMode && <span className="edit-icon" title="Edit" onClick={() => editFAQ(_)}><FontAwesomeIcon icon={faPenToSquare} /></span>}  <span>Q {index + 1}. {_.question}</span>
                        </Accordion.Header>
                        <Accordion.Body>{_.answer}</Accordion.Body>

                    </Accordion.Item>
                })}
            </Accordion>
            {props.editMode && <div className='btn-position mt-3'><Button variant="primary" className='btn-position-mt-3' onClick={handleAddShow}>  Add FAQ</Button></div>}


        </div>
    </>
);
}

export default Faq; 