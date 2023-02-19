<template>
  <div class="productDetail themeBgc">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="myColor" :to="{ path: '/addweb/downstreamManagement/cooperativeNumber' }">合作产品
        </el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == '-1'">新增合作产品</el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus !== '-1'">合作产品详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;font-weight: 800;">产品类型
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item style="margin-top: 0.941176rem;" required label="选择机构：" prop="lowerId">
          <el-select v-model.trim="form.lowerId" style="width: 30.5%;" @change="changeMechanism"
            :popper-append-to-body="false" placeholder="请选择">
            <el-option v-for="(item, index) in instiList" :key="index" :label="item.orgName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top: 0.941176rem;" required label="选择渠道：" v-show="isShowChannel" prop="channelId">
          <el-select v-model.trim="form.channelId" style="width: 30.5%;" @change="changeChannel"
            :popper-append-to-body="false" placeholder="请选择">
            <el-option v-for="(item, index) in channelList" :key="index" :label="item.channelName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top: 0.941176rem;" required label="选择推广员：" v-show="isShowPromoter"
          prop="promoterId">
          <el-select v-model.trim="form.promoterId" style="width: 30.5%;" @change="changePromoter"
            :popper-append-to-body="false" placeholder="请选择">
            <el-option v-for="(item, index) in promList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top: 0.941176rem;" required label="所属上游：" prop="superId">
          <el-input style="width: 30.5%;" disabled v-model="upNameText"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 0.941176rem;" required label="产品名称：" prop="proId">
          <el-select v-model.trim="form.proId" style="width: 30.5%;" @change="productStandard"
            :popper-append-to-body="false" placeholder="请选择">
            <el-option v-for="(item, index) in nameList" :key="index" :label="item.productName||item.proName"
              :value="item.productListId||item.proId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;position: relative;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;font-weight: 800;">结算类型
          <img style="margin:0 0 0 5px" id="imgShow" @mouseover="changeActive($event)" @mouseout="moveOut"
            src="../../assets/question.png" alt="">
          <div class="limitContent" v-show="isShowLimit">
            <div>阶梯限制，下游每层级价格需大于上层，即上游价小于机构价小于渠道价小于推广员价 </div>
            <div style="margin:7px 0 0 0">
              总和限制，下游总和不可超过上游价，即机构价+渠道价+推广员价小于等于上游价 </div>
          </div>
        </div>
      </div>
      <el-form :model="form" style="margin-top: 0.941176rem;" :rules="rules" ref="ruleForm" label-width="120px"
        class="demo-ruleForm">
        <el-form-item label="价格类型：" required prop="priceType">
          <el-radio-group v-model="form.priceType">
            <el-radio :label="1">阶梯限制</el-radio>
            <el-radio :label="2">总和限制</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结算标准：" required prop="settlementList">
          <table class="standardContent" border v-show="isShowOne">
            <tr style="background-color: #F5F7FA;">
              <td>结算标准</td>
              <td>卡类型</td>
              <td>卡等级</td>
              <td>上游价</td>
              <td>机构价</td>
              <td>渠道价</td>
            </tr>
            <tr v-for="(item,index) in form.settlementList" :key="index">
              <th>{{item.settlementStandardName}}</th>
              <th>{{item.cardTypeName}}</th>
              <th>{{item.cardGradeName}}</th>
              <th>{{item.price}}
              </th>
              <th>
                <el-input v-model.trim="item.lowerPrice">{{item.lowerPrice}}</el-input>
              </th>
              <th>
                <el-input v-model.trim="item.channelPrice">{{item.channelPrice}}</el-input>
              </th>
            </tr>
          </table>
          <table class="standardContent" border v-show="isShowTwo">
            <tr style="background-color: #F5F7FA;">
              <td>结算标准</td>
              <td>卡类型</td>
              <td>卡等级</td>
              <td>机构价</td>
              <td>渠道价</td>
              <td>推广员价</td>
            </tr>
            <tr v-for="(item,index) in form.settlementList" :key="index">
              <th>{{item.settlementStandardName}}</th>
              <th>{{item.cardTypeName}}</th>
              <th>{{item.cardGradeName}}</th>
              <th>{{item.lowerPrice}}
              </th>
              <th>
                <el-input v-model.trim="item.channelPrice">{{item.channelPrice}}</el-input>
              </th>
              <th>
                <el-input v-model.trim="item.promoterPrice">{{item.promoterPrice}}</el-input>
              </th>
            </tr>
          </table>
          <table class="standardContent" border v-show="isShowThree">
            <tr style="background-color: #F5F7FA;">
              <td>结算标准</td>
              <td>卡类型</td>
              <td>卡等级</td>
              <td>推广员价</td>
            </tr>
            <tr v-for="(item,index) in form.settlementList" :key="index">
              <th>{{item.settlementStandardName}}</th>
              <th>{{item.cardTypeName}}</th>
              <th>{{item.cardGradeName}}</th>
              <th>
                <el-input v-model.trim="item.promoterPrice">{{item.promoterPrice}}</el-input>
              </th>
            </tr>
          </table>
        </el-form-item>
      </el-form>
    </div>
    <div class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;font-weight: 800;">基本信息
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
        style="margin-top: 0.941176rem;">
        <el-form-item label="生效时间：" required prop="beginTime">
          <el-date-picker v-model="form.beginTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input class="miniInput" maxlength="35" style="width:460px" v-model.trim="form.remark"></el-input>
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
  getAlowerorgList,
  getChannelList,
  getPromoterList,
  getCoopproAdd,
  getCoopproUpdate,
  shoppingAupmangerInfosSlect,
  shoppingAproductlistInfoS,
  shoppingAproductlistiInfoSBId,
  getCoopproID,
  getCoopproList,
  getAlowerorgID
} from "../../api/management";
export default {

  name: 'productDetail',
  data () {
    return {
      radio: 3,
      radioInvoicing: 2,
      editStatus: '-1',
      typeList: '',
      orgTreeList: [],
      form: {
        "beginTime": "",
        "channelId": '',
        "lowerId": '',
        "priceType": 1,
        'proId': '',
        "promoterId": '',
        "relationType": '0',
        "remark": "",
        "settlementList": [
          {
            "channelPrice": '',
            "id": 0,
            "lowerPrice": '',
            "promoterPrice": '',
            "settlementId": ''
          }
        ],
        "superId": ''
      },
      value: '',
      imageUrl: '',
      rules: {
        lowerId: [{
          required: true,
          message: '请选择机构',
          trigger: 'change'
        }],
        proId: [{
          required: true,
          message: '请选择产品名称',
          trigger: 'change'
        }],
        channelId: [{
          required: true,
          message: '请选择渠道',
          trigger: 'change'
        }],
        promoterId: [{
          required: true,
          message: '请选择推广员',
          trigger: 'change'
        }],
        beginTime: [{
          required: true,
          message: '请选择生效时间',
          trigger: 'blur'
        }],
      },
      belongsList: [
        { id: '1', name: '机构合作产品' },
        { id: '2', name: '渠道合作产品' },
        { id: '3', name: '推广员合作产品' },
      ],
      isShowOne: true,
      isShowTwo: false,
      isShowThree: false,
      valueTime: '',
      instiList: [],
      channelList: [],
      promList: [],
      upList: [{ upName: '', upMangerId: '' }],
      nameList: [],
      isShowChannel: false,
      isShowPromoter: false,
      sourceUpName: '',
      upNameText: "",
      isShowLimit: false
    }
  },
  created () {
    this.editStatus = this.$route.query.editStatus
    this.form.relationType = this.$route.query.relationType
    if (this.form.relationType == 0) {
      this.isShowChannel = false
      this.isShowPromoter = false
      this.isShowOne = true
      this.isShowTwo = false
      this.isShowThree = false
    } else if (this.form.relationType == 1) {
      this.isShowChannel = true
      this.isShowPromoter = false
      this.isShowOne = false
      this.isShowTwo = true
      this.isShowThree = false
    } else if (this.form.relationType == 2) {
      this.isShowChannel = true
      this.isShowPromoter = true
      this.isShowOne = false
      this.isShowTwo = false
      this.isShowThree = true
    }
    if (this.$route.query.editStatus == 1) {
      getCoopproID(this.$route.query.id).then(res => {
        this.form = res.data
        res.data.settlementList.forEach(v => {
          v.settlementStandardName = v.settlementStandard
          v.cardTypeName = v.cardType
          v.cardGradeName = v.cardGrade
        })
        this.changeMechanism(res.data.lowerId, '1')
        if (this.form.relationType == 2) {
          this.getChannel()
          this.getCooppro()
        }
      })
    }
    // 机构渠道推广员
    getAlowerorgList({
      'beginTime': '',
      "currentPage": 1,
      "endTime": "",
      "orgName": "",
      "pageSize": 99999,
      "status": "",
    }).then(res => {
      this.instiList = res.data.list
    })
  },
  methods: {
    moveOut () {
      this.isShowLimit = false
    },
    changeActive () {
      this.isShowLimit = true
    },
    changeMechanism (id, index) {
      if (index !== '1') {
        this.form.channelId = ''
        this.form.promoterId = ''
        this.upNameText = ''
        this.form.proId = ''
        this.form.settlementList = []
      }
      getAlowerorgID(id).then(res => {
        if (res.code == 0) {
          this.upNameText = res.data.superName
          this.form.superId = res.data.superId
          // 根据机构查渠道
          getChannelList({
            "currentPage": 1,
            "endTime": "",
            "pageSize": 99999,
            "phone": "",
            "createTime": "",
            "status": 0,
            "upName": "",
            'lowerId': id,
          }).then(res => {
            this.channelList = res.data.list
          })

          if (this.form.relationType == '0') {
            // 根据上游产品查产品
            shoppingAproductlistInfoS({
              "createTime": "",
              "currentPage": 1,
              "failureTime": "",
              "pageSize": 99999,
              "productName": "",
              "productType": "",
              "sourceUpName": "",
              "status": 0,
              "upMangerId": this.form.superId
            }).then((res) => {
              if (res.code == 0) {
                this.nameList = res.data.list
              }
            })
          } else if (this.form.relationType == '1') {
            // 根据机构查合作产品
            getCoopproList({
              "beginTime": "",
              "channelId": '',
              "currentPage": 1,
              "endTime": "",
              "lowerId": this.form.lowerId,
              "pageSize": 99999,
              "proName": "",
              "promoterId": '',
              "relationType": '0',
              "status": 0
            }).then(res => {
              this.nameList = res.data.list
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 根据渠道找推广员
    getChannel () {
      getPromoterList({
        "currentPage": 1,
        "endTime": "",
        "pageSize": 99999,
        "phone": "",
        "createTime": "",
        "status": 0,
        "upName": "",
        "channelId": this.form.channelId
      }).then(res => {
        this.promList = res.data.list
      })
    },
    // 根据渠道找产品
    getCooppro () {
      getCoopproList({
        "beginTime": "",
        "channelId": this.form.channelId,
        "currentPage": 1,
        "endTime": "",
        "lowerId": '',
        "pageSize": 99999,
        "proName": "",
        "promoterId": '',
        "relationType": '1',
        "status": 0
      }).then(res => {
        this.nameList = res.data.list
      })
    },
    changeChannel () {
      this.form.promoterId = ''
      if (this.form.relationType == '2') {
        this.form.proId = ''
        this.form.settlementList = []
        this.getChannel()
        this.getCooppro()
      }
    },
    changePromoter () {

    },
    productStandard (index) {
      let coopId
      this.nameList.forEach(v => {
        if (v.proId == index || v.productListId == index) {
          coopId = v.id
        }
      })
      if (this.form.relationType == '0') {
        shoppingAproductlistiInfoSBId({ id: index }).then(res => {
          this.form.settlementList = res.data.prices
          res.data.prices.forEach(v => {
            this.form.settlementList.forEach(item => {
              item.settlementId = v.id
            })
          })
          this.form.settlementList = res.data.prices
          this.form.settlementList.forEach(v => {
            if (v.settlementStandard == '1') {
              v.settlementStandardName = '有效新户'
            }
            else if (v.settlementStandard == '2') {
              v.settlementStandardName = '次月留存'
            }
            else if (v.settlementStandard == '3') {
              v.settlementStandardName = '新户领劵'
            }
            else if (v.settlementStandard == '4') {
              v.settlementStandardName = '新户开户'
            }
            else if (v.settlementStandard == '5') {
              v.settlementStandardName = '新户入金'
            }
            else if (v.settlementStandard == '6') {
              v.settlementStandardName = '新户进件'
            }
            else if (v.settlementStandard == '7') {
              v.settlementStandardName = '新户核卡'
            }
            else if (v.settlementStandard == '8') {
              v.settlementStandardName = '新户激活'
            }
            else if (v.settlementStandard == '9') {
              v.settlementStandardName = '新户首刷'
            }
            if (v.cardType == '0') {
              v.cardTypeName = '无'
              if (v.cardGrade == '0') {
                v.cardGradeName = '无'
              }
            }
            else if (v.cardType == '1') {
              v.cardTypeName = '借记卡'
              if (v.cardGrade == '1') {
                v.cardGradeName = 'I类户'
              }
              else if (v.cardGrade == '2') {
                v.cardGradeName = 'II类户'
              }
              else if (v.cardGrade == '3') {
                v.cardGradeName = 'III类户'
              }
            }
            else if (v.cardType == '2' || v.cardType == '3') {
              v.cardTypeName = '贷记卡'
              if (v.cardGrade == '0') {
                v.cardGradeName = '无'
              }
              else if (v.cardGrade == '4') {
                v.cardGradeName = '中端卡'
              }
              else if (v.cardGrade == '5') {
                v.cardGradeName = '高端卡'
              }
            }
          })
        })
      } else {
        getCoopproID(coopId).then(res => {
          this.form.settlementList = res.data.settlementList
          res.data.settlementList.forEach(v => {
            this.form.settlementList.forEach(item => {
              v.settlementStandardName = v.settlementStandard
              v.cardTypeName = v.cardType
              v.cardGradeName = v.cardGrade
            })
          })
        })
      }
    },
    goBack () {
      this.$router.push('/addweb/downstreamManagement/cooperativeNumber?relationType=' + this.form.relationType)
    },
    submitForm (formName) {
      if (this.form.relationType == 0) {
        for (let i = 0; i < this.form.settlementList.length; i++) {
          if (!this.form.settlementList[i].lowerPrice) {
            this.$message.error('请输入机构价')
            return
          } else if (!this.form.settlementList[i].channelPrice) {
            this.$message.error('请输入渠道价')
            return
          } else if (this.form.priceType == 1 && (this.form.settlementList[i].price >= this.form.settlementList[i].lowerPrice)) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          } else if (this.form.priceType == 1 && (this.form.settlementList[i].lowerPrice >= this.form.settlementList[i].channelPrice)) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          } else if (this.form.priceType == 2 && (this.form.settlementList[i].price < this.form.settlementList[i].lowerPrice)) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          } else if (this.form.priceType == 2 && (this.form.settlementList[i].price < this.form.settlementList[i].channelPrice)) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          } else if (this.form.priceType == 2 && (this.form.settlementList[i].price < (Number(this.form.settlementList[i].lowerPrice) + Number(this.form.settlementList[i].channelPrice)))) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          }
        }
      } else if (this.form.relationType == 1) {
        for (let i = 0; i < this.form.settlementList.length; i++) {
          if (!this.form.settlementList[i].channelPrice) {
            this.$message.error('请输入渠道价')
            return
          } else if (!this.form.settlementList[i].promoterPrice) {
            this.$message.error('请输入推广员价')
            return
          } else if (this.form.priceType == '1' && this.form.settlementList[i].price >= this.form.settlementList[i].channelPrice) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          } else if (this.form.priceType == '1' && this.form.settlementList[i].channelPrice >= this.form.settlementList[i].promoterPrice) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          } else if (this.form.priceType == '2' && this.form.settlementList[i].price < this.form.settlementList[i].channelPrice) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          } else if (this.form.priceType == '2' && this.form.settlementList[i].price < this.form.settlementList[i].promoterPrice) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          } else if (this.form.priceType == '2' && this.form.settlementList[i].price < (Number(this.form.settlementList[i].lowerPrice) + Number(this.form.settlementList[i].channelPrice) + Number(this.form.settlementList[i].promoterPrice))) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          }
        }
      } else if (this.form.relationType == 2) {
        for (let i = 0; i < this.form.settlementList.length; i++) {
          if (!this.form.settlementList[i].promoterPrice) {
            this.$message.error('请输入推广员价')
            return
          } else if (this.form.priceType == '2' && this.form.settlementList[i].price < (Number(this.form.settlementList[i].lowerPrice) + Number(this.form.settlementList[i].channelPrice) + Number(this.form.settlementList[i].promoterPrice))) {
            this.$message.error('当前价格类型不支持设置此价格，请重新设置')
            return
          }
        }
      }
      if (this.form.lowerId == '') {
        this.$message.error('请选择机构')
      } else if (this.form.superId == '') {
        this.$message.error('请所属上游')
      } else if (this.form.proId == '') {
        this.$message.error('请选择产品名称')
      } else if (this.form.relationType == 1 && this.form.channelId == '') {
        this.$message.error('请选择渠道')
      } else if (this.form.relationType == 2 && this.form.promoterId == '') {
        this.$message.error('请选择推广员')
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editStatus == '-1') {
              getCoopproAdd(this.form).then((res) => {
                if (res.code == 0) {
                  this.$message.success('保存成功')
                  this.$router.push('/addweb/downstreamManagement/cooperativeNumber?relationType=' + this.form.relationType)
                } else {
                  this.$message.error(res.msg);
                }
              })
            } else {
              getCoopproUpdate(this.form).then((res) => {
                if (res.code == 0) {
                  this.$message.success('编辑成功')
                  this.$router.push('/addweb/downstreamManagement/cooperativeNumber?relationType=' + this.form.relationType)
                } else {
                  this.$message.error(res.msg);
                }
              })
            }
          } else {
            return false;

          }
        })
      }
    },
  },
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

.productDetail {
  width: 100%;
  min-height: 100vh;
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
    table {
      border-collapse: collapse !important;
      border-bottom: 0px;
    }
    table,
    td {
      border: 1px solid #000000;
    }
    .standardContent {
      width: 965px;
      height: 109px;
      border: 1px solid #ebeef5;
      border-radius: 8px 8px 0px 0px;

      tr {
        background-color: #ffffff;
        height: 54px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: LEFT;
        color: #303133;
        ::v-deep .el-input__inner {
          // border: 1px solid transparent;
          margin: 0 -14px;
        }
        td {
          width: 965/5px;
          padding: 0 24px 0 24px;
          box-sizing: border-box;
          border: 1px solid #ebeef5;
        }
        th {
          width: 965/5px;
          font-weight: 400;
          padding: 0 25px 0 25px;
          box-sizing: border-box;
        }
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
::v-deep .el-icon-time:before {
  content: "";
}
.limitContent {
  position: absolute;
  width: 270px;
  font-size: 12px;
  color: #999999;
  border: 1px solid #e9e9e9;
  top: 27px;
  text-align: left;
  margin: 0 0 0 95px;
  padding: 5px;
  box-sizing: border-box;
  background-color: #ffffff;
  z-index: 9;
  border-radius: 4px;
  font-weight: 400;
}
</style>
