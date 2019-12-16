<template>
<div style="text-align: center">
    <img src="../../assets/damahou.jpg">
    <div style="margin: 40px;"></div>
       <el-row :gutter="20">
        <el-col :span="8" :offset="8">
         <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref = "formLabelAlign">
              <el-form-item label="名称： " prop="username">
                <el-input v-model="formLabelAlign.username" placeholder="请输入帐号"></el-input>
              </el-form-item>
              <el-form-item label="密码： " prop="password">
                <el-input v-model="formLabelAlign.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
               <el-form-item>
                 <el-button style="width:100%" type="primary" @click="onSubmit('formLabelAlign')">登录</el-button>
               </el-form-item>
        </el-form>
        </el-col>
   </el-row>

    <el-button type="text" @click="dialogVisible = true">注册用户</el-button>

    <el-dialog
        v-loading="loading"
      title="注册用户"
      :visible.sync="dialogVisible"
      width="30%">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules" ref = "formLabelAlign">
              <el-form-item label="名称： " prop="username">
                <el-input v-model="formLabelAlign.username" placeholder="请输入帐号"></el-input>
              </el-form-item>
              <el-form-item label="密码： " prop="password">
                <el-input v-model="formLabelAlign.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser('formLabelAlign')">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>

export default {
    name: 'login',
    data () {
        return {
            labelPosition: 'right',
            loading: false,
            dialogVisible: false,
            formLabelAlign: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ]
            },
        };
    },
    methods: {
        adduser(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        username: this.formLabelAlign.username,
                        password: this.formLabelAlign.password,
                    }
                    this.loading = true
                    this.axios.post('/register',data).then(response => {
                        console.log('发送成狗后！');
                        this.$message('zhuce成功');
                        this.loading = false
                        this.dialogVisible = false
                    }).catch(error => {
                        console.log("请求结果处理出现异常："+ error);
                        this.loading = false

                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })



        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 用户名密码简单验证后添加到axios的auth中
                    let data = {
                        username: this.formLabelAlign.username,
                        password: this.formLabelAlign.password,
                    }
                    // debugger
                    this.axios.post('/login',data).then(response => {
                        console.log('发送成狗后！');
                        console.log(response.status);
                        let data = response.data
                        // 保存token
                        this.$store.commit('set_token', data.data.token)
                        this.$store.commit('set_username', data.data.username)
                        this.$router.push('/')
                    }).catch(error => {
                        console.log("请求结果处理出现异常："+ error);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
    }
}
</script>

