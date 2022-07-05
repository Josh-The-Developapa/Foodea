import './Home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Header from '../../components/Header/Header.jsx';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Home() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentDate = new Date();
  const socket = io('http://localhost:5000');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [err, setErr] = useState('');
  const [user, setUser] = useState({});
  const time = currentDate.getHours() + ':' + currentDate.getMinutes();

  useEffect(() => {
    async function myProfile(url) {
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.error === 'You are not logged in') {
        handleShow();
        setErr('You are not logged in, so you cannot access this page');
      }
      setUser(data);
    }

    myProfile('http://localhost:5000/my-profile');
  }, []);

  socket.on('message', (data) => {
    data.user = user.user.name
    setChat([...chat, data]);
  });

  socket.on('meals', (data) => {
    if (data.results.length > 0) {
      setChat([
        ...chat,
        { txt: message, user: user.user.name },
        ...data.results,
      ]);
    }
  });

  socket.on('botMsg', (data) => {
    setChat([...chat, { txt: message, user: user.user.name }, data]);
  });

  return (
    <div>
      <Header />
      <ul className="messages">
        <div className="container">
          <span>
            <b>Foodea Bot</b>
          </span>
          <p>{`Welcome to Foodea, what would you like to eat?`}</p>
          <span className="time-right">{time}</span>
        </div>
        {chat.map((val) => {
          return (
            <div className="container">
              <span>
                <b>{val.user}</b>
              </span>
              <p>{val.title ? val.title : val.txt}</p>
              {val.image ? <img src={val.image} alt={val.title} /> : ''}
              <span className="time-right">{time}</span>
            </div>
          );
        })}
      </ul>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>There's a problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>{err}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (message.trim() !== '') {
            socket.emit('message', message);
            setMessage('');
          }
        }}
      >
        <input
          className="input"
          autoComplete="off"
          value={message}
          placeholder="Enter keyword 'hungry' to activate bot "
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Home;
