import React, { Component } from 'react';
import "../../style/ztt/css/upgradeSystem.less";
import { Upload, Icon, message,Button } from 'antd';
class UpgradeSystem extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: false,
        };
    }
    getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    beforeUpload=(file)=>{
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">选择文件</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div className="upgradeSystem">
                <span className="upgrdeTitle">上传更新包</span>
                <div className="upLoadCon">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
                    <Button type="primary" className="upBtn">确认</Button>
                </div>
            </div>
        );
    }
}
export default UpgradeSystem;