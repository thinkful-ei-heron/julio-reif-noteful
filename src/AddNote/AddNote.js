import React, { Component } from 'react';
import NoteContext from '../NoteContext';

export default class AddNote extends Component {
  static contextType = NoteContext;
  handleClick = e => {
    e.preventDefault();
    let name = document.getElementById('note-name-input').value;
    let content = document.getElementById('note-content-input').value;
    let folderName = document.getElementById('note-folder-input').value;
    let folderId = this.context.folders.find(item => item.name === folderName)
      .id;
    this.context.handleAddNote(e, name, content, folderId);
  };
  render() {
    return (
      <>
        <form>
          <legend>New note info:</legend>
          <section id='note-name-container'>
            <label>Note Name: </label>
            <input type='text' id='note-name-input' />
          </section>

          <section id='note-content-container'>
            <label>Note Content: </label>
            <input type='text' id='note-content-input' />
          </section>

          <section id='note-folder-container'>
            <label>Folder name: </label>
            <input type='text' id='note-folder-input' />
          </section>
        </form>
        <button onClick={e => this.handleClick(e)}>Submit Note</button>
      </>
    );
  }
}
