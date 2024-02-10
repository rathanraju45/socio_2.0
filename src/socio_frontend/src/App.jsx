import React, { useState, useEffect } from 'react';
import AppContext from './components/AppContext';
import ProfileInput from './components/profile_collection/ProfileInput';
import Connect from './components/connect_page/Connect';
import { socio_backend } from '../../declarations/socio_backend/index';
import Test from './components/Test';

export default function App() {

    const [login, setLogin] = useState(false);
    const [actor, setActor] = useState(null);
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        if(login){
            async function checkUser() {
                const userExistResponse = await socio_backend.checkUser();
                if(userExistResponse === 200n){
                    setUserExists(true);
                }
            };
            checkUser();
        }
    }, [login])

    return (
        <AppContext.Provider value={{ setLogin, setActor}}>
            <div id="app">
                {
                    login ? 
                    (
                        userExists ? <Test /> : <ProfileInput setUserExists={setUserExists} /> 
                    )
                    : <Connect />
                }
            </div>
        </AppContext.Provider>
    )
};