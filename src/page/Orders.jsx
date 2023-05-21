import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../components/Card/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get('http://localhost:3001/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.orderItems], []));
        setIsLoading(false);
      })();
    } catch (error) {
      alert('Ошибка при запросе заказов!');
      console.error(error);
    }
  }, []);

  return (
    <div className='content p-40'>
      <div className='d-flex justify-between align-center mb-40'>
        <h1>Мои заказы</h1>
      </div>

      <div className='sneakers'>
        {orders.length > 0 ? (
          <>
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
              <Card key={index} loading={isLoading} {...item} />
            ))}
          </>
        ) : (
          <div className='emoji_block'>
            <img src='img/icons/emoji2.svg' alt='Emogi' />
            <h1>У вас нет заказов</h1>
            <p>
              Ничего нету ?<br /> Оформите хотя бы один заказ.
            </p>
            <Link to='/'>
              <button>
                <img className='img_arrow' src='img/icons/arrow.svg' alt='Arrow' /> Вернуться назад
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
