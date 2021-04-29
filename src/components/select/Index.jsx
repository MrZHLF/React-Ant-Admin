import React, { Component } from 'react'
import PropTypes from 'prop-types'

import requestUrl from "@api/requestUrl"
import {requestData} from '@api/common'

import {  Select } from 'antd'
const { Option } = Select;

class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props:props.propsKey,
            options:[],
            value:""
        }
    }

    componentDidMount() {
        this.getSelectList()
    }

    // 接口
    getSelectList = () => {
        let url = this.props.url;
        const data = {
            url:requestUrl[url],
            data:{}
        }
        if (!data.url) {return false}
        requestData(data).then(response => {
            this.setState({
                options:response.data.data.data
            })
        })
    }
    onChange =() => {
        
    }



    render() {
        const { value,label } = this.state.props;
        return (
            <Select value={this.state.value} onChange={this.onChange}>
                {
                    this.state.options && this.state.options.map(elem => {
                        return <Option key={Number(elem[value])} value={elem[value]}>{elem[label]}</Option>
                    })
                }
            </Select>
        )
    }
}


export default SelectComponent