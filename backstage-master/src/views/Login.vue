<template>
    <div class="form_out">
        <el-form :model="loginForm" :rules="rules" ref="formName" class="demo-ruleForm"
                 v-loading="loading"
                 element-loading-text="登录中"
                 element-loading-spinner="el-icon-loading"
                 >
            <h3 style="text-align: center">唯品会后台管理员登陆</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" round @click="login('loginForm')" style="width: 100%">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                username:'',
                loginForm: {
                    username: 'admin1',
                    password: '123456',
                    identity:'0',
                },
                check: true,
                loading: false,
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],

                }
            };
        },
        methods: {
            login() {
                this.$refs.formName.validate((valid) => {
                    if (valid) {
                        this.loading=true

                        this.postRequest('/admin/login',this.loginForm).then(data=>{
                            this.loading=false
                            data={
                                    username: 'admin1',
                                    password: '123456',
                                    identity:'0',
                            }



                            if (data!==''&&data!=null){
                                window.sessionStorage.setItem("userInfo", JSON.stringify(data));
                                window.sessionStorage.setItem("token",JSON.stringify(data))
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                this.$router.replace('/home')


                            }
                               else if (data==null){
                                this.$message.error('服务器断开，请联系管理员');

                            }
                            else{

                                this.$message.error('用户名或密码错误');
                            }


                        })

                        return true;

                    } else {
                            this.$message.error('用户名或密码不能为空');



                        return false;
                    }

                });
            },
            resetForm() {
                this.$refs.formName.resetFields();
            }
        }
    }
</script>
<style scoped>
    .form_out {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px;

    }

</style>
