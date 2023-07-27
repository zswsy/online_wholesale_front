const bread = {
    state:()=>({
        breadList:[
            {
                path:'/',
                name:'首页',
                label:'首页',
                icon:'iconfont icon-shouye',
                url:'Main.vue',
                children:[],
            },
        ]
    }),
    getters:{
        
    },
    mutations:{
        addBread(state,val){
            //将导航栏的点击菜单加入面包屑
            if((state.breadList.findIndex(item =>item.name==val.name)==-1)) state.breadList.push(val)
        }
    },
    actions:{}
}

export default bread