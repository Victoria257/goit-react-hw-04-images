import React, { Component } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from 'components/Api-Pixabay/Api-Pixabay';
import css from 'components/App.module.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    nameSearch: '',
    page: 1,
    total: 0,
    largeImage: '',
    showModal: false,
  };

  // async componentDidMount() {
  //   this.setState({ isLoading: true });
  //   const response = await axios.get(
  //     `https://pixabay.com/api/?q='beauty'&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.page}`
  //   );

  //   try {
  //     const images = response.data.hits;
  //     this.setState({ images });
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    const name = this.state.nameSearch;
    if (name !== prevState.nameSearch || this.state.page !== prevState.page) {
      this.setState({ isLoading: true });

      try {
        const data = await fetchImages({ name, page: this.state.page });
        const images = data.hits;
        if (fetch.total === 0) {
          this.setState({ error: 'error' });
        }
        const pageTotal = Math.ceil(data.total / 12);
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          total: pageTotal,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = event => {
    this.setState({
      images: [],
      error: null,
      page: 1,
      total: 0,

      nameSearch: event,
    });
  };

  onLoadMoreBtn = () => {
    this.setState(prevState => {
      if (this.state.page < this.state.total)
        return { page: prevState.page + 1 };
    });
  };

  openModal = largeImageURL => {
    this.setState(state => ({
      largeImage: largeImageURL,
      showModal: true,
    }));
  };

  onCloseModal = event => {
    if (event.target.name !== 'imageBig') {
      this.setState(state => ({
        showModal: false,
      }));
    }
  };

  onPressEsc = event => {
    if (event.code === 'Escape') {
      this.setState(state => ({
        showModal: false,
      }));
    }
  };

  render() {
    const { error, images, isLoading, page, total, showModal, largeImage } =
      this.state;
    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.onSubmit} />
        {error && (
          <p>
            По цьому запиту нічого не знайдено. Введіть, будь ласка, інший
            запит.
          </p>
        )}
        {images.length > 0 && (
          <ImageGallery imageList={images} openModal={this.openModal} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && page < total && !isLoading && (
          <Button onLoadMoreBtn={this.onLoadMoreBtn} />
        )}
        {page === total && <p>This is last page</p>}

        {showModal && (
          <Modal
            largeImage={largeImage}
            onCloseModal={this.onCloseModal}
            onPressEsc={this.onPressEsc}
          />
        )}
      </div>
    );
  }
}
