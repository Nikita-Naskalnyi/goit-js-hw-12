import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getPhoto = async function (dataName, currentPage) {
  const data = await axios.get('', {
    params: {
      key: '49375112-dd0d1364feb3efc0ffe9630b6',
      q: dataName,
      page: currentPage,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return data;
};
