import React from 'react';
import Cards from './Cards'
import Decks from './Decks'

import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

class AlbumsManagement extends React.Component {

  render () {
    let columns = [
        { title: this.props.localize.header_Albums+' '+this.props.localize.name, field: 'name' },
        { title: this.props.localize.description, field: 'description' },
        { title: this.props.localize.songs, field: 'songs', type: 'numeric',
          editComponent: props => (
              null
            )
       },
      ];

    let data =
      [
        {name: 'DOOM', description: 'BFG division', songs: 5, songs_detail: {}}
      ];
    return (
      <div className="albums-management-page" style={this.props.dark_theme?{'color': 'white', 'background': 'repeating-linear-gradient(45deg, rgba(35, 47, 52, 0.8), rgba(35, 47, 52, 0.8) 10px, rgba(47, 55, 58, 0.8) 10px, rgba(47, 55, 58, 0.8) 20px)'}:{'color': '#232f34', 'background': 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6) 10px, rgba(235, 248, 253, 0.69) 10px, rgba(235, 249, 255, 0.69) 20px)'}}>
        <h1>{this.props.localize.header_Albums+' '+this.props.localize.settings}</h1>
        <Link to="/admin"><Button color="primary" variant="outlined">{this.props.localize.go+' '+this.props.localize.settings}</Button></Link>
        <h2>{this.props.localize.all+' '+this.props.localize.header_Albums}</h2>
        <MaterialTable
          title={this.props.localize.all+' '+this.props.localize.header_Albums}
          columns={columns}
          data={data}
          detailPanel={[
            {
              tooltip: this.props.localize.all+' '+this.props.localize.songs,
              render: rowData => {
                console.log(rowData.songs_detail);
                return (
                  <MaterialTable
                    title={this.props.localize.all+' '+this.props.localize.songs+'('+rowData.name+')'}
                  >
                  </MaterialTable>
                )
              },
            },
          ]}
          editable={{
            onRowAdd: newData => {

            },
            onRowDelete: newData => {

            },
            onRowUpdate: newData => {

            },
          }}
        />
        <h2>{this.props.localize.highlighted_albums}</h2>
        <Button color="primary" variant="outlined">{this.props.localize.add_item}</Button>
        <h2>{this.props.localize.album_collections}</h2>
        <Button color="primary" variant="outlined">{this.props.localize.add_item}</Button>
      </div>
    );
  }
}

export default AlbumsManagement;
