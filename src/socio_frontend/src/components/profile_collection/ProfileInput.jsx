import React, { useState } from 'react';
import ProfileContext from '../ProfileContext';
import Form1 from '../forms/Form1';
import Form2 from '../forms/Form2';
import './ProfileInput.css';

export default function ProfileInput({setUserExists}) {

    const [profile, setProfile] = useState('first');
    const [contextData, setContextData] = useState({
        username: '',
        password: '',
        gender: '',
        dob: null,
        pic: null,
    });

    const updateContextData = (newData) => {
        setContextData(newData);
    };

    return (
        <ProfileContext.Provider value={{contextData, updateContextData}}>
            <div id="form-container">
                <div id="form-content">
                    {
                        profile === 'first' ? <Form1 setProfile={setProfile} /> : <Form2 setUserExists={setUserExists} />
                    }
                </div>
            </div>
        </ProfileContext.Provider>
    );
};
