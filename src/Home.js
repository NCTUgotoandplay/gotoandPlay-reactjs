import React,
{ Component } from 'react'
import radio from './imgs/radio.psd'

class Table extends Component{
  render() {
    let row = Array(this.props.programs.length).fill(null)
    for(let i=0 ; i<this.props.programs.length ; ++i){
      row[i] = this.props.programs[i].map((oj) =>
        <td>
          <a className="pp"
            href={oj.url}
            target="_blank"
            rel='noreferrer noopener'>
            {oj.name}
          </a>
        </td>
      )
    }
    return(
      <table>
        <thead>
          <tr>
            <td>{this.props.timeseg[0]}</td>
            {row[0]}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.timeseg[1]}</td>
            {row[1]}
          </tr>
          <tr>
            <td>{this.props.timeseg[2]}</td>
            {row[2]}
          </tr>
          <tr>
            <td>{this.props.timeseg[3]}</td>
            {row[3]}
          </tr>
          <tr>
            <td>{this.props.timeseg[4]}</td>
            {row[4]}
          </tr>
          <tr>
            <td>{this.props.timeseg[5]}</td>
            {row[5]}
          </tr>
        </tbody>
      </table>
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
          <p>節目單</p>
        </div>
        <Table weekseg={this.state.weekseg} timeseg={this.state.timeseg} programs={this.state.programs}/>
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
