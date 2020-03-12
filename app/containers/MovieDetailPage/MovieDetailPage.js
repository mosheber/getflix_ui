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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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
        name:'some name',
        img:'none',
        director:'some dir',
        description:'some desc',
        publishDate:'2000-01-01',
        length:'120',
        quantity:'1',
        categories:[],
        id:0
      },
      mainValues:{
        addCategory:'All',
        comment:'',
        rating:3
      }
      //editable: false
    };
    this.onDrop = this.onDrop.bind(this);
    this.onRemoveCategory = this.onRemoveCategory.bind(this)
    this.onAddCategory = this.onAddCategory.bind(this);
    this.onChangeMainValue=this.onChangeMainValue.bind(this);
    this.onAddComment = this.onAddComment.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.save = this.save.bind(this);
  }

  save(){
    var isCreate = !this.state.movie.hasOwnProperty('id');
    
    this.props.manageMovie(this.state.movie).then(res=>{
      if(res.type.includes('ERROR')){
        alert('Error: '+ res.toString())
      }else{
        let message = isCreate ? 'Creating' : 'Editing';
        alert(message + ' the movie '+ this.state.movie.name + ' was successful!');
      }
    })
  }

  onDrop(picture) {
    var toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    return toBase64(picture[picture.length-1]).then( res => {
      var movie = this.state.movie;
      movie.img = res;
      this.setState({
        movie: movie
      });
    })
  }

  componentDidMount(){
    let pathname = this.props.history.location.pathname;
    let movieId = pathname.split('/').pop() ;

    if(movieId.toString()=='0'){
      console.log('create movie');
      this.setState({
        movie:this.state.movie
      })
      this.props.currentMovie.comments = []
    }else{
      // this.setState({
      //   editable:true
      // });
      console.log('edit movie');

      this.props.fetchMovie(movieId).then(res=>{
        
        if(res.type.includes('SUCCESS')){
          // let propMovie = this.props.currentMovie.movie;
          // for(var key in propMovie){
          //   let value = propMovie[key];
          //   let e = {
          //     target:{
          //       value:value,
          //       checked:value
          //     }
          //   }
          //   this.onChangeValue(e,key);
          // }
          this.setState({
            movie:this.props.currentMovie.movie
          })
          this.props.fetchComments(this.props.currentMovie.movie.id);
        }else{
          console.log('fetch failed');
        }
      })
    }
    
  }

  onRemoveCategory(cat){
    let movie = this.state.movie
    let categories = movie.categories;
    let cat_removed = categories.splice(categories.indexOf(cat), 1);
    movie.categories = categories;
    this.setState({
      movie:movie
    })
  }


  onChangeValue(e,key){
    let value = e.target.value;
    var movie = this.state.movie;
    movie[key] = value;
    this.setState({
      movie:movie
    });
  }

  onChangeMainValue(e,key){
    let value = e.target.value;
    var mainValues = this.state.mainValues;
    mainValues[key] = value;
    this.setState({
      mainValues:mainValues
    });
  }

  onAddCategory(){
    let category = this.state.mainValues.addCategory;
    if(this.state.movie.categories.includes(category)){
      alert('Category aleady in movie');
    }else{
      let movie = this.state.movie
      movie.categories.push(category);
      this.setState({
        movie:movie
      })
    }
  }

  onAddComment(){
    let all_user = this.props.currentMovie.comments.map(x => x.userId)

    if(all_user.includes(this.props.user.user.id)){ //REMOVE false WHEN PRODDDD
      alert('You already gave your comment.');
    }else{
      let comment = {
        userId: this.props.user.user.id,
        userName: this.props.user.user.username,
        text: this.state.mainValues.comment,
        grade: this.state.mainValues.rating
      };
      this.props.postComment(comment).then(res=>{
        this.props.fetchComments(this.props.currentMovie.movie.id);
      })
    }
  }

  render() {
    const classes = useStyles;
    //} />
    return (
      <Paper style={{display:'flex'}} elevation={3} >
          <div style={{display:'flex',flexDirection:'column'}}>
            {
              this.state.movie.img == 'none' ? 
              <img src={this.state.movie.img} style={{width:300,height:500}} />
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
                value={this.state.movie.name}
                onChange={(e)=>this.onChangeValue(e,'name')}
              />

              <TextField
               className="animated fadeIn"
                label="Movie Length in Minutes"
                value={this.state.movie.length}
                onChange={(e)=>this.onChangeValue(e,'length')}
              />


              <TextField
               className="animated fadeIn"
                label="Movie quantity in store"
                value={this.state.movie.quantity}
                onChange={(e)=>this.onChangeValue(e,'quantity')}
              />

              <div style={{padding:30}}></div>
              <TextField
               className="animated fadeIn"
                label="Director"
                value={this.state.movie.director}
                helperText="The director of the movie"
                onChange={(e)=>this.onChangeValue(e,'director')}
              />

              <div style={{padding:10}}></div>
              <TextField
               className="animated fadeIn"
                label="Publish Date"
                type="date"
                value={this.state.movie.publishDate}
                onChange={(e)=>this.onChangeValue(e,'publishDate')}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <div style={{padding:10}}></div>
              <TextField
               className="animated fadeIn"
                label="Description"
                value={this.state.movie.description}
                onChange={(e)=>this.onChangeValue(e,'description')}
                multiline
                style={{width:500}}
              />

            <Select
              value={this.state.mainValues.addCategory}
              onChange={(e)=>this.onChangeMainValue(e,'addCategory')}
            >
              <MenuItem value={'All'}>All</MenuItem>
              <MenuItem value={'Comedy'}>Comedy</MenuItem>
              <MenuItem value={'Drama'}>Drama</MenuItem>
              <MenuItem value={'Action'}>Action</MenuItem>
              <MenuItem value={'Thriller'}>Thriller</MenuItem>
              <MenuItem value={'Family'}>Family</MenuItem>
              <MenuItem value={'Science-Fiction'}>Science-Fiction</MenuItem>
            </Select>
            
                <Button onClick={this.onAddCategory} color='primary' size="large">Add Category</Button>
                <div style={{padding:10}}></div>
              {
                this.state.movie.categories.map(cat => 
                    (
                      <Chip label={cat} onDelete={() => this.onRemoveCategory(cat)} color="primary" />
                    )
                  )
              }
              
            </CardContent>
            <CardActions  className="animated bounce">
              <Button onClick={this.save} color='primary' size="large">Save</Button>
            </CardActions>
          </Card>
          </div>
          <div style={{display:'flex'}}>     
              
              <List className={classes.root}>
                  <ListItem>
                      <TextField
                      className="animated fadeIn"
                        label="Enter Comment"
                        defaultValue={this.state.mainValues.comment}
                        onChange={(e)=>this.onChangeMainValue(e,'comment')}
                      />
                      <Rating
                        name="simple-controlled"
                        value={this.state.mainValues.rating}
                        onChange={(e)=>this.onChangeMainValue(e,'rating')}
                      />
                    <Button onClick={this.onAddComment} color='primary'>Post</Button>
                  </ListItem>
                  {
                    this.props.currentMovie.comments ? this.props.currentMovie.comments.map(com => 
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
                      ) : null
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
