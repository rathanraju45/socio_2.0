import React, { useState, useContext } from 'react';
import socio_connect_logo from '../../../assets/images/socio_connect_logo.png';
import ProfileContext from '../ProfileContext';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function Form1({ setProfile }) {

    const { contextData, updateContextData } = useContext(ProfileContext);

    const [error, setError] = useState(null);
    const [userNameError, setUserNameError] = useState(null);
    const [showPwd, setShowPwd] = useState(false);
    const [showCnfrm, setShowCnfrm] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState('');
    const [inputData, setInputData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value,
        });

        updateContextData({
            ...contextData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div id="form1">
            <div id="form-img">
                <img src={socio_connect_logo} alt="form logo" />
            </div>
            <form>
                <p id="form-head">Create Username and Password</p>
                <input name='username' value={inputData.username} onChange={handleChange} type="text" placeholder="Enter your username" />
                <span className="error-msg" style={
                    {
                        display: userNameError !== null ? 'block' : 'none'
                    }
                }>{userNameError}</span>
                <div className="password-wrapper">
                    <input name='password' value={inputData.password} onChange={handleChange} type={showPwd ? 'text' : 'password'} placeholder="Enter your password" />
                    {
                        showPwd ? <FaEye className='fa-eye' onClick={() => setShowPwd(!showPwd)} /> : <FaEyeSlash className="fa-eye-slash" onClick={() => setShowPwd(!showPwd)} />
                    }
                </div>
                <div className="password-wrapper">
                    <input name='confirm' value={confirmPwd} type={showCnfrm ? 'text' : 'password'} onChange={(event) => setConfirmPwd(event.target.value)} placeholder="Confirm your password" />
                    {
                        showCnfrm ? <FaEye className='fa-eye' onClick={() => setShowCnfrm(!showCnfrm)} /> : <FaEyeSlash className='fa-eye-slash' onClick={() => setShowCnfrm(!showCnfrm)} />
                    }
                </div>
                <span className="error-msg" style={
                    {
                        display: error !== null ? 'block' : 'none'
                    }
                }>{error}</span>
                <button id="next" onClick={(event) => {
                    if (inputData.password === confirmPwd) {
                        event.preventDefault();
                        setProfile('second');
                    } else {
                        event.preventDefault();
                        setError('*Password do not match');
                    }
                }}>
                    Next
                </button>
            </form>
        </div>
    )
}

