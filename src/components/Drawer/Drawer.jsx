import axios from 'axios';
import React, { useState } from 'react';

import styles from './Drawer.module.scss';
import { Info } from '../Info/Info';
import { useCart } from '../../hooks/useCart';

export const Drawer = ({ onClose, onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [compleateOrder, setCompleateOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:3001/orders', {
        orderItems: cartItems,
      });
      setOrderId(data.id);
      console.log(data);
      setCompleateOrder(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`http://localhost:3001/cart/${item.id}`);
        await delay(1500);
      }
    } catch (error) {
      alert('Ошибка при создании заказа!');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.basket}>
        <h2 className='d-flex justify-between mb-30'>
          Корзина{' '}
          <img
            onClick={onClose}
            width={32}
            height={32}
            className={`${styles.remove_btn} cu-p`}
            src='img/icons/removeBtn.svg'
            alt='Remove'
          />
        </h2>

        {cartItems.length > 0 ? (
          <>
            <div className={styles.items}>
              {cartItems?.map((obj, i) => (
                <div key={i} className={`${styles.cartItem}  d-flex align-center mb-20`}>
                  <div>
                    <img width={250} className='pr-20' src={obj.imageUrl} />
                  </div>
                  <div className='mr-20'>
                    <p className='mb-10'>{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.remove_btn}
                    src='img/icons/removeBtn.svg'
                    alt='Remove'
                  />
                </div>
              ))}
            </div>

            <div className={styles.total_block}>
              <ul>
                <li className='d-flex'>
                  <span>Итого: </span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{((totalPrice * 5) / 100).toFixed(2)} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className={styles.green_button}>
                Оформить заказ <img src='img/icons/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={compleateOrder ? `Заказ оформлен!` : 'Корзина пустая'}
            description={
              compleateOrder
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Корзина пустая Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={compleateOrder ? 'img/sneak_img/compleate.jpg' : 'img/icons/cart-empty.svg'}
          />
        )}
      </div>
    </div>
  );
};
