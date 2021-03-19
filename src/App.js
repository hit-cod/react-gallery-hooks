import s from './App.module.css';

import PhotosView from './components/PhotosView/PhotosView';

import { Component } from 'react';

class App extends Component {
  
  render() {
    return (
      <div className={s.App}>
        <PhotosView />
      </div>
    );
  }
}

export default App;