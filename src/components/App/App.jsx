import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImg } from 'components/services/api';
import css from './App.module.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

const App = () => {
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentLargeImg, setCurrentLargeImg] = useState('');
  const [currentTagImg, setCurrentTagImg] = useState('');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (images.length > 12) {
      const { height: cardHeight } = document
        .querySelector('li')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy(
        {
          top: cardHeight * 3,
          behavior: 'smooth',
        },
        [images, page]
      );
    }
  });

  useEffect(() => {
    if (request === '') {
      return;
    }
    setIsLoading(true);
    fetchImg(request, page)
      .then(response => {
        setImages(prevState => [...prevState, ...response]);
        setShowButton(true);
        setIsLoading(false);

        if (response.length === 0) {
          setImages([]);
          setShowButton(false);
          setIsLoading(false);

          return Promise.reject(
            new Error(`There is no image with name ${request}`)
          );
        }

        if (response.length <= 11) {
          setShowButton(false);
          toast.warn(`Sorry, but you've reached the end of search results.`);
        } else {
          setShowButton(true);
        }
      })
      .catch(error => {
        // setError(error);
        setIsLoading(false);
        toast.warn(`${error.message}`);
      });
  }, [page, request]);

  const handleSearchSubmit = searchText => {
    if (searchText !== request) {
      setRequest(searchText);
      setPage(1);
      setImages([]);
    }
  };

  const openModal = event => {
    setCurrentLargeImg(event.currentTarget.dataset.img);
    setCurrentTagImg(event.currentTarget.alt);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {images && <ImageGallery images={images} openModal={openModal} />}
      {isLoading && <Loader />}
      {showButton && (
        <Button type="button" text="Load more" onClick={loadMore} />
      )}
      {showModal && (
        <Modal
          largeImg={currentLargeImg}
          tags={currentTagImg}
          onClose={toggleModal}
        />
      )}
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};

export default App;
