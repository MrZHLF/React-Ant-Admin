import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'


// 按钮权限校验 根据权限码匹备
const AuthButton = (props) => {
    const { button,role_button,children } = props
    return (
        role_button.includes(button) ? children : null
    )
}



// 校验数据类型
AuthButton.propTypes = {
    button: PropTypes.string,
}
// 默认
AuthButton.defaultProps = {
    button: "",
}


const mapStateToProps = (state) => ({
    role_button: state.app.button
})

export default connect(
    mapStateToProps,
    null
)(withRouter(AuthButton))