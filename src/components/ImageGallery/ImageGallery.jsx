import React from 'react';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures, onClick }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        {pictures &&
          pictures.hits.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              onClick={() => onClick(largeImageURL)}
            />
          ))}
      </ul>
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  pictures: PropTypes.shape({
    hits: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
  }),
  onClick: PropTypes.func,
};
