/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

const useStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 400,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};


export default class BrowsePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    
  }

  componentDidMount(){
    this.props.fetchMovies('','');
  }

  render() {
    const classes = useStyles;

    return (
      <div>
        <Helmet>
          <title>Browse Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <div className={classes.root}>
          <GridList cellHeight={360} className={classes.gridList} cols={5}>
            {this.props.movie.movies == undefined ? null : this.props.movie.movies.map(tile => (
              <GridListTile className="animated fadeIn" key={tile.img}>
                <img src={tile.img} alt={tile.name} />
                <GridListTileBar
                  className="animated bounce"
                  title={tile.name}
                  subtitle={<span>by: {tile.director}</span>}
                  actionIcon={
                    // <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                    // </IconButton>
                    <Fab color="secondary" variant="extended">
                      {/* <NavigationIcon className={classes.extendedIcon} /> */}
                      Take
                    </Fab>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        
      </div>
    );
  }
}



