<template>
  <div class="allPage themeBgc">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="myColor" :to="{ path: '/addweb/productM/upstreamM' }">上游管理
        </el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == '-1'">新增上游</el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus !== '-1'">编辑上游</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;">基本信息</div>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item style="margin-top: 0.941176rem;" label="上游名称：" prop="upName">
          <el-input class="miniInput" maxlength="35" v-model.trim="form.upName"></el-input>
        </el-form-item>
        <el-form-item label="上游简称：" prop="upNameShort">
          <el-input class="miniInput" maxlength="35" v-model.trim="form.upNameShort"></el-input>
        </el-form-item>
        <el-form-item label="上游类型：" prop="upType">
          <el-select class="miniInput" style="1.17647rem" v-model.trim="form.upType" placeholder="请选择">
            <el-option v-for="(item,index) in typeList" :key="item.upTypeId" :label="item.typeName"
              :value="item.upTypeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人姓名：" prop="linkMan">
          <el-input class="miniInput" maxlength="10" v-model.trim="form.linkMan"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话：" prop="phone">
          <el-input class="miniInput" maxlength="11" v-model.trim="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remarks">
          <el-input class="miniInput" maxlength="50" v-model.trim="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="上游logo：" prop="logo">
          <el-upload 
             class="avatar-uploader" 
            :action="homeUrl+'docking/open/file'" 
            :show-file-list="false"
            :on-success="handleAvatarSuccess" 
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="boxFooter flex_d_center">
        <el-button @click="goBack">返回</el-button>
        <el-button type="primary" v-show="editStatus == '-1'" @click="submitForm('ruleForm')">提交</el-button>
        <el-button type="primary" v-show="editStatus !== '-1'" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  shoppingAupmangerSave,
  shoppingAuptypeInfoSelectAll,
  shoppingAupmangerUpdate,
  shoppingAupmangerUpdateQ
} from "../../api/management";
import homeUrl from "../../utils/url.js";
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系电话'));
      } else {
        let regPone = null;
        let mobile = /^1(3|4|5|6|7|8|9)\d{9}$/; //最新16手机正则
        let tel = /^(0[0-9]{2,3})([2-9][0-9]{4,7})+(\-[0-9]{1,4})?$/; //座机
        if (value.charAt(0) == 0) { // charAt查找第一个字符方法，用来判断输入的是座机还是手机号
          regPone = tel;
        } else {
          regPone = mobile;
        }
        if (!regPone.test(value)) {
          return callback(
            new Error("请填写正确的联系电话")
          );
        }
        callback();
      }
    };
    var onlyZH = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系人姓名'));
      } else {
        let regZh = /[^\u4E00-\u9FA5]/g
        if (regZh.test(value)) {
          return callback(
            new Error("联系人姓名只能为中文")
          );
        }
        callback();
      }

    };
    return {
      editStatus: '-1',
      typeList: '',
      orgTreeList: [],
      homeUrl: '',
      form: {
        // 真实数据
        "linkMan": "",
        "logo": "",
        "phone": "",
        "remarks": "",
        "upName": "",
        "upNameShort": "",
        "upType": ""
      },
      value: '',
      imageUrl: '',
      rules: {
        linkMan: [{
          required: true,
          validator: onlyZH,
          trigger: 'blur'
        }],
        phone: [
          // 添加正则表达式 pattern: /^1[3|5|7|8|9]\d{9}$/，验证手机号是否正确
          {
            required: true,
            validator: checkPhone,
            trigger: 'blur'
          },
        ],
        upName: [{
          required: true,
          message: '请输入上游名称',
          trigger: 'blur'
        }],
        upNameShort: [{
          required: true,
          message: '请输入上游简称',
          trigger: 'blur'
        }],
        upType: [{
          required: true,
          message: '请选择上游类型',
          trigger: 'blur'
        }],

        latitude: [
          // 添加正则表达式 pattern: /^1[3|5|7|8|9]\d{9}$/，验证手机号是否正确
          {
            required: true,
            message: '请输入纬度',
            trigger: 'blur'
          },
          {
            pattern: /^(\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/,
            message: '纬度整数部分为0-90,小数部分为0到6位!',
            trigger: 'blur'
          }
        ]
      },
    }
  },
  created () {
    this.homeUrl = homeUrl
    this.editStatus = this.$route.query.upMangerId
    shoppingAuptypeInfoSelectAll().then((res) => {
      console.log("查询类型下拉:", res);
      if (res.code == 0) {
        this.typeList = res.list
      } else {
        this.$message.error(res.msg);
      }
    })

    if (this.editStatus !== '-1') {
      shoppingAupmangerUpdate({
        id: this.editStatus
      }).then((res) => {
        console.log("数据回显:", res);
        if (res.code == 0) {
          // this.typeList = res.list
          this.form = res.data
          this.imageUrl = this.form.logo
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    saveUser () {
      console.log(this.form)
      // this.form.nickName = this.form.nickName.replace(/ /g, '')
      // this.form.password = this.form.password.replace(/ /g, '')
      // this.form.userName = this.form.userName.replace(/ /g, '')
      // console.log(this.form.password)
      shoppingAupmangerSave(this.form).then((res) => {
        console.log("保存:", res);
        if (res.code == 0) {
          this.$message.success('保存成功')
          // this.$router.go(-1)
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid)
          console.log(this.form)

          if (this.editStatus == '-1') {
            shoppingAupmangerSave(this.form).then((res) => {
              console.log("保存:", res);
              if (res.code == 0) {
                this.$message.success('保存成功')
                this.$router.go(-1)
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            shoppingAupmangerUpdateQ(this.form).then((res) => {
              console.log("编辑:", res);
              if (res.code == 0) {
                this.$message.success('编辑成功')
                this.$router.go(-1)
              } else {
                this.$message.error(res.msg);
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      console.log(file)
      if (res.code == 0) {
        this.form.logo = res.url
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
  /* margin-left: 0.705882rem; */
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
        width: 8%;
        /* background-color: pink; */
      }
    }
  }
}
</style>
