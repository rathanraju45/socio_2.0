import React, { useState, useEffect, useContext } from 'react';
import ProfileContext from '../ProfileContext';
import { socio_backend } from '../../../../declarations/socio_backend/index';
import AppContext from '../AppContext';

export default function CreateUser({setUserExists}) {

    const { contextData } = useContext(ProfileContext);
    const [response, setResponse] = useState({
        status: null,
        msg: ''
    });

    useEffect(() => {
        if(response.status === 200n){
            setUserExists(true);
        }
    },[response]);

    const handleCreateUser = async () => {
        const {username,password,gender,dob,pic} = contextData;
        const {status,msg} = await socio_backend.createUser(username,password,dob,gender,pic);
        setResponse({
            status : status,
            msg : msg
        });
    };

    return (
        <button id="submit" onClick={() => handleCreateUser()}>
            Submit
        </button>
    )
}
