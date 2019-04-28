import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


import CustomExpansionPanel from '../CustomExpansionPanel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Tooltip from '@material-ui/core/Tooltip';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#232f34',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    whiteSpace: 'normal',
    wordWrap: "break-word",
    padding: '12px 18px 12px 18px'
  },
}))(TableCell);

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_push_now: false,
      push_now_variant: 'info',
      push_now_content: null
    }
  }

  renderCache() {
    let rows = [];
    for(let i in this.props.push_notification_cache) {
      let cache = this.props.push_notification_cache[i];
      rows.push(
        <TableRow>
          <CustomTableCell>{cache.content}</CustomTableCell>
          <CustomTableCell>{this.props.localize[cache.variant]?this.props.localize[cache.variant]:cache.variant}</CustomTableCell>
          <CustomTableCell>
          <Tooltip title={this.props.localize.push}>
            <IconButton color="primary" size="small" onClick={(event)=> {
              this.props.actions.pushNotification({
                content: cache.content,
                variant: cache.variant
              });
            }}>
              <SendIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title={this.props.localize.delete}>
            <IconButton color="primary" size="small" onClick={(event)=> {}}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          </CustomTableCell>
        </TableRow>
      );
    }
    return rows;
  }

  render() {
    return(
      <CustomExpansionPanel expanded={this.props.expanded} onChange={this.props.onChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="heading">{this.props.localize.push_notification}</Typography>
          <Typography className="description">{this.props.localize.settings_push_notification_description}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display: 'inline-block', width: '100%'}}>
        <Paper style={{width: '100%', overflowX: 'auto'}}>
          <Table fixedHeader={false}  style={{width: '100%'}}>
            <TableHead>
              <TableRow>
                <CustomTableCell>{this.props.localize.content}</CustomTableCell>
                <CustomTableCell>{this.props.localize.variant}</CustomTableCell>
                <CustomTableCell>{this.props.localize.operation}</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderCache()}
            </TableBody>
          </Table>
        </Paper>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button color="primary" size="small">
          {this.props.localize.add_item}
          </Button>

          <Dialog open={this.state.show_push_now} onClose={()=>{this.setState({show_push_now: false})}} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{this.props.localize.push_now}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {this.props.localize.settings_push_notification_description}
              </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="content"
                  label={this.props.localize.content}
                  type="text"
                  fullWidth
                  onChange={evt => {
                    this.setState({push_now_content: evt.target.value});
                  }}
                  onKeyPress={(event)=> {
                    if(event.key == 'Enter'){
                      this.props.actions.pushNotification({
                        content: this.state.push_now_content,
                        variant: this.state.push_now_variant
                      });
                      this.setState({show_push_now: false})
                    }
                  }}
                />
              <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="variant">{this.props.localize.variant}</InputLabel>
                <Select style={{width: '100%'}} id="variant" value={this.state.push_now_variant} onChange={evt => {
                  this.setState({push_now_variant: evt.target.value});
                }}>
                  <MenuItem value={'error'}>{this.props.localize.error}</MenuItem>
                  <MenuItem value={'warning'}>{this.props.localize.warning}</MenuItem>
                  <MenuItem value={'info'}>{this.props.localize.info}</MenuItem>
                  <MenuItem value={'success'}>{this.props.localize.success}</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{this.setState({show_push_now: false})}} color="primary">
                {this.props.localize.cancel}
              </Button>
              <Button onClick={()=>{
                this.props.actions.pushNotification({
                  content: this.state.push_now_content,
                  variant: this.state.push_now_variant
                });
                this.setState({show_push_now: false})
              }} color="primary">
                {this.props.localize.push}
              </Button>
            </DialogActions>
          </Dialog>
          <Button color="primary" size="small" onClick={()=>{this.setState({show_push_now: true})}}>
          {this.props.localize.push_now}
          </Button>
        </ExpansionPanelActions>
      </CustomExpansionPanel>
    )
  }
};
