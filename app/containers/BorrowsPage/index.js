//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchBorrows,returnMovie } from './actions';
import reducer from './reducer';
// import saga from './saga';
import BorrowsPage from './BorrowsPage';


function mapStateToProps(state) {
    return {
      borrows: state.borrows,
      user: state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchBorrows: (userName,movieName,dateRange,isReturned) => dispatch(fetchBorrows(userName,movieName,dateRange,isReturned)),
      returnMovie: (borrowId) => dispatch(returnMovie(borrowId)),
    }
  }


// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError()
// });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'borrows', reducer });
//const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,  withConnect)(BorrowsPage); //withSaga,
export { mapDispatchToProps };
