import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function UpdateModal(props) {
  const [question, setQuestion] = useState(props.data.question);
  const [answer, setAnswer] = useState(props.data.answer);
  const [questionToggled, setQuestionToggled] = useState(false);
  const [answerToggled, setAnswerToggled] = useState(false);
  const [questionValid, setQuestionValid] = useState(true);
  const [answerValid, setAnswerValid] = useState(true);
  const initialMount = useRef(true);
  const validate = () => {
    question.trim() != "" ? setQuestionValid(true) : setQuestionValid(false);
    answer.trim() != "" ? setAnswerValid(true) : setAnswerValid(false);
  }
  useEffect(() => {
    if (initialMount.current) {
      setQuestion(props.data.question);
      setAnswer(props.data.answer);
      initialMount.current = false;
    }
    else {
      validate();
    }

  });
  const initialize = () => {
    setQuestion(props.data.question);
    setAnswer(props.data.answer);
  }
  const update = () => {
    if (questionValid && answerValid) {
      props.update({ question, answer, id:props.data.id });
      props.close();
    }
  }
  return (
    <Modal show={props.show} onHide={props.close} onEnter={initialize}>
      <Modal.Header closeButton>
        <Modal.Title>Edit FAQ</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="mt-4">

          <div className="form-group mt-2 form-inline">
            <label >Question</label>
            <input type="text" className="form-control" value={question} name="question"
              onChange={(e) => { setQuestionToggled(true); setQuestion(e.target.value) }}
              id="question" placeholder="Enter Question" />
            {!questionValid && questionToggled && <span className="text-danger">Question cant be empty</span>}
          </div>
          <div className="form-group mt-2">
            <label>Answer</label>
            <input type="text-area" className="form-control" value={answer} name="answer" id="answer"
              onChange={(e) => { setAnswerToggled(true); setAnswer(e.target.value) }}
              placeholder="Enter Answer" />
            {!answerValid && answerToggled && <span className="text-danger">Answer cant be empty</span>}
          </div>

        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={(e) => { props.delete(props.data); props.close() }}>Delete</Button>
        <Button variant="primary" onClick={update}>Update</Button>
      </Modal.Footer>
    </Modal>

  );
}

export default UpdateModal;

