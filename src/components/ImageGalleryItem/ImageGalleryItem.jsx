import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  const handleClick = () => {
    onClick(webformatURL);
  };
  return (
    <li className={css.ImageGalleryItem} onClick={handleClick}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
