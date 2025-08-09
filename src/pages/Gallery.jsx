import React, { useState } from 'react';

const Gallery = () => {
  // Get the list of image filenames from the public/designs directory
  const imagePaths = Object.keys(import.meta.glob('/public/designs/*.{jpg,jpeg,png,webp}', { eager: true })).map(
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
    <div className="min-h-screen mx-auto container py-20 px-8 lg:px-0">
      <div className="flex flex-col items-center mb-10">
        <h1 className="font-black tracking-tight text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white uppercase mb-2 text-center">
          Design Gallery
        </h1>
        <p className="font-light text-lg text-center max-w-2xl">
          A curated collection of personal and professional design work, including projects for the Land Surveyor's Board.
        </p>
      </div>

      {/* Redesigned grid gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {imagePaths.map((path, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={path}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              loading="lazy"
              onClick={() => openModal(index)}
            />
            <div
              className="absolute inset-0 bg-black/20 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <span className="opacity-0 group-hover:opacity-100 text-white text-lg font-semibold tracking-wide transition-opacity duration-300">
                View
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col items-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white text-4xl hover:text-[#fcba04] transition-colors z-10 cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Main image */}
            <img
              src={imagePaths[currentImageIndex]}
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
            />

            {/* Navigation buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-[#fcba04] hover:text-black transition-all z-10 cursor-pointer"
              aria-label="Previous image"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-[#fcba04] hover:text-black transition-all z-10 cursor-pointer"
              aria-label="Next image"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>

            {/* Image counter */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-[#fcba04] px-4 py-1 rounded-full text-base font-medium tracking-wide italic">
              {currentImageIndex + 1} / {imagePaths.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;