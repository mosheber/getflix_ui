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
  movie:{
    name:'some name',
    img:'none',
    director:'some dir',
    description:'some desc',
    categories: [],
    publishDate:'2000-01-01',
    id:0,
    length:'120',
    quantity:'1'
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
      let movieReady = apiDecode(action.data,MAPPING_MOVIE);
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
    },
    'FETCHING_Comments':()=>{
      return {
        ...state,
        isFetchingComments:true,
      }
    },
    'FETCHING_Comments_SUCCESS':()=>{
      return {
        ...state,
        isFetchingComments:false,
        comments:action.data
      }
    },
    'FETCHING_Comments_ERROR':()=>{
      return {
        ...state,
        isFetchingComments:false,
        errorComments:true
      }
    },
    'POST_Comments':()=>{
      return {
        ...state,
        isPOSTComments:true,
      }
    },
    'POST_Comments_SUCCESS':()=>{
      return {
        ...state,
        isPOSTComments:false,
        commentsPostResult:action.data
      }
    },
    'POST_Comments_ERROR':()=>{
      return {
        ...state,
        isPOSTComments:false,
        errorCommentsPOST:true
      }
    },
    'manageMovie_BEGIN':()=>{
      return {
        ...state,
        isManaging:true,
      }
    },
    'manageMovie_SUCCESS':()=>{
      return {
        ...state,
        isManaging:false,
        manageMovieResult:action.data
      }
    },
    'manageMovie_ERROR':()=>{
      return {
        ...state,
        isManaging:false,
        manageMovieError:action.data
      }
    }
  }

  return evalState(actions,action,state);
}