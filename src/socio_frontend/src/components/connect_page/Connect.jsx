import React, { useState, useEffect, useContext } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import connect_logo from '../../../assets/images/socio_connect_logo.png';
import { createActor, canisterId } from '../../../../declarations/socio_backend/index';
import './connect.css';
import AppContext from '../AppContext';

export default function Connect() {

    const [authClient, setAuthClient] = useState(null);
    const {setLogin,setActor} = useContext(AppContext);

    useEffect(() => {
        (async () => {
            const authClient = await AuthClient.create();
            setAuthClient(authClient);
        })();
    }, []);

    async function handleConnection() {
        await authClient.login();
        const identity = await authClient.getIdentity();
    
        let actor = createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });

        if(identity && actor){
            setLogin(true);
            setActor(actor);
        };
    }
    

    return (
        <div id="connect-page">
            <div id="connect-content">
                <img src={connect_logo} alt="connect-logo" id="socio-logo" />
                <button id="connect-btn" onClick={handleConnection}>
                    Connect
                </button>
            </div>
        </div>
    );
}
