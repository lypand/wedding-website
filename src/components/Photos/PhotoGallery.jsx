import { useState } from 'react';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    '/images/IMG_6012.JPG',
    '/images/IMG_6015.JPG',
    '/images/IMG_6034.JPG',
    '/images/IMG_6042.JPG',
    '/images/IMG_6066.JPG',
    '/images/IMG_6078.JPG',
  ];

  const openLightbox = (photo) => {
    setSelectedImage(photo);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = photos.indexOf(selectedImage);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % photos.length;
    } else {
      newIndex = currentIndex - 1 < 0 ? photos.length - 1 : currentIndex - 1;
    }

    setSelectedImage(photos[newIndex]);
  };

  return (
    <section id="photos" style={styles.section}>
      <h2 style={styles.heading}>Photos</h2>
      <div style={styles.gallery}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className="photo-card"
            style={styles.photoCard}
            onClick={() => openLightbox(photo)}
          >
            <img src={photo} alt={`Wedding photo ${index + 1}`} style={styles.image} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div style={styles.lightbox} onClick={closeLightbox}>
          <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className="close-button" style={styles.closeButton} onClick={closeLightbox}>
              ✕
            </button>
            <button
              className="nav-button"
              style={{ ...styles.navButton, ...styles.prevButton }}
              onClick={() => navigateImage('prev')}
            >
              ‹
            </button>
            <img src={selectedImage} alt="Full size" style={styles.lightboxImage} />
            <button
              className="nav-button"
              style={{ ...styles.navButton, ...styles.nextButton }}
              onClick={() => navigateImage('next')}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const styles = {
  section: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '3rem',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  photoCard: {
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    aspectRatio: '1',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  lightbox: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '2rem',
  },
  lightboxContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightboxImage: {
    maxWidth: '100%',
    maxHeight: '90vh',
    objectFit: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: '-40px',
    right: '0',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '2rem',
    cursor: 'pointer',
    padding: '0.5rem',
    zIndex: 1001,
  },
  navButton: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    fontSize: '3rem',
    cursor: 'pointer',
    padding: '1rem',
    borderRadius: '4px',
    transition: 'background 0.3s ease',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  prevButton: {
    left: '-60px',
  },
  nextButton: {
    right: '-60px',
  },
};

export default PhotoGallery;
