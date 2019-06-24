import React from 'react';
import ReactDOM from 'react-dom';
import './style/css/common.less';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


ReactDOM.render(<LocaleProvider locale={zh_CN}><Routes /></LocaleProvider>, document.getElementById('root'));
serviceWorker.unregister();
