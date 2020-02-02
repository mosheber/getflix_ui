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
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
    this.state = {
      search:{
        searchText : '',
        searchCategory: 'All'
      }
    }
    this.goToMovie = this.goToMovie.bind(this);
    this.borrowMovie = this.borrowMovie.bind(this);
  }

  componentDidMount(){
    this.props.fetchMovies(this.state.search.searchText,this.state.search.searchCategory);
  }


  onChangeValue(e,key) {
    var obj = this.state.search;
    obj[key] = e.target.value;
    
    this.setState({
      search:obj
    });
    this.props.fetchMovies(obj.searchText,obj.searchCategory);
  }

  goToMovie(id){
    this.props.history.push('/movie/'+id.toString());
  }

  borrowMovie(movieId,movieName){
    this.props.borrowMovie(this.props.user.user.id,movieId).then(res=>{
      if(res.type.includes('ERROR')){
        alert(res)
      }else{
        alert('Borrowed '+movieName+'!')
      }
    })
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
        <AppBar position="static" color="white">
            <Toolbar>
            
              <InputBase
                placeholder="Search Movies..."
                inputProps={{ 'aria-label': 'search movies' }}
                defaultValue={this.state.search.searchText}
                onChange={(e)=>this.onChangeValue(e,'searchText')}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            
            <Select
              value={this.state.search.searchCategory}
              onChange={(e)=>this.onChangeValue(e,'searchCategory')}
            >
              <MenuItem value={'All'}>All</MenuItem>
              <MenuItem value={'Comedy'}>Comedy</MenuItem>
              <MenuItem value={'Drama'}>Drama</MenuItem>
              <MenuItem value={'Action'}>Action</MenuItem>
              <MenuItem value={'Thriller'}>Thriller</MenuItem>
              <MenuItem value={'Family'}>Family</MenuItem>
              <MenuItem value={'Science-Fiction'}>Science-Fiction</MenuItem>
            </Select>
            
            </Toolbar>
          </AppBar>
          <GridList cellHeight={360} className={classes.gridList} cols={5}>
            {this.props.movie.movies == undefined ? null : this.props.movie.movies.map(tile => (
              <GridListTile className="animated fadeIn" key={tile.img}>
                <img onClick={()=>this.goToMovie(tile.id)} src={tile.img} alt={tile.name} />
                <GridListTileBar
                  className="animated bounce"
                  title={tile.name}
                  subtitle={<span>by: {tile.director}</span>}
                  actionIcon={
                    // <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                    // </IconButton>
                    <Fab onClick={()=>this.borrowMovie(tile.id,tile.name)} color="secondary" variant="extended">
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



