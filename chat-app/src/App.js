import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import HomePage from './components/HomePage'
import './style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SharedLayout from "./components/SharedLayout";
import { createContext, useState } from "react";

export const SelfContext = createContext()
export const MsgContext = createContext()

function App() {
  const [selfData, setSelfData] = useState('');
  const [allMsg, setAllMsg] = useState([])

  return (
    <div className="App">
      <MsgContext.Provider value={{ allMsg, setAllMsg }}>
        <SelfContext.Provider value={{ selfData, setSelfData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="chatwindow" element={<ChatWindow />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SelfContext.Provider>
      </MsgContext.Provider>
    </div>
  );
}

export default App;
