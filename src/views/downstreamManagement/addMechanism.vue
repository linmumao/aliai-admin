<template>
  <div class="addMechanism themeBgc">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="myColor" :to="{ path: '/addweb/downstreamManagement/institutionsList' }">机构列表
        </el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == '-1'">新增机构</el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus !== '-1'">编辑机构</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;font-weight: 800;">基本信息
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item style="margin-top: 0.941176rem;" required label="机构名称：" prop="orgName">
          <el-input class="miniInput" maxlength="35" v-model.trim="form.orgName"></el-input>
        </el-form-item>
        <el-form-item label="简称：" prop="orgShortName">
          <el-input class="miniInput" maxlength="35" v-model.trim="form.orgShortName"></el-input>
        </el-form-item>
        <el-form-item label="机构地址：" prop="addr">
          <el-input class="miniInput" maxlength="10" v-model.trim="form.addr"></el-input>
        </el-form-item>
        <el-form-item label="详细地址：" prop="detailAddr">
          <el-input class="miniInput" maxlength="12" v-model.trim="form.detailAddr"></el-input>
        </el-form-item>
        <el-form-item label="营业执照：" prop="busLicense">
          <el-upload class="avatar-uploader" :action="homeUrl+'docking/open/file'" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="关联上游：" required prop="superId">
          <el-select v-model.trim="form.superId" style="width: 30.5%;" :disabled="isCloseSuper"
            :popper-append-to-body="false" placeholder="请选择">
            <el-option v-for="(item, index) in AllList" :key="item.upMangerId" :label="item.upName"
              :value="item.upMangerId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;font-weight: 800;">联系人信息
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item style="margin-top: 0.941176rem;" label="联系人姓名：" prop="contactsName">
          <el-input class="miniInput" maxlength="35" v-model.trim="form.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：" prop="contactsPhone">
          <el-input class="miniInput" maxlength="11" v-model.trim="form.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item label="联系人邮箱：" prop="contactsEmain">
          <el-input class="miniInput" v-model.trim="form.contactsEmain"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;font-weight: 800;">结算信息
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
        style="margin-top: 0.941176rem;">
        <el-form-item label="纳税人类型：" required prop="taxpayerType">
          <el-radio-group v-model="form.taxpayerType">
            <el-radio :label="0">一般纳税人</el-radio>
            <el-radio :label="1">小规模纳税人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开票税点：" required prop="taxPoint">
          <el-radio-group v-model="form.taxPoint">
            <el-radio :label="0">1%</el-radio>
            <el-radio :label="1">3%</el-radio>
            <el-radio :label="2">6%</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开户许可证：" prop="licenceUrl">
          <el-upload class="avatar-uploader" :action="homeUrl+'docking/open/file'" :show-file-list="false"
            :on-success="handleAvatarSuccessTwo" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrlTwo" :src="imageUrlTwo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top: -20px;" label="开户行：" prop="bankName">
          <el-input class="miniInput" maxlength="35" v-model.trim="form.bankName"></el-input>
        </el-form-item>
        <el-form-item label="银行账号：" prop="bankNo">
          <el-input class="miniInput" maxlength="35" v-model.trim="form.bankNo"></el-input>
        </el-form-item>
        <el-form-item label="法人身份证：" prop="idcardUrl">
          <el-upload class="avatar-uploader" :action="homeUrl+'docking/open/file'" :show-file-list="false"
            :on-success="handleAvatarSuccessThree" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrlThree" :src="imageUrlThree" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="法人姓名：" prop="legalPerName" style="margin-top: -20px;">
          <el-input class="miniInput" maxlength="10" v-model.trim="form.legalPerName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="legalPerIdcard">
          <el-input class="miniInput" maxlength="18" v-model.trim="form.legalPerIdcard"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="flex_d_center footerBox">
      <el-button @click="goBack">返回</el-button>
      <el-button type="primary" v-show="editStatus == '-1'" @click="submitForm('ruleForm')">提交</el-button>
      <el-button type="primary" v-show="editStatus !== '-1'" @click="submitForm('ruleForm')">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  shoppingAupmangerInfosSlect,
  getAlowerorgAdd,
  getAlowerorgUpdate
} from "../../api/management";
import homeUrl from "../../utils/url.js";
export default {
  name: 'addMechanism',
  data () {
    return {
      radioTaxpayer: 3,
      radioInvoicing: 2,
      statusList: [],
      editStatus: '-1',
      typeList: '',
      orgTreeList: [],
      homeUrl: '',
      form: {
        "addr": "",
        "bankName": "",
        "bankNo": "",
        "busLicense": "",
        "contactsEmain": "",
        "contactsName": "",
        "contactsPhone": "",
        "detailAddr": "",
        "idcardUrl": "",
        "legalPerIdcard": "",
        "legalPerName": "",
        "licenceUrl": "",
        "orgName": "",
        "orgShortName": "",
        "superId": '',
        "taxPoint": 0,
        "taxpayerType": 0
      },
      value: '',
      imageUrl: '',
      imageUrlTwo: '',
      imageUrlThree: '',
      rules: {
        orgName: [{
          required: true,
          message: '请选择机构名称',
          trigger: 'change'
        }],
        superId: [{
          required: true,
          message: '请选择关联上游',
          trigger: 'change'
        }]
      },
      AllList: [],
      idItem: {},
      isCloseSuper: false
    }
  },
  created () {
    this.homeUrl = homeUrl
    this.editStatus = this.$route.query.upMangerId
    if (this.$route.query.upMangerId == '1') {
      this.isCloseSuper = true
    } else {
      this.isCloseSuper = false
    }
    if (this.$route.query.item) {
      this.idItem = JSON.parse(this.$route.query.item)
      this.form = this.idItem
      this.imageUrl = this.form.busLicense
      this.imageUrlTwo = this.form.licenceUrl
      this.imageUrlThree = this.form.idcardUrl
    }

    shoppingAupmangerInfosSlect({
      "currentPage": 1,
      "endTime": "",
      "pageSize": 999999,
      "phone": "",
      "startTime": "",
      "status": "",
    }).then((res) => {
      if (res.code == 0) {
        console.log(res)
        this.AllList = []
        res.data.list.map(item => {
          if (item.status == 0) {
            this.AllList.push(item)
          }
        })
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    saveUser () {
      getAlowerorgAdd(this.form).then((res) => {
        if (res.code == 0) {
          this.$message.success('保存成功')
          this.$router.go(-1)
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    submitForm (formName) {
      if (this.form.orgName == '') {
        this.$message.error('请输入机构名称')
      } else if (this.form.busLicense == '') {
        this.$message.error('请上传营业执照')
      } else if (this.form.superId == '') {
        this.$message.error('请上传关联上游')
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editStatus == '-1') {
              this.saveUser()
            } else {
              getAlowerorgUpdate(this.form).then(res => {
                if (res.code == 0) {
                  this.$message.success('编辑成功')
                  this.$router.go(-1)
                } else {
                  this.$message.error(res.msg);
                }
              })
            }
          } else {
            return false;
          }
        });
      }
    },
    handleAvatarSuccess (res, file) {
      if (res.code == 0) {
        this.form.busLicense = res.url
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
    handleAvatarSuccessTwo (res, file) {
      if (res.code == 0) {
        this.form.licenceUrl = res.url
        this.imageUrlTwo = URL.createObjectURL(file.raw);
      }
    },
    handleAvatarSuccessThree (res, file) {
      if (res.code == 0) {
        this.form.idcardUrl = res.url
        this.imageUrlThree = URL.createObjectURL(file.raw);
      }
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      if (isLt2M && isJPG || isLt2M && isPng) {
      } else {
        this.$message.error('上传头像只能是PNG或JPG格式，并且不能大于1M');
      }
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
  background-color: #f5f7fa;
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
  width: 14.117647rem;
  height: 1.17647rem !important;
  background: #ffffff;
  border-radius: 0.117647rem;
}

.addMechanism {
  width: 100%;
  padding: 24px;
  padding-bottom: 75px;
  box-sizing: border-box;

  .bigBox {
    margin-top: 24px;
    width: 100%;
    background: #ffffff;
    position: relative;
    padding-bottom: 12px;
    box-sizing: border-box;

    .right2 {
      width: 100%;
      margin-top: 0.941176rem;

      .leftminiBox {
        width: 8%;
      }
    }
  }
}
.footerBox {
  position: fixed;
  // width: 84.5%;
  width: 50rem;
  height: 64px;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
  right: 0 0.75rem 0 0;
  box-sizing: border-box;
}
</style>
