import React,{Component,Fragment} from 'react'
import './App.scss';
import { Button } from 'antd';

class Home extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Fragment>
        <h1>6666</h1>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
      </Fragment>
    )
  }
}
export default Home;
