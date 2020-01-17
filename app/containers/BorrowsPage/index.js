//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchBorrows } from './actions';
import reducer from './reducer';
// import saga from './saga';
import BorrowsPage from './BorrowsPage';


function mapStateToProps(state) {
    return {
      borrows: state.borrows
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchBorrows: (userId) => dispatch(fetchBorrows(userId)),
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
