import React, { useContext } from 'react';
import { Card } from '../components/Card/Card';
import AppContext from '../context/context';
import { Link } from 'react-router-dom';

export const Favorite = () => {
  const { favorites, onFavorite, onAddToCart } = useContext(AppContext);

  return (
    <div className='content p-40'>
      <div className='d-flex justify-between align-center mb-40'>
        <h1>Мои закладки</h1>
      </div>

      <div className='sneakers'>
        {favorites.length > 0 ? (
          <>
            {favorites?.map((item) => {
              return (
                <div key={item.id}>
                  <Card
                    favorited={true}
                    onFavorites={(obj) => onFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                    {...item}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <div className='emoji_block'>
            <img src='img/icons/emoji1.svg' alt='Emogi' />
            <h1>Закладок нет</h1>
            <p>Вы ничего не добавляли в закладки</p>
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
