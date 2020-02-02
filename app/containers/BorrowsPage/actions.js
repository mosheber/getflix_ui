const borrows = [
  {
    id:1,
    userId:2,
    userName: 'shlomo',
    movieId:2,
    movieName: 'Avengers: Endgame',
    startDate: '2019-01-01',
    endDate: '2019-01-14',
    isReturned: false
  },
  {
    id:2,
    userId:1,
    userName: 'moshe',
    movieId:3,
    movieName: 'Lion King',
    startDate: '2019-01-02',
    endDate: '2019-01-09',
    isReturned: true
  }
]

export function fetchBorrows(userId){
  return (dispatch)=> {
    dispatch(getBorrows());

    return new Promise((resolve,reject)=>{
        resolve(JSON.stringify(borrows));
    })
      .then(res => {
        return JSON.parse(res);
      })
    .then(json=>dispatch(getBorrowsSuccess(json)))
    .catch(err=>dispatch(getBorrowsError(err)))
  }
}


function getBorrows(){
  return {
    type:'FETCHING_Borrows'
  }
}


function getBorrowsSuccess(data){
  return {
    type:'FETCHING_Borrows_SUCCESS',
    data
  }
}

function getBorrowsError(data){
  return {
    type:'FETCHING_Borrows_ERROR'
  }
}


export function borrowMovie(userId,movieId){
  return (dispatch)=> {
    dispatch(borrowMovieBegin());

    return new Promise((resolve,reject)=>{
        resolve(JSON.stringify({result:'success'}));
    })
      .then(res => {
        return JSON.parse(res);
      })
    .then(json=>dispatch(borrowMovieSuccess(json)))
    .catch(err=>dispatch(borrowMovieError(err)))
  }
}


function borrowMovieBegin(){
  return {
    type:'BORROW_MOVIE_BEGIN'
  }
}


function borrowMovieSuccess(data){
  return {
    type:'BORROW_MOVIE_SUCCESS',
    data
  }
}

function borrowMovieError(data){
  return {
    type:'BORROW_MOVIE_ERROR',
    data
  }
}



export function returnMovie(borrowId){
  return (dispatch)=> {
    dispatch(returnMovieBegin());

    return new Promise((resolve,reject)=>{
        resolve(JSON.stringify({result:'success'}));
    })
      .then(res => {
        return JSON.parse(res);
      })
    .then(json=>dispatch(returnMovieSuccess(json)))
    .catch(err=>dispatch(returnMovieError(err)))
  }
}


function returnMovieBegin(){
  return {
    type:'returnMovie_BEGIN'
  }
}


function returnMovieSuccess(data){
  return {
    type:'returnMovie_SUCCESS',
    data
  }
}

function returnMovieError(data){
  return {
    type:'returnMovie_ERROR',
    data
  }
}