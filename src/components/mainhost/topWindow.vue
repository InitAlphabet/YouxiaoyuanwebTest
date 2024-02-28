<template>
  <div style="display: flex; line-height: 60px">
<!--    <div>-->
<!--      <i class="el-icon-s-fold" style="font-size: 20px; " @click="collapse"></i>-->
<!--    </div>-->
    <div class="titleStyle">
      <span style="font-size:60px"> 优 效 源 占 位</span>
    </div>

      <el-dropdown class="buttSt1">
       <span class="el-dropdown">切换<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUser">首页</el-dropdown-item>
        <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "topWindow",
  methods:{
    toUser(){
      console.log('to user');
      if(window.location.pathname=="/yxy/main")
        window.location.reload();
      else
        this.$router.replace('/yxy/main');

    },
    logOut(){
      console.log('log out');
      this.$router.replace('/login');
      localStorage.removeItem('student');
      sessionStorage.clear();
    },
    collapse(){
      this.$emit('doCollapse')
    }
  }
  ,
  mounted() {

  }
}
</script>

<style scoped>
.titleStyle{
  background-image: radial-gradient(circle, blue, rgba(198, 227, 219, 0.93));
  -webkit-background-clip: text;
  color: transparent;

  flex: 1; text-align: center;
  /*color: rgba(252,226,0,0.85);*/
  font-family: 华文行楷;
}
.button1{
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  border-style: unset;
}
.titleSt1{
  font-size:  40px;
  color: cornflowerblue;
  font-weight: bold;
  display: block;
  width: 400px;
  position: absolute;
  left: 40%;
}
.buttSt1{
  //position: absolute;
  height: 40px;
  width: 70px;
  top:10px;
  border-radius: 5px;
  background-color: transparent;
  right: 5px;
  cursor: pointer;
  border-style: unset;
  /*修改指向标签*/
}
.spanClass{
  font-size: 15px;
  margin-right: 2%;
  top:2px;
  color: #489dcf;
}
</style>