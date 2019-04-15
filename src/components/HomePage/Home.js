import React,
{ Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import radio from '../../imgs/radio.png'

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

class TimetableTable extends Component{
  render() {
    let row = Array(this.props.programs.length).fill(null)
    for(let i=0 ; i<this.props.programs.length ; ++i){
      row[i] = this.props.programs[i].map((oj) =>
        <CustomTableCell>
          <a className="pp"
            href={oj.url}
            target="_blank"
            rel='noreferrer noopener'>
            <div>
            {oj.name}
            </div>
          </a>
        </CustomTableCell>
      )
    }
    return(
      <Table fixedHeader={false} >
        <TableHead>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[0]}</CustomTableCell>
            {row[0]}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[1]}</CustomTableCell>
            {row[1]}
          </TableRow>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[2]}</CustomTableCell>
            {row[2]}
          </TableRow>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[3]}</CustomTableCell>
            {row[3]}
          </TableRow>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[4]}</CustomTableCell>
            {row[4]}
          </TableRow>
          <TableRow>
            <CustomTableCell>{this.props.timeseg[5]}</CustomTableCell>
            {row[5]}
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

class Timetable extends Component {
  constructor(props){
    super(props);
    this.state = {
      weekseg: ["Mon.", "Tue.", "Wed.", "Thu."],
      timeseg: ["", "20:00~21:00", "21:00~22:00", "22:00~22:30", "22:30~23:30", "23:30~00:30"],
      programs: [
        [{name: "Mon."}, {name: "Tue."}, {name: "Wed."}, {name: "Thu."}],
        [
          {
            id: "",
            name: "北大\n不好意思\n電台",
            url: "https://www.facebook.com/ntpuvoice/"},
          {
            id: "",
            name: "淡江\n之聲",
            url: "https://www.facebook.com/votkfm887/"},
          {
            id: "",
            name: "台藝\n之聲",
            url: "https://www.facebook.com/NTUAVOTA/"},
          {
            id: "",
            name: "政大\n之聲",
            url: "https://www.facebook.com/vnccu/"}
        ],
        [
          {
            id: "",
            name: "you2B",
            url: "https://www.facebook.com/You2Bonair/"},
          {
            id: "",
            name: "歐美愛",
            url: "https://www.facebook.com/Oh-May-I-%E6%AD%90%E7%BE%8E%E6%84%9B-243481579659308/"},
          {
            id: "",
            name: "婉君\n歐北共",
            url: ""},
          {
            id: "",
            name: "菲聽\n不可",
            url: ""}
        ],
        [
          {
            id: "",
            name: "KKBOX",
            url: ""},
          {
            id: "",
            name: "獨來\n不獨往",
            url: "https://www.facebook.com/%E7%8D%A8%E4%BE%86%E4%B8%8D%E7%8D%A8%E5%BE%80-2229470177329809/"},
          {
            id: "",
            name: "劇樂部",
            url: ""},
          {
            id: "",
            name: "獨來\n不獨往",
            url: "https://www.facebook.com/%E7%8D%A8%E4%BE%86%E4%B8%8D%E7%8D%A8%E5%BE%80-2229470177329809/"}
        ],
        [
          {
            id: "",
            name: "足籃\n趴踢鬧",
            url: "https://www.facebook.com/%E8%B6%B3%E7%B1%83%E8%B6%B4%E8%B8%A2%E9%AC%A7-176185169974190/"},
          {
            id: "",
            name: "金雞\n獨立",
            url: "https://www.facebook.com/%E9%87%91%E9%9B%9E%E7%8D%A8%E7%AB%8B-274759539702642/"},
          {
            id: "",
            name: "噓韓\n問暖",
            url: "https://www.facebook.com/%E5%99%93%E9%9F%93%E5%95%8F%E6%9A%96-188734025359533/"},
          {
            id: "",
            name: "欸!\n我跟你說",
            url: ""}
        ],
        [
          {
            id: "",
            name: "尬聊\n好時光",
            url: "https://www.facebook.com/chatwithPeggypopo/"},
          {
            id: "",
            name: "MC\n麥卵共",
            url: "https://www.facebook.com/MC%E9%BA%A5%E5%8D%B5%E5%85%B1-308383809958627/"},
          {
            id: "",
            name: "彩虹\n頻道",
            url: ""},
          {
            id: "",
            name: "Hip Hop\nin Taiwan\nSKR",
            url: ""}
        ]
      ]
    };
  }
  render() {
    return (
      <div className="timetable">
        <div className="head">
          <img src={radio} alt=""/>
          <p>PROGRAMS</p>
        </div>
        <Paper className="contain">
          <TimetableTable weekseg={this.state.weekseg} timeseg={this.state.timeseg} programs={this.state.programs}/>
        </Paper>
      </div>
    );
  }
}

class Home extends React.Component {
  render () {
    return (
      <div className="section homepage">
        <div className="card_orbit">

        </div>
        <Timetable />
      </div>
    );
  }
}

export default Home;
