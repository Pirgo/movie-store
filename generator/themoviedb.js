const axios = require('axios').default;

const BASE = 'https://api.themoviedb.org/3/';
const APIKEY = '?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb';

async function getBestMoviesList() {
    let moviesID = [];
    for (let i = 1; i <= 10; i++) {
        const URL = BASE + 'movie/top_rated' + APIKEY + '&page=' + i;
        //console.log(URL);
        const res = await axios.get(BASE + 'movie/top_rated' + APIKEY + '&page=' + i);
        //console.log(res.data.results);
        for (let m of res.data.results) {
            if (m.original_language === 'en') {
                moviesID.push(m.id);
            }
        }
    }
    return moviesID;
}

const movieIDs = [
    337404,
    724089,
    278,
    238 ];
/*    761053,
    696374,
    424,
    240,
    447362,
    497,
    441130,
    423108,
    680,
    389,
    122,
    155,
    13,
    556574,
    791373,
    615457,
    769,
    311,
    539,
    510,
    550,
    618344,
    537061,
    630566,
    324857,
    522924,
    599,
    1891,
    914,
    244786,
    73,
    423,
    664767,
    567,
    901,
    527641,
    120,
    27205,
    3082,
    807,
    121,
    313106,
    157336,
    432517,
    975,
    274,
    207,
    101,
    600354,
    508965,
    105,
    28,
    470044,
    37257,
    398818,
    299534,
    490132,
    299536,
    8587,
    1585,
    508442,
    399106,
    284,
    10098,
    185,
    694,
    354912,
    629,
    992,
    426,
    527774,
    16869,
    11,
    406997,
    77,
    705,
    872,
    103,
    1124,
    996,
    100,
    98,
    523781,
    606856,
    475557,
    50014,
    857,
    638507,
    11324,
    500,
    1422,
    239,
    324786,
    935,
    603,
    289,
    111,
    455661,
    426618,
    449176,
    92060,
    600,
    489,
    21634,
    522518,
    339877,
    334543,
    359940,
    68718
];*/


// getBestMoviesList().then(res => {
//     console.log(JSON.stringify(res));
// });

async function getMovies() {
    let movies = [];
    for (let id of movieIDs) {
        const URL = BASE + 'movie/' + id + APIKEY;
        //console.log(URL);
        const res = await axios.get(URL);
        let m = res.data;
        let movie = {};
        movie.id = m.id;
        movie.title = m.title;
        movie.genre = [];
        for(let g of m.genres) {
            movie.genre.push(g.name);
        }
        movie.date = new Date(m.release_date);
        movie.runtime = m.runtime;
        movie.plot = m.overview;
        movie.rate = {
            sum: 0,
            amount: 0
        };
        movie.directors = [];
        movie.writers = [];
        movie.actors = [];
        movie.cover = "https://image.tmdb.org/t/p/w500" + m.poster_path;
        movie.cover = m.cover;
        movie.adult = m.adult;
        movie.budget = m.budget;
        movie.revenue = m.revenue;


        //console.log(res.data);
        movies.push(movie);
    }
    return movies;
}


getMovies().then(res => {
    //console.log(res);
    console.log(JSON.stringify(res));
});









