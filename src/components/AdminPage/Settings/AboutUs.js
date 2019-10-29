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
      new_info_card_id: null,
      new_welcome_message: null
    }
  }

  render() {
    if (!this.state.new_info_card_id&&this.props.app_state.about_us_info_card_id){
      this.setState({new_info_card_id: this.props.app_state.about_us_info_card_id});
    }
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="heading">{this.props.localize.header_AboutUs+' '+this.props.localize.settings}</Typography>
        <Typography className="description">{this.props.localize.settings_chat_room_description}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{display: 'inline-block', width: '100%'}}>
        <TextField
          margin="normal"
          id="info_card_id"
          style={{width: '100%'}}
          label={this.props.localize.header_AboutUs+' '+this.props.localize.info_cards+' ID'}
          type="text"
          fullWidth
          value={this.state.new_info_card_id}
          onChange={evt => {
            this.setState({saved: false, new_info_card_id: evt.target.value});
          }}
        />
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button disabled={this.state.saved} color="primary" size="small" onClick={()=> {
          this.props.actions.updateAboutUsInfoCardId(this.state.new_info_card_id?this.state.new_info_card_id:this.props.app_state.about_us_info_card_id);
          this.setState({saved: true});
        }}>
          {this.props.localize.save}
        </Button>
      </ExpansionPanelActions>
      </CustomExpansionPanel>
    )
  }
};
