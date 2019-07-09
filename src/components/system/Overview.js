import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import {
  Row,
  Col,
  Card,
  Progress,
  Descriptions,
  List,
  Radio,
  Switch,
  message
} from "antd";
import axios from "../../axios";
import "../../style/jhy/less/overview.less";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: {}
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios
      .ajax({
        method: "get",
        url: window.g.loginURL + "/api/system/overview",
        data: {}
      })
      .then(res => {
        if (res.success) {
          console.log(res);
          this.setState({
            datalist: res.data
          });
        }
      });
  };
  render() {
    const funconfig = [
      <Radio>云端同步服务器是否运行</Radio>,
      <Radio>删除服务器是否运行</Radio>,
      <Radio>直播服务器是否运行</Radio>
    ];
    const datalist = this.state.datalist;
    const cpupie = {
      tooltip: {},
      series: [
        {
          type: "pie",
          label: [],
          radius: ["50%", "80%"],
          data: [{ value: datalist.cpuUsed }, { value: datalist.cpuUnused }]
        }
      ],
      color: ["#006cff", "#dcdbe0"]
    };
    const physpie = {
      tooltip: {},
      series: [
        {
          type: "pie",
          radius: ["50%", "80%"],
          label: [],
          data: [
            { value: datalist.totalMemories },
            { value: datalist.surplusMemories },
            { value: datalist.usedMemories }
          ]
        }
      ],
      color: ["#006cff", "#ff7200", "#32e8fe"]
    };
    const diskpie = {
      tooltip: {},
      series: [
        {
          type: "pie",
          radius: ["50%", "80%"],
          label: [],
          data: [
            { value: datalist.MaxDisksMemories },
            { value: datalist.surplusDisksMemories },
            { value: datalist.couldUseMemories }
          ]
        }
      ],
      color: ["#006cff", "#ff7200", "#32e8fe"]
    };
    return (
      <div className="overview">
        <div className="topwrap">
          <Row gutter={48}>
            <Col span={8}>
              <Card title="CPU" bordered={false} className="cpu">
                <Row>
                  <Col span={16}>
                    <div className="pie">
                      <ReactEcharts
                        id="cpuech"
                        option={cpupie}
                        style={{ height: "190px" }}
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <p className="desc">
                      <span className="dot bluedot" />
                      CUP使用率
                    </p>
                    <p className="desc">
                      <span className="dot graydot" />
                      CUP空闲率
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="物理内存" bordered={false} className="physics">
                <Row>
                  <Col span={16}>
                    <div className="pie">
                      <ReactEcharts
                        option={physpie}
                        style={{ height: "190px" }}
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <p className="desc">
                      <span className="dot bluedot" />
                      总物理内存
                    </p>
                    <p className="desc">
                      <span className="dot orangedot" />
                      剩余物理内存
                    </p>
                    <p className="desc">
                      <span className="dot lightbluedot" />
                      已使用物理内存
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="磁盘内存" bordered={false} className="disk">
                <Row>
                  <Col span={16}>
                    <div className="pie">
                      <ReactEcharts
                        option={diskpie}
                        style={{ height: "190px" }}
                      />
                    </div>
                  </Col>
                  <Col span={8}>
                    <p className="desc">
                      <span className="dot bluedot" />
                      可使用内存
                    </p>
                    <p className="desc">
                      <span className="dot orangedot" />
                      剩余内存
                    </p>
                    <p className="desc">
                      <span className="dot lightbluedot" />
                      最大可使用内存
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <Row className="midwrap">
          <Card title="操作系统" bordered={false} className="ossys">
            <Row>
              <Col span={5}>
                <span className="syslabel">总线程数</span>
                <span className="prog">73</span>
              </Col>
              <Col span={5}>
                <span className="syslabel">CUP使用率</span>
                <Progress
                  percent={20}
                  format={percent => {
                    return percent;
                  }}
                  className="cpuval"
                />
              </Col>
              <Col span={5}>
                <span className="syslabel">显存</span>
                <span className="prog">{datalist.videoRam}</span>
              </Col>
              <Col span={5}>
                <span className="syslabel">空闲显存</span>
                <span className="prog">{datalist.freeVideoRam}</span>
              </Col>
            </Row>
          </Card>
        </Row>
        <Row className="botwrap">
          <Card title="功能设置" className="funset">
            <Row>
              <label className="alarmLabel" htmlFor="alarmSound">
                报警声音设置
              </label>
              <Switch id="报警声音设置" className="alarmSound" />
            </Row>
            <Row gutter={16} style={{ marginTop: "20px" }}>
              <Col span={6}>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="系统持续运营时间">
                    {datalist.Runningtime}
                  </Descriptions.Item>
                  <Descriptions.Item label="一次算法处理警报数量">
                    {datalist.firstCalculationNum}
                  </Descriptions.Item>
                  <Descriptions.Item label="二次算法处理警报数量">
                    {datalist.secondCalculationNum}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={6}>
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="软件版本">
                    {datalist.softVersion}
                  </Descriptions.Item>
                  <Descriptions.Item label="一次算法版本">
                    {datalist.firstCalculationVersion}
                  </Descriptions.Item>
                  <Descriptions.Item label="二次算法版本">
                    {datalist.secondCalculationVersion}
                  </Descriptions.Item>
                  <Descriptions.Item label="SERVER版本">
                    {datalist.SERVERVersion}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={4}>
                <List
                  // style={{ width: "90%" }}
                  dataSource={funconfig}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
              </Col>
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}
export default Overview;
