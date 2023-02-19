<template>
	<div>
		<div class="topText">首次登录修改密码</div>
		<div class="neiBox">
			<div class="neiBoxOne">尊敬的用户： 为了您的账户安全，请修改您的登录密码</div>
			<el-input maxlength="35" show-password class="miniInput" @keyup.enter.native="yesBtn"
				v-model="form.newPwd" placeholder="请输入新的登录密码">
			</el-input>
			<el-input maxlength="35" show-password class="miniInput" @keyup.enter.native="yesBtn" v-model="form.againNewPwd"
				placeholder="请再次输入新的登录密码">
			</el-input>
			<div class="neiText2">* 请输入8~20位数字、字母和特殊字符的两种或多种组合（区分大小写）</div>
			<div class="yesBtn themeJbs" @click="yesBtn">确定</div>
		</div>
	</div>
</template>

<script>
	import {
		accountUserUpdatePwd
	} from "../../api/management";
	export default {
		data() {
			return {
				form: {
					"againNewPwd": '',
					"newPwd": ''
				}
			}
		},
		methods: {
			yesBtn() {
				console.log('进来')
				accountUserUpdatePwd({
					againNewPwd: this.$getRsaCode(this.form.againNewPwd),
					newPwd: this.$getRsaCode(this.form.newPwd),
				}).then((res) => {
					if (res.code == "0") {
						this.$message.success("修改密码成功");
						this.$router.push({
							path: "/accountSecurity/successfully",
						});
					}
				});
			}
		}
	}
</script>

<style lang='less' scoped>

	.miniInput {
		margin-top: 24px;
		width: 360px;
		/* height: 48px; */
		background: #ffffff;
		/* border: 1px solid #e9e9e9; */
		border-radius: 4px;
	}

	.topBox {
		width: 1120px;
		height: 96px;
		/* background: linear-gradient(275deg, #ff986b 0%, #eb4778); */
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
	}
</style>
