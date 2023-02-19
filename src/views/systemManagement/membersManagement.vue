<template>
	<div class="allPage themeBgc">
		<div class="bigKuang">
			<div class="TopK themeBgc">
				<el-row :gutter="24">
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">所属机构</span>
							<selectTree1 :TreeList="orgTreeList" :id="form.orgId" :label="form.orgName" @MtreeData="MtreeData"></selectTree1>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">用户账号</span>
							<el-input v-model.trim="form.userName" @keyup.enter.native="serchAll" maxlength="35" placeholder="请输入用户账号">
							</el-input>
						</div>
					</el-col>
					<el-col class="flex_r" :span="6">
						
					</el-col>
					<el-col :span="6">
						<div class="flex_r_ic">
							
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="6">
						<div style="margin-top: 16px;" class="flex_r">
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
					<el-button @click="addMember" type="primary">+ 添加</el-button>
					<!-- <div @click="addMember" style="margin-top: 0px;" class="el-button--goon3">
						+ 添加
					</div> -->
				</div>
				<el-table :data="AllList" border height="90%" style="width: 100%;" header-row-class-name="tableHeader"
					:row-class-name="tableRowClassName" :default-sort="{prop: 'date', order: 'descending'}">
					<el-table-column align="center" width="200" prop="nickName" label="用户名">
					</el-table-column>
					<el-table-column align="center" width="200" prop="userName" label="用户账号">
					</el-table-column>
					<el-table-column align="center" width="200" prop="roleNames" label="用户角色">
					</el-table-column>
					<el-table-column align="center" prop="orgName" label="机构名称">
					</el-table-column>
					<el-table-column align="center" prop="lastLoginTime" label="最后登录时间" sortable>
					</el-table-column>
					<el-table-column align="center" width="180" label="操作">
						<template slot-scope="scope">
							<!-- 修改按钮 -->
							<div v-show="scope.row.operable == 1" class="flex_d_center">
								<el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
									<div class="editFont c_pointer" @click="editUser(scope.row)">
									  <img class="cardImg" src="../../assets/add_img/operation_edit_20@2x.png" >
									</div>
								</el-tooltip>
								<el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
									<div class="editFont c_pointer" @click="deleteUser(scope.row)">
									  <img class="cardImg" src="../../assets/add_img/operation_delete_20@2x.png" >
									</div>
								</el-tooltip>
								<el-tooltip effect="dark" content="重置密码" placement="top" :enterable="false">
									<div class="editFont c_pointer" @click="resetUser(scope.row)">
									  <img class="cardImg" src="../../assets/add_img/operation_reset_passwords_20@2x.png" >
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
						:page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :current-page="pageNo" layout="sizes, prev, pager, next"
						:total="total">
					</el-pagination>
				</div>
			</div>
			<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="操作提示" :visible.sync="dialogDelete" top="30vh" width="30%">
				<div>确定删除该条数据吗？</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogDelete = false">取 消</el-button>
					<el-button @click="MdeleteUser" type="primary">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="操作提示" :visible.sync="dialogReset" top="30vh" width="30%">
				<div>确定重置{{resetName}}的密码吗？</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogReset = false">取 消</el-button>
					<el-button @click="MresetUser" type="primary">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="编辑用户" :destroy-on-close="true" :visible.sync="dialogVisible" top="20vh"
				width="15.625rem">
				<div style="margin-top: 0px;" class="flex_rsb_aic kkbigbox">
					<div class="flex_r_ic kkbox">
						<div class="miniStar">*</div>
						<div class="miniText">用户名：</div>
					</div>
					<el-input class="miniInput" v-model.trim="userInfo.nickName" maxlength="10" placeholder="请输入内容">
					</el-input>
				</div>
				<div class="flex_rsb_aic kkbigbox">
					<div class="flex_r_ic kkbox">
						<div class="miniStar">*</div>
						<div class="miniText">用户账号：</div>
					</div>
					<el-input class="miniInput" v-model.trim="userInfo.userName" maxlength="35" placeholder="请输入内容">
					</el-input>
				</div>
				<div class="flex_rsb_aic kkbigbox">
					<div class="flex_r_ic kkbox">
						<div class="miniStar">*</div>
						<div class="miniText">手机号码：</div>
					</div>
					<el-input class="miniInput" v-model.trim="userInfo.phone" maxlength="11" placeholder="请输入内容">
					</el-input>
				</div>
				<div class="flex_rsb_aic kkbigbox">
					<div class="flex_r_ic kkbox">
						<div class="miniStar">*</div>
						<div class="miniText">所属机构：</div>
					</div>
					<div>
						<selectTree2 :TreeList="orgTreeList" @MtreeData="MtreeData2" :id="userInfo.orgName.orgId" :label="userInfo.orgName.orgName" :TreeWidth="'11.529411rem'"></selectTree2>
					</div>
				</div>
				<div class="flex_rsb_aic kkbigbox">
					<div class="flex_r_ic kkbox">
						<div class="miniStar">*</div>
						<div class="miniText">角色：</div>
					</div>
					<el-select collapse-tags id="mulSelect" class="miniInput" v-model="userInfo.roleId"
						placeholder="请选择">
						<el-option v-for="(item,index) in userInfo.roleList" :key="item.roleId" :label="item.roleName"
							:value="item.roleId">
						</el-option>
					</el-select>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitYes">保 存</el-button>
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
		accountUserInitPwd
	} from "../../api/management";
	const selectTree1 = () => import('@/components/selectTree')
	const selectTree2 = () => import('@/components/selectTree')
	export default {
		components: { selectTree1,selectTree2 },
		data() {
			return {
				resetId:'',
				resetName:'',
				// 真实数据
				changeOrgTreeS: false,
				AllList: [],
				orgTreeList: [],
				organizationList: '',
				activitiType: '',
				deleteUserId: '',
				// 分页
				total: 0,
				pageNo: 1,
				pageSize: 10,

				// 模拟数据
				dialogDelete: false,
				dialogVisible: false,
				dialogReset:false,
				form: {
					// 真实数据
					orgId: '',
					phone: '',
					userName: '',
					orgName: ''
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
			// 获取机构信息的列表
			getOrgInfo().then((res) => {
				console.log("机构信息:", res);
				if (res.code == 0) {
					this.organizationList = res.orgList
				} else {
					this.$message.error(res.msg);
				}
			})
			organizeQueryTreeList().then((res) => {
				console.log("Treeres:", res);
				if (res.code == 0) {
					console.log('-------------------------')
					console.log(res.orgTree)
					console.log(this.orgTreeList)
					this.orgTreeList.push(res.orgTree)
					console.log(this.orgTreeList)
					console.log('-------------------------')
					// this.oneOrgId = this.orgList[0].orgId
					// this.form.orgId = this.orgList[0].orgId
					// this.MqueryDetailByOrgId()
				} else {
					console.log(res.msg)
				}
			})
			this.MaccountUserList()
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
				this.form.orgName = data.orgName
				this.form.orgId = data.orgId
				this.changeOrgTreeS = false
			},
			MtreeData(data) {
				console.log(data);
				this.form.orgName = data.name
				this.form.orgId = data.id
			},
			MtreeData2(data) {
				console.log(data);
				this.userInfo.orgName.orgId = data.id
				this.userInfo.orgName.orgName = data.name
				queryListByOrgId({
					orgId: data.id
				}).then((res) => {
					console.log("角色信息:", res);
					if (res.code == 0) {
						this.userInfo.roleList = res.roleList
						this.userInfo.roleId = ''
					}
				})
				// this.form.orgName = data.name
				// this.form.orgId = data.id
			},
			// 删除
			MdeleteUser() {
				userDeleteByUid({
					userId: this.deleteUserId
				}).then((res) => {
					console.log("删除用户:", res);
					if (res.code == 0) {
						this.$message.success('删除成功')
						this.dialogDelete = false
						this.MaccountUserList()
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
				this.deleteUserId = row.userId
				this.dialogDelete = true
			},
			submitYes() {
				console.log(this.userInfo)
				this.userInfo.nickName = this.userInfo.nickName.replace(/ /g, '')
				this.userInfo.userName = this.userInfo.userName.replace(/ /g, '')
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
						this.MaccountUserList()
						this.$message.success('编辑成功')
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			// 编辑
			editUser(row) {
				console.log(row)
				userQueryByUserId({
					userId: row.userId
				}).then((res) => {
					console.log("用户信息:", res);
					if (res.code == 0) {
						this.userInfo.nickName = res.user.nickName
						this.userInfo.userName = res.user.userName
						this.userInfo.orgName = res.user.orgName
						this.userInfo.roleList = res.user.roleList
						this.userInfo.roleId = res.user.roleId
						this.userInfo.userId = res.user.userId
						this.userInfo.phone = res.user.phone
						console.log(this.userInfo.orgName.orgId)
						this.dialogVisible = true
					}
				})
			},
			// 重置
			reset() {
				this.form = {
					// 真实数据
					orgId: '',
					phone: '',
					userName: ''
				}
				this.MaccountUserList()
			},
			MaccountUserList() {
				this.form.phone = this.form.phone.replace(/ /g, '')
				this.form.userName = this.form.userName.replace(/ /g, '')
				accountUserList({
					"currentPage": this.pageNo,
					"orgId": this.form.orgId,
					"pageSize": this.pageSize,
					"phone": this.form.phone,
					"userName": this.form.userName
				}).then((res) => {
					console.log("res:", res);
					if (res.code == 0) {
						console.log(res.page.list)
						this.total = res.page.totalCount
						this.AllList = res.page.list
					} else {
						console.log(res.msg)
					}
				})
			},
			serchAll() {
				console.log(this.form)
				this.pageNo = 1
				this.MaccountUserList()
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
			addMember(row) {
				console.log('打印row1111111111111')
				// this.$router.push('addMember')
				this.$router.push({
					name: 'addMember'
				})
				// this.$router.push({
				// 	path: '/systemManagement/membersManagement/addMember',
				// 	query: {
				// 		groupId: '1'
				// 	}
				// })
				// console.log(row.id)
				// this.$router.push({
				// 	path: 'configuration',
				// 	query: {
				// 		activeId: row.id
				// 	}
				// })
			},

			// 分页
			handleSizeChange(val) {
				this.pageSize = val
				console.log(`每页 ${val} 条`);
				this.MaccountUserList()
			},
			handleCurrentChange(val) {
				this.pageNo = val
				console.log(`当前页: ${this.pageNo}`);
				this.MaccountUserList()
			}
		},
		mounted() {}
	}
</script>

<style lang='less' scoped>
	.editFont {
		cursor: pointer;
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #eb4778;
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
