import React, { useContext, useState } from 'react'
import {io} from 'socket.io-client';
import {useNavigate} from 'react-router-dom'
import { SelfContext } from '../App';

export const socket= io('http://localhost:5000', {autoConnect: false});

function Login() {
    const navigate = useNavigate();
    const [myUsername, setMyUsername] = useState('');
    const {setSelfData} = useContext(SelfContext);
    const loginhandler = () => {
        socket.auth = {username: myUsername} 
        myUsername && socket.connect();
        setSelfData(myUsername)
        navigate('/chatwindow')
    }

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <label htmlFor="username">Username</label> 

            <input
                type="text"
                id='username'
                value={myUsername}
                placeholder='Enter Username'
                onChange={(e) => setMyUsername(e.target.value)} /> 

            <button onClick={loginhandler}>Login</button>
        </div>
    )
}

export default Login