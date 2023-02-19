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
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; ">热门推荐：</span>
                          <el-select v-model="dataOne.hotRecommend" placeholder="全部" size="small">
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
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; ">创建人：</span> 
                          <el-input v-model="dataOne.creator" placeholder="请输入创建人名称" size="small" >
                          </el-input>
                      </div>
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; ">活动类型名称:</span>
                          <el-input v-model="dataOne.activityTypeName" placeholder="请输入活动类型" size="small"> 
                          </el-input>
                      </div>
                  </div>
                  <div style="margin-top: 10px;">
                      <span style="white-space:nowrap;margin-right: 12px; font-size: 14px; font-weight: 600;">创建时间：</span>
                      <el-date-picker v-model="dataOne.acreateTime" :clearable="false" type="date"  size="small">
                      </el-date-picker>
                      <span style="margin-left: 4px;margin-right: 3px;">-</span>
                      <el-date-picker v-model="dataOne.aendTime" :clearable="false" type="date"  size="small">
                      </el-date-picker>
                  </div>
                  <div style="margin-top: 10px;">
                      <el-button type="primary" size="mini" @click="DetailsPages(dataOne);" >查询</el-button>
                      <el-button  @click="reset" size="mini">重置</el-button>
                  </div>
              </div>
          </div>
          <div style="margin: 20px 0 15px 0 ;">
              <el-button type="primary" size="mini" @click="addMember">
                <span style="font-size: 20px;"  >+</span> 新增
              </el-button>
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
              <el-table :header-cell-style="{ background:'#f5f7fa', color: '#000' }" size="small" border @selection-change="selectChange" :data="listData" highlight-current-row v-loading="loading"  element-loading-text="拼命加载中" style="width: 100%;">
                  <el-table-column  prop="activityTypeName" label="活动类型名称" width="250">
                  </el-table-column>
                  <el-table-column  prop="activityType" label="活动类型" width="250">
                  </el-table-column>
                  <el-table-column  prop="creator" label="创建人" width="250">
                  </el-table-column>
                  <el-table-column  prop="createTime" label="创建时间" width="300">
                      <!-- <template slot-scope="scope">
                      <div>{{scope.row.editTime|timestampToTime}}</div>
                      </template> -->
                  </el-table-column>
                  <el-table-column align="center"  prop="hotRecommend" label="热门推荐" width="150"   >
                      <template slot-scope="scope">
                        <div v-if="scope.row.hotRecommend == 0">
                          <div>否</div>
                        </div>
                        <div v-else> 
                          是
                        </div>
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作" min-width="300" >
                      <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="editUser(scope.row)">编辑</el-button>
                      <el-button size="mini" type="primary" @click="deleteactivityType( scope.row)">删除</el-button>
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
          <div></div>
      </div>
    </div>
</template>

<script>
import {DetailsPages ,deleteactivityType } from '../../api/xinzeng';


  export default {
      data() {
        return {
          editId: '',
          editStatus: '-1',
          // 新增|编辑
          ruleForm: {
            "bankBranchName": "",
            "belongBank": "",
            "branchLimit": 0,
            "branchLinkMan": "",
            "phone": "",
            "updateNum": 0
          },

          // 根据条件分页查询数据
          //分页
          total: 0,
          pageNo: 1,
          pageSize: 10,
          //请求参数
          dataOne:{
            "acreateTime": "",
            "activityType": "",
            "activityTypeName": "",
            "aendTime": "",
            "creator": "",
            "hotRecommend": 2,
            "pageNo": 1,
            "pageSize": 10
          },
          //响应参数
          listData: [] ,
          options: [
            {
              value: 1,
              label: '是'
            },
            {
              value: 0,
              label: '否'
            },
            {
              value: 2,
              label: '全部'
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



          // listData: [
          //   {
          //     addUser: null,
          //     editUser: null,
          //     addTime: 1519728609000,
          //     editTime: 1522585700000,
          //     permissionId: 1,
          //     permissionName: '用户-列表',
          //     permission: 'system:User:list',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   },
          //   {
          //     addUser: null,
          //     editUser: null,
          //     addTime: 1519728667000,
          //     editTime: 1522585706000,
          //     permissionId: 3,
          //     permissionName: '用户-修改',
          //     permission: 'system:User:save',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   },
          //   {
          //     addUser: null,
          //     editUser: null,
          //     addTime: 1519728669000,
          //     editTime: 1522256096000,
          //     permissionId: 4,
          //     permissionName: '用户-删除',
          //     permission: 'system:User:delete',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   },
          //   {
          //     addUser: 'root',
          //     editUser: 'root',
          //     addTime: 1520249365000,
          //     editTime: 1522256085000,
          //     permissionId: 5,
          //     permissionName: '系统管理:角色:列表',
          //     permission: 'system:Role:list',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   },
          //   {
          //     addUser: 'root',
          //     editUser: 'root',
          //     addTime: 1520249588000,
          //     editTime: 1520249588000,
          //     permissionId: 7,
          //     permissionName: 'system:Role:save',
          //     permission: 'system:Role:save',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   },
          //   {
          //     addUser: 'root',
          //     editUser: 'root',
          //     addTime: 1520249588000,
          //     editTime: 1520249588000,
          //     permissionId: 8,
          //     permissionName: 'system:Role:delete',
          //     permission: 'system:Role:delete',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   },
          //   {
          //     addUser: 'root',
          //     editUser: 'root',
          //     addTime: 1520251014000,
          //     editTime: 1520251014000,
          //     permissionId: 9,
          //     permissionName: 'system:Variable:列表',
          //     permission: 'system:Variable:list',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   },
          //   {
          //     addUser: 'root',
          //     editUser: 'root',
          //     addTime: 1520251014000,
          //     editTime: 1520251014000,
          //     permissionId: 11,
          //     permissionName: 'system:Variable:修改',
          //     permission: 'system:Variable:save',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   },
          //   {
          //     addUser: 'root',
          //     editUser: 'root',
          //     addTime: 1520251014000,
          //     editTime: 1520251014000,
          //     permissionId: 12,
          //     permissionName: 'system:Variable:删除',
          //     permission: 'system:Variable:delete',
          //     lay_CHECKED: false,
          //     LAY_CHECKED: false
          //   }
          // ],
          pageparm: {
              currentPage: 1,
              pageSize: 10,
              total: 10
          },
          value: '',
          loading: false,
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
        }
      },

    mounted(){
      this.DetailsPages(this.dataOne);
    },


      methods:{
        // 根据条件分页查询
        DetailsPages(dataOne){
          this.dataOne.pageNo = this.pageNo
          console.log(this.pageNo)
          console.log(this.currentPage)
          this.dataOne.pageSize = this.pageSize
          DetailsPages(dataOne).then(
            (res) => {
              console.log("根据条件分页查询活动类型信息", res);
            if (res.code == 0) {
              this.total = res.data.totalCount
              this.listData = res.data.list
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
          this.DetailsPages(this.dataOne);
        },
        handleCurrentChange(val) {
          this.pageNo = val
          console.log(`当前页: ${this.pageNo}`);
          this.DetailsPages(this.dataOne);
        },

        //重置根据条件分页查询请求参数
        reset(){
          console.log(123);
          this.dataOne.acreateTime='';
          this.dataOne.activityType='';
          this.dataOne.activityTypeName='';
          this.dataOne.aendTime='';
          this.dataOne.creator='';
          this.dataOne.hotRecommend= 2;
          this.dataOne.pageNo=1;
          this.dataOne.pageSize=10;
        },

        			// 删除
        deleteactivityType(row) {
          this.editId = row.id,
          console.log('row' ,row);
          console.log('editId' ,this.editId);
          deleteactivityType({ 
            id: this.editId
          }).then((res) => {
            console.log("删除:", res);
            if (res.code == 0) {
              this.$message.success('删除成功')
              // this.dialogDelete = false
              this.DetailsPages(this.dataOne);
            } else {
              this.$message.error(res.msg);
            }
          })
			  },



        // 跳转到新增页面
        addMember (row) {
          this.$router.push({
            name: 'HuodongXingzeng',
            query: {
              upMangerId: '-1'
            }
          })
        },
        // xinzeng(){
        //   // console.log(66);
        //   this.$router.push({
        //          name:"HuodongXingzeng"
        //   });
        // },

        // 编辑
        editUser (row) {
          console.log('row' ,row)
          this.$router.push({
            name: 'HuodongXingzeng',
            query: {
              upMangerId: row
            }
          })
        },

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