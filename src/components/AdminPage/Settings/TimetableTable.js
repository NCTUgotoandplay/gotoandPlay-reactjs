import React from 'react';

import Button from '@material-ui/core/Button';

import CustomExpansionPanel from '../CustomExpansionPanel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Paper from '@material-ui/core/Paper';

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {TimetableTable} from '../../commons/TimetableTable';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="heading">{this.props.localize.timetable+' '+this.props.localize.settings}</Typography>
        <Typography className="description">{this.props.localize.settings_timetable_description}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Paper className="contain">
          {this.props.app_state.programs?<TimetableTable localize={this.props.localize} timetable={this.props.app_state.programs}/>:null}
        </Paper>
      </ExpansionPanelDetails>
      </CustomExpansionPanel>
    )
  }
};
