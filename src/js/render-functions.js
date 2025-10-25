import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const userList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
export function createGallery(images) {
  const markup = images
    .map(images => {
      return `
<li class="gallery-item">
  <a class="gallery-link" href="${images.largeImageURL}">
    <img 
      class="gallery-image" 
      src="${images.largeImageURL}" 
      alt="${images.tags}" 
    />
        <ul class="stats">
    <li class="stats-item">Likes <p>${images.likes}</p>
    </li>
    <li class="stats-item">Views <p>${images.views}</p>
    </li>
    <li class="stats-item">Comments <p>${images.comments}</p>
    </li>
    <li class="stats-item">Downloads <p>${images.downloads}</p>
    </li>
  </ul>
  </a>
  

</li>
`;
    })
    .join('');
  userList.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
export function clearGallery() {
  if (userList && userList.children.length > 0) {
    userList.innerHTML = '';
  }
}
export function showLoader() {
  loader.style.display = 'block';
}
export function hideLoader() {
  loader.style.display = 'none';
}
