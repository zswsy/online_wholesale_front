<template>
  <div class="homeContainer">
    <div class="left">
      <div class="p-card">
        <div class="img">
          <img src="../../assets/image/avater.jpg" alt="" />
          <div class="role">
            <p>{{ userInfo.user_name ? userInfo.user_name : "普通用户" }}</p>
            <span>{{
              userInfo.user_role == 0
                ? "普通用户"
                : userInfo.user_role == 1
                ? "管理员"
                : "超级管理员"
            }}</span>
          </div>
        </div>

        <div class="login">
          <p>上次登录时间：<span>2023-07-11</span></p>
          <p>上次登录地点：<span>广东-深圳</span></p>
        </div>
      </div>

      <div class="notice">
        <!-- <el-table :data="noticeData"  style="width: 100%">
            <el-table-column prop="date" label="日期" width="25%">  </el-table-column>
            <el-table-column  prop="notice" label="通知" width="75%"> </el-table-column>
        </el-table> -->
            <ul>
              <li  v-for=" item  in noticeData" :key="item.id">
                <span>{{ item.date }}:</span>
                {{ item.notice }}</li>
            </ul>
      </div>

    </div>

    <div class="right">
      <div class="zhexian" ref="line">
      </div>
      <div class="bottomArea">
        <div class="category" ref="category"></div>
        <div class="pie" ref="pie"></div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/utils/config.js";
import {getNotice,getLine,getCategory,getPie} from '@/api/index.js'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      noticeData:[],
      //折线图数据
      lineData:[],
      //柱状图数据
      categoryData:[],
      //饼状图数据
      pieData:[],
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(
        decodeURIComponent(
          escape(
            window.atob(
              JSON.parse(localStorage.getItem(config.userToken)).split(".")[1]
            )
          )
        )
      );
    }
    
  },
  mounted() {
    this.getNotice()
    this.initLine()
    this.initCategory()
    this.initPie()
  },
  methods:{
    //获取通知
    async getNotice(){
      await getNotice().then( req =>{
        let data=req.data.data.announcements
        this.noticeData=data

        // for (let i = 0; i < data.length; i++) {
        //   let e = data[i];
        //   console.log(i)
        //   this.notice.push({date:'2023-7-11',notice:e})
        // }
        // console.log(this.notice)
        // console.log('@@')

      }).catch( err =>{
        return err
      })
    },
    //折线统计图
    async initLine(){
      const echarts1=echarts.init(this.$refs.line)
      let option={
        title:{
          // text:'折线图标题'
        },
        xAxis:{
          data: ['xiaomi', 'vivo', 'oppo', 'meizu', 'apple', 'oneplus', 'iqoo']
        },
        legend:[{name:'xiaomi'},{name:'vivo'},{name:'oppo'},{name:'meizu'},{name:'apple'},{name:'oneplus'},{name:'iqoo'}],
        yAxis:{
          // type:'value'
        },
        series:[]
      }
      await getLine().then( req =>{
        let data=req.data
        // console.log(data)
        this.lineData=data.data
        option.series=this.lineData

      }).catch( err =>{
        return err
      })
      echarts1.setOption(option)
    },
    //柱状图
    async initCategory(){
      const echarts2=echarts.init(this.$refs.category)
      let option={
        legend:{
          //图例文字颜色
          textStyle:{
            color:'#333',
          },
        },
        grid:{
            left:'20%'
          },
          //提示框
          tooltip:{
            trigger:'axis',
          },
          xAxis:{
            type:'category', //类目轴，
            // data:userData.map(item => item.data),//修改数据
            data:[],//修改数据
            axisLine:{
              lineStyle:{
                color:'#17b3a3',
              },
            },
            axisLabel:{
              interval: 0,
              color:'#333'
            },
          },
          yAxis:[
            {
              type:'value',
              axisLine:{
                lineStyle:{
                  color:'#17b3a2'
                },
              },
            },
          ],
          color:["#2ec7c9","#b6a2de"],
          series:[
            {
              name:'新增用户',
              data:[],
              type:'bar'
            },
            {
              name:'活跃用户',
              data:[],
              type:'bar'
            }
          ],
      }
      await getCategory().then(req =>{
          let data=req.data
          this.categoryData=data
          for(let i =0;i<data.length;i++){
            option.xAxis.data.push(data[i].date)
            option.series[0].data.push(data[i].new)
            option.series[1].data.push(data[i].active)
          }
      }).catch(err=>{
        return err
      })

      echarts2.setOption(option)



    },

    //饼状图
    async initPie(){
      const echarts3=echarts.init(this.$refs.pie)
      const option={
        tooltip:{
          trigger:"item",
        },
        color:[
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series:[
          {
            data:[], //改数据
            type:'pie'
          },
        ],
      };
      await getPie().then(req=>{
        console.log(req,'pie')
        this.pieData=req.data
        option.series[0].data=this.pieData

      })
      echarts3.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.homeContainer {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .left {
    width: 30%;
    height: 100%;

    .p-card {
      width: 100%;
      height: 47%;
      border: 1px solid #d1d1d1;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      .img {
        padding: 20px;
        box-sizing: border-box;
        display: flex;

        img {
          width: 40%;
          border-radius: 50%;
        }
        .role {
          padding-left: 30px;
          p {
            font-size: 26px;
            font-weight: bold;
            margin-top: 50px;
            margin-bottom: 15px;
          }
          span {
            font-size: 14px;
            color: #999;
          }
        }
      }

      .login {
        margin: 20px;
        border-top: 1px solid #bababa;
        p {
          color: #999;
          span {
            margin-left: 50px;
            color: #666;
          }
        }
      }
    }

    .notice{
      width: 100%;
      height: 51.5%;
      margin-top: 10px;
      border: 1px solid #d1d1d1;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin-top: 10px;
      ul{
        margin: 0px;
        padding: 10px 15px;
        box-sizing: border-box;
        max-height: 310px;
        overflow: scroll;
        li{
          padding: 4.5px 0px;
          span{
            margin-right: 20px;
          }
          border-bottom: 1px solid #d1d1d1;
        }
      }
    }
  }

  .right {
    width: 68%;
    // background-color: lightblue;
    .zhexian{
      width: 100%;
      border: 1px solid #d1d1d1;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      height: 47%;
      box-sizing: border-box;
        padding: 20px 20px;
    }

    .bottomArea{
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      height: 51.5%;
      .category{
        width: 48%;
        border: 1px solid #d1d1d1;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        box-sizing: border-box;
        padding: 20px 20px;
      }

      .pie{
        width: 48%;
        border: 1px solid #d1d1d1;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        box-sizing: border-box;
        padding: 20px 20px;
      }
    }
  }
}
</style>