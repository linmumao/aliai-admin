<template>
  <div class="allPage themeBgc">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="myColor" :to="{ path: '/addweb/systemManagement/membersManagement' }">用户管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>添加用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;">基本信息</div>
        <!-- <div class="flex_rend_c leftminiBox">
					<div class="miniText">用户名：</div>
				</div> -->
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">用户名：</div>
        </div>
        <el-input class="miniInput" maxlength="10" v-model.trim="form.nickName" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">用户账号：</div>
        </div>
        <el-input class="miniInput" maxlength="35" v-model.trim="form.userName" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">用户密码：</div>
        </div>
        <el-input class="miniInput" maxlength="20" type="password" disabled="" v-model.trim="form.password"
          placeholder="请输入内容"></el-input>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">手机号码：</div>
        </div>
        <el-input class="miniInput" maxlength="11" v-model.trim="form.phone" placeholder="请输入内容"></el-input>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">所属机构：</div>
        </div>
        <!-- <el-select @change="changeOrg" class="miniInput" v-model="form.orgId" placeholder="请选择机构">
					<el-option v-for="(item,index) in organizationList" :key="item.orgId" :label="item.orgName"
						:value="item.orgId">
					</el-option>
				</el-select> -->
        <div style="margin-left: 0.705882rem;">
          <selectTree :TreeList="orgTreeList" @MtreeData="MtreeData3" :TreeWidth="'14.117647rem'"></selectTree>
        </div>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">角色：</div>
        </div>
        <el-select class="miniInput" style="1.17647rem" v-model="form.roleId" placeholder="请选择角色">
          <el-option v-for="(item,index) in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <!-- <div class="miniStar">*</div> -->
          <div class="miniText">用户头像：</div>
        </div>
        <el-upload style="margin-left: 0.705882rem;" class="avatar-uploader" :action="homeUrl+'docking/open/file'"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="boxFooter flex_d_center">
        <!-- <div @click="goBack" style="margin-left: 0.705882rem;" class="el-button--goon23">返回</div> -->
        <!-- <div @click="saveUser" style="margin-left: 24px;" class="el-button--goon3">提交</div> -->
        <el-button @click="goBack">返回</el-button>
        <el-button type="primary" @click="saveUser">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getOrgInfo,
  queryListByOrgId2,
  accountUserAdd,
  organizeQueryTreeList,
} from "../../api/management";
import homeUrl from "../../utils/url.js";
const selectTree = () => import('@/components/selectTree')
export default {
  components: { selectTree },
  data () {
    return {
      orgTreeList: [],
      homeUrl: '',
      organizationList: '',
      roleList: '',
      form: {
        // 真实数据
        nickName: "",
        orgId: "",
        password: "111111",
        roleId: "",
        userImg: "",
        userName: "",
        phone: ''
      },
      value: '',
      imageUrl: require('../../assets/portrait.png')
    }
  },
  created () {
    console.log('homeUrl')
    console.log(homeUrl)
    this.homeUrl = homeUrl
    console.log('homeUrl2')
    console.log(this.homeUrl)
    console.log('1111')
    // 获取机构信息的列表
    getOrgInfo().then((res) => {
      console.log("机构信息:", res);
      if (res.code == 0) {
        this.organizationList = res.orgList
      }
    })

    organizeQueryTreeList().then((res) => {
      console.log("Treeres:", res);
      if (res.code == 0) {
        console.log('-------------------------')
        console.log(res.orgTree)
        console.log(this.orgTreeList)
        this.orgTreeList.push(res.orgTree)
        console.log(this.orgTreeList)
        console.log('-------------------------')
        // this.oneOrgId = this.orgList[0].orgId
        // this.form.orgId = this.orgList[0].orgId
        // this.MqueryDetailByOrgId()
      } else {
        console.log(res.msg)
      }
    })
  },
  methods: {
    MtreeData3 (data) {
      console.log(data);
      this.form.roleId = ''
      this.form.orgId = data.id
      queryListByOrgId2({
        orgId: data.id
      }).then((res) => {
        console.log("角色信息:", res);
        if (res.code == 0) {
          this.roleList = res.roleList
        }
      })
      // this.userInfo.orgName.orgId = data.id
      // this.userInfo.orgName.orgName = data.name
      // this.form.orgName = data.name
      // this.form.orgId = data.id
    },
    goBack () {
      this.$router.go(-1);
    },
    saveUser () {
      console.log(this.form)
      this.form.nickName = this.form.nickName.replace(/ /g, '')
      this.form.password = this.form.password.replace(/ /g, '')
      this.form.userName = this.form.userName.replace(/ /g, '')
      console.log(this.form.password)
      if (this.form.password == '') {
        this.$message.error('密码不能为空');
      } else {
        accountUserAdd({
          "nickName": this.form.nickName,
          "orgId": this.form.orgId,
          "password": this.$getRsaCode2(this.form.password),
          "roleId": this.form.roleId,
          "userImg": this.form.userImg,
          "userName": this.form.userName,
          "phone": this.form.phone
        }).then((res) => {
          console.log("保存:", res);
          if (res.code == 0) {
            this.$message.success('保存成功')
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg);
          }
        })
      }
    },
    changeOrg (val) {
      console.log(val)
      queryListByOrgId({
        orgId: val
      }).then((res) => {
        console.log("角色信息:", res);
        if (res.code == 0) {
          this.roleList = res.roleList
        }
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      console.log(file)
      if (res.code == 0) {
        this.form.userImg = res.url
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      console.log(file.type)
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      if (isLt2M && isJPG || isLt2M && isPng) {
        console.log('222222')
      } else {
        this.$message.error('上传头像只能是PNG或JPG格式，并且不能大于1M');
      }
      console.log(isJPG && isLt2M || isPng && isLt2M)
      return isLt2M && isJPG || isLt2M && isPng
    }
  },
  mounted () { }
}
</script>

<style lang='less' scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px solid #e9e9e9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #e9e9e9;
}

::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 96px;
  height: 96px;
  line-height: 96px;
  text-align: center;
}

::v-deep .avatar {
  width: 96px;
  height: 96px;
  display: block;
}

.miniStar {
  font-size: 0.411764rem;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: RIGHT;
  color: #f44e43;
}

.miniText {
  margin-left: 0.117647rem;
  font-size: 0.411764rem;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: RIGHT;
  color: #666666;
}

.miniInput {
  margin-left: 0.705882rem;
  width: 14.117647rem;
  height: 1.17647rem !important;
  background: #ffffff;
  border-radius: 0.117647rem;
}

.allPage {
  width: 100%;
  height: 100%;
  padding: 24px;
  padding-bottom: 0px;

  .bigBox {
    margin-top: 24px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: relative;
    /* border-radius: 8px; */

    .right2 {
      width: 100%;
      margin-top: 0.941176rem;
      .leftminiBox {
        width: 6.5%;
        /* background-color: pink; */
      }
    }
  }
}
</style>
