import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { useCart } from '../../hooks/useCart';

export const Header = (props) => {
  const { totalPrice } = useCart();

  return (
    <header className='d-flex justify-between align-center'>
      <Link to='/'>
        <div className='d-flex align-center'>
          <img className='mr-15' src='img/icons/logo1.svg' width={45} height={40} alt='Logo' />
          <div className={styles.headerInfo}>
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className='d-flex'>
        <li className={`${styles.imgHead} mr-30 cu-p`} onClick={props.onClickCart}>
          <img className='mr-15' width={18} height={18} src='img/icons/basket.svg' alt='Basket' />
          <span>{totalPrice} руб.</span>
        </li>
        <li className={`${styles.imgHead} mr-35 `}>
          <Link to='/favorites'>
            <img width={20} height={18} src='img/icons/heart.svg' alt='Bookmarks' />
          </Link>
        </li>
        <li className={styles.imgHead}>
          <Link to='/orders'>
            <img width={20} height={20} src='img/icons/user.svg' alt='User' />
          </Link>
        </li>
      </ul>
    </header>
  );
};
