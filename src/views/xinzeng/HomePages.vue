<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="homepages/activitypanel">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    <div>
      <router-view />
    </div>
    <div>
      <el-button @click='activitypanel'>前往活动面板</el-button>
      <el-button type="primary" @click='detailspages' >前往活动类型</el-button>
      <el-button type="success" @click='huodongxingzeng'>前往活动类型-新增</el-button>
      <el-button type="info" @click='neiactivitylist'>前往活动列表内部</el-button>
      <el-button type="warning" @click='WaiActivityList'>前往活动列表外部</el-button>
      <el-button type="danger" @click='BankManagement'>前往银行管理</el-button>
      <el-button type="primary" @click='SubBranchManagement' plain >前往支行管理</el-button>
    </div>
  </div>
    <!-- <div id="homepages">
        <van-dialog v-model="dialog" style=" width: 90%; background-color: rgb(231, 51, 36); color:  rgb(253, 227, 181);" >
          <div style="text-align: center; height: 45px; line-height:45px; font-size: 18px;" >活动规则</div>
          <div style="padding:0 10px 10px 10px; height: 120px;">
            <div>1、投票时间：2023年1月6日-1月15日</div> 
            <div>2、活动规则：为你喜欢的空间设计投上宝贵的一票，每个ID每天可投5票，每天最多可投同一个作品1票，投票结束时，票数前五的网点则获得最“金”彩网点称号。</div> 
          </div>
        </van-dialog>
        <div id="TopBackGround">
          <button
          @click="guiZhe"
          style="height: 75px; 
          width: 28px;
          font-size: 14px;
          line-height: 16px;
          padding: 0 3px; 
          background-color: rgb(231, 51, 36);
          color:  rgb(253, 227, 181); 
          position: absolute; 
          right: 0; 
          top: 60px;
          border-color:  rgb(253, 227, 181);
          border-right: none;
          border-radius: 10px 0px 0px 10px;">
            活动规则
          </button> 
        </div>
        <div id="mainContent">
        <div id="matchData">
            <div class="bottomOne">
            <h3>
              {{informationNum}}
            </h3>
            <div>作品总量</div>
            </div>
            <div class="bottomOne">
            <h3>{{totalVoteNum}}</h3>
            <div>累计投票</div>
            </div>
            <div class="bottomOne">
            <h3>{{totalClicNum}}</h3>
            <div>访问量</div>
            </div>
        </div>
        <div id="player">
            <div id="playerbox">  
              <div></div>     
            </div>
            <van-popup v-model="toast" style="padding: 5px 20px;" >暂无投票次数</van-popup>
            <div id="playerRanking">
            <div id="playerRankingWord">
                <button @click='toListPages'>查看当前排行 ></button>
            </div>
            <div class="playerMessages" >
                <div class="playerMessagesChild"  @click="toDetailsPages(index)" v-for="(item,index) in list"
                :key="index" >
                  <img :src="item.videoPic" alt="" width="100%">
                  <h4>{{item.name}}</h4>
                  <button v-if="item.dayVoteFlag" style="background-color: rgb(215, 215, 215); color: rgb(127, 127, 127);"  @click="none" >已投({{item.voteNum}}票)</button>
                  <button  v-else @click.stop="stopMP(item)">投票({{item.voteNum}}票)</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div> -->
</template>

<script>
  export default{
    methods: {
      activitypanel() {
        this.$router.push('/activitypanel');
      },

      detailspages() {
        this.$router.push('/detailspages');
      },

      huodongxingzeng() {
        this.$router.push('/huodongxingzeng');
      },

      neiactivitylist () {
        this.$router.push('/neiactivitylist');
      },

      WaiActivityList() {
        this.$router.push('/WaiActivityList');
      },
      
      BankManagement() {
        this.$router.push('/BankManagement');
      },

      SubBranchManagement() {
        this.$router.push('/SubBranchManagement');
      },

      // 导航栏函数
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

    }
  }
</script>

<style>

</style>

<!-- <script>


  import Vue from 'vue';
  // import axios from 'axios';
  import { Overlay ,Popup , Dialog , Toast } from 'vant';
  // Vue.use(Overlay,Popup,Dialog);

  import {
    getVote,
    getDetailsData,
    getPlayerData,
    getOpenId
  } from  '../http/api';


  export default{
    data() {
      return {
        informationNum:NaN,
        totalClicNum:NaN,
        totalVoteNum:NaN,
        list:[],
        id: "1600039999473061890",

        token:'',

        // homeUrl:"https://cloud.a-liai.com/ypy-client/api/WeChatController/openAuth?appId=wx21911bd1196419be&authHost=https://cloud.a-liai.com&redirectUrl=https://cloud.a-liai.com/abcActIndexPage/index.html&scope=snsapi_base&stateCon=TT",
        toupiao:true,
        toast:false,
        dialog:false,     
      };
    },
    
  created(){
      document.title = '人气投票';
      //获取token
      this.getCode();
      // this.getList();
  },

  mounted() {
    //查询投票资讯列表
    this.getList()
  },


  methods: {

    getCode () { // 非静默授权，第一次有弹框
            // const code = this.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
            let params = new URL(location.href).searchParams;
            let code = params.get("code");
            console.log('params' , params);
            console.log('code' , code);
            const local = window.location.href
            console.log('local' , local);
            if (code == null || code === '') {
                console.log("没code");
              //  window.location.href = 'https://cloud.a-liai.com/ypy-client/api/WeChatController/openAuth?appId=wx21911bd1196419be&authHost=https://cloud.a-liai.com&redirectUrl=http://cloud.a-liai.com/abcActIndexPage/index.html&scope=snsapi_base&stateCon=TT'
               window.location.href = 'https://cloud.a-liai.com/ypy-client/api/WeChatController/openAuth?appId=wx21911bd1196419be&authHost=https://cloud.a-liai.com&redirectUrl=https://admin.a-liai.com/h5/nhtoupiao/index.html&scope=snsapi_base&stateCon=TT'
              //  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx21911bd1196419be&redirect_uri=https://cloud.a-liai.com/ypy-client/api/WeChatController/wx/code?returnUrl=https://admin.a-liai.com/h5/nhtoupiao/index.html&response_type=code&scope=snsapi_base&state=TT&connect_redirect=1#wechat_redirect'
              } else {
                console.log("有code111" , code);
                //微信授权后拿到code之后请求后台拿到accessToken
                getOpenId({code:code , appId:'abcInfomationCode'}).then(
                  (res) => {
                    localStorage.setItem("farmbanktoken", res.jsonToken.accessToken); //将accessToken存储到localStorage
                    this.token = res.jsonToken.accessToken;
                    console.log('假token' , this.token);
                    console.log("请求accessToken成功" , res);
                    //拿到accesssToken后储存在local后设置请求拦截；这里调用后台接口请求首页数据
                    this.getList();
                  }
                )
                .catch(
                    (error) => {
                    console.log('error' ,error);
                  }) //把code传给后台获取用户信息
            }
    },

      // getCode () {
      //   localStorage.setItem("farmbanktoken", 'aliai-eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxNjAzMjIzNTU5MTU5ODEyMDk2Iiwic3ViIjoiMTYwMzIxMjY1NDQ2NDMzOTk2OCIsImlhdCI6MTY3MzQyMzQ5MiwiYXVkIjoiMSIsImlzcyI6ImFsaWFpIiwidXNlciI6IntcInJvbGVJZFwiOjAsXCJvcGVuSWRcIjpcIm9EVHRYdF9CQlJoVGtrRmhHLWJsNXplS29SaXNcIixcImlwXCI6XCIxNC4xNTUuMTE1LjE3M1wiLFwiYXV0aG9yaXRpZXNcIjpbXX0iLCJleHAiOjE2NzM0NDE0OTJ9.IEPKk9DGL-gplRvQiPBFLSaLziTdG6BgzVvwxovubn1UvUn6mFeloCBF-Q-PsMHaCieUEggad8SKaaAEFpVqyg');
      //   this.getList();
      // },

    //////////////////////////////////////////////
    //跳转到排行榜
    toListPages() {
      // this.$router.push('/listpages');

      this.$router.push({
          path: '/listpages',
          query: {
            id: this.list
          }
        })

    },

    //跳转到详情页
    toDetailsPages(index) {
      // this.$router.push('/detailsPages');
      this.$router.push({
          path: '/detailsPages',
          query: {
            id: this.list[index],
          }
      })
    },

    //没有票
    none(event){
      event.stopPropagation();
    },

    //投票按钮
    stopMP(data ) {
      getVote({
        informationId: data.id,
      }).then((res) => {
        console.log(res); 
        //投票成功就toast弹窗
        if(res.code == 80000) {
          Toast('今日投票次数已用完');
          // this.toast = true;
          return
        }
        if(res.code === 0){
          data.dayVoteFlag = true
          this.getList()
        }       
      }
      );
      // alert(1111)
    },

    //投票按钮，没有票数弹出$Toast遮罩层
    zhizhao(event){
      event.stopPropagation();
      // console.log(1111);
      this.toast=true
    },

    //规则按钮，弹出dialog窗口
    guiZhe() {
        this.dialog = true;
    }, 

    //请求首页数据
    getList() {
      //请求后端接口，获取首页数据
      getDetailsData().then(
        res => {
          console.log("res首页信息", res );
          this.informationNum = res.informationNum;
          this.totalClicNum = res.totalClicNum;
          this.totalVoteNum = res.totalVoteNum;
          this.list = res.list;
        }
      )
    } 
  },

}

</script> -->

<!-- <style>

*{
  margin: 0;
  padding: 0;
}

#homepages{
  background-color:rgb(227, 72, 47) ;
  width: 100vw;
}

#TopBackGround{
  height: 183px;
  background-image: url(../imges/home/head_image@3x.png);
  /* background-image: url(../imges/TopBackGround.png); */
  background-size: 100% 183px;
  background-repeat: no-repeat;
  background-position: 0px  0px;
  /* background-clip: calc(255px); */
  /* background-size: 300px; */
}

#mainContent{
  background-color: rgb(227, 72, 47);
  /* height: 75vh; */
  padding: 0  15px 30px 15px;
}

#matchData{
  margin-top: 18px;
  height: 10vh;
  display: flex;
  justify-content: space-around;
}

.bottomOne{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 30%;
  background-color: rgb(253, 227, 181);
  border-radius: 5px;
}

.bottomOne > div{
  color: rgb(152, 62, 21);
}
.bottomOne > h3{
  color: rgb(152, 62, 21);
}
#player{
  position: relative;
  margin-top: 6px;
}

#playerbox{
  /* background-image: url(../imges/home/title.png); */
  /* background-image: url(../imges/home/title@3x.png); */
  height: 30px;
  /* width: 200px; */
  /* background-repeat: no-repeat; */
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  top: 15px;
  /* left: 100px; */
}

#playerbox > div {
  width: 155px;
  height: 30px;
  background-image: url(../imges/player.png);
  background-size: 155px 30px;
  background-repeat: no-repeat;
}

#playerRanking{
  background-color:rgb(253, 227, 181);
  /* height: 550px; */
  position: relative;
  z-index: 0;
  padding: 25px 10px 15px 10px;
}

#playerRankingWord{
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 15px; */

}

#playerRankingWord > button{
  font-size: 12px;
  background-color:rgb(253, 227, 181) ;
  border: none;
  color:rgb(227, 72, 47) ;
  font-weight: 600;
}
.playerMessages{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.playerMessagesChild{
  height:170px ;
  width: 160px;
  background-color: azure;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.playerMessagesChild>h4{
  /* text-align: center; */
  margin-top: 3px;
  color: rgb(152, 62, 21);
}
.playerMessagesChild>button{
  /* text-align: center; */
  background-color: rgb(227, 72, 47) ;
  border: none;
  font-size: 15px;
  padding: 5px 15px;
  border-radius: 15px;
  margin: 9px 0;
  color: rgb(253, 227, 181);
}

.playerMessagesChild >img{
  height: 59%;
}
</style> -->