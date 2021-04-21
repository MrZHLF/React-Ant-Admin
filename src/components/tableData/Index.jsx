import React, { Component,Fragment } from 'react'


import  {Form, Input, Button,message,Modal  } from 'antd'
import { TableList,TableDelete } from '@api/common'
import requestUrl from "@api/requestUrl"

import TableBasis from './Table'

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            keyWork:"",
            pageNumber:1,
            pageSize:10,
            loadingTable:false,
            total:0,
            // 模态框
            modalVisible:false,
            confirmLoading:false,
            checkboxValue:[]
        }
    }
    // 生命周期挂载完成
    componentDidMount(){
        this.loadData()
        // 返回子组件实例
        this.props.onRef(this)
    }
    loadData =() =>{
        const {pageNumber, pageSize,keyWork}=this.state
        const requestData = {
            url:requestUrl[this.props.config.url],
            method:this.props.config.method,
            data:{
                pageNumber,
                pageSize
            }
        }
        // 搜索参数
        if (keyWork) {
            requestData.data.name = keyWork
        }
        this.setState({loadingTable:true})
        TableList(requestData).then(response => {
            const responseData = response.data.data
            console.log(responseData)
            if(responseData.data) {
                this.setState({
                    data:responseData.data,
                    total:responseData.total,
                    loadingTable:false
                })
            }
        }).catch(error=> {
            this.setState({
                loadingTable:false
            })
        })
    }

    
    // 当前页吗
    onChangeCurrenPage = (value) => {
        this.setState({
            pageNumber:value
        },() =>{
            this.loadData()
        })
        
    } 

    
    // 下拉页面
    onChangeSizePage = (value,page) => {
        this.setState({
            pageNumber:1,
            pageSize:page
        },() =>{
            this.loadData()
        })
    }

    // 复选框
    onCheckebox = (checkboxValue) => {
        this.setState({
            checkboxValue
        })
    }


    // 删除
    onHandlerDelete(id){
        this.setState({
            modalVisible:true,
        })
        if (id) {
            this.setState({
                checkboxValue:[id]
            })
        }
    }

    // 搜索
    onFinish = (value) => {
        this.setState({
            keyWork:value.name,
            pageNumber:1,
            pageSize:10
        })
        this.loadData()
    }

    // 弹窗
    modalThen = () => {
        if(this.state.checkboxValue.length ==0) {
            message.info('请选择需要删除的数据!!')
            return false;
        }
        this.setState({
            confirmLoading:true
        })
        let id = this.state.checkboxValue.join()
        let requestData = {
            url:requestUrl[`${this.props.config.url}Delete`],
            data:{
                id
            }
        }
        TableDelete(requestData).then(response => {
            message.info(response.data.message)
            this.setState({
                id:"",
                modalVisible:false,
                confirmLoading:false,
                selectedRowKeys:[]
            })
            this.loadData()
        })
    }

    render() {
        const { thead, checkbox,rowkey } = this.props.config
        const rowSelection = {
            onChange: this.onCheckebox
        }
        return (
            <Fragment>
                <Form 
                    onFinish={this.onFinish}
                    layout="inline">
                    <Form.Item label="部门名称" name="name">
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>
                <div className="table-wrap">
                    <TableBasis 
                        columns={thead} 
                        dataSource={this.state.data}
                        total={this.state.total}
                        changePageCurrent={this.onChangeCurrenPage}
                        changePageSize={this.onChangeSizePage}
                        handlerDelete={() => this.onHandlerDelete()}
                        rowSelection={checkbox ? rowSelection : null}
                        rowkey={rowkey}
                    >
                    </TableBasis>
                </div>
            
                {/* 弹窗 */}
                <Modal
                    title="提示"
                    visible={this.state.modalVisible}
                    onOk={this.modalThen}
                    onCancel={() => {this.setState({modalVisible:false})}}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.confirmLoading}
                >
                    <p className="text-center">确定删除此信息？<b className="color-red">删除后无法恢复</b></p>
                </Modal>
            </Fragment>
        )
    }
}

export default TableComponent