import iziToast from 'izitoast';
import { getPhoto } from './js/pixabay-api';
import { createGalleryMarkup, createLightBox } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  backdrop: document.querySelector('.backdrop'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};
let page = 1;
let dataName = '';
let totalPages = 0;

const showLoader = () => {
  refs.backdrop.classList.remove('is-hidden');
};

const hideLoader = () => {
  refs.backdrop.classList.add('is-hidden');
};

const onScrollPage = () => {
  const card = refs.gallery.firstElementChild;
  if (card) {
    const { height: cardHeight } = card.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};

const searchInput = async function (event) {
  event.preventDefault();
  dataName = event.currentTarget.elements['search-text'].value.trim();

  if (dataName === '') {
    alert('Please enter a valid data');
    return;
  }

  showLoader();

  page = 1;
  try {
    const { data } = await getPhoto(dataName, page);

    if (data.hits.length === 0) {
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
      refs.loadMoreBtn.classList.add('is-hidden')
      return;
    }


    const galleryTemplate = data.hits
      .map(img => createGalleryMarkup(img))
      .join('');

    refs.gallery.innerHTML = galleryTemplate;

    if (data.totalHits > 15) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.addEventListener('click', onLoadMoreButton);
    } else {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreButton);
    }

    createLightBox();
    refs.form.reset();
  } catch (error) {
    iziToast.error({
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      message: 'Oops! Something went wrong. Please try again later.',
      timeout: 10000,
    });
    refs.gallery.innerHTML = '';
  } finally {
    hideLoader();
    refs.form.reset();
  }
};

const onLoadMoreButton = async event => {
  try {
    page++;

    showLoader();
    const { data } = await getPhoto(dataName, page);

    const galleryTemplate = data.hits
      .map(img => createGalleryMarkup(img))
      .join('');
    refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate)
    createLightBox();
    onScrollPage();
    if (page * 15 >= data.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreButton);
      iziToast.show({
        messageColor: '#ffffff',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#6C8CFF',
        timeout: 5000,
      });
    }
  } catch (error) {
    iziToast.error({
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      message: 'Oops! Something went wrong. Please try again later.',
      timeout: 10000,
    });
  } finally {
    hideLoader();
  }
};

refs.form.addEventListener('submit', searchInput);
