// const axios = require('axios');
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '22568340-3d930d703d1ad37110880a9ab';

export default class PhotosApiService {
    constructor() {
        this.searchRequest = '';
        this.page = 1;
        this.per_page = 4;
    }

    async fetchPhotos() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

        const response = await axios.get(url);
        this.incrementPage();
        return response.data;  
        
        // return fetch(url)
            // .then(response => response.json())
            // .then(({ hits }) => {
            //     this.incrementPage();                
            //     return hits;
            // });
    };

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchRequest;
    };
    set query(newRequest) {
        this.searchRequest = newRequest;
    };
}





// function fetchPhoto() {
//     return fetch(`${BASE_URL}?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=1`)
//         .then(response => response.json());
// }

// export default { fetchPhoto };