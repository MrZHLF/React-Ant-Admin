import React, { Component,Fragment } from 'react'
import  { Button,Switch, message } from 'antd'
import { Status } from '@api/user'

import TableComponent from '@c/tableData/Index'
import UserModal from './components/UserModal'
class UserList extends Component {
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
                url:"userList",
                checkbox:true,
                rowkey:"id",
                thead:[
                    {
                        title:"用户名",
                        dataIndex:"username",
                        key:"username"
                    },
                    {
                        title:"真实姓名",
                        dataIndex:"truename",
                        key:"truename"
                    },
                    {
                        title:"手机号",
                        dataIndex:"phone",
                        key:"phone"
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
                        title:"权限",
                        dataIndex:"role_str",
                        key:"role_str"
                    },
                    {
                        title:"操作",
                        dataIndex:"opeartion",
                        key:"opeartion",
                        width: 215,
                        render:(text,rowData)=> {
                            return (
                                <div className="inline-button">
                                    <Button type="primary" onClick={() => this.userModal({status: true,user_id:rowData.id})}>
                                    编辑
                                    </Button>
                                    <Button onClick={()=>this.delete(rowData.id)}>删除</Button>
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
                ],
                formSearchCol:18,
                formRightCol:6,
            }

        }
    }
    // 获取子组件实例
    getChildRef = (ref) => {
        this.tableComponent = ref;
    }

    // 获取弹窗的子组件实例

    getUserModalRef= (ref) => {
        this.child = ref
    }
    // 显示弹框
    userModal = (data) => {
        console.log(data,'datadata')
        this.child.visibleModal(data)
    }

    onHandlerSwitch(data) {
        // 禁启用
        const requestData = {
            id:data.id,
            status: !data.status
        }
        this.setState({switchId:data.id})
        Status(requestData).then(response => {
            message.info(response.data.message)
            this.setState({switchId:""})
        }).catch(error => {
            this.setState({switchId:""})
        })
    }
    // 编辑 第一种通过绑定另外一个点击事件
    onHandlerEdit  = (id) => {
        console.log(id,'666')
        this.userModal({
            status: true,
            user_id:id
        })
    }
    delete = (id) => {
        this.tableComponent.onHandlerDelete(id)
    }
    render() {
        return (
            <Fragment>
                <TableComponent onRef={this.getChildRef} batchButton={true} config={this.state.tableConfig}>
                    <Button type="primary" ref="userAdd" onClick={()=>this.userModal({status:true})}>新增</Button>
                </TableComponent>
                <UserModal onRef={this.getUserModalRef}/>
            </Fragment>
        )
    }
}
export default UserList