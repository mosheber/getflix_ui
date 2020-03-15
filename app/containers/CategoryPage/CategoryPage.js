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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fab from '@material-ui/core/Fab';
import {checkUserGeneral} from 'utils/constants';
const useStyles = {
  table: {
    // minWidth: 200,
    maxWidth: 100,
  },
};


export default class CategoryPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      modalOpen:false,
      categoryToEdit:{
        name:''
      },
      category:{
        name:''
      }
    }
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeValueEdit = this.onChangeValueEdit.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.editCategoryBegin = this.editCategoryBegin.bind(this);
    this.editCategoryFinish = this.editCategoryFinish.bind(this);
  }

  componentDidMount(){
    if(!checkUserGeneral()){
      this.props.history.push('/login');
    }
    this.props.fetchCategories();
  }

  onChangeValue(e,key,e_field='value') {
    var obj = this.state.category;
    obj[key] = e.target[e_field];
    
    this.setState({
      category:obj
    });
  }


  onChangeValueEdit(e,key,e_field='value') {
    var obj = this.state.categoryToEdit;
    obj[key] = e.target[e_field];
    
    this.setState({
      categoryToEdit:obj
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

  editCategoryBegin(category){
    this.setState({
      categoryToEdit:category,
      modalOpen:true
    })
  }

  editCategoryFinish(editCategoryFinish){
    this.props.manageCategory(this.state.categoryToEdit).then(res=>{
      let messageAlert = ""
      if(res.type.includes('ERROR')){
        messageAlert = 'Error: '+ res.toString();
        alert(messageAlert);
      }else{
        this.props.fetchCategories();
        this.setState({
          modalOpen:false
        })
      }
      
    })
  }

  handleCloseModel(){
    this.setState({
      modalOpen:false
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
            <h3>Enter new name:</h3>
            <TextField
                className="animated fadeIn"
                  onChange={(e)=>this.onChangeValueEdit(e,'name')}
                  value={this.state.categoryToEdit.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Fab onClick={this.editCategoryFinish} color="secondary" variant="extended">
                        {/* <NavigationIcon className={classes.extendedIcon} /> */}
                        Edit
                      </Fab>
          </div>
        </Modal>
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
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.categories.categories.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">
                    <Button className="animated fadeIn" onClick = {() => this.editCategoryBegin(row)} variant="contained" color="primary">
                      Edit
                      </Button>
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