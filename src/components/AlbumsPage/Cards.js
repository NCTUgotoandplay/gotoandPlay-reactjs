import React from "react"
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

// <Card>
//   <CardActionArea>
//     <CardMedia
//       component="img"
//       wide
//       image={}
//     />
//     <CardContent>
//     <Typography gutterBottom variant="h5" component="h2">
//       {oj["title"]}
//     </Typography>
//     <Typography component="p">
//       {oj["p"]}
//     </Typography>
//     </CardContent>
//   </CardActionArea>
//   <CardActions>
//   <IconButton aria-label="Share">
//     <ShareIcon />
//   </IconButton>
//   <IconButton aria-label="Share">
//     <MusicNoteIcon />
//   </IconButton>
// </CardActions>
// </Card>
let Cards = (props)=> {
  const listItems = props.cards.map((oj) =>
    <Grid item xs={12} sm={8} md={7} lg={4} xl={3}>
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
    <Grid style={{padding: 20}} container alignItems="flex-start" direction="row" justify="center" spacing={5}>
      {listItems}
    </Grid>
  )
}

export default Cards;
