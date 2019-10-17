import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './reset.css';
import './App.css';

import MainSidebar from './Nav/MainSidebar';
import NoteSidebar from './Nav/NoteSidebar';
import NoteView from './Note/NoteView';
import NoteList from './Main/NoteList';
import NoteContext from './NoteContext';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';

export default class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  updateFolders = () => {
    fetch('http://localhost:9090/folders')
      .then(res => res.json())
      .then(data => this.setState({ folders: data }));
  };
  updatesNotes = () => {
    fetch('http://localhost:9090/notes')
      .then(res => res.json())
      .then(data => this.setState({ notes: data }));
  };

  componentDidMount() {
    this.updateFolders();
    this.updatesNotes();
  }

  handleAddFolder = (e, name) => {
    e.preventDefault();
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: name }),
    }).then(this.updateFolders);
  };

  handleAddNote = (e, name, content, folderId, modifiedDate) => {
    e.preventDefault();
    console.log(name, content, folderId);
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: name,
        content: content,
        folderId: folderId,
        modified: modifiedDate,
      }),
    }).then(this.updatesNotes);
  };

  deleteNote = (noteId, e) => {
    e.preventDefault();
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
      .then(
        this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId),
        })
      )
      .then(console.log(this.state.notes));
  };

  render() {
    return (
      <NoteContext.Provider
        value={{
          folders: this.state.folders,
          notes: this.state.notes,
          deleteNote: this.deleteNote,
          handleAddFolder: this.handleAddFolder,
          handleAddNote: this.handleAddNote,
        }}
      >
        <header className='header'>
          <Link to='/'>
            <h1>Noteful</h1>
          </Link>
        </header>
        <main>
          <Switch>
            <Route
              path='/note'
              render={props => (
                <NoteSidebar goBackEvent={e => props.history.goBack()} />
              )}
            />

            <Route path='/' component={() => <MainSidebar />} />
          </Switch>

          <section className='mainSection'>
            <Route exact path='/' component={() => <NoteList />} />

            <Route
              exact
              path='/:folderId'
              render={props => (
                <NoteList folderId={props.match.params.folderId} />
              )}
            />

            <Route
              exact
              path='/note/:noteId'
              render={props => <NoteView noteId={props.match.params.noteId} />}
            />
            <Route exact path='/add-folder' render={() => <AddFolder />} />
            <Route exact path='/add-note' render={() => <AddNote />} />
          </section>
        </main>
      </NoteContext.Provider>
    );
  }
}
