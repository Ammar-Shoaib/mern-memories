import React from 'react'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

const App = () => {

    return (
        <Router>
            <Container max-width="lg">
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/auth' component={Auth} />
                </Switch>
            </Container>
        </Router>
    )
}

export default App