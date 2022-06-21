<template>
    <el-header style="display: flex ;line-height: 50px">
        <span>唯品会后台管理</span>
    <div style="margin-left: 87%;line-height: 50px">

        <el-dropdown @command="handleCommand">
                     <span class="el-dropdown-link" style="font-size: 15px">
                         <span class="el-icon-user"></span>
<!--                                  {{username}}-->
                         <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">主页</el-dropdown-item>
                <el-dropdown-item command="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

    </div>
    </el-header>
</template>

<script>
    import router from "../router";
    export default {
        name: "Header",
        methods:{
            handleCommand(command){
                if (command=="logOut"){

                    this.$confirm('是否确定需要退出登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                        sessionStorage.clear()
                        router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消退出'
                        });
                    });


                }
                if (command=="home"){
                    router.replace("/home")
                }
            }
        }
    }
</script>

<style scoped>

</style>
