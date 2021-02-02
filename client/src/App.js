import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { AuthProvider } from './Context/auth'
import AuthRoute from './util/authRoute'

import MenuBar from './Components/MenuBar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SinglePost from './Pages/SinglePost'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
        <MenuBar />
        <Route exact path='/' component={Home} />
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/register' component={Register} />
        <Route exact path='/posts/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;