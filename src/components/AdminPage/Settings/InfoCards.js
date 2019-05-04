import React from 'react';

import Button from '@material-ui/core/Button';

import CustomExpansionPanel from '../CustomExpansionPanel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';


import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

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

class CardsTable extends  React.Component {

};

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      edited_information_card: null,
      saved: true
    }
  }

  saveCard() {
    this.props.actions.updateInformationCard(this.state.edited_information_card, ()=> {
      this.setState({edited_information_card: null});
    });
  }

  //link img

  renderCard(card_id, card) {
    let rows = [
      <CustomTableCell>{card.Title}</CustomTableCell>,
      <CustomTableCell>
        <Tooltip title={this.props.localize.edit}>
          <IconButton onClick={()=> {this.setState({edited_information_card: {
            CardId: card.CardId,
            Title: card.Title,
            Description: card.Description,
            ImageURL: card.ImageURL,
            Link: card.Link,
            Expanded: card.Expanded,
            Expandable: card.Expandable
          }})}}>
            <EditIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title={this.props.localize.suggestion}>
          {this.props.app_state.suggested_information_cards.includes(card_id)?
            <IconButton onClick={()=>{this.props.actions.deleteSuggestedInformationCards(card_id)}}>
              <FavoriteIcon/>
            </IconButton>
            :
            <IconButton onClick={()=>{this.props.actions.addSuggestedInformationCards(card_id)}}>
              <FavoriteBorderIcon/>
            </IconButton>
          }
        </Tooltip>
        <Tooltip title={this.props.localize.delete}>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title={this.props.localize.go}>
          <a href={'/InformationCards/'+card.CardId} target="_blank">
            <IconButton>
              <LaunchIcon/>
            </IconButton>
          </a>
        </Tooltip>
      </CustomTableCell>,
      <CustomTableCell>{card.Description?card.Description.slice(0, 20)+'...':this.props.localize.null}</CustomTableCell>,
      <CustomTableCell>{card.createdate}</CustomTableCell>,
      <CustomTableCell>{card.modifydate}</CustomTableCell>
    ];
    return rows;
  }

  renderHeader() {
    let rows = [
      <CustomTableCell>{this.props.localize.title}</CustomTableCell>,
      <CustomTableCell>{this.props.localize.operation}</CustomTableCell>,
      <CustomTableCell>{this.props.localize.description}</CustomTableCell>,
      <CustomTableCell>{this.props.localize.created_date}</CustomTableCell>,
      <CustomTableCell>{this.props.localize.modified_date}</CustomTableCell>
    ];
    return rows;
  }

  render() {
    if(this.props.expanded&&!this.state.loaded) {
      this.props.actions.loadAllInformationCards();
      this.setState({loaded: true});
    }
    return(
      [
        <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">{this.props.localize.info_cards+' '+this.props.localize.settings}</Typography>
            <Typography className="description">{this.props.localize.description}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{width: '100%', display: 'inline-block'}}>
          <Paper style={{width: '100%', overflowX: 'auto'}} className="contain">
            <Table fixedHeader={false} >
              <TableHead>
                <TableRow>
                  {this.renderHeader()}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(this.props.app_state.information_cards).map((card_id)=> {
                  return(
                    <TableRow>
                      {this.renderCard(card_id, this.props.app_state.information_cards[card_id])}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button color="primary" size="small" onClick={()=> {this.setState({edited_information_card: {}})}}>
              {this.props.localize.add_item}
            </Button>
          </ExpansionPanelActions>
        </CustomExpansionPanel>
        ,
        <Dialog open={this.state.edited_information_card} onClose={()=>{this.setState({edited_information_card: null})}} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.props.localize.info_cards+' '+this.props.localize.settings}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label={this.props.localize.title}
              type="text"
              fullWidth
              value={this.state.edited_information_card?this.state.edited_information_card.Title:null}
              onChange={(evt) => {
                let value = evt.target.value;
                this.setState(prevState=>{prevState.edited_information_card.Title = value;return prevState;});
              }}
            />
            <FormControlLabel control={
              <Checkbox
                checked={this.state.edited_information_card?this.state.edited_information_card.Expandable:null}
                onChange={(evt)=> {
                  let value = evt.target.checked;
                  this.setState(prevState=>{prevState.edited_information_card.Expandable = value;return prevState;});
                }}
              />
            } label={'expandable'}/>

            <FormControlLabel control={
              <Checkbox
              checked={this.state.edited_information_card?this.state.edited_information_card.Expanded:null}
              onChange={(evt)=> {
                let value = evt.target.checked;
                this.setState(prevState=>{prevState.edited_information_card.Expanded = value;return prevState;});
              }}
              />
            } label={'expanded'}/>

            <TextField
              margin="dense"
              id="link"
              label={this.props.localize.link}
              type="text"
              fullWidth
              value={this.state.edited_information_card?this.state.edited_information_card.Link:null}
              onChange={evt => {
                let value = evt.target.value;
                this.setState(prevState=>{prevState.edited_information_card.Link = value; return prevState});
              }}
            />
            <TextField
              margin="dense"
              id="img"
              label={this.props.localize.image}
              type="text"
              fullWidth
              value={this.state.edited_information_card?this.state.edited_information_card.ImageURL:null}
              onChange={evt => {
                let value = evt.target.value;
                this.setState(prevState=>{prevState.edited_information_card.ImageURL = value; return prevState});
              }}
            />
            <Typography className="heading">{this.props.localize.description}</Typography>
            {
              this.state.edited_information_card?
              <ReactMde
                onChange={value => {
                  this.setState(prevState=>{prevState.edited_information_card.Description = value; return prevState});
                }}
                value={this.state.edited_information_card.Description}
              />
              :null
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.setState({edited_information_card: null})}} color="primary">
              {this.props.localize.cancel}
            </Button>
            <Button onClick={()=>{this.saveCard();}} color="primary">
              {this.props.localize.save}
            </Button>
          </DialogActions>
        </Dialog>
      ]

    )
  }
};
