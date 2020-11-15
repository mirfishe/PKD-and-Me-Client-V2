import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import AppSettings from "../../app/environment";
import {emailRegExp} from "../../app/constants";
import {loadUserData} from "../../app/userSlice";

const EditUser = (props) => {

    // What if the user has deleted their account and wants to reupdateUser?
    // The database won't allow duplicate email addresses to be entered.

    const componentName = "EditUser.js";

    const dispatch = useDispatch();

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
    // const baseURL = useSelector(state => state.app.baseURL);
    const baseURL = AppSettings.baseURL;
    // console.log(componentName, "baseURL", baseURL);

    // const [user, setUser] = useState({});
    // const [userID, setUserID] = useState(null);
    const userID = useSelector(state => state.user.userID);
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [updatedBy, setUpdatedBy] = useState(null);
    // const [admin, setAdmin] = useState(false);
    const admin = useSelector(state => state.user.admin);
    // const [active, setActive] = useState(false);
    // const [sessionToken, setSessionToken] = useState(null);
    const sessionToken = useSelector(state => state.user.sessionToken);

    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [userRecordUpdated, setUserRecordUpdated] = useState(null);

    const [txtFirstName, setTxtFirstName] = useState(useSelector(state => state.user.firstName)); // process.env.REACT_APP_FIRSTNAME_DEFAULT
    const [txtLastName, setTxtLastName] = useState(useSelector(state => state.user.lastName)); // process.env.REACT_APP_LASTNAME_DEFAULT
    const [txtEmail, setTxtEmail] = useState(useSelector(state => state.user.email)); // process.env.REACT_APP_EMAIL_DEFAULT
    const [txtPassword, setTxtPassword] = useState(""); // process.env.REACT_APP_PASSWORD_DEFAULT

    const [errFirstName, setErrFirstName] = useState("");
    const [errLastName, setErrLastName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");

    const updateUser = (deleteUser) => {
        // console.log(componentName, "updateUser");

        setMessage("");
        setErrMessage("");
        setErrFirstName("");
        setErrLastName("");
        setErrEmail("");
        setErrPassword("");
        // setUser({});
        // setUserID(null);
        // setFirstName("");
        // setLastName("");
        // setEmail("");
        // setUpdatedBy(null);
        // setAdmin(false);
        // setActive(false);
        // setSessionToken("");

        let firstNameValidated = false;
        let lastNameValidated = false;
        let emailValidated = false;
        let passwordValidated = false;
        let formValidated = false;

        if (txtFirstName !== undefined && txtFirstName !== null) {
            if (txtFirstName.trim().length > 0) {
                firstNameValidated = true;
                setErrFirstName("");
                // console.log(componentName, "updateUser Valid First Name");
                // console.log(componentName, "updateUser firstNameValidated true", firstNameValidated);
            } else {
                firstNameValidated = false;
                setErrFirstName("Please enter a first name.");
                // console.log(componentName, "updateUser Invalid First Name");
                // console.log(componentName, "updateUser firstNameValidated false", firstNameValidated);
            };
        };

        if (txtLastName !== undefined && txtLastName !== null) {
            if (txtLastName.trim().length > 0) {
                lastNameValidated = true;
                setErrLastName("");
                // console.log(componentName, "updateUser Valid Last Name");
                // console.log(componentName, "updateUser lastNameValidated true", lastNameValidated);
            } else {
                lastNameValidated = false;
                setErrLastName("Please enter a last name.");
                // console.log(componentName, "updateUser Invalid Last Name");
                // console.log(componentName, "updateUser lastNameValidated false", lastNameValidated);
            };
        };

        if (txtEmail !== undefined && txtEmail !== null) {
            if (txtEmail.trim().match(emailRegExp) && txtEmail.trim().length > 0) {
            // if (txtEmail.trim().match(emailFormat) && txtEmail.trim().length > 0) {
                emailValidated = true;
                setErrEmail("");
                // console.log(componentName, "updateUser Valid Email Address");
                // console.log(componentName, "updateUser emailValidated true", emailValidated);
            } else {
                emailValidated = false;
                setErrEmail("Please enter a valid email address.");
                // console.log(componentName, "updateUser Invalid Email Address");
                // console.log(componentName, "updateUser emailValidated false", emailValidated);
            };
        };

        // If the user doesn't enter a password, then it isn't updated
        if (txtPassword !== undefined && txtPassword !== null) {
            if (txtPassword.trim().length !== 0) {
                if (txtPassword.trim().length > 4) {
                    passwordValidated = true;
                    setErrPassword("");
                    // console.log(componentName, "updateUser Valid Password");
                    // console.log(componentName, "updateUser passwordValidated true", passwordValidated);
                } else {
                    passwordValidated = false;
                    setErrPassword("Password must be at least 5 characters.");
                    // console.log(componentName, "updateUser Invalid Password");
                    // console.log(componentName, "updateUser passwordValidated false", passwordValidated);
                };
            } else {
                passwordValidated = true;
                setErrPassword("");
            };
        } else {
            passwordValidated = true;
            setErrPassword("");
        };

        if (firstNameValidated === true && lastNameValidated === true && emailValidated === true && passwordValidated === true) {
            formValidated = true;
            // console.log(componentName, "updateUser Valid Form");
            // console.log(componentName, "updateUser formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log(componentName, "updateUser Invalid Form");
            // console.log(componentName, "updateUser formValidated false", formValidated);
        };

        // console.log(componentName, "updateUser firstNameValidated", firstNameValidated);
        // console.log(componentName, "updateUser lastNameValidated", lastNameValidated);
        // console.log(componentName, "updateUser emailValidated", emailValidated);
        // console.log(componentName, "updateUser passwordValidated", passwordValidated);
        // console.log(componentName, "updateUser formValidated", formValidated);

        if (formValidated === true) {

            if (txtFirstName !== undefined && txtFirstName !== null && txtLastName !== undefined && txtLastName !== null && txtEmail !== undefined && txtEmail !== null && txtPassword !== undefined && txtPassword !== null) {
                let userObject = {
                    firstName:  txtFirstName.trim(),
                    lastName:  txtLastName.trim(),
                    email:  txtEmail.trim(),
                    updatedBy:  userID,
                    // active:     active
                    active:     !deleteUser
                };

                // If the user doesn't enter a password, then it isn't updated
                if (txtPassword !== undefined && txtPassword !== null) {
                    if (txtPassword.trim().length !== 0) {
                        Object.assign(userObject, {password: txtPassword.trim()});
                    };
                };

                // console.log(componentName, "updateUser userObject", userObject);

                let url = baseURL + "user/";

                // Does it matter if the user is updating their own record as an admin or not?
                if (admin === true) {
                    url = url + userID;
                };

                // console.log(componentName, "updateUser url", url);

                fetch(url, {
                    method: "PUT",
                    headers:    new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": sessionToken
                    }),
                    body: JSON.stringify({user: userObject})
                })
                .then(response => {
                    // console.log(componentName, "updateUser response", response);
                    // if (!response.ok) {
                    //     throw Error(response.status + " " + response.statusText + " " + response.url);
                    // } else {
                        // if (response.status === 200) {
                            return response.json();
                        // } else {
                        //     return response.status;
                        // };
                    // };
                })
                .then(data => {
                    // console.log(componentName, "updateUser data", data);

                    // if (data !== 500 && data !== 401) {
    
                        setUserRecordUpdated(data.recordUpdated);
                        setMessage(data.message);
    
                        if (data.resultsFound === true) {
                            // setUser(data);
                            // setUserID(data.userID);
                            // setFirstName(data.firstName);
                            // setLastName(data.lastName);
                            // setEmail(data.email);
                            // setUpdatedBy(data.updatedBy);
                            // setAdmin(data.admin);
                            // setActive(data.active);
                            // setSessionToken(data.sessionToken);

                            dispatch(loadUserData(data));
                            // dispatch(setSessionToken(data.sessionToken));

                        } else {
                            setErrMessage(data.error);
                        };
                    // } else {
                    //     // console.log("Login.js error", json);
                    //     setErrMessage(Login failed.");
                    // };

                })
                .catch(error => {
                    console.log(componentName, "updateUser error", error);
                    // console.log(componentName, "updateUser error.name", error.name);
                    // console.log(componentName, "updateUser error.message", error.message);
                    setErrMessage(error.name + ": " + error.message);
                });

            };

        };

    };

    useEffect(() => {
        // console.log(componentName, "useEffect userRecordUpdated", userRecordUpdated);
        if (userRecordUpdated !== undefined && userRecordUpdated !== null && userRecordUpdated !== false) {
            setMessage("");
            setErrMessage("");
            setErrFirstName("");
            setErrLastName("");
            setErrEmail("");
            setErrPassword("");
            setUserRecordUpdated(null);
            setModal(false);
        };
        
    }, [userRecordUpdated]);

    useEffect(() => {
        // console.log(componentName, "useEffect sessionToken", sessionToken);
        if (sessionToken !== undefined && sessionToken !== null && sessionToken !== "") {
            setMessage("");
            setErrMessage("");
            setErrEmail("");
            setErrPassword("");
            setModal(false);
        };
        
    }, [sessionToken]);

    const toggle = () => {
        setModal(!modal);
    };

    return(
        <React.Fragment>
        {sessionToken !== undefined && sessionToken !== null && sessionToken !== "" ? <Button outline size="sm" color="info" onClick={toggle}>Update User</Button> : null}
        <Modal isOpen={modal} toggle={toggle} size="md">
           <ModalHeader toggle={toggle}>Update User</ModalHeader>
           <ModalBody>
           <Form>
           <FormGroup>
            {message !== undefined && message !== null && message !== "" ? <Alert color="info">{message}</Alert> : null}
            {errMessage !== undefined && errMessage !== null && errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
            </FormGroup>
            <FormGroup>

                <Label for="txtFirstName">First Name</Label>
                <Input type="text" id="txtFirstName" label="First Name" value={txtFirstName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtFirstName(event.target.value);}} />
                {errFirstName !== "" ? <Alert color="danger">{errFirstName}</Alert> : null}

            </FormGroup>
            <FormGroup>

                <Label for="txtLastName">Last Name</Label>
                <Input type="text" id="txtLastName" label="Last Name" value={txtLastName} onChange={(event) => {/*console.log(event.target.value);*/ setTxtLastName(event.target.value);}} />
                {errLastName !== "" ? <Alert color="danger">{errLastName}</Alert> : null}

            </FormGroup>
           <FormGroup>

               <Label for="txtEmail">Email Address</Label>
               <Input id="txtEmail" label="Email Address" value={txtEmail} onChange={(event) => {/*console.log(event.target.value);*/ setTxtEmail(event.target.value);}} />
               {errEmail !== "" ? <Alert color="danger">{errEmail}</Alert> : null}

           </FormGroup>
           <FormGroup>

               <Label for="txtPassword">Password</Label>
               <Input type="password" id="txtPassword" value={txtPassword} onChange={(event) => {/*console.log(event.target.value);*/ setTxtPassword(event.target.value);}} />
               {errPassword !== "" ? <Alert color="danger">{errPassword}</Alert> : null}
               
           </FormGroup>

           <ModalFooter>
            <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ updateUser(false);}}>Update</Button>
            <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ updateUser(true);}}>Delete</Button>
            <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
           </ModalFooter>
           </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default EditUser;
