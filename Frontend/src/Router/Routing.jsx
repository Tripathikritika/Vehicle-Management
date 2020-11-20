import React from 'react'
import { Route ,Switch} from "react-router-dom"
import Home from '../Component/Home'
import Main from '../Component/Main'

function Routing () {
    return (
        <div>
            <Switch>
                <Route path='/' exact render={() => <Home />}></Route>
                <Route path='/main' exact render={() => <Main />}></Route>
            </Switch>
        </div>
    )
}

export default Routing