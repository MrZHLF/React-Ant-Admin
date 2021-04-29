import React from 'react'
import { Redirect, Route } from 'react-router'
import {getToken} from './../../utils/cookies'
const PrivateRouter = ({component:Component,...rest}) => {
    console.log(rest,'rest')
    return (
        <Route {...rest}
        render= {routeProps => (
            getToken() ?  <Component {...routeProps} /> : <Redirect to="/" />
        )} 
        />
    )
}

export default  PrivateRouter