import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SubmitQueryForm() {
  useEffect(() => {});

  const nameRegex = /^[a-zA-Z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [query, setQuery] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [mobileErrorMsg, setMobileErrorMsg] = useState("");
  const [queryErrorMsg, setQueryErrorMsg] = useState("");
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isQuery, setIsQuery] = useState(false);
  const [isData, setIsData] = useState(false);

  const handleName = (e) => {
    if (e.target.value && !nameRegex.test(e.target.value)) {
      setNameErrorMsg(
        "Please provide name in correct alphabet only format (Eg. 'Dylan Williams')"
      );
      setIsName(false);
    } else {
      setIsData(true);
      setIsName(true);
      setNameErrorMsg("");
      //console.log(e.target.value);
      setName(e.target.value);
    }
  };
  const handleEmail = (e) => {
    if (e.target.value && !emailRegex.test(e.target.value)) {
      setEmailErrorMsg(
        "Please provide email in correct format (Eg. 'xyz@abc.com')"
      );
      setIsEmail(false);
    } else {
      setIsData(true);
      setIsEmail(true);
      setEmailErrorMsg("");
      //console.log(e.target.value);
      setEmail(e.target.value);
    }
  };
  const handleMobile = (e) => {
    if (e.target.value && !mobileRegex.test(e.target.value)) {
      setMobileErrorMsg(
        "Please provide mobile number in correct format (Eg. '+1-8087339090')"
      );
      setIsMobile(false);
    } else {
      setIsData(true);
      setIsMobile(true);
      setMobileErrorMsg("");
      //console.log(e.target.value);
      setMobile(e.target.value);
    }
  };
  const handleQuery = (e) => {
    if (!e.target.value) {
      setQueryErrorMsg("Please provide your query");
      setIsQuery(false);
    } else {
      setIsData(true);
      setIsQuery(true);
      setQueryErrorMsg("");
      //console.log(e.target.value);
      setQuery(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nameErrorMsg.length > 0 ||
      emailErrorMsg.length > 0 ||
      mobileErrorMsg.length > 0 ||
      queryErrorMsg.length > 0
    ) {
      alert("Please resolve error");
    } else if (!isName || !isEmail || !isMobile || !isQuery) {
      alert("Please fill data in all fields of the form");
    } else if (!isData) {
      alert("Please enter some data");
    } else {
      submitQueryApiCall();
    }
  };

  const submitQueryApiCall = () => {
    var newQueryObj = {
      name: name,
      email: email,
      mobile: mobile,
      query: query,
    };
    axios
      .post("http://localhost:8080/api/query/add", newQueryObj)
      .then((res) => {
        if (res.data.success) {
          setSubmitSuccess(true);
        } else {
          alert("Query not submitted");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleGoBack = (e) => {
    navigate("/");
  };

  return (
    <div>
      <span className="contact-heading">Contact Us</span>
      {!submitSuccess && (
        <div>
          <h3>Submit a query</h3>
          <h6>
            Facing an issue, please fill in the form below and we will get back
            to you.
          </h6>

          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                onChange={handleName}
              />
              <Form.Text style={{ color: "red" }}>
                {nameErrorMsg.length > 0 ? nameErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your e-mail address"
                onChange={handleEmail}
              />
              <Form.Text style={{ color: "red" }}>
                {emailErrorMsg.length > 0 ? emailErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your mobile number"
                onChange={handleMobile}
              />
              <Form.Text style={{ color: "red" }}>
                {mobileErrorMsg.length > 0 ? mobileErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="query">
              <Form.Label>Query</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Enter query..."
                onChange={handleQuery}
              />
              <Form.Text style={{ color: "red" }}>
                {queryErrorMsg.length > 0 ? queryErrorMsg : ""}
              </Form.Text>
            </Form.Group>
            <Button variant="success" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      )}
      {submitSuccess && (
        <div>
          <h6>
            Your query has been successfully submitted. We will get back to you
            within 2-3 working days.
          </h6>
          <div>
            <Button variant="primary" type="submit" onClick={handleGoBack}>
              Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmitQueryForm;
