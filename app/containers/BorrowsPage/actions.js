const borrows = [
  {

  }
]
export function fetchBorrows(id){
  return (dispatch)=> {
    dispatch(getBorrows());

    return new Promise((resolve,reject)=>{
        resolve(JSON.stringify(borrows));
    })
      .then(res => {
        return JSON.parse(res);
      })
    .then(json=>dispatch(getBorrowsSuccess(json)))
    .catch(err=>dispatch(getBorrowsError(err)))
  }
}


function getBorrows(){
  return {
    type:'FETCHING_Borrows'
  }
}


function getBorrowsSuccess(data){
  return {
    type:'FETCHING_Borrows_SUCCESS',
    data
  }
}

function getBorrowsError(data){
  return {
    type:'FETCHING_Borrows_ERROR'
  }
}