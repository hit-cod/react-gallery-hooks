import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery ({ photos, onClick }) {
  return (
    <ul className={s.ImageGallery}>
      {photos.map(photo => {
        return (
          <ImageGalleryItem
            key={photo.id}
            webformatURL={photo.webformatURL}
            tags={photo.tags}
            largeImageURL={photo.largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
