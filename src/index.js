import './sass/main.scss';
import PhotosApiService from './js/photos-service';
import getRefs from './js/get-refs';
import photoCard from './templates/photo-card.hbs';
import Notiflix from "notiflix";
// import SimpleLightbox from "simplelightbox";

const refs = getRefs();

const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();    
    photosApiService.query = e.currentTarget.elements.searchQuery.value;
    photosApiService.resetPage();
    refs.loadMoreBtn.classList.add('is-hidden');
    clearHitsContainer();

    if (photosApiService.query.trim() === '') {
        return;
    }
    try {
        const response = await photosApiService.fetchPhotos();
        await appendHitsMarkup(response.hits);
        console.log(response.totalHits);
        console.log(photosApiService.per_page);

           if (response.totalHits > photosApiService.per_page ) {
               getSuccessMessage(`"Hooray! We found ${response.totalHits} images."`);
               refs.loadMoreBtn.classList.remove('is-hidden');
        }  else if (response.hits.length === 0 ) {
           getErrorMessage('Sorry, there are no images matching your search query. Please try again.');
           } else if (response.totalHits < photosApiService.per_page) {
               refs.loadMoreBtn.classList.add('is-hidden');
               getInfoMessage("We're sorry, but you've reached the end of search results.");
        }
    } catch (error) {
        console.log(error);
    };
}

async function onLoadMore() {
    try {
        const response = await photosApiService.fetchPhotos();     
        return await appendHitsMarkup(response.hits);
    } catch (error) {
        console.log(error);
    }
    // photosApiService.fetchPhotos().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
    refs.photoContainer.insertAdjacentHTML('beforeend', photoCard(hits));    
}

function clearHitsContainer() {
  refs.photoContainer.innerHTML = '';
}

function getErrorMessage(message) {
    Notiflix.Notify.failure(message);
}

function getInfoMessage(message) {
    Notiflix.Notify.info(message);
}

function getSuccessMessage(message) {
   Notiflix.Notify.success(message);
}

// let lightbox = new SimpleLightbox('.gallery a');

// fetchPhotos(hits => {
//     appendHitsMarkup(hits);
//     lightbox.refresh();
// })