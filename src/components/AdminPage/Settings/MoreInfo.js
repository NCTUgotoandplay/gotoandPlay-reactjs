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
        <Typography className="heading">{this.props.localize.more_info+' '+this.props.localize.settings}</Typography>
        <Typography className="description">{this.props.localize.description}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      </ExpansionPanelDetails>
      </CustomExpansionPanel>
    )
  }
};
