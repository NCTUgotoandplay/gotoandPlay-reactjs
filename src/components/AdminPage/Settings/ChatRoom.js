import React from 'react';

import Button from '@material-ui/core/Button';

import CustomExpansionPanel from '../CustomExpansionPanel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: true
    }
  }

  render() {
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="heading">{this.props.localize.chat_room+' '+this.props.localize.settings}</Typography>
        <Typography className="description">{this.props.localize.settings_chat_room_description}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TextField
          margin="normal"
          id="link"
          label={this.props.localize.chat_room+' ID'}
          type="text"
          fullWidth
          onChange={evt => {}}
        />
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <a href={this.props.talksy_link} target="_blank">
          <Button color="primary" size="small">
          {'open Talksy'}
          </Button>
        </a>
        <Button disabled={this.state.saved} color="primary" size="small" onClick={()=> {

        }}>
          {this.props.localize.save}
        </Button>
      </ExpansionPanelActions>
      </CustomExpansionPanel>
    )
  }
};
