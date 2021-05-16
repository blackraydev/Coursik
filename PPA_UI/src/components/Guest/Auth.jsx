import React, { useEffect, useState } from "react";
import { LOGIN, REGISTER } from "../../constants/authConstants";
import { ShowIcon, HideIcon } from "../Common/Icons";
import { EXISTINGEMAIL, INVALIDDATA, MINPASSWORDLENGTH, NOERROR, PASSWORDDONTMATCH, UNKNOWNERROR } from "../../constants/errorConstants";
import { loginRequest, registerRequest } from "../../services/authServices";
import { useHistory } from "react-router-dom";
import "../../styles/Auth.css";

const Auth = ({ authMethod }) => {
    const history = useHistory();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(NOERROR);

    useEffect(() => hideError(), [login, password, repeatPassword, authMethod]);
    
    useEffect(() => {
        const token = getToken();

        if (token) {
            switchRoute("/home/1");
        }
    }, [authMethod]);

    const hideError = () => {
        setError(NOERROR);
        return false;
    }
    
    const showError = e => {
        setError(e);
        return true;
    }

    const isError = () => {
        if (password.length < 6) {
            return showError(MINPASSWORDLENGTH);
        }
        else if (password !== repeatPassword) {
            return showError(PASSWORDDONTMATCH);
        }

        return hideError();
    }

    const authHandler = () => {
        if (authMethod === LOGIN) {
            return loginHandler();
        }

        if (!isError()) {
            return registerHandler();
        }
    }

    const loginHandler = async () => {
        const existingUser = { login, password };

        return await loginRequest(existingUser)
            .then((data) => {
                setUserId(data.loggedUser.id);
                setToken(data.token.accessToken);
                hideError();
                switchRoute(`/home/${data.loggedUser.id}`);
            })
            .catch(() => showError(INVALIDDATA));
    }

    const registerHandler = async () => {
        const newUser = { login, password };

        return await registerRequest(newUser)
            .then((data) => {
                setUserId(data.newUser.id);
                setToken(data.token.accessToken);
                switchRoute(`/home/${data.newUser.id}/profile`);
                hideError();
            })
            .catch(() => showError(EXISTINGEMAIL));
    }

    const setUserId = userId => {
        const id = "id";
        sessionStorage.setItem(id, userId);
    }

    const setToken = accessToken => {
        const token = "accessToken";
        sessionStorage.setItem(token, accessToken);
    }

    const getToken = () => {
        const token = "accessToken";
        return sessionStorage.getItem(token); 
    }

    const switchRoute = url => history.push(url);

    return(
        <div className="auth">
            <span className="error">{error}</span>
            <input value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" className="login"/>
            <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Password" className="password"/>
            {
                authMethod === REGISTER ? 
                    <input value={repeatPassword}
                           onChange={e => setRepeatPassword(e.target.value)} 
                           type={showPassword ? "text" : "password"}
                           placeholder="Repeat password" 
                           className="password"
                    /> : null 
            }
            <div className="toggler">
                <label className="switcher">
                    <input type="checkbox"/>
                    <span onClick={() => setShowPassword(!showPassword) } className="slider round">
                        <ShowIcon/>
                        <HideIcon/>
                    </span>
                </label>
            </div>
            <button onClick={() => authHandler()} className="confirm">Confirm</button>
        </div>
    )
}

export default Auth;