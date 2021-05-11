import React, { Component,Fragment } from 'react'
import { message } from 'antd'

import requestUrl from "@api/requestUrl"
import {requestData} from '@api/common'

// import 'moment/locale/zh-cn';
// import locale from 'antd/es/date-picker/locale/zh_CN';

import FormCom from '@c/form/Index'
import { Add,Detailed } from '../../api/staff'

import { nation,face,education } from '@/js/data'
import { validate_phone } from '@/utils/validate'


export default class StaffAdd extends Component {
    constructor(props) {
        super(props);
        this.state={
            // job_status: "", //职位状态
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
                    style:{
                        width:"200px"
                    },
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
                    type: "Upload",
                    label: "头像", 
                    request: true,
                    required: true,
                    name: "face_img", 
                    message: "请上传头像"
                },
                {
                    type:"Date", 
                    label:"出生年月",
                    name:"birthday",
                    format:"YYYY/MM",
                    style:{
                        width:"200px"
                    },
                    mode:"month",
                    required:true
                },
                {
                    type:"Input", 
                    label:"手机号",
                    name:"phone",
                    required:true,
                    style:{width:"200px"},
                    placeholder:"请输入11位数字的手机号",
                    rules:[ //自定义校验
                        ()=>({
                            validator(rule,value) {
                                // let regPhone = /^1[3456789]\d{9}$/;
                                if (validate_phone(value)) {
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject('手机号码有误')
                                }
                            }
                        })
                    ]
                },
                {
                    type:"Select", 
                    label:"民族",
                    name:"nation",
                    required:true,
                    style:{width:"200px"},
                    options:nation,
                    placeholder:"请输选择民族"
                },
                {
                    type:"Select", 
                    label:"政治面貌",
                    name:"political",
                    required:true,
                    style:{width:"200px"},
                    options:face,
                    placeholder:"请输选择政治面貌"
                },
                {
                    type: "Input",
                    label: "毕业院校", 
                    name: "school",
                    required: true,
                    style:{width:"200px"},
                },
                {
                    type: "Select",
                    label: "学历", 
                    name: "education",
                    options:education,
                    required: true,
                    style:{width:"200px"},
                },
                { 
                    type: "Input",
                    label: "专业", 
                    name: "major",
                    required: true,
                    style:{width:"200px"},
                },
                { 
                    type: "Upload",
                    label: "毕业证", 
                    name: "diploma_img", 
                    required: true,
                    message: "请上传毕业证"
                },
                { 
                    type: "Input",
                    label: "微信号", 
                    name: "wechat",
                    required: true,
                    style:{width:"200px"},
                },
                { 
                    type: "Input",
                    label: "邮箱", 
                    name: "email",
                    required: true,
                    style:{width:"200px"},
                },
                {
                    type:"Column",
                    label:"就职信息",
                },
                { 
                    type: "SelectComponent",
                    label: "部门", 
                    url: "getDepartmentList",
                    name: "departmen_id",
                    propsKey: {
                        label: "name",
                        value: "id"
                    },
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请选择部门"
                },
                { 
                    type: "SelectComponent",
                    label: "职位", 
                    url: "jobListAll",
                    name: "job_id",
                    propsKey: {
                        label: "jobName",
                        value: "jobId"
                    },
                    required: true,
                    style: { width: "200px" },
                    placeholder: "请选择邮箱"
                },
                {
                    type: "FormItemInline",
                    label: "职员状态", 
                    name: "name", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入姓名",
                    col_label: 2,
                    col_control: 22,
                    inline_item: [
                        { 
                            type: "Date",
                            label: "入职时间", 
                            name: "job_entry_date", 
                            required: true, 
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 3
                        },
                        { 
                            type: "Date",
                            label: "转正时间", 
                            name: "job_formal_date", 
                            required: true, 
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 3
                        },
                        { 
                            type: "Date",
                            label: "离职时间", 
                            name: "job_quit_date", 
                            required: true, 
                            style: { width: "100%" },
                            placeholder: "请输入姓名",
                            col: 3
                        }
                    ]
                },
                // {
                //     type:"Slot", 
                //     label:"职位状态 ",
                //     name:"parentId",
                //     slotName:"jobStatus",
                //     style:{width:"200px"},
                // },
                {
                    type:"Input", 
                    label:"公司邮箱",
                    name:"company_email",
                    required:true,
                    style:{width:"200px"},
                    placeholder:"请输入公司邮箱"
                },
                {
                    type:"Editor", 
                    label: "描述", 
                    name: "introduce", 
                    required: true, 
                    placeholder: "请输入描述内容"
                },
                { 
                    type: "Radio",
                    label: "禁启用", 
                    name: "status", 
                    required: true,
                    options: [
                        { label: "禁用", value: false },
                        { label: "启用", value: true },
                    ]
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
    }

    // onChange = (e) => {
    //     this.setState({
    //         job_status:e.target.value
    //     })
    // }
    render() {
        
        return (
            <Fragment>
                <FormCom formConfig={this.state.formConfig} formLayout={this.state.formLayout} formItem={this.state.formItem} submit={this.onSubmit}>
                    {/* 插槽 */}
                    {/* <div ref="jobStatus">
                        <Radio.Group onChange={this.onChange} value={this.state.job_status}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Radio value={'online'}>在职</Radio>
                                    <div className="spacing-15"></div>
                                    <DatePicker locale={locale}  format="YYYY/MM/DD"/>
                                </Col>
                                <Col span={8}>
                                    <Radio value={'vacation'}>休假</Radio>
                                    <div className="spacing-15"></div>
                                    <DatePicker locale={locale}  format="YYYY/MM/DD"/>
                                </Col>
                                <Col span={8}>
                                    <Radio value={'quit'}>离职</Radio>
                                    <div className="spacing-15"></div>
                                    <DatePicker locale={locale}  format="YYYY/MM/DD"/>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </div> */}
                </FormCom>
            </Fragment>
        )
    }
}
