//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchUser } from '../App/actions';
import {fetchCategories} from '../CategoryPage/actions'
import reducer from '../App/userReducer';
import categoriesReducer from '../CategoryPage/reducer';
// import saga from './saga';
import LoginPage from './LoginPage';


function mapStateToProps(state) {
    return {
      categories: state.categories,
      user: state.user,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getUser: (username,password) => dispatch(fetchUser(username,password)),
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

const withReducer = injectReducer({ key: 'user', reducer });
const withReducerCategory = injectReducer({ key: 'categories', reducer:categoriesReducer });
//const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,withReducerCategory,  withConnect)(LoginPage); //withSaga,
export { mapDispatchToProps };
