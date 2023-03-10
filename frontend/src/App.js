import { useEffect } from 'react'
//import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';

import Login from './components/user/Login';


import { loadUser } from './actions/userActions'
import store from './store'
import NoticeDetails from './components/notice/NoticeDetails';
import CreateNotice from './components/notice/CreateNotice';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/notice/:id" component={NoticeDetails} exact />
          <Route path="/login" component={Login} />
          <Route path="/create-notice" component={CreateNotice} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;