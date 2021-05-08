import React, { Component,Fragment } from 'react'
import { message,Row,Col,Radio ,DatePicker } from 'antd'

import requestUrl from "@api/requestUrl"
import {requestData} from '@api/common'

import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

import FormCom from '@c/form/Index'
import { Add,Detailed } from '../../api/job'
export default class StaffAdd extends Component {
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
                    status:""
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
                    type:"Column",
                    label:"个人信息",
                },
                {
                    type:"Input", 
                    label:"姓名",
                    name:"name",
                    required:true,
                    style:{
                        width:"200px"
                    },
                    placeholder:"请输入姓名"
                },
                {
                    type:"Radio", 
                    label:"性别",
                    name:"sex",
                    required:true,
                    options:[
                        {label:"男",value:true},
                        {label:"女",value:false}
                    ],
                },
                {
                    type:"Input", 
                    label:"身份证",
                    name:"card_id",
                    required:true,
                    style:{width:"200px"},
                    placeholder:"请输入身份证名"
                },
                {
                    type:"Date", 
                    label:"出生年月",
                    name:"birthday",
                    format:"YYYY/MM",
                    mode:"month",
                    required:true
                },
                {
                    type:"Input", 
                    label:"手机号",
                    name:"phone",
                    required:true,
                    style:{width:"200px"},
                    placeholder:"请输入11位数字的手机号"
                },
                {
                    type:"Select", 
                    label:"民族",
                    name:"nation",
                    required:true,
                    style:{width:"200px"},
                    options:[
                        {label:"汉族",value:"1"}
                    ],
                    placeholder:"请输选择民族"
                },
                {
                    type:"Select", 
                    label:"政治面貌",
                    name:"political",
                    required:true,
                    style:{width:"200px"},
                    options:[
                        {label:"党员",value:"1"},
                        {label:"团员",value:"2"}
                    ],
                    placeholder:"请输选择政治面貌"
                },
                {
                    type: "Input",
                    label: "毕业院校", 
                    name: "school",
                    required: true
                },
                {
                    type: "Select",
                    label: "学历", 
                    name: "education",
                    options:[
                        {label:"大专",value:"1"},
                        {label:"本科",value:"2"}
                    ],
                    required: true
                },
                { 
                    type: "Input",
                    label: "专业", 
                    name: "major",
                    required: true
                },
                { 
                    type: "Input",
                    label: "微信号", 
                    name: "wechat",
                    required: true
                },
                { 
                    type: "Input",
                    label: "邮箱", 
                    name: "email",
                    required: true
                },
                {
                    type:"Column",
                    label:"就职信息",
                },
                {
                    type:"Select", 
                    label:"职位",
                    name:"jobListAll",
                    required:true,
                    style:{width:"200px"},
                    options:[
                        {label:"党员",value:"1"},
                        {label:"团员",value:"2"}
                    ],
                    placeholder:"请输选择职位"
                },
                {
                    type:"Input", 
                    label:"公司邮箱",
                    name:"company_email",
                    required:true,
                    style:{width:"200px"},
                    placeholder:"请输入公司邮箱"
                },
                {
                    type:"Slot", 
                    label:"职位状态 ",
                    name:"parentId",
                    slotName:"jobStatus"
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
                    <div ref="jobStatus">
                        <Row gutter={16}>
                            <Col span={4}>
                                <Radio>在职</Radio>
                                <div className="spacing-15"></div>
                                <DatePicker locale={locale}  format="YYYY/MM/DD"/>
                            </Col>
                            <Col span={4}>
                                <Radio>休假</Radio>
                                <div className="spacing-15"></div>
                                <DatePicker locale={locale}  format="YYYY/MM/DD"/>
                            </Col>
                            <Col span={4}>
                                <Radio>离职</Radio>
                                <div className="spacing-15"></div>
                                <DatePicker locale={locale}  format="YYYY/MM/DD"/>
                            </Col>
                        </Row>
                    </div>
                </FormCom>
            </Fragment>
        )
    }
}
