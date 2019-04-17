import React,
{ Component } from 'react'

import TimetableTable from '../commons/TimetableTable';

import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ShareIcon from '@material-ui/icons/Share';

import abu_tri from "../../imgs/icons/us_triggered.png"

import radio from '../../imgs/radio.png'

class Timetable extends Component {
  constructor(props){
    super(props);
  }
  render() {

    return (
      <div className="timetable">
        <div className="head">
          <img src={radio} alt=""/>
          <h2>PROGRAMS</h2><br/>
          <p>{this.props.online_count+this.props.localize.n_people_listening}</p>
        </div>
        <Paper className="contain">
          {this.props.programs?<TimetableTable weekseg={this.props.programs.weekseg} timeseg={this.props.programs.timeseg} programs={this.props.programs.programs}/>:null}
        </Paper>
      </div>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCards () {
    return(this.props.cards.map((oj) =>
      <Grid item xs={12} sm={4} md={3} lg={2} xl={2}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              wide
              image={oj["img"]}
            />
            <CardContent>
            <Typography component="p">
              {oj["p"]}
            </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        </Card>
      </Grid>
      ))
  }

  render () {
    return (
      <div className="homepage">
        <div className="timetable-container">
          <div className="intro_container">
            <div className="intro">
              <h1>{this.props.localize.news}</h1>
              <p>
                <ul>
                  {this.props.news.map((text)=> <li>{text}</li>)}
                </ul>
              </p>
            </div>
            <div className="intro">
              <h1>{this.props.localize.more_info}</h1>
              <p>
                <ul>
                  {this.props.more_info.map((text)=> <li>{text}</li>)}
                </ul>
              </p>
            </div>
          </div>
          <Timetable online_count={this.props.online_count} localize={this.props.localize} programs={this.props.programs}/>
        </div>

        <div className="cards">
        <h1>{this.props.localize.suggestion}</h1>
        <Grid style={{padding: 20}} container alignItems="center" direction="row" justify="center" spacing={24}>
          {this.renderCards()}
        </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
