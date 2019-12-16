const user = {
    state: {
        name: '卢克',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roles: [],
        token: '',
        userinfo:{
            username:"",
            remark:"",
            age:"",
            email:""
        }
    },
    mutations: {
        set_token(state, token) {
            state.token = token
            localStorage.token = token
        },
        set_username(state, username) {
            state.username = username
            localStorage.username = username
        },
        del_token(state) {
            state.token = ''
            localStorage.removeItem('token')
            localStorage.removeItem('username')
        },
        set_userinfo(state,userinfo){
            state.userinfo.username = userinfo.username
            state.userinfo.remark = userinfo.remark
            state.userinfo.age = userinfo.age
            state.userinfo.email = userinfo.email
        }
    }
}

export default user
