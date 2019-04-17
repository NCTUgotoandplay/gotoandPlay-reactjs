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

export default class TimetableTable extends Component{
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
