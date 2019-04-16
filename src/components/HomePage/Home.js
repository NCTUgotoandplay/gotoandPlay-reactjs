import React,
{ Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#232f34',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    whiteSpace: 'normal',
    wordWrap: "break-word",
    padding: '18px 18px 18px 18px'
  },
}))(TableCell);

class TimetableTable extends Component{
  render() {
    let row = Array(this.props.programs.length).fill(null)
    for(let i=0 ; i<this.props.programs.length ; ++i){
      row[i] = this.props.programs[i].map((oj) =>
        <CustomTableCell>
          <a className="pp"
            href={oj.url}
            target="_blank"
            rel='noreferrer noopener'>
            <div>
            {oj.name}
            </div>
          </a>
        </CustomTableCell>
      )
    }
    return(
      <Table fixedHeader={false} >
        <TableHead>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[0]}</CustomTableCell>
            {row[0]}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[1]}</CustomTableCell>
            {row[1]}
          </TableRow>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[2]}</CustomTableCell>
            {row[2]}
          </TableRow>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[3]}</CustomTableCell>
            {row[3]}
          </TableRow>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[4]}</CustomTableCell>
            {row[4]}
          </TableRow>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[5]}</CustomTableCell>
            {row[5]}
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

class Timetable extends Component {
  constructor(props){
    super(props);
  }
  render() {

    return (
      <div className="timetable">
        <div className="head">
          <img src={radio} alt=""/>
          <p>PROGRAMS</p>
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
          <Timetable programs={this.props.programs}/>
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
