import React from 'react';

import Button from '@material-ui/core/Button';

import CustomExpansionPanel from '../CustomExpansionPanel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Divider from '@material-ui/core/Divider';

import MaterialTable from 'material-table';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ComputerIcon from '@material-ui/icons/Computer';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: []
    };
  }

  componentDidMount() {
    // this.props.actions.sendNoShellCommand('service entity listmeta', (err, result)=> {
    //   let entities = [];
    //   result = JSON.parse(result);
    //   for(let i in result) {
    //     if (result[i].serverid !=='Local')
    //       entities.push(result[i]);
    //   }
    //   this.setState({entities: entities});
    // });
  }

  render() {
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="heading">{'NoService '+this.props.localize.settings}</Typography>
        <Typography className="description">{'noservice management'}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{display: 'inline-block', width: '100%'}}>

      <List >
        <a href={'/noservice/shell.html'}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ComputerIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="NoShell" secondary="manipulate your noservice daemon by commands." />
          </ListItem>
        </a>
      </List>
      <List >
        <a href={'/noservice/signup.html'}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ComputerIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Signup" secondary="signup a noservice acccount." />
          </ListItem>
        </a>
      </List>
      <List >
        <a href={'/noservice/NoUserSettings.html'}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ComputerIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText primary="User settings" secondary="Modify your user settings." />
          </ListItem>
        </a>
      </List>
      <List>

      </List>
      <MaterialTable
        title={'NoService Entities'}
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Owner', field: 'owner' },
          { title: 'Ip', field: 'spawndomain' },
          { title: 'Connection', field: 'connectiontype' },
          { title: 'Mode', field: 'mode' },
          { title: 'Service', field: 'service' },


        ]}
        data={this.state.entities}
        detailPanel={[
          {
            render: rowData => {
              return (
                <div>
                  <p>{JSON.stringify(rowData, null, 2)}</p>
                  <Button color="primary" size="small" onClick={() => {
                    this.props.actions.sendNoShellCommand('auth emit token '+rowData.id, (err, result)=> {
                      console.log('[auth emit token] '+rowData.id+' '+result);
                    });
                  }}>
                  {'emit token auth'}
                  </Button>
                  <Button color="primary" size="small" onClick={() => {
                    this.props.actions.sendNoShellCommand('auth emit password '+rowData.id, (err, result)=> {
                      console.log('[auth emit password] '+rowData.id+' '+result);
                    });
                  }}>
                  {'emit password auth'}
                  </Button>
                </div>
              );
            },
          },
        ]}
      />
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button color="primary" size="small" onClick={() => {
          this.props.actions.sendNoShellCommand('service entity listmeta', (err, result)=> {
            let entities = [];
            result = JSON.parse(result);
            for(let i in result) {
              if (result[i].serverid !=='Local')
                entities.push(result[i]);
            }
            console.log(entities);
            this.setState({entities: entities});
          });
        }}>
        {'refresh noservice entities'}
        </Button>
        <Button color="primary" size="small" onClick={() => {
          this.props.actions.relaunchNoService();
        }}>
        {this.props.localize.relaunch+' NoService'}
        </Button>
      </ExpansionPanelActions>
      </CustomExpansionPanel>
    )
  }
};
