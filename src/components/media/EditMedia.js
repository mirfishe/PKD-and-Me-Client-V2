import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";

const EditMedia = (props) => {

    const componentName = "EditMedia.js";

    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [userResultsFound, setUserResultsFound] = useState(null);

    const [txtEmail, setTxtEmail] = useState("");

    const [errEmail, setErrEmail] = useState("");


    const submitForm = () => {
        // console.log(componentName, "submitForm");

        

    };


    const toggle = () => {
        setModal(!modal);
    };

    return(
        <React.Fragment>
        <Button outline size="sm" color="info" onClick={toggle}>Open</Button>
        <Modal isOpen={modal} toggle={toggle} size="md">
           <ModalHeader toggle={toggle}>Form</ModalHeader>
           <ModalBody>
           <Form>
           <FormGroup>
               {message !== "" ? <Alert color="info">{message}</Alert> : null}
               {errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
           </FormGroup>
           <FormGroup>

               <Label for="txtEmail">Email Address</Label>
               <Input id="txtEmail" label="Email Address" value={txtEmail} onChange={(event) => {/*console.log(event.target.value);*/ setTxtEmail(event.target.value);}} />
               {errEmail !== "" ? <Alert color="danger">{errEmail}</Alert> : null}

           </FormGroup>

           <ModalFooter>
            <Button outline size="lg" color="primary" onClick={submitForm}>Submit</Button>
            <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
           </ModalFooter>
           </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default EditMedia;
