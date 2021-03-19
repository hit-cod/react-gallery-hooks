import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import apiService from '../services/apiService';

import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar';
import Button from '../Button/Button';
import Modal from '../Modal';

function PhotosView() {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImg, setLargeImg] = useState(null);
  const [altOfImage, setAltOfImage] = useState(null);
  const [error, setError] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    apiService
      .fetchPhotos(query, page)
      .then(({ hits }) => {
        setPhotos(prevPhotos => [...prevPhotos, ...hits]);
      })
      .catch(error => setError(error))
      .finally(setIsLoading(false));

  }, [query, page]);

  useEffect(() => {
    if(page === 1) return
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000)    
  }, [page]);

  const loadMorePhotos = () => {
    setPage(prevPage => prevPage + 1);
  }

  const handleSummit = input => {
    if(input === query) return
    setQuery(input);
    setPhotos([]);
    setPage(1);
  };

  const handlePhotoClick = e => {
    setLargeImg(e.target.dataset.lgimage);
    setAltOfImage(e.target.alt);
    setIsOverlayVisible(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayVisible(false);
  };

  const shouldRenderLoadMoreButton = photos.length > 0 && !isLoading;

  return (
    <>
      {error && <h1>Something went wrong. Please, try later.</h1>}

      <Searchbar onSubmit={handleSummit} />

      {photos.length > 0 && (
        <ImageGallery photos={photos} onClick={handlePhotoClick} />
      )}

      {isLoading && (
        <Loader
          type="MutatingDots"
          color="#4169e1"
          height={100}
          width={100}
          style={{ textAlign: 'center' }}
        />
      )}

      {shouldRenderLoadMoreButton && <Button onClick={loadMorePhotos} />}

      {isOverlayVisible && (
        <Modal
          onClick={handleOverlayClose}
          lgImg={largeImg}
          altOfImage={altOfImage}
        />
      )}
    </>
  );
}

export default PhotosView;

// import { Component } from 'react';
// import Loader from 'react-loader-spinner';

// import ImageGallery from '../ImageGallery';
// import Searchbar from '../Searchbar';
// import Button from '../Button/Button';
// import Modal from '../Modal';

// class PhotosView extends Component {
//   state = {
//     query: '',
//     photos: [],
//     page: 1,
//     largeImg: null,
//     altOfImage: null,
//     error: null,
//     isOverlayVisible: false,
//     isLoading: false,
//   };

//   componentDidUpdate(prevPr, prevSt) {
//     if (prevSt.query !== this.state.query) {
//       this.fetchPhotos();
//     }
//     if (prevSt.page !== this.state.page && prevSt.page !== 1) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }

//   handleSummit = input => {
//     this.setState({
//       query: input,
//       photos: [],
//       page: 1,
//     });
//   };

//   handlePhotoClick = e => {
//     this.setState(prevSt => ({
//       ...prevSt,
//       largeImg: e.target.dataset.lgimage,
//       altOfImage: e.target.alt,
//       isOverlayVisible: true,
//     }));
//   };

//   handleOverlayClose = () => {
//     this.setState(prevSt => ({
//       ...prevSt,
//       isOverlayVisible: false,
//     }));
//   };

//   fetchPhotos = () => {
//     this.setState(prevSt => ({
//       ...prevSt,
//       isLoading: true,
//     }));

//     // setTimeout(() => {
//     fetch(
//       `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=20663127-62d3229d929679f587996a550&image_type=photo&orientation=horizontal&per_page=12`,
//     )
//       .then(response => response.json())
//       .then(({ hits }) => {
//         this.setState(({ photos, page }) => ({
//           photos: [...photos, ...hits],
//           page: page + 1,
//         }));
//       })
//       .catch(error => this.setState({ error }))
//       .finally(
//         this.setState(prevSt => ({
//           ...prevSt,
//           isLoading: false,
//         })),
//       );
//     // .finally(() => this.setState({ isLoading: false }));
//     // }, 500);
//   };

//   render() {
//     const {
//       photos,
//       isLoading,
//       error,
//       largeImg,
//       altOfImage,
//       isOverlayVisible,
//     } = this.state;
//     const shouldRenderLoadMoreButton = photos.length > 0 && !isLoading;

//     return (
//       <>
//         {error && <h1>Something went wrong. Please, try later.</h1>}

//         <Searchbar onSubmit={this.handleSummit} />

//         {photos.length > 0 && (
//           <ImageGallery photos={photos} onClick={this.handlePhotoClick} />
//         )}

//         {isLoading && (
//           <Loader
//             type="MutatingDots"
//             color="#4169e1"
//             height={100}
//             width={100}
//             style={{ textAlign: 'center' }}
//           />
//         )}

//         {shouldRenderLoadMoreButton && <Button onClick={this.fetchPhotos} />}

//         {isOverlayVisible && (
//           <Modal
//             onClick={this.handleOverlayClose}
//             lgImg={largeImg}
//             altOfImage={altOfImage}
//           />
//         )}
//       </>
//     );
//   }
// }

// export default PhotosView;
