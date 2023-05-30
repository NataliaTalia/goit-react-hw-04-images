import React from 'react';
import { useState } from 'react';

import css from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from 'binoculars-icon.svg';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleInput = e => {
    setPictureName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (pictureName.trim() === '') {
      alert('Please write the name of the image');
      return;
    }
    onSubmit(pictureName);
    setPictureName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={pictureName}
          onChange={handleInput}
        />
        <button type="submit" className={css.SearchFormButton}>
          <SearchIcon className={css.SearchFormButtonIcon} />
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
