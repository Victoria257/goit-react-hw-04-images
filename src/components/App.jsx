import { useState, useEffect } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from 'components/Api-Pixabay/Api-Pixabay';
import css from 'components/App.module.css';

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nameSearch, setNameSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages({ name: nameSearch, page });
        const images = data.hits;
        if (data.total === 0) {
          setError('error');
        }
        const pageTotal = Math.ceil(data.total / 12);
        setImages(prevState => [...prevState, ...images]);
        setTotal(pageTotal);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (nameSearch) {
      fetchData();
    }
  }, [nameSearch, page]);

  const onSubmit = event => {
    setImages([]);
    setError(null);
    setPage(1);
    setTotal(0);
    setNameSearch(event);
  };

  const onLoadMoreBtn = () => {
    if (page < total) {
      setPage(prevState => prevState + 1);
    }
  };

  const openModal = largeImageURL => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const onCloseModal = event => {
    if (event.target.name !== 'imageBig') setShowModal(false);
  };

  const onPressEsc = event => {
    if (event.code === 'Escape') setShowModal(false);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={onSubmit} />
      {error && (
        <p>
          По цьому запиту нічого не знайдено. Введіть, будь ласка, інший запит.
        </p>
      )}
      {images.length > 0 && (
        <ImageGallery imageList={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && page < total && !isLoading && (
        <Button onLoadMoreBtn={onLoadMoreBtn} />
      )}
      {page === total && <p>This is last page</p>}

      {showModal && (
        <Modal
          largeImage={largeImage}
          onCloseModal={onCloseModal}
          onPressEsc={onPressEsc}
        />
      )}
    </div>
  );
}
