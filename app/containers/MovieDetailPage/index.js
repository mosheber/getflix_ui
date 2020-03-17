//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchMovie,manageMovie,fetchComments,postComment,fetchMovieCategories } from './actions';
import reducer from './reducer';
// import saga from './saga';
import MovieDetailPage from './MovieDetailPage';
import categoriesReducer from '../CategoryPage/reducer';
import {fetchCategories} from '../CategoryPage/actions'

function mapStateToProps(state) {
    return {
      categories: state.categories,
      currentMovie: state.currentMovie,
      user:state.user,
      
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchMovie: (id) => dispatch(fetchMovie(id)),
      manageMovie: (movieObj,categories) => dispatch(manageMovie(movieObj,categories)),
      fetchComments: (id) => dispatch(fetchComments(id)),
      postComment: (id) => dispatch(postComment(id)),
      fetchCategories: () => dispatch(fetchCategories()),
      fetchMovieCategories: (movieId) => dispatch(fetchMovieCategories(movieId)),
    }
  }


// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError()
// });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'currentMovie', reducer });
const withReducerCategory = injectReducer({ key: 'categories', reducer:categoriesReducer });
//const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,withReducerCategory,  withConnect)(MovieDetailPage); //withSaga,
export { mapDispatchToProps };
