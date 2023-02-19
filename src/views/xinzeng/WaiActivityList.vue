<template>
    <div style="padding: 25px; background-color: #f5f7fa; ">
      <div id="activitytype">
          <!-- <div>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>活动类型</el-breadcrumb-item>
              </el-breadcrumb>
          </div> -->
          <div id="top">
              <div id="toptop">
                  <div id="topone">
                      <div style="display: flex; align-items: center;">
                          <span style="font-size: 14px; font-weight: 600; line-height:20px; ">活动状态：</span>
                          <el-select v-model="dataOne.activityStatus" placeholder="全部" size="small">
                              <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                      </div>
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; ">活动类型：</span>
                          <el-select v-model="dataOne.activityType" placeholder="全部" size="small">
                              <el-option
                              v-for="item in optionsOne"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                      </div>
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; ">所属支行：</span>
                          <el-select v-model="dataOne.belongBank" placeholder="全部" size="small">
                              <el-option
                              v-for="item in optionsOne"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                      </div>
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; ">活动名称: </span>
                          <el-input v-model="dataOne.activityName" placeholder="请输入活动类型" size="small"> 
                          </el-input>
                      </div>
                  </div>
                  <div style="margin-top: 10px;">
                      <span style="white-space:nowrap;margin-right: 12px; font-size: 14px; font-weight: 600;">活动时间：</span>
            <el-date-picker v-model="dataOne.createTimeOne" :clearable="false" type="date"  size="small">
                </el-date-picker>
                <span style="margin-left: 4px;margin-right: 3px;">-</span>
                <el-date-picker v-model="dataOne.createTimeTwo" :clearable="false" type="date"  size="small">
            </el-date-picker>
                  </div>
                  <div style="margin-top: 10px;">
                      <el-button  @click="waiactivitylist(dataOne)" type="primary" size="mini">查询</el-button>
                      <el-button @click="reset" size="mini">重置</el-button>
                  </div>
              </div>
          </div>
          <div style="margin: 20px 0 15px 0 ;">
              <el-button type="primary" size="mini" @click="toshenqinghuodong" > 申请活动</el-button>
          </div>
          <div id="middle">
              <!-- <div style="display: flex;height: 40px;line-height: 40px; background-color: aquamarine; ">
                  <h4 style="width: 20%;">活动类型名称</h4>
                  <h4>活动类型</h4>
                  <h4>创建人</h4>
                  <h4>创建时间</h4>
                  <h4>热门推荐</h4>
                  <h4>操作</h4>
              </div> -->
              <el-table :header-cell-style="{ background:'#f5f7fa', color: '#000' }" border size="small" @selection-change="selectChange" :data="listData" highlight-current-row v-loading="loading"  element-loading-text="拼命加载中" style="width: 100%;">
                  <el-table-column  prop="activityName" label="活动名称" width="250">
                  </el-table-column>
                  <el-table-column  prop="belongBank" label="所属支行" width="100">
                  </el-table-column>
                  <el-table-column  prop="activityDate" label="活动日期" width="230">
                  </el-table-column>
                  <!-- <el-table-column  prop="activityType" label="活动类型" width="100">
                  </el-table-column> -->
                  <el-table-column  prop="actualCost" label="活动费用" width="100">
                      <!-- <template slot-scope="scope">
                      <div>{{scope.row.editTime|timestampToTime}}</div>
                      </template> -->
                  </el-table-column>
                  <el-table-column prop="activityStatus" label="活动状态" width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.activityStatus == 0">
                          <div>待审核</div>
                        </div>
                        <div v-if="scope.row.activityStatus == 1">
                          <div>进行中</div>
                        </div>
                        <div v-if="scope.row.activityStatus == 2">
                          <div>已结束</div>
                        </div>
                        <div v-if="scope.row.activityStatus == 3">
                          <div>已拒绝</div>
                        </div>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="followupPersonnel" label="跟进人员" width="100">
                  </el-table-column> -->
                  <el-table-column prop="createTime" label="创建时间" width="230">
                  </el-table-column>
                  <el-table-column prop="auditTime" label="审核时间" width="230">
                  </el-table-column>
                  <el-table-column prop="auditPerson" label="审核人"  width="100">
                  </el-table-column>
                  <el-table-column align="center" label="操作"  min-width="350" fixed="right">
                      <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="editUser(scope.row)">查看</el-button>
                      <el-button size="mini" type="primary" @click="dialogFormVisible = true">数据</el-button>
                      <!-- <el-button size="mini" type="primary" >复制</el-button>
                      <el-button size="mini" type="primary" @click="deleteUser(scope.$index, scope.row)">删除</el-button> -->
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
              <!-- <div style="display: flex; justify-content: flex-end;margin-top: 15px; ">
                  <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="1000">
                  </el-pagination>
              </div> -->
          </div>
          <div>
            <el-dialog title="数据上传" :visible.sync="dialogFormVisible" width="550px">
              <div style="display: flex; justify-content: space-between;">
                <span>参与人数：</span>
                <el-input v-model="input" placeholder="请输入内容" style="width: 300px;" ></el-input>
                <el-button type="primary" plain  >+ 新增字段</el-button>
              </div>
              <div style="margin-top: 50px;text-align: center; ">
                <el-button  @click="dialogFormVisible = false">取消</el-button>
                <el-button  type="primary" @click="uploadneiactivitylist" >保存</el-button>
              </div>
            </el-dialog>
          </div>
      </div>
    </div>
</template>

<script>
  import { waiactivitylist  } from '../../api/xinzeng';

  export default {
    data() {
      return {
          //数据上传判断
          dialogFormVisible: false,

          editId: '',
          // 新增|编辑
          editStatus: '-1',

          // 根据条件分页查询数据
          //分页
          total: 0,
          pageNo: 1,
          pageSize: 10,
          //请求参数
          dataOne:{
            "activityDate": "",
            "activityName": "",
            "activityStatus": 4,
            "activityType": "",
            "belongBank": "",
            "createTimeOne": "",
            "createTimeTwo": "",
            "pageNo": 1,
            "pageSize": 10
          },
          //响应参数
          listData: [] ,
          options: [
              {
                value: 4,
                label: '全部'
              },
              {
                value: 0,
                label: '待审核'
              },
              {
                value: 1,
                label: '进行中'
              },
              {
                value: 2,
                label: '已结束'
              },
              {
                value: 3,
                label: '已拒绝'
              },
            ],

          optionsOne:  [
            {
              value: '',
              label: '全部'
            }, 
            {
              value: '精选活动',
              label: '精选活动'
            }, {
              value: '备选活动',
              label: '备选活动'
            },
            {
              value: '备选服务',
              label: '备选服务'
            },
          ],












        // options: [{
        //   value: '选项1',
        //   label: '黄金糕'
        // }, {
        //   value: '选项2',
        //   label: '双皮奶'
        // }, {
        //   value: '选项3',
        //   label: '蚵仔煎'
        // }, {
        //   value: '选项4',
        //   label: '龙须面'
        // }, {
        //   value: '选项5',
        //   label: '北京烤鸭'
        // }],
        // listData: [
        //   {
        //     activityName: '创意虎皮饺子/汤圆',
        //     subBranch: '宝安支行',
        //     activityDate: '2022-05-01 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '李晓霞',
        //     creationTime: '2022-05-01 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '悦读分享会',
        //     subBranch: '广发支行',
        //     activityDate: '2022-08-01 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '赵云',
        //     creationTime: '2022-08-01 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '手绘飞盘',
        //     subBranch: '中国银行',
        //     activityDate: '2023-11-07 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '刘备',
        //     creationTime: '2023-11-07 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '创意虎皮饺子/汤圆',
        //     subBranch: '宝安支行',
        //     activityDate: '2022-05-01 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '李晓霞',
        //     creationTime: '2022-05-01 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '手绘飞盘',
        //     subBranch: '中国银行',
        //     activityDate: '2023-11-07 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '刘备',
        //     creationTime: '2023-11-07 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '悦读分享会',
        //     subBranch: '广发支行',
        //     activityDate: '2022-08-01 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '赵云',
        //     creationTime: '2022-08-01 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '手绘飞盘',
        //     subBranch: '中国银行',
        //     activityDate: '2023-11-07 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '刘备',
        //     creationTime: '2023-11-07 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '悦读分享会',
        //     subBranch: '广发支行',
        //     activityDate: '2022-08-01 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '赵云',
        //     creationTime: '2022-08-01 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '创意虎皮饺子/汤圆',
        //     subBranch: '宝安支行',
        //     activityDate: '2022-05-01 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '李晓霞',
        //     creationTime: '2022-05-01 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     activityName: '手绘飞盘',
        //     subBranch: '中国银行',
        //     activityDate: '2023-11-07 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '刘备',
        //     creationTime: '2023-11-07 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },{
        //     activityName: '手绘飞盘',
        //     subBranch: '中国银行',
        //     activityDate: '2023-11-07 19:46:53',
        //     // activityType: '精选活动',
        //     activityExpenses: 1000,
        //     activityStatus: '进行中',
        //     // followupPersonnel: '刘备',
        //     creationTime: '2023-11-07 19:46:53',
        //     auditTime:'2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        // ],
        pageparm: {
            currentPage: 1,
            pageSize: 10,
            total: 10
        },
        value: '',
        input:'',
        form: {
            "currentPage": 1,
            "failureTime": "",
            "pageSize": 10,
            "productListId": "",
            "productName": "",
            "productType": "",
            "createTime": "",
            "status": "",
            "sourceUpName": "",
            "upMangerId":""
        },
        loading: false,
      }
    },

    mounted(){
          this.waiactivitylist(this.dataOne);
    },

    methods:{

          // 根据条件分页查询
          waiactivitylist(dataOne){
            this.dataOne.pageNo = this.pageNo
            console.log(this.pageNo)
            console.log(this.currentPage)
            this.dataOne.pageSize = this.pageSize
            waiactivitylist(dataOne).then(
              (res) => {
                console.log("根据条件分页查询外部活动列表", res);
              if (res.code == 0) {
                this.total = res.page.totalCount
                this.listData = res.page.list
              } else {
                console.log(res.msg)
              }
              }
            )
          },

          // 分页
          handleSizeChange(val) {
            this.pageSize = val
            console.log(`每页 ${val} 条`);
            this.waiactivitylist(this.dataOne);
          },
          handleCurrentChange(val) {
            this.pageNo = val
            console.log(`当前页: ${this.pageNo}`);
            this.waiactivitylist(this.dataOne);
          },

          //重置条件
          reset(){
            // console.log(123);
            this.dataOne.activityDate = '';
            this.dataOne.activityName = '';
            this.dataOne.activityStatus = 4;
            this.dataOne.activityType='';
            this.dataOne.belongBank='';
            this.dataOne.createTimeOne= '';
            this.dataOne.createTimeTwo='';
            this.dataOne.pageNo=1;
            this.dataOne.pageSize=10;
          },


          // 跳往申请活动
          toshenqinghuodong () {
          // toshenqinghuodong (row) {
            // console.log('row' ,row)
            this.$router.push({
              name: 'shenqinghuodong',
              // query: {
              //   upMangerId: row
              // }
            })
          },

          // 查看
          editUser (row) {
            console.log('row' ,row)
            this.$router.push({
              name: 'AddWaiActivityList',
              query: {
                upMangerId: row
              }
            })
          },

          // // 跟进id删除
          // deleteactivitylist(row) {
          //   this.editId = row.id,
          //   console.log('row' ,row);
          //   console.log('editId' ,this.editId);
          //   deleteactivitylist({ 
          //     id: this.editId
          //   }).then((res) => {
          //     console.log("删除:", res);
          //     if (res.code == 0) {
          //       this.$message.success('删除成功')
          //       // this.dialogDelete = false
          //       this.DetailsPages(this.dataOne);
          //     } else {
          //       this.$message.error(res.msg);
          //     }
          //   })
          // },

          // //新增页面||跳转到新增页面
          // addMember(){
          //     this.$router.push({
          //     name: 'AddNeiActivityList',
          //     query: {
          //       upMangerId: '-1'
          //     }
          //   })
          // },

          // // 编辑
          // editUser (row) {
          //   console.log('row' ,row)
          //   this.$router.push({
          //     name: 'AddNeiActivityList',
          //     query: {
          //       upMangerId: row
          //     }
          //   })
          // },

          //上传数据
          uploadneiactivitylist(){
            console.log('上传数据');
          },

          //无用
          selectChange(){
              console.log('selectChange');
          }
    }
  }
</script>

<style>
    #activitytype{
        /* display: flex;
        justify-content: space-around; */
        padding: 20px 20px;
        height: 100vh;
        /* background-color: antiquewhite; */
        background-color: white;
    }

    #top{
        height: 145px;
        width: 100%;
        /* padding: 10px 20px; */
        background-color:#f5f7fa;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #toptop{
        width: 96%;
        height: 80%;
        /* background-color: aqua; */
    }

    #topone{
        display: flex;
        justify-content: space-between; 
    }

    #middle{
        height: 600px;
        width: 100%;
        /* background-color: aliceblue; */
    }
    


</style>