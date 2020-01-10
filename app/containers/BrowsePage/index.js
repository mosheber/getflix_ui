//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchMovies } from './actions';
import reducer from './reducer';
// import saga from './saga';
import BrowsePage from './BrowsePage';


function mapStateToProps(state) {
    return {
      movie: state.movie
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchMovies: (category,searchString) => dispatch(fetchMovies(category,searchString)),
    }
  }


// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError()
// });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'movie', reducer });
//const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,  withConnect)(BrowsePage); //withSaga,
export { mapDispatchToProps };
