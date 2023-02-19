<template>
  <div class="allPage themeBgc">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="myColor" :to="{ path: '/addweb/systemManagement/organizationManagement' }">机构管理
        </el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == 0">添加机构</el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == 1">编辑机构</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;">基本信息</div>
        <!-- <div class="flex_rend_c leftminiBox">
					<div class="miniText">用户名：</div>
				</div> -->
      </div>
      <div style="margin-top: 30.5px;" class="right2 flex_r_ic">
        <div class="leftminiBox flex_rend_c">
          <div class="miniStar">*</div>
          <div class="miniText">机构logo：</div>
        </div>
        <el-upload class="avatar-uploader" :action="homeUrl+'docking/open/file'" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="right2 flex_r_ic">
        <div class="leftminiBox flex_rend_c">
          <div class="miniStar">*</div>
          <div class="miniText">机构名称：</div>
        </div>
        <el-input class="miniInput" v-model.trim="form.orgName" maxlength="35" placeholder="请输入内容"></el-input>
      </div>
      <div class="right2 flex_r_ic">
        <div class="leftminiBox flex_rend_c">
          <div v-show="editStatus==0" class="miniStar">*</div>
          <div class="miniText">隶属机构：</div>
        </div>
        <!-- <el-select class="miniInput" v-model="form.parentId" placeholder="请选择">
					<el-option v-for="item in orgList" :key="item.orgId" :label="item.orgName" :value="item.orgId">
					</el-option>
				</el-select> -->

        <div v-if="editStatus == 1&&form.editable!=0" style="margin-left: 0.705882rem;">
          <selectTree :TreeList="orgTreeList" @MtreeData="MtreeData3" :id="form.parentId" :label="form.parentName"
            :TreeWidth="'14.117647rem'"></selectTree>
        </div>
        <el-input v-else class="miniInput" v-model.trim="form.parentName" disabled="" maxlength="35"
          placeholder="请输入内容"></el-input>
      </div>
      <div class="right2 flex_r_ic">
        <div class="leftminiBox flex_rend_c">
          <div class="miniStar">*</div>
          <div class="miniText">行业类型：</div>
        </div>
        <el-select class="miniInput" v-model="form.tradeId" placeholder="请选择">
          <el-option v-for="item in tradeList" :key="item.tradeId" :label="item.tradeName" :value="item.tradeId">
          </el-option>
        </el-select>
      </div>

      <div class="right2 flex_r">
        <div class="leftminiBox flex_rend">
          <div class="miniStar">*</div>
          <div class="miniText">角色类型：</div>
        </div>
        <div class="NewRoleSz flex_r_fw">
          <div v-for="(item,index) in NewRoleList" :key="index" class="NewMiniRole flex_r_ic">
            <img v-show="item.isVisible" @click="changeVis(item)" class="RoleImg" src="../../assets/add_img/langou.png">
            <img v-show="!item.isVisible" @click="changeVis(item)" class="RoleImg"
              src="../../assets/image/checkbox_unselected@2x.png">
            <span class="RoleText">{{item.roleName}}</span>
          </div>
          <!-- <div class="NewMiniRole flex_r_ic">
						<img class="RoleImg" src="../../assets/image/rectangle_subtract@2x.png" >
						<span class="RoleText">管理员</span>
					</div> -->
          <!-- <div class="NewMiniRole flex_r_ic">
						<img class="RoleImg" src="../../assets/image/rectangle_add@2x.png" >
						<span class="RoleText">自定义</span>
					</div> -->
        </div>
      </div>

      <div style="margin-top: 15px;" class="right2 flex_r_ic">
        <div class="leftminiBox flex_rend_c">
          <div class="miniStar">*</div>
          <div class="miniText">机构地址：</div>
        </div>
        <el-select @change="changePro2" style="margin-left: 0.705882rem;" class="miniInput2" v-model="form.provinceId"
          placeholder="请选择">
          <el-option v-for="item in provinceList" :key="item.provinceId" :label="item.provinceName"
            :value="item.provinceId">
          </el-option>
        </el-select>
        <el-select @change="changeCity2" style="margin-left: 0.441176rem;" class="miniInput2" v-model="form.cityId"
          placeholder="请选择">
          <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
          </el-option>
        </el-select>
        <el-select style="margin-left: 0.441176rem;" class="miniInput2" v-model="form.urbanId" placeholder="请选择">
          <el-option v-for="item in urbanList" :key="item.urbanId" :label="item.urbanName" :value="item.urbanId">
          </el-option>
        </el-select>
      </div>
      <div class="right2 flex_r_ic">
        <div class="leftminiBox flex_rend_c">
          <div class="miniStar">*</div>
          <div class="miniText">详细地址：</div>
        </div>
        <el-input class="miniInput" v-model.trim="form.address" maxlength="50" placeholder="请输入内容"></el-input>
      </div>
      <div class="boxFooter flex_d_center">
        <!-- <div @click="goBack" style="margin-left: 0.705882rem;" class="el-button--goon23">返回</div> -->
        <!-- <div @click="saveUser" style="margin-left: 24px;" class="el-button--goon3">提交</div> -->
        <el-button @click="cancelOrg">返回</el-button>
        <el-button type="primary" v-show="editStatus == 0" @click="saveOrg">提交</el-button>
        <el-button type="primary" v-show="editStatus == 1" @click="saveOrg">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  organizeAdd,
  queryProvinceList,
  organizeQueryList,
  tradeList,
  queryCityBProvinceId,
  queryUrbanCityId,
  organizeQueryTreeList,
  accountRoleList,
  queryDetailByOrgId,
  organizeUpdateById,
  queryListByOrgId,
  queryListByOrgId2
} from "../../api/management";
import homeUrl from "../../utils/url.js";
const selectTree = () => import('@/components/selectTree')
export default {
  components: {
    selectTree
  },
  data () {
    return {
      editStatus: 0,
      orgTreeList: [],
      NewRoleList: [],
      homeUrl: '',
      form: {
        "address": "",
        "cityId": "",
        "logoUrl": "",
        "orgName": "",
        "parentId": "",
        "provinceId": "",
        "tradeId": "",
        "urbanId": "",
        "orgId": "",
        "roleList": []
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      orgList: [],
      tradeList: [],
      provinceList: [],
      cityList: [],
      urbanList: [],
      value: '',
      imageUrl: ''
    }
  },
  created () {
    console.log('11111111111111111111')
    console.log(this.$route.query.orgId)
    console.log('11111111111111111111')
    console.log('homeUrl')
    console.log(homeUrl)
    this.homeUrl = homeUrl
    console.log('homeUrl2')
    console.log(this.homeUrl)
    tradeList().then((res) => {
      console.log("res:", res);
      if (res.code == 0) {
        this.tradeList = res.tradeList
      } else {
        console.log(res.msg)
      }
    })
    // organizeQueryList().then((res) => {
    // 	console.log("res:", res);
    // 	if (res.code == 0) {
    // 		this.orgList = res.orgList
    // 	} else {
    // 		console.log(res.msg)
    // 	}
    // })
    if (this.$route.query.orgId) {
      this.editStatus = 1
      this.MqueryDetailByOrgId(this.$route.query.orgId)
    } else {
      console.log(this.$route.query.orgIdadd)
      console.log(this.$route.query.orgNameadd)
      this.form.parentId = this.$route.query.orgIdadd
      this.form.parentName = this.$route.query.orgNameadd
      accountRoleList().then((res) => {
        console.log("角色信息:", res);
        if (res.code == 0) {
          this.NewRoleList = res.roleList
          this.NewRoleList.forEach(item => {
            this.$set(item, "isVisible", true);
          })
        }
      })
    }

    organizeQueryTreeList().then((res) => {
      console.log("Treeres:", res);
      if (res.code == 0) {
        console.log('-------------------------')
        console.log(res.orgTree)
        console.log(this.orgTreeList)
        this.orgTreeList.push(res.orgTree)
        console.log(this.orgTreeList)
        console.log('-------------------------')
      } else {
        console.log(res.msg)
      }
    })

    queryProvinceList().then((res) => {
      console.log("res:", res);
      if (res.code == 0) {
        this.provinceList = res.provinceList
      } else {
        console.log(res.msg)
      }
    })
  },
  methods: {
    changeVis (item) {
      let visable = 0
      this.NewRoleList.map(item => {
        if (item.isVisible) {
          visable++
        }
      })
      if (visable == 1 && item.isVisible) {
        this.$message.error('至少分配一个角色')
      } else {
        item.isVisible = !item.isVisible
      }
    },
    MqueryDetailByOrgId (oneOrgId) {
      queryDetailByOrgId({
        orgId: oneOrgId
      }).then((res) => {
        console.log("res6546+46465456456456:", res);
        if (res.code == 0) {
          this.imageUrl = res.orgDetail.logoUrl
          this.form = res.orgDetail
          this.changePro()
          this.changeCity()
        } else {
          console.log(res.msg)
        }
      })

      queryListByOrgId({
        orgId: oneOrgId
      }).then((res) => {
        console.log("角色信息77777777777777777:", res);
        if (res.code == 0) {
          this.NewRoleList = res.roleList
          this.NewRoleList.forEach(item => {
            this.$set(item, "isVisible", true);
          })
        }
      })
    },
    MtreeData3 (data) {
      console.log(data);
      this.form.parentId = data.id
      queryListByOrgId2({
        orgId: this.form.parentId
      }).then((res) => {
        console.log("角色信息----------------------------------:", res);
        if (res.code == 0) {
          this.NewRoleList = res.roleList
          this.NewRoleList.forEach(item => {
            this.$set(item, "isVisible", true);
          })
          // this.userInfo.roleList = res.roleList
          // this.userInfo.roleId = ''
        }
      })
    },
    changeCity (val) {
      console.log(val)
      queryUrbanCityId({
        cityId: this.form.cityId
      }).then((res) => {
        console.log("角色信息:", res);
        if (res.code == 0) {
          // this.roleList = res.roleList
          this.urbanList = res.urbanList
        } else {
          console.log(res.msg)
        }
      })
    },
    changeCity2 (val) {
      console.log(val)
      queryUrbanCityId({
        cityId: this.form.cityId
      }).then((res) => {
        console.log("角色信息:", res);
        if (res.code == 0) {
          // this.roleList = res.roleList
          this.urbanList = res.urbanList
          this.form.urbanId = this.urbanList[0].urbanId
        } else {
          console.log(res.msg)
        }
      })
    },
    changePro (val) {
      console.log(val)
      queryCityBProvinceId({
        provinceId: this.form.provinceId
      }).then((res) => {
        console.log("cityList:", res);
        if (res.code == 0) {
          // this.roleList = res.roleList
          this.cityList = res.cityList
          // this.form.cityId = this.cityList[0].cityId
        } else {
          console.log(res.msg)
        }
      })
    },
    changePro2 (val) {
      console.log(val)
      queryCityBProvinceId({
        provinceId: this.form.provinceId
      }).then((res) => {
        console.log("cityList:", res);
        if (res.code == 0) {
          // this.roleList = res.roleList
          this.cityList = res.cityList
          // this.form.cityId = this.cityList[0].cityId
          this.form.cityId = this.cityList[0].cityId
          queryUrbanCityId({
            cityId: this.form.cityId
          }).then((res) => {
            console.log("角色信息:", res);
            if (res.code == 0) {
              // this.roleList = res.roleList
              this.urbanList = res.urbanList
              this.form.urbanId = this.urbanList[0].urbanId
            } else {
              console.log(res.msg)
            }
          })
        } else {
          console.log(res.msg)
        }
      })
    },
    cancelOrg () {
      this.$router.go(-1);
    },
    saveOrg () {
      console.log(this.form)
      this.form.roleList = []
      let newRoleList = []
      this.NewRoleList.map(item => {
        if (item.isVisible) {
          this.form.roleList.push(item)
          newRoleList.push({
            'roleId': item.roleId
          })
        }
      })
      console.log(newRoleList)
      console.log(this.form.roleList)
      this.form.roleIdList = newRoleList
      this.form.orgName = this.form.orgName.replace(/ /g, '')
      this.form.address = this.form.address.replace(/ /g, '')
      console.log(this.form)
      if (this.editStatus == 0) {
        organizeAdd(this.form).then((res) => {
          console.log("保存机构:", res);
          if (res.code == 0) {
            this.$message.success('保存成功')
            this.imageUrl = ''
            this.form = {
              "address": "",
              "cityId": "",
              "logoUrl": "",
              "orgName": "",
              "parentId": "",
              "provinceId": "",
              "tradeId": "",
              "urbanId": ""
            }
            this.$router.go(-1)
          } else {
            this.$message.error(res.msg);
          }
        })
      } else {
        organizeUpdateById(this.form).then((res) => {
          console.log("保存修改机构:", res);
          if (res.code == 0) {
            this.$message.success('保存成功')
            this.$router.go(-1);
          } else {
            this.$message.error(res.msg);
          }
        })
      }
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      console.log(file)
      if (res.code == 0) {
        this.form.logoUrl = res.url
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

::v-deep .avatar-uploader .el-upload {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px solid #e9e9e9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  left: 0.941176rem;
  /* top: 1.882352rem; */
}

.miniStar {
  /* margin-left: 6.441176rem; */
  font-size: 0.411764rem;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: RIGHT;
  color: #f44e43;
}

.miniText {
  margin-left: 0.117647rem;
  /* width: 100px; */
  font-size: 0.411764rem;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: RIGHT;
  color: #666666;
}

.miniInput {
  margin-left: 0.705882rem;
  width: 14.117647rem;
  /* height: 1.17647rem; */
  background: #ffffff;
  /* border: 1px solid #e9e9e9; */
  border-radius: 0.117647rem;
}

.miniInput2 {
  width: 4.411764rem;
  /* height: 1.17647rem; */
  background: #ffffff;
  /* border: 0.029411rem solid #e9e9e9; */
  border-radius: 0.117647rem;
}

.allPage {
  width: 100%;
  height: 100%;
  padding: 24px;
  padding-bottom: 0px;

  .bigBox {
    /* width: 1600px; */
    margin-top: 24px;
    width: 100%;
    /* height: 800px; */
    height: 100%;
    background: #ffffff;
    position: relative;
    /* background-color: pink; */

    .right2 {
      width: 100%;
      margin-top: 0.941176rem;

      .leftminiBox {
        width: 6.5%;
        /* background-color: pink; */
      }

      .NewRoleSz {
        margin-left: 0.705882rem;
        width: 14.117647rem;

        .NewMiniRole {
          width: 3.52941175rem;
          margin-bottom: 13px;

          .RoleImg {
            cursor: pointer;
            width: 18px;
            height: 18px;
          }

          .RoleImgfb {
            cursor: not-allowed;
            width: 20px;
            height: 20px;
          }

          .RoleText {
            margin-left: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: LEFT;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
