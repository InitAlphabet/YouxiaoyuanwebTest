<template style="overflow: hidden">
    <el-container class="body" >
        <el-header class="elHeader" style="width: 100%;">
            <top-window @doCollapse="doCollapse" :icon="icon"></top-window>
        </el-header>
        <el-main class="elMain" >
            <router-view></router-view>
        </el-main>
    </el-container>
</template>


<script >
    import TopWindow from "./topWindow.vue";
    export default {
        name:"InDex",
        components:{
            TopWindow,
        },
        data(){
          return{
              isCollapse:false,
              leftWidth:'200 px',
              icon:'ico'
          }
        },
        methods:{
            doCollapse(){
                this.isCollapse = !this.isCollapse;
                if(!this.isCollapse){
                    this.leftWidth='200px'
                }else{
                    this.leftWidth='64px'
                }
            }
        },
        mounted() {
            document.title="欢迎进入优效源占位";
        }


    };
</script>

<style scoped>
    .body{
        background-size: cover;
        height: 100%;
        width: 100%;
        position: absolute;
        overflow: hidden;

    }
    .elAside {
        /*background-color:rgba(255, 255, 255, 0.62);*/
        /*background-color: transparent;*/
      transition: width 0.5s;
      -webkit-transition: width 0.5s;
      -moz-transition: width 0.5s;
      -webkit-transition: width 0.5s;
      -o-transition: width 0.5s;
    }
    .elHeader{
        text-align: right;
        font-size: 12px;
        background-color: rgba(240,245,255,0.5);
        overflow: hidden;
        /*background-color: #DDDDDD;*/
    }
    .elMain{
        background-color: rgba(255, 255, 255, 0.62);
        overflow: hidden;
    }
</style>
