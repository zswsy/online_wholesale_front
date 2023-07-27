import Mock from 'mockjs'

export default {
    
    //折线图的数据
    getLineData:()=>{
        const random=Mock.Random
        let lineData=[]
        let pname=['xiaomi', 'vivo', 'oppo', 'meizu', 'apple', 'oneplus', 'iqoo']
        for(let i=0;i<7;i++){
            let temp=[]
            for(let j=0;j<7;j++){
                temp.push(random.integer(200,8000))
            }
            lineData.push({
                name:pname[i],
                data:temp,
                type:'line'
            })
        }

        return {
            data:lineData,
            status:0
        }
    },

    //柱状图数据
    getCategoryData:()=>{
        let date=['周一','周二','周三','周四','周五','周六','周日']
        let data=[]
        let random=Mock.Random
        for(let i=0;i<7;i++){
            data.push({
                date:date[i],
                new:random.integer(10,50),
                active:random.integer(300,700)
            })
        }

        return data
    },

    //饼图数据
    getPieData:()=>{
        let data=[]
        let name=['xiaomi', 'vivo', 'oppo', 'meizu', 'apple', 'oneplus', 'iqoo']
        let random=Mock.Random
        for(let i = 0;i<name.length;i++){
            data.push({
                name:name[i],
                value:random.integer(2000,6000)
            })
        }

        return data
    }
}