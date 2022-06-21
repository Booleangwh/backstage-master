<template>
    <div class="app-container">
        <Header style="background-color: rgb(179,192,209)"></Header>
        <el-container>
            <el-container>
                <div style="width: 200px">
                    <SiderBar></SiderBar>
                </div>
                <el-main style="background-color: white">
                    <Breadcrumb></Breadcrumb>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="产品编号:">
                            <div  style="font-weight: bold">系统自定</div>
                        </el-form-item>
                        <el-row>
                        <el-col :span="10">
                        <el-form-item label="分类名称" prop="name">
                            <el-input v-model="form.name" />
                        </el-form-item>
                        </el-col>
                            <el-col :span="10">
                                <el-form-item label="类别等级" prop="level">
                                    <el-input v-model="form.level" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="是否显示">
                                <template slot-scope="scope">
                                    <el-switch
                                            v-model="scope.row.status"
                                            active-color="#13ce66"
                                            inactive-color="#D3D3D3"
                                            :active-value="1"
                                            :inactive-value="0"
                                            @change="change(scope.row)">
                                    </el-switch>
                                </template>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" style="width: 200px">创建</el-button>
                            <el-button @click="onCancel" style="width: 200px">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import SiderBar from "../../../../compnent/SiderBar";
    import Header from "../../../../compnent/Header";
    import Breadcrumb from "../../../../compnent/Breadcrumb/Breadcrumb";
    export default {
        name: "addcategory",
        data() {
            return {
                form: {
                },
                CategoryName: '',
                level: '',
                status:'',
            }
        },
        components:{
            SiderBar,
            Header,
            Breadcrumb
        },
        // mounted(){
        //
        // },
        methods: {
            //点击创建
            onSubmit() {
                this.postRequest("/product-category/add",this.form).then((res)=>{
                    // if (res.data.flag=true){
                        this.$message({
                            message: '创建成功!',
                            type: "success"
                        })
                    this.$router.go(-1)
                    // }else {
                    //     this.$message({
                    //         message: '有待填选项!',
                    //         type: "error"
                    //     })
                    // }
                })


            },
            //点击取消
            onCancel() {
                this.$message({
                    message: '取消成功!',
                    type: 'warning'
                })
                this.$router.go(-1);
            },
            change(row){
                this.putRequest("/product-category",row).then((res) => {
                    console.log(row.status)
                })

            },

        }
    }
</script>

<style scoped>

</style>
