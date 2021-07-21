export default function getRefs() {
    return {
        photoContainer: document.querySelector('.gallery'),
        searchForm: document.getElementById('search-form'),
        loadMoreBtn: document.querySelector('.load-more'),
    };
}