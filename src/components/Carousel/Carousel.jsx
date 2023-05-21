import React, { useEffect, useState, Children, cloneElement, useRef } from 'react';
import styles from './Carousel.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Carousel = ({ children }) => {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(450);
  const windowRef = useRef();

  useEffect(() => {
    const resizeHandler = () => {
      const _width = windowRef.current.offsetWidth;
      setWidth(_width);
      setOffset(0);
    };
    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + width;
      return Math.min(newOffset, 0);
    });
  };
  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - width;
      const maxOffset = -(width * (pages.length - 1));
      return Math.max(newOffset, maxOffset);
    });
  };

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: '100%',
            maxWidth: `${width}%`,
          },
        });
      }),
    );
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.arrow_left}>
        <FaChevronLeft onClick={handleLeftArrowClick} />
      </div>
      <div ref={windowRef} className={styles.window}>
        <div
          className={styles.all_pages_container}
          style={{ transform: `translateX(${offset}px)` }}
        >
          {pages}
        </div>
      </div>
      <div className={styles.arrow_right}>
        <FaChevronRight onClick={handleRightArrowClick} />
      </div>
    </div>
  );
};
