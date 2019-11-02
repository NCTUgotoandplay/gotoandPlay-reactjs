import React from 'react';

import { Link } from "react-router-dom";

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
        <Typography className="heading">{this.props.localize.header_Albums+' '+this.props.localize.settings}</Typography>
        <Typography className="description">{'.'}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{display: 'inline-block'}}>
        {'Click below button to navigate to the settings.'}
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Link to="/albums-management">
          <Button color="primary" size="small">
            {this.props.localize.go+' '+this.props.localize.header_Albums+' '+this.props.localize.settings}
          </Button>
        </Link>
      </ExpansionPanelActions>
      </CustomExpansionPanel>
    )
  }
};
