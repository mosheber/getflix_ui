/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default class LoginPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      username: '',
      password: '',
      passwordErrorMessage:'',
      passwordError: true,
     };
    this.login = this.login.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.register=this.register.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }


  login() {
    console.log('attempt login')
    this.props.getUser(this.state.username,this.state.password)
    .then(res => {
      if(res.data){
        if(res.data instanceof Error){
          alert(res.data)
        }else{
          this.props.history.push('/browse')
        }
      }
    })
    
  }

  onChangeValue(e,key) {
    if(key == 'username'){
      this.setState({
        username:e.target.value
      });
    }
    if(key == 'password'){
      this.setState({
        password:e.target.value,
      });
    }
  }

  register(){
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Login: 
            </Typography>
            <form noValidate autoComplete="off">
              <div className="animated fadeIn">
                <Typography color="textSecondary" gutterBottom>
                  Username
                </Typography>
                <TextField onChange={(e)=>this.onChangeValue(e,'username')} variant="filled" id="standard-error" />
              </div>
              <div className="animated fadeIn">
                <Typography color="textSecondary" gutterBottom>
                  Password
                </Typography>
                <TextField
                type='password'
                onChange={(e)=>this.onChangeValue(e,'password')} variant="filled" id="standard-error" />
              </div>
              {
                this.props.user.errorMessage=='' ? null : 
                <div>    
                <Typography color="error" gutterBottom>
                    {this.props.user.errorMessage}
                </Typography>
              </div>
              }
              
            </form>
          </CardContent>
          <CardActions>
            <Button className="animated bounce" onClick = {this.login} variant="contained" color="primary"  >Login</Button>
            <Button className="animated bounce" onClick = {this.register} variant="contained" color="primary"  >Register</Button>
          </CardActions>
        </Card>
        
      </div>
    );
  }
}



