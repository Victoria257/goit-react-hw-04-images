import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMoreBtn }) => {
  return (
    <button className={css.button} type="button" onClick={onLoadMoreBtn}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMoreBtn: PropTypes.func.isRequired,
};
