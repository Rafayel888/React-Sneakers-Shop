import React from 'react';
import { Carousel } from './Carousel/Carousel';

export const Slider = () => {
  return (
    <section className='banner'>
      <Carousel>
        <div className='item item-1'>
          <div className='item'>
            <div className='info'>
              <p className='desc'>Stan Smith,</p>
              <h1 className='heading lv1 title'>Forever!</h1>
              <button className='btn primary'>Купить</button>
            </div>
            <img className='image' src='img/sneak_img/slider.png' />
          </div>
        </div>
        <div className='item item-2'>
          <div className='item'>
            <div className='info'>
              <p className='desc'>Stan Smith,</p>
              <h1 className='heading lv1 title'>Forever!</h1>
              <button className='btn primary'>Купить</button>
            </div>
            <img className='image' src='img/sneak_img/slider.png' />
          </div>
        </div>
        <div className='item item-3'>
          <div className='item'>
            <div className='info'>
              <p className='desc'>Stan Smith,</p>
              <h1 className='heading lv1 title'>Forever!</h1>
              <button className='btn primary'>Купить</button>
            </div>
            <img className='image' src='img/sneak_img/slider.png' />
          </div>
        </div>
      </Carousel>
    </section>
  );
};
