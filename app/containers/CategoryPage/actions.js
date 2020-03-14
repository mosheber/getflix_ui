const Categories = [
]


// private int id;
// private int userId;
// private int movieId;
// private Date startDate;
// private Date endDate;
// private boolean isReturned;
//->
// id:2,
//     userId:1,
//     *userName: 'moshe',
//     movieId:3,
//     *movieName: 'Lion King',
//     startDate: '2019-01-02',
//     endDate: '2019-01-09',
//     isReturned: true

export function fetchCategories(){

  return (dispatch)=> {
    dispatch(getCategories());

    return fetch('http://localhost:8080/Categories', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
    .then(json=>dispatch(getCategoriesSuccess(json)))
    .catch(err=>dispatch(getCategoriesError(err)))
  }
}


function getCategories(){
  return {
    type:'FETCHING_Categories'
  }
}


function getCategoriesSuccess(data){
  return {
    type:'FETCHING_Categories_SUCCESS',
    data
  }
}

function getCategoriesError(data){
  return {
    type:'FETCHING_Categories_ERROR'
  }
}


function createCategory(category){
  return fetch('http://localhost:8080/Categories', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  })
}


function editCategory(category){
  return fetch('http://localhost:8080/Categories/'+category['id'], {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(category)
  })
}

export function manageCategory(category){
  let manage_category = 'id' in category ? editCategory(category) : createCategory(category);
  return (dispatch)=> {
    dispatch(CategoriesMovieBegin());

    return manage_category
      .then(res => {
        return res.json();
      })
    .then(json=>dispatch(CategoriesMovieSuccess(json)))
    .catch(err=>dispatch(CategoriesMovieError(err)))
  }
}


function CategoriesMovieBegin(){
  return {
    type:'Categories_MOVIE_BEGIN'
  }
}


function CategoriesMovieSuccess(data){
  return {
    type:'Categories_MOVIE_SUCCESS',
    data
  }
}

function CategoriesMovieError(data){
  return {
    type:'Categories_MOVIE_ERROR',
    data
  }
}


