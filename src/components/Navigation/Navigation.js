import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import style from './Navigation.module.css';

const Navigation = () => (
  <ul className={style.list}>
    <li>
      <NavLink exact to={routes.HOME}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to={routes.MOVIES}>Movies</NavLink>
    </li>
  </ul>
);

export default Navigation;
