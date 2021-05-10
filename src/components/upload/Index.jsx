import React, { Component } from 'react'

import {UploadToken} from '@/api/common'

import { Upload,message  } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
class UploadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "",
            loading: false,
            name: props.name,
            uploadKey: {
                token:"",
                key:""
            }
        }
    }

    componentDidMount() {
        // this.getUploadToken()
    }

    getUploadToken = () => {
        return UploadToken({
            ak:"",
            sk:"",
            buckety:"react-upload"
        }).then(response => {
            console.log(response,'response')
            let data = response.data.data
            return data.token
            // this.setState({
            //     uploadKey: {
            //         token: data.token
            //     }
            // })
        })
    }

    // 图片转base64
    getBase64 = (img, callback) =>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    // 上传之前
    beforeUpload = async (file) => {
        const token = await this.getUploadToken()

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        // 解析文件
        const name = file.name;
        const key = encodeURI(`${name}`)
        // 更新文件的key
        this.setState({
            uploadKey: {
                token,
                key
            }
        })
        return isJpgOrPng && isLt2M;
    }

    // 选择图片时
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const fileInfo = info.file.response;
            const imageUrl =  `填写自己/${fileInfo.key}`
            this.setState({
                imageUrl,
                loading: false,
            },() => {
                this.triggerChange(imageUrl)
            })

            // this.getBase64(info.file.originFileObj, imageUrl =>
            //     this.setState({
            //         imageUrl,
            //         loading: false,
            //     },() => {
            //         this.triggerChange(imageUrl)
            //     }),
            // );
        }
    }


    // 返回数据
    triggerChange =(changedValue) => {
        const onChange = this.props.onChange
        if (onChange) {
            onChange({[this.state.name]: changedValue})
        }
    }


    render() {
        const { imageUrl, loading } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                data={this.state.uploadKey}
                action="https://up-z2.qiniup.com"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        )
    }
}


export default UploadComponent