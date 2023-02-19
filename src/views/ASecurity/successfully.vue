<template>
	<div class="flex_c_ic">
		<!-- <div class="topImg"></div> -->
		<img class="topImg" src="../../assets/add_img/succeed@2x.png" >
		<div class="text1">登录密码修改成功</div>
		<div class="text2">请牢记您的密码，并注意保护好密码</div>
		<div class="yesBtn themeJbs" @click="yesBtn">返回登录</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		methods: {
			yesBtn() {
				this.$router.push('/')
			}
		}
	}
</script>

<style lang='less' scoped>
	.topImg {
		margin-top: 126px;
		width: 86px;
		height: 86px;
	}
	.text1 {
		margin-top: 16px;
		font-size: 16px;
		font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
		font-weight: 600;
		text-align: CENTER;
		color: #333333;
	}
	.text2 {
		margin-top: 8px;
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: CENTER;
		color: #666666;
	}
	.yesBtn {
		margin-top: 48px;
		cursor: pointer;
		width: 360px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		/* background: linear-gradient(278deg,#ff986b 0%, #eb4778); */
		border-radius: 4px;
		font-size: 16px;
		font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
		font-weight: 600;
		text-align: CENTER;
		color: #fffafb;
	}
</style>
