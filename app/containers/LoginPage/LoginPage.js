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
     };
    this.login = this.login.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  login() {
    this.props.getUser(this.state.username,this.state.password);
  }

  onChangeValue(e,key) {
    if(key == 'username'){
      this.setState({
        username:e.target.value
      });
    }
    if(key == 'password'){
      this.setState({
        password:e.target.value
      });
    }
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
              <div className="animated slideInLeft">
                <Typography color="textSecondary" gutterBottom>
                  Username
                </Typography>
                <TextField onChange={(e)=>this.onChangeValue(e,'username')} variant="filled" id="standard-error" />
              </div>
              <div className="animated slideInLeft">
                <Typography color="textSecondary" gutterBottom>
                  Password
                </Typography>
                <TextField onChange={(e)=>this.onChangeValue(e,'password')} variant="filled" id="standard-error" />
              </div>
            </form>
          </CardContent>
          <CardActions>
            <Button onClick = {this.login} variant="contained" color="primary"  >Login</Button>
          </CardActions>
        </Card>
        
      </div>
    );
  }
}



