// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import logo from '../images/FA_Kutuphane_1.png';
import { LinkedinFilled, GithubOutlined, MailOutlined } from '@ant-design/icons';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/">
            <img src={logo} alt="logo" className="logo"/>
          </Link>
        </li>
        <li className='nav-item'>
          <h2>FA KÜTÜPHANE PROGRAMINA HOŞGELDİNİZ</h2>
        </li>
        <li className='nav-item'>
          <a href='https://www.linkedin.com/in/furkanaltinbarin/' target='_blank' style={{paddingLeft:'15%'}}>
          <LinkedinFilled style={{ fontSize: '35px', color: '#0e76a8'}}/>      
          </a>
          <a href='https://github.com/altinbarin' target='_blank' style={{paddingLeft:'15%'}}>
          <GithubOutlined style={{ fontSize: '35px', color: '#171515'}}/>
          </a>
        </li>     
      </ul>
    </nav>
  );
}

export default Navbar;
