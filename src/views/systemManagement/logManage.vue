<template>
	<div class="allPage themeBgc">
		<div class="bigKuang">
			<div class="TopK">
				<el-row :gutter="24">
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">日志标题</span>
							<el-input v-model="logForm.operationName" @keyup.enter.native="goToSerch" placeholder="请输入日志标题"></el-input>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">操作用户</span>
							<el-input v-model="logForm.operatorName" @keyup.enter.native="goToSerch" placeholder="请输入用户名称"></el-input>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">日志类型</span>
							<el-select v-model="logForm.operationType" style="width: 100%;" :popper-append-to-body="false" placeholder="请选择">
								<el-option v-for="(item, index) in typeList" :label="item.typeName"
									:value="item.typeValue">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col class="flex_r" :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">操作时间</span>
							<el-date-picker style="width: 50%;" :clearable="false" v-model="logForm.beginTime" type="date"
								placeholder="选择日期">
							</el-date-picker>
							<span style="margin-left: 4px;margin-right: 3px;">-</span>
							<el-date-picker style="width: 50%;" :clearable="false" v-model="logForm.endTime" type="date"
								placeholder="选择日期">
							</el-date-picker>
						</div>
					</el-col>
				</el-row>
				<el-row style="margin-top: 16px;" :gutter="24">
					<el-col :span="6">
						<div class="flex_r_ic">
							<span style="white-space:nowrap;margin-right: 12px;">&#12288;&#12288;&#12288;&#12288;</span>
							<el-button @click="goToSerch" type="primary">查询</el-button>
							<el-button @click="reSet">重置</el-button>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="TwoBox flex_c_s">
				<el-table :data="logList" border height="90%" style="width: 100%;" header-row-class-name="tableHeader"
					:row-class-name="tableRowClassName">
					<el-table-column type="index" width="65" align="center" label="序号">
					</el-table-column>
					<el-table-column align="center" prop="operationName" label="标题">
					</el-table-column>
					<el-table-column align="center" prop="operationType" label="日志类型">
					</el-table-column>
					<el-table-column align="center" prop="operatorIp" label="操作IP">
					</el-table-column>
					<el-table-column align="center" prop="operatorName" label="操作用户">
					</el-table-column>
					<el-table-column align="center" prop="operationTime" label="操作时间">
					</el-table-column>
					<el-table-column align="center" prop="operationResult" label="操作结果">
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
		</div>
	</div>
</template>

<script>
	import {
		accountUserQueryLogTypeL,
		accountUserQueryLogL
	} from "../../api/management";

	export default {
		data() {
			return {
				typeList: [],
				openTime: '',
				total: 0,
				pageSize:10,
				pageNo:1,
				logForm: {
					"beginTime": "",
					"currentPage": 1,
					"endTime": "",
					"operationName": "",
					"operationType": "",
					"operatorName": "",
					"pageSize": 10
				},
				logList:[]
			}
		},
		created() {
			accountUserQueryLogTypeL().then((res) => {
				console.log("日志类型:", res);
				if (res.code == 0) {
					this.typeList = res.typeList
				} else {
					this.$message.error(res.msg);
				}
			})
			this.accountUserQueryLogLM()
		},
		mounted() {},
		methods: {
			// 为表格行添加样式
			tableRowClassName({
				row,
				rowIndex
			}) {
				return "tabRowC";
			},
			// 分页
			handleSizeChange(val) {
				this.pageSize = val;
				console.log(`每页 ${val} 条`);
				this.accountUserQueryLogLM();
			},
			handleCurrentChange(val) {
				this.pageNo = val;
				console.log(`当前页: ${this.pageNo}`);
				this.accountUserQueryLogLM();
			},
			accountUserQueryLogLM() {
				this.logForm.pageSize = this.pageSize
				this.logForm.currentPage = this.pageNo
				accountUserQueryLogL(this.logForm).then((res) => {
				console.log("查询日志:", res);
				if (res.code == 0) {
					this.logList = res.logList.logList
					this.total = res.logList.totalCount
				} else {
					this.$message.error(res.msg);
				}
			})
			},
			goToSerch() {
				if(new Date(this.logForm.beginTime).getTime()>new Date(this.logForm.endTime).getTime()) {
					this.$message.error('结束时间不能小于开始时间');
				}else{
					this.pageNo = 1
					this.pageSize = 10
					this.accountUserQueryLogLM()
				}
			},
			reSet() {
				this.logForm = {
					"beginTime": "",
					"currentPage": 1,
					"endTime": "",
					"operationName": "",
					"operationType": "",
					"operatorName": "",
					"pageSize": 10
				}
				this.pageNo = 1
				this.pageSize = 10
				this.accountUserQueryLogLM()
			}
		}
	}
</script>

<style lang='less' scoped>
	/*滚动条整体部分,必须要设置*/
	::-webkit-scrollbar {
		width: 0px;
		/*滚动条宽度（右侧滚动条）*/
		height: 00px;
		/*滚动条高度（底部滚动条）*/
		background-color: #333;
	}

	/*滚动条的轨道，一下两个样式组合作用于滚动条滚动轨迹的表现*/
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
		background-color: #67687d;
	}

	::-webkit-scrollbar-track-piece {
		background: #ff0000;
	}

	/*滚动条的滑块按钮*/
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: #de6b90;
		box-shadow: inset 0 0 5px #000;
	}

	/*滚动条的上下左右两端的按钮*/
	::-webkit-scrollbar-button {
		height: 10px;
		width: 10px;
		background-color: #b0aeda;
	}

	/*滚动条下边和右边按钮的交接处*/
	::-webkit-scrollbar-corner {
		background: #82afff;
	}

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

	.allPage {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		padding: 0 32px;
		padding-top: 24px;
		padding-bottom: 0px;

		.bigKuang {
			width: 100%;
			height: 85vh;

			.TopK {
				/* margin-top: 25px; */
				background: #ffffff;
				border-radius: 8px;
				box-shadow: 0px 0px 20px 0px rgba(236, 72, 121, 0.05);
				box-sizing: border-box;
				padding: 24px;
			}

			.TwoBox {
				margin-top: 24px;
				height: 77%;
				background: #ffffff;
				border-radius: 8px;
				box-shadow: 0px 0px 20px 0px rgba(236, 72, 121, 0.05);
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
</style>
