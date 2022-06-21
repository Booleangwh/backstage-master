<template>
  <div>
    <Header style="background-color: rgb(179,192,209)"></Header>
    <!--
         表格组件
         data:表格组件将来需要展示的数据------数组类型
         border：是给表格添加边框
         column属性
         label：显示标题
         width：对应列的宽度
         align：标题的对齐方式
         prop:对应列内容的字段名
         注意1：elmentUI当中的table组件，展示的数据是以一列一列进行展示数据
       -->
    <el-container>
      <el-container>
        <div style="width: 200px">
          <SiderBar></SiderBar>
        </div>
        <el-main>
          <Breadcrumb></Breadcrumb>
          <el-card>

            <div>
              <i class="el-icon-search"></i>
              <span>筛选搜索</span>
              <el-button
                      style="float:right"
                      type="primary"
                      @click="getAll()"
                      size="small">
                查询搜索
              </el-button>
              <el-button
                      style="float:right;margin-right: 15px"
                      @click="resetSearch()"
                      size="small">
                重置
              </el-button>
            </div>
            <div style="margin-top: 15px">
              <el-form :inline="true" :model="pagination.username" size="small" label-width="140px">
                <el-form-item label="输入搜索：">
                  <el-input v-model="pagination.username" class="input-width" placeholder="用户昵称" clearable></el-input>
                </el-form-item>
              </el-form>
            </div>

          </el-card>
          <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets" style="margin-top: 5px"></i>
            <span style="margin-top: 5px">数据列表</span>
<!--            <el-button-->
<!--                    class="btn-add"-->
<!--                    @click="addUserinfo()"-->
<!--                    size="mini">-->
<!--              添加-->
<!--            </el-button>-->
          </el-card>
          <el-table style="width: 100%" border :data="list" current-row-key="id">
            <el-table-column type="index" label="编号" width="80px" align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户昵称" width="width">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="width">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="width">
            </el-table-column>
            <el-table-column prop="real_name" label="真实姓名" width="230px"></el-table-column>

            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{row}">
                <el-button
                        type="warning"
                        icon="el-icon-edit"
                        size="mini"
                        @click="updateuseropen(row)"
                >修改</el-button
                >
                <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="deleteUser(row)"
                >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!--
            分页器
            当前第几页、数据总条数、每一页展示条数、连续页码数
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"

            current-page:代表的是当前第几页
            total：代表分页器一共需要展示数据条数
            page-size：代表的是每一页需要展示多少条数据
            page-sizes：代表可以设置每一页展示多少条数据
            layout：可以实现分页器布局
            pager-count:按钮的数量  如果 9  连续页码是7

          -->
          <el-pagination
                  style="margin-top: 20px; text-align: center"
                  :current-page="pagination.page"
                  :total="pagination.total"
                  :page-size="pagination.limit"
                  :pager-count="10"
                  :page-sizes="10"
                  @current-change="getAll"
                  @size-change="handleSizeChange"
                  layout="prev, pager, next, jumper,->,sizes,total"
          >
          </el-pagination>
          <!--
            对话框
            :visible.sync:控制对话框显示与隐藏用的
            Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
          -->
          <el-dialog
                  title="编辑用户"
                  :visible.sync="dialogFormVisible"
                  append-to-body="true"
          >
            <!-- form表单 :model属性，这个属性的作用是,把表单的数据收集到那个对象的身上 ，将来表单验证，也需要这个属性-->
            <el-form style="width: 80%" :model="DataForm"  ref="ruleForm" label-position="right" label-width="100px">
              <el-row>
                <el-col :span:="12">
                  <el-form-item label="用户名"  prop="username">
                    <el-input v-model="DataForm.username"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span:="12">
                  <el-form-item label="密码"  prop="password">
                    <el-input v-model="DataForm.password"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span:="12">
                  <el-form-item label="真实名"  prop="real_Name">
                    <el-input v-model="DataForm.real_name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span:="12">
                  <el-form-item label="邮箱"  prop="email">
                    <el-input v-model="DataForm.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="Updateuser()">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import SiderBar from "../../../compnent/SiderBar";
  import Header from "../../../compnent/Header";
  import Breadcrumb from "../../../compnent/Breadcrumb/Breadcrumb";
  import {deleteRequest, getRequest} from "../../../utils/api";
  export default {
    name: "userlist",
    data() {
      return {
        value:true,
        //列表展示的数据
        list: [],
        //对话框显示与隐藏控制的属性
        dialogFormVisible: false,
        //弹层表单数据
        DataForm: {},
        pagination: {//分页相关模型数据
          //当前页
          page: 1,
          //页数
          limit: 10,
          //总共数据条数
          total: 0,
          //用户昵称
          username:"",
          password:"",
          //真实姓名
          real_name:"",
          //邮箱
          email:""
        },
        //表单验证规则
        rules: {
          //品牌名称的验证规则
          //require:必须要校验字段（前面五角星有关系）  message 提示信息    trigger:用户行为设置（事件的设置:blur、change）
          CategoryName: [
            { required: true, message: "请输入分类名称", trigger: "blur" },

          ]
        },
      };
    },
    //组件挂载完毕发请求
    created() {
      //获取列表数据方法
      this.getAll();
    },
    components:{
      SiderBar,
      Header,
      Breadcrumb
    },
    methods: {
      //获取列表的数据
      getAll(){
        //{}内为传过来的参数名
       let  param ="?username="+this.pagination.username;
        param +="&password="+this.pagination.password;
        param +="&real_name="+this.pagination.real_name;
        param +="&email="+this.pagination.email;
        // console.log(param)
        this.getRequest("/user/"+this.pagination.page+"/"+this.pagination.limit+param).then((res)=>{
          console.log(res.data)
          this.pagination.limit=res.data.size;
          this.pagination.page=res.data.current;
          this.pagination.total=res.data.total;
          this.list=res.data.records;
        })
      },
      //添加商品分类
      addAdmin(){

      },
      //当分页器某一页需要展示数据条数发生变化的时候会触发
      handleSizeChange(limit) {
        //整理参数
        this.pagination.limit = limit;
        this.username=this.$options.username;
        this.getAll();
      },

      //修改打开
      updateuseropen(row){
        this.getRequest("/user/getbyid/"+row.id).then((res)=>{
          this.dialogFormVisible=true;
          this.DataForm=row;

        });
      },
      //修改确定
      Updateuser(){
        this.$confirm("此操作将永久修改这段数据，是否继续？","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type: "info"}).then(()=>{
          this.putRequest("/user",this.DataForm).then((res)=>{
            this.$message.success("修改成功！")
            this.dialogFormVisible=false;
          })
        })
      },
      //删除操作
      deleteUser(row) {
        //弹框
        this.$confirm(`你确定删除${row.username}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.deleteRequest("/user/deletebyid/"+row.id,).then((res)=>{
            this.$message.success("删除成功！")
          }).finally(()=>{
            this.getAll();
          })
        })
                .catch(() => {
                  //当用户点击取消按钮的时候会触发
                  this.$message({
                    type: "info",
                    message: "已取消删除",
                  });
                });
      },
      //重置
      resetSearch() {
         this.pagination.username=''
        this.getAll()

      },
      //添加
      // addUserinfo(){
      //   this.$router.push("/adduser")
      // }
    },
  };
</script>


<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .btn-add{
    float: right;
  }
</style>

<style scoped>
  .el-row .el-col-5{
    font-size:18px;
    text-align:right;
  }
  .el-col{
    margin:10px 10px;
  }

  >>>.el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>
