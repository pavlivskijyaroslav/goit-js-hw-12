import * as pixabayApi from './js/pixabay-api.js';
import * as renderFunction from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const userQuery = document.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector('.load-more');

let userQueryTrim = '';
let userPage = 1;

form.addEventListener('submit', async e => {
  e.preventDefault();

  userQueryTrim = userQuery.value.trim();
  userPage = 1;
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
    const images = await pixabayApi.getImagesByQuery(userQueryTrim, userPage);
    if (images && images.length > 0) {
      renderFunction.createGallery(images, userPage);
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
  renderFunction.hideLoadMoreButton();
  renderFunction.showLoader();
  let limit = 15;
  const totalPage = Math.ceil(200 / limit);
  if (userPage > totalPage) {
    renderFunction.hideLoader();
    return iziToast.error({
      close: false,
      progressBar: false,
      timeout: 3000,
      pauseOnHover: false,
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
  userPage += 1;

  try {
    const images = await pixabayApi.getImagesByQuery(userQueryTrim, userPage);
    if (images && images.length > 0) {
      renderFunction.createGallery(images, userPage);
      const firstCard = document.querySelector('.gallery-item');
      if (firstCard) {
        const cardHeight = firstCard.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
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
