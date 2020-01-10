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

const useStyles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
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
      <div>
        <Helmet>
          <title>Browse Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Action" className={classes.avatar}>
                A
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <Button />
              </IconButton>
            }
            title={this.props.currentMovie.movie.name}
            subheader={this.props.currentMovie.movie.publishDate}
          />
          <img src={this.props.currentMovie.movie.img} />
          <CardMedia
            // className={classes.media}
            image={this.props.currentMovie.movie.img}
            title="Movie"
          />
    
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Button />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}


