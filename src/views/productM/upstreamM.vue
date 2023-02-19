<template>
  <div class="allPage themeBgc">
    <div class="bigKuang">
      <div class="TopK themeBgc">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="flex_r_ic">
              <span style="white-space:nowrap;margin-right: 12px;">上游名称</span>
              <el-input v-model.trim="form.upName" @keyup.enter.native="serchAll" maxlength="35" placeholder="请输入">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex_r_ic">
              <span style="white-space:nowrap;margin-right: 12px;">联系电话</span>
              <el-input v-model.trim="form.phone" @keyup.enter.native="serchAll" maxlength="35" placeholder="请输入">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex_r_ic">
              <span style="white-space:nowrap;margin-right: 12px;">上游状态</span>
              <el-select v-model.trim="form.status" style="width: 100%;" :popper-append-to-body="false"
                placeholder="请选择">
                <el-option v-for="(item, index) in StatusList" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex_r_ic">
              <span style="white-space:nowrap;margin-right: 12px;">创建时间</span>
              <el-date-picker v-model="form.createTime" style="width: 50%;" :clearable="false" type="date"
                placeholder="选择日期">
              </el-date-picker>
              <span style="margin-left: 4px;margin-right: 3px;">-</span>
              <el-date-picker v-model="form.endTime" style="width: 50%;" :clearable="false" type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 16px;" :gutter="24">
          <el-col :span="6">
            <div class="flex_r">
              <span style="white-space:nowrap;margin-right: 12px;">&#12288;&#12288;&#12288;&#12288;</span>
              <el-button @click="serchAll" type="primary">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-col>
          <el-col :span="6">

          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="6">

          </el-col>
        </el-row>
      </div>

      <div class="TwoBox flex_c_s">
        <div class="flex_r" style="margin-bottom: 16px;">
          <el-button @click="addMember" type="primary">+ 新增</el-button>
        </div>
        <el-table :data="AllList" border height="90%" style="width: 100%;" header-row-class-name="tableHeader"
          :row-class-name="tableRowClassName" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column align="center" fixed="left" label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column align="center" width="200" prop="upMangerId" label="上游ID">
          </el-table-column>
          <el-table-column align="center" width="200" prop="upName" label="上游名称">
          </el-table-column>
          <el-table-column align="center" width="200" prop="upType" label="上游类型">
          </el-table-column>
          <el-table-column align="center" width="200" prop="productNum" label="产品数量">
            <template slot-scope="scope">
              <div @click="goToPlist(scope.row.upMangerId)" class="flex_d_center themeC c_pointer">
                {{scope.row.productNum}}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" prop="downSale" label="下游推广数">
          </el-table-column>
          <el-table-column align="center" width="200" prop="linkMan" label="联系人">
          </el-table-column>
          <el-table-column align="center" width="200" prop="phone" label="联系电话">
          </el-table-column>
          <el-table-column align="center" width="200" prop="linkNum" label="总链接数">
          </el-table-column>
          <el-table-column align="center" width="200" prop="useNum" label="已使用数">
          </el-table-column>
          <el-table-column align="center" width="200" prop="usableNum" label="可使用数">
          </el-table-column>
          <el-table-column align="center" width="200" prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column align="center" width="200" prop="status" label="上游状态(停用/有效)">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.status==0?'有效':'停用'" placement="top" :enterable="false">
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
                <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
                  <div class="editFont c_pointer" @click="editUser(scope.row)">
                    <img class="cardImg" src="../../assets/add_img/operation_edit_20@2x.png">
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
          <el-button @click="MdeleteUser" type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import {
  accountUserList,
  shoppingAupmangerDelete,
  shoppingAupmangerInfosSlect,
  shoppingAupmangerUpdateStatus
} from "../../api/management";
export default {
  data () {
    return {
      StatusList: [{
        id: 0,
        name: '有效'
      },
      {
        id: 1,
        name: '停用'
      }
      ],
      // 分页
      total: 0,
      pageNo: 1,
      pageSize: 10,

      // 模拟数据
      dialogDelete: false,
      dialogVisible: false,
      form: {
        "currentPage": 1,
        "endTime": "",
        "pageSize": 10,
        "phone": "",
        "createTime": "",
        "status": "",
        "upName": ""
      },
      userInfo: {
        nickName: '',
        userName: '',
        orgName: '',
        roleList: '',
        roleId: '',
        userId: '',
        phone: ''
      },
      AllList: []
    }
  },
  created () {
    this.shoppingAupmangerInfosSlectM()
  },
  methods: {
    // 删除
    MdeleteUser () {
      shoppingAupmangerDelete({
        upMangerId: this.deleteUserId
      }).then((res) => {
        console.log("删除:", res);
        if (res.code == 0) {
          this.$message.success('删除成功')
          this.dialogDelete = false
          this.shoppingAupmangerInfosSlectM()
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    goToPlist (id) {
      this.$router.push({
        name: 'productList',
        query: {
          upMangerId: id
        }
      })
    },
    deleteUser (row) {
      console.log(row)
      this.deleteUserId = row.upMangerId
      this.dialogDelete = true
    },
    addMember (row) {
      this.$router.push({
        name: 'addUpstream',
        query: {
          upMangerId: '-1'
        }
      })
    },
    // 编辑
    editUser (row) {
      console.log(row)
      this.$router.push({
        name: 'addUpstream',
        query: {
          upMangerId: row.upMangerId
        }
      })
    },
    // 重置
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
      this.shoppingAupmangerInfosSlectM()
    },
    shoppingAupmangerInfosSlectM () {
      // this.form.phone = this.form.phone.replace(/ /g, '')
      // this.form.userName = this.form.userName.replace(/ /g, '')
      shoppingAupmangerInfosSlect({
        "currentPage": this.pageNo,
        "endTime": this.form.endTime,
        "pageSize": this.pageSize,
        "phone": this.form.phone,
        "createTime": this.form.createTime,
        "status": this.form.status,
        "upName": this.form.upName
      }).then((res) => {
        console.log("res:", res);
        if (res.code == 0) {
          console.log(res)
          this.total = res.data.totalCount
          this.AllList = res.data.list
        } else {
          console.log(res.msg)
        }
      })
    },
    changS (event, row) {
      console.log(event)
      console.log(row)
      shoppingAupmangerUpdateStatus({
        'upMangerId': row.upMangerId
      }).then((res) => {
        console.log("res:", res);
        if (res.code == 0) {
          // if(event == 0) {
          // 	this.$message.success('')
          // }else{
          // 	this.$message.success('下架成功')
          // }
          // this.shoppingAupmangerInfosSlectM()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    serchAll () {
      if (new Date(this.form.createTime).getTime() > new Date(this.form.endTime).getTime()) {
        this.$message.error('结束时间不能小于开始时间');
      } else {
        console.log(this.form)
        this.pageNo = 1
        this.shoppingAupmangerInfosSlectM()
      }
    },
    // 为表格行添加样式
    tableRowClassName ({
      row,
      rowIndex
    }) {
      return 'tabRowC'
    },
    formatter (row, column) {
      return row.address;
    },

    // 分页
    handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`);
      this.shoppingAupmangerInfosSlectM()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      console.log(`当前页: ${this.pageNo}`);
      this.shoppingAupmangerInfosSlectM()
    }
  },
  mounted () { }
}
</script>

<style lang='less' scoped>
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

.editFont {
  cursor: pointer;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: LEFT;
  color: #eb4778;
}

.editFont2 {
  visibility: hidden;
}

.allPage {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  /* padding: 0 32px; */
  /* padding-top: 24px; */
  /* padding-bottom: 0px; */
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
}

.miniStar {
  font-size: 0.411764rem;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: RIGHT;
  color: #f44e43;
}

.miniText {
  font-size: 0.411764rem;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: RIGHT;
  color: #666666;
}

.miniInput {
  /* margin-left: 0.705882rem; */
  width: 11.529411rem;
  /* height: 1.17647rem; */
  background: #ffffff;
  /* border: 1px solid #e9e9e9; */
  border-radius: 0.117647rem;
}

.miniInput2 {
  width: 4.411764rem;
  height: 1.17647rem;
  background: #ffffff;
  border: 0.029411rem solid #e9e9e9;
  border-radius: 0.117647rem;
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
