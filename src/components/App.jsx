import React from 'react';

import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';

import { Blocks } from 'react-loader-spinner';

import Button from 'components/Button/Button';

import Modal from 'components/Modal/Modal';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [pictures, setPictures] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectImage] = useState(null);

  useEffect(() => {
    if (pictureName !== '') {
      setLoading(true);
      setPictures(null);

      fetch(
        `https://pixabay.com/api/?q=${pictureName}&page=1&key=34942352-0200edd486f0f1b00fc000a19&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error(`No image with ${pictureName} name`));
        })
        .then(pictures => {
          if (pictures.hits.length === 0) {
            alert('There is no match');
          } else {
            setPictures(pictures);
          }
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    } else {
      setPictures(null);
    }
  }, [pictureName]);

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);

    fetch(
      `https://pixabay.com/api/?q=${pictureName}&page=${
        page + 1
      }&key=34942352-0200edd486f0f1b00fc000a19&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Failed to fetch images for page ${page + 1}`);
      })
      .then(newPictures => {
        setPictures(prevPictures => {
          if (prevPictures === null) {
            return { hits: [...newPictures.hits] };
          } else {
            return {
              ...prevPictures,
              hits: [...prevPictures.hits, ...newPictures.hits],
            };
          }
        });
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = imageURL => {
    setSelectImage(imageURL);
    setShowModal(true);
  };
  const hasMorePictures = pictures && pictures.hits.length < pictures.total;

  return (
    <div className={css.App}>
      {showModal && <Modal imageUrl={selectedImage} onClose={toggleModal} />}
      {error && <h1>{error.message}</h1>}
      <Searchbar onSubmit={setPictureName} />

      <ImageGallery pictures={pictures} onClick={openModal} />
      {loading && (
        <Blocks
          visible={true}
          height="180"
          width="180"
          ariaLabel="blocks-loading"
          wrapperStyle={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          wrapperClass={css.BlocksWrapper}
        />
      )}
      {hasMorePictures && <Button onClick={handleLoadMore} />}
    </div>
  );
}

// export default class App extends Component {
//   state = {
//     pictureName: '',
//     pictures: null,
//     loading: false,
//     error: null,
//     page: 1,
//     showModal: false,
//     selectedImage: null,
//   };

//   handleFormSubmit = pictureName => {
//     this.setState({ pictureName });
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.pictureName !== this.state.pictureName) {
//

//       this.setState({ loading: true, pictures: null });
//       fetch(
//         `https://pixabay.com/api/?q=${this.state.pictureName}&page=1&key=34942352-0200edd486f0f1b00fc000a19&image_type=photo&orientation=horizontal&per_page=12`
//       )
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }

//           return Promise.reject(
//             new Error(`No image with ${this.state.pictureName} name`)
//           );
//         })
//         .then(pictures => {
//           if (pictures.hits.length === 0) {
//             alert('There is no match');
//           } else {
//             this.setState({ pictures });
//           }
//         })
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       loading: true,
//       page: prevState.page + 1,
//     }));
//     fetch(
//       `https://pixabay.com/api/?q=${this.state.pictureName}&page=${
//         this.state.page + 1
//       }&key=34942352-0200edd486f0f1b00fc000a19&image_type=photo&orientation=horizontal&per_page=12`
//     )
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error(
//           `Failed to fetch images for page ${this.state.page + 1}`
//         );
//       })
//       .then(newPictures => {
//         this.setState(prevState => ({
//           pictures: {
//             ...prevState.pictures,
//             hits: [...prevState.pictures.hits, ...newPictures.hits],
//           },
//           loading: false,
//         }));
//       })
//       .catch(error => this.setState({ error, loading: false }));
//   };

//   toggleModal = () => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//     }));
//   };

//   openModal = imageURL => {
//     this.setState({
//       selectedImage: imageURL,
//       showModal: true,
//     });
//   };

//   render() {
//     const { error, loading, pictures, selectedImage, showModal } = this.state;
//     const hasMorePictures = pictures && pictures.hits.length < pictures.total;

//     return (
//       <div
//         className={css.App}

//       >
//         {showModal && (
//           <Modal imageUrl={selectedImage} onClose={this.toggleModal} />
//         )}
//         {error && <h1>{error.message}</h1>}
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         <ImageGallery pictures={pictures} onClick={this.openModal} />
//         {loading && (
//           <Blocks
//             visible={true}
//             height="180"
//             width="180"
//             ariaLabel="blocks-loading"
//             wrapperStyle={{
//               position: 'fixed',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//             }}
//             wrapperClass={css.BlocksWrapper}
//           />
//         )}
//         {hasMorePictures && <Button onClick={this.handleLoadMore} />}
//       </div>
//     );
//   }
// }
