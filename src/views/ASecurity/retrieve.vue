<template>
	<div>
		<div class="topText">找回密码</div>
		<div class="neiBox">
			<el-input maxlength="11" style="margin-top: 48px;" v-model="phone" class="miniInput"
				placeholder="请输入绑定的手机号">
			</el-input>
			<div style="margin-top: 24px;" class="flex_r">
				<el-input maxlength="10" v-model="code" @keyup.enter.native="gotoNext" class="miniInput2"
					placeholder="验证码">
				</el-input>
				<div class="getYzm themeJbs c_pointer" @click="getCode" v-show="show">获取验证码</div>
				<div class="getYzm2 themeC" v-show="!show">{{ count }}s</div>
			</div>
			<div class="neiText2">* 收不到短信验证码请联系您的管理员重置密码</div>
			<div @click="gotoNext" class="yesBtn themeJbs">下一步</div>
			<div class="backLogin">想起来了，<span @click="backLogin" class="c_pointer themeC">返回登录</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		accountOpenCode,
		accountOpenVerifyPhoneCode
	} from "../../api/management";
	export default {
		data() {
			return {
				count: '',
				show: true,
				timer: null,
				phone: '',
				code: ''
			}
		},
		methods: {
			getCode() {
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
					this.$message.error("手机号码有误，请重填");
					return false;
				}else{
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--;
							} else {
								this.show = true;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
					accountOpenCode({
						phone: this.phone
					}).then((res) => {
						console.log(res)
						if (res.code == 0) {
							this.$message.success('发送验证码成功')
						}
					});
				}
			},
			backLogin() {
				this.$router.push('/')
			},
			gotoNext() {
				accountOpenVerifyPhoneCode({
					code: this.code,
					phone: this.phone,
				}).then((res) => {
					console.log(res)
					if (res.code == 0) {
						this.$message.success('验证通过')
						this.$router.push({
							path: '/accountSecurity/reset',
							query: {
								phone: this.phone,
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang='less' scoped>

	/* ::v-deep .miniInput {
		border: 0;
	} */
	
	::v-deep .el-input__inner {
		color: #333333;
		height: 48px !important;
	}

	.miniInput {
		margin-top: 24px;
		width: 360px;
		height: 48px;
		background: #ffffff;
		/* border: 1px solid #e9e9e9; */
		border-radius: 4px;
	}

	.miniInput2 {
		width: 220px;
		height: 48px;
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
		/* background: linear-gradient(292deg, #ff986b 0%, #eb4778); */
		border-radius: 4px;
		font-size: 16px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
	}

	.getYzm2 {
		margin-left: 20px;
		width: 120px;
		height: 48px;
		line-height: 48px;
		/* background: linear-gradient(292deg,#ff986b 0%, #eb4778); */
		border-radius: 4px;
		font-size: 16px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: center;
		/* color: #eb4778; */
	}
</style>
