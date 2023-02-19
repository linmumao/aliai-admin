<template>
	<div>
		<div class="topText">重置密码</div>
		<div class="neiBox">
			<el-input maxlength="20" style="margin-top: 48px;" show-password v-model="newPwd" @keyup.enter.native="YesXiugai" class="miniInput" placeholder="请输入新的登录密码">
			</el-input>
			<el-input maxlength="20" style="margin-top: 24px;" show-password v-model="againNewPwd" @keyup.enter.native="YesXiugai" class="miniInput" placeholder="请再次输入新的登录密码">
			</el-input>
			<div class="neiText2">* 请输入8~20位数字、字母和特殊字符的两种或多种组合（区分大小写）</div>
			<div @click="YesXiugai" class="yesBtn themeJbs">确定</div>
			<div class="backLogin">想起来了，<span @click="backLogin" class="c_pointer themeC">返回登录</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		accountOpenResetPwd
	} from "../../api/management";
	export default {
		data() {
			return {
				"againNewPwd": "",
				"newPwd": "",
			}
		},
		created() {
			console.log(this.$route.query.phone)
		},
		methods: {
			YesXiugai() {
					accountOpenResetPwd({
						"againNewPwd": this.$getRsaCode(this.againNewPwd),
						"newPwd": this.$getRsaCode(this.newPwd),
						"phone": this.$route.query.phone
					}).then((res) => {
						console.log(res)
						if (res.code == 0) {
							this.$message.success('重置密码成功')
							this.$router.push('/')
						}
					});
			},
			backLogin() {
				this.$router.push('/')
			},
		}
	}
</script>

<style lang='less' scoped>

	::v-deep .miniInput {
		border: 0;
	}

	.miniInput {
		margin-top: 24px;
		width: 360px;
		/* height: 48px; */
		background: #ffffff;
		/* border: 1px solid #e9e9e9; */
		border-radius: 4px;
	}

	.miniInput2 {
		width: 220px;
		/* height: 48px; */
		background: #ffffff;
		/* border: 1px solid #e9e9e9; */
		border-radius: 4px;
	}

	.topBox {
		width: 1120px;
		height: 96px;
		background: linear-gradient(275deg, #ff986b 0%, #eb4778);
		border-radius: 8px 8px 0px 0px;
		font-size: 24px;
		font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
		font-weight: 600;
		text-align: LEFT;
		color: #ffffff;
	}

	.topText {
		margin-top: 64px;
		font-size: 20px;
		font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
		font-weight: 600;
		text-align: CENTER;
		color: #333333;
	}

	.neiBox {
		margin-left: 380px;
		/* background-color: pink; */
		display: flex;
		flex-direction: column;

		.neiBoxOne {
			margin-top: 48px;
			font-size: 14px;
			font-family: Microsoft YaHei, Microsoft YaHei-Regular;
			font-weight: 400;
			text-align: LEFT;
			color: #333333;
		}

		.neiText2 {
			margin-top: 12px;
			font-size: 12px;
			font-family: Microsoft YaHei, Microsoft YaHei-Regular;
			font-weight: 400;
			text-align: LEFT;
			color: #f44e43;
		}

		.yesBtn {
			margin-top: 24px;
			cursor: pointer;
			width: 360px;
			height: 48px;
			line-height: 48px;
			text-align: center;
			/* background: linear-gradient(278deg, #ff986b 0%, #eb4778); */
			border-radius: 4px;
			font-size: 16px;
			font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
			font-weight: 600;
			text-align: CENTER;
			color: #fffafb;
		}

		.backLogin {
			margin-top: 12px;
			margin-left: 234px;
			font-size: 14px;
			font-family: Microsoft YaHei, Microsoft YaHei-Regular;
			font-weight: 400;
			text-align: LEFT;
			color: #999999;
		}
	}

	.getYzm {
		margin-left: 20px;
		width: 120px;
		height: 48px;
		line-height: 48px;
		background: linear-gradient(292deg, #ff986b 0%, #eb4778);
		border-radius: 4px;
		font-size: 16px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}
</style>
