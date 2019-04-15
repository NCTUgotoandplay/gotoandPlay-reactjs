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
    <Grid item xs={10} sm={5} md={3} lg={2.2} xl={2}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            wide
            image={oj["img"]}
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {oj["title"]}
          </Typography>
          <Typography component="p">
            {oj["p"]}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <MusicNoteIcon />
        </IconButton>
      </CardActions>
      </Card>
    </Grid>
  )
  return (
    <Grid style={{padding: 20, paddingBottom:100}} container alignItems="center" direction="row" justify="center" spacing={24}>
      {listItems}
    </Grid>
  )
}

export default Decks;
