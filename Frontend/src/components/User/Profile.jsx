import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { DATACHANGE, PASSWORDCHANGE } from "../../constants/authConstants";
import { MINPASSWORDLENGTH, NOERROR, PASSWORDDONTMATCH, SUCCESS } from "../../constants/errorConstants";
import { getRequest, updateRequest } from "../../services/authServices";
import { HideIcon, ShowIcon } from "../Common/Icons";
import avatarDefault from "../../img/avatar.jpg";
import "../../styles/Profile.css";

const Profile = ({ setAvatar }) => {
    const userId = sessionStorage.getItem("id");
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(NOERROR);
    const [success, setSuccess] = useState(NOERROR);
    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [changed, setChanged] = useState(false);
    const inputFile = useRef(null);
    
    useEffect(async () => {
        await getRequest(userId).then(user => {
            setSurname(user.surname);
            setName(user.name);
            setPatronymic(user.patronymic);
            setLogin(user.login);
        });
    }, []);

    useEffect(() => {
        if (file) {
            const selectedFile = URL.createObjectURL(file);
            setPhoto(selectedFile);
        }
    }, [file]);

    useEffect(() => getRequest(userId).then(user => setPhoto(user.avatar)), []);

    const showError = e => {
        setError(e);
        return true;
    }

    const hideError = () => {
        setError(NOERROR);
        return false;
    }

    const changeTextStyle = (flag) => {
        const error = document.querySelector(".error");

        if (flag) {
            error.style.color = "rgba(0, 255, 0, 0.75)";
        }
        else {
            error.style.color = "rgba(255, 0, 0, 0.75)";
        }
    }

    const isError = (type) => {
        if (type === PASSWORDCHANGE) {
            if (password.length < 6) {
                return showError(MINPASSWORDLENGTH);
            }
            else if (password !== repeatPassword) {
                return showError(PASSWORDDONTMATCH);
            }
        }
        
        return hideError();
    }

    const uploadNewPhoto = async () => {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", "lpgp4ccs");
        return axios.post("https://api.cloudinary.com/v1_1/dxj1aijjm/upload", form);
    }

    const updateProfileHandler = async (type) => {
        if (!isError(type)) {
            return await getRequest(userId)
                .then(async (user) => {
                    let updatedUser;

                    if (changed) {
                        if (type === PASSWORDCHANGE) {
                            updatedUser = { ...user, password };
                        }
                        else if (type === DATACHANGE) {
                            if (file) {
                                await uploadNewPhoto()
                                    .then(res => {
                                        const avatar = res.data.secure_url;
                                        const avatarPublicId = res.data.public_id;
                                        updatedUser = { ...user, avatar, avatarPublicId, surname, name, patronymic };
                                        setAvatar(avatar);
                                    })
                                    .catch(e => console.log(e))
                            }
                            else {
                                updatedUser = { ...user, surname, name, patronymic };
                            }
                        }

                        setChanged(false);

                        return await updateRequest(updatedUser)
                            .then(() => {
                                if (type === PASSWORDCHANGE) {
                                    changeTextStyle(true);
                                    setError(SUCCESS);
                                }
                                else if (type === DATACHANGE) {
                                    setSuccess(SUCCESS);
                                }

                                setTimeout(() => {
                                    changeTextStyle(false);
                                    setError(NOERROR);
                                    setSuccess(NOERROR);
                                }, 4000);
                            })
                            .catch(e => console.log(e))
                    }
                })
                .catch(e => console.log(e))
        }
    }

    const clickFileHandler = () => {
        inputFile.current.click();
    }

    const updateFileHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setChanged(true);
    }

    const changingHandler = (e, setFunction) => {
        setFunction(e.target.value);
        setChanged(true);
    }

    return (
        <div className="profile">
            <div className="person_data">
                <div className="success_holder">
                    <span className="success">{success}</span>
                </div>
                <input onChange={e => changingHandler(e, setSurname) } value={surname} placeholder="Surname"/>
                <input onChange={e => changingHandler(e, setName)} value={name} placeholder="Name"/>
                <input onChange={e => changingHandler(e, setPatronymic)} value={patronymic} placeholder="Patronymic"/>
                <input className="file_choose" type="file" ref={inputFile} onChange={e => updateFileHandler(e)}/>
                <div className="avatar_choose">
                    <button className="confirm" onClick={clickFileHandler}>Upload photo</button>
                    <img className="avatar" src={photo ? photo : avatarDefault}/>
                </div>
                <button onClick={() => updateProfileHandler(DATACHANGE)} className="confirm">Submit</button>
            </div>
            <div className="profile_data">
                <div className="error_holder">
                    <span className="error">{error}</span>
                </div>
                <input disabled value={login} onChange={e => setLogin(e.target.value)} placeholder="Login" className="login"/>
                <input value={password} onChange={e => changingHandler(e, setPassword)} type={showPassword ? "text" : "password"} placeholder="Password" className="password"/>
                <input value={repeatPassword}
                       onChange={e => changingHandler(e, setRepeatPassword)} 
                       type={showPassword ? "text" : "password"}
                       placeholder="Repeat password" 
                       className="password"
                />
                <div className="toggler">
                    <label className="switcher">
                        <input type="checkbox"/>
                        <span onClick={() => setShowPassword(!showPassword) } className="slider round">
                            <ShowIcon/>
                            <HideIcon/>
                        </span>
                    </label>
                </div>
                <button onClick={() => updateProfileHandler(PASSWORDCHANGE)} className="confirm">Update</button>
            </div>
        </div>
    )
}

export default Profile;