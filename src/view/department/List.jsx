import React, { Component,Fragment } from 'react'
import { Link } from 'react-router-dom'
import  { Form, Input, Button,Table,Switch, message,Modal } from 'antd'
import { GetList,Delete,Status } from '@api/department'
class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                {title:"部门名称",dataIndex:"name",key:"name"},
                {
                    title:"禁启用",
                    dataIndex:"status",
                    key:"status",
                    render:(text,rowData)  => {
                        return <Switch onChange={() => this.onHandlerSwitch(rowData)} loading={rowData.id == this.state.switchId} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
                    }
                },
                {title:"人员数量",dataIndex:"number",key:"number"},
                {
                    title:"操作",
                    dataIndex:"opeartion",
                    key:"opeartion",
                    width: 215,
                    render:(text,rowData)=> {
                        return (
                            <div className="inline-button">
                                <Button type="primary">
                                    <Link to={{pathname:'/index/department/add',state:{id:rowData.id}}}>编辑</Link>
                                </Button>
                                <Button onClick={()=>this.onHandlerDelete(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            data:[],
            pageNumber:1,
            pageSize:10,
            keyWork:"",
            selectedRowKeys:[],
            // 模态框
            visible:false,
            confirmLoading:false,
            id:"",
            switchId:"", //切换
            loadingTable:false,//表格的加载
        }
    }
    // 生命周期挂载完成
    componentDidMount(){
        this.loadData()
    }
    loadData =() =>{
        const {pageNumber, pageSize, keyWork}=this.state
        this.setState({loadingTable:true})
        const requestData = {
            pageNumber,
            pageSize,
        }
        if (keyWork) {
            requestData.name = keyWork
        }
        
        GetList(requestData).then(response => {
            const responseData = response.data.data
            if(responseData.data) {
                this.setState({
                    data:responseData.data,
                    loadingTable:false
                })
            }
        }).catch(error=> {
            this.setState({
                loadingTable:false
            })
        })
    }
    // 搜索
    onFinish = (value) => {
        if(this.state.loadingTable) {return false}
        console.log(value)
        this.setState({
            keyWork:value.name,
            pageNumber:1,
            pageSize:10
        })
        this.loadData()
    }
    onHandlerDelete (id) {
        if (!id) { 
            if (this.state.selectedRowKeys.length === 0) {
                return false
            }
            id = this.state.selectedRowKeys.join()
        }
        this.setState({
            id,
            visible:true
        })
        
    }
    onHandlerSwitch(data) {
        // 禁启用
        console.log(data)
        if (!data.status) {return false}
        const requestData = {
            id:data.id,
            status:data.status === "1" ? false : true
        }
        this.setState({switchId:data.id})
        Status(requestData).then(response => {
            message.info(response.data.message)
            this.setState({switchId:""})
        }).catch(error => {
            this.setState({switchId:""})
        })
    }

    // 复选框
    onCheckebox = (selectedRowKeys) => {
        console.log(selectedRowKeys)
        this.setState({
            selectedRowKeys
        })
    }
    // 弹窗
    modalThen = () => {
        this.setState({
            confirmLoading:true
        })
        Delete({id:this.state.id}).then(response => {
            message.info(response.data.message)
            this.loadData()
            this.setState({
                id:"",
                visible:false,
                confirmLoading:false,
                selectedRowKeys:[]
            })
        })
    }
    render() {
        const { columns,data,loadingTable } =this.state
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
                    <Table
                        rowSelection={rowSelection}
                        columns={columns} 
                        dataSource={data} 
                        bordered  
                        rowKey="id"
                        loading={loadingTable}
                    >
                    </Table>
                    <Button onClick={() =>{this.onHandlerDelete()}}>批量删除</Button>
                </div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.modalThen}
                    onCancel={() => {this.setState({visible:false})}}
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
export default DepartmentList