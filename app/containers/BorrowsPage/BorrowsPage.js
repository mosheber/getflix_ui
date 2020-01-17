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

export default class BorrowsPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    
    this.returnBook = this.returnBook.bind(this)
  }

  componentDidMount(){
    this.props.fetchBorrows(1);
  }

  returnBook(id){
    console.log(id)
  }

  render() {
    const classes = useStyles;
    //} />
    return (
      <Paper style={{display:'flex'}} elevation={3} >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">User Name</TableCell>
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
                    <TableCell align="right">{row.userName}</TableCell>
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
                        <Button className="animated fadeIn" onClick = {() => this.returnBook(row.id)} variant="contained" color="primary">Return</Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Paper>
    );
  }
}