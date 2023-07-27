import Mock from 'mockjs'
import Menu from './menu.js'
import Notice from './notice.js'
import ECharts  from './homeCharts.js'


Mock.mock(/http\:\/\/696h60k925\.zicp\.fun\:\d+\/api\/menu/g,'get',Menu.getMenu)
Mock.mock(/http\:\/\/696h60k925\.zicp\.fun\:\d+\/api\/notice/g,'get',Notice.getNotice)
Mock.mock(/http\:\/\/696h60k925\.zicp\.fun\:\d+\/api\/lineData/g,'post',ECharts.getLineData)
Mock.mock(/http\:\/\/696h60k925\.zicp\.fun\:\d+\/api\/categoryData/g,'post',ECharts.getCategoryData)
Mock.mock(/http\:\/\/696h60k925\.zicp\.fun\:\d+\/api\/pieData/g,'post',ECharts.getPieData)