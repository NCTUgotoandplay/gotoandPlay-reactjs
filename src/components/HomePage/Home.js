import React,
{ Component } from 'react'

import {TimetableTable} from '../commons/TimetableTable';

import { Link } from "react-router-dom"

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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ReactMarkdown from 'react-markdown';

import Tooltip from '@material-ui/core/Tooltip';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';
import LaunchIcon from '@material-ui/icons/Launch';


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
          {this.props.programs?<TimetableTable localize={this.props.localize} timetable={this.props.programs}/>:null}
        </Paper>
      </div>
    );
  }
}

class InfoCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
  }

  renderExpandButton() {
    if(!this.props.card.expanded) {
      return(
        <Tooltip title={this.props.localize.more_info}>
          <IconButton
            onClick={()=> {this.setState({expanded: (this.state.expanded+1)%2})}}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      )
    }
  }

  render() {
    return(
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            wide
            image={this.props.card.img}
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.card.title}
          </Typography>
          <Typography component="p">
            {this.props.card.expanded?<ReactMarkdown source={this.props.card.description} />:this.props.card.description.slice(0, 50)+'...'}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        {this.renderExpandButton()}
        <Tooltip title={this.props.localize.share}>
          <IconButton aria-label="Share" onClick={()=> {
            this.props.actions.copyToClipboard(this.props.localize.copied_to_clipboard , this.props.card.url);
          }}>
            <LinkIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={this.props.localize.go+' '+this.props.localize.link}>
          <a target="_blank" href={this.props.card.url}>
            <IconButton color="primary" size="small" aria-label="Share">
              <LaunchIcon />
            </IconButton>
          </a>
        </Tooltip>
      </CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <Typography component="p">
            <ReactMarkdown source={this.props.card.description} />
          </Typography>
        </CardContent>
      </Collapse>
      </Card>
    </Grid>)
  }
}
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSuggestedCards () {
    let rows = [];
    for(let i in this.props.suggested_cards) {
      let card = this.props.cards[this.props.suggested_cards[i]];
      if(card)
        rows.push(
          <InfoCard {...this.props} card={card}/>
        );
      }
    return rows;
  }

  renderCards () {
    let rows = [];
    for(let i in this.props.cards) {
      let card = this.props.cards[i];
      if(card)
        rows.push(
          <InfoCard {...this.props} card={card}/>
        );
      }
    return rows;
  }

  render () {
    return (
      <div className="homepage">
        <div className="timetable-container">
          <div className="intro_container">
            <h1 className="slogan">{this.props.slogan}</h1>
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
                  <li onClick={()=>{this.props.actions.pushNotification({content:'¯\\_(ツ)_/¯', variant: 'error'})}}>{"點我哈哈哈"}</li>
                </ul>
              </p>
            </div>
          </div>
          <Timetable online_count={this.props.online_count} localize={this.props.localize} programs={this.props.programs}/>
        </div>

        <div className="cards">
          <div className="container">
            <h1>{this.props.localize.suggestion}</h1>
            <Grid style={{padding: 20}} container alignItems="flex-start" direction="row" justify="center" spacing={24}>
              {this.renderSuggestedCards()}
            </Grid>
            </div>
          </div>
        <div className="cards">
          <div className="container">
            <h1>{this.props.localize.more_info}</h1>
            <Grid style={{padding: 20}} container alignItems="flex-start" direction="row" justify="center" spacing={24}>
              {this.renderCards()}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
