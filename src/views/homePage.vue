<template>
	<div class="homeP">
		<img style="width: 400px;height: 400px;" src="../assets/shouye/zhongtu.png" alt="">
		<div>开发中~</div>
	</div>
</template>
<script>
	import {
		getLogin,
		accountOpenTest
	} from "../api/management";

	export default {
		data() {
			return {
				mid:123,
				router:'http://localhost:8081/#/mbyes'
			};
		},
		created() {},
		mounted() {
		},
		methods: {
			changeMb(mid) {
				this.mid = mid
				if(this.mid == 123) {
					this.router = 'http://localhost:8081/#/mbyes'
				}else if(this.mid == 456) {
					this.router = 'http://localhost:8081/#/mbyes2'
				}
				// alert(this.mid)
			},
			yesadmin() {
				if(this.mid == 123) {
					// this.router = 'http://localhost:8081/#/mbyes'
					alert('http://localhost:8081/#/?123')
				}else if(this.mid == 456) {
					alert('http://localhost:8081/#/?456')
				}
			}
		},
	};
</script>
<style lang='less' scoped>
	.homeP {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.box {
		background-color: #2883FC;
		width: 200px;
		height: 200px;
	}
	.box2 {
		background-color: #409EFF;
		width: 200px;
		height: 200px;
	}
</style>