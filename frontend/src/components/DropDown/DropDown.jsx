import React, { useContext } from 'react';
import './DropDown.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../../Context/Context';

function DropDown(props) {
  const ctx = useContext(Context);
  const navigate = useNavigate();

  const logout = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'GET',
      credentials: 'include',
    });

    navigate('/login');
  };

  return (
    <div>
      <div
        className="tsBG"
        onClick={() => {
          ctx.setIsDropVal(false);
        }}
      ></div>
      <div className="dropdown">
        <h1>Foodea</h1>
        <NavLink to="/home">
          <button
            className="btnn"
            onClick={() => {
              ctx.setIsDropVal(false);
            }}
          >
            Home
          </button>
        </NavLink>
        <NavLink to="/login">
          <button
            className="btnn"
            onClick={() => {
              ctx.setIsDropVal(false);
            }}
          >
            Login
          </button>
        </NavLink>
        <NavLink to="/signup">
          <button
            className="btnn"
            onClick={() => {
              ctx.setIsDropVal(false);
            }}
          >
            Signup
          </button>
        </NavLink>
        <button className="btnn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default DropDown;
