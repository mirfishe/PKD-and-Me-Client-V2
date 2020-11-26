import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import AppSettings from "../../app/environment";
import {emailRegExp} from "../../app/constants";
import {loadUserData, setSessionToken, loadArrayChecklist} from "../../app/userSlice";

const Login = (props) => {

    const componentName = "Login.js";

    const dispatch = useDispatch();

    const sessionToken = useSelector(state => state.user.sessionToken);

    // Loading the baseURL from the state store here is too slow
    // Always pulling it from environment.js
    // const baseURL = useSelector(state => state.app.baseURL);
    const baseURL = AppSettings.baseURL;
    // console.log(componentName, "baseURL", baseURL);

    const appAllowUserInteractions = useSelector(state => state.app.appAllowUserInteractions);

    // const [user, setUser] = useState({});
    // const [userID, setUserID] = useState(null);
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [updatedBy, setUpdatedBy] = useState(null);
    // const [admin, setAdmin] = useState(false);
    // const [active, setActive] = useState(false);
    // const [sessionToken, setSessionToken] = useState(null);

    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [userResultsFound, setUserResultsFound] = useState(null);

    const [checklistMessage, setChecklistMessage] = useState("");
    const [errChecklistMessage, setErrChecklistMessage] = useState("");
    const [checklistResultsFound, setChecklistResultsFound] = useState(null);

    const [txtEmail, setTxtEmail] = useState(""); // process.env.REACT_APP_EMAIL_DEFAULT
    const [txtPassword, setTxtPassword] = useState(""); // process.env.REACT_APP_PASSWORD_DEFAULT

    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");

    const updateToken = (newToken) => {
        if (newToken !== undefined && newToken !== null && newToken !== "") {
          localStorage.setItem("token", newToken);
          // console.log(componentName, "updateToken newToken", newToken);
          // console.log(componentName, "updateToken state.sessionToken", state.sessionToken); // Never shows the current value of sessionToken
          // console.log(componentName, "updateToken User token changed.");
        };
    };

    const logIn = () => {
        // console.log(componentName, "logIn");

        setMessage("");
        setErrMessage("");
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

        let emailValidated = false;
        let passwordValidated = false;
        let formValidated = false;

        if (txtEmail !== undefined && txtEmail !== null) {
            if (txtEmail.trim().match(emailRegExp) && txtEmail.trim().length > 0) {
            // if (txtEmail.trim().match(emailFormat) && txtEmail.trim().length > 0) {
                emailValidated = true;
                setErrEmail("");
                // console.log(componentName, "logIn Valid Email Address");
                // console.log(componentName, "logIn emailValidated true", emailValidated);
            } else {
                emailValidated = false;
                setErrEmail("Please enter a valid email address.");
                // console.log(componentName, "logIn Invalid Email Address");
                // console.log(componentName, "logIn emailValidated false", emailValidated);
            };
        };

        if (txtPassword !== undefined && txtPassword !== null) {
            if (txtPassword.trim().length > 4) {
                passwordValidated = true;
                setErrPassword("");
                // console.log(componentName, "logIn Valid Password");
                // console.log(componentName, "logIn passwordValidated true", passwordValidated);
            } else {
                passwordValidated = false;
                setErrPassword("Password must be at least 5 characters.");
                // console.log(componentName, "logIn Invalid Password");
                // console.log(componentName, "logIn passwordValidated false", passwordValidated);
            };
        };

        if (emailValidated === true && passwordValidated === true) {
            formValidated = true;
            // console.log(componentName, "logIn Valid Form");
            // console.log(componentName, "logIn formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log(componentName, "logIn Invalid Form");
            // console.log(componentName, "logIn formValidated false", formValidated);
        };

        // console.log(componentName, "logIn emailValidated", emailValidated);
        // console.log(componentName, "logIn passwordValidated", passwordValidated);
        // console.log(componentName, "logIn formValidated", formValidated);

        if (formValidated === true) {

            if (txtEmail !== undefined && txtEmail !== null && txtPassword !== undefined && txtPassword !== null) {
                let userObject = {
                    email:  txtEmail.trim(),
                    password:  txtPassword.trim()
                };
                // console.log(componentName, "logIn userObject", userObject);

                let url = baseURL + "user/login/";
                // console.log(componentName, "logIn url", url);

                fetch(url, {
                    method: "POST",
                    headers:    new Headers ({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({user: userObject})
                })
                .then(response => {
                    // console.log(componentName, "logIn response", response);
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
                    // console.log(componentName, "logIn data", data);

                    // if (data !== 500 && data !== 401) {
    
                        // setUserResultsFound(data.resultsFound);
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
                            dispatch(setSessionToken(data.sessionToken));
                            updateToken(data.sessionToken);

                            getChecklist(data.sessionToken);

                            setUserResultsFound(data.resultsFound);

                        } else {
                            setErrMessage(data.error);
                        };
                    // } else {
                    //     // console.log("Login.js error", json);
                    //     setErrMessage(Login failed.");
                    // };

                })
                .catch(error => {
                    console.log(componentName, "logIn error", error);
                    // console.log(componentName, "logIn error.name", error.name);
                    // console.log(componentName, "logIn error.message", error.message);
                    setErrMessage(error.name + ": " + error.message);
                });

            };

        };

    };

    const getChecklist = (token) => {
        // console.log(componentName, "getChecklist");
        // console.log(componentName, "getChecklist baseURL", baseURL);
    
        setChecklistMessage("");
        setErrChecklistMessage("");
        setChecklistResultsFound(null);
    
        let url = baseURL + "title/checklist/list";
    
        if (token !== undefined && token !== null && token !== "") {
    
            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": token
                }),
            })
            .then(response => {
                // console.log(componentName, "getChecklist response", response);
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
                // console.log(componentName, "getChecklist data", data);
    
                setChecklistResultsFound(data.resultsFound);
                // setChecklistMessage(data.message);
    
                if (data.resultsFound === true) {
    
                  dispatch(loadArrayChecklist(data.titles));
    
                } else {
                  console.log(componentName, "getChecklist resultsFound error", data.message);
                  setErrMessage(data.message);
                };
    
            })
            .catch(error => {
                console.log(componentName, "getChecklist error", error);
                // console.log(componentName, "getChecklist error.name", error.name);
                // console.log(componentName, "getChecklist error.message", error.message);
                // setErrMessage(error.name + ": " + error.message);
            });
    
        };
    
      };

      useEffect(() => {
        // console.log(componentName, "useEffect userResultsFound", userResultsFound);
        if (userResultsFound !== undefined && userResultsFound !== null && userResultsFound !== false) {
            setMessage("");
            setErrMessage("");
            setErrEmail("");
            setErrPassword("");
            setUserResultsFound(null);
            // setModal(false);
            toggle();
        };
        
    }, [userResultsFound]);

    useEffect(() => {
        // console.log(componentName, "useEffect sessionToken", sessionToken);
        if (sessionToken !== undefined && sessionToken !== null && sessionToken !== "") {
            setMessage("");
            setErrMessage("");
            setErrEmail("");
            setErrPassword("");
            // setModal(false);
            toggle();
        };
        
    }, [sessionToken]);

    const toggle = () => {
        setModal(!modal);
    };

    return(
        <React.Fragment>
        {appAllowUserInteractions === true && sessionToken === undefined || sessionToken === null || sessionToken === "" ? <Button outline className="my-2" size="sm" color="info" onClick={toggle}>Login</Button> : null}
        <Modal isOpen={modal} toggle={toggle} size="md">
           <ModalHeader toggle={toggle}>Login</ModalHeader>
           <ModalBody>
           <Form>
           <FormGroup className="text-center">
            {message !== undefined && message !== null && message !== "" ? <Alert color="info">{message}</Alert> : null}
            {errMessage !== undefined && errMessage !== null && errMessage !== "" ? <Alert color="danger">{errMessage}</Alert> : null}
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
            <Button outline size="lg" color="primary" onClick={logIn}>Log In</Button>
            <Button outline size="lg" color="secondary" onClick={toggle}>Cancel</Button>
           </ModalFooter>
           </Form>
       </ModalBody>
     </Modal>
   </React.Fragment>
    );

};

export default Login;
