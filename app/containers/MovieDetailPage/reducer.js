function evalState(actions,action,state){
  if(Object.keys(actions).indexOf(action.type)>-1){
    return actions[action.type]();
  }
  else {
    return state;
  }
}

const initialState={
  movie:{
    name:'none',
    img:'none',
    director:'none',
    description:'none',
    publishDate:'2000-01-01'
  },
} 

export default function MovieReducer(state=initialState,action){
  const actions={
    'FETCHING_Movie':()=>{
      return {
        ...state,
        isFetching:true,
      }
    },
    'FETCHING_Movie_SUCCESS':()=>{
      return {
        ...state,
        isFetching:false,
        movie:action.data
      }
    },
    'FETCHING_Movie_ERROR':()=>{
      return {
        ...state,
        isFetching:false,
        error:true
      }
    }
  }

  return evalState(actions,action,state);
}