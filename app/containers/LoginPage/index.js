//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchUser } from '../App/actions';
import reducer from '../App/userReducer';
// import saga from './saga';
import LoginPage from './LoginPage';


function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getUser: (username,password) => dispatch(fetchUser(username,password)),
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

export default compose(withReducer,  withConnect)(LoginPage); //withSaga,
export { mapDispatchToProps };
