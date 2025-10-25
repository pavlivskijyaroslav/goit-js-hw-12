import * as pixabayApi from './js/pixabay-api.js';
import * as renderFunction from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const userQuery = document.querySelector("input[name='search-text']");

form.addEventListener('submit', e => {
  e.preventDefault();
  renderFunction.clearGallery();
  const userQueryTrim = userQuery.value.trim();
  if (!userQueryTrim) {
    iziToast.warning({
      close: false,
      progressBar: false,
      timeout: 3000,
      pauseOnHover: false,
      position: 'topRight',
      color: 'yellow',
      message: 'Enter text to search for',
    });
    return;
  }
  renderFunction.showLoader();
  pixabayApi
    .getImagesByQuery(userQueryTrim)
    .then(images => {
      if (images && images.length > 0) {
        renderFunction.createGallery(images);
      }
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.error(error);
    })
    .finally(() => {
      renderFunction.hideLoader();
    });
});
