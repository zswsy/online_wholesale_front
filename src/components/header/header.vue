<template>
  
    <div class="header">
        <div class="left">
            <i :class="getIcon" @click="changeAside"></i>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in breadList" :key="item.name"  :to="{ path: `${item.path}` }">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
        <div class="right">
            <el-dropdown @command="clickAvater"  trigger="click">
                <span class="el-dropdown-link">
                    <img class="userImg" src="../../assets/image/avater.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item commond="personal" >个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

import config from '@/utils/config.js'

export default {
    data(){
        return {
            breadList:[]
        }
    },
    computed:{
        getIcon(){
            return this.$store.state.Menu.icon
        },
        
    },
    methods:{
        changeAside(){
            
            this.$store.commit('changeCollapse')
            this.$store.commit('changeIcon')
            this.$store.commit('changeWidth')
        },
        getBread(){
            this.breadList=this.$store.state.Bread.breadList
            // console.log(this.breadList+'----')
        },
        clickAvater(commond){
            if(commond==='logout'){
                localStorage.removeItem(config.menuData)
                localStorage.removeItem(config.userToken)
                this.$router.push({path:'/login'})
            }
        },
    },
    mounted(){
        this.getBread()
    }
}
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-content: center;
        color: white;
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            // line-height: 65px;
            font-size: 22px;
            i {
                cursor: pointer;
                margin-right: 20px;
            }

            ::v-deep .el-breadcrumb__item {
                .el-breadcrumb__inner {
                    color: white;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 400;
                    &.is-link {
                        color: white;
                        font-size: 14px;
                        font-weight: 500;
                        cursor: pointer;
                        font-weight: 400;
                    }
                }

                &:last-child{
                    .el-breadcrumb__inner{
                        color: $fontColor;
                        font-weight: 500;
                    }
                }
            }

            
        }

        .right{
            line-height: 65px;
            span{
                .userImg{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                }
            }
        }
    }

    
</style>