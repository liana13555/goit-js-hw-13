import './sass/main.scss';
import PhotosApiService from './js/photos-service';
import getRefs from './js/get-refs';
import photoCard from './templates/photo-card.hbs';
import Notiflix from "notiflix";

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

    try {
        const response = await photosApiService.fetchPhotos();
        console.log(response);
        console.log(response.length);
        if (response.length === 0) {
            refs.loadMoreBtn.classList.add('is-hidden');
            getErrorMessage('Sorry, there are no images matching your search query. Please try again.');

        } else if (condition) {
            getInfoMessage("We're sorry, but you've reached the end of search results.");
            
        } else {
            refs.loadMoreBtn.classList.remove('is-hidden');
            return await appendHitsMarkup(response);            
        }

    } catch (error) {
         console.log(error);
    }  
    
    //    photosApiService.fetchPhotos().then(hits => {       
    //         appendHitsMarkup(hits)   
    // });    
}

async function onLoadMore() {
    try {
        const response = await photosApiService.fetchPhotos();     
        return await appendHitsMarkup(response);
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