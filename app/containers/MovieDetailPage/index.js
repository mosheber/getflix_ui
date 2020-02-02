//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchMovie,manageMovie } from './actions';
import reducer from './reducer';
// import saga from './saga';
import MovieDetailPage from './MovieDetailPage';


function mapStateToProps(state) {
    return {
      currentMovie: state.currentMovie,
      user:state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchMovie: (id) => dispatch(fetchMovie(id)),
      manageMovie: (movieObj) => dispatch(manageMovie(movieObj)),
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
//const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,  withConnect)(MovieDetailPage); //withSaga,
export { mapDispatchToProps };
