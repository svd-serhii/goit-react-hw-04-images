import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImg } from 'components/services/api';
import css from './App.module.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

class App extends Component {
  state = {
    request: '',
    page: 1,
    images: [],
    showModal: false,
    isLoading: false,
    error: null,
    currentLargeImg: '',
    currentTagImg: '',
    showButton: false,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.request;
    const newQuery = this.state.request;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (this.state.images.length > 12) {
      const { height: cardHeight } = document
        .querySelector('li')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 3,
        behavior: 'smooth',
      });
    }

    if (prevPage !== newPage || prevQuery !== newQuery) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      this.setState({ isLoading: true });
      fetchImg(newQuery, newPage)
        .then(response => {
          this.setState(prevState => ({
            images: [...prevState.images, ...response],
            showButton: true,
            isLoading: false,
          }));
          if (response.length === 0) {
            this.setState({ images: [], isLoading: false, showButton: false });
            return Promise.reject(
              new Error(`There is no image with name ${newQuery}`)
            );
          }
          if (response.length <= 11) {
            this.setState({ showButton: false });
            toast.warn(`Sorry, but you've reached the end of search results.`);
          } else {
            this.setState({ showButton: true });
          }
        })
        .catch(error => {
          this.setState({ error, isLoading: false });
          toast.warn(`${error.message}`);
        });
    }
  }

  handleSearchSubmit = request => {
    if (request !== this.state.request) {
      this.setState({ request, page: 1, images: [] });
    }
  };

  openModal = event => {
    const currentLargeImg = event.target.dataset.img;
    const currentTagImg = event.target.alt;
    this.setState({
      currentLargeImg,
      currentTagImg,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      images,
      isLoading,
      showButton,
      showModal,
      currentLargeImg,
      currentTagImg,
    } = this.state;

    return (
      <div className={css.App}>
        <ToastContainer autoClose={3000} theme="colored" />
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {images && <ImageGallery images={images} openModal={this.openModal} />}
        {isLoading && <Loader />}
        {showButton && (
          <Button type="button" text="Load more" onClick={this.loadMore} />
        )}
        {showModal && (
          <Modal
            largeImg={currentLargeImg}
            tags={currentTagImg}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
