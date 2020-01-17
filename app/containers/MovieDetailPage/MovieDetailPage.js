/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Rating from '@material-ui/lab/Rating';
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
import ImageUploader from 'react-images-upload';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

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
  root: {
    backgroundColor: "white",
  },
  inline: {
    display: 'inline',
  },
};

export default class MovieDetailPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      movie:{
        name:'none',
        img:'none',
        director:'none',
        description:'none',
        publishDate:'2000-01-01'
      }
    };
    this.onDrop = this.onDrop.bind(this);
    this.onRemoveCategory = this.onRemoveCategory.bind(this)
  }

  onDrop(picture) {
    var toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    return toBase64(picture[picture.length-1]).then( res => {
      this.setState({
        movie: {
          img: res
        }
      });
    })
  }

  componentDidMount(){
    this.props.fetchMovie(1);
  }

  onRemoveCategory(cat){
    console.log(cat)
  }

  render() {
    const classes = useStyles;
    //} />
    return (
      <Paper style={{display:'flex'}} elevation={3} >
          <div style={{display:'flex',flexDirection:'column'}}>
            {
              this.state.movie.img == 'none' ? 
              <img src={this.props.currentMovie.movie.img} style={{width:300,height:500}} />
              : <img src={this.state.movie.img} style={{width:300,height:500}} />
            }

            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                //maxFileSize={5242880}
              />
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

              {
                this.props.currentMovie.movie.categories.map(cat => 
                    (
                      <Chip label={cat} onDelete={() => this.onRemoveCategory(cat)} color="primary" />
                    )
                  )
              }
              
            </CardContent>
            <CardActions  className="animated bounce">
              <Button color='primary' size="large">Save</Button>
            </CardActions>
          </Card>
          </div>
          <div style={{display:'flex'}}>     
              
              <List className={classes.root}>
                  <ListItem>
                      <TextField
                      className="animated fadeIn"
                        label="Enter Comment"
                        defaultValue="is nice :)"
                        multiline  
                      />
                      <Rating
                        name="simple-controlled"
                        value={0}
                        onChange={(event, newValue) => {
                          console.log(newValue);
                        }}
                      />
                    <Button color='primary'>Post</Button>
                  </ListItem>
                  {
                    this.props.currentMovie.movie.comments.map(com => 
                      (
                        <div>
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                              </ListItemAvatar>
                              <ListItemText
                                primary={com.userName}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="textPrimary"
                                    >
                                      {com.text}
                                    </Typography>
                                    <Rating
                                      name="simple-controlled"
                                      value={com.grade}
                                      onChange={(event, newValue) => {
                                        console.log(newValue);
                                      }}
                                      readOnly
                                    />
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>                  
                      )
                      )
                  }
              </List>
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
