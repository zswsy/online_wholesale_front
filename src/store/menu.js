import http from '@/utils/axios.js'
import config from '@/utils/config'
const modules = import.meta.glob('../views/*/*.vue')


const menu={
    state:()=>({
        menuWidth:'200px',
        isCollapse:false,
        icon:'el-icon-s-fold',
        menuList:[]
    }),
    getters:{
        getIsCollapse(state){
            return state.isCollapse
        }
    },
    mutations:{
        //更改侧边栏开合状态
        changeCollapse(state){
            state.isCollapse=!state.isCollapse;
        },

        //更改头部图标
        changeIcon(state){
            state.icon=state.isCollapse?'el-icon-s-unfold':'el-icon-s-fold'
        },

        //更改侧边栏的宽度
        changeWidth(state){
            state.menuWidth=state.isCollapse?'50px':'200px'
        },

        //动态添加路由
        dynamicAddRouter(state,router){
            // console.log('addrouter')
            if(!localStorage.getItem(config.menuData)) return
            const menu = JSON.parse(localStorage.getItem(config.menuData)) || state.menuList
            // console.log(typeof(menu),menu,'menulength')
            const menuArray=[]
            menu.forEach(item => {
                
                // console.log(Boolean(item.children.length))
                if(item.children.length) {
                    item.children = item.children.map(item => {
                        // console.log(modules[`../views${item.url}.vue`])
                        item.component = modules[`../views${item.url}.vue`]
                        return item
                    })

                    menuArray.push(...item.children)
                }else{
                    //以下两行存在问题，无法进行的路由的动态注册sh
                    item.component = modules[`../views${item.url}.vue`]
                    menuArray.push(item)
                }
            })
            // console.log(menuArray)
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
            // console.log('routeradd')
            

        }
    },
    actions:{
        getMenuData(state){
            
            http.get('/api/menu').then(req=>{
                //将菜单数据缓存到本地中
                // console.log(state.state.menuList,'api/menu')
                const data = req.data.data.menu;
                localStorage.setItem(config.menuData, JSON.stringify(data));
                state.state.menuList=data;
            }).catch(err =>{
                return err
            })
        }
    }

}

export default menu