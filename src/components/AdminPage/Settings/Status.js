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


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="heading">{this.props.localize.site_status}</Typography>
          <Typography className="description">{this.props.localize.site_status_description}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display: 'inline-block'}}>
          <Typography variant="h6" component="h2">線上人數</Typography>
          <Typography variant="p" component="p">{this.props.app_state.online_count}</Typography>
          <Divider/>
          <Typography variant="h6" component="h2">聊天室ID</Typography>
          <Typography variant="p" component="p">12sdfs121</Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button color="primary" size="small">
          {this.props.localize.settings_complie_site_from_git}
          </Button>
        </ExpansionPanelActions>
      </CustomExpansionPanel>
    )
  }
};
