import React,{Component,Fragment} from 'react'
import './App.scss';
import { BrowserRouter,Switch,Route } from 'react-router-dom'

import Login from './view/login/Index'

class Home extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact component={Login} path="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default Home;
