/* Autorisation pour l'API */
const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzRhOGM1OWY2YzNhMTAyZjRhMjgxMDA4MWUzNjFmOCIsInN1YiI6IjY2NmZlNjY2NGM2ODYzNTA2OGQxZGE0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4AYlJCatnxFyBL9pjf3SYKkkp9wxH_w101BhodtYeTU'
    }
};

fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


    const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzRhOGM1OWY2YzNhMTAyZjRhMjgxMDA4MWUzNjFmOCIsInN1YiI6IjY2NmZlNjY2NGM2ODYzNTA2OGQxZGE0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4AYlJCatnxFyBL9pjf3SYKkkp9wxH_w101BhodtYeTU';
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    document.addEventListener('DOMContentLoaded', () => {
        loadLatestMovies();
        loadGenres();
        setupSearch();
        setupLoginRegisterPopup();
    });
    
    function fetchAPI(endpoint) {
        return fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': API_KEY
            }
        }).then(response => response.json());
    }
    
    function loadLatestMovies() {
        fetchAPI('/movie/now_playing').then(data => {
            const latestMoviesContainer = document.getElementById('latest-movies');
            data.results.forEach(movie => {
                const movieSlide = document.createElement('div');
                movieSlide.className = 'swiper-slide';
                movieSlide.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <p>${movie.title}</p>`;
                latestMoviesContainer.appendChild(movieSlide);
            });
            new Swiper('.latest-swiper', {
                pagination: { el: '.swiper-pagination' },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
            });
        });
    }
    
    function loadGenres() {
        fetchAPI('/genre/movie/list').then(data => {
            const genreTabsContainer = document.querySelector('.genre-tabs');
            data.genres.forEach(genre => {
                const genreTab = document.createElement('button');
                genreTab.textContent = genre.name;
                genreTab.addEventListener('click', () => loadMoviesByGenre(genre.id));
                genreTabsContainer.appendChild(genreTab);
            });
        });
    }
    
    function loadMoviesByGenre(genreId) {
        fetchAPI(`/discover/movie?with_genres=${genreId}`).then(data => {
            const genreMoviesContainer = document.getElementById('genre-movies');
            genreMoviesContainer.innerHTML = '';
            data.results.forEach(movie => {
                const movieSlide = document.createElement('div');
                movieSlide.className = 'swiper-slide';
                movieSlide.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <p>${movie.title}</p>`;
                genreMoviesContainer.appendChild(movieSlide);
            });
            new Swiper('.genre-swiper', {
                pagination: { el: '.swiper-pagination' },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
            });
        });
    }
    
    function setupSearch() {
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', () => {
            const query = searchInput.value;
            if (query) {
                fetchAPI(`/search/movie?query=${query}`).then(data => {
                    const searchResultsContainer = document.getElementById('search-results');
                    searchResultsContainer.innerHTML = `<h2>Results for "${query}"</h2>`;
                    data.results.forEach(movie => {
                        const movieResult = document.createElement('div');
                        movieResult.innerHTML = `
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                            <p>${movie.title} (${movie.release_date.split('-')[0]})</p>`;
                        searchResultsContainer.appendChild(movieResult);
                    });
                });
            }
        });
    }
    
    function setupLoginRegisterPopup() {
        const popup = document.getElementById('login-register-popup');
        const form = document.getElementById('login-register-form');
        document.querySelector('header').addEventListener('click', () => {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.close-popup').addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());
            console.log(userData);
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    
    function loadGenres() {
        fetchAPI('/genre/movie/list').then(data => {
            const genreTabsContainer = document.querySelector('.genre-tabs');
            data.genres.forEach(genre => {
                const genreTab = document.createElement('button');
                genreTab.textContent = genre.name;
                genreTab.addEventListener('click', () => loadMoviesByGenre(genre.id));
                genreTabsContainer.appendChild(genreTab);
            });
        });
    }
    
    function loadMoviesByGenre(genreId) {
        fetchAPI(`/discover/movie?with_genres=${genreId}`).then(data => {
            const genreMoviesContainer = document.querySelector('#genre-movies .swiper-wrapper');
            genreMoviesContainer.innerHTML = '';
            data.results.forEach(movie => {
                const movieSlide = document.createElement('div');
                movieSlide.className = 'swiper-slide';
                movieSlide.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                                        <p>${movie.title}</p>`;
                genreMoviesContainer.appendChild(movieSlide);
            });
            new Swiper('#genre-movies', {
                pagination: { el: '.swiper-pagination' },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
            });
        });
    }
    
    function setupSearch() {
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', () => {
            const query = searchInput.value;
            if (query) {
                fetchAPI(`/search/movie?query=${query}`).then(data => {
                    const searchResultsContainer = document.getElementById('search-results');
                    searchResultsContainer.innerHTML = `<h2>Results for "${query}"</h2>`;
                    data.results.forEach(movie => {
                        const movieResult = document.createElement('div');
                        movieResult.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                                                 <p>${movie.title} (${movie.release_date.split('-')[0]})</p>`;
                        searchResultsContainer.appendChild(movieResult);
                    });
                });
            }
        });
    }
    
    function setupLoginRegisterPopup() {
        const popup = document.getElementById('login-register-popup');
        const form = document.getElementById('login-register-form');
        document.querySelector('header').addEventListener('click', () => {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        document.querySelector('.close-popup').addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());
            console.log(userData);
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }