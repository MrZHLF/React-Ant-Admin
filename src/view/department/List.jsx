import React, { Component,Fragment } from 'react'
import { Link } from 'react-router-dom'
import  { Form, Input, Button,Table,Switch, message,Modal } from 'antd'
import { GetList,Delete,Status } from '@api/department'

import TableComponent from '@c/tableData/Index'

class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                
            ],
            data:[],
            pageNumber:1,
            pageSize:10,
            keyWork:"",
            id:"",
            switchId:"", //切换
            // 配置项
            tableConfig:{
                url:"departmentList",
                deleteUrl:"departmentListDelete",
                method:"post",
                checkbox:true,
                rowKey:"id",
                thead:[
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
                                    <Button onClick={()=>this.delete(rowData.id)}>删除</Button>
                                </div>
                            )
                        }
                    }
                ]
            }

        }
    }
    // 获取子组件实例
    getChildRef = (ref) => {
        this.tableComponent = ref;
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
    }
    onHandlerSwitch(data) {
        // 禁启用
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
    delete = (id) => {
        this.tableComponent.onHandlerDelete(id)
    }
    render() {
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
                    <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig} />
                </div>
            </Fragment>
        )
    }
}
export default DepartmentList