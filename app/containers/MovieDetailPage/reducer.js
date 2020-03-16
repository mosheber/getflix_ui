import {MAPPING_MOVIE,apiDecode,MAPPING_COMMENT} from 'utils/constants';

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
        movie:movieReady
      }
    },
    'FETCHING_Movie_ERROR':()=>{
      return {
        ...state,
        isFetching:false,
        error:true,
        movie:{}
      }
    },
    'FETCHING_Comments':()=>{
      return {
        ...state,
        isFetchingComments:true,
      }
    },
    'FETCHING_Comments_SUCCESS':()=>{
      let commentsReady = action.data.map(x=>apiDecode(x,MAPPING_COMMENT));
      return {
        ...state,
        isFetchingComments:false,
        comments:commentsReady
      }
    },
    'FETCHING_Comments_ERROR':()=>{
      return {
        ...state,
        isFetchingComments:false,
        errorComments:true
      }
    },
    'getMovieCategories':()=>{
      return {
        ...state,
        isFetchingMovieCategories:true,
      }
    },
    'getMovieCategories_SUCCESS':()=>{
      return {
        ...state,
        isFetchingMovieCategories:false,
        categories:action.data
      }
    },
    'getMovieCategories_ERROR':()=>{
      return {
        ...state,
        isFetchingMovieCategories:false,
        errorFetchingMovieCategories:true
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