<template>
 <div>
    <transition name="el-fade-in">
     <div class="loginBody" v-show="show">
      <div class="loginDiv">
       <div class="loginContent">
        <h1 class="loginTitle">欢迎使用优效源占位系统</h1>
         <el-form :model="loginForm" label-width="100px" :rules="rules" ref="loginForm">
           <el-form-item label-width="60px" label="账号" prop="account">
              <el-input   prefix-icon="el-icon-user"  placeholder="请输入账号" type=“text” v-model="loginForm.account" auto-complete="false" size="small"  @keyup.enter.native="login"></el-input>
          </el-form-item>
           <el-form-item label-width="60px" label="密码" prop="password" >
              <el-input   prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" v-model="loginForm.password" show-password auto-complete="false" size="small" @keyup.enter.native="login" ></el-input>
          </el-form-item>
           <el-button  class="lButton" type="primary" @click="login" :aria-disabled="confirm_disabled">确定</el-button>
           <el-button  class="rButton" type="primary" @click="getBack" :aria-disabled="confirm_back">返回</el-button>
        </el-form>
      </div>
      </div>
     </div>
    </transition>
  </div>

</template>
<script>
  export default {
   name: "inDex",
  data(){
    return{
      show:false,
      confirm_disabled:false,
      confirm_back:false,
      loginForm:{
        account:'',
        password:''
      },
      rules:{
        account:[{
          required:true,message:"请输入账号",trigger:'blur'
        }],
        password:[{
          required:true,message:"请输入密码",trigger:'blur'
        }]
      }
    }
  },
  methods:{
    login(){
      console.log(this.show)
      if(this.loginForm.account==''){
        this.$message({
          message:"账号不能为空",
          type:"error",
          duration:1000
        })
        return;
      }
      if (this.loginForm.password=='')
      {
        this.$message({
          message:"密码不能为空",
          type:"error",
          duration:1000
        })
        return;
      }
      this.$axios({
           method:"post",
           url: "http://localhost:8081/Login",
           params:{
             account:this.loginForm.account,
             password:this.loginForm.password
           }
      }).then(res=>{//成功
        console.log(res);
        if(res.data.status==200){
          this.$message({
            message:"登录成功",
            type:"success",
            duration:1000
          })
             localStorage.setItem("student",JSON.stringify(res.data.data));//存到本地
             this.$router.replace("/yxy/main")//学生
        }
        else {
          this.$message({
            message:res.data.errorMsg,
            type:"error",
            duration:1000
            })
        }
      }).catch(err=>{//失败
         console.log(err);
          this.$message({
          message:"当前连接存在问题",
          type:"error",
          duration:1000
        })
      })

    },
    getBack(){
       this.$router.back();
    }
  },

  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 500)
    window.onblur=function (){
      document.title="快回来！";
    }
    window.onfocus=function (){
      document.title = "优效源登录";
    }
    document.getElementsByTagName('link')[0].setAttribute('href','logo.png')
  }

}
</script>

<style lang="css" scoped>
.loginBody{
  position:absolute;
  width: 100%;
  height: 100%;
  background-color: #B3C0D1;
  background-size: cover;
  transition-duration: 500ms;
  color: #B3C0D1;
}
.loginDiv{
  position: absolute;
  top:50%;
  left:50%;
  margin-top: -200px;
  margin-left: -250px;
  /*right: 400px;*/
  width: 450px;
  height: 300px;
  background: rgba(255, 255, 255, 0.7);
  /*rgba(78, 48, 48, 0.42);*/
  border-radius: 5%;
  border-style: solid;
}
.loginTitle{
  margin-left: 11%;
  text-align: center;
  font-size: 30px;
  color: rebeccapurple;
}
.loginContent{
  width: 400px;
  height: 250px;
  position: absolute;
  top:25px;
  left: 25px;
}
.rButton{
  right: 10px;
  position: absolute;
}
.lButton{
  left: 60px;
  position: absolute;
}
</style>
