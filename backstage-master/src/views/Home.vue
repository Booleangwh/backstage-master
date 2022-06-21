<template >
       <div style="height: 100%">
           <Header></Header>
           <el-container>
               <el-container>
                   <div style="width: 200px">
                      <SiderBar></SiderBar>
                   </div>
                   <el-main id="home">
                       <Breadcrumb></Breadcrumb>
<!--                       <div class="statistics-layout">-->
<!--                           <div class="layout-title">订单统计</div>-->
<!--                           <el-row>-->
<!--                               <el-col :span="4">-->
<!--                                   <div style="padding: 20px">-->
<!--                                       <div>-->
<!--                                           <div style="color: #909399;font-size: 14px">本月订单总数</div>-->
<!--                                           <div style="color: #606266;font-size: 24px;padding: 10px 0">10000</div>-->
<!--                                           <div>-->
<!--                                               <span class="color-success" style="font-size: 14px">+10%</span>-->
<!--                                               <span style="color: #C0C4CC;font-size: 14px">同比上月</span>-->
<!--                                           </div>-->
<!--                                       </div>-->
<!--                                       <div style="margin-top: 20px;">-->
<!--                                           <div style="color: #909399;font-size: 14px">本周订单总数</div>-->
<!--                                           <div style="color: #606266;font-size: 24px;padding: 10px 0">1000</div>-->
<!--                                           <div>-->
<!--                                               <span class="color-danger" style="font-size: 14px">-10%</span>-->
<!--                                               <span style="color: #C0C4CC;font-size: 14px">同比上周</span>-->
<!--                                           </div>-->
<!--                                       </div>-->
<!--                                       <div style="margin-top: 20px;">-->
<!--                                           <div style="color: #909399;font-size: 14px">本月销售总额</div>-->
<!--                                           <div style="color: #606266;font-size: 24px;padding: 10px 0">100000</div>-->
<!--                                           <div>-->
<!--                                               <span class="color-success" style="font-size: 14px">+10%</span>-->
<!--                                               <span style="color: #C0C4CC;font-size: 14px">同比上月</span>-->
<!--                                           </div>-->
<!--                                       </div>-->
<!--                                       <div style="margin-top: 20px;">-->
<!--                                           <div style="color: #909399;font-size: 14px">本周销售总额</div>-->
<!--                                           <div style="color: #606266;font-size: 24px;padding: 10px 0">50000</div>-->
<!--                                           <div>-->
<!--                                               <span class="color-danger" style="font-size: 14px">-10%</span>-->
<!--                                               <span style="color: #C0C4CC;font-size: 14px">同比上周</span>-->
<!--                                           </div>-->
<!--                                       </div>-->
<!--                                   </div>-->
<!--                               </el-col>-->
<!--                               <el-col :span="20">-->
<!--                                   <div style="padding: 10px;border-left:1px solid #DCDFE6">-->
<!--                                       <el-date-picker-->
<!--                                               style="float: right;z-index: 1"-->
<!--                                               size="small"-->
<!--                                               v-model="orderCountDate"-->
<!--                                               type="daterange"-->
<!--                                               align="right"-->
<!--                                               unlink-panels-->
<!--                                               range-separator="至"-->
<!--                                               start-placeholder="开始日期"-->
<!--                                               end-placeholder="结束日期"-->
<!--                                               @change="handleDateChange"-->
<!--                                               :picker-options="pickerOptions">-->
<!--                                       </el-date-picker>-->
<!--                                       <div>-->
<!--                                           <ve-line-->
<!--                                                   :data="chartData"-->
<!--                                                   :legend-visible="false"-->
<!--                                                   :loading="loading"-->
<!--                                                   :data-empty="dataEmpty"-->
<!--                                                   :settings="chartSettings"></ve-line>-->
<!--                                       </div>-->
<!--                                   </div>-->
<!--                               </el-col>-->
<!--                           </el-row>-->
<!--                       </div>-->

                       <router-view/>
                   </el-main>
               </el-container>
           </el-container>
       </div>



</template>

<script>
    import router from "../router";
    import SiderBar from "../compnent/SiderBar";
    import Header from "../compnent/Header";
    import Breadcrumb from "../compnent/Breadcrumb/Breadcrumb";
    export default {
        name: "Home",
        components: {
            SiderBar,
            Header,
            Breadcrumb
        },
        data() {
            return {
                isCollapse: true
            };
        },
        computed:{
            username(){
                return JSON.parse(window.sessionStorage.getItem("userInfo")).realName;
            },
            routers(){

               return  this.$store.state.routes;
            }

        },
        methods:{
            toProduct(){
                this.$router.push('/tablegoods')
            },

        }


    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .statistics-layout {
        width: 100%;
        height: 600px;
        margin-top: 20px;
        border: 1px solid #DCDFE6;
    }
    .layout-title {
        color: #606266;
        padding: 15px 20px;
        background: #F2F6FC;
        font-weight: bold;
    }
    #home{
        background-image: url("https://img-blog.csdnimg.cn/7a4e4f454b55491a9138a2ac206f1c25.gif");
        background-attachment: fixed;
        background-size: cover;
        z-index:100;
    }
</style>
