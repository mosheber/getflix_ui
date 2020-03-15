//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchMovies } from './actions';
import { borrowMovie } from '../BorrowsPage/actions';

import reducer from './reducer';
import categoriesReducer from '../CategoryPage/reducer';
import {fetchUser} from '../App/actions'
import userReducer from '../App/userReducer';
import {fetchCategories} from '../CategoryPage/actions'
// import saga from './saga';
import BrowsePage from './BrowsePage';


function mapStateToProps(state) {
    return {
      categories: state.categories,
      movie: state.movie,
      user: state.user,
      
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchMovies: (category,searchString) => dispatch(fetchMovies(category,searchString)),
      borrowMovie: (userId,movieId,startDate,endDate) => dispatch(borrowMovie(userId,movieId,startDate,endDate)),
      fetchUser: (username,password) => dispatch(fetchUser(username,password)),
      fetchCategories: () => dispatch(fetchCategories())
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
const withReducerCategory = injectReducer({ key: 'categories', reducer:categoriesReducer });
//const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,withReducerCategory,withConnect)(BrowsePage); //withSaga,
export { mapDispatchToProps };
