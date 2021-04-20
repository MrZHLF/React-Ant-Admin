import React, { Component,Fragment } from 'react'

import PropTypes from 'prop-types'

import  { Table, Pagination,Row,Col,Button,message,Modal  } from 'antd'
import { TableList,TableDelete } from '@api/common'
import requestUrl from "@api/requestUrl"

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
        const {pageNumber, pageSize}=this.state
        const requestData = {
            url:requestUrl[this.props.config.url],
            method:this.props.config.method,
            data:{
                pageNumber,
                pageSize,
            }
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
        const { thead, checkbox,rowKey } = this.props.config
        const { loadingTable,total } = this.state
        const rowSelection = {
            onChange: this.onCheckebox
        }
        return (
            <Fragment>
                
                <Table pagination={false} loading={loadingTable} bordered rowKey={rowKey || "id"} rowSelection={checkbox ? rowSelection : null} columns={thead} dataSource={this.state.data} />
                <div className="spacing-30"></div>
                <Row>
                    <Col span={8}>
                        {this.props.batchButton && <Button onClick={() => this.onHandlerDelete()}>批量删除</Button>} 
                    </Col>
                    <Col span={16}>
                        <Pagination
                            onChange={this.onChangeCurrenPage}
                            onShowSizeChange={this.onChangeSizePage}
                            className="pull-right"
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row>
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
// 类型检测
TableComponent.propTypes = {
    config: PropTypes.object
}
// 默认值
TableComponent.defaultProps = {
    batchButton: false
}

export default TableComponent