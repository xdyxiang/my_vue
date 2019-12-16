<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1"><a href="/">首页</a></el-menu-item>
                <el-submenu index="2">
                    <template slot="title"><router-link to="/dashboard">我的工作台</router-link></template>
                    <el-menu-item index="2-1"><router-link to="/dashboard/index">dashboard</router-link></el-menu-item>
                    <el-menu-item index="2-2"><router-link to="/form/index">form</router-link></el-menu-item>
                    <el-menu-item index="2-3"><router-link to="/pet/index">pet</router-link></el-menu-item>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.baidu.com" target="_blank">不懂就百度</a></el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <div class="hello" style="text-align: center">
                <img src="../assets/wotaonihouzi.jpg">
                <h1>{{ msg }}</h1>
                <el-row :gutter="20">
                    <el-col :span="8" :offset="8">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>{{userinfo.username}}</span>
                                <el-button style="float: right; padding: 3px 0" type="primary"
                                           @click="dialogVisible = true">账号退出
                                </el-button>
                                <el-button v-if="edit" style="float: right; padding: 3px 0;margin-right: 10px"
                                           type="primary" @click="adit_userinfo()">确认修改
                                </el-button>
                                <el-button v-else style="float: right; padding: 3px 0;margin-right: 10px" type="primary"
                                           @click="edit = true">修改信息
                                </el-button>
                            </div>
                            <template v-if="edit">
                                <el-input class="text item" size="small" v-model="userinfo.remark"
                                          placeholder="个人备注"></el-input>
                                <el-input class="text item" size="small" v-model="userinfo.age"
                                          placeholder="年龄"></el-input>
                                <el-input class="text item" size="small" v-model="userinfo.email" placeholder="电子邮件"/>
                            </template>
                            <template v-else>
                                <div class="text item">{{'个人介绍： ' + userinfo.remark }}</div>
                                <div class="text item">{{'年龄：' + userinfo.age }}</div>
                                <div class="text item">{{'电子邮件： ' + userinfo.email}}</div>
                            </template>
                            <el-dialog
                                title="提示"
                                :visible.sync="dialogVisible"
                                width="30%">
                                <span>是否要退出？</span>
                                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="loginout()">确 定</el-button>
              </span>
                            </el-dialog>
                        </el-card>

                    </el-col>
                </el-row>
                <!--<myindex :dialogVisible=dialogVisible tittle="账号退出" word="确定要退出用户吗" type="1" @fatherfun="loginout"></myindex>-->
            </div>
        </el-main>
        <el-footer>
            <el-row :gutter="20" style="margin-top: 60px;margin-left: 220px">
              <el-col :span="6" style="text-align: left;">
                  <h3 class="grid-content bg-purple" style="margin: 10px">公告：</h3>
                  <div class="grid-content bg-purple" style="padding: 10px">1.安图恩</div>
                  <div class="grid-content bg-purple" style="padding: 10px">2.卢克</div>
                  <div class="grid-content bg-purple" style="padding: 10px">3.超时空</div>
              </el-col>
            <el-col :span="6" style="text-align: left;">
                  <h3 class="grid-content bg-purple" style="margin: 10px">套装：</h3>
                  <div class="grid-content bg-purple" style="padding: 10px">1.90A</div>
                  <div class="grid-content bg-purple" style="padding: 10px">2.90b</div>
                  <div class="grid-content bg-purple" style="padding: 10px">3.95A</div>
              </el-col>
              <el-col :span="6" style="text-align: left;">
                  <h3 class="grid-content bg-purple" style="margin: 10px">ZHUBO：</h3>
                  <div class="grid-content bg-purple" style="padding: 10px">1.老调</div>
                  <div class="grid-content bg-purple" style="padding: 10px">2.李永</div>
                  <div class="grid-content bg-purple" style="padding: 10px">3.大蛤蟆</div>
              </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
import mypage from './mypage'
import {mapGetters} from 'vuex'

export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            dialogVisible: false,
            edit: false,
            activeIndex: '1'
        }
    },
    created () {
        this.get_user()
        console.log(this.userinfo)
    },
    components: {
        mypage
    },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'userinfo',
            'dialog'
        ]),
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        get_user () {
            this.axios.get('/get_userinfo').then(response => {
                let res = response.data.data
                this.$store.commit('set_userinfo', res)
            }).catch(error => {
                console.log('获取不到数据!')
            }
            )
        },
        adit_userinfo () {
            this.axios.post('/adit_userinfo', this.userinfo).then(response => {
                let res = response.data.data
                this.$store.commit('set_userinfo', res)
                this.$message('修改成功')
            }).catch(error => {
                this.$message('修改失败')
            })
            this.edit = false
        },
        loginout () {
            this.$store.commit('del_token')
            this.$router.push('/login')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }

</style>
