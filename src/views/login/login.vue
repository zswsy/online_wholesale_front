<template>
  <div class="loginbg">
    <div class="formbox">
      <span class="title">LOGIN</span>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="loginForm"
        :hide-required-asterisk="hideStar"
      >
        <el-form-item label="账号:" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            id="username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            id="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {login} from '@/api/index.js'
import config from '@/utils/config.js'

export default {
  data(){
    return {
      hideStar:true,
      loginForm:{
        username:'',
        password:'',
      },
      rules:{
        username:[{
          required:true,
          message:'请输入账号',
          trigger:'blur'
        }],
        password:[{
          required:true,
          message:'请输入密码',
          trigger:'blur'
        }]
      }
    }
  },
  methods:{
     submitForm(){
      //进度条
      // NProgress.start()
      //获取表单示例，调用表单方法进行数据的校验
      const form=this.$refs.loginForm
      form.validate((valid)=>{
        if(valid){
          login(this.loginForm).then(req=>{
            let data=req.data.data
            let token = localStorage.getItem(config.userToken)  
            console.log('out')
            if(data.token || token){
              console.log('in')
              localStorage.setItem(config.userToken,JSON.stringify(data.token))
              let user = JSON.parse(decodeURIComponent(escape(window.atob(data.token.split('.')[1]))))
              //将用户数据存入vuex中
              this.$store.state.User.userInfo={...user}
              // this.$store.dispatch('getMenuData')
              this.$message({message:'登入成功',type:'success'})
              this.$store.dispatch('getMenuData')
              this.$router.push({path:'/'})
              // NProgress.done()
            }
          })
          
        }else{
          this.$message({message:'登录失败',type:'error'})

          // NProgress.done()
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep.loginbg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/image/loginbg.png) no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 713px;
  .formbox{
    position: absolute;
    right: 150px;
    top: 200px;
    
    .title{
      font-size: 25px;
      font-weight: bolder;
      color: white;
      padding-left: 50px;
      // margin-bottom: 50px;
    }
    .loginForm{
    // background-color: rgba($color: #9CC4B6, $alpha: .8);
    background-color: rgba($color: #9CC4B6, $alpha: 0);
    // background-color: transparent;
    width: 300px;
    height: 350px;
    border-radius: 5px;
    margin-top: 50px;
    .el-form-item__label{
      color: white;
      font-weight: 500;
      font-size: 16px;
    }
    .el-form-item__content{
      // background-color: red;
      // background: red;
      .el-input{
        // background-color:red;
        // background: red;
        .el-input__inner{
          // background-color: red;
          background: transparent;
          border: 0px;
          border-radius: 0px;
          border-bottom: 1px solid #fff;
        }
      }

      .el-button{
        width: 100px;
        margin-top: 50px;
        background-color: #92b8ab;
        border: 0px;
      }
    }
  }
  }
}
</style>