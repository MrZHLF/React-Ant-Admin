import React, { Component,Fragment } from 'react'
import { message  } from 'antd'

import { DepartmentAddApi,Detailed,Edit } from '../../api/department'

import FormCom from '@c/form/Index'
export default class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            id:"",
            formConfig:{
                url:"jobAdd",
                initValue:{
                    number:0,
                    status:true
                },
                setFieldValue:{},
                formatFormKey:"parentId"
            },
            formLayout:{
                labelCol:{span:2  },
                wrapperCol:{span:22 },
            },
            formItem:[
                {
                    type:"SelectComponent", 
                    label:"部门 ",
                    name:"parentId",
                    required:true,
                    url:"getDepartmentList",
                    propsKey:{
                        value:"id",
                        label:"name"
                    },
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入部门"
                },
                {
                    type:"Input", 
                    label:"职位名称",
                    name:"jobName",
                    required:true,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入职位名称"
                },
                {
                    type:"Radio", 
                    label:"禁启用",
                    name:"status",
                    required:true,
                    options:[
                        {label:"禁用",value:false},
                        {label:"启用",value:true}
                    ],
                },
                {
                    type:"Input", 
                    label:"描述",
                    name:"content",
                    required:true,
                    placeholder:"请输入描述内容"
                }
            ]
        }
    }
    componentWillMount(){
        if (this.props.location.state) {
            this.setState({
                id:this.props.location.state.id
            })
        }
    }
    componentDidMount() {
        this.getDerailed()
    }
    getDerailed() {
        // 获取表单详情
        if(!this.props.location.state) {return false}
        Detailed({id:this.state.id}).then(response => {
            console.log(response)
            this.setState({
                formConfig:{
                    ...this.state.formConfig,
                    setFieldValue:response.data.data
                }
            })
            // this.refs.form.setFieldsValue(response.data.data)
        })
    }
    onSubmit = (value) => {
        this.state.id ? this.onHandleEdit(value) : this.onHandleAdd(value)
        
    }

    // 添加信息
    onHandleAdd = (value) => {
        DepartmentAddApi(value).then(response => {
            console.log(response,'response')
            let data = response.data
            message.info(data.message)
            this.setState({
                loading:false
            })
            // 重置表单
            this.refs.form.resetFields()
        }).catch(error=>{
            this.setState({
                loading:false
            })
        })
    }
    // 编辑信息
    onHandleEdit = (value) => {
        const requestData = value
        requestData.id = this.state.id
        Edit(requestData).then(response => {
            let data = response.data
            message.info(data.message)
            this.setState({
                loading:false
            })
        }).catch(error=>{
            this.setState({
                loading:false
            })
        })
    }
    render() {
        return (
            <Fragment>
                <FormCom formConfig={this.state.formConfig} formLayout={this.state.formLayout} formItem={this.state.formItem} ></FormCom>
            </Fragment>
        )
    }
}
