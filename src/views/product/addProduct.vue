<template>
    <div class="box">
      <div class="title">添加商品</div>
      <div class="form" >
        <el-form ref="productForm" label-width="80px" :model="productInfo" :rules="formRules" hide-required-asterisk>
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
            <el-button type="primary" @click="submitProductInfo()">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  import { addProduct } from "@/api/index.js";
  
  export default {
    data() {
      return {
        productInfo: {
          user_name:'',
          roduct_price:'',
          product_quantity:'',
          product_description:'',
        },
        formRules:{
          user_name:{
            message:'请输入商品名',
            required:true,
            trigger: 'blur'
          },
          roduct_price:{
            message:'请输入商品价格',
            required:true,
            trigger: 'blur'
          },
          product_quantity:{
            message:'请输入库存',
            required:true,
            trigger: 'blur'
          },
          product_description:{
            message:'请输入商品描述',
            required:true,
            trigger: 'blur'
          },
        }
      };
    },
    methods:{
      submitProductInfo(){
        this.$refs.productForm.validate(valid=>{
          if(valid){
            console.log(111)
            addProduct(this.productInfo).then(req => {
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
  