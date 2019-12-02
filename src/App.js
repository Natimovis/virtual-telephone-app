import React from "react";
import './App.css';
import './Normalize.css';
import NavBar from "./components/home/NavBar";
import { useAuth0 } from "./authentication/react-auth0-spa"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SoftPhone3 from "./components/softphone/SoftPhone3";
import AddContact from "./components/contacts/AddContact";
import ViewContacts from "./components/contacts/ViewContacts";
import EditContact from "./components/contacts/EditContact";
import Notes from "./components/notes/Notes";
import Profile from "./components/profile/Profile";
import PrivateRoute from "./authentication/PrivateRoute";
import Home from "./components/home/Home";
import Note from './components/notes/Note';
import AddNote from './components/notes/AddNote';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  


  return (
    <div className="App">
           <BrowserRouter>
        <header className="header">
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/softphone" exact component={SoftPhone3} />
          <PrivateRoute path="/softphone/addcontact" component={AddContact} />
          <PrivateRoute path="/softphone/contacts" component={ViewContacts} />
          <PrivateRoute path="/contact/:contact_id" component={EditContact} />
          <PrivateRoute path="/notes" exact component={Notes} />
          <PrivateRoute path="/notes/newnote" component={AddNote} />
          <PrivateRoute path='/notes/:contact_id' component={Note}/>
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

