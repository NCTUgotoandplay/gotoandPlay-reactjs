// Author noowyee
import React,
{ Component } from 'react'

import { makeStyles } from '@material-ui/core/styles';

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
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ReactMarkdown from 'react-markdown';

import Tooltip from '@material-ui/core/Tooltip';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';
import LaunchIcon from '@material-ui/icons/Launch';

import {InformationCard} from '../InformationCardPage/InformationCard';

import abu_tri from "../../imgs/icons/us_triggered.png"

import radio from '../../imgs/radio.png'

const useStyles = makeStyles(theme => ({
  program_card: {
    border: '#232f34 solid 8px ',
    background: 'repeating-linear-gradient(45deg, rgb(249, 170, 51), rgb(249, 170, 51) 20px, rgba(236, 162, 50, 1) 20px, rgb(236, 162, 50) 40px)',
    borderRadius: '15px',
    minHeight: '150px',
  }
}));

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
          <p>{this.props.online_count+' '+this.props.localize.n_people_listening}</p>
        </div>
        <Paper className="contain">
          {this.props.programs?<TimetableTable localize={this.props.localize} timetable={this.props.programs}/>:null}
        </Paper>
      </div>
    );
  }
}


function Home(props){
  let classes = useStyles();


  let renderSuggestedCards = ()=> {
    let rows = [];
    for(let i in props.suggested_cards) {
      let card = props.cards[props.suggested_cards[i]];

      if(card) {
        card.card_id = props.suggested_cards[i];
        rows.push(
          <InformationCard {...props} key={i} card={card}/>
        );
      }

      }
    return rows;
  }

  let renderTodaysProgrammes = ()=> {
    let programmes = props.programs;
    let rows = [];

    let todays_day = (new Date()).getDay();
    // let todays_day = 0;
    if(programmes.show_days[todays_day]) {
      for(let i in programmes.show_segments) {
        let segment_name = programmes.show_segments[i];
        let segment_detail = programmes.segments[segment_name][todays_day];
        rows.push(
          <Grid item xs={11} sm={5} md={4} lg={3} xl={2}>
            <Card className={classes.program_card}>
              <CardContent >
                <Typography gutterBottom variant="h5" component="h5">
                  <Box fontWeight="fontWeightBold" m={1}>
                  <span style={{color: '#232f34'}}>
                    {segment_detail.title}
                  </span>
                  </Box>
                </Typography>
                <Typography gutterBottom variant="body" component="p"  component="p" style={{color: 'white'}}>
                  <Box fontSize={12} m={1}>
                    {segment_name}
                  </Box>

                </Typography>
                <Typography gutterBottom variant="body" component="p" >
                  <Box fontSize={14} m={1}>
                    {segment_detail.description?segment_detail.description:(props.localize.description+' '+props.localize.null)}
                  </Box>
                </Typography>
              </CardContent>
              <CardActionArea>
                {segment_detail.url?
                  <Tooltip title={props.localize.go+' '+props.localize.link}>
                  <a target="_blank" rel="noopener noreferrer" href={segment_detail.url}>
                    <IconButton size="small" aria-label="Share">
                      <LaunchIcon />
                    </IconButton>
                  </a>
                </Tooltip>:null}
              </CardActionArea>
            </Card>
          </Grid>
        );
      }
    }

    if(!rows.length) {
      return([
        <Grid item xs={11} sm={5} md={4} lg={3}  xl={2}>
          <Card className={classes.program_card}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                  <span style={{color: '#232f34'}}>
                    {props.localize.no_program}
                  </span>
                </Typography>
                <Typography gutterBottom variant="body" component="p" style={{color: 'white'}}>
                  {props.localize.no_program}
                </Typography>
                <Typography gutterBottom variant="body" component="p" >
                  {props.localize.todays_empty_description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ]);
    }
    return rows;
  }

    return (
      <div className="homepage" style={props.dark_theme?{'color': 'white', 'background': 'repeating-linear-gradient(45deg, rgba(35, 47, 52, 0.8), rgba(35, 47, 52, 0.8) 10px, rgba(47, 55, 58, 0.8) 10px, rgba(47, 55, 58, 0.8) 20px)'}:{'color': '#232f34', 'background': 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6) 10px, rgba(235, 248, 253, 0.69) 10px, rgba(235, 249, 255, 0.69) 20px)'}}>
        <div className="timetable-container">
          <div className="intro_container">
            <h1 className="slogan">{props.slogan}</h1>
            <div className="intro">
              <h1>{props.localize.news}</h1>
              <ul>
                {props.news.map((text)=> <a key={text} href={text[1]} target="_blank"><li>{text[0]}</li></a>)}
              </ul>
            </div>
            <div className="intro">
              <h1>{props.localize.pinned+' '+props.localize.information}</h1>
              <ul>
                {props.pinned_info.map((text)=> {
                  if(text)
                    return(
                      <a key={text[0]} href={text[1]} target="_blank">
                      <Tooltip title={props.localize.more_info}>
                      <li>{text[0]}</li>
                      </Tooltip>
                      </a>
                    );
                })}
                <li onClick={()=>{props.actions.pushNotification({content:'¯\\_(ツ)_/¯', variant: 'error'})}}>{"點我哈哈哈"}</li>
              </ul>
            </div>
          </div>
          <Timetable online_count={props.online_count} localize={props.localize} programs={props.programs}/>
        </div>

        <div className="cards" style={props.dark_theme?{'borderTop': 'solid 1px white'}:{'borderTop': 'solid 1px #232f34'}}>
          <div className="container">
            <h1 className="block-header">{props.localize.todays_programmes}</h1>
            <Grid style={{padding: 20}} container alignItems="flex-start" direction="row" justify="left" spacing={5}>
              {renderTodaysProgrammes()}
            </Grid>
          </div>
        </div>

        <div className="cards" style={props.dark_theme?{'borderTop': 'solid 1px white'}:{'borderTop': 'solid 1px #232f34'}}>
          <div className="container">
            <h1 className="block-header">{props.localize.suggestion}</h1>
            <Grid style={{padding: 20}} container alignItems="flex-start" direction="row" justify="center" spacing={5}>
              {renderSuggestedCards()}
            </Grid>
          </div>
        </div>
      </div>
    );
}

export default Home;
