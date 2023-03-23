import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  largeImageURL,
  webformatURL,
  openModal,
}) => {
  return (
    <li className={css.item} key={id} onClick={() => openModal(largeImageURL)}>
      <img src={webformatURL} alt="imageName" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
