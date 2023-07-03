import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Form from "../Features/Form/FormWrapper";
import Input from "../Features/Input/Input";
import LoginButton from "../Features/Buttons/Login&RegisterButton";
import styles from "./styles/login.module.css";
import buttonStyle from '../Features/Buttons/styles/buttons.module.css'
import FirebaseConfig from "../../context/firebase-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { faEnvelope, faKey, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/auth-context";
import WorkoutImg from "../../images/workout.png";

const Login = () => {
  const firebaseConfigPack = useContext(FirebaseConfig);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);

  function checkValidation(input, condition, setStateFunction) {
    if (!input.match(condition)) {
      setStateFunction(false);
    } else {
      setStateFunction(true);
    }
    input.length === 0 && setStateFunction(true);
  }

  function emailHandler(event) {
    checkValidation(
      event.target.value,
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      setEmailValidation
    );
    setEmail(event.target.value);
  }

  function passwordHandler(event) {
    checkValidation(
      event.target.value,
      /^.{6,}$/,
      setPasswordValidation
    );
    setPassword(event.target.value);
  }

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        dispatch({ type: "LOGIN", payload: cred.user });
        navigate("/main");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <React.Fragment>
      <FirebaseConfig.Provider value={firebaseConfigPack}>
        <div className={styles.container}>
          <div className={styles.login_container}>
            <h1>Hey, hello 👋</h1>
            <small className={styles.message}>
              Enter the information you entered while registering.
            </small>
            <Form className={styles.form_container}>
              <Input
                type="email"
                placeholder="E-mail"
                onChange={emailHandler}
                className={`${styles.login_input_container} ${
                  !emailValidation && styles.error
                }`}
                iconboxClass={styles.icon_container}
                inputClass={styles.login_input}
                icon={faEnvelope}
                errorMessage = {!emailValidation && 'Invalid email'}
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={passwordHandler}
                className={`${styles.login_input_container} ${
                  !passwordValidation && styles.error
                }`}
                iconboxClass={styles.icon_container}
                inputClass={styles.login_input}
                icon={faKey}
                errorMessage = {!passwordValidation && 'Invalid password'}
              />
              <LoginButton
                buttonHandler={login}
                disabled={
                  !emailValidation || !passwordValidation ? true : false
                }
                className= {`${buttonStyle.login_register_button} ${!emailValidation || !passwordValidation && styles.disabled_button}`}
              >
                Log in
              </LoginButton>
              <div className={styles.login_options}>
                <div className={styles.remember_me}>
                  <input type="checkbox"></input>
                  <label>Remember me</label>
                </div>
                <NavLink to="/register">Don't have an account ?</NavLink>
              </div>
            </Form>
          </div>
          <div className={styles.image_container}>
            <img src={WorkoutImg} alt="outside-workout"></img>
          </div>
        </div>
      </FirebaseConfig.Provider>
    </React.Fragment>
  );
};

export default Login;
