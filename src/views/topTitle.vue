<template>
  <div class="homePage">
    <el-container class="container">
      <!-- 顶部 -->
      <el-header class="header">
        <!-- <span class="titleName fontS_b fontC_3F fontW_b">艾点点</span> -->
		<img class="headerImg" src="../assets/shouye/logo.png" alt="">
        <div class="blank"></div>
        <div class="tuoChuBox">
          <img v-if="avatarStatus" alt="" class="avatar" :src="avatar" />
          <img v-else alt="" class="avatar"
            src="http://192.168.1.20/api/account/dataAreas/query/urban/list/by/cityId?cityId=1859" />
          <div class="tuoChuBoxMI flex_d_center">
            <div class="getOut flex_d_center c_pointer" @click="getoutLogin">
              <img style="width: 0.625rem; height: 0.625rem" src="../assets/tab/tab_logout_unselected@2x.png" alt="" />
              退出登录
            </div>
          </div>
        </div>
      </el-header>
      <!-- 内容 -->
      <el-container>
        <el-aside class="aside">
          <el-menu :default-active="activeMenu" router :unique-opened="true" @open="handleOpen" @close="handleClose"
            @select="handleSelect">
            <!-- <div v-for="(item,i) in XinList">     对永华接口数据-->
            <div v-for="(item,i) in newList.treeList">
              <!-- <el-menu-item v-if="newList.router" :index="newList.router">
                <img :src="newList.img" style="width: 0.625rem;height: 0.625rem;margin-right: 0.3125rem;" alt="" />
                <span slot="title" class="titleFont" style="font-size: 0.53rem; color: #666666">首页</span>
              </el-menu-item> -->
              <el-submenu   v-if='item.children.length >= 1' :index="item.router+''" :key="i"  >
                <template slot="title">
                  <img :src="item.img" style="width: 0.625rem;height: 0.625rem;margin-right: 0.3125rem;" alt="" />
                  <span style="font-size: 16px; color: black; font-weight: 600; ">{{item.name}}</span>
                </template>
                <!-- <template v-for="(ite,inde) in item.children"> -->
                  <!-- <el-submenu v-if="ite.children && ite.children.length" :index="ite.router?ite.router:ite.menuId">
                    <template slot="title">
                      <span style="font-size: 0.5rem;margin-left: 0.34375rem">{{ite.name}}</span>
                    </template>
                    <el-menu-item v-for="(it,ind) in ite.children" :index="it.router">
                      <span style="margin-left: 0.34375rem;font-size: 0.5rem;">{{it.name}}</span>
                    </el-menu-item>
                  </el-submenu> -->

                  <el-menu-item  v-for="(ite,inde) in item.children" :index="ite.router+''" :key='inde'>
                    <span style="margin-left: 0.34375rem;font-size: 16px;">{{ite.name}}</span>
                  </el-menu-item>
                <!-- </template> -->
              </el-submenu>
              <el-menu-item
              v-else
              :key='i'
              :index='item.router'>
                <template slot='title'>
                  <img :src="item.img" style="width: 0.625rem;height: 0.625rem;margin-right: 0.3125rem;" alt="" />
                  <span slot="title" class="titleFont" style="font-size: 16px; color: black; font-weight: 600;">{{item.name}}</span>
                </template>
              </el-menu-item>
            </div>
          </el-menu>

        </el-aside>
        <el-main class="main" style="overflow-y: hidden; overflow-x: hidden; padding: 0">
          <el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="友情提示" :visible.sync="dialogVisible"
            top="30vh" width="30%">
            <div>您确定要退出账号吗？</div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmGetout">确 定</el-button>
            </span>
          </el-dialog>
          <!-- <el-scrollbar style="width: 100%"></el-scrollbar> -->
          <router-view @touxiangImg="touxiangImg"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {
  menuQueryUserMenuList
} from "../api/management";
import {
  localRemove
} from "@/utils/local.js";
export default {
  data () {
    return {
      avatar: "",
      avatarStatus: false,
      dialogVisible: false,
      oneActive: '/addweb/homePage',
      oldList: '',
      newList: {},
      XinList: [
        {
          name: '工作台',
          router: '/addweb/xinzeng/WorkBench',
          img: '',
          children: []
        },
        {
          name: '活动面板',
          router: '/addweb/xinzeng/ActivityPanel',
          img: '',
          children: []
        },
        {
          name: '活动类型',
          router: '/addweb/xinzeng/DetailsPages',
          img: '',
          children: []
        },
        {
          //外部
          name: '活动列表外部',
          router: '/addweb/xinzeng/WaiActivityList',
          img: '',
          children: []
        },
        {
          name: '活动列表',
          router: '/addweb/xinzeng/NeiActivityList',
          img: '',
          children: []
        },
        {
          name: '银行管理',
          router: '',
          img: '',
          children: [{
            name: '银行管理',
            router: '/addweb/xinzeng/BankManagement',
            img: ''
          },
          {
            name: '支行管理',
            router: '/addweb/xinzeng/SubBranchManagement',
            img: ''
          },
          ]
        },
        {
          name: '权限管理',
          router: '/addweb/xinzeng/PermissionManagement',
          img: '',
          children: []
        },
      ],
      list: {
        name: '首页',
        router: '/addweb/homePage',
        img: '',
        children: [{
          name: '商户中心',
          router: '',
          img: '',
          children: [{
            name: '商户信息',
            router: '/businessCenter/businessInformation',
            img: ''
          },
          {
            name: '商户池组',
            router: '/businessCenter/businessChiZu',
            img: ''
          },
          {
            name: '商户导入',
            router: '/businessCenter/businessImport',
            img: ''
          },
          ]
        },
        {
          name: '系统管理',
          router: '',
          img: '',
          children: [{
            name: '用户管理',
            router: '/systemManagement/membersManagement',
            img: ''
          },
          {
            name: '角色管理',
            router: '/systemManagement/rightsManagement',
            img: ''
          },
          {
            name: '机构管理',
            router: '/systemManagement/organizationManagement',
            img: ''
          },
          {
            name: '个人中心',
            router: '/systemManagement/personalData',
            img: ''
          },
          ]
        },
        {
          name: '卡券管理',
          router: '',
          img: '',
          children: [{
            name: '活动列表',
            router: '/cardManagement/activityList',
            img: ''
          },]
        }
        ]
      }
    };
  },
  created () {
    this.avatar = localStorage.getItem("avatar");
    console.log('看看头像')
    console.log(this.avatar)
    if (this.avatar == null || this.avatar == '' || this.avatar == 'null') {
      this.avatarStatus = false
    } else {
      this.avatarStatus = true
    }
    console.log(this.avatar)
    console.log(this.avatarStatus)
    // if(window.localStorage.getItem('indexPa')) {
    // 	this.oneActive = window.localStorage.getItem('indexPa')
    // }
    if (window.sessionStorage.getItem('indexPa')) {
      this.oneActive = window.sessionStorage.getItem('indexPa')
    }
    menuQueryUserMenuList().then((res) => {
      console.log("查询权限:", res);
      if (res.code == 0) {
        // this.$message.success('保存成功')
        var b = ''
        this.oldList = res.menuTreeList
        if (this.oldList[0].router == '/addweb/homePage' || this.oldList[0].router == '/addweb/homePageTwo') {
          b = this.oldList.slice(1);
          console.log('aaabbbb')
          console.log(b)
          // this.$router.push(this.oldList[0].router)
          this.newList = this.oldList[0]
        } else {
          console.log('123456789')
          // console.log(this.$route.matched[0].redirect = this.oldList[0].children. [0].router)
          this.$router.push('/topTitle')
          b = this.oldList;
          console.log('bbbb')
          console.log(b)
          this.newList = {}
        }
        console.log(this.newList)
        console.log('b' , b);
        let a = b.slice(9 , 16)
        console.log('a' , a);
        this.newList.treeList = a,
        // this.newList.treeList = b  //原数组赋值
        console.log('this.newList' , this.newList)
        // console.log(this.newList)
      } else {
        this.$message.error(res.msg);
      }
    })
  },
  watch: {
    $route (to, form) { },
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const {
        meta,
        path
      } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      console.log('path1111111111111111111', path)
      console.log('$route.matched[1].path')
      console.log(this.$route.matched[1].path)
      return this.$route.matched[1].path
    },
  },
  methods: {
    touxiangImg (data) {
      console.log('55555')
      this.avatar = data
      this.avatarStatus = true
      localStorage.setItem("avatar", data);
      // let AllJsonToken = JSON.parse(window.sessionStorage.getItem("jsonToken"))
      // AllJsonToken.userImg = data
      // window.sessionStorage.setItem(
      // 	"jsonToken",
      // 	JSON.stringify(AllJsonToken)
      // );
      // console.log(JSON.parse(window.sessionStorage.getItem("jsonToken")))
    },
    goToP () {
      this.$router.push('/addweb/systemManagement/personalData')
    },
    handleOpen (key, keyPath) {
      console.log('路由')
      console.log(key)
      console.log(keyPath)
      console.log(this.$route.path)
      console.log(this.$route.matched)
    },
    handleSelect (index, indexPath) {
      // console.log('$route.matched[1].path')
      // console.log(indexPath)
      // console.log(this.$route.matched[1].path)
      this.oneActive = indexPath[1]
      // window.localStorage.setItem('indexPa',this.oneActive)
      window.sessionStorage.setItem('indexPa', this.oneActive)
    },
    handleClose (key, keyPath) {
      console.log('路由2')
      console.log(key)
      console.log(keyPath)
    },
    goTo (path) {
      if (path == this.$route.path || path + "/pool" == this.$route.path) {
        return;
      } else {
        this.$router.replace(path);
      }
    },
    getoutLogin () {
      this.dialogVisible = true;
    },
    confirmGetout () {
      localRemove();
      sessionStorage.clear();
      this.$router.push("/");
      this.dialogVisible = false;
    },
  },
};
</script>



<style lang='less' scoped>
@import "../assets/global.css";

.el-menu {
  border-right: 0 !important;
}

/* /deep/.el-button--primary {
		color: black !important;
		border-color: red !important;
		background-color: red !important;
	} */

/* /deep/.el-menu-item:hover {
		background-color: #F5F7FA !important;
		border-radius: 0px 1.125rem 1.125rem 0px;
		color: #eb4778;
	} */

/* /deep/.el-submenu__title:hover {
		background-color: #F5F7FA !important;
		border-radius: 0px 1.125rem 1.125rem 0px;
	} */

/* /deep/.el-menu-item {
		border-radius: 0px 1.125rem 1.125rem 0px;
	}
	
	/deep/.el-submenu__title {
		border-radius: 0px 1.125rem 1.125rem 0px;
	} */

::v-deep .el-header {
  padding-left: 0px;
}

.titleFont:hover {
  color: #eb4778;
}

.homePage {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #fff;
  padding: 63px 0 0 0;
  box-sizing: border-box;
  .container {
    .aside {
      /* peter要求200 */
      width: 200px !important;
      margin-top: 0.625rem;
      width: 8.75rem;
      /* height: 89.5vh; */
      height: 91.4vh;
      /* margin-right: 0.75rem; */
      /* background-color: pink; */

      .getOut {
        position: fixed;
        top: 92%;
        margin: 0 0 0 0.5rem;
        font-size: 0.5rem;
        color: #666666;

        img {
          margin-right: 0.1875rem;
          vertical-align: text-top;
        }
      }
    }
  }

  .el-menu-item.is-active {
    width: 100%;
    /* height: 100%; */

    background: linear-gradient(278deg, #e8f1ff 0%, #e8f1ff 100%);
    /* border-radius: 0px 1.125rem 1.125rem 0px; */
    border-right: 4px solid #1677ff !important;
    color: #1677ff !important;
  }

  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .titleName {
      margin-left: 84px;
      font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
      text-align: left;
      line-height: 24px;
    }
  }

  .header {
    display: flex;
    align-items: center;
    height: 64px;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.05);
    z-index: 9;

    .icon {
      font-size: 0.625rem;
    }

    .logo {
      width: 1.03125rem;
      height: 0.875rem;
      margin: 0 0.375rem 0 0.6875rem;
    }

    .hmmm {
      font-size: 0.6875rem;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
    }

    .blank {
      flex: 1;
    }

    .avatar {
      border: 0.0625rem solid #ffffff;
      box-sizing: border-box;
      border-radius: 50%;
      width: 35px;
      height: 35px;
    }

    .welcom {
      font-size: 0.4375rem;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: bold;
      margin: 0 1.1875rem 0 0.28125rem;
    }

    .btnLogout {
      color: #fff;
      width: 1.78125rem;
      height: 0.875rem;
      padding: 0;
    }
  }

  .getOutHome {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 12.5rem;
    height: 6.25rem;
    background-color: teal;
    z-index: 99;

    .getOutHomeTop {
    }

    .getOutHomeContent {
    }

    .getOutHomeBottom {
    }

    .getOutHomeBottom {
    }
  }
}

/* .el-submenu .el-menu-item .el-menu-item {
	margin-left: 0.3125rem;
} */
.tuoChuBox {
  /* background-color: pink; */
  margin-right: 50px;
  position: relative;
}
.tuoChuBoxMI {
  display: none;
  width: 100px;
  height: 50px;
  left: -25px;
  position: absolute;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 20px 0px rgba(236, 72, 121, 0.05);
}
.tuoChuBox:hover .tuoChuBoxMI {
  display: flex;
}
.headerImg {
	margin-left: 48px;
	width: 100px;
	/* height: 44px; */
}
</style>
