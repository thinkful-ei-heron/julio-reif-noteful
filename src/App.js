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
import DeleteFolder from './Main/DeleteFolder';

export default class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  updateFolders = () => {
    fetch('http://localhost:9090/folders')
      .then(res => res.json())
      .then(data => this.setState({ folders: data }))
      .catch(e => console.log(e));
  };
  updatesNotes = () => {
    fetch('http://localhost:9090/notes')
      .then(res => res.json())
      .then(data => this.setState({ notes: data }))
      .catch(e => console.log(e));
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
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(this.updateFolders)
      .catch(e => console.alert(e));
  };

  handleAddNote = (name, content, folderId, modifiedDate) => {
    // console.log(name, content, folderId);
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: name,
        content: content,
        folderId: folderId,
        modified: modifiedDate,
      }),
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(this.updatesNotes)
      .catch(e => console.alert(e));
  };

  deleteNote = noteId => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
      .then(
        this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId),
        })
      )
      .then(console.log(this.state.notes))
      .catch(e => console.log(e));
  };

  deleteFolder = (e, folderId) => {
    e.preventDefault();
    fetch(`http://localhost:9090/folders/${folderId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
      .then(this.updateFolders)
      .catch(e => console.log(e));
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
          handleDeleteFolder: this.deleteFolder,
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
              path='/folder/:folderId'
              render={props => (
                <>
                  <NoteList folderId={props.match.params.folderId} />
                  <DeleteFolder />
                </>
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
