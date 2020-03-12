import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/5d5f66e114f39.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
  }

  cleanMovie(){
    this.props.fetchMovie('0');
  }
  render() {
    return (
        <div style={classes.root}>
          
          <AppBar position="static" color="white">
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
              <Typography variant="h6" style={classes.title}>
                <Link className="router-link" to="/movie/0">
                  Add a Movie
                </Link>
              </Typography>
              <Typography variant="h6" style={classes.title}>
                <Link className="router-link" to="/borrows">
                  My Borrows
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

