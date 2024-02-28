<template >
   <el-container class="bodyClass">
     <el-container>
       <el-aside class="asideClass" width="5%" >
         <div class="asideContainer">
           <span class="tmpSpan"></span>
         <span class="asideSpanClass">一行</span>
         <span class="asideSpanClass">二行</span>
         <span class="asideSpanClass">三行</span>
         <span class="asideSpanClass">四行</span>
         </div>
       </el-aside>
        <el-main >
          <div class="flexContainer" >
              <el-button plain v-for=" count in 7" class="buttonStyle" v-bind:key="count"  v-bind:id="count" @click="testClick()" v-bind:type="TypeSel(count)" :disabled="isvis(count)">座位</el-button>
          </div>
          <div class="flexContainer" style="margin-top:1%">
              <el-button  plain v-for=" count in 7" class="buttonStyle" v-bind:key="count+7"  v-bind:id="count+7" @click="testClick()" v-bind:type="TypeSel(count+7)" :disabled="isvis(count+7)">座位</el-button>
          </div>
          <div class="flexContainer" style="margin-top:1%">
            <el-button  plain v-for="  count in 7" class="buttonStyle" v-bind:key="count+14"  v-bind:id="count+14" @click="testClick()" v-bind:type="TypeSel(count+14)" :disabled="isvis(count+14)">座位</el-button>
          </div>
          <div class="flexContainer" style="margin-top:1%">
            <el-button plain v-for="  count in 7" class="buttonStyle" v-bind:key="count+21"  v-bind:id="count+21" @click="testClick()" v-bind:type="TypeSel(count+21)" :disabled="isvis(count+21)">座位</el-button>
          </div >
          <div class="Reminder">
             <el-button  plain style="margin-left: 2% ;margin-top: 0.5%;margin-bottom: 0.5%;width: 70px" type="primary" ></el-button>
             <span class="spanClass">可选，含电源</span>
             <el-button  plain style="margin-left: 2% ;margin-top: 0.5%;margin-bottom: 0.5%;width: 70px" type="info" ></el-button>
            <span class="spanClass">可选</span>
             <el-button  plain style="margin-left: 2% ;margin-top: 0.5%;margin-bottom: 0.5%;width: 70px" type="danger"></el-button>
            <span class="spanClass">不可选</span>
            <el-button  plain style="margin-left: 2% ;margin-top: 0.5%;margin-bottom: 0.5%;width: 70px" type="warning"></el-button>
            <span class="spanClass">已选</span>
            <el-button type="primary" style="margin-top: 0.5%;margin-bottom: 0.5%;width: 70px;margin-left: 10%" @click="confirmSel">确认</el-button>
          </div>
        </el-main>
     </el-container>
     <el-footer class="footerClass">
       <div class="footerContainer">
          <span style="width: 7%;"></span>
          <span class="footerSpan">一列</span>
          <span style="width: 2%"/>
          <span class="footerSpan">二列</span>
          <span style="width: 2%"/>
          <span class="footerSpan">三列</span>
          <span style="width: 1.5%"/>
          <span class="footerSpan">四列</span>
          <span style="width: 1.5%"/>
          <span class="footerSpan">五列</span>
          <span style="width: 2%"/>
          <span class="footerSpan">六列</span>
          <span style="width: 1.5%"/>
          <span class="footerSpan">七列</span>
       </div>
     </el-footer>
   </el-container>
</template>

<script >
export default {
  name: "floorOne",
  data(){
    return{
      t1:"primary",
      t2:"primary",
      tbstaus:[],
      tbids:[],
      tbtypes:[],
      currentSel:0,
      selFloor:0,
      selCount:0,
      stuAccount:0,
    }
  },
  methods:{
    isvis(val){
      if(this.tbstaus[val-1]==0)return false
      return true
    },
    testClick(){
      this.currentSel=event.currentTarget.id
    },
    confirmSel(){
      //进行更新
      //容错判断
      if(this.currentSel==0)
      {
        this.$message({
          message:"请先选择座位",
          type:"warning",
          duration:1000,
        })
        return
      }
      //容错判断
      if(this.selFloor>0){
        this.$message({
          message:"您已经有座位",
          type:"warning",
          duration:1000,
        })
        this.currentSel=0;
        return
      }
      //发起更新
      this.$axios({
        url:"http://47.108.251.147:8081/floor/sel",
        method:"POST",
        params:{
          floor:"1",
          id:this.currentSel,
          account:this.stuAccount
        }
      }).then(()=>{
         //跟新本地保存的值
         let stu =JSON.parse(localStorage.getItem('student'));
         stu.floorId=1;
         stu.count=this.currentSel;
         localStorage.removeItem("student");
         localStorage.setItem("student",JSON.stringify(stu));
         this.$router.go(0)//刷新页面，重新获得云端的值
      }).catch(err=>{
        console.log(err)
        this.$message({
          message:'当前连接存在问题',
          type:"danger",
          duration:1000
        })
      })
    }
    ,
    TypeSel(tbid){
      //控制座位的颜色，灰色可选，红色占用，蓝色可选且有电源
      if(this.tbstaus[tbid-1] == 0) {
        if(this.tbtypes[tbid-1] == 1)
          return "primary"
        return "info"
      }
      if(this.selFloor==1 && this.selCount==tbid)
          return "warning"
      return "danger"
    }
  },
  mounted() {
    document.title="一楼战场"
    this.currentSel=0
    if (localStorage.getItem('student') == null) {
      this.$router.replace("/login");
    }
    else{
      let stu=JSON.parse(localStorage.getItem('student'));
      this.selCount=stu.count;
      this.selFloor=stu.floorId;
      this.stuAccount=stu.account;
      this.$axios({
        method:"POST",
        url:"http://47.108.251.147:8081/floor",
        params:{
          floorT:"floor1"
        }
      }).then(res=>{
        let tmp=res.data.data;
        for (let i=0;i<tmp.length;i++)
        {
          this.tbids.push(tmp[i].id)
          this.tbstaus.push(tmp[i].status)
          this.tbtypes.push(tmp[i].type)
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.tmpSpan{
  height: 3%;
}
.asideClass{
  background-color: white;
  width: 2%;
}
.Reminder{
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1%;
  height: 10%;
  justify-content: center;
  background-color: ghostwhite;
}
.asideSpanClass{
  height: 16%;
  margin-top: 40%;
}
.spanClass{
  margin-top: 1%;
}
.flexContainer {
  display: flex;
  flex-direction: row;
  background-color: ghostwhite;
  width: 100%;
  height: 20%;
}
.asideContainer{
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 100%;
}
.footerContainer{
  display: flex;
  flex-direction: row;
  background-color: white;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
.buttonStyle{
  width: 12%;
  margin-left: 2%;
  border-style: solid outset outset outset;
  border-width: thin thick thick thick;
  border-color: white whitesmoke whitesmoke whitesmoke;
}
.bodyClass{
  width: 100%;
  height: 100%;
  background-color: white;
}
.footerSpan{
  background-color: white;
  width: 11.5%;
  justify-content: center;
  display: flex;
  border-radius: 5px;
}
.footerClass{
  background-color: white;
}
</style>