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
    errorMessage:'',
    registerErrorMessage:''
} 

let mapping = {
  'username':'name',
  'isAdmin':'admin'
}

function apiEncode(obj,mapping){
  for (let oldKey in mapping) {
    let newKey = mapping[oldKey];
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
  return obj;
}

function apiDecode(obj,mapping){
  for (let oldKey in mapping) {
    let newKey = mapping[oldKey];
    obj[oldKey] = obj[newKey];
    delete obj[newKey];
  }
  return obj;
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
        let user = apiDecode(action.data,mapping);
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
          errorMessage:action.data.message
        }
      },
      'CREATING_USER':()=>{
        return {
          ...state,
          isCreating:true,
        }
      },
      'CREATING_USER_SUCCESS':()=>{
        return {
          ...state,
          isCreating:false,
          user:action.data
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