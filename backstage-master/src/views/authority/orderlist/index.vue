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
          <el-form v-model="Search">
            <el-input placeholder="订单号" v-model="pagination.Order_code" style="width: 200px;padding: 5px"></el-input>
            <el-input placeholder="收货人" v-model="pagination.Order_reciever" style="width: 200px;padding: 5px"></el-input>
            <el-button type="primary" class="butT" @click="getAll()">查询</el-button>
            <el-button @click="resetSearch()" class="dalfBut">清空</el-button>
          </el-form>
          <el-table style="width: 100%" border :data="list" height="500px">
            <el-table-column type="index" label="序号" width="80px" align="center" fixed>
            </el-table-column>
            <el-table-column prop="order_code" label="订单号" width="width">
            </el-table-column>
            <el-table-column prop="order_reciever" label="收货人" width="70px">
            </el-table-column>
            <el-table-column prop="order_mobile" label="手机号" width="width">
            </el-table-column>
            <el-table-column prop="order_statu" label="支付状态" width="width" >
              <template slot-scope="scope">{{scope.row.order_statu | formatPayType}}</template>
            </el-table-column>
            <el-table-column prop="order_paytime" label="支付时间" width="width">
            </el-table-column>
            <el-table-column prop="product_price" label="总价" width="width">
            </el-table-column>

            <el-table-column fixed="right" prop="prop" label="操作" width="180px" >
              <template slot-scope="{row}">
                <el-button
                        type="primary"
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
          <el-pagination
                  style="margin-top: 20px; text-align: center"
                  :current-page="pagination.page"
                  :total="pagination.total"
                  :page-size="pagination.limit"

                  :page-sizes="[3, 5, 10]"
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
                  title="编辑订单"
                  :visible.sync="dialogFormVisible"
                  append-to-body="true"
          >
            <!-- form表单 :model属性，这个属性的作用是,把表单的数据收集到那个对象的身上 ，将来表单验证，也需要这个属性-->
            <el-form style="width: 80%" :model="DataForm" :rules="rules" ref="ruleForm" label-position="right" label-width="100px">
              <el-row>
                <el-col :span:="8">
                  <el-form-item label="订单号"  prop="order_code">
                    <el-input v-model="DataForm.order_code"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span:="8">
                  <el-form-item label="收货人"  prop="order_reciever">
                    <el-input v-model="DataForm.order_reciever"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-form-item label="手机号"  prop="order_mobile">
                    <el-input v-model="DataForm.order_mobile"/>
                  </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="10">
              <el-form-item label="支付状态"   prop="order_statu">
                <el-input v-model="DataForm.order_statu"/>
              </el-form-item>
                </el-col>
                <el-col :span="10">
                  <span style="text-align: center;font-size: 12px;color: red">*(状态码 1 为已支付，2 为待支付，默认为未支付)</span>
                </el-col>
              </el-row>
              <el-form-item label="支付时间"   prop="order_paytime">
                <el-input v-model="DataForm.order_paytime"/>
              </el-form-item>
              <el-form-item label="订单总价"   prop="product_price">
                <el-input v-model="DataForm.product_price"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="Update()">确 定</el-button>
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
    name: "tablegoods",
    data() {
      //自定义校验规则

      return {
        value:true,
        //列表展示的数据
        list: [],
        Search:[],
        //对话框显示与隐藏控制的属性
        dialogFormVisible: false,
        //弹层表单数据
        DataForm: {},
        pagination: {//分页相关模型数据
          //当前页
          page: 1,
          //页数
          limit: 3,
          //总共数据条数
          total: 50,
          Order_code: "",
          Order_reciever: "",
          Order_mobile:"",
          Order_createtime:"",
          Order_paytime:"",
          Order_statu: "1",
          Product_Price:""
        },
        //表单验证规则
        rules: {


        },
      };
    },
    //组件挂载完毕发请求
    mounted() {
      //获取列表数据方法
      this.getAll();
    },
    components:{
      SiderBar,
      Header,
      Breadcrumb
    },
    filters:{
      formatPayType(value) {
        console.log(value)
        if (value === 1) {
          return '已支付';
        } else if (value === 2) {
          return '待支付';
        } else {
          return '未支付';
        }
      },
    },
    methods: {
      //获取品牌列表的数据
      getAll(){
        //{}内为传过来的参数名
      let  param ="?order_code="+this.pagination.Order_code;
        param +="&order_reciever="+this.pagination.Order_reciever;
        param +="&order_mobile="+this.pagination.Order_mobile;
        param +="&order_createtime="+this.pagination.Order_createtime;
        param +="&order_paytime="+this.pagination.Order_paytime;
        param +="&product_price="+this.pagination.Product_Price;

        this.getRequest("/order/"+this.pagination.page+"/"+this.pagination.limit+param).then((res)=>{
          // console.log(res.data)
          this.pagination.limit=res.data.size;
          this.pagination.page=res.data.current;
          this.pagination.total=res.data.total;
          this.list=res.data.records;

        })
      },
      //当分页器某一页需要展示数据条数发生变化的时候会触发
      handleSizeChange(limit) {
        //整理参数
        this.pagination.limit = limit;
        this.getAll();
      },

      //修改
      updateTradeMark(row){
        this.getRequest("/order/getbyid/"+row.id).then((res)=>{
          // if (res.data.flag&&res.data.data!=null){
          this.dialogFormVisible=true;
          this.DataForm=row;
          console.log(this.DataForm)
          // }
          // else{
          //   this.$message.error("数据有误，页面将在3秒后刷新");
          //   window.setInterval(function () {
          //     window.location.reload()
          //   },3000)
          // }
        });
      },
      //确认修改
      Update(){
        this.$confirm("此操作将永久修改这段数据，是否继续？","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type: "info"}).then(()=>{
          this.putRequest("/order",this.DataForm).then((res)=>{
            this.$message.success("修改成功！")
            this.dialogFormVisible=false;
            this.getAll()
          })
        }).finally(()=>{
          this.DataForm={};
        });
      },
      //删除操作
      deleteTradeMark(row) {
        console.log(row)
        //弹框
        this.$confirm(`你确定删除这条订单号${row.order_code}吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.deleteRequest("/order/deletebyid/"+row.id,).then((res)=>{
            this.getAll();
            this.$message.success("删除成功！")
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
      resetSearch() {
        this.pagination.Order_reciever=''
        this.pagination.Order_code=''
        this.getAll()
      },
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
