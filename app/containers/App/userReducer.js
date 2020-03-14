import {apiDecode,MAPPING_USER} from 'utils/constants'

function evalState(actions,action,state){
    if(Object.keys(actions).indexOf(action.type)>-1){
      return actions[action.type]();
    }
    else {
      return state;
    }
  }

const initialState={
    user:{
    },
    errorMessage:'',
    registerErrorMessage:''
} 

export default function userReducer(state=initialState,action){
    const actions={
      'FETCHING_USER':()=>{
        return {
          ...state,
          isFetching:true,
        }
      },
      'FETCHING_USER_SUCCESS':()=>{
        let user = apiDecode(action.data,MAPPING_USER);
        return {
          ...state,
          isFetching:false,
          user:user
        }
      },
      'FETCHING_USER_ERROR':()=>{
        return {
          ...state,
          isFetching:false,
          errorMessage:action.data.message,
          user:{}
        }
      },
      'CREATING_USER':()=>{
        return {
          ...state,
          isCreating:true,
        }
      },
      'CREATING_USER_SUCCESS':()=>{
        let user = apiDecode(action.data,MAPPING_USER);
        return {
          ...state,
          isCreating:false,
        user:user
        }
      },
      'CREATING_USER_ERROR':()=>{
        return {
          ...state,
          isCreating:false,
          registerErrorMessage:action.data.message
        }
      }
    }
  
    return evalState(actions,action,state);
  }