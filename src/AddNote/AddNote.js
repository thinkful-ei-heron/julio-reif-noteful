import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import { Link } from 'react-router-dom';

export default class AddNote extends Component {
  constructor() {
    super();
    this.state = {
      name: { value: '', touched: false },
      content: { value: '', touched: false },
      folderName: { value: '', touched: false },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateNoteContent = this.validateNoteContent.bind(this);
    this.validateNoteName = this.validateNoteName.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  static contextType = NoteContext;

  handleInputChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: { value: value, touched: true },
    });
  }

  validateNoteName() {
    if (!this.state.name && this.state.touched) {
      return false;
    }
  }
  validateNoteContent() {
    if (!this.state.content && this.state.touched) {
      return false;
    }
  }

  handleClick = () => {
    let folderId = document.getElementById('folder-name-select').value;
    console.log(folderId);
    if (!this.canBeSubmitted()) {
      return null;
    } else if (folderId !== 'Pick a Folder') {
      let name = document.getElementById('note-name-input').value;
      let content = document.getElementById('note-content-input').value;
      let folderId = document.getElementById('folder-name-select').value;
      let date = Date.now();
      this.validateNoteContent();
      this.validateNoteName();
      this.context.handleAddNote(name, content, folderId, date);
    }
  };

  canBeSubmitted() {
    return (
      this.state.name.value.length > 0 && this.state.content.value.length > 0
    );
  }

  render() {
    return (
      <>
        <form>
          <legend>New note info:</legend>
          <section id='note-name-container'>
            <label>Note Name: </label>
            <input
              type='text'
              id='note-name-input'
              placeholder='Enter Note Name'
              onChange={e => this.handleInputChange(e)}
              name='name'
              required
            />
          </section>

          <section id='note-content-container'>
            <label>Note Content: </label>
            <input
              type='text'
              id='note-content-input'
              placeholder='Enter Note content'
              onChange={e => this.handleInputChange(e)}
              required
              name='content'
            />
          </section>
          <select
            id='folder-name-select'
            name='folderName'
            onChange={e => this.handleInputChange(e)}
            required
          >
            <option>Pick a Folder</option>
            {this.context.folders.map(folder => {
              return (
                <option name={folder.name} key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              );
            })}
          </select>
        </form>

        <button
          onClick={() => {
            this.handleClick();
          }}
        >
          Submit Note
        </button>
      </>
    );
  }
}
