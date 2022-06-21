<template>
    <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right" style="padding-bottom: 10px">
        <el-breadcrumb-item > <span @click="back" style="cursor: pointer">返回</span> </el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in levelList" :key="item.router" :to="item.router">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>

</template>

<script>
    export default {
        name: 'Breadcrumb',
        data() {
            return {
                levelList: []
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }

        },
        created() {
            this.getBreadcrumb()
        },
        methods: {
            back() {
                this.$router.go(-1); //返回上一层
            },
            getBreadcrumb() {
                //$route.matched一个数组 包含当前路由的所有嵌套路径片段的路由记录
                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0];
                this.levelList = matched
            }
        }
    }
</script>


<style scoped>

</style>
