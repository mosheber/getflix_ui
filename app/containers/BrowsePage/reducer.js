function evalState(actions,action,state){
  if(Object.keys(actions).indexOf(action.type)>-1){
    return actions[action.type]();
  }
  else {
    return state;
  }
}

const initialState={
  movies:[],
} 

export default function MoviesReducer(state=initialState,action){
  const actions={
    'FETCHING_Movies':()=>{
      return {
        ...state,
        isFetching:true,
      }
    },
    'FETCHING_Movies_SUCCESS':()=>{
      return {
        ...state,
        isFetching:false,
        movies:action.data
      }
    },
    'FETCHING_Movies_ERROR':()=>{
      return {
        ...state,
        isFetching:false,
        error:true
      }
    }
  }

  return evalState(actions,action,state);
}