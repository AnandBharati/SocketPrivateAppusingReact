import React, { useContext, useEffect, useState } from 'react';
import { socket } from './Login';
import { MsgContext, SelfContext } from '../App';

function ChatWindow() {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({ user: '', id: '' })
    const [newMsg, setNewMsg] = useState('');

    const { selfData } = useContext(SelfContext)
    const { allMsg, setAllMsg } = useContext(MsgContext)

    useEffect(() => {
        socket.on('users', (users) => {
            console.log(users);
            setUsers(users);
        })

        socket.on('private message', ({ content, from }) => {
            //console.log('msg recieved from ', from)
            const tempArr = Array.from(allMsg);
            console.log('temp arr', tempArr)
            tempArr.push({ messages: content, user: from })
            setAllMsg(tempArr)
        })
        // eslint-disable-next-line
    }, [])


    function sendMessage() {
        socket.emit('private message', {
            content: newMsg,
            to: selectedUser.id,
        })
        const tempArr = allMsg.slice();
        tempArr.push({ messages: newMsg, user: selectedUser.user })
        setAllMsg(tempArr);
    }

    function setUserActive(user, id) {
        setSelectedUser({ user, id })
        console.log('user Selected -', user);
        const userRibbon = document.querySelector('#user-ribbon' + user);
        const userRibbonAll = Array.from(document.querySelectorAll('.user-ribbon'));
        userRibbonAll?.map((a) => a.classList?.remove('active')); //removing bckground blue color
        userRibbon.classList.add('active') //setting active user
    }

    return (
        <div className='chatWindow'>
            <aside className='userPanelContainer'>
                <h4>{selfData}</h4>
                {users?.map(({ user, id }) => {
                    if (user !== selfData) {
                        return (
                            <div className='user-ribbon' id={'user-ribbon' + user} key={id} onClick={(e) => setUserActive(user, id)}>
                                <p>{user}</p>
                            </div>
                        )
                    }
                    else return null;
                }
                )}
            </aside>
            <main className='displayMsgContainer'>
                <div className='displayMsg'>

                    {allMsg.filter((a) => a.user === selectedUser.user).map(({ messages, user },i) => {
                        return (<span className='msg-ribbon' key={i}>
                            <p className='toMsg'> {messages} <sub>from-{user}</sub> </p>
                        </span>)
                    })
                    }

                </div>
                <div className='msgControls'>
                    <input
                        type="text"
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        placeholder='type your message' />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </main>
        </div>
    )
}

export default ChatWindow