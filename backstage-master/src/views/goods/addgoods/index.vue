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
      <el-form-item label="创建时间:">
            <div  style="font-weight: bold">系统自定</div>
        </el-form-item>
      <el-form-item label="商品名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="创建具体信息">
        <el-input v-model="form.info" type="textarea" />
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
  import axios from "axios"
  import SiderBar from "../../../compnent/SiderBar";
  import Header from "../../../compnent/Header";
  import Breadcrumb from "../../../compnent/Breadcrumb/Breadcrumb";
export default {
    name:"addgoods",
  data() {
    return {
      form: {
        ProductName: '',
        ProductTitle: '',
        date1: '',
        date2: '',
        ProductPrice: '',
        ProductDesc: '',
        //选中商品分类属性
        selectProductValue: [],
        //类型选项
        productOptions: [],
        //产品图片
        productPic:''
      }
    }
  },
  components:{
    SiderBar,
    Header,
    Breadcrumb
  },
  mounted(){

  },
  methods: {
      //点击创建
    onSubmit() {
      this.postRequest("/product/add",this.form).then((res)=>{
        // if (res.data.flag=true){
        console.log(this.form)
          this.$message({
            message: '创建成功!',
            type: "success"
          })
          // this.$router.push("/tablegoods")
        // }else {
        //   this.$message({
        //     message: '有待填选项!',
        //     type: "error"
        //   })
        // }
      })


    },
    //点击取消
    onCancel() {
      this.$message({
        message: '取消成功!',
        type: 'warning'
      })
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      //res：上传成功之后返回前端数据
      //file:上传成功之后服务器返回前端数据
      //收集品牌图片数据，因为将来需要带给服务器
      this.form.productPic = res.data;
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .avatar-uploader  {
    width: 180px;
    height: 180px;
    border: 1px dashed gray;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

