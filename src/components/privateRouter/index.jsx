import React from 'react'
import { Redirect, Route } from 'react-router'
import {getToken} from './../../utils/session.js'
const PrivateRouter = ({component:Component,...rest}) => {
    return (
        <Route {...rest}
        render= {routeProps => (
            getToken() ?  <Component {...routeProps} /> : <Redirect to="/" />
        )} 
        />
    )
}

export default  PrivateRouter