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
    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.log(error);
  }
}
export { getImagesByQuery };
