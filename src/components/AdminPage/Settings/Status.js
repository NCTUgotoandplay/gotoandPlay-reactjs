import React from 'react';

import Button from '@material-ui/core/Button';

import CustomExpansionPanel from '../CustomExpansionPanel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Constants from '../../../flux/constants.json';

import Switch from '@material-ui/core/Switch';

import TextField from '@material-ui/core/TextField';


export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      update_status: false,
      show_audio: false,
      audio_source: props.app_state.audio.audio_source,
      show_alter_audio: false,
      alter_audio_source: props.app_state.audio.alternative_audio_source,
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
          <Divider/>
          <Typography variant="h6" component="h2">{this.props.localize.audio}</Typography>
          <Typography variant="body1" component="p">{this.props.localize.audio_description}</Typography>

          <Button style={{marginRight: '10px'}} color="primary" variant="outlined" size="small" onClick={() => {
            this.setState({show_audio: true})
          }}>
          {this.props.localize.audio+' '+this.props.localize.link}
          </Button>
          <Dialog open={this.state.show_audio} onClose={()=>{this.setState({show_audio: false})}} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{this.props.localize.audio+' '+this.props.localize.link}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {this.props.localize.audio_description}
              </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="content"
                  label={this.props.localize.link}
                  type="text"
                  fullWidth
                  defaultValue={this.props.app_state.audio.audio_source}
                  onChange={evt => {
                    this.setState({audio_source: evt.target.value});
                  }}
                  onKeyPress={(event)=> {
                    if(event.key == 'Enter'){
                      this.props.actions.pushNotification({
                        content: '['+this.props.localize.audio+'] '+this.state.audio_source,
                        variant: 'warning'
                      });
                      let new_settings = this.props.app_state.audio;
                      new_settings.audio_source = this.state.audio_source;
                      this.props.actions.updateAudioSettings(new_settings);
                      this.setState({show_audio: false})
                    }
                  }}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{this.setState({show_audio: false})}} color="primary">
                {this.props.localize.cancel}
              </Button>
              <Button onClick={()=>{
                this.props.actions.pushNotification({
                  content: '['+this.props.localize.audio+'] '+this.state.audio_source,
                  variant: 'warning'
                });
                let new_settings = this.props.app_state.audio;
                new_settings.audio_source = this.state.audio_source;
                this.props.actions.updateAudioSettings(new_settings);
                this.setState({show_audio: false})
              }} color="primary">
                {this.props.localize.ok}
              </Button>
            </DialogActions>
          </Dialog>
          <Typography variant="body1" component="p">{this.props.localize.alternative_audio_description}</Typography>
          <Button color="primary" variant="outlined" size="small" onClick={() => {
            this.setState({show_alter_audio: true})
          }}>
          {this.props.localize.alternative_audio+' '+this.props.localize.link}
          </Button>
          <Dialog open={this.state.show_alter_audio} onClose={()=>{this.setState({show_alter_audio: false})}} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{this.props.localize.alternative_audio+' '+this.props.localize.link}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {this.props.localize.alternative_audio_description}
              </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="content"
                  label={this.props.localize.link}
                  type="text"
                  fullWidth
                  defaultValue={this.props.app_state.audio.alter_audio_source}
                  onChange={evt => {
                    this.setState({audio_source: evt.target.value});
                  }}
                  onKeyPress={(event)=> {
                    if(event.key == 'Enter'){
                      this.props.actions.pushNotification({
                        content: '['+this.props.localize.alternative_audio+'] '+this.state.alter_audio_source,
                        variant: 'warning'
                      });
                      let new_settings = this.props.app_state.audio;
                      new_settings.alternative_audio_source = this.state.alter_audio_source;
                      this.props.actions.updateAudioSettings(new_settings);
                      this.setState({show_alter_audio: false})
                    }
                  }}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{this.setState({show_alter_audio: false})}} color="primary">
                {this.props.localize.cancel}
              </Button>
              <Button onClick={()=>{
                this.props.actions.pushNotification({
                  content: '['+this.props.localize.alternative_audio+'] '+this.state.alter_audio_source,
                  variant: 'warning'
                });
                let new_settings = this.props.app_state.audio;
                new_settings.alternative_audio_source = this.state.alter_audio_source;
                this.props.actions.updateAudioSettings(new_settings);
                this.setState({show_alter_audio: false})
              }} color="primary">
                {this.props.localize.ok}
              </Button>
            </DialogActions>
          </Dialog>
          <Switch
            checked={this.props.app_state.audio.do_audio_source_alter}
            onChange={()=>{
              let new_settings = this.props.app_state.audio;
              new_settings.do_audio_source_alter = !new_settings.do_audio_source_alter;
              this.props.actions.updateAudioSettings(new_settings);
            }}
            value="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
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
