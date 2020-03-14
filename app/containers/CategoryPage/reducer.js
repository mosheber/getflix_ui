
function evalState(actions,action,state){
  if(Object.keys(actions).indexOf(action.type)>-1){
    return actions[action.type]();
  }
  else {
    return state;
  }
}

const initialState={
  categories:[
  ],
  isFetchingMovieCategories: false,
  isFetchingreturnMovie: false
} 

export default function categoriesReducer(state=initialState,action){
  const actions={
    'FETCHING_Categories':()=>{
      return {
        ...state,
        isFetching:true,
      }
    },
    'FETCHING_Categories_SUCCESS':()=>{
      return {
        ...state,
        isFetching:false,
        categories:action.data
      }
    },
    'FETCHING_Categories_ERROR':()=>{
      return {
        ...state,
        isFetching:false,
        error:true,
        categories:[]
      }
    },
    'Categories_MOVIE_BEGIN':()=>{
      return {
        ...state,
        isFetchingMovieCategories:true,
      }
    },
    'Categories_MOVIE_SUCCESS':()=>{
      return {
        ...state,
        isFetchingMovieCategories:false,
        movieCategoriesResult:action.data
      }
    },
    'Categories_MOVIE_ERROR':()=>{
      return {
        ...state,
        isFetchingMovieCategories:false,
        movieCategoriesError:action.data
      }
    }
  }

  return evalState(actions,action,state);
}