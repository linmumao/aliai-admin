<template>
	<div class="bigPage flex_cc_ac">
		<div class="waiBox">
			<div class="topBox themeJbs flex_cc_ac">账号安全</div>
			<router-view></router-view>
			
			<!-- <div>
				<div class="neiBox1">111</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		created() {
		},
		methods:{
			
		}
	}
</script>

<style lang='less' scoped>
	::v-deep .el-input__inner {
		color: #333333;
		height: 48px;
	}
	
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
	.bigPage {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100vh;
		background: url(../assets/add_img/login_bg@2x.png) no-repeat;
		background-size: 100% 100%;
		.waiBox {
			width: 1120px;
			height: 640px;
			background: #ffffff;
			border-radius: 8px;
			.topBox {
				width: 1120px;
				height: 96px;
				/* background: linear-gradient(275deg,#ff986b 0%, #eb4778); */
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
					background: linear-gradient(278deg,#ff986b 0%, #eb4778);
					border-radius: 4px;
					font-size: 16px;
					font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
					font-weight: 600;
					text-align: CENTER;
					color: #fffafb;
				}
			}
		}
	}
</style>
