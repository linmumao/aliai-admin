<template>
	<div class="themeBgc allPage flex_c_ic">
		<div class="headBox2">
			<el-button @click="newAddRole" type="primary">新建角色</el-button>
			<template>
				<el-table :data="roleList" border style="width: 100%;margin-top: 16px;" header-row-class-name="tableHeader"
					:row-class-name="tableRowClassName">
					<el-table-column class-name="tdClassN" type="index" label="序号" width="180">
					</el-table-column>
					<el-table-column prop="roleName" label="角色" width="180">
					</el-table-column>
					<el-table-column prop="menus" label="角色权限">
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template slot-scope="scope">
							<!-- 修改按钮 -->
							<div v-show="scope.row.operable == 1" class="flex_d_center">
								<el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
									<div class="editFont c_pointer" @click="editRole(scope.row)">
									  <img class="cardImg" src="../../assets/add_img/operation_edit_20@2x.png" >
									</div>
								</el-tooltip>
								<el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
									<div class="editFont c_pointer" @click="deleteRole(scope.row)">
									  <img class="cardImg" src="../../assets/add_img/operation_delete_20@2x.png" >
									</div>
								</el-tooltip>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</div>

		<el-dialog custom-class="dialogClass" :close-on-click-modal="false" :title="editStatus == 0?'新建角色':'编辑角色'" :destroy-on-close="true" :visible.sync="dialogVisible"
			top="15vh" width="16.070588rem">
			<div class="newRoleBox">
				<div style="margin-top: 0px;" class="flex_rsb_aic kkbigbox">
					<div class="flex_r_ic kkbox">
						<div class="miniStar">*</div>
						<div class="miniText">角色：</div>
					</div>
					<el-input class="miniInput" v-model.trim="infoFome.roleName" maxlength="5" placeholder="请输入角色名称"></el-input>
				</div>
				<div class="flex_rsb kkbigbox">
					<div class="flex_r kkbox">
						<div class="miniStar">*</div>
						<div class="miniText">角色权限：</div>
					</div>
					<div class="moreRoleBg">
						<el-tree :data="data" show-checkbox  default-expand-all node-key="menuId" ref="tree"
							highlight-current @check="handleNodeClick" :props="defaultProps">
						</el-tree>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="Mcancel">取 消</el-button>
				<el-button type="primary" v-show="editStatus == 0" @click="submitYes">提 交</el-button>
				<el-button type="primary" v-show="editStatus == 1" @click="submitYes">保 存</el-button>
			</span>
		</el-dialog>
		<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="操作提示" :visible.sync="dialogDelete" top="30vh" width="30%">
			<div>确定删除该条数据吗？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogDelete = false">取 消</el-button>
				<el-button @click="MdeleteRole" type="primary">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		accountRoleListHasO,
		queryRoleMenuListTree,
		roleAddRoleMenu,
		updateRoleAndMenuByRid,
		roleDeleteById
	} from "../../api/management";
	export default {
		data() {
			return {
				// 真实数据
				roleList: [],
				editStatus: 0,
				editRoleId:'',
				deleteRoleId:'',
				infoFome: {
					roleName: '',
					menuIds: [],
				},
				defaultCkey: [],
				// 模拟数据
				dialogVisible: false,
				dialogDelete: false,
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				data: [],
				defaultProps: {
					children: 'children',
					label: 'menuName'
				},
				list: [{
						id: 0,
						name: '角色权限标题一',
						childer: [{
								name: "这个"
							},
							{
								name: "这个"
							},
							{
								name: "这个"
							},
						]
					},
					{
						id: 1,
						name: '角色权限标题二',
						childer: [{
								name: "这个"
							},
							{
								name: "这个"
							},
							{
								name: "这个"
							},
							{
								name: "这个"
							},
							{
								name: "这个"
							},
							{
								name: "这个"
							},
							{
								name: "这个"
							}
						]
					}
				]
			}
		},
		created() {
			this.MaccountRoleList()
			queryRoleMenuListTree().then((res) => {
				console.log("权限树形:", res);
				if (res.code == 0) {
					this.data = res.roleMenuTree
				} else {
					this.$message.error(res.msg);
				}
			})
		},
		methods: {
			Mcancel() {
				// this.defaultCkey = []
				this.$nextTick(() => {
					this.$refs.tree.setChecked([])
				});
				this.dialogVisible = false
			},
			MaccountRoleList() {
				accountRoleListHasO().then((res) => {
					console.log("角色信息:", res);
					if (res.code == 0) {
						this.roleList = res.roleList
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			deleteRole(row) {
				console.log(row)
				this.deleteRoleId = row.roleId
				this.dialogDelete = true
			},
			MdeleteRole() {
				roleDeleteById({
						roleId:this.deleteRoleId
					}).then((res) => {
					console.log("删除角色:", res);
					if (res.code == 0) {
						this.$message.success('删除成功')
						this.dialogDelete = false
						this.MaccountRoleList()
					}else{
						this.$message.error(res.msg);
					}
				})
			},
			submitYes() {
				console.log(this.infoFome)
				this.infoFome.roleName = this.infoFome.roleName.replace(/ /g,'')
				if(this.infoFome.roleName == '') {
					this.$message.error('请先输入角色名')
				}else if(!/^[\u4e00-\u9fa5]+$/i.test(this.infoFome.roleName)){
					this.$message.error('角色名只能输入中文')
				}else{
					if (this.editStatus == 1) {
						updateRoleAndMenuByRid({
							menuIds: this.infoFome.menuIds,
							roleId: this.editRoleId,
							roleName: this.infoFome.roleName
						}).then((res) => {
							console.log("编辑信息:", res);
							if (res.code == 0) {
								this.$message.success('修改成功')
								this.dialogVisible = false
								this.MaccountRoleList()
							} else {
								this.$message.error(res.msg);
							}
						})
					} else {
						if(this.infoFome.menuIds.length==0) {
							this.$message.error('请选择权限');
						}else{
							roleAddRoleMenu(this.infoFome).then((res) => {
								console.log("信息:", res);
								if (res.code == 0) {
									this.$message.success('保存成功')
									this.dialogVisible = false
									this.MaccountRoleList()
								} else {
									this.$message.error(res.msg);
								}
							})
						}
					}
				}
			},
			newAddRole() {
				this.dialogVisible = true
				this.editStatus = 0
				this.infoFome = {
						roleName: '',
						menuIds: [],
					},
					this.$nextTick(() => {
						this.$refs.tree.setChecked([])
					});
			},
			editRole(row) {
				console.log(row)
				this.dialogVisible = true
				this.editStatus = 1
				this.editRoleId = row.roleId
				this.infoFome.roleName = row.roleName
				this.infoFome.menuIds = row.menuIds
				this.$nextTick(() => {
					// this.$refs.tree.setCheckedKeys(row.menuIds)
					let that = this
					setTimeout(function() {
					row.menuIds.forEach(value => {
					that.$refs.tree.setChecked(value, true, false);
					});
					}, 500);

				});
				// this.defaultCkey = row.menuIds
				// this.defaultCkey = []
				// console.log(this.$refs.tree)
				// this.dialogVisible = true
				// this.$refs.tree.setCheckedKeys([]);
				// this.editStatus = 1
				// console.log(row)
				// this.$nextTick(()=>{
				// 	this.defaultCkey = row.menuIds
				// 	this.$forceUpdate();
				// 	console.log(this.defaultCkey)
				// })
			},
			// 为表格行添加样式
			tableRowClassName({
				row,
				rowIndex
			}) {
				return 'tabRowC'
			},
			// getCheckedKeys(data) {
			// 	console.log(data)
			// },
			getCheckedNodes() {
				console.log(this.$refs.tree.getCheckedNodes(true, false));
			},
			getCheckedKeys() {
				// console.log(this.$refs.tree.getCheckedKeys());
				return this.$refs.tree.getCheckedKeys()
			},
			getHalfCheckedKeys() {
				// console.log(this.$refs.tree.getHalfCheckedKeys());
				return this.$refs.tree.getHalfCheckedKeys()
			},
			handleNodeClick(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
				// console.log('-----------------------------')
				// console.log(this.getCheckedKeys())
				// console.log('-----------------------------')
				// console.log(this.getHalfCheckedKeys())
				// console.log('-----------------------------')
				// console.log(checkedNodes)
				// console.log(checkedKeys)
				// console.log(halfCheckedNodes)
				// console.log(halfCheckedKeys)
				// console.log(this.$refs.tree.getCheckedNodes(true,false));
				let goodmenus = []
				console.log(goodmenus.concat(this.getCheckedKeys(),this.getHalfCheckedKeys()))
				this.infoFome.menuIds = goodmenus.concat(this.getCheckedKeys(),this.getHalfCheckedKeys())
			},
		}
	}
</script>

<style lang='less' scoped>

	::v-deep .el-tree-node__label {
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #999999;
	}

	::v-deep .el-tree-node__content {
		margin-top: 17px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 26px;
		cursor: pointer;
	}

	.gouImg {
		width: 0.588235rem;
		height: 0.588235rem;
	}

	.kkbigbox {
		margin-top: 32px;

		.moreRoleBg {
			/* margin-left: 0.705882rem; */
			/* margin-left: 24px; */
			width: 392px;
			height: 381px;
			background: #ffffff;
			border: 1px solid #e9e9e9;
			border-radius: 4px;
			box-sizing: border-box;
			padding: 0.470588rem;
			overflow-y: scroll;

			.RoleBg {
				margin-top: 16px;
				margin-left: 16px;

				.OneRoleText {}

				.minnRole {
					margin-left: 46px;
					margin-top: 16px;
				}
			}
		}

		.kkbox {
			width: 3.294117rem;
			min-width: 3rem;
			/* background-color: pink; */
		}
	}

	.miniStar {
		margin-right: 0.117647rem;
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
		/* margin-left: 24px; */
		width: 393px;
		height: 1.17647rem;
		background: #ffffff;
		/* border: 1px solid #e9e9e9; */
		border-radius: 0.117647rem;
	}

	.editFont {
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #eb4778;
	}

	.centerFont {
		width: 1px;
		/* height: 16px; */
		/* background: #e9e9e9; */
		color: #e9e9e9;
		margin: 0 16px;
	}

	::v-deep .tdClassN {
		/* background-color: pink; */
		padding-left: 32px;
	}

	.allPage {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		/* padding: 0 32px; */
		/* padding-top: 24px; */
		/* padding-bottom: 0px; */
		padding: 24px;
		/* background-image:url('../../assets/image/jigou.png');
		background-size: cover; */

		.headBox {
			margin-top: 0.941176rem;
			width: 94.5%;
			height: 1.647058rem;
			/* background: #ffffff; */
		}

		.headBox2 {
			width: 100%;
			/* height: 284px; */
			background: #ffffff;
			padding: 24px;
		}

		.newRoleBox {
			height: 13.323529rem;

			/* background-color: pink; */
			.newRoleOne {}
		}
	}
	
	::v-deep .el-table--border th {
			border-right: 0px;
		}
	
	::v-deep .el-table--border td {
			border-right: 0px;
		}
	
	/* 表格 */
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
