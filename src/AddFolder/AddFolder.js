import React, { Component } from 'react';
import NoteContext from '../NoteContext';

export default class AddFolder extends Component {
  static contextType = NoteContext;

  handleClick = e => {
    e.preventDefault();
    let name = document.getElementById('folder-name').value;
    this.context.handleAddFolder(e, name);
  };

  render() {
    return (
      <>
        <form>
          <label htmlFor='folderName'>Enter Folder</label>
          <input
            type='text'
            id='folder-name'
            placeholder='Enter Folder Name'
            required
          />
          <button onClick={e => this.handleClick(e)}>Submit Folder</button>
        </form>
      </>
    );
  }
}
