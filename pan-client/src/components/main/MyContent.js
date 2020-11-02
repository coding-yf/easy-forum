import React from "react";
import {Layout, PageHeader, Button, Table} from "antd";
import { UploadOutlined, FolderOpenOutlined, FileTextOutlined, ArrowLeftOutlined} from '@ant-design/icons';
import axios from "axios";

class MyContent extends React.Component {
  constructor(){
    super();
    this.state = {
      files: []
    }
    this.handleDir = this.handleDir.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }
  //请求文件列表
  componentDidMount(){
    axios.get("/getFiles").then(res => {
      console.log("访问后台/getFiles返回：", res.data.files);
      this.setState({
        files: res.data.files
      })
    })
  }
  handleDir(){
    alert("点击了目录")
  }
  handleFile(){
    alert("点击了文件")
  }
  render(){
    let {files} = this.state;
    const columns = [
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
        render: (type) => {
          if(type === "dir"){
            return <a onClick={this.handleDir}><FolderOpenOutlined style={{fontSize: "20px"}}/></a>
          }else if(type === "file"){
            return <a onClick={this.handleFile}><FileTextOutlined style={{fontSize: "20px"}}/></a>
          }
        }
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        key: "action",
        render: () => (
          <a>删除</a>
        )
      }
    ];

    return (
      <div>
        <PageHeader
          className="content-header"
          title="当前路径"
          subTitle="pan-yf/"
          extra={[
            <Button type="primary">上传文件</Button>
          ]}
        />
        <Table columns={columns} dataSource={files} />
      </div>
    )
  }
}

export default MyContent;