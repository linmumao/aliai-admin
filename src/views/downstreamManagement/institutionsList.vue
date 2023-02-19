<template>
  <div class='institutionsList themeBgc'>
    <div class="bigKuang">
      <div class="TopK themeBgc">
        <!-- 顶部 -->
        <topContent :form="form" :statusList="statusList" @reset="reset" :isShowOne="true" :isShowTwo="false"
          :isShowThree="true" :isShowFour="true" :isShowFive="false" :nameText="nameText" @currentDate="currentDate">
        </topContent>
      </div>
      <div class="TwoBox flex_c_s">
        <div class="flex_r" style="margin-bottom: 16px;">
          <el-button @click="addMember" type="primary">+ 新增</el-button>
        </div>
        <el-table :data="allList" border height="90%" style="width: 100%;" header-row-class-name="tableHeader"
          :row-class-name="tableRowClassName" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column align="center" prop="id" label="机构ID" width="200">
          </el-table-column>
          <el-table-column align="center" width="200" prop="orgName" label="机构名称">
          </el-table-column>
          <el-table-column align="center" width="200" prop="orgShortName" label="简称">
          </el-table-column>
          <el-table-column align="center" width="200" prop="contactsName" label="联系人">
          </el-table-column>
          <el-table-column align="center" width="200" prop="contactsPhone" label="联系电话">
          </el-table-column>
          <el-table-column align="center" width="150" prop="coopProNum" label="合作产品数量">
            <template slot-scope="scope">
              <div @click="goToPlist(scope.row.id)" class="flex_d_center themeC c_pointer">
                {{scope.row.coopProNum}}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" prop="channelNum" label="渠道数">
            <template slot-scope="scope">
              <div @click="goToChanellist(scope.row)" class="flex_d_center themeC c_pointer">
                {{scope.row.channelNum}}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="createTime" label="创建时间">
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
    </div>
  </div>
</template>
<script>
import { getAlowerorgList, getAlowerorgDel, getAlowerorgID, getAlowerorgStatus } from '../../api/management'
import topContent from '../../components/topContent.vue'
export default {
  name: 'institutionsList',
  data () {
    return {
      form: {
        'beginTime': '',
        "currentPage": 1,
        "endTime": "",
        "orgName": "",
        "pageSize": 10,
        "status": "",
      },
      statusList: [{ id: '0', name: '正常' }, { id: '1', name: '终止' },],
      nameText: {
        one: '机构名称：',
        three: '合作状态：',
        four: '创建时间：'
      },
      dialogDelete: false,
      // 分页
      total: 0,
      pageNo: 1,
      pageSize: 10,
      allList: [],
      deleteUserId: ''
    }
  },
  components: {
    topContent
  },
  created () {
    this.currentList()
  },
  methods: {
    reset () {
      this.form = {
        'beginTime': '',
        "currentPage": 1,
        "endTime": "",
        "orgName": "",
        "pageSize": 10,
        "status": "",
      }
      this.currentList()
    },
    currentList () {
      getAlowerorgList(this.form).then(res => {
        this.allList = res.data.list
        this.total = res.data.totalCount
      })
    },
    confirmDel () {
      getAlowerorgDel(this.deleteUserId).then((res) => {
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
    goToPlist (id) {
      this.$router.push('/addweb/downstreamManagement/cooperativeNumber?relationType=' + '0' + '&id=' + id)
    },
    goToChanellist (row) {
      console.log(row);
      this.$router.push('/addweb/downstreamManagement/channelList?id=' + row.id)
    },
    deleteUser (row) {
      console.log('rowrow:', row);
      this.deleteUserId = row.id
      this.dialogDelete = true
    },
    seDetia (row) {
      console.log(row);
      getAlowerorgID(row.id).then(res => {
        if (res.code == 0) {
          this.$router.push('/addweb/downstreamManagement/addMechanism?upMangerId=1&item=' + JSON.stringify(res.data))
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addMember () {
      this.$router.push('/addweb/downstreamManagement/addMechanism?upMangerId=-1',
      )
    },
    changS (event, row) {
      getAlowerorgStatus({
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
      this.currentList()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.currentList()
    }
  },
}
</script>
<style scoped lang='less'>
.institutionsList {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  // background-color: teal;
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