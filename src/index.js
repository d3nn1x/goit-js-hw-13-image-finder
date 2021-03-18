import './styles.css';

import { debounce } from 'debounce';
import * as basicLightbox from 'basiclightbox';

import ref from './apiService.js';
import photoCardTpl from './temp/photoCard.hbs';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('[data-action="load-more"]');

function renderImage() {
  ref.fetchApi(ref.search).then(data => {
    const dataEl = data.hits.reduce((acc, item) => {
      return acc + photoCardTpl(item);
    }, '');
    galleryEl.insertAdjacentHTML('beforeend', dataEl);
    if (data.hits.length < 12) {
      btnLoadMore.classList.add('is-hidden');
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });
}

function searchImg(e) {
  ref.page = 1;
  ref.search = '';
  galleryEl.innerHTML = '';

  btnLoadMore.classList.remove('is-hidden');

  ref.search = e.target.value;
  renderImage();
}

function onLoadMore() {
  ref.page += 1;

  renderImage();
}

searchFormEl.addEventListener('input', debounce(searchImg, 500));

btnLoadMore.addEventListener('click', onLoadMore);
