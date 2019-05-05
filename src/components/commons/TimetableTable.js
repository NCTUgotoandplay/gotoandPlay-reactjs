import React,
{ Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';

import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#232f34',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    whiteSpace: 'normal',
    wordWrap: "break-word",
    padding: '18px 18px 18px 18px'
  },
}))(TableCell);

const EditableTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#232f34',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 10,
    whiteSpace: 'normal',
    wordWrap: "break-word",
    padding: '12px 12px 12px 12px'
  },
}))(TableCell);

export class TimetableTable extends Component{
  renderHeader() {
    let rows = [<CustomTableCell key="start"></CustomTableCell>];
    let show_days = this.props.timetable.show_days;
    for(let i in show_days) {
      if(show_days[i]) {
        rows.push(<CustomTableCell key={i}>{this.props.localize.days[i]}</CustomTableCell>);
      }
    }
    return rows;
  }
  renderSegment(segment_name) {
    let rows = [<CustomTableCell key="start">{segment_name}</CustomTableCell>];
    let show_days = this.props.timetable.show_days;
    let segment = this.props.timetable.segments[segment_name];
    for(let i in show_days) {
      if(show_days[i]) {
        if(segment[i]) {
          rows.push(
            <CustomTableCell key={i}>
              <Tooltip title={segment[i].description?segment[i].description:segment[i].title}>
                <a href={segment[i].url} target="_blank">
                  {segment[i].title}
                </a>
              </Tooltip>
            </CustomTableCell>
          );
        }
        else {
          rows.push(
            <CustomTableCell key={i}>
              {this.props.localize.no_program}
            </CustomTableCell>
          );
        }
      }

    }
    return rows;
  }
  render() {
    return(
      <Table>
        <TableHead>
          <TableRow>
            {this.renderHeader()}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.timetable.show_segments.map((segment_name)=> {
            return(
              <TableRow key={segment_name}>
                {this.renderSegment(segment_name)}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    );
  }
}

export class EditableTimetableTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      edit_segment_name: null,
      edit_segment_item: null,
    }
  }
  renderHeader() {
    let rows = [<CustomTableCell>{this.props.localize.segment}</CustomTableCell>, <CustomTableCell>{this.props.localize.operation}</CustomTableCell>];
    let show_days = this.props.timetable.show_days;
    for(let i in show_days) {
      rows.push(
        <EditableTableCell>
          {this.props.localize.days[i]}
          <Checkbox
            checked={show_days[i]}
            onChange={(event)=> {
              let new_show_days = show_days;
              new_show_days[i] = event.target.checked;
              this.props.onShowDaysChange(new_show_days);
            }}
          />
        </EditableTableCell>);
    }
    return rows;

  }
  renderSegment(segment_name) {
    let index = this.props.timetable.show_segments.indexOf(segment_name);
    let rows = [
      <CustomTableCell>
        <Tooltip title={this.props.localize.edit}>
          <Button onClick={()=>{this.setState({edit_segment_name:{old: segment_name, new: segment_name}});}}>{segment_name}</Button>
        </Tooltip>
      </CustomTableCell>,
      <CustomTableCell style={{display: 'inline-flex'}}>

        <Tooltip title={this.props.localize.upward}>
          <IconButton color="primary" size="small" disabled={index===0} onClick={()=> {
            let newShowSegments = this.props.timetable.show_segments;
            if(index>0) {
              let hold = newShowSegments[index];
              newShowSegments[index] = newShowSegments[index-1];
              newShowSegments[index-1] = hold;
              this.props.onShowSegmentsChange(newShowSegments);
            }
          }}><ArrowUpwardIcon/></IconButton>
        </Tooltip>

        <Tooltip title={this.props.localize.downward}>
          <IconButton color="primary" size="small" disabled={index===this.props.timetable.show_segments.length-1}  onClick={()=> {
            let newShowSegments = this.props.timetable.show_segments;
            if(index<newShowSegments.length-1) {
              let hold = newShowSegments[index];
              newShowSegments[index] = newShowSegments[index+1];
              newShowSegments[index+1] = hold;
              this.props.onShowSegmentsChange(newShowSegments);
            }
          }}><ArrowDownwardIcon/></IconButton>
        </Tooltip>

        <Tooltip title={this.props.localize.delete}>
          <IconButton color="primary" size="small" onClick={()=> {
            this.props.onSegmentDeleted(segment_name);
          }}><DeleteIcon/></IconButton>
        </Tooltip>
      </CustomTableCell>
    ];
    let show_days = this.props.timetable.show_days;
    let segment = this.props.timetable.segments[segment_name];
    for(let i in show_days) {
      if(segment[i]) {
        rows.push(
          <EditableTableCell>
            <Tooltip title={this.props.localize.edit}>
              <Button target="_blank" onClick={()=> {
                this.setState({edit_segment_item: {segment: segment_name, day: i, title: segment[i].title, url: segment[i].url, description: segment[i].description}});
              }}>
                {segment[i].title}
              </Button>
            </Tooltip>
          </EditableTableCell>
        );
      }
      else {
        rows.push(
          <EditableTableCell>
            <Tooltip title={this.props.localize.add_item}>
              <Button target="_blank" onClick={()=> {
                this.setState({edit_segment_item:{segment: segment_name, day: i, title: '', url: ''}});
              }}>
                {this.props.localize.no_program}
              </Button>
            </Tooltip>
          </EditableTableCell>
        );
      }
    }
    return rows;
  }
  emitOnSegmentsChange() {
    let newSegments = this.props.timetable.segments;
    newSegments[this.state.edit_segment_item.segment][this.state.edit_segment_item.day] = {
      title: this.state.edit_segment_item.title,
      url: this.state.edit_segment_item.url,
      description: this.state.edit_segment_item.description,
    };
    this.props.onSegmentsChange(newSegments);
    this.setState({edit_segment_item: null});
  }
  render() {
    if(this.props.timetable) {
      return([
        <Table fixedHeader={false} >
          <TableHead>
            <TableRow>
              {this.renderHeader()}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.timetable.show_segments.map((segment_name)=> {
              return(
                <TableRow>
                  {this.renderSegment(segment_name)}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        ,
        <Dialog open={this.state.edit_segment_name} onClose={()=>{this.setState({edit_segment_name: null})}} aria-labelledby="form-dialog-title">
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
              value={this.state.edit_segment_name?this.state.edit_segment_name.new:null}
              onChange={evt => {
                let new_edit_segment_name = this.state.edit_segment_name;
                new_edit_segment_name.new = evt.target.value;
                this.setState({edit_segment_name: new_edit_segment_name});
              }}
              onKeyPress={(event)=> {
                if(event.key == 'Enter'){
                  this.props.onSegmentNameChange(this.state.edit_segment_name.old, this.state.edit_segment_name.new);
                  this.setState({edit_segment_name: null});
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.setState({edit_segment_name: null})}} color="primary">
              {this.props.localize.cancel}
            </Button>
            <Button onClick={()=>{
              this.props.onSegmentNameChange(this.state.edit_segment_name.old, this.state.edit_segment_name.new);
              this.setState({edit_segment_name: null});
            }} color="primary">
              {this.props.localize.ok}
            </Button>
          </DialogActions>
        </Dialog>
        ,
        <Dialog open={this.state.edit_segment_item} onClose={()=>{this.setState({edit_segment_item: null})}} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{this.props.localize.segment+' '+this.props.localize.settings}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {this.state.edit_segment_item?this.props.localize.days[this.state.edit_segment_item.day]+', '+this.state.edit_segment_item.segment:null}
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="title"
              label={this.props.localize.title}
              type="text"
              fullWidth
              value={this.state.edit_segment_item?this.state.edit_segment_item.title:null}
              onChange={evt => {
                let new_edit_segment_item = this.state.edit_segment_item;
                new_edit_segment_item.title = evt.target.value;
                this.setState({edit_segment_item: new_edit_segment_item});
              }}
              onKeyPress={(event)=> {
                if(event.key == 'Enter'){
                  this.emitOnSegmentsChange();
                }
              }}
            />
            <TextField
              margin="normal"
              id="description"
              label={this.props.localize.description}
              type="text"
              fullWidth
              value={this.state.edit_segment_item?this.state.edit_segment_item.description:null}
              onChange={evt => {
                let new_edit_segment_item = this.state.edit_segment_item;
                new_edit_segment_item.description = evt.target.value;
                this.setState({edit_segment_item: new_edit_segment_item});
              }}
              onKeyPress={(event)=> {
                if(event.key == 'Enter'){
                  this.emitOnSegmentsChange();
                }
              }}
            />
            <TextField
              margin="normal"
              id="link"
              label={this.props.localize.link}
              type="text"
              fullWidth
              value={this.state.edit_segment_item?this.state.edit_segment_item.url:null}
              onChange={evt => {
                let new_edit_segment_item = this.state.edit_segment_item;
                new_edit_segment_item.url = evt.target.value;
                this.setState({edit_segment_item: new_edit_segment_item});
              }}
              onKeyPress={(event)=> {
                if(event.key == 'Enter'){
                  this.emitOnSegmentsChange();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{this.setState({edit_segment_item: null})}} color="primary">
              {this.props.localize.cancel}
            </Button>
            <Button onClick={()=>{
              let newSegments = this.props.timetable.segments;
              newSegments[this.state.edit_segment_item.segment][this.state.edit_segment_item.day] = null;
              this.props.onSegmentsChange(newSegments);
              this.setState({edit_segment_item: null});
            }} color="primary">
              {this.props.localize.delete}
            </Button>
            <Button onClick={()=>{
              this.emitOnSegmentsChange();
            }} color="primary">
              {this.props.localize.ok}
            </Button>
          </DialogActions>
        </Dialog>
      ]
      );
    }
    return null;
  }
}
