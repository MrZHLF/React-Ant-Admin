import React, { Component,Fragment } from 'react'
import { message ,Select } from 'antd'

import requestUrl from "@api/requestUrl"
import {requestData} from '@api/common'

import FormCom from '@c/form/Index'
import { Add,Detailed } from '../../api/job'
const { Option } = Select;
export default class JobtAdd extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            id:this.props.location.state ? this.props.location.state.id : "",
            select:[],
            formConfig:{
                url:"jobAdd",
                editKey:"",
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
                    type:"Slot", 
                    label:"部门 ",
                    name:"parentId",
                    required:true,
                    slotName:"department",
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
        this.getSelectList()
    }
    getDerailed() {
        // 获取表单详情
        if(!this.props.location.state) {return false}
        Detailed({id:this.state.id}).then(response => {
            this.setState({
                formConfig:{
                    ...this.state.formConfig,
                    setFieldValue: response.data.data,
                    url: "jobEdit",
                    editKey:"jobId"
                }
            })
            // this.refs.form.setFieldsValue(response.data.data)
        })
    }
    onSubmit = (value) => {
        this.state.id ? this.onHandleEdit(value) : this.onHandleAdd(value)
        
    }

    // 接口
    getSelectList = () => {
        const data = {
            url:requestUrl["getDepartmentList"]
        }
        if (!data.url) {return false}
        requestData(data).then(response => {
            this.setState({
                select:response.data.data.data
            })
        })
    }

    // 添加信息
    onHandleAdd = (value) => {
        Add(value).then(response => {
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
        // Edit(requestData).then(response => {
        //     let data = response.data
        //     message.info(data.message)
        //     this.setState({
        //         loading:false
        //     })
        // }).catch(error=>{
        //     this.setState({
        //         loading:false
        //     })
        // })
    }
    render() {
        return (
            <Fragment>
                <FormCom formConfig={this.state.formConfig} formLayout={this.state.formLayout} formItem={this.state.formItem} >
                    {/* 插槽 */}
                    <Select ref="department">
                        {
                            this.state.select && this.state.select.map(elem => {
                                return <Option key={elem.id} value={elem.id}>{elem.name}</Option>
                            })
                        }
                    </Select>
                </FormCom>
            </Fragment>
        )
    }
}
