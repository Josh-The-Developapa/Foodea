import React, { useContext } from 'react';
import './Header.css';
import { NavLink, Link, useNavigate} from 'react-router-dom';
import DropDown from '../DropDown/DropDown.jsx';
import Context from '../../Context/Context.js';

function Header(props) {
  const ctx = useContext(Context);
  const navigate = useNavigate()

  const logout = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'GET',
      credentials: 'include',
    });

    navigate('/login')
  };

  return (
    <div className="navBar">
      {ctx.isDrop ? <DropDown /> : ''}
      <button
        onClick={() => {
          ctx.setIsDropVal(true);
        }}
        className="Menu"
      >
        Menu
      </button>
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <h1 style={{ color: 'white', paddingLeft: '30px' }}>Foodea</h1>
      </Link>
      <NavLink to="/home" className="popo">
        Home
      </NavLink>
      <NavLink to="/signup" className="btn-m">
        Signup
      </NavLink>
      <NavLink to="/login" className="btn-m">
        Login
      </NavLink>
      <button onClick={logout} className="btn-m">
        Logout
      </button>
    </div>
  );
}

export default Header;
