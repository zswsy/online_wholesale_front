<template>
  <div class="box">
    <div class="title">编辑用户</div>
    <div class="form">
      <el-form
        label-width="80px"
        :model="userInfo"
      >
        <el-form-item label="用户名:">
          <el-input v-model="userInfo.user_name"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-input v-model="userInfo.user_gender "></el-input>
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input v-model="userInfo.user_age"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="userInfo.user_email"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="userInfo.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="changeUserinfo()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {editUser} from '@/api/index.js'

export default {
  data() {
    return {
      userInfo: {},
      
    };
  },
  methods: {
    mountedUserInfo() {
      this.userInfo = { ...this.$route.params };
    },
    changeUserinfo(){
      this.$confirm("即将修改用户信息, 是否提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        editUser({...this.userInfo}).then(req =>{
          // console.log(req)
          let data=req.data
          if(data.status){
            this.$message({
                  type: "success",
                  message: "修改成功!",
                });
          }else{
            this.$message({
                  type: "error",
                  message: "修改失败!",
                })
          }
        }).catch(err => {
          return err
        })
      }).catch( err =>{
        this.$message({
            type: "info",
            message: "已取消修改",
          })
      })
    },
  },
  mounted() {
    this.mountedUserInfo();
    
  },
};
</script>

<style lang="scss" scoped>
::v-deep.box {
  // background-color: pink;
  height: auto;
  width: 50%;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 40px;
    font-weight: 600;
    font-family: "kaiti";
    color: #444;
  }
  .form {
    .el-form-item {
      .el-form-item__content {
        .el-input {
          .el-input__inner {
            &:focus {
              border-color: $buttonBorder;
            }
          }
        }
        .el-button {
          background: $buttonBg;
          border-color: $buttonBorder;
          margin-left: 42%;
        }
      }
    }
  }
}
</style>
