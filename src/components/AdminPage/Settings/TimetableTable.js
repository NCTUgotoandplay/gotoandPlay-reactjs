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

import {EditableTimetableTable} from '../../commons/TimetableTable';

import TextField from '@material-ui/core/TextField';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edited_timetable: this.props.app_state.programs,
      saved: true
    }
  }

  render() {
    if(!this.state.edited_timetable&&this.props.app_state.programs) {
      this.setState({edited_timetable: this.props.app_state.programs});
    }
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="heading">{this.props.localize.timetable+' '+this.props.localize.settings}</Typography>
          <Typography className="description">{this.props.localize.settings_timetable_description}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Paper style={{width: '100%', overflowX: 'auto'}} className="contain">
            {this.props.app_state.programs?
              <EditableTimetableTable
                style={{width: '100%'}}
                localize={this.props.localize}
                timetable={this.state.edited_timetable}
                onShowDaysChange={(new_show_days)=> {
                  this.setState(prevState=>{
                    let newTimetable = prevState.edited_timetable;
                    newTimetable.show_days = new_show_days;
                    return({saved: false, edited_timetable: newTimetable});
                  });
                }}
                onShowSegmentsChange={(newShowSegments)=> {
                  this.setState(prevState=>{
                    let newTimetable = prevState.edited_timetable;;
                    newTimetable.show_segments = newShowSegments;
                    return({saved: false, edited_timetable: newTimetable});
                  });
                }}
                onSegmentNameChange={(oldName, newName)=> {
                  if(oldName!==newName) {
                    this.setState(prevState=>{
                      let newTimetable = prevState.edited_timetable;

                      let newShowSegments = newTimetable.show_segments;
                      let index = newShowSegments.indexOf(oldName);
                      if (index > -1) {
                        newShowSegments[index] = newName;
                      }

                      newTimetable.segments[newName] = newTimetable.segments[oldName];
                      delete newTimetable.segments[oldName];
                      newTimetable.show_segments = newShowSegments;
                      return({saved: false, edited_timetable: newTimetable});
                    });
                  }
                  else {
                    alert('Already exists.');
                  }
                }}
                onSegmentsChange={(newSegments)=> {
                  this.setState(prevState=>{
                    let newTimetable = prevState.edited_timetable;
                    newTimetable.segments = newSegments;
                    return({saved: false, edited_timetable: newTimetable});
                  });
                }}
                onSegmentDeleted={(segment_name)=> {
                  this.setState(prevState=>{
                    let newTimetable = prevState.edited_timetable;
                    let newShowSegments = newTimetable.show_segments;
                    let index = newShowSegments.indexOf(segment_name);
                    if (index > -1) {
                      newShowSegments.splice(index, 1);
                    }
                    delete newTimetable.segments[segment_name];
                    newTimetable.show_segments = newShowSegments;
                    return({saved: false, edited_timetable: newTimetable});
                  });
                }}
              />
              :null}
          </Paper>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button color="primary" size="small" onClick={()=> {
            download(this.props.localize.timetable+'.json', JSON.stringify(this.state.edited_timetable, null, 2));
          }}>
            {this.props.localize.export}
          </Button>

          <input
            id="button-file"
            type="file"
            accept="json/*"
            style={{display: 'none'}}
            onChange={(e)=> {
              let filename = e.target.files[0];
              let reader = new FileReader();
              reader.onloadend = ()=> {
                this.setState({saved: false, edited_timetable: JSON.parse(reader.result)});
              };
              reader.readAsText(filename);
            }}
          />
          <label htmlFor="button-file">
            <Button raised color="primary"  component="span"  size="small">
              {this.props.localize.import}
            </Button>
          </label>

          <Button color="primary" size="small" onClick={()=>{this.setState({edit_add_new_segment: {segment: this.props.localize.segment}})}}>
            {this.props.localize.add_segment}
          </Button>
          <Button disabled={this.state.saved} color="primary" size="small" onClick={()=> {
            this.props.actions.updatePrograms(this.state.edited_timetable, ()=> {
              this.setState({saved: true});
            });

          }}>
            {this.props.localize.save}
          </Button>
        </ExpansionPanelActions>
        <Dialog open={this.state.edit_add_new_segment} onClose={()=>{this.setState({edit_add_new_segment: null})}} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.props.localize.segment+' '+this.props.localize.settings}</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label={this.props.localize.new}
              type="text"
              fullWidth
              value={this.state.edit_add_new_segment?this.state.edit_add_new_segment.segment:null}
              onChange={evt => {
                this.setState({edit_add_new_segment: {segment: evt.target.value}});
              }}
              onKeyPress={(event)=> {
                if(event.key == 'Enter') {
                  this.setState(prevState=> {
                    let segment = prevState.edit_add_new_segment.segment;
                    if(prevState.edited_timetable.segments[segment]) {
                      alert('Already exists.');
                      prevState.edit_add_new_segment = null;
                      return prevState;
                    }
                    else {
                      prevState.edit_add_new_segment = null;
                      prevState.edited_timetable.show_segments.push(segment);
                      prevState.edited_timetable.segments[segment] = [null, null, null, null, null, null, null];
                      return prevState;
                    }
                  });
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.setState({edit_add_new_segment: null})}} color="primary">
              {this.props.localize.cancel}
            </Button>
            <Button onClick={()=>{
              this.setState(prevState=> {
                let segment = prevState.edit_add_new_segment.segment;
                prevState.saved = false;
                if(prevState.edited_timetable.segments[segment]) {
                  alert('Already exists.');
                  prevState.edit_add_new_segment = null;
                  return prevState;
                }
                else {
                  prevState.edit_add_new_segment = null;
                  prevState.edited_timetable.show_segments.push(segment);
                  prevState.edited_timetable.segments[segment] = [null, null, null, null, null, null, null];
                  return prevState;
                }
              });
            }} color="primary">
              {this.props.localize.ok}
            </Button>
          </DialogActions>
        </Dialog>
      </CustomExpansionPanel>
    )
  }
};
