//export { default } from './LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
//import injectSaga from 'utils/injectSaga';
import { fetchCategories,manageCategory } from './actions';
import reducer from './reducer';
// import saga from './saga';
import CategoryPage from './CategoryPage';


function mapStateToProps(state) {
    return {
      categories: state.categories,
      user: state.user
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchCategories: () => dispatch(fetchCategories()),
      manageCategory: (category) => dispatch(manageCategory(category)),
    }
  }


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'categories', reducer });
//const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer,  withConnect)(CategoryPage); //withSaga,
export { mapDispatchToProps };
