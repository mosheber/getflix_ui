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
  shouldComponentUpdate() {
    return false;
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
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Username
                </Typography>
                <TextField variant="filled" id="standard-error" />
              </div>
              <div>
                <Typography color="textSecondary" gutterBottom>
                  Password
                </Typography>
                <TextField variant="filled" id="standard-error" />
              </div>
            </form>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary">Login</Button>
          </CardActions>
        </Card>
        
      </div>
    );
  }
}
