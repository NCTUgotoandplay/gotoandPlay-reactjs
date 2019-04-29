import React from 'react';

import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

import StatusSettings from './Settings/Status';
import NotificationSettings from './Settings/Notification';
import ChatRoomSettings from './Settings/ChatRoom';
import MoreInfoSettings from './Settings/MoreInfo';
import NewsSettings from './Settings/News';
import TimetableTableSettings from './Settings/TimetableTable';
import AlbumsSettings from './Settings/Albums';
import NoServiceSettings from './Settings/NoService';

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
        <StatusSettings {...this.props} expanded={this.state.expanded === 'status'} onChange={()=>{this.setState({expanded: this.state.expanded==='status'?null:'status'})}}/>

        <NotificationSettings {...this.props} expanded={this.state.expanded === 'notification'} onChange={()=>{this.setState({expanded: this.state.expanded==='notification'?null:'notification'})}}/>

        <ChatRoomSettings {...this.props} expanded={this.state.expanded === 'chatroom'} onChange={()=>{this.setState({expanded: this.state.expanded==='chatroom'?null:'chatroom'})}}/>

        <MoreInfoSettings {...this.props} expanded={this.state.expanded === 'more info'} onChange={()=>{this.setState({expanded: this.state.expanded==='more info'?null:'more info'})}}/>

        <NewsSettings {...this.props} expanded={this.state.expanded === 'news'} onChange={()=>{this.setState({expanded: this.state.expanded==='news'?null:'news'})}}/>

        <TimetableTableSettings {...this.props} expanded={this.state.expanded === 'TimetableTable'} onChange={()=>{this.setState({expanded: this.state.expanded==='TimetableTable'?null:'TimetableTable'})}}/>

        <AlbumsSettings {...this.props} expanded={this.state.expanded === 'albums'} onChange={()=>{this.setState({expanded: this.state.expanded==='albums'?null:'albums'})}}/>

        <NoServiceSettings {...this.props} expanded={this.state.expanded === 'noservice'} onChange={()=>{this.setState({expanded: this.state.expanded==='noservice'?null:'noservice'})}}/>

      </div>
    );
  }
}

export default AdminPage;