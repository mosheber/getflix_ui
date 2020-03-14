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
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {validateObj,validateString} from 'utils/constants'

const useStyles = {
  table: {
    minWidth: 650,
  },
};


export default class CategoryPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    var today = new Date();
    var todayString = getDateString(today);
    this.state = {
      categoryToEdit:{},
      category:{
        name:''
      }
    }
  }

  componentDidMount(){
    this.props.fetchCategories();
  }

  onChangeValue(e,key,e_field='value') {
    var obj = this.state.category;
    obj[key] = e.target[e_field];
    
    this.setState({
      category:obj
    });
  }

  addCategory(){

    this.props.manageCategory(this.state.category).then(res=>{
      let messageAlert = ""
      if(res.type.includes('ERROR')){
        messageAlert = 'Error: '+ res.toString();
        alert(messageAlert);
      }else{
        this.props.fetchCategories();
      }
      
    })
  }

  render() {
    const classes = useStyles;
    
    return (
      <div>
        <AppBar position="static" color="white">
            <Toolbar>

              <TextField
               className="animated fadeIn"
                label="New Category Name:"
                onChange={(e)=>this.onChangeValue(e,'name')}
                value={this.state.category.name}
              />

              <Button onClick = {this.addCategory} color="primary">
                <IconButton type="submit" aria-label="add">
                <AddIcon />
                </IconButton>
              </Button>

            </Toolbar>
          </AppBar>
 
      <Paper style={{display:'flex'}} elevation={3} >
          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  {
                    this.props.user.user.isAdmin ? 
                    <TableCell align="right">User Name</TableCell> : 
                    null
                  }
                  <TableCell align="right">Movie Name</TableCell>
                  <TableCell align="right">Start Date</TableCell>
                  <TableCell align="right">End Date</TableCell>
                  <TableCell align="right">Days Overdue</TableCell>
                  <TableCell align="right">Is Returned?</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.borrows.borrows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    {
                      this.props.user.user.isAdmin ? 
                      <TableCell align="right">{row.userId}</TableCell> :
                      null
                    }
                    <TableCell align="right">{row.movieId}</TableCell>
                    <TableCell align="right">{row.startDate}</TableCell>
                    <TableCell align="right">{row.endDate}</TableCell>
                    <TableCell align="right">
                      { getOverdue(row.endDate) }
                    </TableCell>
                    <TableCell align="right">{row.returned.toString() == 'false' ? 'No': 'Yes'}</TableCell>
                    <TableCell align="right">
                      {
                        row.returned ? <div></div> : 
                        <Button className="animated fadeIn" onClick = {() => this.returnBook(row)} variant="contained" color="primary">Return</Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Paper>

      </div>
    );
  }
}