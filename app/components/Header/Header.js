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

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
        <div style={classes.root}>
          
          <AppBar position="static" color="white">
            <Toolbar>
              {/* <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton> */}
              <a href="https://twitter.com/flexdinesh">
                <img src={Banner} alt="getflix" width="40%"/>
              </a>
              <Typography variant="h6" style={classes.title}>
                <Link className="router-link no-link" to="/browse">
                  Browse Catalog
                </Link>
              </Typography>
              <Typography variant="h6" style={classes.title}>
                <Link className="router-link" to="/movie">
                  Movie
                </Link>
              </Typography>
              <Typography variant="h6" style={classes.title}>
                <Link className="router-link" to="/login">
                  Login
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

export default Header;
