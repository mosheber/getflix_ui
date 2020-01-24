//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { createUser } from '../App/actions';
import reducer from '../App/userReducer';
// import saga from './saga';
import RegisterPage from './RegisterPage';


function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      createUser: (user) => dispatch(createUser(user)),
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

export default compose(withReducer,  withConnect)(RegisterPage); 
export { mapDispatchToProps };
