<template>
    <div class="table">
      <div class="serachForm">
        <el-form :model="serachForm" status-icon ref="searchForm" class="elForm">
          <el-form-item prop="value">
            <el-input
              type="text"
              v-model="serachForm.value"
              autocomplete="off"
              placeholder="请输入搜索内容"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
  
      <el-table
        :data="tableData"
        stripe
        height="526"
        show-header
        style="width: 100%"
      >
        <el-table-column prop="product_id" label="ID" width="100px"> </el-table-column>
        <el-table-column prop="product_name" label="商品名"> </el-table-column>
        <el-table-column prop="product_price" label="单价" > </el-table-column>
        <el-table-column prop="product_quantity" label="库存" > </el-table-column>
        <el-table-column prop="product_description" label="商品详情" width="300px" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="addr" label="操作" class-name="operate">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
  
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          @current-change="changePage"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  import { getProduct, deleteProduct } from "@/api/index.js";
  
  export default {
    data() {
      return {
        productData: [],
        tableData: [],
        pageData: {
          page: 1,
          limit: 10,
        },
        count: 0,
        serachForm: {
          value: "",
        },
      };
    },
    methods: {
      //获取用户列表数据
      getProductsData() {
        getProduct()
          .then((req) => {
            this.productData = req.data.data;
            this.count = this.productData.length;
            this.tableData = this.productData.filter(
              (item, index) =>
                index < this.pageData.page * this.pageData.limit &&
                index >= this.pageData.limit * (this.pageData.page-1)
            );
          })
          .catch((err) => err);
      },

      //改变分页器的页面
      changePage(val) {
        this.pageData.page = val;
        this.tableData = this.productData.filter(
          (item, index) =>
            index < this.pageData.page * this.pageData.limit &&
            index >= this.pageData.limit * (this.pageData.page - 1)
        );
      },

      //搜索内容
      search() {
        if (this.serachForm.value) {
          this.tableData = this.productData.filter(
            (item) => item.product_name.indexOf(this.serachForm.value) !== -1
          );
          this.count = this.tableData.length;
        } else {
            this.pageData.page=1
          this.tableData = this.productData.filter(
            (item, index) =>
              index < this.pageData.page * this.pageData.limit &&
              index >= this.pageData.limit * (this.pageData.page - 1)
          );
          this.count = this.productData.length;
        }
      },
  
      //编辑按钮
      handleEdit(item) {
        //将编辑用户传递给userEdit页面修改
        this.$router.push({
          path: "/product/editProduct",
          name: "商品编辑",
          params: { ...item.row },
        });
      },

      //删除按钮
      handleDelete(item) {
        this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const params=new URLSearchParams()
            params.append('id',item.row.product_id)
            deleteProduct(params)
              .then((req) => {
                if (req.data.status) {
                  this.updateTableData(item.row.product_id)
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                }
              })
              .catch((err) => {
                return err;
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },

      //更新表格数据
      updateTableData(id){
        this.usersData = this.usersData.filter(
          (item) => item.product_id != id
        );
        this.tableData = this.productData.filter(
          (item, index) =>
            index < this.pageData.page * this.pageData.limit &&
            index >= this.pageData.limit * (this.pageData.page - 1)
        );
        this.count = this.usersData.length;
      }
    },
    mounted() {
      this.getProductsData();
    },
  };
  </script>
  
  <style lang="scss" scoped>
  ::v-deep.serachForm {
    display: flex;
    justify-content: end;
    .el-form {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__content {
          margin-left: 30px;
          .el-input {
            .el-input__inner {
              &:focus {
                border-color: #52616b;
              }
            }
          }
          .el-button {
            background-color: #52616b;
            border: 1px solid #52616b;
            // color: #ffd04b;
          }
        }
      }
    }
  }
  
  ::v-deep.el-table {
    .el-table__body {
      .el-table__row {
        .operate {
          .el-button--mini {
            padding: 3.5px 7px;
          }
        }
      }
    }
  }
  
  ::v-deep.pagination {
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: end;
    .el-pagination {
    }
  }
  </style>