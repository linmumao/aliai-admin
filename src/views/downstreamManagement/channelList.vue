<template>
  <div class='channelList themeBgc'>
    <div class="bigKuang">

      <div class="TopK themeBgc">
        <!-- 顶部 -->
        <topContent :form="form" :statusList="statusList" @reset="reset" :isShowOne="true" :isShowTwo="false"
          :isShowThree="true" :isShowFour="true" :nameText="nameText" @currentDate="currentDate">
        </topContent>
      </div>
      <div class="TwoBox flex_c_s">
        <div class="flex_r" style="margin-bottom: 16px;">
          <el-button @click="addMember" type="primary">+ 新增</el-button>
        </div>
        <el-table :data="allList" border height="90%" style="width: 100%;" header-row-class-name="tableHeader"
          :row-class-name="tableRowClassName" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column align="center" width="200" prop="id" label="渠道名称">
          </el-table-column>
          <el-table-column align="center" width="200" prop="channelName" label="渠道名称">
          </el-table-column>
          <el-table-column align="center" width="200" prop="contactsName" label="联系人">
          </el-table-column>
          <el-table-column align="center" width="200" prop="contactsPhone" label="联系电话">
          </el-table-column>
          <el-table-column align="center" width="200" prop="coopProNum" label="合作产品数量">
            <template slot-scope="scope">
              <div @click="goTolist(scope.row.id)" class="flex_d_center themeC c_pointer">
                {{scope.row.coopProNum}}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="promoterNum" label="推广员数">
            <template slot-scope="scope">
              <div @click="goToPlist(scope.row)" class="flex_d_center themeC c_pointer">
                {{scope.row.promoterNum}}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="status" label="合作状态(正常/终止)">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.status==0?'正常':'终止'" placement="top" :enterable="false">
                <div class="flex_d_center">
                  <el-switch style="margin-left: 10px;" v-model="scope.row.status" :active-value="0" :inactive-value="1"
                    @change="changS($event,scope.row)" active-color="#46B251" inactive-color="#F44E43">
                  </el-switch>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" align="center" width="180" label="操作">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <div class="flex_d_center">
                <el-tooltip effect="dark" content="详情" placement="top" :enterable="false">
                  <div class="editFont c_pointer" @click="seDetia(scope.row)">
                    <img class="cardImg" src="../../assets/add_img/operation_details_20@2x.png">
                  </div>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                  <div class="editFont c_pointer" @click="deleteUser(scope.row)">
                    <img class="cardImg" src="../../assets/add_img/operation_delete_20@2x.png">
                  </div>
                </el-tooltip>
              </div>
            </template>
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
          <el-form-item label="关联机构：" prop="lowerId">
            <el-select v-model.trim="ruleForm.lowerId" :disabled="isShowMechanism" style="width: 100%;"
              :popper-append-to-body="false" placeholder="请选择">
              <el-option v-for="(item, index) in mechanismList" :key="index" :label="item.orgName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道名称：" prop="channelName">
            <el-input maxlength="35" v-model="ruleForm.channelName"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contactsName">
            <el-input maxlength="35" v-model="ruleForm.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话：" prop="contactsPhone">
            <el-input maxlength="11" v-model="ruleForm.contactsPhone"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button v-show="editStatus == '-1'" type="primary" @click="submitForm('ruleForm',-1)">提 交
            </el-button>
            <el-button v-show="editStatus !== '-1'" type="primary" @click="submitForm('ruleForm',1)">保 存
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import topContent from '../../components/topContent.vue'
import { getAlowerorgList, getChannelList, getChannelAdd, getChannelUpdate, getChannelDel, getchannelID, getChannelStatus } from '../../api/management'
export default {
  name: 'channelList',
  data () {
    return {
      form: {
        "beginTime": "",
        "channelName": "",
        "currentPage": 1,
        "endTime": "",
        'lowerId': "",
        "pageSize": 10,
        "status": ''
      },
      statusList: [{ id: '0', name: '正常' }, { id: '1', name: '终止' }],
      nameText: {
        one: '渠道名称',
        three: '渠道状态',
        four: '创建时间'
      },
      dialogDelete: false,
      // 分页
      total: 0,
      pageNo: 1,
      pageSize: 10,
      allList: [],
      dialogVisible: false,
      editStatus: '-1',
      ruleForm: {
        "channelName": "",
        "contactsName": "",
        "contactsPhone": "",
        "lowerId": ''
      },
      deleteUserId: '',
      mechanismList: [],
      rules: {
        lowerId: [{
          required: true,
          message: '请选择关联机构',
          trigger: 'change'
        }],
        channelName: [{
          required: true,
          message: '请选择渠道名称',
          trigger: 'blur'
        }],
      },
      isShowMechanism: false
    }
  },
  components: {
    topContent
  },
  created () {
    if (this.$route.query.id) {
      this.form.lowerId = this.$route.query.id
    }
    this.currentList()
    getAlowerorgList({
      'beginTime': '',
      "currentPage": 1,
      "endTime": "",
      "orgName": "",
      "pageSize": 10,
      "status": "",
    }).then(res => {
      this.mechanismList = res.data.list
    })
  },
  methods: {
    submitForm (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (index == '-1') {
            this.editStatus = '-1'
            getChannelAdd(this.ruleForm).then((res) => {
              if (res.code == 0) {
                this.$message.success('保存成功')
                this.currentList()
                this.dialogVisible = false
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            this.editStatus = '1'
            getChannelUpdate(this.ruleForm).then(res => {
              if (res.code == 0) {
                this.$message.success('编辑成功')
                this.currentList()
                this.dialogVisible = false
              } else {
                this.$message.error(res.msg);
              }
            })
          }
        } else {
          return false;
        }
      })
    },
    reset () {
      this.form = {
        "currentPage": 1,
        "endTime": "",
        "pageSize": 10,
        "phone": "",
        "createTime": "",
        "status": "",
        "upName": "",
        'lowerId': "",
      }
      this.currentList()
    },
    currentList () {
      getChannelList(this.form).then(res => {
        this.allList = res.data.list
        this.total = res.data.totalCount
      })
    },
    confirmDel () {
      getChannelDel(this.deleteUserId).then((res) => {
        if (res.code == 0) {
          this.$message.success('删除成功')
          this.dialogDelete = false
          this.currentList()
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    currentDate () {
      this.currentList()
    },
    goTolist (id) {
      this.$router.push('/addweb/downstreamManagement/cooperativeNumber?relationType=' + '1' + '&id=' + id)
    },
    goToPlist (row) {
      this.$router.push('/addweb/downstreamManagement/promotersList?id=' + row.id)
    },
    deleteUser (row) {
      this.deleteUserId = row.id
      this.dialogDelete = true
    },
    addMember () {
      this.ruleForm = {
        "channelName": "",
        "contactsName": "",
        "contactsPhone": "",
        "lowerId": ''
      }
      this.editStatus = '-1'
      this.dialogVisible = true
      this.isShowMechanism = false
    },
    seDetia (row) {
      console.log(row);
      this.editStatus = '1'
      this.isShowMechanism = true
      getchannelID(row.id).then(res => {
        this.ruleForm = res.data
      })
      this.dialogVisible = true
    },
    changS (event, row) {
      console.log(row);
      getChannelStatus({
        'id': row.id,
        'status': row.status.toString()
      }).then((res) => {
        if (res.code == 0) {
          this.$message.success('修改成功')
          this.currentList()
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
.channelList {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  .bigKuang {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding-top: 24px;

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