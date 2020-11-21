import React from 'react'
import { Route ,Switch} from "react-router-dom"
import Home from '../Component/Home'
import Main from '../Component/Main'
import Description from '../Component/Description'

function Routing () {
    return (
        <div>
            <Switch>
                <Route path='/' exact render={() => <Home />}></Route>
                <Route path='/main' exact render={() => <Main />}></Route>
                <Route path ='/main/:name' render = {(props) => <Description {...props}/>} > </Route>
            </Switch>
        </div>
    )
}

export default Routing