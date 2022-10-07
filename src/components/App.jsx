import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPhotos } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Text } from './Text';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);

      try {
        const data = await getPhotos(query, page);
        setItems(prevItems => {
          return [...prevItems, ...data.hits];
        });

        if (page < Math.ceil(data.total / 12)) {
          setIsVisible(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchImages();
    }
  }, [query, page]);

  const handleSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.query;
    if (value.trim() === '') {
      toast.error('Enter a search request', {
        theme: 'colored',
        autoClose: 2500,
      });
      return;
    }
    if (value.length !== 0 && value !== query) {
      setQuery(value);
      setItems([]);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = e => {
    const modalContent = e.target.dataset.large;
    setModalOpen(true);
    setModalContent(modalContent);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  const isPhotos = Boolean(items.length > 0);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <Text>Something went wrong...</Text>}

      {isPhotos ? (
        <ImageGallery items={items} onClick={openModal} />
      ) : (
        <Text>Sorry, there are no images</Text>
      )}
      {isVisible && !loading && <Button onClick={loadMore} />}
      {modalOpen && (
        <Modal onClose={closeModal} content={modalContent}>
          <img src={modalContent} alt="" />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};
