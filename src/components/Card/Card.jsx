import React, { useContext, useState } from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context/context';

import styles from './Card.module.scss';

export const Card = ({
  id,
  name,
  imageUrl,
  price,
  onFavorites,
  onPlus,
  favorited = false,
  loading = false,
}) => {
  const { isItemAdded } = useContext(AppContext);

  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPluss = () => {
    onPlus({ id, name, imageUrl, price });
  };
  const onClickLike = () => {
    onFavorites({ id, name, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className={styles.card}>
        {loading ? (
          <ContentLoader
            className='skeleton'
            speed={2}
            width={155}
            height={250}
            viewBox='0 0 155 265'
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
          >
            <rect x='1' y='0' rx='10' ry='10' width='155' height='155' />
            <rect x='1' y='167' rx='5' ry='5' width='155' height='15' />
            <rect x='0' y='199' rx='0' ry='0' width='12' height='1' />
            <rect x='1' y='193' rx='5' ry='5' width='100' height='15' />
            <rect x='0' y='229' rx='5' ry='5' width='80' height='24' />
            <rect x='124' y='225' rx='10' ry='10' width='32' height='32' />
          </ContentLoader>
        ) : (
          <>
            {onFavorites && (
              <div className={styles.favorite}>
                <img
                  onClick={onClickLike}
                  src={isFavorite ? 'img/icons/heart_like.svg' : 'img/icons/heart_nolike.svg'}
                  alt='like'
                />
              </div>
            )}
            <img className={styles.card_img} src={imageUrl} alt='Sneakers' />
            <h5>{name}</h5>
            <div className='d-flex justify-between align-center mt-15'>
              <div className='d-flex flex-column'>
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>

              {onPlus && (
                <img
                  className='plus'
                  onClick={onClickPluss}
                  src={isItemAdded(id) ? 'img/icons/button_cheked.svg' : 'img/icons/btn_plus.svg'}
                  alt='Plus'
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
