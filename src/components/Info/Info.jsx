import React, { useContext } from 'react'
import AppContext from '../../context/context';
import styles from './Info.module.scss'

export const Info = ({ title, description,image }) => {
  const { setCartOpenet } = useContext(AppContext);
  return (
    <div className={`${styles.cartEmpty} d-flex align-center justify-center flex-column `}>
      <img className='draw_img mb-20' width={120} height={120} src={image} alt='EmptyCart' />
      <h2>{title}</h2>
      <p className='opacity-6'>{description}</p>
      <button onClick={() => setCartOpenet(false)} className={styles.greenButton}>
        <img src='img/icons/arrow.svg' alt='Arrow' />
        Вернуться назад
      </button>
    </div>
  );
}
