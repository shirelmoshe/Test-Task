// script.js
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const imageContainer = document.getElementById('image-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementById('close-modal');

searchButton.addEventListener('click', performSearch);

function performSearch() {
  const searchTerm = searchInput.value.trim();
console.log(searchTerm)
  if (searchTerm !== '') {
    fetch(`https://pixabay.com/api/?key=38268432-3aef07b3abb18c54d3ff5f1cd&q==${encodeURIComponent(searchTerm)}`)
      .then(response => response.json())
      .then(data => {
        const images = data.hits;
        displayImages(images);
        console.log(images)
      })
      .catch(error => {
        console.log('Error retrieving images:', error);
      });
  }
}

function displayImages(images) {
  imageContainer.innerHTML = '';

  images.forEach(image => {
    const imageCard = createImageCard(image);
    imageContainer.appendChild(imageCard);
  });
}

function createImageCard(image) {
  const imageCard = document.createElement('div');
  imageCard.classList.add('image-card');

  const imageElement = document.createElement('img');
  imageElement.src = image.previewURL;
  imageElement.alt = image.tags;

  imageElement.addEventListener('click', () => {
    openModal(image);
  });

  imageCard.appendChild(imageElement);

  return imageCard;
}

function openModal(image) {
  modalContent.innerHTML = '';

  const modalImage = document.createElement('img');
  modalImage.src = image.largeImageURL;
  modalImage.alt = image.tags;

  modalContent.appendChild(modalImage);
  modal.classList.add('show-modal');
}

closeModalButton.addEventListener('click', closeModal);

function closeModal() {
  modal.classList.remove('show-modal');
}
