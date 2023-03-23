import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ imageList, openModal }) => {
  return (
    <ul className={css.gallery}>
      {imageList.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          id={id}
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
