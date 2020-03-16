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
import {getDateString} from 'utils/constants';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import {checkUserGeneral} from 'utils/constants';

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

    let today = new Date();
    let todayString = getDateString(today);
    this.state = {
      movieIdToBorrow:'',
      modalOpen:false,
      search:{
        searchText : '',
        searchCategory: '-1',
        endDate:todayString,
      }
    }
    this.goToMovie = this.goToMovie.bind(this);
    this.borrowMovie = this.borrowMovie.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.handleCloseModel=this.handleCloseModel.bind(this);
  }

  componentDidMount(){
    if(!checkUserGeneral()){
      this.props.history.push('/login');
    }
    this.props.fetchCategories().then(res=>{
      this.props.fetchMovies(this.state.search.searchCategory,this.state.search.searchText);
    });
    
  }


  doSearch(){
    this.props.fetchMovies(this.state.search.searchCategory,this.state.search.searchText);
  }

  onChangeValue(e,key) {
    var obj = this.state.search;
    obj[key] = e.target.value;
    
    this.setState({
      search:obj
    });
    
  }

  goToMovie(id){
    this.props.history.push('/movie/'+id.toString());
  }

  borrowMovie(){
    let movieId = this.state.movieIdToBorrow;
    let movieName = this.state.movieNameToBorrow;

    let today = new Date();
    let startDate = getDateString(today);
    let endDate = this.state.search.endDate;

    this.props.borrowMovie(this.props.user.user.id,movieId,startDate,endDate).then(res=>{
      if(res.type.includes('ERROR')){
        alert(res.data)
      }else{
        alert('Borrowed '+movieName+'!')
      }
      this.setState({
        modalOpen:false
      })
      this.doSearch();
    })
  }

  handleCloseModel(){
    this.setState({
      modalOpen:false
    })
  }

  beginBorrow(movieId,movieName){
    this.setState({
      movieIdToBorrow:movieId,
      movieNameToBorrow:movieName,
      modalOpen:true
    })
  }

  render() {
    const classes = useStyles;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleCloseModel}
          BackdropComponent={Backdrop}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{backgroundColor:'white',paddingTop:'30px',paddingLeft:'30px',paddingRight:'30px',paddingBottom:'30px'}}>
            <h3>When will you return the movie?</h3>
            <TextField
                className="animated fadeIn"
                  label=""
                  type="date"
                  onChange={(e)=>this.onChangeValue(e,'endDate')}
                  value={this.state.search.endDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Fab onClick={this.borrowMovie} color="secondary" variant="extended">
                        {/* <NavigationIcon className={classes.extendedIcon} /> */}
                        Take
                      </Fab>
          </div>
        </Modal>
        <Helmet>
          <title>Browse Page</title>
          <meta
            name="description"
            content="Feature page of Getflix application"
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
            Category :         
            <Select
              value={this.state.search.searchCategory}
              onChange={(e)=>this.onChangeValue(e,'searchCategory')}
            >
              <MenuItem value={'-1'}>All</MenuItem>
              {
                this.props.categories && this.props.categories.categories ? this.props.categories.categories.map(row=>{
                  return (
                    <MenuItem value={row.id}>{row.name}</MenuItem>
                  )
                }) : null
              }
            </Select>

              <Button onClick = {() => this.doSearch()} color="primary">
                <IconButton type="submit" aria-label="search">
                <SearchIcon />
                </IconButton>
              </Button>
         
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
                    <Fab onClick={()=>this.beginBorrow(tile.id,tile.name)} color="secondary" variant="extended">
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



