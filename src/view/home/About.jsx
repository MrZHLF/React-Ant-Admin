import React, { Component,Fragment } from 'react'
import { Button,Table } from 'antd';

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key:"id",
            columns:[
                { title: '姓名', dataIndex: 'name', key: 'name'},
                { title: '年龄', dataIndex: 'age', key: 'age'},
                { title: '手机号', dataIndex: 'phone', key: 'name'},
                { title: '地址', dataIndex: 'address', key: 'address'},
                { 
                    title: '操作', 
                    dataIndex: 'edit',
                    render:(text,rowData)=> {
                    return (
                        <div className="inline-button">
                            <Button type="primary" onClick={()=> this.handleEdit(rowData.id)}>编辑</Button>
                            <Button onClick={()=> this.handleRemove(rowData.id)}>删除</Button>
                        </div>
                    )
                }},
            ],
            dataSource:[
                {id:1,name:"张三",age:20,phone:13623232323,address:"郑州市"},
                {id:2,name:"李四",age:22,phone:15236235200,address:"周口市"},
                {id:3,name:"王二",age:23,phone:13869562305,address:"洛阳市"}
            ]
        }
    }

    handleEdit = (id) =>{
        console.log(id,'编辑')
    }

    handleRemove = (id) =>{
        console.log(id,'删除')
    }
    render() {
        let { columns,dataSource,key } = this.state
        return (
            <Fragment>
                <Button type="primary">新增用户</Button>
                <Table rowKey={key} bordered dataSource={dataSource} columns={columns} />;
            </Fragment>
        )
    }
} 
export default About