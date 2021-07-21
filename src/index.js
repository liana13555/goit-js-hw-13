import './sass/main.scss';
import PhotosApiService from './js/photos-service';
import getRefs from './js/get-refs';
import photoCard from './templates/photo-card.hbs';
import Notiflix from "notiflix";

const refs = getRefs();

const photosApiService = new PhotosApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    
    photosApiService.query = e.currentTarget.elements.searchQuery.value;

    photosApiService.resetPage();
    photosApiService.fetchPhotos().then(hits => {
        clearHitsContainer();
        
        appendHitsMarkup(hits);        
    });    
}

function onLoadMore() {
    photosApiService.fetchPhotos().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
    refs.photoContainer.insertAdjacentHTML('beforeend', photoCard(hits));
    
}

function clearHitsContainer() {
  refs.photoContainer.innerHTML = '';
}

// function getErrorMessage(message) {
//     Notiflix.Notify.failure(message);
// }
