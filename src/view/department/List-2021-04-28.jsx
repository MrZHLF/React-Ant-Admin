import React, { Component,Fragment } from 'react'
import { Link } from 'react-router-dom'
import  { Button,Switch, message } from 'antd'
import { Status } from '@api/department'

import TableComponent from '@c/tableData/Table'
import FormSearch from '@c/formSearch/Index'


class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[
                
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
                rowkey:"id",
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
                ],
                
            }

        }
    }
    componentDidMount() {
        // Store.dispatch(addStatus({
        //     label:"所有",
        //     value:"all"
        // }))
    }
    // 获取子组件实例
    getChildRef = (ref) => {
        this.tableComponent = ref;
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
                <FormSearch formItem={this.state.formItem}/>
                <TableComponent config={this.state.tableConfig} />
            </Fragment>
        )
    }
}
export default DepartmentList