/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {checkUserGeneral} from 'utils/constants';
import Divider from '@material-ui/core/Divider';

const useStyles = {
  table: {
    minWidth: 650,
  },
};

const getOverdue = (endDate) => {
  let overdue = (new Date().getTime() - Date.parse(endDate))/(1000*60*60*24)
  if(overdue > 0){
    return Math.floor(overdue)
  }
  return 0
}

function getDateString(today){
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return yyyy+'-'+mm+'-'+dd;
}

export default class BorrowsPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    var today = new Date();
    var todayString = getDateString(today);
    this.state = {
      search:{
        movieName:'',
        userName:'',
        startDate:todayString,
        endDate:todayString,
        isReturned:'all'
      }
    }
    this.returnBook = this.returnBook.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  componentDidMount(){
    if(!checkUserGeneral()){
      this.props.history.push('/login');
    }
    this.doSearch();
  }

  doSearch(){
    let movieName = this.state.search.movieName;
    let userName = this.props.user.user.isAdmin ? this.state.search.userName : this.props.user.user.username;
    let startDate = this.state.search.startDate;
    let endDate = this.state.search.endDate;
    let isReturned = this.state.search.isReturned;

    this.props.fetchBorrows(userName,movieName,{startDate,endDate},isReturned);
  }

  returnBook(row){
    this.props.returnMovie(row).then(res=>{
      if(res.type.includes('ERROR')){
        alert('could not return book');
      }else{
        console.log('returned')
        this.doSearch();
      }
    })
  }

  onChangeValue(e,key,e_field='value') {
    var obj = this.state.search;
    obj[key] = e.target[e_field];
    
    this.setState({
      search:obj
    });
  }

  render() {
    const classes = useStyles;
    
    return (
      <div>
        <AppBar position="static" color="white">
            <Toolbar>


            {
              this.props.user.user.isAdmin ? 
              <InputBase
                placeholder="Search Users..."
                defaultValue={this.state.search.userName}
                onChange={(e)=>this.onChangeValue(e,'userName')}
              /> : null
            }

              <InputBase
                placeholder="Search Movies..."
                defaultValue={this.state.search.movieName}
                onChange={(e)=>this.onChangeValue(e,'movieName')}
              />
              
              <TextField
               className="animated fadeIn"
                label="Start Date"
                type="date"
                onChange={(e)=>this.onChangeValue(e,'startDate')}
                defaultValue={this.state.search.startDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />          


            <TextField
               className="animated fadeIn"
                label="End Date"
                type="date"
                onChange={(e)=>this.onChangeValue(e,'endDate')}
                defaultValue={this.state.search.endDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />          
            
            <div>
            <Typography color="textSecondary" gutterBottom>
                  Is Returned?
                </Typography>
            <Select
              value={this.state.search.isReturned}
              onChange={(e)=>this.onChangeValue(e,'isReturned')}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'yes'}>Yes</MenuItem>
              <MenuItem value={'no'}>No</MenuItem>
            </Select>
              </div>

              <Button onClick = {() => this.doSearch()} color="primary">
                <IconButton type="submit" aria-label="search">
                <SearchIcon />
                </IconButton>
              </Button>
            </Toolbar>
          </AppBar>
 
      <Paper style={{display:'flex'}} elevation={3} >
          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{'fontWeight':'bold'}} >Id</TableCell>
                  {
                    this.props.user.user.isAdmin ? 
                    <TableCell align="right" style={{'fontWeight':'bold'}}>User Name</TableCell> : 
                    null
                  }
                  <TableCell align="right" style={{'fontWeight':'bold'}} >Movie Name</TableCell>
                  <TableCell align="right" style={{'fontWeight':'bold'}} >Start Date</TableCell>
                  <TableCell align="right" style={{'fontWeight':'bold'}} >End Date</TableCell>
                  <TableCell align="right" style={{'fontWeight':'bold'}} >Days Overdue</TableCell>
                  <TableCell align="right" style={{'fontWeight':'bold'}} >Is Returned?</TableCell>
                  <TableCell align="right" style={{'fontWeight':'bold'}} >Actions</TableCell>
                </TableRow>
              </TableHead>
              <Divider variant="inset" component="div" />
              <Divider variant="inset" component="div" />
              <Divider variant="inset" component="div" />
              <TableBody>
                {this.props.borrows.borrows && Array.isArray(this.props.borrows.borrows) ? this.props.borrows.borrows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    {
                      this.props.user.user.isAdmin ? 
                      <TableCell align="right">{row.userName}</TableCell> :
                      null
                    }
                    <TableCell align="right">{row.movieName}</TableCell>
                    <TableCell align="right">{row.startDate}</TableCell>
                    <TableCell align="right">{row.endDate}</TableCell>
                    <TableCell align="right">
                      { getOverdue(row.endDate) }
                    </TableCell>
                    <TableCell align="right">{row.isReturned.toString() == 'false' ? 'No': 'Yes'}</TableCell>
                    <TableCell align="right">
                      {
                        row.isReturned ? <div></div> : 
                        <Button className="animated fadeIn" onClick = {() => this.returnBook(row)} variant="contained" color="primary">Return</Button>
                      }
                    </TableCell>
                  </TableRow>
                )) : null}
              </TableBody>
            </Table>
          </TableContainer>
      </Paper>

      </div>
    );
  }
}