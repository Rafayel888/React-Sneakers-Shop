import React, { useContext, useState } from 'react';
import { Card } from '../components/Card/Card';
import AppContext from '../context/context';
import { Slider } from '../components/Slider';

export const Home = () => {
  const { items, onFavorite, onAddToCart, isLoading } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    const renderCard = filtredItems.map((item) => (
      <Card
        key={item.id}
        onFavorites={(obj) => onFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));

    const emptyCard = [...Array(8)].map((item, index) => <Card key={index} loading={true} />);

    return isLoading ? emptyCard : renderCard;
  };

  return (
    <div className='content p-40'>
      <div>
        <Slider />
      </div>
      <div className='head_pages d-flex justify-between align-center mb-40'>
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className='search-block d-flex align-center'>
          <img width={15} height={15} src='img/icons/search.svg' alt='Search' />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className='clear cu-p'
              src='img/icons/removeBtn.svg'
              alt='Clear'
            />
          )}
          <input value={searchValue} onChange={onChangeSearchInput} placeholder='Поиск...' />
        </div>
      </div>

      <div className='sneakers'>{renderItems()}</div>
    </div>
  );
};
