function evalState(actions,action,state){
  if(Object.keys(actions).indexOf(action.type)>-1){
    return actions[action.type]();
  }
  else {
    return state;
  }
}

const initialState={
  borrows:[
    {
      id:0,
      userId:0,
      userName: 'none',
      movieId:9,
      movieName: 'none',
      startDate: '1970-01-01',
      endDate: '1970-01-01',
      isReturned: false
    }
  ],
  isFetchingMovieBorrow: false,
  isFetchingreturnMovie: false
} 

export default function BorrowsReducer(state=initialState,action){
  const actions={
    'FETCHING_Borrows':()=>{
      return {
        ...state,
        isFetching:true,
      }
    },
    'FETCHING_Borrows_SUCCESS':()=>{
      return {
        ...state,
        isFetching:false,
        borrows:action.data
      }
    },
    'FETCHING_Borrows_ERROR':()=>{
      return {
        ...state,
        isFetching:false,
        error:true
      }
    },
    'BORROW_MOVIE_BEGIN':()=>{
      return {
        ...state,
        isFetchingMovieBorrow:true,
      }
    },
    'BORROW_MOVIE_SUCCESS':()=>{
      return {
        ...state,
        isFetchingMovieBorrow:false,
        movieBorrowResult:action.data
      }
    },
    'BORROW_MOVIE_ERROR':()=>{
      return {
        ...state,
        isFetchingMovieBorrow:false,
        movieBorrowError:action.data
      }
    },
    'returnMovie_BEGIN':()=>{
      return {
        ...state,
        isFetchingreturnMovie:true,
      }
    },
    'returnMovie_SUCCESS':()=>{
      console.log(' in reducer returnMovie_SUCCESS')
      return {
        ...state,
        isFetchingreturnMovie:false,
        returnMovieResult:action.data
      }
    },
    'returnMovie_ERROR':()=>{
      return {
        ...state,
        isFetchingreturnMovie:false,
        returnMovieError:action.data
      }
    }
  }

  return evalState(actions,action,state);
}