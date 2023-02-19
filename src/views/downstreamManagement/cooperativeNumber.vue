<template>
  <div class='cooperativeNumber themeBgc'>
    <div class="numberBlock flex_r_fw">
      <div v-for="(item,index) in titleList" :key="index" @click="currentProduct(index)"
        :class="currentIndex==index?'isCurrent':'noCurrent'">{{item}}
      </div>
    </div>
    <div class="bigKuang">
      <div class="TopK themeBgc">
        <!-- 顶部 -->
        <topContent :form="form" :statusList="statusList" @reset="reset" :isShowOne="false" :isShowTwo="false"
          :isShowThree="true" :isShowFour="true" :isShowFive="false" :isShowSix="true" :nameText="nameText"
          @currentDate="currentDate">
        </topContent>
      </div>
      <div class="TwoBox flex_c_s">
        <div class="flex_r" style="margin-bottom: 16px;">
          <el-button @click="addMember" type="primary">+ 新增</el-button>
        </div>
        <el-table :data="allList" border height="90%" style="width: 100%;" header-row-class-name="tableHeader"
          :row-class-name="tableRowClassName" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column align="center" width="255" prop="id" label="产品ID">
          </el-table-column>
          <el-table-column align="center" width="255" prop="proName" label="产品名称">
          </el-table-column>
          <el-table-column align="center" width="255" prop="superOrgName" label="所属上游">
          </el-table-column>
          <el-table-column align="center" width="255" prop="beginTime" label="生效日期">
          </el-table-column>
          <el-table-column align="center" width="255" prop="status" label="产品状态">
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
          <el-table-column fixed="right" align="center" width="300" label="操作">
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
    </div>
  </div>
</template>
<script>
import topContent from '../../components/topContent.vue'
import { getCoopproList, getCoopproStatus, getCoopproDel } from '../../api/management'
export default {
  name: 'cooperativeNumber',
  data () {
    return {
      form: {
        "beginTime": "",
        "channelId": '',
        "currentPage": 1,
        "endTime": "",
        "lowerId": '',
        "pageSize": 10,
        "proName": "",
        "promoterId": '',
        "relationType": '0',
        "status": '',
        'currentId': ''
      },
      statusList: [{ id: '0', name: '正常' }, { id: '1', name: '终止' }],
      nameText: {
        three: '产品状态：',
        six: '产品名称：',
        four: '生效日期：'
      },
      dialogDelete: false,
      // 分页
      total: 0,
      pageNo: 1,
      pageSize: 10,
      allList: [],
      titleList: ['机构合作产品', '渠道合作产品', '推广员合作产品'],
      currentIndex: '0',
      isShowOne: false,
      isShowTwo: true,
      isShowThree: true,
      deleteUserId: '',
    }
  },
  components: {
    topContent
  },
  created () {
    if (this.$route.query.relationType) {
      this.form.relationType = Number(this.$route.query.relationType)
      this.currentIndex = Number(this.$route.query.relationType)
      if (this.currentIndex == 0) {
        this.form.lowerId = this.$route.query.id
      } else if (this.currentIndex == 1) {
        this.form.channelId = this.$route.query.id
      } else if (this.currentIndex == 2) {
        this.form.promoterId = this.$route.query.id
      }
    }
    this.currentList()
  },
  methods: {
    currentProduct (index) {
      this.currentIndex = index
      this.form.relationType = index
      this.currentList()
    },
    reset () {
      this.form = {
        "beginTime": "",
        "channelId": '',
        "currentPage": 1,
        "endTime": "",
        "lowerId": '',
        "pageSize": 10,
        "proName": "",
        "promoterId": '',
        "relationType": this.form.relationType,
        "status": ''
      }
      this.currentList()
    },
    currentList () {
      getCoopproList(this.form).then(res => {
        this.allList = res.data.list
        this.total = res.data.totalCount
      })
    },
    confirmDel () {
      getCoopproDel(this.deleteUserId).then((res) => {
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
    deleteUser (row) {
      this.deleteUserId = row.id
      this.dialogDelete = true
    },
    addMember () {
      this.$router.push('/addweb/downstreamManagement/productDetail?relationType=' + this.form.relationType + '&editStatus=-1')
    },
    seDetia (row) {
      this.$router.push('/addweb/downstreamManagement/productDetail?relationType=' + this.form.relationType + '&editStatus=1' + '&id=' + row.id)
    },
    changS (event, row) {
      getCoopproStatus({
        'id': row.id,
        'status': row.status
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
.cooperativeNumber {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;

  .numberBlock {
    font-size: 15px;
    font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
    font-weight: 600;
    text-align: CENTER;
    color: #ffffff;
    line-height: 40px;
    .isCurrent {
      width: 144px;
      height: 40px;
      background: linear-gradient(286deg, #0997ff 0%, #006aff);
      cursor: pointer;
    }
    .noCurrent {
      width: 144px;
      height: 40px;
      background: #ffffff;
      color: #909399;
      cursor: pointer;
    }
  }
  .bigKuang {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    margin-top: 24px;
    padding: 24px 0 0 0;
    box-sizing: border-box;

    .TopK {
      box-sizing: border-box;
      padding-top: 24px;
      margin-left: 24px;
      margin-right: 24px;
      padding: 24px;
    }

    .TwoBox {
      /* margin-top: 24px; */
      height: 77%;
      background: #ffffff;
      border-radius: 8px;
      /* box-shadow: 0px 0px 20px 0px rgba(236, 72, 121, 0.05); */
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
    /* margin-top: 24px; */
    height: 77%;
    background: #ffffff;
    border-radius: 8px;
    /* box-shadow: 0px 0px 20px 0px rgba(236, 72, 121, 0.05); */
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