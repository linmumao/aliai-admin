<template>
  <div style="padding: 25px; background-color: #f5f7fa; ">
    <div id="activitytype">
        <!-- <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动类型</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div id="toptopcontent">
            <div id="toptop">
              <div style="margin-top: 10px; display: flex;">
                    <span style="white-space:nowrap;margin-right: 12px; font-size: 14px; font-weight: 600;">创建日期：</span>
                    <el-date-picker v-model="dataOne.createTimeOne" :clearable="false" type="date"  size="small">
                        </el-date-picker>
                        <span style="margin-left: 4px;margin-right: 3px;">-</span>
                        <el-date-picker v-model="dataOne.createTimeTwo" :clearable="false" type="date"  size="small">
                    </el-date-picker>
                    <div id="topone">
                        <div style="display: flex; align-items: center;margin-left: 50px; ">
                            <span style="font-size: 14px; font-weight: 600; line-height:20px; ">创建人:</span>
                            <el-input v-model="dataOne.createPerson" placeholder="请输入" size="small"> 
                            </el-input>
                        </div>
                    </div>
                </div>


                <div style="margin-top: 10px;">
                    <el-button @click="paginationQuery(dataOne)" type="primary" size="mini">查询</el-button>
                    <el-button  @click="reset()" size="mini">重置</el-button>
                </div>
            </div>
        </div>
        <div style="margin: 20px 0 15px 0 ;">
            <el-button type="primary" @click = 'addMember' size="mini" ><span style="font-size: 20px;">+</span> 新增</el-button>
            <el-button type="primary" plain size="mini"  @click="dialogVisibleForm = true">批量修改</el-button>
            <el-button type="primary" plain size="mini"  @click="dialogTableVisible = true">日志管理</el-button>
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
                <el-table-column  prop="bankName" label="银行名称" width='150'>
                </el-table-column>
                <el-table-column  prop="linkMan" label="银行联系人" width="150">
                </el-table-column>
                <el-table-column  prop="phone" label="联系方式" width="230">
                </el-table-column>
                <!-- <el-table-column  prop="activityType" label="活动类型" width="100">
                </el-table-column> -->
                <el-table-column  prop="budget" label="银行预算" width="150">
                    <!-- <template slot-scope="scope">
                    <div>{{scope.row.editTime|timestampToTime}}</div>
                    </template> -->
                </el-table-column>
                <el-table-column prop="remainingBudget" label="剩余预算" width="150">
                </el-table-column>
                <!-- <el-table-column prop="followupPersonnel" label="跟进人员" width="100">
                </el-table-column> -->
                <el-table-column prop="createTime" label="创建时间" width="230">
                </el-table-column>
                <!-- <el-table-column prop="auditTime" label="审核时间" width="230">
                </el-table-column> -->
                <el-table-column prop="createPerson" label="创建人"  width="150">
                </el-table-column>
                <el-table-column align="center" label="操作"  min-width="300" >
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="updatamoney( scope.row)">重置金额</el-button>
                      <el-button size="mini" type="primary" @click="editUser(scope.row)">编辑</el-button>
                      <el-button size="mini" type="primary" @click="deletebank( scope.row)">删除</el-button>
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
          <!-- 新增||编辑弹窗 -->
          <el-dialog :close-on-click-modal="false" custom-class="dialogClass" :title="editStatus=='-1'?'新增':'编辑'"
            :destroy-on-close="true" :visible.sync="dialogVisible" top="25vh" width="560px">
            <el-form @submit.native.prevent :model="ruleForm"  ref="ruleForm"
              label-width="115px" class="demo-ruleForm">
              <!-- <el-form-item label="产品类型：" prop="productType">
                <el-input maxlength="35" v-model="ruleForm.productType"></el-input>
              </el-form-item>
              <el-form-item label="类型描述：" prop="typeDescribe">
                <el-input type="textarea" :rows="2" maxlength="50" v-model="ruleForm.typeDescribe"></el-input>
              </el-form-item> -->
              <el-form-item label="银行名称: " prop="typeDescribe">
                <el-input maxlength="35" v-model="ruleForm.bankName"></el-input>
              </el-form-item>
              <el-form-item label="银行联系人: " prop="typeDescribe">
                <el-input maxlength="35" v-model="ruleForm.linkMan"></el-input>
              </el-form-item>
              <el-form-item label="联系方式: " prop="typeDescribe">
                <el-input tmaxlength="35" v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="银行预算: " prop="typeDescribe">
                <el-input maxlength="35" v-model="ruleForm.budget"></el-input>
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
          <!-- 日志管理弹窗-->
          <el-dialog title="日志管理" :visible.sync="dialogTableVisible" width="750px" >
            <el-table :header-cell-style="{ background:'#f5f7fa', color: '#000' }" size="small" @selection-change="selectChange" :data="dialogData" highlight-current-row v-loading="loading"  element-loading-text="拼命加载中" style="width: 100%; height: 450px; overflow-y: auto; ">
                <el-table-column  type="index" label="序号" width='100'>
                </el-table-column>
                <el-table-column  prop="operationType" label="操作类型" width="100">
                </el-table-column>
                <el-table-column  prop="operationName" label="操作内容" width="230">
                </el-table-column>
                <el-table-column  prop="operatorName" label="操作人" width="100">
                </el-table-column>
                <el-table-column prop="operationTime" label="操作时间" width="150">
                </el-table-column>
            </el-table>
            
            <div class="footerBox flex_rjs_aend">
              <div class="sumBox">
                共 <span class="themeC">{{ totalone }}</span> 条
              </div>
              <el-pagination @size-change="handleSizeChangeone" @current-change="handleCurrentChangeone" background
                :page-sizes="[10, 20, 50, 100]" :page-size="pageSizeone" :current-page="pageNoone"
                layout="sizes, prev, pager, next" :total="totalone">
              </el-pagination>
            </div>
            <!-- <div style="display: flex; justify-content: flex-end;margin-top: 15px; ">
                <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
            </div> -->
          </el-dialog>
          <!-- 批量操作弹窗 -->
          <el-dialog :close-on-click-modal="false" custom-class="dialogClass" title="批量修改"
            :destroy-on-close="true" :visible.sync="dialogVisibleForm" top="25vh" width="560px">
            <el-form @submit.native.prevent 
              label-width="115px" class="demo-ruleForm">
              <!-- <el-form-item label="产品类型：" prop="productType">
                <el-input maxlength="35" v-model="ruleForm.productType"></el-input>
              </el-form-item>
              <el-form-item label="类型描述：" prop="typeDescribe">
                <el-input type="textarea" :rows="2" maxlength="50" v-model="ruleForm.typeDescribe"></el-input>
              </el-form-item> -->
              <el-form-item label="剩余额度: " prop="typeDescribe">
                <el-input maxlength="35" v-model="budget"></el-input>
              </el-form-item>
              <!-- <el-form-item label="剩余额度: " prop="typeDescribe">
                <el-input maxlength="35" v-model="dataThree.residualLimit"></el-input>
              </el-form-item>
              <el-form-item label="额度更新频次: " prop="typeDescribe">
                <el-input tmaxlength="35" v-model="dataThree.updateNum"></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="银行预算: " prop="typeDescribe">
                <el-input maxlength="35" v-model="ruleForm.budget"></el-input>
              </el-form-item> -->
              <el-form-item style="text-align: right;">
                <el-button @click="dialogVisibleForm = false">取 消</el-button>
                <el-button  type="primary" @click="batchEdit">提 交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <!-- <el-dialog title="新增/编辑" :visible.sync="dialogFormVisible" width="500px"  >
            <el-form :model="dataTwo" >
              <el-form-item label="银行名称" :label-width="formLabelWidth">
                <el-input v-model="dataTwo.bankName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="银行联系人" :label-width="formLabelWidth">
                <el-input v-model="dataTwo.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="dataTwo.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="银行预算" :label-width="formLabelWidth">
                <el-input v-model="dataTwo.budget" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addbank()">确 定</el-button>
            </div>
          </el-dialog> -->





        </div>

    </div>
  </div>
</template>

<script>
import {paginationQuery , addbank , updatabank , deletebank , updatamoney , journal , batchmodify } from '../../api/xinzeng';

  export default {
    data() {
      // var onlyZH = (rule, value, callback) => {
			// 	if (value === '') {
			// 		callback(new Error('请输入产品类型'));
			// 	} else {
			// 		let regZh = /[^\u4E00-\u9FA5]/g
			// 		if (regZh.test(value)) {
			// 			return callback(
			// 				new Error("产品类型只能为中文")
			// 			);
			// 		}
			// 		callback();
			// 	}
			// };

      return {
        formLabelWidth: '120px', //各表单长度
        dialogVisible: false, //新增||编辑
        dialogTableVisible: false, //日志管理
        dialogVisibleForm: false, //批量操作弹窗
        editId: '',
        editStatus: '-1',
        // 新增|编辑
        ruleForm: {
					// "productTypeId": "",
					// "productType": "",
					// "typeDescribe": "",
          "bankName": "",
          "budget": 0,
          "linkMan": "",
          "phone": ""
				},
				// rules: {
				// 	productType: [{
				// 		required: true,
				// 		validator: onlyZH,
				// 		trigger: 'blur'
				// 	}],
				// },

        chks:[],        //批量修改数据
        budget: 0 ,

        //查询操作日志
        totalone: 0,
				pageNoone: 1,
				pageSizeone: 10,
				logForm: {
					"beginTime": "",
					"currentPage": 1,
					"endTime": "",
					"operationName": "",
					"operationType": "",
					"operatorName": "",
					"pageSize": 10
				},
        //响应日志数据
        dialogData:[],

        // 根据条件分页查询数据
        // 分页
				total: 0,
				pageNo: 1,
				pageSize: 10,
        //请求参数
        dataOne:{
          "createPerson": "",
          "createTimeOne": "",
          "createTimeTwo": "",
          "pageNo": 1,
          "pageSize": 10
        },
        //响应参数
        listData:[],

        //新增银行
        dataTwo:{
          "bankName": "",
          "budget": 0,
          "linkMan": "",
          "phone": ""
        },





        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        // listData: [
        //   {
        //     BankName: '北京银行',
        //     BankContact: '貂蝉',
        //     ContactInformation: '13314456621',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     BankName: '广发银行',
        //     BankContact: '张飞',
        //     ContactInformation: '15684456621',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'李四',
        //   },
        //   {
        //     BankName: '中国银行',
        //     BankContact: '孙权',
        //     ContactInformation: '13264456688',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'赵四',
        //   },
        //   {
        //     BankName: '北京银行',
        //     BankContact: '貂蝉',
        //     ContactInformation: '13314456621',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     BankName: '广发银行',
        //     BankContact: '张飞',
        //     ContactInformation: '15684456621',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'李四',
        //   },
        //   {
        //     BankName: '北京银行',
        //     BankContact: '貂蝉',
        //     ContactInformation: '13314456621',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     BankName: '中国银行',
        //     BankContact: '孙权',
        //     ContactInformation: '13264456688',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'赵四',
        //   },
        //   {
        //     BankName: '广发银行',
        //     BankContact: '张飞',
        //     ContactInformation: '15684456621',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'李四',
        //   },
        //   {
        //     BankName: '北京银行',
        //     BankContact: '貂蝉',
        //     ContactInformation: '13314456621',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'张三',
        //   },
        //   {
        //     BankName: '中国银行',
        //     BankContact: '孙权',
        //     ContactInformation: '13264456688',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'赵四',
        //   },{
        //     BankName: '广发银行',
        //     BankContact: '张飞',
        //     ContactInformation: '15684456621',
        //     BankBudget: 2000000,
        //     RemainingBudget: 2000000,
        //     creationTime: '2022-05-01 19:46:53',
        //     auditPerson:'李四',
        //   },
        // ],
        pageparm: {
            currentPage: 1,
            pageSize: 10,
            total: 10
        },
        value: '',
        input:'',
        loading: false,
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
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],

        //模拟日志数据
        // dialogData:[{
        //     index: 1,
        //     OperationType: '新增',
        //     OperationContent: '宝安支行活动结束，剩余预算45646',
        //     Operator: '张三',
        //     OperationTime: '2022-08-12 19:46:53',
        //   },
        //   {
        //     index: 2,
        //     OperationType: '修改',
        //     OperationContent: '龙岗支行活动结束，剩余预算10000',
        //     Operator: '李四',
        //     OperationTime: '2022-08-12 19:46:53',
        //   },
        //   {
        //     index: 3,
        //     OperationType: '新增',
        //     OperationContent: '南山支行活动结束，剩余预算45646',
        //     Operator: '张三',
        //     OperationTime: '2022-08-12 19:46:53',
        //   },
        //   {
        //     index: 4,
        //     OperationType: '修改',
        //     OperationContent: '福田支行活动结束，剩余预算45646',
        //     Operator: '张三',
        //     OperationTime: '2022-08-12 19:46:53',
        //   },],

      }
    },

    mounted(){
      this.paginationQuery(this.dataOne);
      this.journal(this.logForm);
    },


    methods:{
      
      // 根据条件分页查询
      paginationQuery(dataOne){
        this.dataOne.pageNo = this.pageNo
				console.log(this.pageNo)
				console.log(this.currentPage)
				this.dataOne.pageSize = this.pageSize
        paginationQuery(dataOne).then(
          (res) => {
            console.log("根据条件分页查询银行", res);
					if (res.code == 0) {
						this.total = res.page.totalCount;
						this.listData = res.page.list; //将数据赋值到表格空数组中

            // //将id存放在chks
            // for (var i = 0; i < this.listData.length; i++) {
            //   this.chks.push(this.listData[i].id)
            // }
            // console.log('this.chks' ,this.chks);
            // //将id存放在chks

					} else {
						console.log(res.msg)
					}
          }
        )
      },

      	// 首页数据分页
			handleSizeChange(val) {
				this.pageSize = val
				console.log(`每页 ${val} 条`);
        this.paginationQuery(this.dataOne);
			},
			handleCurrentChange(val) {
				this.pageNo = val
				console.log(`当前页: ${this.pageNo}`);
        this.paginationQuery(this.dataOne);
			},

      // 日志数据分页
			handleSizeChangeone(val) {
				this.pageSizeone = val
				console.log(`每页 ${val} 条`);
        this.journal(this.logForm);
			},
			handleCurrentChangeone(val) {
				this.pageNoone = val
				console.log(`当前页: ${this.pageNo}`);
        this.journal(this.logForm);
			},

      //重置根据条件分页查询请求参数
      reset(){
        console.log(123);
        this.dataOne.createPerson='';
        this.dataOne.createTimeOne='';
        this.dataOne.createTimeTwo='';
        this.dataOne.pageNo=1;
        this.dataOne.pageSize=10;
      },

      // 新增
			addMember(row) {
				this.ruleForm = {
          "bankName": "",
          "budget": 0,
          "linkMan": "",
          "phone": ""
				},
				this.editStatus = '-1'
				this.dialogVisible = true
			},

			// 编辑
			editUser(row) {
				console.log(row)
				// this.editId = row.productTypeId
				// this.ruleForm.productTypeId = row.productTypeId
				// this.ruleForm.productType = row.productType
				// this.ruleForm.typeDescribe = row.typeDescribe
        this.editId = row.id;
        this.ruleForm.bankName =  row.bankName;
        this.ruleForm.budget =  row.budget;
        this.ruleForm.linkMan =  row.linkMan;
        this.ruleForm.phone =  row.phone;
				this.editStatus = '1'
				this.dialogVisible = true
			},


      //新增|编辑
      submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('valid' , valid)
						console.log(this.ruleForm)
						if (this.editStatus == '-1') {
							addbank(this.ruleForm).then((res) => {
								console.log("新增:", res);
								if (res.code == 0) {
									this.$message.success('新增成功')
									this.dialogVisible = false
                  this.paginationQuery(this.dataOne);
								} else {
									this.$message.error(res.msg);
								}
							})
						} else {
							this.ruleForm.id = this.editId
							updatabank(this.ruleForm).then((res) => {
								console.log("编辑:", res);
								if (res.code == 0) {
									this.$message.success('编辑成功')
									this.dialogVisible = false
                  this.paginationQuery(this.dataOne);
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


			// 删除
			deletebank(row) {
        this.editId = row.id,
        console.log('editId' ,this.editId);
				deletebank({
					id: this.editId
				}).then((res) => {
					console.log("删除:", res);
					if (res.code == 0) {
						this.$message.success('删除成功')
						// this.dialogDelete = false
                  this.paginationQuery(this.dataOne);
					} else {
						this.$message.error(res.msg);
					}
				})
			},

      //重置余额
      updatamoney(row){
        this.editId = row.id,
        updatamoney({
					id: this.editId,
          remainingBudget: 0
        }).then(
          (res) => {
            console.log("重置余额:", res);
            if (res.code == 0) {
						this.$message.success('重置余额成功')
						// this.dialogDelete = false
                  this.paginationQuery(this.dataOne);
					} else {
						this.$message.error(res.msg);
					}
          }
        )
      },

      //查询操作日志
      journal() {
          this.logForm.pageSize = this.pageSizeone
          this.logForm.currentPage = this.pageNoone
          journal(this.logForm).then((res) => {
            console.log("查询日志:", res);
            if (res.code == 0) {
              this.dialogData = res.logList.logList
              this.totalone = res.logList.totalCount
            } else {
              this.$message.error(res.msg);
            }
          })
			},

      //批量修改
      batchEdit() { 
                    //将id存放在chks
            for (var i = 0; i < this.listData.length; i++) {
              this.chks.push(
                  {
                    id:this.listData[i].id,
                    remainingBudget:this.budget,
                  }
                )
            }
            console.log('this.chks' ,this.chks);
            batchmodify(this.chks).then(
              (res) => {
                console.log( '批量修改' ,res);
                if (res.code == 0) {
                alert('修改成功');
                this.paginationQuery(this.dataOne);
                // this.loadData();
                } else {
                alert('修改失败')
                }
              }
            )
            this.chks = [];
            console.log('this.chks1' ,this.chks);
            this.dialogVisibleForm =false;
          
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
        background-color: white;
    }

    #toptopcontent{
        height: 120px;
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