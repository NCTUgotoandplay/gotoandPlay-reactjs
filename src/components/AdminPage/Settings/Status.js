import React from 'react';

import Button from '@material-ui/core/Button';

import CustomExpansionPanel from '../CustomExpansionPanel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Constants from '../../../flux/constants.json';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update_status: false
    }
  }

  renderUpdateStatus() {
    if(this.state.update_status === 'compiling') {
      return this.props.localize.compiling;
    }
    else if (this.state.update_status === 'error') {
      return this.props.localize.compile+' '+this.props.localize.error;
    }
    else if (this.state.update_status === 'success') {
      return this.props.localize.compile+' '+this.props.localize.success;
    }
  }

  render() {
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="heading">{this.props.localize.site_status}</Typography>
          <Typography className="description">{this.props.localize.site_status_description}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display: 'inline-block'}}>
          <Typography variant="h6" component="h2">{this.props.localize.online_count}</Typography>
          <Typography variant="body1" component="p">{this.props.app_state.online_count}</Typography>
          <Divider/>
          <Typography variant="h6" component="h2">{this.props.localize.chat_room+' ID'}</Typography>
          <Typography variant="body1" component="p">{this.props.app_state.chat_room.channel_id}</Typography>
          <Divider/>
          <Typography variant="h6" component="h2">{this.props.localize.version}</Typography>
          <Typography variant="body1" component="p">{this.state.update_status?Constants.version+' '+this.renderUpdateStatus():Constants.version}</Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button color="primary" size="small" onClick={() => {
            this.props.actions.relaunchNoService();
          }}>
          {this.props.localize.relaunch+' NoService'}
          </Button>
          <Button disabled={this.state.update_status&&this.state.update_status!=='success'} color="primary" size="small" onClick={() => {
            this.setState({update_status: 'compiling'}, ()=> {
              this.props.actions.updateBackendReact((err)=> {
                if(err) {
                  this.setState({update_status: 'error'});
                }
                else {
                  this.setState({update_status: 'success'});
                }
              });
            });
          }}>
          {this.state.update_status&&this.state.update_status!=='success'?this.renderUpdateStatus():this.props.localize.settings_complie_site_from_git}
          </Button>
        </ExpansionPanelActions>
      </CustomExpansionPanel>
    )
  }
};
