import React,{Component,Fragment} from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import User from '../../view/user/Index'
import UserAdd from '../../view/user/Add'
import PrivateRouter from './../privateRouter/index'
class ContainerMain extends Component {
  constructor() {
    super()
  }
  render() {
    return (
        <Switch>
            <PrivateRouter exact path="/index/user/list" component={User}  />
            <PrivateRouter exact path="/index/user/add" component={UserAdd}  />
        </Switch>
    )
  }
}
export default ContainerMain;
