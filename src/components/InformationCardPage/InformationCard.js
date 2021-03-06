// Author noowyee
import React,
{ Component } from 'react'

import { Link } from "react-router-dom"

import ReactMarkdown from 'react-markdown';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';
import LaunchIcon from '@material-ui/icons/Launch';

import Constants from '../../flux/constants.json';

export default class InformationCardPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
     window.scrollTo(0, 0);
  }
  render() {

    return(
      <div className="information_card_page" style={this.props.dark_theme?{'color': 'white', 'background': 'repeating-linear-gradient(45deg, rgba(35, 47, 52, 0.8), rgba(35, 47, 52, 0.8) 10px, rgba(47, 55, 58, 0.8) 10px, rgba(47, 55, 58, 0.8) 20px)'}:{'color': '#232f34', 'background': 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6) 10px, rgba(235, 248, 253, 0.69) 10px, rgba(235, 249, 255, 0.69) 20px)'}}>
        <h1>{this.props.card.Title}</h1>
        <div className={'buttons'}>
          <div><p>{this.props.card.createdate}</p></div>
          <Tooltip title={this.props.localize.share}>
            <IconButton size="small" aria-label="Share" onClick={()=> {
              this.props.actions.copyToClipboard(this.props.localize.copied_to_clipboard , Constants.settings.base_url+'/InformationCards/'+this.props.card.CardId);
            }}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          {this.props.card.Link?<Tooltip title={this.props.localize.link}>
            <IconButton aria-label="Link" onClick={()=> {
              this.props.actions.copyToClipboard(this.props.localize.copied_to_clipboard , this.props.card.Link);
            }}>
              <LinkIcon />
            </IconButton>
          </Tooltip>:null}
          {this.props.card.Link?
            <Tooltip title={this.props.localize.go+' '+this.props.localize.link}>
            <a target="_blank" rel="noopener noreferrer" href={this.props.card.Link}>
              <IconButton size="small" aria-label="Share">
                <LaunchIcon />
              </IconButton>
            </a>
          </Tooltip>:null}
          <br/><p style={{'fontSize': '10px'}}>{this.props.localize.modified_date+': '+this.props.card.modifydate}</p>

        </div>
        <hr style={{'border': '1px solid'}}/>
        <ReactMarkdown className={'ReactMarkdown'} source={this.props.card.Description} />
      </div>
    )
  }
}

export class InformationCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
  }

  renderExpandButton() {
    if(!this.props.card.Expanded&&this.props.card.Expandable) {
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
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <Tooltip title={this.props.localize.more_info}>
          <Link to={'/InformationCards/'+this.props.card.CardId}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={this.props.card.ImageURL}
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.card.Title}
              </Typography>
              {this.props.card.createdate?
                <Typography gutterBottom variant="body1" component="h5">
                {this.props.card.createdate}
                </Typography>
                :null}
              <Typography component="p">
                {this.props.card.Expanded?<ReactMarkdown className={'ReactMarkdown'}  source={this.props.card.Description} />:(this.props.card.Description?this.props.card.Description.slice(0, 50)+'...':null)}
              </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Tooltip>
        <CardActions>

          {this.renderExpandButton()}
          <Tooltip title={this.props.localize.share}>
              <IconButton size="small" aria-label="Share" onClick={()=> {
                this.props.actions.copyToClipboard(this.props.localize.copied_to_clipboard , Constants.settings.base_url+'/InformationCards/'+this.props.card.CardId);
              }}>
                <ShareIcon />
            </IconButton>
          </Tooltip>
          {this.props.card.Link?<Tooltip title={this.props.localize.link}>
            <IconButton aria-label="Link" onClick={()=> {
              this.props.actions.copyToClipboard(this.props.localize.copied_to_clipboard , this.props.card.Link);
            }}>
              <LinkIcon />
            </IconButton>
          </Tooltip>:null}
          {this.props.card.Link?
            <Tooltip title={this.props.localize.go+' '+this.props.localize.link}>
            <a target="_blank" rel="noopener noreferrer" href={this.props.card.Link}>
              <IconButton color="primary" size="small" aria-label="Share">
                <LaunchIcon />
              </IconButton>
            </a>
          </Tooltip>:null}

        </CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {this.props.card.createdate?
            <Typography gutterBottom variant="p" component="h5">
            {this.props.card.createdate}
            </Typography>
            :null}
          <Typography component="p">
            <ReactMarkdown className={'ReactMarkdown'} source={this.props.card.Description} />
          </Typography>
        </CardContent>
      </Collapse>
      </Card>
    </Grid>)
  }
}
