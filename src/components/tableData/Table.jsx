import React, { Component,Fragment } from 'react'

import PropTypes from 'prop-types'
import  { Table ,Row,Col,Button,Pagination } from 'antd'

class TableBasis extends Component {
    render() {
        const { thead } = this.props.config
        return (
            <Fragment>
                <div className="spacing-30"></div>
                <Table bordered columns={thead} />
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
    config:PropTypes.object
}
// 默认值
TableBasis.defaultProps = {
    config:{}
}

export default TableBasis