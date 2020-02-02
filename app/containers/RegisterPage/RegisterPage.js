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
import Switch from '@material-ui/core/Switch';


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

export default class RegisterPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    
    this.state = { 
      user:{
        img:'none',
        username:"none",
        firstname:'none',
        lastname:'none',
        password:"none",
        passwordRepeated:"none",
        birthDate:'2000-01-01',
        isAdmin:false
      }
    };
    this.onDrop = this.onDrop.bind(this);
    this.onRemoveCategory = this.onRemoveCategory.bind(this)
    this.register = this.register.bind(this);
    this.onChangeValue=this.onChangeValue.bind(this);
  }

  onDrop(picture) {
    var toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    return toBase64(picture[picture.length-1]).then( res => {
      var user = this.state.user;
      user.img = res;
      this.setState({
        user: user
      });
    })
  }

  componentDidMount(){
    // this.props.fetchMovie(1);
  }

  onRemoveCategory(cat){
    console.log(cat)
  }

  register(){
    this.props.createUser(this.state.user)
    .then(res => {
      if(res.data){
        if(res.data instanceof Error){
          alert(res.data)
        }else{
          this.props.history.push('/browse')
        }
      }
    });
  }


  onChangeValue(e,key) {
    var user = this.state.user;
    if(key=='isAdmin'){
      user[key] = e.target.checked;
    }else{
      user[key] = e.target.value;
    }
    
    this.setState({
      user:user
    });
  
  }

  render() {
    const classes = useStyles;
    //} />
    return (
      <Paper style={{display:'flex'}} elevation={3} >
          <div style={{display:'flex',flexDirection:'column'}}>
            {
              this.state.user.img == 'none' ? 
              null
              : <img src={this.state.user.img} style={{width:300,height:500}} />
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
                label="Username"
                onChange={(e)=>this.onChangeValue(e,'username')}
                defaultValue={this.state.user.username}
              />

              <div style={{padding:30}}></div>
              <TextField
               className="animated fadeIn"
                label="First Name"
                onChange={(e)=>this.onChangeValue(e,'firstname')}
                defaultValue={this.state.user.firstname}
              />


              <div style={{padding:30}}></div>
              <TextField
               className="animated fadeIn"
                label="Last Name"
                onChange={(e)=>this.onChangeValue(e,'lastname')}
                defaultValue={this.state.user.lastname}
              />


              <div style={{padding:30}}></div>
              <TextField
               className="animated fadeIn"
                label="Password"
                onChange={(e)=>this.onChangeValue(e,'password')}
                defaultValue={this.state.user.password}
              />


              <div style={{padding:30}}></div>
              <TextField
               className="animated fadeIn"
                label="Repeat Password"
                onChange={(e)=>this.onChangeValue(e,'passwordRepeated')}
                defaultValue={this.state.user.passwordRepeated}
              />


              <div style={{padding:10}}></div>
              <TextField
               className="animated fadeIn"
                label="Birth Date"
                type="date"
                onChange={(e)=>this.onChangeValue(e,'birthDate')}
                defaultValue={this.state.user.birthDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />          
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Is Admin?
                </Typography>
                <Switch
                checked={this.state.user.isAdmin}
                onChange={(e)=>this.onChangeValue(e,'isAdmin')}
                value="isAdmin"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              /> 
              </div>
                  
            </CardContent>
            <CardActions  className="animated bounce">
              <Button onClick={this.register} color='primary' size="large">Register</Button>
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
