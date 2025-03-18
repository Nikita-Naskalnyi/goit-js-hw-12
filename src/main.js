import iziToast from 'izitoast';
import { getPhoto } from './js/pixabay-api';
import { createGalleryMarkup, createLightBox } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
};

const showLoader = () => {
  refs.backdrop.classList.remove('is-hidden');
};

const hideLoader = () => {
  refs.backdrop.classList.add('is-hidden');
};

const searchInput = function (event) {
  event.preventDefault();
  const dataName = event.currentTarget.elements['search-text'].value.trim();

  if (dataName === '') {
    alert('Please enter a valid data');
    return;
  }

  showLoader();
  getPhoto(dataName)
    .then(({ data: { hits } }) => {
      if (hits.length === 0) {
        iziToast.error({
          messageColor: '#fff',
          close: false,
          icon: 'x',
          iconText: 'x',
          iconColor: '#fff',
          backgroundColor: '#ef4040',
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          timeout: 10000,
        });

        refs.gallery.innerHTML = '';
        return;
      }
      const galleryTemplate = hits
        .map(img => createGalleryMarkup(img))
        .join('');
      refs.gallery.innerHTML = galleryTemplate;
      createLightBox();
      refs.form.reset();
    })
    .catch(error => {
      iziToast.error({
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        message: 'Oops! Something went wrong. Please try again later.',
        timeout: 10000,
      });
      refs.gallery.innerHTML = '';
    })
    .finally(() => {
      hideLoader();
      refs.form.reset();
    });
};
refs.form.addEventListener('submit', searchInput);
