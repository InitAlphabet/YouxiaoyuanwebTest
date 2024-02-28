<template>
  <el-container class="contain">
    <el-header ><h1 class="sp">楼层</h1></el-header>
    <el-row class="row1"> <el-button class="button" @click="sel1()">一楼</el-button></el-row>
    <el-row class="row2"> <el-button class="button" @click="sel2()">二楼</el-button></el-row>
    <el-row class="row3"> <el-button class="button" @click="sel3()">三楼</el-button></el-row>
  </el-container>
</template>
<script>
export default {
  name: "mainWindow",
  methods:{
    sel1(){
         this.$router.replace('/yxy/floor1');
    },
    sel2(){
         this.$router.replace('/yxy/floor2');
    },
    sel3(){
         this.$router.replace('/yxy/floor3');
    }
  },
  mounted() {
    if(localStorage.getItem('student')==null){
      this.$router.replace("/login");
    }
  document.title="请开始你的选择"
  }
}
</script>
<style scoped>
.contain{
  margin-left: 30%;
  width: 40%;
  margin-bottom: 20%;
  height: 80%;
  background: whitesmoke;
}
.sp{
  width: 100%;
  text-align: center;
}

.button{
  width: 92%;
  height: 100%;
  margin-left: 5%;
  background-color:rgba(255,128,64,1);
}
.row1{
  height: 20%;
}
.row2{
  top:3%;
  height: 20%;
}
.row3{
  top:6%;
  height: 20%;
}
</style>