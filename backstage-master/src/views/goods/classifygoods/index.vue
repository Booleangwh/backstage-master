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
          <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets" style="margin-top: 5px"></i>
            <span style="margin-top: 5px">数据列表</span>
            <el-button
                    class="btn-add"
                    @click="addProductCategory()"
                    size="mini">
              添加
            </el-button>
          </el-card>
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="编号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="name" label="分类名称" width="width">
      </el-table-column>
      <el-table-column prop="level" label="级别" width="80">
      </el-table-column>
      <el-table-column prop="status" label="是否显示" width="70px">
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#D3D3D3"
                  :active-value="1"
                  :inactive-value="0"
                  @change="change(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="setting" label="设置" width="150px" >
        <template slot-scope="scope">
        <el-button
        type="primary"
        size="mini"
        @click="Routernextlevel(scope.$index,scope.row)"
        :disabled="scope.row.level==3"
        >查看下级</el-button>
        </template>
      </el-table-column>

      <el-table-column  label="操作" width="width">
        <template slot-scope="{row}">
          <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  @click="updateTradeMark(row)"
          >修改</el-button
          >
          <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteTradeMark(row)"
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
          <div class="pagination-container">

            <el-pagination
                    class="pagiantion"

                    @current-change="handleCurrentChange"

                    :current-page="pagination.page"

                    :page-size="pagination.limit"

                    layout="total, prev, pager, next, jumper"

                    :total="pagination.total">

            </el-pagination>

          </div>
    <!--
      对话框
      :visible.sync:控制对话框显示与隐藏用的
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
    -->
    <el-dialog
            title="编辑商品"
            :visible.sync="dialogFormVisible"
            append-to-body="true"
    >
      <!-- form表单 :model属性，这个属性的作用是,把表单的数据收集到那个对象的身上 ，将来表单验证，也需要这个属性-->
      <el-form style="width: 80%" :model="DataForm"  ref="ruleForm" label-position="right" label-width="100px">
        <el-row>
          <el-col :span:="12">
            <el-form-item label="分类名称"  prop="pro_Name">
              <el-input v-model="DataForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span:="12">
            <el-form-item label="级别"  prop="pro_Tittle">
              <el-input v-model="DataForm.level"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Updatecategorygoods()">确 定</el-button>
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
    name: "classifygoods",
    data() {
      return {
        value:true,
        //列表展示的数据
        list: [

        ],
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
          //分类名
          name:"",
          //分类显示
          status:"",
          //级别
          level: ""
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
       let param ="?name="+this.pagination.name;
        param +="&status="+this.pagination.status;
        param +="&level="+this.pagination.level;
        console.log(param)
        this.getRequest("/product-category/"+this.pagination.page+"/"+this.pagination.limit+param).then((res)=>{
          console.log(res.data)
            this.pagination.limit=res.data.size;
            this.pagination.page=res.data.current;
            this.pagination.total=res.data.total;
            this.list=res.data.records;
        })
      },
      //添加商品分类
      addProductCategory(){
        this.$router.push("/addcategory")
      },

      change(row){
        this.putRequest("/product-category", row).then((res) => {
          // if (row.status=1){this.$message.success('上架成功')}
          // else if (row.status=0){this.$message.success('下架成功')}

        })
      },
      //当分页器某一页需要展示数据条数发生变化的时候会触发
      handleCurrentChange(currentPage) {
        //修改当前页码值为所选页码
        this.pagination.currentPage=currentPage;
        //查询当前页码下的数据
        this.getAll();
      },

      //修改打开
      updateTradeMark(row){
        this.getRequest("/product-category/getbyid/"+row.id).then((res)=>{
          // if (res.data.flag&&res.data.data!=null){
            this.dialogFormVisible=true;
            this.DataForm=row;
          // }
          // else{
          //   this.$message.error("数据有误，页面将在3秒后刷新");
          //   window.setInterval(function () {
          //     window.location.reload()
          //   },3000)
          // }
        });
      },
      //修改确定
      Updatecategorygoods(){
        this.$confirm("此操作将永久修改这段数据，是否继续？","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type: "info"}).then(()=>{
          this.putRequest("/product-category",this.DataForm).then((res)=>{
            this.$message.success("修改成功！")
            this.dialogFormVisible=false;
          })
      })
      },
      //删除操作
      deleteTradeMark(row) {
        //弹框
        this.$confirm(`你确定删除${row.name}?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
                 this.deleteRequest("/product-category/deletebyid/"+row.id,).then((res)=>{
                            // if(){}
                   this.$message.success("删除成功！")
                   this.getAll()
                   // else{
                   // this.$message.error("服务器错误，删除失败！")
                   // }
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
      //跳级操作
      Routernextlevel(index,row){
        this.getRequest("/product-category/getsecond/"+row.id).then((res)=>{
          this.list=res
        })

      },
    },
  };
</script>


<style>
  .pagination-container{
    float: right;
  }
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
