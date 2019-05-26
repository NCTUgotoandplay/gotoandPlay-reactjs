import React from "react";
import ExpandCard from "./ExpandCard";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


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
// transform: 'rotateY(180deg)',
// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: '360px',
//     backgroundColor: theme.palette.background.paper,
//   },
// }));
// const classes = useStyles();
let Cards = (props)=> {
  const listItems = props.cards.map((oj) =>
    <Grid item xs={12} sm={8} md={7} lg={4} xl={3}>
      <ExpandCard cards={oj} />
    </Grid>
  )
  return (
    <Grid style={{padding: 20}} container alignItems="flex-start" direction="row" justify="center" spacing={24}>
      {listItems}
    </Grid>
  )
}


export default Cards;
// <div className="Disco" style={{backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('+oj.img+')'}}>
//   <div className="content">
//     <h2>
//       {oj["title"]}
//     </h2>
//     <p>
//       {oj["p"]}
//     </p>
//     <div>
//       <IconButton aria-label="Share" style={{color: 'white'}}>
//         <ShareIcon />
//       </IconButton>
//       <IconButton aria-label="Music" style={{color: 'white'}}>
//         <MusicNoteIcon />
//       </IconButton>
//     </div>
//   </div>
// </div>
