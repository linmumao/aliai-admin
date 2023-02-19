<template>
	<div style="width: 100%;position: relative;">
		<div v-clickoutside="handleClose" @click="changeTreeS = !changeTreeS" :style="{width: TreeWidth,height: TreeHeight}"
			class="orgBox flex_rsb_aic">
			<span class="noSelect" v-show="TreeForm.name == ''">请选择机构</span>
			<span style="font-size: 14px;" v-show="TreeForm.name">{{TreeForm.name}}</span>
			<i v-show="!changeTreeS" class="el-icon-arrow-down iconArrow"></i>
			<i v-show="changeTreeS" class="el-icon-arrow-up iconArrow"></i>
		</div>
		<div v-show="changeTreeS" :style="{width: TreeWidth}" class="orgTree">
			<el-tree :data="TreeList" node-key="id" default-expand-all :expand-on-click-node="false"
				@node-click="handleNodeClick">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span style="font-size: 14px;">{{ data.orgName }}</span>
				</span>
			</el-tree>
		</div>
	</div>
</template>

<script>
	const clickoutside = {
		// 初始化指令
		bind(el, binding, vnode) {
			function documentHandler(e) {
				// 这里判断点击的元素是否是本身，是本身，则返回
				if (el.contains(e.target)) {
					console.log('是自己')
					console.log(el)
					el.style.borderColor="#1677FF"
					console.log('44444444444444444444')
					// console.log(document.getElementsByClassName('orgBox')[0])
					// document.getElementsByClassName('orgBox')[0].style.borderColor="#67C23A"
					return false;
				}else{
					// document.getElementsByClassName('orgBox')[0].style.borderColor="#DCDFE6"
					el.style.borderColor="#DCDFE6"
				}
				// 判断指令中是否绑定了函数
				if (binding.expression) {
					// 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
					binding.value(e);
				}
			}
			// 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
			el.__vueClickOutside__ = documentHandler;
			document.addEventListener('click', documentHandler);
		},
		update() {},
		unbind(el, binding) {
			// 解除事件监听
			document.removeEventListener('click', el.__vueClickOutside__);
			delete el.__vueClickOutside__;
		},
	};
	export default {
		props: {
			TreeList: {
				type: Array,
				default: []
			},
			id: {
				type: String,
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			TreeWidth: {
				type: String,
				default: ''
			},
			TreeHeight: {
				type: String,
				default: (32 / 32) + 'rem'
			}
		},
		data() {
			return {
				changeTreeS: false,
				TreeForm: {
					id: '',
					name: ''
				}
			}
		},
		watch: {
			id: function(val) {
				console.log(val)
				this.TreeForm.id = val
				// this.$emit('MtreeData', this.TreeForm)
			},
			label: function(val) {
				console.log(val)
				this.TreeForm.name = val
				// this.$emit('MtreeData', this.TreeForm)
			}
		},
		mounted() {
			console.log('this.id')
			console.log(this.id)
			console.log(this.label)
			this.TreeForm.id = this.id
			this.TreeForm.name = this.label
		},
		directives: {clickoutside},
		methods: {
			handleClose(e) {
			            console.log('222222222')
						this.changeTreeS = false
			        },
			handleNodeClick(data) {
				console.log(data);
				this.TreeForm.name = data.orgName
				this.TreeForm.id = data.orgId
				this.changeTreeS = false
				this.$emit('MtreeData', this.TreeForm)
			},
		},
	}
</script>

<style lang='less' scoped>
	.orgBox {
		position: relative;
		border: 1px solid #DCDFE6;
		border-radius: 4px;
		box-sizing: border-box;
		padding: 0 12px;
		/* width: 100%; */
		background-color: #ffffff;
		cursor: pointer;
	}
	.orgBox:hover {
		border: 1px solid #c0c4cc;
	}
	
	.noSelect {
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #999999;
	}

	.orgTree {
		position: absolute;
		left:0px;
		right:0px;
		/* width: 240px; */
		min-height: 100px;
		max-height: 300px;
		background-color: #ffffff;
		z-index: 1000;
		overflow-y: scroll;
		padding-bottom: 20px;
		/* box-shadow: 0px 0px 25px 0px rgba(236, 72, 121, 0.05); */
		/* background-color: pink !important; */
		border: 1px solid #DCDFE6;
		margin-top: 5px;
	}
	.orgTree::-webkit-scrollbar {
	  display: none;
	}
	
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 8px;
	}
	.iconArrow {
		font-size: 14px;
		color: #C0C4CC;
	}
</style>
