import React from "react"

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ShareIcon from '@material-ui/icons/Share';

function Decks(props) {
  const listItems = props.decks.map((oj) =>
    <Grid item xs={12} sm={8} md={7} lg={4} xl={3} key={oj["id"]}>
      <div className="Disco" style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('+oj.img+')'}}>
        <div className="content">
          <h2>
            {oj["title"]}
          </h2>
          <p>
            {oj["p"]}
          </p>
          <div>
            <IconButton aria-label="Share" style={{color: 'white'}}>
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="Music" style={{color: 'white'}}>
              <MusicNoteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </Grid>
  )
  return (
    <Grid style={{padding: 20}} container alignItems="center" direction="row" justify="center" spacing={24}>
      {listItems}
    </Grid>
  )
}

export default Decks;
