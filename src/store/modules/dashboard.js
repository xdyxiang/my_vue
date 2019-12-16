const dashboard = {
    state: {
        name:"laochiji",
        currentDate: new Date(),
        mydata:[{
            id:"1",
            psrc:require("@/assets/p1.jpg"),
            desc:"这是一只鸡，好吃的鸡"
        }]

    },
    mutations: {
        SET_MYDATA:(state, mydata) => {
            state.mydata = mydata
        }
    },
    actions: {
        MydataAction_delete({ commit },id){
            for (let j = 0, len = this.state.dashboard.mydata.length; j < len; j++) {
                if (this.state.dashboard.mydata[j].id === id) {
                    this.state.dashboard.mydata.splice(j,1)  //从下标j开始删除1个，不替换
                    console.log(this.state.dashboard.mydata)
                    commit('SET_MYDATA',this.state.dashboard.mydata)
                    return
                }
            }
        },
        MydataAction_init({commit}){
            let newdata = [{
                id:"1",
                psrc:require("@/assets/p1.jpg"),
                desc:"这是一只鸡，好吃的鸡"
            },
            {
                id:"2",
                psrc:require("@/assets/p2.jpg"),
                desc:"caixukun，你的球技真好！"
            },
            {
                id:"3",
                psrc:require("@/assets/p3.jpg"),
                desc:"加油！996"
            },
            {
                id:"4",
                psrc:require("@/assets/p4.jpg"),
                desc:"美丽的海滩，让他存在于梦境，没空，没钱！"
            }]
            commit('SET_MYDATA',newdata)
        }
    }
}

export default dashboard
