<template>
    <div class="box">
      <div class="title">编辑商品</div>
      <div class="form">
        <el-form
          label-width="80px"
          :model="productInfo"
        >
        <el-form-item label="商品名:">
          <el-input v-model="productInfo.product_name"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="productInfo.product_price"></el-input>
        </el-form-item>
        <el-form-item label="库存:">
          <el-input v-model="productInfo.product_quantity"></el-input>
        </el-form-item>
        <el-form-item label="商品描述:">
          <el-input v-model="productInfo.product_description"></el-input>
        </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="changeproductInfo()">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  
  import {editproduct} from '@/api/index.js'
  
  export default {
    data() {
      return {
        productInfo: {},
        
      };
    },
    methods: {
      mountedproductInfo() {
        this.productInfo = { ...this.$route.params };
      },
      changeproductInfo(){
        this.$confirm("即将修改用户信息, 是否提交?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(()=>{
          editproduct({...this.productInfo}).then(req =>{
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
      this.mountedproductInfo();
      
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
  