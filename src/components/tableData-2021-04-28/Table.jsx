import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import  { Table ,Row,Col,Button,Pagination } from 'antd'

class TableBasis extends Component {
    render() {
        const { thead } = this.props.config
        return (
            <Fragment>
                <div className="spacing-30"></div>
                <Table bordered rowKey={this.props.rowkey} columns={thead} dataSource={this.props.list} />
                {/* <Row>
                    <Col span={8}>
                        {batchButton && <Button onClick={handlerDelete}>批量删除</Button>} 
                    </Col>
                    <Col span={16}>
                        <Pagination
                            onChange={changePageCurrent}
                            onShowSizeChange={changePageSize}
                            className="pull-right"
                            total={total}
                            showSizeChanger
                            showQuickJumper
                            showTotal={total => `Total ${total} items`}
                        />
                    </Col>
                </Row> */}
            </Fragment>
        )
    }
}

// 类型检测
TableBasis.propTypes = {
    config:PropTypes.object,
    rowkey:PropTypes.string
}
// 默认值
TableBasis.defaultProps = {
    config:{},
    rowkey:"id"
}

// 把store中的数据映射到这个组件上形成props

const mapStateToProps = (state) => {
    console.log(state,'state')
    return {
        list: state.department.departmentList
    }
}

export default connect(
    mapStateToProps,
    null
)(TableBasis) 