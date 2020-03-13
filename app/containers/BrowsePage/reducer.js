import {MAPPING_MOVIE,apiDecode} from 'utils/constants';

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
      let moviesReady = action.data.map(x=>apiDecode(x,MAPPING_MOVIE)); 
      return {
        ...state,
        isFetching:false,
        movies:moviesReady
      }
    },
    'FETCHING_Movies_ERROR':()=>{
      return {
        ...state,
        isFetching:false,
        error:true,
        movies:[]
      }
    }
  }

  return evalState(actions,action,state);
}