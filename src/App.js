import React,{Component,Fragment} from 'react'
import './App.scss';
import { BrowserRouter,Switch,Route } from 'react-router-dom'

import Login from './view/login/Index'
import Index from './view/index/Index'
// 私有组件
import PrivateRouter from './components/privateRouter/index'
class Home extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact render={() => <Login/> } path="/" />
          <PrivateRouter  component={Index} path="/index" />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default Home;
