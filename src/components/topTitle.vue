<template>
  <div class="homePage">
    <div class="titleName">艾点点智控平台</div>
    <el-col>
      <el-menu default-active="2" @open="handleOpen" @close="handleClose" background-color="white"
        style="width: 20%; height: 100%; margin-top: 80px">
        <el-menu-item index="3" @click="goTo('/addweb/homePage')">
          <!-- <i class="el-icon-setting"></i> -->
          <img src="../assets/tab/tab_home_unselected@2x.png" style="width: 16px; height: 16px; margin-right: 10px"
            alt="" />
          <span slot="title" style="font-weight: 600; font-size: 16px; color: #666666">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <img src="../assets/tab/tab_commercial_tenant@2x.png" style="width: 16px; height: 16px; margin-right: 10px"
              alt="" />
            <span style="font-weight: 600; font-size: 16px; color: #666666">商户中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" style="font-size: 16px; color: #666666"
              @click="goTo('/businessCenter/businessInformation')">商户信息</el-menu-item>
            <el-menu-item index="1-2" style="font-size: 16px; color: #666666"
              @click="goTo('/businessCenter/businessChiZu')">商户池组</el-menu-item>
            <el-menu-item index="1-3" style="font-size: 16px; color: #666666"
              @click="goTo('/businessCenter/businessImport')">商户导入</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <img src="../assets/tab/tab_set@2x.png" style="width: 16px; height: 16px; margin-right: 10px" alt="" />
            <span style="font-weight: 600; font-size: 16px; color: #666666">系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" style="font-size: 16px; color: #666666">成员管理</el-menu-item>
            <el-menu-item index="2-2" style="font-size: 16px; color: #666666">权限管理</el-menu-item>
            <el-menu-item index="2-2" style="font-size: 16px; color: #666666">机构管理</el-menu-item>
            <el-menu-item index="2-2" style="font-size: 16px; color: #666666">个人资料</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    goTo (path) {
      this.$router.replace(path);
    },
  },
};
</script>



<style lang='less' scoped>
.homePage {
  width: 100%;
  height: 100%;
  padding: 0;
  position: fixed;
  top: 52px;
  bottom: 0;
  background-color: #fffafb;
  .el-menu-item.is-active {
    width: 100%;
    height: 100%;
    background: linear-gradient(278deg, #ff986b 0%, #eb4778 100%);
    border-radius: 0px 36px 36px 0px;
    color: white !important;
  }
  .titleName {
    position: absolute;
    width: 1920px;
    height: 80px;
    left: 0px;
    top: 0px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    font-family: Microsoft YaHei;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 80px;
    padding-left: 44px;
    background-image: -webkit-linear-gradient(right, #ff986b, #fd8403, #eb4778);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>