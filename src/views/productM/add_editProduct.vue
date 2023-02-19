<template>
  <div class="allPage themeBgc">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="myColor" :to="{ path: '/addweb/productM/productList' }">产品列表
        </el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == '-1'">新增产品</el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == '1'">编辑产品</el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == '2'">查看详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="height: 273px;" class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;">产品类型</div>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">产品类型：</div>
        </div>
        <!-- <el-input class="miniInput" maxlength="10" v-model.trim="form.nickName" placeholder="请输入内容"></el-input> -->
        <!-- <el-select class="miniInput" :popper-append-to-body="false" placeholder="请选择">
					<el-option v-for="(item, index) in typeList" :label="item.typeName" :value="item.typeValue">
					</el-option>
				</el-select> -->
        <el-select :disabled="editStatus !== '-1'" v-model="form.productType" class="miniInput"
          :popper-append-to-body="false" placeholder="请选择">
          <el-option v-for="(item, index) in pulldownlist" :label="item.productType" :value="item.productTypeId">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">产品名称：</div>
        </div>
        <el-input class="miniInput" maxlength="35" v-model.trim="form.productName" placeholder="请输入"></el-input>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">选择上游：</div>
        </div>
        <el-input class="miniInput" style="width: 10.117647rem;" v-model.trim="form.sourceUpName" maxlength="20"
          disabled="" placeholder="请输入内容"></el-input>
        <el-button :disabled="editStatus !== '-1'" style="margin-left: 25px;" @click="openUp" type="primary" plain="">
          选择上游</el-button>
      </div>
    </div>
    <div style="height: 600px;" class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;">结算类型</div>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">结算标准：</div>
        </div>
        <el-button @click="addStandard" style="margin-left: 0.705882rem;" type="primary" plain>+ 添加</el-button>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar"></div>
          <div class="miniText"></div>
        </div>
        <div style="margin-left: 0.705882rem;">
          <el-table :data="moneyList.prices" border height="400px" style="width: 100%;"
            header-row-class-name="tableHeader" :row-class-name="tableRowClassName"
            :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column align="center" label="序号" type="index" width="80">
            </el-table-column>
            <el-table-column align="center" width="200" prop="settlementStandard" label="结算标准">
              <template slot-scope="scope">
                <el-select v-model="scope.row.settlementStandard" placeholder="请选择">
                  <el-option v-for="(item, index) in settlementList" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" width="200" prop="cardType" label="卡类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.cardType" @change="changeCT(scope.row)" placeholder="请选择">
                  <el-option v-for="(item, index) in cardTypeList" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" width="200" prop="cardGrade" label="卡等级">
              <template slot-scope="scope">
                <el-select v-model="scope.row.cardGrade" placeholder="请选择">
                  <el-option v-for="(item, index) in scope.row.cardGradeList" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column align="center" width="200" prop="price" label="价格（元）">
              <template slot-scope="scope">
                <el-input maxlength="35" type="number" v-model.trim="scope.row.price" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" width="180" label="操作">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <div class="flex_d_center">
                  <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                    <div class="editFont c_pointer" @click="deleteUser(scope.$index,scope.row.id)">
                      <img class="cardImg" src="../../assets/add_img/operation_delete_20@2x.png">
                    </div>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div style="height: 605px;" class="bigBox">
      <div style="margin-top: 0px;" class="right2 flex_r_ic">
        <div class="fontS_m fontW_b fontC_303133" style="margin-left: 24px;margin-top: 24px;">基本信息</div>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">生效时间：</div>
        </div>
        <el-date-picker v-model="form.startTime" class="miniInput" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">失效时间：</div>
        </div>
        <el-date-picker v-model="form.failureTime" class="miniInput" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar"></div>
          <div class="miniText">产品描述：</div>
        </div>
        <el-input class="miniInput" type="textarea" :rows="2" maxlength="50" v-model.trim="form.productDescription"
          placeholder="请输入内容">
        </el-input>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">链接地址：</div>
        </div>
        <el-input class="miniInput" maxlength="2500" v-model.trim="form.linkAddress" placeholder="请输入内容">
        </el-input>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar">*</div>
          <div class="miniText">链接编码：</div>
        </div>
        <!-- <el-input class="miniInput" maxlength="20" v-model.trim="form.linkSerialNum" placeholder="请输入内容">
				</el-input> -->
        <el-input class="miniInput" oninput="value=value.replace(/[^\d]/g,'')" maxlength="20"
          v-model.trim="form.linkSerialNum" @blur="form.linkSerialNum = $event.target.value" placeholder="请输入">
        </el-input>
      </div>
      <div style="margin-top: 0.941176rem;" class="right2 flex_r_ic">
        <div class="flex_rend_c leftminiBox">
          <div class="miniStar"></div>
          <div class="miniText">备注：</div>
        </div>
        <el-input class="miniInput" maxlength="50" v-model.trim="form.remarks" placeholder="请输入内容"></el-input>
      </div>
      <div style="bottom: 0px;" class="boxFooter flex_d_center">
        <el-button @click="goBack">返回</el-button>
        <el-button v-show="editStatus == '-1'" type="primary" @click="saveUser">提交</el-button>
        <el-button v-show="editStatus == '1'" type="primary" @click="saveUser">保存</el-button>
      </div>
    </div>
    <el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="选择上游" :visible.sync="dialogSelect"
      top="10vh" width="800px">
      <el-input placeholder="上游名称" style="width: 280px;" v-model.trim="serchName" @keyup.enter.native="serchAll">
        <i slot="suffix" style="line-height: 32px;margin-right: 5px;" @click="serchAll"
          class="el-icon-search c_pointer"></i>
      </el-input>
      <el-table :data="AllList" border height="603px" style="width: 100%;margin-top: 16px;"
        header-row-class-name="tableHeader" :row-class-name="tableRowClassName"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column label="序号" type="index" width="80">
        </el-table-column>
        <el-table-column align="center" width="200" prop="upMangerId" label="上游ID">
        </el-table-column>
        <el-table-column align="center" prop="upNameShort" label="上游简称">
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">有效</span>
            <span v-else>停用</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <div class="flex_d_center">
              <div class="editFont themeC c_pointer" @click="selectUp(scope.row)">
                选择
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrgInfo,
  queryListByOrgId2,
  accountUserAdd,
  organizeQueryTreeList,


  shoppingAupmangerInfosSlect,
  shoppingAuptypeInfolist,
  shoppingAproductlistSave,
  shoppingAproductlistiInfoSBId,
  shoppingAproductlistUpdate
} from "../../api/management";
import homeUrl from "../../utils/url.js";
const selectTree = () => import('@/components/selectTree')
export default {
  components: {
    selectTree
  },
  data () {
    return {
      editStatus: '-1',
      arguments: '-1',
      AllList: [],
      pulldownlist: [],
      dialogSelect: false,
      orgTreeList: [],
      homeUrl: '',
      organizationList: '',
      roleList: '',
      settlementList: [{
        id: '1',
        name: '有效新户'
      },
      {
        id: '2',
        name: '次月留存'
      },
      {
        id: '3',
        name: '新户领劵'
      },
      {
        id: '4',
        name: '新户开户'
      },
      {
        id: '5',
        name: '新户入金'
      },
      {
        id: '6',
        name: '新户进件'
      },
      {
        id: '7',
        name: '新户核卡'
      },
      {
        id: '8',
        name: '新户激活'
      },
      {
        id: '9',
        name: '新户首刷'
      }
      ],
      cardTypeList: [{
        id: '0',
        name: '无'
      },
      {
        id: '1',
        name: '借记卡'
      },
      {
        id: '2',
        name: '贷记卡'
      },
      {
        id: '3',
        name: '准贷记卡'
      },
      ],
      cardGradeList1: [{
        id: '0',
        name: '无'
      }],
      cardGradeList2: [{
        id: '1',
        name: 'I类户'
      },
      {
        id: '2',
        name: 'II类户'
      },
      {
        id: '3',
        name: 'III类户'
      }
      ],
      cardGradeList3: [{
        id: '0',
        name: '无'
      },
      {
        id: '4',
        name: '中端卡'
      },
      {
        id: '5',
        name: '高端卡'
      }
      ],
      value: '',
      imageUrl: '',
      serchName: '',
      form: {
        "failureTime": "",
        "isDeleted": 0,
        "linkAddress": "",
        "linkSerialNum": "",
        "priceId": 0,
        "prices": [{
          "cardGrade": "0",
          "cardType": "0",
          "price": "",
          "settlementStandard": "-1",
          'isDeleted': 0,
          "cardGradeList": [{
            id: '0',
            name: '无'
          }]
        }],
        "productDescription": "",
        "productListId": 0,
        "productName": "",
        "productType": "",
        "remarks": "",
        "sourceUp": "",
        "sourceUpName": "",
        "startTime": "",
        "status": 0
      },
      moneyList: {
        "prices": [{
          "cardGrade": "0",
          "cardType": "0",
          "price": "",
          "settlementStandard": "",
          'isDeleted': 0,
          "cardGradeList": [{
            id: '0',
            name: '无'
          }]
        }],
      },
      chMoneyList: {
        "prices": [{
          "cardGrade": "0",
          "cardType": "0",
          "price": "",
          "settlementStandard": "",
          'isDeleted': 0,
          "cardGradeList": [{
            id: '0',
            name: '无'
          }]
        }],
      }
    }
  },
  created () {
    console.log('homeUrl')
    console.log(homeUrl)
    this.homeUrl = homeUrl
    console.log('homeUrl2')
    console.log(this.homeUrl)
    console.log('1111')
    this.cardGradeList = this.cardGradeList1
    shoppingAuptypeInfolist().then((res) => {
      console.log("查询类型下拉:", res);
      if (res.code == 0) {
        this.pulldownlist = res.data
      } else {
        this.$message.error(res.msg);
      }
    })

    this.shoppingAupmangerInfosSlectM()
    this.editStatus = this.$route.query.editStatus
    this.arguments = this.$route.query.arguments
    if (this.editStatus !== '-1') {
      shoppingAproductlistiInfoSBId({
        id: this.arguments
      }).then((res) => {
        this.chMoneyList.prices = JSON.stringify(res.data.prices)
        JSON.parse(this.chMoneyList.prices).forEach(v => {
          v.isDeleted = '0'
        })
        this.moneyList.prices = JSON.parse(this.chMoneyList.prices)
        this.moneyList.prices.forEach(v => {
          v.isDeleted = '0'
          switch (v.cardType) {
            case "0":
              v.cardGradeList = this.cardGradeList1
              break;
            case "1":
              v.cardGradeList = this.cardGradeList2
              break;
            case "2":
              v.cardGradeList = this.cardGradeList3
              break;
            case "3":
              v.cardGradeList = this.cardGradeList3
              break;
          }
        })
        if (res.code == 0) {
          this.form = res.data
          console.log("回显111111111:", this.form);
          this.form.prices.forEach(item => {
            item.isDeleted = '0'
            switch (item.cardType) {
              case "0":
                item.cardGradeList = this.cardGradeList1
                break;
              case "1":
                item.cardGradeList = this.cardGradeList2
                break;
              case "2":
                item.cardGradeList = this.cardGradeList3
                break;
              case "3":
                item.cardGradeList = this.cardGradeList3
                break;
            }
          })
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  },
  methods: {
    // 为表格行添加样式
    tableRowClassName ({
      row,
      rowIndex
    }) {
      return 'tabRowC'
    },
    serchAll () {
      this.pageNo = 1
      this.shoppingAupmangerInfosSlectM()
    },
    openUp () {
      this.dialogSelect = true
    },
    changeCT (row) {
      console.log(row)
      switch (row.cardType) {
        case "0":
          row.cardGradeList = this.cardGradeList1
          row.cardGrade = "0"
          break;
        case "1":
          row.cardGradeList = this.cardGradeList2
          row.cardGrade = "1"
          break;
        case "2":
          row.cardGradeList = this.cardGradeList3
          row.cardGrade = "0"
          break;
        case "3":
          row.cardGradeList = this.cardGradeList3
          row.cardGrade = "0"
          break;
      }
    },
    addStandard () {
      if (this.form.prices.length >= 20) {
        this.$message.error('最多添加20个')
      } else {
        this.moneyList.prices.push({
          "cardGrade": "0",
          "cardType": "0",
          'isDeleted': '0',
          "price": "",
          "settlementStandard": "",
          "cardGradeList": [{
            id: '0',
            name: '无'
          }]
        })
      }
    },
    deleteUser (index, id) {
      if (this.moneyList.prices.length == 1) {
        this.$message.error('最少保留一条数据')
      } else {
        this.form.prices.forEach(vi => {
          if (vi.id == id) {
            vi.isDeleted = '1'
          }
        })
        this.moneyList.prices.splice(index, 1);
      }
    },
    selectUp (row) {
      console.log(row)
      this.form.sourceUp = row.upMangerId
      this.form.sourceUpName = row.upName
      this.dialogSelect = false
    },
    shoppingAupmangerInfosSlectM () {
      shoppingAupmangerInfosSlect({
        "currentPage": 1,
        "endTime": "",
        "pageSize": 999999,
        "phone": "",
        "startTime": "",
        "status": "",
        "upName": this.serchName
      }).then((res) => {
        console.log("res:", res);
        if (res.code == 0) {
          console.log(res)
          this.AllList = []
          // this.total = res.data.totalCount
          res.data.list.map(item => {
            if (item.status == 0) {
              this.AllList.push(item)
            }
          })
          // this.AllList = res.data.list
        } else {
          console.log(res.msg)
        }
      })
    },
    goBack () {
      this.$router.go(-1);
    },
    CheckArrayElement (array) {
      array.sort(); //数组排序
      var reNum = 0; //返回结果
      //遍历整个数组对象
      for (var i = 0; i < array.length; i++) {
        //跳过最后一个元素的比较
        if (i + 1 == array.length) {
          continue;
        }
        //判断相邻的元素是否相同
        if (array[i] == array[i + 1]) {
          reNum += 1;
        }
      }
      return reNum;
    },
    saveUser () {
      console.log('哈哈哈哈哈：', this.form);
      var time = 0
      var newList = []
      this.moneyList.prices.forEach(i => {
        console.log(i.id);
        if (i.id) {
          this.form.prices.forEach((v, index) => {
            if (v.id == i.id) {
              console.log(index);
              this.form.prices.splice(index, 1);
              this.form.prices.push(i)
            }
          })
          // this.form.prices = []
          // this.form.prices.push(i)
        } else {
          if (this.form.prices[0].settlementStandard == '-1') {
            this.form.prices = []
            this.form.prices.push(i)
          } else {
            this.form.prices.push(i)
          }
        }
      })
      this.form.linkAddress = this.form.linkAddress.replace(/ /g, '')
      if (this.form.productType == '') {
        this.$message.error('产品类型不能为空')
      } else if (this.form.productName == '') {
        this.$message.error('产品名称不能为空')
      } else if (this.form.sourceUp == '') {
        this.$message.error('上游不能为空')
      } else if (this.form.startTime == '' || this.form.startTime == null) {
        this.$message.error('生效时间不能为空')
      } else if (this.form.failureTime == '' || this.form.failureTime == null) {
        this.$message.error('失效时间不能为空')
      } else if (new Date(this.form.startTime).getTime() > new Date(this.form.failureTime).getTime()) {
        this.$message.error('失效时间不能小于生效时间');
      } else if (this.form.linkAddress == '') {
        this.$message.error('链接地址不能为空')
      } else if (this.form.linkSerialNum == '') {
        this.$message.error('链接编码不能为空')
      } else {
        for (var i = 0; i < this.form.prices.length; i++) {
          newList.push(this.form.prices[i].settlementStandard + this.form.prices[i].cardType + this.form
            .prices[i].cardGrade)
          if (this.form.prices[i].settlementStandard == '') {
            this.$message.error('结算标准不能为空')
            return
          } else if (this.form.prices[i].cardType == '') {
            this.$message.error('卡类型不能为空')
            return
          } else if (this.form.prices[i].cardGrade == '') {
            this.$message.error('卡等级不能为空')
            return
          } else if (this.form.prices[i].price == '') {
            this.$message.error('价格不能为空')
            return
          } else if (this.form.prices[i].price < 0) {
            this.$message.error('价格不能小于0')
            return
          } else if (this.form.prices[i].price > 999999.99) {
            this.$message.error('价格不能大于999999.99')
            return
          }
          // clearTimeout(time)
        }

        if (this.CheckArrayElement(newList) > 0) {
          this.$message.error('结算标准不能重复')
        } else {
          if (this.editStatus == '-1') {
            shoppingAproductlistSave(this.form).then((res) => {
              console.log("保存:", res);
              if (res.code == 0) {
                this.$message.success('保存成功')
                this.$router.go(-1)
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            console.log('this.form:', this.form);
            shoppingAproductlistUpdate(this.form).then((res) => {
              console.log("编辑:", res);
              if (res.code == 0) {
                this.$message.success('编辑成功')
                this.$router.go(-1)
              } else {
                this.$message.error(res.msg);
              }
            })
          }
        }
        // time = setTimeout(() => {
        // 	console.log('定时器')

        // }, 100)

        // alert(this.CheckArrayElement(newList))
      }

    },
  },
  mounted () { }
}
</script>

<style lang='less' scoped>
/*滚动条整体部分,必须要设置*/
::-webkit-scrollbar {
  width: 0px;
  /*滚动条宽度（右侧滚动条）*/
  height: 00px;
  /*滚动条高度（底部滚动条）*/
  background-color: #333;
}

/*滚动条的轨道，一下两个样式组合作用于滚动条滚动轨迹的表现*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: #67687d;
}

::-webkit-scrollbar-track-piece {
  background: #ff0000;
}

/*滚动条的滑块按钮*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #de6b90;
  box-shadow: inset 0 0 5px #000;
}

/*滚动条的上下左右两端的按钮*/
::-webkit-scrollbar-button {
  height: 10px;
  width: 10px;
  background-color: #b0aeda;
}

/*滚动条下边和右边按钮的交接处*/
::-webkit-scrollbar-corner {
  background: #82afff;
}

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
  /* height: 1.17647rem !important; */
  background: #ffffff;
  border-radius: 0.117647rem;
}

.allPage {
  width: 100%;
  height: 92vh;
  padding: 24px;
  padding-bottom: 0px;
  overflow-y: scroll;

  .bigBox {
    margin-top: 24px;
    width: 100%;
    /* height: 605px; */
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

/* ::v-deep .el-icon-date:before {
		visibility: hidden;
	} */

::v-deep .el-icon-time {
  display: none;
}

::v-deep .tabRowC {
  background: #ffffff;
  height: 54px;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  color: #999999;
}

::v-deep .tableHeader th {
  height: 54px;
  background: #f5f7fa;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  overflow: auto;
  color: #333333;
}
</style>
