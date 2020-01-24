// export { default } from './Header';
//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
// import { fetchMovies } from './actions';
import reducer from '../../containers/App/userReducer';
// import saga from './saga';
import Header from './Header'

function mapStateToProps(state) {
    return {
        user: state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
    //   fetchMovies: (category,searchString) => dispatch(fetchMovies(category,searchString)),
    }
  }


// const mapStateToProps = createStructuredSelector({
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError()
// });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'user', reducer });
//const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,  withConnect)(Header); //withSaga,
export { mapDispatchToProps };
