<template>
  <el-container class="contain">
    <el-header class="head"  >
      <span class="topSpan" >你好！用户{{stuAccount}}，   {{locA}}</span>
    </el-header>
    <el-header v-if="timeDown" style="justify-content: center;display: flex;font-size: 20px">
      <div>剩余时间：{{ countdownHour }}:{{ countdownMinute }}:{{ countdownSecond }}</div>
      <el-button style="margin-left: 4%;margin-bottom: 6%;margin-top: -1%" @click="tmpIn">取消暂离</el-button>
    </el-header>
    <el-row class="row1">
      <el-button class="button1" type="warning" @click="tmpAway">暂时离开</el-button>
      <el-button class="button2" type="danger" @click="getAway">完全撤离</el-button>
    </el-row>
    <el-row class="row2"> <el-button class="button" @click="sel()">占座</el-button></el-row>
  </el-container>
</template>
<script>
export default {
  name: "mainWindow",
  data(){
    return{
      selFloor:0,
      selCount:0,
      stuAccount:0,
      stuStatus:0,
      stuTimeStamp:0,
      locA:"当前座位：无",
      timeDown:false,
      now:NaN,
      time:1800000
    }
  },
  created() {
    const update = () => {
      // 也是循环调用自身,这次会在一开始就更新this.now
      this.now = Date.now();
      // requestAnimationFrame接受一个参数，这个参数是一个函数
      // 因为在update里调用requestAnimationFrame(update)，相当于设定下次屏幕刷新前执行一下update
      // 那么下次执行update的时候，又会设置下一帧要调用update
      //更新的事件由API把握
      //requestAnimationFrame在下次屏幕刷新前,所以不同的显示器，刷新率不一样，调用的次数也不同,但是，能保证，每次重绘的时候总是最新的时间
      requestAnimationFrame(update);
    };
    update();
  },
  computed: {
    // 结束时间
    finishTime() {
      //这里并没有用this.now,因为this.now记录的是实时时间
      //这里的是设定的时间+设定的倒计时毫秒数
      return Date.now() + this.time;
      //this.time的变化，触发这个结束的时间，只要this.time不更新，结束时间就不会重新计算，所以结束时间一直固定
    },
    //剩余的毫秒数
    countdown() {
      //倒计时不会小于0，也就是说countdown最小值是0
      return Math.max(0, this.finishTime - this.now);
    },
    // 时
    countdownHour() {
      //padStart是用于补位
      return String.prototype.padStart.call(
          (this.countdown / 3.6e6) | 0,
          2,
          "0"
      );
    },
    // 分
    countdownMinute() {
      return String.prototype.padStart.call(
          ((this.countdown % 3.6e6) / 6e4) | 0,
          2,
          "0"
      );
    },
    // 秒
    countdownSecond() {
      return String.prototype.padStart.call(
          ((this.countdown % 6e4) / 1e3) | 0,
          2,
          "0"
      );
    },
  },
  methods:{
    sel(){
      this.$router.replace('/yxy/sel')
    },
    tmpIn(){
      this.$axios({
        url:"http://47.108.251.147:8081/floor/tmpin",
        method:"post",
        params:{
          account:this.stuAccount
        }
      }).then(()=>{
          let stu=JSON.parse(localStorage.getItem("student"))
          stu.status=0
          stu.timeStamp=0
          localStorage.setItem("student",JSON.stringify(stu))
          this.$router.go(0)
      }).catch(()=>{
        this.$message({
          message:"当前连接存在问题",
          type:"warning",
          duration:1000
        })
      })
    },
    tmpAway(){
      if(this.selFloor==0) return;
      if(this.stuStatus==1){
        this.$message({
          type:"warning",
          message:"您正在暂离中",
          duration:1000
        })
        return;
      }
      this.$confirm('确认暂时离开？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url:"http://47.108.251.147:8081/floor/tmpout",
          method:"post",
          params:{
            account:this.stuAccount
          }
        }).then(()=>{
          let stu=JSON.parse(localStorage.getItem("student"))
          stu.status=1
          stu.timeStamp=Date.parse(new Date())
          localStorage.setItem("student",JSON.stringify(stu))
          this.$router.go(0)
        }).catch((res)=>{
          console.log(res)
          this.$message({
            message:"当前连接存在问题",
            type:"warning",
            duration:1000
          })
        })

      }).catch(() => {
      });
    },
    getAway(){
      this.$confirm('确认放弃座位？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.selCount)
         if(this.selFloor==0) return;
         this.$axios({
           url:"http://47.108.251.147:8081/floor/drop",
           method:"post",
           params:{
            floor:JSON.stringify(this.selFloor),
            id:this.selCount,
            account:this.stuAccount
           }
         }).then(()=>{
           console.log("hh")
            let stu=JSON.parse(localStorage.getItem("student"))
            stu.floorId=0
            stu.count=0
            stu.status=0
            stu.timeStamp=0
           localStorage.removeItem("student")
           localStorage.setItem("student",JSON.stringify(stu))
           this.$router.go(0)
         }).catch((res)=>{
           console.log(res)
           this.$message({
             message:"当前连接存在问题",
             type:"warning",
             duration:1000
           })
         })

      }).catch(() => {
      });
    }
    },
  mounted() {
    if(localStorage.getItem('student')==null){
      this.$router.replace("/login");
    }
    let stu =JSON.parse(localStorage.getItem("student"))
    this.selFloor=stu.floorId
    this.selCount=stu.count
    this.stuAccount=stu.account
    this.stuTimeStamp=stu.timeStamp
    this.stuStatus=stu.status
    if (this.selFloor!= 0){
      let  hang=Math.floor((this.selCount-1)/7+1)
      let  lie=Math.floor(this.selCount-7*(hang-1))
      this.locA="当前座位："+JSON.stringify(this.selFloor)+"楼"+JSON.stringify(hang)+"行"+JSON.stringify(lie)+"列"
    }
    if(this.stuStatus==1){
     var nowTime = Date.parse(new Date())
     if(nowTime-this.stuTimeStamp<=1800000)
      this.time=1800000+this.stuTimeStamp-nowTime
      this.timeDown=true
    }
    document.title="欢迎进入优效源占位"
}
}
</script>
<style scoped>
/deep/.topSpan{
  font-size: 20px;
}
.contain{
  margin-left: 30%;
  width:500px;
  height: 700px;
  background: ghostwhite;
}
.head{
  display: flex;
  justify-content: center;
}
.button{
   width: 92%;
   height: 100%;
   margin-left: 5%;
   background-color:#B3C0D1;
 }
.button1{
  width: 45%;
  height: 100%;
  margin-left: 5%;
}
.button2{
  width: 45%;
  height: 100%;
  margin-left: 2%;
}

.row1{
  height: 30%;
}
.row2{
  top: 5%;
  height: 30%;
}
</style>