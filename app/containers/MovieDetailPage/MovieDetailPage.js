/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


const useStyles = {
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    height: 200,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
};

export default class MovieDetailPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

  }

  componentDidMount(){
    this.props.fetchMovie(1);
  }

  render() {
    const classes = useStyles;

    return (
      <Paper style={{display:'flex'}} elevation={3} >
          <div style={{display:'flex',flexDirection:'column'}}>
             <img src={this.props.currentMovie.movie.img} />
          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
          <Card style={{width:500}}>
            <CardContent>
              
              <TextField
               className="animated fadeIn"
                label="Movie name"
                defaultValue={this.props.currentMovie.movie.name}
              />

              <div style={{padding:30}}></div>
              <TextField
               className="animated fadeIn"
                label="Director"
                defaultValue={this.props.currentMovie.movie.director}
                helperText="The director of the movie"
              />

              <div style={{padding:10}}></div>
              <TextField
               className="animated fadeIn"
                label="Publish Date"
                type="date"
                defaultValue={this.props.currentMovie.movie.publishDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <div style={{padding:10}}></div>
              <TextField
               className="animated fadeIn"
                label="Description"
                defaultValue={this.props.currentMovie.movie.description}
                multiline
                style={{width:500}}
              />
          
            </CardContent>
            <CardActions  className="animated bounce">
              <Button size="large">Save</Button>
            </CardActions>
          </Card>
          </div>
      </Paper>
    );
  }
}
// this.state = {
//   previewOpen: false,
//   savedImg: "http://www.placekitten.com/400/400"
// }
// this.handleFileChange=this.handleFileChange.bind(this)
// this.handleSave=this.handleSave.bind(this)
// this.handleRequestHide=this.handleRequestHide.bind(this)
// handleFileChange(dataURI) {
//   this.setState({
//     img: dataURI,
//     savedImg: this.state.savedImg,
//     previewOpen: true
//   });
// }

// handleSave(dataURI) {
//   this.setState({
//     previewOpen: false,
//     img: null,
//     savedImg: dataURI
//   });
// }

// handleRequestHide() {
//   this.setState({
//     previewOpen: false
//   });
// }
