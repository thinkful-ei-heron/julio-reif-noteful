import React, { Component } from 'react';
import NoteContext from '../NoteContext';

export default class DeleteFolder extends Component {
  static contextType = NoteContext;
  handleDelete = e => {
    e.preventDefault();
    this.context.handleDeleteFolder(
      e,
      window.location.href.split('http://localhost:3000/folder/').pop()
    );
  };

  render() {
    return (
      <button
        className='delete-folder-button'
        onClick={e => this.handleDelete(e)}
      >
        Delete This Folder
      </button>
    );
  }
}
