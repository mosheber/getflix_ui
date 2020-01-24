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
        id:1,
        username:'moshe',
        password:'password',
        isAdmin:true
    },
    errorMessage:''
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
        return {
          ...state,
          isFetching:false,
          user:action.data
        }
      },
      'FETCHING_USER_ERROR':()=>{
        return {
          ...state,
          isFetching:false,
          errorMessage:action.data.message
        }
      }
    }
  
    return evalState(actions,action,state);
  }