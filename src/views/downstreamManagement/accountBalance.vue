<template>
  <div class='accountBalance themeBgc'>
    <div class="titleMoney flex_rsb">
      <div class="itemSurplus" v-for="(item,index) in currentMoney" :key="index">
        <div class="moneyTop"><span style="font-size: 20px;">￥</span>{{item.money}}</div>
        <div class="contentText">{{item.countName}}</div>
        <div class="tipsText">{{item.tips}}</div>
      </div>
    </div>
    <div class="bigKuang">

      <div class="TopK themeBgc">
        <!-- 顶部 -->
        <topContent :form="form" :statusList="statusList" @reset="reset" :isShowOne="false" :isShowTwo="false"
          :isShowThree="true" :isShowFour="true" :nameText="nameText" @currentDate="currentDate">
        </topContent>
      </div>
      <div class="TwoBox flex_c_s">
        <el-table :data="allList" border height="90%" style="width: 100%;" header-row-class-name="tableHeader"
          :row-class-name="tableRowClassName" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column align="center" fixed="left" label="序号" type="index" width="100">
          </el-table-column>
          <el-table-column align="center" width="250" prop="productListId" label="金额">
          </el-table-column>
          <el-table-column align="center" width="250" prop="sourceUpName" label="类型">
          </el-table-column>
          <el-table-column align="center" width="250" prop="linkWay" label="创建时间">
          </el-table-column>
          <el-table-column align="center" width="250" prop="linkWay" label="操作人">
          </el-table-column>
          <el-table-column align="center" width="352" prop="linkWay" label="备注">
          </el-table-column>
        </el-table>
        <div class="footerBox flex_rjs_aend">
          <div class="sumBox">
            共 <span class="themeC">{{ total }}</span> 条
          </div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :current-page="pageNo"
            layout="sizes, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
      <el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="操作提示" :visible.sync="dialogDelete"
        top="30vh" width="30%">
        <div>确定删除该条数据吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDelete = false">取 消</el-button>
          <el-button @click="confirmDel" type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增编辑 -->
      <el-dialog :close-on-click-modal="false" custom-class="dialogClass" :title="editStatus=='-1'?'新增':'编辑'"
        :destroy-on-close="true" :visible.sync="dialogVisible" top="25vh" width="560px">
        <el-form @submit.native.prevent :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px"
          class="demo-ruleForm">
          <el-form-item label="推广员姓名：" prop="productType">
            <el-input maxlength="35" v-model="ruleForm.productType"></el-input>
          </el-form-item>
          <el-form-item label="推广员电话：" prop="productType">
            <el-input maxlength="35" v-model="ruleForm.productType"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button v-show="editStatus == '-1'" type="primary" @click="submitForm('ruleForm')">提 交
            </el-button>
            <el-button v-show="editStatus !== '-1'" type="primary" @click="submitForm('ruleForm')">保 存
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import topContent from '../../components/topContent.vue'
import { getPromoterID } from '../../api/management'
export default {
  name: 'accountBalance',
  data () {
    return {
      form: {
        "currentPage": 1,
        "endTime": "",
        "pageSize": 10,
        "phone": "",
        "createTime": "",
        "status": "",
        "upName": ""
      },
      statusList: [],
      nameText: {
        three: '类型：',
        four: '创建日期：'
      },
      dialogDelete: false,
      // 分页
      total: 0,
      pageNo: 1,
      pageSize: 10,
      allList: [],
      dialogVisible: false,
      editStatus: '-1',
      ruleForm: [],
      rules: {
      },
      currentMoney: [
        { money: 0, countName: '账户余额', tips: '当前推广员可提现的金额' },
        { money: 0, countName: '待处理金额', tips: '当前推广员已申请提现但未提现成功的金额' },
        { money: 0, countName: '已结算金额', tips: '当前推广员已提现成功的金额' },
      ]
    }
  },
  components: {
    topContent
  },
  created () {
    getPromoterID(this.$route.query.id).then(res => {
      this.currentMoney[0].money = res.data.balance
      this.currentMoney[1].money = res.data.pendingAmount
      this.currentMoney[2].money = res.data.settleAmount
    })
  },
  methods: {
    reset () {
      this.form = {
        "currentPage": 1,
        "endTime": "",
        "pageSize": 10,
        "phone": "",
        "createTime": "",
        "status": "",
        "upName": ""
      }
      this.currentList()
    },
    currentList () {

    },
    confirmDel () { },
    currentDate () { },
    goToPlist (id) {
      this.$router.push('/cooperativeNumber')
    },
    deleteUser (row) {
      this.deleteUserId = row.upMangerId
      this.dialogDelete = true
    },
    addMember () {
      this.editStatus = '-1'
      this.dialogVisible = true
    },
    changS (event, row) {
      shoppingAupmangerUpdateStatus({
        'upMangerId': row.upMangerId
      }).then((res) => {
        if (res.code == 0) {
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 为表格行添加样式
    tableRowClassName ({
      row,
      rowIndex
    }) {
      return 'tabRowC'
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val
      this.shoppingAupmangerInfosSlectM()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.shoppingAupmangerInfosSlectM()
    }
  },
}
</script>
<style scoped lang='less'>
.accountBalance {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  background-color: #f5f7fa;
  .titleMoney {
    .itemSurplus {
      width: 520px;
      // height: 170px;
      background: #ffffff;
      text-align: center;
      padding: 32px 0 24px 0;
      box-sizing: border-box;
      .moneyTop {
        font-size: 40px;
        font-family: DIN, DIN-Bold;
        font-weight: 700;
        text-align: center;
        color: #303133;
      }
      .contentText {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
        font-weight: 600;
        text-align: CENTER;
        color: #606266;
        margin: 17px 0 8px 0;
      }
      .tipsText {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: CENTER;
        color: #909399;
      }
    }
  }
  .bigKuang {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding-top: 24px;
    margin: 24px 0 0 0;

    .TopK {
      box-sizing: border-box;
      padding-top: 24px;
      margin-left: 24px;
      margin-right: 24px;
      padding: 24px;
    }

    .TwoBox {
      height: 77%;
      background: #ffffff;
      border-radius: 8px;
      box-sizing: border-box;
      padding: 24px;

      .footerBox {
        width: 100%;
        bottom: 0;
        margin-top: 10px;
        height: 8%;

        .sumBox {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: LEFT;
          color: #999999;
        }
      }
    }
  }
  .TwoBox {
    height: 77%;
    background: #ffffff;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 24px;

    .footerBox {
      width: 100%;
      bottom: 0;
      margin-top: 10px;
      height: 8%;

      .sumBox {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: LEFT;
        color: #999999;
      }
    }
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

  ::v-deep .el-icon-date:before {
    visibility: hidden;
  }

  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 0px;
    text-align: center;
  }

  ::v-deep .el-input--suffix .el-input__inner {
    padding-right: 0px;
  }
}
</style>