<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App',
	}
</script>

<style>
	@import "./assets/global.css";
	@import "./assets/allCss.css";
	@import "./assets/allFont.css";

	* {
		margin: 0;
		padding: 0
	}

	html {
		min-width: 1600px;
	}
	/* .el-select-dropdown__item.selected {
		color: #EB4778 !important;
	} */
	/* .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
		background-color:white !important;
	}
	.el-radio__input.is-checked .el-radio__inner {
		background:#eb4778 !important;
		border-color:#eb4778 !important;
	} */
	
	/* 表格 */
	.tabRowC {
		background: red;
		height: 43px;
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		color: #999999;
	}
	
	.tableHeader th {
		height: 53px;
		background: pink;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		overflow: auto;
		color: #333333;
	}
</style>
