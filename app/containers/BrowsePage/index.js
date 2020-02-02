//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchMovies } from './actions';
import { borrowMovie } from '../BorrowsPage/actions';
import reducer from './reducer';
// import saga from './saga';
import BrowsePage from './BrowsePage';


function mapStateToProps(state) {
    return {
      movie: state.movie,
      user: state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchMovies: (category,searchString) => dispatch(fetchMovies(category,searchString)),
      borrowMovie: (userId,movieId) => dispatch(borrowMovie(userId,movieId))
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
