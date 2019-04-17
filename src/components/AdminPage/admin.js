import React from 'react';

import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import TimetableTable from '../commons/TimetableTable';


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

const CustomExpansionPanel = withStyles(theme => ({
  root: {
    width: '100%'
  }
}))(ExpansionPanel);

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    }
  }
  render () {
    return (
      <div className="adminpage">
        <h1>{this.props.localize.admin_page}</h1>
        <hr />
        <CustomExpansionPanel expanded={this.state.expanded === 'status'} onChange={()=>{this.setState({expanded: this.state.expanded==='status'?null:'status'})}}>
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

        <CustomExpansionPanel expanded={this.state.expanded === 'chatroom'} onChange={()=>{this.setState({expanded: this.state.expanded==='chatroom'?null:'chatroom'})}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">{this.props.localize.chat_room+' '+this.props.localize.settings}</Typography>
            <Typography className="description">{this.props.localize.settings_chat_room_description}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          </ExpansionPanelDetails>
        </CustomExpansionPanel>

        <CustomExpansionPanel expanded={this.state.expanded === 'more info'} onChange={()=>{this.setState({expanded: this.state.expanded==='more info'?null:'more info'})}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">{this.props.localize.more_info+' '+this.props.localize.settings}</Typography>
            <Typography className="description">description</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          </ExpansionPanelDetails>
        </CustomExpansionPanel>

        <CustomExpansionPanel expanded={this.state.expanded === 'news'} onChange={()=>{this.setState({expanded: this.state.expanded==='news'?null:'news'})}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">{this.props.localize.news+' '+this.props.localize.settings}</Typography>
            <Typography className="description">description</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          </ExpansionPanelDetails>
        </CustomExpansionPanel>

        <CustomExpansionPanel expanded={this.state.expanded === 'TimetableTable'} onChange={()=>{this.setState({expanded: this.state.expanded==='TimetableTable'?null:'TimetableTable'})}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">{this.props.localize.timetable+' '+this.props.localize.settings}</Typography>
            <Typography className="description">{this.props.localize.settings_timetable_description}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper className="contain">
              {this.props.app_state.programs?<TimetableTable weekseg={this.props.app_state.programs.weekseg} timeseg={this.props.app_state.programs.timeseg} programs={this.props.app_state.programs.programs}/>:null}
            </Paper>
          </ExpansionPanelDetails>
        </CustomExpansionPanel>

        <CustomExpansionPanel expanded={this.state.expanded === 'albums'} onChange={()=>{this.setState({expanded: this.state.expanded==='albums'?null:'albums'})}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">{this.props.localize.header_Albums+' '+this.props.localize.settings}</Typography>
            <Typography className="description">{'.'}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{display: 'inline-block'}}>
            <Typography variant="h6" component="h2">{this.props.localize.header_Albums}</Typography>
            <Typography variant="h6" component="h2">{this.props.localize.highlighted_albums}</Typography>
            <Typography variant="h6" component="h2">{this.props.localize.album_collections}</Typography>
          </ExpansionPanelDetails>
        </CustomExpansionPanel>

        <CustomExpansionPanel expanded={this.state.expanded === 'noservice'} onChange={()=>{this.setState({expanded: this.state.expanded==='noservice'?null:'noservice'})}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="heading">{'NoService '+this.props.localize.settings}</Typography>
            <Typography className="description">{'noservice management'}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          </ExpansionPanelDetails>
        </CustomExpansionPanel>

      </div>
    );
  }
}

export default AdminPage;
