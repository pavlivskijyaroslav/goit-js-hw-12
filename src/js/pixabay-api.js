import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '40329359-a15cc1b2c03eb2718994197fd',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    const images = response.data.hits;
    if (!images || images.length === 0) {
      iziToast.error({
        close: false,
        progressBar: false,
        timeout: 3000,
        pauseOnHover: false,
        position: 'topRight',
        color: 'red',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return [];
    }
    return images;
  } catch (error) {
    console.log(error);
    iziToast.error({
      close: false,
      progressBar: false,
      timeout: 3000,
      pauseOnHover: false,
      position: 'topRight',
      message: 'Something went wrong. Please try again later.',
    });
    return [];
  }
}
export { getImagesByQuery };
