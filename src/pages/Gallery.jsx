import React, { useState } from 'react';

const Gallery = () => {
  // Get the list of image filenames from the public/gallery directory
  const imagePaths = Object.keys(import.meta.glob('/public/gallery/*.{jpg,jpeg,png,webp}', { eager: true })).map(
    (path) => path.replace('/public', '')
  );

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Open modal with specific image
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1
    );
  };

  // Close modal when clicking outside image
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className='min-h-screen p-4 mx-auto max-w-7xl' id='heading'>
      <div className="font-black uppercase text-4xl md:text-5xl lg:text-6xl text-center">design gallery</div>

      <p className='font-light py-2'>Some curated designs from personal work and from Land Surveyor's Board</p>

      <div className="p-1 sm:p-5">
        <div className="columns-1 gap-2 sm:columns-2 sm:gap-3 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-4">
          {imagePaths.map((path, index) => (
            <img
              key={index}
              src={path}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-auto mb-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              loading="lazy"
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
            
            {/* Main image */}
            <img
              src={imagePaths[currentImageIndex]}
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Navigation buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-70 transition-all"
              aria-label="Previous image"
            >
              &larr;
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-70 transition-all"
              aria-label="Next image"
            >
              &rarr;
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {imagePaths.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;