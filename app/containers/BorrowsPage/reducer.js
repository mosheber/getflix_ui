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
    {}
  ],
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
    }
  }

  return evalState(actions,action,state);
}