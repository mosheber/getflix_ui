import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/5d5f66e114f39.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {checkUserLocal} from 'utils/constants';
import './style.scss';

const classes = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
};

export default class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
//    this.goTo=this.goTo.bind(this);  
    this.cleanMovie = this.cleanMovie.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount(){
    checkUserLocal(this.props);
  }

  cleanMovie(){
    this.props.fetchMovie('0');
    this.props.cleanCategories();
  }

  logOut(){
    this.props.logOutUser(); 
  }

  render() {
    return (
        <div style={classes.root}>
          <AppBar position="static" color="white">
              {
                this.props.user.user.username ? 
                <Toolbar>
              <Link className="router-link" to="/browse">
                  <img src={Banner} alt="getflix" width="40%"/>
              </Link>
                  <Typography variant="h6" style={classes.title}>
                Hello {this.props.user.user.username}!
              </Typography> 

              <Typography variant="h6" style={classes.title}>
                <Link className="router-link" to="/browse">
                  Browse Catalog            
                </Link>
              </Typography>
              {
                this.props.user.user.isAdmin ? 
                <Typography  variant="h6" style={classes.title}>
                  <Link className="router-link" to="/movie/0" onClick={this.cleanMovie}>
                    Add a Movie
                  </Link>
                </Typography> : null
              }
              <Typography variant="h6" style={classes.title}>
                <Link className="router-link" to="/borrows">
                  My Borrows
                </Link>
              </Typography>
              {
                this.props.user.user.isAdmin ? 
                <Typography variant="h6" style={classes.title}>
                <Link className="router-link" to="/category">
                  Categories
                </Link>
              </Typography> : null
              }
              <Typography  variant="h6" style={classes.title}>
                <Link className="router-link" to='/login' onClick={this.logOut}>
                  Log out
                </Link>
              </Typography>
              </Toolbar> : null
              }
          </AppBar>
        </div>
    );
  }
}

