import React from 'react';

import Button from '@material-ui/core/Button';

import CustomExpansionPanel from '../CustomExpansionPanel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ComputerIcon from '@material-ui/icons/Computer';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="heading">{'NoService '+this.props.localize.settings}</Typography>
        <Typography className="description">{'noservice management'}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{display: 'inline-block'}}>

      <List >
        <a href={'/noservice/shell.html'}>
          <ListItem>
            <Avatar>
              <ComputerIcon />
            </Avatar>
            <ListItemText primary="NoShell" secondary="manipulate your noservice daemon by commands." />
          </ListItem>
        </a>
      </List>
      <List >
        <a href={'/noservice/signup.html'}>
          <ListItem>
            <Avatar>
              <ComputerIcon />
            </Avatar>
            <ListItemText primary="Signup" secondary="signup a noservice acccount." />
          </ListItem>
        </a>
      </List>
      <List >
        <a href={'/noservice/NoUserSettings.html'}>
          <ListItem>
            <Avatar>
              <ComputerIcon />
            </Avatar>
            <ListItemText primary="User settings" secondary="Modify your user settings." />
          </ListItem>
        </a>
      </List>

      </ExpansionPanelDetails>
      </CustomExpansionPanel>
    )
  }
};
