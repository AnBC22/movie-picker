import { moviesArray } from './data.js'

const genreSelectionEl = document.getElementById('genre-selection')
const getMovieBtn = document.getElementById('get-movie-btn')
const movieModal = document.getElementById('movie-modal')
const movieModalInner = document.getElementById('movie-modal-inner')
const from2000Checkbox = document.getElementById('from2000')
const movieModalCloseBtn = document.getElementById('movie-modal-close-btn')

genreSelectionEl.addEventListener('change', highlightCheckedOption)
getMovieBtn.addEventListener('click', renderMovie)
movieModalCloseBtn.addEventListener('click', closeMovieModal)

//1.  ------------------------------------
function renderTheGenresRadios() {
    const arrayOfGenres = getNoDuplicatesGenresArray()
    
    let moviesToRender = ''
    
    for(let genre of arrayOfGenres) {
        
        moviesToRender += `
            <div class="genres-radios" id="genres-radios">
                <label for="${genre}">${genre}</label>
                <input 
                    type="radio" 
                    name="genre" 
                    id="${genre}" 
                    value="${genre}">
            </div>`
    }
    genreSelectionEl.innerHTML = moviesToRender
}

renderTheGenresRadios()
// ------------------------------------

function getNoDuplicatesGenresArray() {
    const allGenresArray = getAllGenresArray()
    
    const noDuplicatesArray = []
    
    for(let genre of allGenresArray) {
        if(!noDuplicatesArray.includes(genre)) {
            noDuplicatesArray.push(genre)
        }
    }
    return noDuplicatesArray
}
// ------------------------------------

function getAllGenresArray() {
    const arrayOfAllGenres = []
    
    for(let movieObj of moviesArray) {
        for(let movieGenre of movieObj.genres) {
            arrayOfAllGenres.push(movieGenre)
        }
    }
    return arrayOfAllGenres 
}
// ------------------------------------

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('genres-radios')
    
    for(let radio of radios) {
        radio.classList.remove('highlight')
    }
    
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}
// -----------------------------

function renderMovie() {
    const movieToRender = ''
    
    const arrayOfMovies = getArrayOfPossibleMovies() 
    
    if(arrayOfMovies.length > 0) {
        
        const randomIndex = Math.floor(Math.random() * arrayOfMovies.length)
    
        const movieSelected = arrayOfMovies[randomIndex]
        
        movieModalInner.innerHTML = `
            <img 
                src="${movieSelected.image}" 
                alt="${movieSelected.alt}">
                <h3 class="movie-selected-title">
                    ${movieSelected.title} (${movieSelected.year})
                </h3>`
        
        movieModal.style.display = 'block'
    }
    
}
// -----------------------------

function getArrayOfPossibleMovies() {
    
    const selectedGenre = document.querySelector('input[type="radio"]:checked')
    
    const arrayOfPossibleMovies = moviesArray.filter(function(movie) {
        if(from2000Checkbox.checked) {
            return movie.isFrom2000 && movie.genres.includes(selectedGenre.value)
        } else {
            return movie.genres.includes(selectedGenre.value)
        }
    })
    
    return arrayOfPossibleMovies
}

function closeMovieModal() {
    movieModal.style.display = 'none'
}