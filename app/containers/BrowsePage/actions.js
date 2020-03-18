
const tileData = []

import {CATEGORY_MAPPING} from 'utils/constants';

function getAllMovies(){
  return fetch('http://localhost:8080/Movies', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
}

function searchMovies(categoryId,searchString){
  return fetch('http://localhost:8080/Movies/ByCategory/'+categoryId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
}


export function fetchMovies(category,searchString){
  //let get_movies = category == 'All' ? getAllMovies() : searchMovies(category,searchString);
  let query = {
    categoryId:category,
    movieName:searchString
  };
  return (dispatch)=> {
    dispatch(getMovies());

    return fetch('http://localhost:8080/Movies/Query', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
      .then(res => {
        return res.json();
      })
      .then(movies=>{
        let moviesWithImages = movies.filter(x=>x.image && x.image.includes('data'));
        return moviesWithImages;
        // if(searchString==''){
        //   return moviesWithImages;
        // }
        // return moviesWithImages.filter(x=>x.name.includes(searchString) || x.description.includes(searchString))
      })
    .then(json=>dispatch(getMoviesSuccess(json)))
    .catch(err=>dispatch(getMoviesError(err)))
  }
}


function getMovies(){
  return {
    type:'FETCHING_Movies'
  }
}


function getMoviesSuccess(data){
  return {
    type:'FETCHING_Movies_SUCCESS',
    data
  }
}

function getMoviesError(data){
  return {
    type:'FETCHING_Movies_ERROR'
  }
}