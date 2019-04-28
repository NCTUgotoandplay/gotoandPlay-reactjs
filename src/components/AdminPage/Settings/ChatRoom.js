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
      saved: true,
      new_chat_room_id: null
    }
  }

  render() {
    if (!this.state.new_chat_room_id&&this.props.app_state.chat_room_id){
      this.setState({new_chat_room_id: this.props.app_state.chat_room_id});
    }
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
          value={this.state.new_chat_room_id}
          onChange={evt => {
            this.setState({new_chat_room_id: evt.target.value});
          }}
        />
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <a href={this.props.talksy_link} target="_blank">
          <Button color="primary" size="small">
          {this.props.localize.open+' Talksy'}
          </Button>
        </a>
        <Button disabled={!this.state.new_chat_room_id} color="primary" size="small" onClick={()=> {
          this.props.actions.updateChatroomId(this.state.new_chat_room_id);
          this.setState({new_chat_room_id: null});
        }}>
          {this.props.localize.save}
        </Button>
      </ExpansionPanelActions>
      </CustomExpansionPanel>
    )
  }
};
