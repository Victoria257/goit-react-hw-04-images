import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [name, setName] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
