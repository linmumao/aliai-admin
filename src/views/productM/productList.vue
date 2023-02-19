<template>
	<div class="allPage themeBgc">
		<div class="bigKuang">
			<div class="TopK themeBgc">
				<el-row :gutter="24">
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">产品名称</span>
							<el-input v-model.trim="form.productName" @keyup.enter.native="serchAll" maxlength="35"
								placeholder="请输入">
							</el-input>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">产品类型</span>
							<!-- <el-input placeholder="请输入" @keyup.enter.native="serchAll" v-model="form.productType"></el-input> -->
							<el-select v-model="form.productType" style="width: 100%;" :popper-append-to-body="false"
								placeholder="请选择">
								<el-option v-for="(item, index) in pulldownlist" :label="item.productType"
									:value="item.productTypeId">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">产品状态</span>
							<el-select v-model="form.status" style="width: 100%;" :popper-append-to-body="false"
								placeholder="请选择">
								<el-option v-for="(item, index) in StatusList" :label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">上游名称</span>
							<el-input v-model.trim="form.sourceUpName" @keyup.enter.native="serchAll" maxlength="35"
								placeholder="请输入">
							</el-input>
						</div>
					</el-col>
				</el-row>
				<el-row style="margin-top: 16px;" :gutter="24">
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">创建时间</span>
							<el-date-picker v-model="form.createTime" style="width: 50%;" :clearable="false" type="date" placeholder="选择日期">
							</el-date-picker>
							<span style="margin-left: 4px;margin-right: 3px;">-</span>
							<el-date-picker v-model="form.failureTime" style="width: 50%;" :clearable="false" type="date" placeholder="选择日期">
							</el-date-picker>
						</div>
					</el-col>
					<el-col :span="6">

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
					<el-table-column align="center" width="200" prop="productListId" label="产品ID">
					</el-table-column>
					<el-table-column align="center" width="200" prop="productName" label="产品名称">
					</el-table-column>
					<el-table-column align="center" width="200" prop="productType" label="产品类型">
					</el-table-column>
					<el-table-column align="center" width="200" prop="sourceUpName" label="所属上游">
					</el-table-column>
					<el-table-column align="center" width="200" prop="linkSerialNum" label="链接编号">
					</el-table-column>
					<el-table-column align="center" width="200" prop="linkAddress" label="链接地址">
					</el-table-column>
					<el-table-column align="center" width="200" prop="linkWay" label="链接入网方式">
					</el-table-column>
					<el-table-column align="center" width="200" prop="remarks" label="备注">
					</el-table-column>
					<el-table-column align="center" width="200" prop="useNum" label="使用渠道数">
					</el-table-column>
					<el-table-column align="center" width="200" prop="createTime" label="创建时间">
					</el-table-column>
					<el-table-column align="center" width="200" prop="status" label="产品状态(停用/有效)">
						<!-- <template slot-scope="scope">
							<span v-if="scope.row.status == 0">有效</span>
							<span v-else>停用</span>
						</template> -->
						<template slot-scope="scope">
							<el-tooltip effect="dark" :content="scope.row.status==0?'有效':'停用'" placement="top"
								:enterable="false">
								<div class="flex_d_center">
									<el-switch style="margin-left: 10px;" v-model="scope.row.status" :active-value="0"
										:inactive-value="1" @change="changS($event,scope.row)" active-color="#46B251"
										inactive-color="#F44E43">
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
			<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="操作提示"
				:visible.sync="dialogDelete" top="30vh" width="30%">
				<div>确定删除该条数据吗？</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogDelete = false">取 消</el-button>
					<el-button @click="MdeleteUser" type="primary">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="操作提示" :visible.sync="dialogReset"
				top="30vh" width="30%">
				<div>确定重置{{resetName}}的密码吗？</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogReset = false">取 消</el-button>
					<el-button @click="MresetUser" type="primary">确 定</el-button>
				</span>
			</el-dialog>
		</div>

	</div>
</template>

<script>
	import {
		getActiveTypeList,
		getOrgInfo,
		accountUserList,
		userQueryByUserId,
		queryListByOrgId,
		userDeleteByUid,
		userUpdate,
		organizeQueryTreeList,
		accountUserInitPwd,





		shoppingAproductlistInfoS,
		shoppingAuptypeInfolist,
		shoppingAproductlistDelete,
		shoppingAproductlistUpdateStatus
	} from "../../api/management";
	const selectTree1 = () => import('@/components/selectTree')
	const selectTree2 = () => import('@/components/selectTree')
	export default {
		components: {
			selectTree1,
			selectTree2
		},
		data() {
			return {
				resetId: '',
				resetName: '',
				// 真实数据
				AllList: [],
				activitiType: '',
				deleteUserId: '',
				pulldownlist: [],
				// 分页
				total: 0,
				pageNo: 1,
				pageSize: 10,

				// 模拟数据
				dialogDelete: false,
				dialogVisible: false,
				dialogReset: false,
				StatusList: [{
						id: 0,
						name: '有效'
					},
					{
						id: 1,
						name: '停用'
					}
				],
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
				userInfo: {
					nickName: '',
					userName: '',
					orgName: '',
					roleList: '',
					roleId: '',
					userId: '',
					phone: ''
				},
				value: ''
			}
		},
		created() {
			if(this.$route.query.upMangerId) {
				this.form.upMangerId = this.$route.query.upMangerId
			}
			shoppingAuptypeInfolist().then((res) => {
				console.log("查询类型下拉:", res);
				if (res.code == 0) {
					this.pulldownlist = res.data
				} else {
					this.$message.error(res.msg);
				}
			})
			this.queryList()
		},
		methods: {
			changS(event, row) {
				console.log(event)
				console.log(row)
				shoppingAproductlistUpdateStatus({
					'listId':row.productListId
				}).then((res) => {
					console.log("res:", res);
					if (res.code == 0) {
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			// 删除
			MdeleteUser() {
				shoppingAproductlistDelete({
					listId: this.deleteUserId
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
			MresetUser() {
				accountUserInitPwd({
					userId: this.resetId
				}).then((res) => {
					console.log("删除用户:", res);
					if (res.code == 0) {
						this.$message.success('重置成功')
						this.dialogReset = false
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			resetUser(row) {
				console.log(row)
				this.resetName = row.userName
				this.resetId = row.userId
				this.dialogReset = true
			},
			changeOrg(val) {
				console.log(val)
				queryListByOrgId({
					orgId: val
				}).then((res) => {
					console.log("角色信息:", res);
					if (res.code == 0) {
						this.userInfo.roleList = res.roleList
						this.userInfo.roleId = ''
					}
				})
			},
			deleteUser(row) {
				console.log(row)
				this.deleteUserId = row.productListId
				this.dialogDelete = true
			},
			submitYes() {
				userUpdate({
					"nickName": this.userInfo.nickName,
					"orgId": this.userInfo.orgName.orgId,
					"roleId": this.userInfo.roleId,
					"userId": this.userInfo.userId,
					"userName": this.userInfo.userName,
					"phone": this.userInfo.phone
				}).then((res) => {
					console.log("用户信息:", res);
					if (res.code == 0) {
						this.dialogVisible = false
						this.queryList()
						this.$message.success('编辑成功')
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			// 重置
			reset() {
				this.form = {
					"currentPage": 1,
					"failureTime": "",
					"pageSize": 10,
					"productListId": "",
					"productName": "",
					"productType": "",
					"createTime": "",
					"status": "",
					"sourceUpName": "",
					"upMangerId":this.$route.query.upMangerId
				}
				this.queryList()
			},
			queryList() {
				this.form.currentPage = this.pageNo
				this.form.pageSize = this.pageSize
				shoppingAproductlistInfoS(this.form).then((res) => {
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
				if (new Date(this.form.createTime).getTime() > new Date(this.form.failureTime).getTime()) {
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
			formatter(row, column) {
				return row.address;
			},
			addMember() {
				console.log('打印row1111111111111')
				this.$router.push({
					name: 'add_editProduct',
					query: {
						arguments: '-1',
						editStatus: '-1'
					}
				})
			},
			// 编辑
			editUser(row) {
				console.log(row)
				this.$router.push({
					name: 'add_editProduct',
					query: {
						arguments: row.productListId,
						editStatus: '1'
					}
				})
			},
			seDetia(row) {
				console.log(row)
				this.$router.push({
					name: 'add_editProduct',
					query: {
						arguments: row.productListId,
						editStatus: '2'
					}
				})
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
