<template>
<el-menu
        style="height: 100vh"
        default-active="2"
        class="el-menu-vertical-demo"
        unique-opened
        router>
        <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="/goods">
        <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商品</span>
        </template>
        <el-menu-item-group>
            <el-menu-item  index="tablegoods"><i class="el-icon-menu"></i>商品列表</el-menu-item>
            <el-menu-item index="addgoods" ><i class="el-icon-first-aid-kit"></i>添加商品</el-menu-item>
            <el-menu-item index="classifygoods"><i class="el-icon-s-grid"></i>商品分类</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/authority">
        <template slot="title">
            <i class="el-icon-s-check"></i>
            <span>用户相关</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="userlist"><i class="el-icon-s-custom"></i>角色列表</el-menu-item>
            <el-menu-item index="orderlist"><i class="el-icon-s-shop"></i>商品订单</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
</el-menu>
</template>

<script>
    export default {
        name: "SiderBar"
    }
</script>

<style scoped>

</style>
