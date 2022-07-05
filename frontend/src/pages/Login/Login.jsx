import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';

import './Login.css';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState();
  const [passErr, setPassErr] = useState();
  const navigate = useNavigate();
  let namep = <p className="namep">Please enter a valid name</p>;
  let passp = <p className="passp">Please enter a valid password</p>;
  let passp2 = (
    <p className="passp">
      Please enter a valid password of atleast 8 characters
    </p>
  );
  let passp3 = <p className="passp">Invalid credentials, try again</p>;
  let passp4 = <p className="passp">Invalid Password</p>;
  let signedInP = <p className="passp">You are already logged in</p>;

  const login = async function () {
    if (name && password) {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          password: password,
        }),
      });
      const data = await res.json();
      if (!data.error) {
        navigate('/home');
      }
      if (data.error === 'Invalid credentials, try again') {
        setPassErr(passp3);
      }
      if (data.error === 'Invalid password') {
        setPassErr(passp4);
      }

      if (data.error === 'Already Logged In') {
        setPassErr(signedInP);
      }
    }
    if (!name) {
      setNameErr(namep);
    }

    if (!password) {
      setPassErr(passp);

      if (password && password.length < 8) {
        setPassErr(passp2);
      }
    }
  };
  return (
    <div className="joinOuterContainer">
      <Header />
      <div className="joinInnerContainer" style={{ marginTop: '45px' }}>
        <h1 className="heading">Login</h1>
        <div>
          <input
            name="name"
            value={name}
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => {
              setNameErr('');
              setName(event.target.value);
            }}
            onBlur={() => {
              if (!name) {
                setNameErr(namep);
              }
            }}
          />
          {nameErr ? nameErr : ''}
        </div>
        <div>
          <input
            name="password"
            placeholder="Password"
            value={password}
            className="joinInput mt-20"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
              setPassErr('');
            }}
            onBlur={() => {
              if (!password) {
                setPassErr(passp);
              }
              if (password && password.length < 8) {
                setPassErr(passp2);
              }
            }}
          />
          {passErr}
        </div>
        <button className={'button mt-20'} type="submit" onClick={login}>
          <p>Login</p>
        </button>
        <Link to="/signup" className="fPL">
          <p>Not signed up? Signup here</p>
        </Link>
      </div>
      <h3 className="cDiv">&copy; Foodea </h3>
    </div>
  );
}
