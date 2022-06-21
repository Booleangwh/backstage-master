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
          <el-form>
            <el-input placeholder="商品名称" v-model="pagination.Prouduct_Name" style="width: 200px;padding: 5px" clearable></el-input>
            <el-button type="primary" class="butT" @click="getAll()">查询</el-button>
            <el-button @click="resetSearch()" class="dalfBut">清空</el-button>
        </el-form>
    <el-table style="width: 100%" border :data="list" >
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="width">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="width">
      </el-table-column>
<!--      <el-table-column  label="Sku库存" width="80">-->
<!--        <el-button type="primary" icon="el-icon-edit" circle @click="SkueditOpen()"></el-button>-->
<!--      </el-table-column>-->
      <el-table-column prop="info" label="商品信息" width="width">

      </el-table-column>
      <el-table-column prop="status" label="是否上架" width="70px">
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
      <el-table-column prop="prop" label="操作" width="width" fixed="right">
        <template slot-scope="{row}">
          <el-button
                  type="success"
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
            :pager-count="900"
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
            title="编辑商品"
            :visible.sync="dialogFormVisible"
    >
      <!-- form表单 :model属性，这个属性的作用是,把表单的数据收集到那个对象的身上 ，将来表单验证，也需要这个属性-->
      <el-form style="width: 80%" :model="DataForm" :rules="rules" ref="ruleForm" label-position="right" label-width="100px">
        <el-row>
          <el-col :span:="12">
            <el-form-item label="商品名称"  prop="pro_Name">
              <el-input v-model="DataForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
            <el-form-item label="商品价格:￥"  prop="pro_Price"l>
              <el-input v-model="DataForm.price"/>
            </el-form-item>
        <el-form-item label="商品详情"  prop="pro_Price"l>
          <el-input v-model="DataForm.info"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Update()">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
            title="编辑货品信息"
            :visible.sync="dialogFormVisibleEdit"
            append-to-body="true"
    >
        <el-row>
          <el-col :span="7">
            <el-input placeholder="按sku序号搜索" v-model="pagination.name" size="small" style="width: 200px ;">
              <el-button slot="append" icon="el-icon-search" @click=""></el-button>
            </el-input>
          </el-col>
        </el-row>
       <el-table
        :data="SkuList"
        border
        style="float: right"
       >

         <el-table-column type="index" label="序号" width="width" align="center">
         </el-table-column>
         <el-table-column prop="key" label="颜色" width="width">
         </el-table-column>
         <el-table-column prop="value" label="尺码" width="width">
         </el-table-column>
<!--         <el-table-column prop="price" label="商品价格" width="width">-->
<!--         </el-table-column>-->
<!--         <el-table-column prop="info" label="商品信息" width="width">-->
<!--         </el-table-column>-->

       </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Update()">确 定</el-button>
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
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
      return {
        //列表展示的数据
        list: [],
        //sku列表
        SkuList:[],
        //对话框显示与隐藏控制的属性
        dialogFormVisible: false,
        //Sku弹层
        dialogFormVisibleEdit:false,
        //弹层表单数据
        DataForm: {},
        //Sku弹层
        SkuForm: {},
        pagination: {//分页相关模型数据
          //当前页
          page: 1,
          //页数
          limit: 10,
          //总共数据条数
          total: 50,
          Product_Name: "",
          Product_Id: "",
          Product_Price:"",
          Product_Info:"",
          Product_Amount:"",
          Product_Status: "",
          Sku_Name:"",
          Sku_Price:"",
          Sku_amount:""
        },
        //表单验证规则
        rules: {
          Product_Name: [
            { required: true, message: '请输入商品名', trigger: 'blur' },
          ],
          Product_Price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
        },
      };
    },
    //组件挂载完毕发请求
    mounted() {
      //获取列表数据方法
      this.getAll();
      // this.getAllSku();
    },
    computed:{
      fulldata(){
        return this.SkuList.filter(()=>{

        })
      }
    },
    components:{
      SiderBar,
      Header,
      Breadcrumb
    },
    filters:{
        Search(listData){
          return listData.filter(function (item) {
            if(item.name !== null){
              return item;
            }
          })
        }

    },
    methods: {
      getAll(){
        //{}内为传过来的参数名
       let param ="?name="+this.pagination.Prouduct_Name;
        param +="&price="+this.pagination.Product_Price;
        param +="&info="+this.pagination.Product_Info;
        param +="&status="+this.pagination.Product_Status;
        this.getRequest("/product/"+this.pagination.page+"/"+this.pagination.limit+param).then((res)=>{

          console.log(JSON.parse(res.data.records[0].attribute_list))
            this.pagination.limit=res.data.size;
            this.pagination.page=res.data.current;
            this.pagination.total=res.data.total;
            this.list=res.data.records;


            // this.pagination.status=res.data.records[0].status;
        })
      },
      //获取Sku列表的数据
      getAllSku(){


      },
      //当分页器某一页需要展示数据条数发生变化的时候会触发
      handleSizeChange(limit) {
        //整理参数
        this.pagination.limit = limit;
        this.getAll();
      },

      //修改弹出
      updateTradeMark(row){
        this.getRequest("/product/getbyid/"+row.id).then((res)=>{
          // if (res.data.data!=null){
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
      //修改列表数据
      Update(){
        this.$confirm("此操作将永久修改这段数据，是否继续？","提示",{cancelButtonText:"取消",confirmButtonText:"确定",type: "info"}).then(()=>{
          this.putRequest("/product/updateall",this.DataForm).then((res)=>{
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
                 this.deleteRequest("/product/deletebyid/"+row.id,).then((res)=>{
                    this.$message.success("删除成功")
                   this.getAll()
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
      //清空input
      resetSearch() {
        this.pagination.Prouduct_Name = ''
        this.getAll()
      },

      change(row){
          this.putRequest("/product/updateall", row).then((res) => {


          })

      },
      //Sku弹窗获取数据
      SkueditOpen(){
          this.getRequest("/product/skugetall").then((res)=>{
            this.dialogFormVisibleEdit = true;
            // console.log(res.id)
            for (let i=0;i<res.length;i++) {
              let size = JSON.parse(res[i].attribute_list).size;
              let color = JSON.parse(res[i].attribute_list).color;
              let news = size.concat(color)
              let newdata = [{key: news[3], value: news[0]}]
              this.SkuList = newdata;
            }
          })

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
