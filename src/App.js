import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import socketClient  from "socket.io-client";
import Login from './pages/login/Login';
import Chat from './pages/chat/Chat';
const SERVER = "http://127.0.0.1:8000";

function App() {
  var socket = socketClient (SERVER);

  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  
  return (
    <Router>
      <div class="App">
      <Route exact path="/">
        <Login/>
      </Route>
      <Route exact path="/chat">
        <Chat/>
      </Route>
      </div>


    </Router>
  );
}

export default App;
