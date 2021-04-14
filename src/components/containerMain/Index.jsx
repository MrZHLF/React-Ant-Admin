import React,{Component,Fragment} from 'react'
import components from './components.js'
import { BrowserRouter,Switch,Route } from 'react-router-dom'

import PrivateRouter from './../privateRouter/index'


class ContainerMain extends Component {
  constructor() {
    super()
  }
  render() {
    return (
        <Switch>
          {
            components.map(item => {
              return <PrivateRouter exact key={item.path} path={item.path} component={item.component}  />
            })
          }
        </Switch>
    )
  }
}
export default ContainerMain;
