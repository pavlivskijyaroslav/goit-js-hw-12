import * as pixabayApi from './js/pixabay-api.js';
import * as renderFunction from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const userQuery = document.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector('.load-more');

let userQueryTrim = '';
let userPage = 1;
let totalPages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  userQueryTrim = userQuery.value.trim();
  userPage = 1;
  totalPages = 0;
  renderFunction.hideLoadMoreButton();
  renderFunction.clearGallery();

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

  try {
    const response = await pixabayApi.getImagesByQuery(userQueryTrim, userPage);
    const images = response.hits;
    const totalHits = response.totalHits;

    if (images.length === 0) {
      iziToast.info({
        close: false,
        progressBar: false,
        timeout: 3000,
        pauseOnHover: false,
        position: 'topRight',
        color: 'yellow',
        message: 'No images found. Try another search.',
        position: 'topRight',
      });
      return;
    }
    renderFunction.createGallery(images, userPage);

    const perPage = 15;
    totalPages = Math.ceil(totalHits / perPage);
    if (userPage >= totalPages) {
      iziToast.info({
        close: false,
        progressBar: false,
        timeout: 3000,
        pauseOnHover: false,
        position: 'topRight',
        color: 'blue',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      renderFunction.hideLoadMoreButton();
    } else {
      renderFunction.showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    renderFunction.hideLoader();
  }
});
loadMoreBtn.addEventListener('click', async () => {
  userPage += 1;
  renderFunction.hideLoadMoreButton();
  renderFunction.showLoader();

  try {
    const response = await pixabayApi.getImagesByQuery(userQueryTrim, userPage);
    const images = response.hits;
    renderFunction.createGallery(images, userPage);

    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
    if (userPage >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      renderFunction.hideLoadMoreButton();
    } else {
      renderFunction.showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    renderFunction.hideLoader();
  }
});
