import { useState, useEffect } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';


import titleFetchAPI from './fetchTitleAPI';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import Modal from './Modal/Modal';

function App(){
  const [title,setTitle] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [error,setError] = useState(null);
  const [page,setPage] = useState(1);
  const [largeImageId,setLargeImageId] = useState(null);
  const [gallery,setGallery] = useState([]);
  const [loading,setLoading] = useState(false);


  useEffect(()=>{
if(title ===''){
  return
}

titleFetchAPI.fetchTitle(title, page)
        .then(gallery => {
          if (!gallery.length) {
            setGallery([]);
            Notify.failure(
              `Неуспешный результат поиска ${title}. Попробуйте еще раз`
            );
            return;
          }

          if (!gallery) {
            setGallery(gallery);
          } else {
           setGallery(prevGallery => [...prevGallery, ...gallery]);
           scroll();
            return;
          }
        })

        .catch(error => {
          setError( error)
          Notify.failure(
            `Неуспешный результат поиска ${title}. попробуйте еще раз`
          );
          return;
        })

        .finally(() => setLoading(false ));

  },[title,page])



  const handleformSubmit = title => {
    setTitle(title);
  };

  const onClickLoadMore = () => {
setPage( page + 1 );
  };

  const onOpenModal = e => {
    console.log(e.target.id)

    setShowModal(true)
    
    setLargeImageId(Number(e.target.id))
  };


  const onSearchLargeImg = () => {

    const largeImg = gallery.find(image => {
      return image.id === largeImageId;
    });
    return largeImg;
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  
    return (
      <>
        <Searchbar onSubmit={handleformSubmit} />

        {loading && <Loader />}

        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} onOpen={onOpenModal} />
        )}

        {gallery.length >= 12 && <Button onClick={onClickLoadMore} />}

        {showModal && (
          <Modal onClose={()=>setShowModal(false)}>
            {
              <img
                src={onSearchLargeImg().largeImageURL}
                alt={onSearchLargeImg().tags}
              />
            }
          </Modal>
        )}

        {error && error}
      </>
    );
  }


export default App;
