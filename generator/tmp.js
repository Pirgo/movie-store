// const axios = require('axios').default;

// axios.get('https://api.themoviedb.org/3/title/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=Avengers: Endgame')
//     .then((result) => {
//         console.log(result.data);
//     }).catch((err) => {
//         console.log(err);
//     });

const axios = require('axios').default;

//axios.get('https://api.themoviedb.org/3/movie/680/credits?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
// axios.get('https://api.themoviedb.org/3/person/2231?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb')
//     .then((result) => {
//         //let x = JSON.parse(result.data);
//         console.log(result.data);
//     }).catch((err) => {
//         console.log(err);
//     });


// const { MovieDb } = require('moviedb-promise');
// const moviedb = new MovieDb('15d2ea6d0dc1d476efbca3eba2b9bbfb');


//https://api.themoviedb.org/3/movie/top_rated?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb

// const findMovie = async title => {
//     // Equivalant to { query: title }
//     const res = await moviedb.searchMovie(title);

//     return res;
// }

// try {
//     findMovie('alien').then(res => {
//         console.log(res);
//     });

// } catch (e) {
//     // Do something
// }

// moviedb.movieInfo({ id: 548257 }).then(res => {
//     console.log(res)
//   }).catch(console.error)



async function getBestMoviesList() {
    const res = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb');
    return await res.data;
}

getBestMoviesList().then(res => {
    console.log(JSON.stringify(res));

});