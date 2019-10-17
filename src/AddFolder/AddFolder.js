import React, { Component } from 'react';
import NoteContext from '../NoteContext';

export default class AddFolder extends Component {
  constructor() {
    super();
    this.state = {
      folderName: '',
      touched: false,
    };
  }
  static contextType = NoteContext;

  validateName() {
    if (!this.state.folderName && this.state.touched) {
      return 'New Folder Must Have a Name';
    }
  }
  setFolder(value) {
    this.setState({
      folderName: value,
      touched: true,
    });
  }
  handleClick = e => {
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
            value={this.state.folderName}
            onChange={e => this.setFolder(e.target.value)}
            required
          />
          <input
            type='submit'
            disabled={this.validateName() || !this.state.touched}
            onClick={e => {
              this.handleClick(e);
            }}
            value='Submit Folder'
          />
          <p className='error'> {this.validateName()}</p>
        </form>
      </>
    );
  }
}
