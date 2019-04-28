import React,
{ Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export class TimetableTable extends Component{
  renderHeader() {
    let rows = [<CustomTableCell></CustomTableCell>];
    let show_days = this.props.timetable.show_days;
    for(let i in show_days) {
      rows.push(<CustomTableCell>{this.props.localize.days[show_days[i]]}</CustomTableCell>);
    }
    return rows;
  }
  renderSegment(segment_name) {
    let rows = [<CustomTableCell>{segment_name}</CustomTableCell>];
    let show_days = this.props.timetable.show_days;
    let segment = this.props.timetable.segments[segment_name];
    for(let i in show_days) {
      rows.push(
        <CustomTableCell>
          <a href={segment[i].url} target="_blank">
            {segment[i].title}
          </a>
        </CustomTableCell>
      );
    }
    return rows;
  }
  render() {
    return(
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
    );
  }
}
