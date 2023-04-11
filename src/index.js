import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPictures } from './js/fetchPictures';
import { renderGallery } from './js/renderGallery';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('input.input');
const lightbox = new SimpleLightbox('.gallery a');
let page = 1;
let perPage = 40;
// let value = '';

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  console.log(searchInput.value);

  if (!searchInput.value.trim()) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    gallery.innerHTML = '';
    return;
  }

  const data = await fetchPictures(searchInput.value, page);
  gallery.innerHTML = renderGallery(data.hits);
  lightbox.refresh();

  if (data.totalHits >= 1) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

  if (data.totalHits === 0) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});

// searchForm.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
// const height =
//   document.documentElement.scrollHeight - document.documentElement.clientHeight;
// const windowScroll =
//   document.body.scrollTop || document.documentElement.scrollTop;
// const scrolled = (windowScroll / height) * 100;

// window.addEventListener(
//   'scroll',
//   debounce(async () => {
//     if (
//       document.documentElement.scrollHeight - window.innerHeight <=
//       window.scrollY
//     ) {
//       try {
//         const { data } = await fetchPictures(searchInput.value, page, perPage);
//         console.log(data);
//         page++;
//         gallery.innerHTML += renderGallery(data);
//         Notiflix.Notify.failure(
//           "We're sorry, but you've reached the end of search results."
//         );
//         const { height: cardHeight } = document
//           .querySelector('.gallery')
//           .firstElementChild.getBoundingClientRect();
//         window.scrollBy({
//           top: cardHeight * 2,
//           behavior: 'smooth',
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }, 300)
// );

window.addEventListener(
  'scroll',
  debounce(() => {
    if (
      document.documentElement.scrollHeight - window.innerHeight <=
      window.scrollY
    ) {
      page++;
      fetchPictures(searchInput.value, page, perPage)
        .then(data => {
          gallery.innerHTML += renderGallery(data.hits);
          lightbox.refresh();
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        })

        .catch(err => console.log(err));
    }
  }, 300)
);
