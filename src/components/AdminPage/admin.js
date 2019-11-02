import React from 'react';

import StatusSettings from './Settings/Status';
import NotificationSettings from './Settings/Notification';
import ChatRoomSettings from './Settings/ChatRoom';
import AboutUsSettings from './Settings/AboutUs';
import InfoCards from './Settings/InfoCards';
import TimetableTableSettings from './Settings/TimetableTable';
import AlbumsSettings from './Settings/Albums';
import NoServiceSettings from './Settings/NoService';


class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'status'
    }
  }
  componentDidMount() {
     window.scrollTo(0, 0);
  }
  render () {
    return (
      <div className="adminpage" style={{'color': 'white', 'background': 'repeating-linear-gradient(45deg, rgba(35, 47, 52, 0.8), rgba(35, 47, 52, 0.8) 10px, rgba(47, 55, 58, 0.8) 10px, rgba(47, 55, 58, 0.8) 20px)'}}>
        <h1>{this.props.localize.admin_page}</h1>
        <hr style={{'border': '1px solid'}}/>
        <StatusSettings {...this.props} expanded={this.state.expanded === 'status'} onChange={()=>{this.setState({expanded: this.state.expanded==='status'?null:'status'})}}/>

        <NotificationSettings {...this.props} expanded={this.state.expanded === 'notification'} onChange={()=>{this.setState({expanded: this.state.expanded==='notification'?null:'notification'})}}/>

        <ChatRoomSettings {...this.props} expanded={this.state.expanded === 'chatroom'} onChange={()=>{this.setState({expanded: this.state.expanded==='chatroom'?null:'chatroom'})}}/>

        <AboutUsSettings {...this.props} expanded={this.state.expanded === 'aboutus'} onChange={()=>{this.setState({expanded: this.state.expanded==='aboutus'?null:'aboutus'})}}/>

        <InfoCards {...this.props} expanded={this.state.expanded === 'cards'} onChange={()=>{this.setState({expanded: this.state.expanded==='cards'?null:'cards'})}}/>

        <TimetableTableSettings {...this.props} expanded={this.state.expanded === 'TimetableTable'} onChange={()=>{this.setState({expanded: this.state.expanded==='TimetableTable'?null:'TimetableTable'})}}/>

        <AlbumsSettings {...this.props} expanded={this.state.expanded === 'albums'} onChange={()=>{this.setState({expanded: this.state.expanded==='albums'?null:'albums'})}}/>

        <NoServiceSettings {...this.props} expanded={this.state.expanded === 'noservice'} onChange={()=>{this.setState({expanded: this.state.expanded==='noservice'?null:'noservice'})}}/>

      </div>
    );
  }
}

export default AdminPage;
