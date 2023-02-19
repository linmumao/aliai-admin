<template>
	<div class="allPage themeBgc">
		<div class="bigKuang">
			<div class="TopK themeBgc">
				<el-row :gutter="24">
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">产品类型</span>
							<el-input placeholder="请输入" @keyup.enter.native="serchAll" v-model="form.productType"></el-input>
							<!-- <el-select v-model="form.productType" style="width: 100%;" :popper-append-to-body="false" placeholder="请选择">
								<el-option v-for="(item, index) in pulldownlist" :label="item.productType"
									:value="item.productTypeId">
								</el-option>
							</el-select> -->
						</div>
					</el-col>
					<el-col :span="6">
						<!-- <div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">状态</span>
							<el-select v-model="form.status" style="width: 100%;" :popper-append-to-body="false" placeholder="请选择">
								<el-option v-for="(item, index) in StatusList" :label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</div> -->
						
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">创建时间</span>
							<el-date-picker v-model="form.createTime" style="width: 50%;" :clearable="false" type="date" placeholder="选择日期">
							</el-date-picker>
							<span style="margin-left: 4px;margin-right: 3px;">-</span>
							<el-date-picker v-model="form.endTime" style="width: 50%;" :clearable="false" type="date" placeholder="选择日期">
							</el-date-picker>
						</div>
					</el-col>
					<el-col :span="6">
						
					</el-col>
					<el-col :span="6">

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
					<el-table-column align="center" prop="productType" label="产品类型">
					</el-table-column>
					<el-table-column align="center" prop="typeDescribe" label="类型描述">
					</el-table-column>
					<el-table-column align="center" prop="createTime" label="创建时间">
					</el-table-column>
					<!-- <el-table-column align="center" prop="status" label="状态">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 0">有效</span>
							<span v-else>停用</span>
						</template>
					</el-table-column> -->
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

			<el-dialog :close-on-click-modal="false" custom-class="dialogClass" :title="editStatus=='-1'?'新增':'编辑'"
				:destroy-on-close="true" :visible.sync="dialogVisible" top="25vh" width="560px">
				<el-form @submit.native.prevent :model="ruleForm" :rules="rules" ref="ruleForm"
					label-width="115px" class="demo-ruleForm">
					<el-form-item label="产品类型：" prop="productType">
						<el-input maxlength="35" v-model="ruleForm.productType"></el-input>
					</el-form-item>
					<el-form-item label="类型描述：" prop="typeDescribe">
						<el-input type="textarea" :rows="2" maxlength="50" v-model="ruleForm.typeDescribe"></el-input>
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


			<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="操作提示"
				:visible.sync="dialogDelete" top="30vh" width="30%">
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
		shoppingAproducttypeInfoSelectList,
		shoppingAuptypeInfolist,
		shoppingAproducttypeSave,
		shoppingAproducttypeUpdate,
		shoppingAproducttypeDelete
	} from "../../api/management";
	export default {
		data() {
			var onlyZH = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入产品类型'));
				} else {
					let regZh = /[^\u4E00-\u9FA5]/g
					if (regZh.test(value)) {
						return callback(
							new Error("产品类型只能为中文")
						);
					}
					callback();
				}
			
			};
			return {
				editStatus: '-1',
				resetId: '',
				resetName: '',
				editId: '',
				pulldownlist: [],
				StatusList: [{
						id: 0,
						name: '有效'
					},
					{
						id: 1,
						name: '停用'
					}
				],
				// 真实数据
				AllList: [],
				activitiType: '',
				deleteUserId: '',
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
					"productType": "",
					"createTime": "",
					"status": ""
				},
				ruleForm: {
					"productTypeId": "",
					"productType": "",
					"typeDescribe": ""
				},
				rules: {
					productType: [{
						required: true,
						validator: onlyZH,
						trigger: 'blur'
					}],
				},
			}
		},
		created() {
			this.queryList()
		},
		methods: {
			// 删除
			MdeleteUser() {
				shoppingAproducttypeDelete({
					typeId: this.deleteUserId
				}).then((res) => {
					console.log("删除:", res);
					if (res.code == 0) {
						this.$message.success('删除成功')
						this.dialogDelete = false
						this.queryList()
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			deleteUser(row) {
				console.log(row)
				this.deleteUserId = row.productTypeId
				this.dialogDelete = true
			},
			// 新增
			addMember(row) {
				this.ruleForm = {
					"productTypeId": "",
					"productType": "",
					"typeDescribe": ""
				},
				this.editStatus = '-1'
				this.dialogVisible = true
			},
			// 编辑
			editUser(row) {
				console.log(row)
				this.editId = row.productTypeId
				this.ruleForm.productTypeId = row.productTypeId
				this.ruleForm.productType = row.productType
				this.ruleForm.typeDescribe = row.typeDescribe
				this.editStatus = '1'
				this.dialogVisible = true
			},
			// 重置
			reset() {
				this.form = {
					"currentPage": 1,
					"endTime": "",
					"pageSize": 10,
					"productType": "",
					"createTime": "",
					"status": ""
				}
				this.queryList()
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(valid)
						console.log(this.ruleForm)
						if (this.editStatus == '-1') {
							shoppingAproducttypeSave(this.ruleForm).then((res) => {
								console.log("新增:", res);
								if (res.code == 0) {
									this.$message.success('新增成功')
									this.dialogVisible = false
									this.queryList()
								} else {
									this.$message.error(res.msg);
								}
							})
						} else {
							this.ruleForm.productTypeId = this.editId
							shoppingAproducttypeUpdate(this.ruleForm).then((res) => {
								console.log("编辑:", res);
								if (res.code == 0) {
									this.$message.success('编辑成功')
									this.dialogVisible = false
									this.queryList()
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
			queryList() {
				this.form.currentPage = this.pageNo
				console.log(this.pageNo)
				console.log(this.currentPage)
				this.form.pageSize = this.pageSize
				shoppingAproducttypeInfoSelectList(this.form).then((res) => {
					console.log("res:", res);
					if (res.code == 0) {
						this.total = res.data.totalCount
						this.AllList = res.data.list
					} else {
						console.log(res.msg)
					}
				})
			},
			serchAll() {
				if (new Date(this.form.createTime).getTime() > new Date(this.form.endTime).getTime()) {
					this.$message.error('结束时间不能小于开始时间');
				} else {
					console.log(this.form)
					this.pageNo = 1
					this.queryList()
				}
			},
			// 为表格行添加样式
			tableRowClassName({
				row,
				rowIndex
			}) {
				return 'tabRowC'
			},

			// 分页
			handleSizeChange(val) {
				this.pageSize = val
				console.log(`每页 ${val} 条`);
				this.queryList()
			},
			handleCurrentChange(val) {
				this.pageNo = val
				console.log(`当前页: ${this.pageNo}`);
				this.queryList()
			}
		},
		mounted() {}
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
		padding-right: 0px
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
