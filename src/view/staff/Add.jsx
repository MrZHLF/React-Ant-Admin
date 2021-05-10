import React, { Component,Fragment } from 'react'
import { message,Row,Col,Radio ,DatePicker } from 'antd'

import requestUrl from "@api/requestUrl"
import {requestData,Upload} from '@api/common'

import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

import FormCom from '@c/form/Index'
import { Add,Detailed } from '../../api/job'

import { nation,face,education } from '@/js/data'
import { validate_phone } from '@/utils/validate'

import { Editor } from '@tinymce/tinymce-react'

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
                    slotName:"jobStatus",
                    style:{width:"200px"},
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

    // 获取富文本内容

    handleEditorChange = (value) => {
        console.log(value)
    }

    render() {
        const editorObj = {
            height: '800px',
            language: 'zh_CN',
            plugins: 'table lists link image preview code',
            toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
            link image | alignleft aligncenter alignright alignjustify  | 
            numlist bullist outdent indent`,
            relative_urls: false,
            file_picker_types: 'image',
            images_upload_url: 'http',
            image_advtab: true,
            image_uploadtab: true,
            images_upload_handler: (blobInfo, success, failure)=>{
                var formData;
                var file = blobInfo.blob(); //转化为易于理解的file对象
                formData = new FormData();
                formData.append('file', file, file.name);//此处与源文档不一样
                Upload(formData).then(response => {
                    const data = response.data.data.url;
                    success(data);
                }).catch(error => {
                    const data = error.data;
                    failure(data.message);
                })
            }
        }
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
                <Editor
                    inline={false}
                    selector="editorStateRef"
                    apiKey=""
                    initialValue={"62626"}
                    init={{...editorObj}} //初始化配置
                    onEditorChange={this.handleEditorChange}
                >
                    
                </Editor>
            </Fragment>
        )
    }
}
