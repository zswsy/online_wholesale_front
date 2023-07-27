<template>
  <div class="box">
    <div class="title">添加用户</div>
    <div class="form" >
      <el-form ref="userForm" label-width="80px" :model="userInfo" :rules="formRules" hide-required-asterisk>
        <el-form-item label="用户名:"  prop="user_name">
          <el-input v-model="userInfo.user_name"></el-input>
        </el-form-item>
        <el-form-item label="性别:"  prop="user_gender">
          <el-input v-model="userInfo.user_gender"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" prop="user_age">
          <el-input v-model="userInfo.user_age" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="user_email">
          <el-input v-model="userInfo.user_email" ></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="user_phone">
          <el-input v-model="userInfo.user_phone" ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submitUserinfo()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addUser } from "@/api/index.js";

export default {
  data() {
    return {
      userInfo: {
        user_name:'',
        user_gender:'',
        user_age:'',
        user_email:'',
        user_phone:'',
      },
      formRules:{
        user_name:{
          message:'请输入用户名',
          required:true,
          trigger: 'blur'
        },
        user_gender:{
          message:'请输入性别',
          required:true,
          trigger: 'blur'
        },
        user_age:{
          message:'请输入年龄',
          required:true,
          trigger: 'blur'
        },
        user_email:{
          message:'请输入邮箱',
          required:true,
          trigger: 'blur'
        },
        user_phone:{
          message:'请输入电话',
          required:true,
          trigger: 'blur'
        },
      }
    };
  },
  methods:{
    submitUserinfo(){
      this.$refs.userForm.validate(valid=>{
        if(valid){
          console.log(111)
          addUser(this.userInfo).then(req => {
            console.log(req)
            this.$message({
              message:'添加成功',
              type:'success'
            })
          })
        }else{
          this.$notify({
            message:'请输入正确的内容',
            type:'error'
          })
        }
      })
    }
  }
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
