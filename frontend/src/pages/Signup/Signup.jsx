import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

import "./Signup.css";

export default function Signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameErr, setNameErr] = useState();
    const [passErr, setPassErr] = useState();

    const navigate = useNavigate();
    let namep = <p className="errp">Please enter a valid name</p>;
    let passp = <p className="errp">Please enter a valid password</p>;
    let passp2 = (
        <p className="errp">
            Please enter a valid password of atleast 8 characters
        </p>
    );
    let dupN = <p className="errp">Username already exists</p>;
    let signedInP = <p className="errp">You are already logged in</p>;
    const signup = async function () {
        if (name && password) {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                }),
            });
            const data = await res.json();
            if (res.status === 200) {
                navigate("/home");
            }

            if (data.error === "Duplicate field value entered") {
                setNameErr(dupN);
            }

            if (data.error === "You are already logged in") {
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
          <h1 className="heading">Signup</h1>
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
            {passErr ? passErr : ''}
          </div>
          <button className={'button mt-20'} type="submit" onClick={signup}>
            <p>Signup</p>
          </button>
          <Link to="/login" className="fPL">
            <p>Already signed up? Login here</p>
          </Link>
        </div>
        <h3 className="cDiv">&copy; VoteAble </h3>
      </div>
    );
}