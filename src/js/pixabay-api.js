import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getPhoto = function (dataName) {
  const data = axios.get('', {
    params: {
      key: '49375112-dd0d1364feb3efc0ffe9630b6',
      q: dataName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return data;
};
