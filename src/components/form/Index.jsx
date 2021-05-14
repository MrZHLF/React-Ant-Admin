import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {requestData} from '@api/common'
import requestUrl from "@api/requestUrl"

import SelectComponent from './../select/Index'
import UploadComponent from './../upload/Index'
import EditorComponent from './../editor/Index'

import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { Form,Input,Button, Select,InputNumber,Radio,message,DatePicker,Row,Col } from 'antd'
const { Option } = Select;



class FormCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesPreixr:{
                "Input": "请输入",
                "Editor": "请输入",
                "Radio": "请选择",
                "Date": "请选择",
                "Select": "请选择",
                "SelectComponent": "请选择",
                "Upload": "请上传"
            },
            loading:false
        }

        this.form = React.createRef()
    }

    componentWillReceiveProps({formConfig}) {
        this.form.current.setFieldsValue(formConfig.setFieldValue)
    }

    componentDidMount() {
        // 获取父组件
        this.props.onRef && this.props.onRef(this)
    }

    rules = (item) => {
        const { mesPreixr } = this.state;
        // 处理校验问题
        let rules= []
        if(item.required) {
            let message = item.message  || `${mesPreixr[item.type]}${item.label}`
            rules.push({required:true,message})
        }
        if(item.rules && item.rules.length > 0) {
            rules = rules.concat(item.rules)
        }
        return rules
    }

    validatorComponents= (rule,value) => {
        if (value) {
            return  Promise.resolve()
        }
        return Promise.reject("")
    }

    // 处理input
    inputElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Input style={item.style} placeholder={item.placeholder}/>
            </Form.Item>
        )
    }

    // 处理inputnumber
    inputNumberElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <InputNumber style={item.style} placeholder={item.placeholder} min={item.min} max={item.max}/>
            </Form.Item>
        )
    }

    // select
    selectElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Select style={item.style} placeholder={item.placeholder}>
                    {
                        item.options && item.options.map(elem => {
                            return <Option key={elem.value} value={elem.value}>{elem.label}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        )
    }

    
    // 单选
    radioElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <Radio.Group>
                    {
                        item.options && item.options.map(elem => {
                            return <Radio key={elem.value} value={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }

    // 日期组件
    dateElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                <DatePicker locale={locale}  format={item.format} picker={item.mode}/>
            </Form.Item>
        )
    }

    // select组件
    SelectComponent = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules,{validator:this.validatorComponents}]}>
                <SelectComponent url={item.url} propsKey={item.propsKey} name={item.name}/>
            </Form.Item>
        )
    }



    // 上传
    uploadElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules,{validator:this.validatorComponents}]}>
                <UploadComponent name={item.name} request={item.request} initValue={this.props.formConfig.setFieldValue}></UploadComponent>
            </Form.Item>
        )
    }

    // 富文本编辑器
    editorElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={[...rules,{validator:this.validatorSelect}]}>
                <EditorComponent name={item.name} initValue={this.props.formConfig.setFieldValue}></EditorComponent>
            </Form.Item>
        )
    }

    // 插槽
    slotElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Form.Item label={item.label} name={item.name} key={item.name} rules={rules}>
                {/* { this.props.children ? this.props.children.filter(elem => elem.ref == item.slotName)[0] : '' } */}
                {/* 判断传递过来的是否是数组或者对象 */}

                {
                    this.props.children && Array.isArray(this.props.children) ? this.props.children.filter(elem => elem.ref == item.slotName)[0] : this.props.children
                }

            </Form.Item>
        )
    }

    // 栏目
    columnElem = (item) => {
        const rules =  this.rules(item)
        return (
            <Row>
                <Col span={2} className=""></Col>
                <Col span={22}></Col>
            </Row>
        )
    }

    // 内联的控件
    formItemInlineElem = (item) => {
        // const rules = this.rules(item);
        return (
            <Row>
                <Col span={item.col_label} className="ant-form-item" style={{textAlign: "right"}}>
                    <div className="ant-form-item-label">
                        <label for="name" className="ant-form-item-required" title="姓名">{item.label}</label>
                    </div>
                </Col>
                <Col span={item.col_control}>
                    <Row>
                        {
                            item.inline_item.map(elem => {
                                return (
                                    <Col span={elem.col} className="form-item-inline-control">{ this.createControl(elem)}</Col>
                                )
                            })
                        }
                        
                    </Row>
                </Col>
            </Row>
        )
    }

    // 初始化
    initFormItem = () => {
        const { formItem } = this.props
        if (!formItem || (formItem && formItem.length === 0)) { return false; }
        //第一种
        // const formList = [];
        // formItem.forEach(item => {
        //     if (item.type === 'Input') {formList.push(this.inputElem(item)) }
        // })
        // return formList

        // 第二种
        let formList =  formItem.map(item => {
            return this.createControl(item)
        })
        return formList
    }
    // 创建表单控件
    createControl = (item) => {
        if(item.type === "Input") { return this.inputElem(item); }
        if(item.type === "Select") { return this.selectElem(item); }
        if(item.type === "SelectComponent") { return this.SelectComponent(item); }
        if(item.type === "InputNumber") { return this.inputNumberElem(item); }
        if(item.type === "Radio") { return this.radioElem(item); }
        if(item.type === "Slot") { return this.slotElem(item); }
        if(item.type === "Column") { return this.columnElem(item); }
        if(item.type === "Date") { return this.dateElem(item); }
        if(item.type === "Upload") { return this.uploadElem(item); }
        if(item.type === "Editor") { return this.editorElem(item); }
        if(item.type === "FormItemInline") { return this.formItemInlineElem(item); }
    }

    formatData = (value) => {
        const requestData = JSON.parse(JSON.stringify(value))
        // 需要格式化的 JSON对象的key
        const { formatFormKey, editKey, setFieldValue } = this.props.formConfig;
        const keyValue = requestData[formatFormKey]
        // 如果是json对象
        if (Object.prototype.toString.call(keyValue) === "[object Object]") {
            requestData[formatFormKey] = keyValue[formatFormKey]
        }
        // 判断是否存在编辑知道id
        if (editKey) {
            requestData[editKey] = setFieldValue[editKey]
        }
        return requestData
    }

    onSubmit = (value) => {
        // 添加 
        if (this.props.submit) {
            this.props.submit(value)
            return false
        }
        this.setState({
            loading:true
        })

        // 数据格式化
        let paramsData = this.formatData(value)

        const data = {
            url: requestUrl[this.props.formConfig.url],
            data: paramsData
        }
        requestData(data).then(response => {
            let data = response.data
            message.info(data.message)
            this.setState({
                loading:false
            })
            // 清除表单
            this.onReset()
        }).catch(error => {
            this.setState({
                loading:false
            })
        })
    }
    onReset = () => {
        // 清空表单
        this.form.current.resetFields()
    }

    render() {
        const { submitButton,formLayout } = this.props
        return (
            <Form 
                ref={this.form}
                {...this.props.formLayout}
                onFinish={this.onSubmit}
                initialValues={this.props.formConfig.initValue}
            >
                {this.initFormItem()}

                <Row>
                    <Col span={formLayout.labelCol.span}></Col>
                    <Col span={formLayout.wrapperCol.span}>
                        {
                            submitButton ? <Button loading={this.state.loading} type="primary" htmlType="submit">添加</Button> : ""
                        }
                    </Col>
                </Row>
            </Form>
        )
    }
}


// 类型检测
FormCom.propTypes = {
    formConfig: PropTypes.object,
    submitButton:PropTypes.bool
}
// 默认值
FormCom.defaultProps = {
    formConfig: {},
    submitButton:true
}
export default FormCom