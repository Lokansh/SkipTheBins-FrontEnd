import faq from '../../assets/data/faq.json';
import { Accordion, Button } from 'react-bootstrap';
import "./Faq.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPenToSquare, faQ } from '@fortawesome/free-solid-svg-icons'
import UpdateModal from './UpdateModal';
import AddModal from './AddModal';
import { useEffect, useState } from 'react';
import ViewRequestsModal from './ViewRequestModal';

function Faq(props) {
    useEffect(() => {

    });
    const [faqData, setFaq] = useState(faq.data);
    const [updateModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addModal, setAdd] = useState(false);
    const handleAddClose = () => setAdd(false);
    const handleAddShow = () => setAdd(true);
    const [viewModal, setView] = useState(false);
    const handleViewClose = () => setView(false);
    const handleViewShow = () => setView(true);
    const [data, setdata] = useState({
        "type": "",
        "vendor": null,
        "question": "",
        "answer": ""
    });
    const editFAQ = _ => {
        setdata(_);
        handleShow();
    }
    const modifyData = (elem) => {
        console.log(elem);
        let newData = faqData.map(_ => {
            if (_.id == elem.id) {
                return { ..._, question: elem.question, answer: elem.answer };
            }
            return _
        });

        setFaq(newData);
    }

    const addData = (elem) => {
        let idArray = faqData.map(_ => {
            return _.id;
        });
        let max = Math.max(...idArray);
        setFaq([...faqData, { ...elem, id: max + 1 }]);
    }

    const deleteData = (elem) => {
        let newData = faqData.filter(_ => { return _.id != elem.id });
        setFaq([...newData]);
    }
    return (
        <>
            <div className='faqContainer'>
                <span className='faq-heading'>Frequenly asked questions</span>
                {props.editMode && <div className='btn-position'>
                    <Button variant="secondary" className='btn-position-button' onClick={handleViewShow}>View Requests</Button>
                </div>}
                <UpdateModal show={updateModal} close={handleClose} data={data} delete={deleteData} update={modifyData} />
                <AddModal show={addModal} close={handleAddClose} add={addData}/>
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