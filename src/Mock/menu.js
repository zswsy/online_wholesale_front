// import Mock from 'mock'

export default {
    getMenu: ()=>{
        return {
            code:0,
            data:{
                menu:[
                    {
                        //下面的path应该改为/home，顶层路由应该是'/'
                        path:'/',
                        name:'首页',
                        label:'首页',
                        icon:'iconfont icon-shouye',
                        component:'',
                        url:'/layout/Main',
                        children:[],
                    },
                    {
                        path:'/user',
                        name:'用户管理',
                        label:'用户管理',
                        icon:'iconfont iconfont icon-yonghu',
                        component:'',
                        url:'',
                        children:[
                            {
                                path:'/user/userList',
                                component:'',
                                name:'用户列表',
                                laber:'用户列表',
                                icon:'',
                                url:'/user/userList'
                            },
                            {
                                path:'/user/addUser',
                                component:'',
                                name:'用户添加',
                                label:'用户添加',
                                icon:'',
                                url:'/user/addUser',
                            },
                            {
                                path:'/user/userEdit',
                                component:'',
                                name:'用户编辑',
                                laber:'用户编辑',
                                icon:'',
                                url:'/user/userEdit'
                            },
                        ]
                    },
                    {
                        path:'/product',
                        component:'',
                        name:'商品管理',
                        label:'商品管理',
                        icon:'iconfont icon-goods-copy',
                        url:'',
                        children:[
                            {
                                path:'/product/productList',
                                component:'',
                                name:'商品列表',
                                laber:'商品列表',
                                icon:'',
                                url:'/product/productList'
                            },
                            {
                                path:'/product/addProduct',
                                component:'',
                                name:'添加商品',
                                label:'添加商品',
                                icon:'',
                                url:'/product/addProduct',
                            },
                            {
                                path:'/product/editProduct',
                                component:'',
                                name:'商品编辑',
                                laber:'商品编辑',
                                icon:'',
                                url:'/product/editProduct'
                            },
                        ],
                    },
                    {
                        path:'/order',
                        component:'',
                        name:'订单管理',
                        label:'订单管理',
                        icon:'iconfont icon-yunshuzhongwuliu',
                        url:'',
                        children:[
                            {
                                path:'/order/orderList',
                                component:'',
                                name:'订单列表',
                                label:'订单列表',
                                icon:'',
                                url:'/order/orderList',
                            },
                        ],
                    },


                ]
            }
        }
    }
}