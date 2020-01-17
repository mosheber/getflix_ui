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
    {
      id:0,
      userId:0,
      userName: 'none',
      movieId:9,
      movieName: 'none',
      startDate: '1970-01-01',
      endDate: '1970-01-01',
      isReturned: false
    }
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