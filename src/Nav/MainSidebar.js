import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainSidebar.css';
import NoteContext from '../NoteContext';

export default class MainSidebar extends Component {
  static contextType = NoteContext;

  folderButtons = folders => {
    var currentRouteName = window.location.href
      .split('http://localhost:3000/folder/')
      .pop();
    return (
      <ul className='sideNav'>
        {folders.map(folder => (
          <li
            key={folder.id}
            className={
              folder.id === currentRouteName ? 'foreground' : 'backgound'
            }
          >
            <Link to={'/folder/' + folder.id}>
              <button className='folderButton'>{folder.name}</button>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { folders } = this.context;
    return (
      <nav className='sideBar'>
        {this.folderButtons(folders)}
        <button className='addBtn' onClick={this.addFolder}>
          <a href='/add-folder'>Add Folder</a>
        </button>
        <button className='addBtn'>
          <a href='/add-note'>Add Note</a>
        </button>
      </nav>
    );
  }
}
