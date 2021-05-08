import React, { Component,Fragment } from 'react'
import { Link } from 'react-router-dom'
import  { Button,Switch, message } from 'antd'
import { Status } from '@api/job'

import TableComponent from '@c/tableData/Index'

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            pageNumber:1,
            pageSize:10,
            keyWork:"",
            id:"",
            switchId:"", //切换
            // 配置项
            tableConfig:{
                url:"jobList",
                checkbox:true,
                rowkey:"id",
                thead:[
                    {
                        title:"职位名称",
                        dataIndex:"jobName",
                        key:"jobName"
                    },
                    {
                        title:"部门名称",
                        dataIndex:"name",
                        key:"name"
                    },
                    {
                        title:"禁启用",
                        dataIndex:"status",
                        key:"status",
                        render:(text,rowData)  => {
                            return <Switch onChange={() => this.onHandlerSwitch(rowData)} loading={rowData.id == this.state.switchId} checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={rowData.status} />
                        }
                    },
                    {
                        title:"操作",
                        dataIndex:"opeartion",
                        key:"opeartion",
                        width: 215,
                        render:(text,rowData)=> {
                            return (
                                <div className="inline-button">
                                    <Button type="primary">
                                        <Link to={{pathname:'/index/job/add',state:{id:rowData.jobId}}}>编辑</Link>
                                    </Button>
                                    <Button onClick={()=>this.delete(rowData.jobId)}>删除</Button>
                                </div>
                            )
                        }
                    }
                ],
                formItem:[
                    {
                        type:"Input", 
                        label:"部门名称",
                        name:"name",
                        placeholder:"请输入部门名称"
                    },
                    {
                        type:"Select", 
                        label:"禁启用",
                        name:"status",
                        placeholder:"请选择",
                        style:{width:"100px"},
                        optionsKey:"status",
                    },
                ]
            }

        }
    }
    // 获取子组件实例
    getChildRef = (ref) => {
        this.tableComponent = ref;
    }

    onHandlerSwitch(data) {
        // 禁启用
        const requestData = {
            id:data.jobId,
            status: !data.status
        }
        this.setState({switchId:data.jobId})
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
                <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig} />
            </Fragment>
        )
    }
}
export default StaffList