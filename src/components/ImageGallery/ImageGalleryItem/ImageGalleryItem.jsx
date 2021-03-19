import s from './ImageGalleryItem.module.css';

function ImageGalleryItem ({ webformatURL, tags, largeImageURL, onClick }) {
  return (
    <>
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        data-lgimage={largeImageURL}
        onClick={onClick}
      />
    </li>
    </>
  );
};

export default ImageGalleryItem;
