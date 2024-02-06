import React, { useContext, useState } from 'react';
import './Nav.css';
import { Avatar, Button } from 'antd';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const Nav = () => {
  const { username, email , no } = useContext(AppContext);
  const [gap, setGap] = useState(false);
  const [pop, setPop] = useState(false); // created use state for popup
  return (
    <div className='nav'>
      <h4 className='user'>{username}</h4>
      {/* ------------------------------------Avatar------------------------------------ */}
      <Avatar
        className='avatar'
        style={{
          backgroundColor: 'orange',
          verticalAlign: 'middle',
        }}
        size="large"
        gap={gap}
        onClick={() => { setPop(!pop) }}
      >
        {username[0]}
      </Avatar>
      {/* ------------------------------------Popup condition------------------------------------ */}
      {pop === true ? (
        <div className='popup'>
          <Button type="" className='small' onClick={() => { setGap(!gap) }} icon={<UserOutlined />}>profile</Button>
          {gap === true ? (
            <div className='profile'>
              <p>{username}</p>
              <p>{email}</p> 
              <p>{no}</p> 
            </div>
          ) : ("")}
          <Link to="/">
            <Button type="" icon={<PoweroffOutlined /> }>logout</Button>
          </Link>
        </div>
      ) : (null)}
    </div>
  );
};

export default Nav;
