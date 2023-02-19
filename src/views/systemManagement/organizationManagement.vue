<template>
	<div class="themeBgc allPage flex_c_ic">
		<div class="neiBody flex_rsb">
			<div class="neiLeft flex_c_ic">
				<div class="neiLTopBox">
					<el-input @keyup.enter.native="enterSeach" class="searchInput" maxlength="35" placeholder="搜索机构" v-model="orgName">
						<div class="imgthisbox" slot="suffix">
							<img @click="enterSeach" class="imgSerch c_pointer" src="../../assets/business_center/search_gray@2x.png"
								alt="">
						</div>
					</el-input>
				</div>
				<div class="neiTitel flex_rsb_aic">
					<div>机构列表</div>
					<!-- <div @click="addOrganization" class="el-button--goon3">添加机构</div> -->
				</div>
				<div class="listBtop flex_rsb_aic">
					<div>机构名称</div>
					<div>操作</div>
				</div>
				<div class="listBody">
					<!-- <div v-for="(item,index) in orgList" @click="cutSe(index,item)"
						:class="seIndex==index?'oneList':'oneList2'">
						<div class="flex_r_ic c_pointer" style="height: 100%;">
							<img class="logo20img" :src="item.logoUrl"><span class="yhtext">{{item.orgName}}</span>
						</div>
					</div> -->
					<!-- <el-tree :data="orgTreeList" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
					<el-tree
					      :data="orgTreeList"
					      node-key="id"
					      default-expand-all
						  @node-click="handleNodeClick"
					      :expand-on-click-node="false">
					      <span class="custom-tree-node" slot-scope="{ node, data }" @mouseover= mouseover(data,$event)>
					        <span class="nodeTreeText">{{ data.orgName }}</span>
					        <span>
					          <!-- <el-button
					            type="text"
					            size="mini"
					            @click="() => append(data)">
					            Append
					          </el-button> -->
							  <i class="el-icon-circle-plus-outline editOM1 themeC" v-if="mouseleId == data.orgId" @click="MeditOMadd(data)"></i>
							  <i class="el-icon-edit editOM themeC" v-if="mouseleId == data.orgId" @click="MeditOM(data)"></i>
					        </span>
					      </span>
					    </el-tree>
				</div>
			</div>
			<div class="neiRight flex_c_ic">
				<img class="NewNeiRimg" :src="newForm.logoUrl" >
				<div class="NewNeiRText">{{newForm.orgName}}</div>
				<div class="NewNeiRBox">
					<div style="margin-top: 49px;" class="newOne flex_r_ic">
						<div>隶属机构：</div>
						<div style="color: #333333;">{{newForm.parentOrgName}}</div>
					</div>
					<div style="margin-top: 20px;" class="newOne flex_r_ic">
						<div>行业类型：</div>
						<div style="color: #333333;">{{newForm.tradeName}}</div>
					</div>
					<div style="margin-top: 20px;" class="newOne flex_r">
						<div>角色类型：</div>
						<div style="color: #333333;">
							<div class="newOneRoleBox flex_r_fw">
								<div v-for="(item,index) in newForm.roleList" :key="item.roleId" class="miniRoleBOX">{{item.roleName}}</div>
							</div>
						</div>
					</div>
					<div style="margin-top: 20px;" class="newOne flex_r_ic">
						<div>机构地址：</div>
						<div style="color: #333333;">{{newForm.addressInfo}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		organizeQueryList,
		organizeQueryByName,
		queryDetailByOrgId,
		tradeList,
		queryProvinceList,
		queryCityBProvinceId,
		queryUrbanCityId,
		organizeUpdateById,
		organizeQueryTreeList,
		queryInfoByOrgId
	} from "../../api/management";
	import homeUrl from "../../utils/url.js";
	export default {
		data() {
			return {
				mouseleId:'',
				newForm:'',
				homeUrl:'',
				seIndex: 0,
				orgList: [],
				orgTreeList: [],
				defaultProps: {
				          children: 'children',
				          label: 'orgName'
				        },
				input1: '',
				input: '',
				oneOrgId: '',
				tradeList: [],
				provinceList: [],
				cityList: [],
				urbanList: '',
				orgName: '',
				form: {
					"address": "",
					"cityId": "",
					"logoUrl": "",
					"orgName": "",
					"parentId": "",
					"provinceId": "",
					"tradeId": "",
					"urbanId": "",
					"orgId": "",
				},
				value: '',
				imageUrl: ''
			}
		},
		created() {
			console.log('homeUrl')
			console.log(homeUrl)
			this.homeUrl = homeUrl
			console.log('homeUrl2')
			console.log(this.homeUrl)
			organizeQueryTreeList().then((res) => {
				console.log("Treeres:", res);
				if (res.code == 0) {
					console.log('-------------------------')
					console.log(res.orgTree)
					console.log(this.orgTreeList)
					this.orgTreeList.push(res.orgTree)
					console.log(this.orgTreeList)
					console.log('-------------------------')
					this.oneOrgId = this.orgTreeList[0].orgId
					this.MqueryInfoByOrgId()
				} else {
					console.log(res.msg)
				}
			})
			tradeList().then((res) => {
				console.log("res:", res);
				if (res.code == 0) {
					this.tradeList = res.tradeList
				} else {
					console.log(res.msg)
				}
			})
			queryProvinceList().then((res) => {
				console.log("res:", res);
				if (res.code == 0) {
					this.provinceList = res.provinceList
				} else {
					console.log(res.msg)
				}
			})
		},
		methods: {
			mouseover(data,event) {
				this.mouseleId = data.orgId
			},
			MeditOMadd(data) {
				// this.$router.push('/systemManagement/addOrganization')
				this.$router.push({
					path: '/addweb/systemManagement/addOrganization',
					query: {
						orgIdadd: data.orgId,
						orgNameadd: data.orgName
					}
				})
			},
			MeditOM(data) {
				// this.$router.push('/systemManagement/addOrganization')
				this.$router.push({
					path: '/addweb/systemManagement/addOrganization',
					query: {
						orgId: data.orgId
					}
				})
			},
			append(data) {
			        const newChild = { id: id++, label: 'testtest', children: [] };
			        if (!data.children) {
			          this.$set(data, 'children', []);
			        }
			        data.children.push(newChild);
			      },
			handleNodeClick(data) {
				console.log(data)
				this.oneOrgId = data.orgId
				this.MqueryInfoByOrgId()
			},
			saveOrg() {
				console.log(this.form)
				this.form.orgName = this.form.orgName.replace(/ /g,'')
				this.form.address = this.form.address.replace(/ /g,'')
				organizeUpdateById(this.form).then((res) => {
					console.log("保存修改机构:", res);
					if (res.code == 0) {
						this.$message.success('保存成功')
						this.oneOrgId = this.form.orgId
						this.MorganizeQueryList()
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			changeCity(val) {
				console.log(val)
				queryUrbanCityId({
					cityId: this.form.cityId
				}).then((res) => {
					console.log("角色信息:", res);
					if (res.code == 0) {
						// this.roleList = res.roleList
						this.urbanList = res.urbanList
					} else {
						console.log(res.msg)
					}
				})
			},
			changeCity2(val) {
				console.log(val)
				queryUrbanCityId({
					cityId: this.form.cityId
				}).then((res) => {
					console.log("角色信息:", res);
					if (res.code == 0) {
						// this.roleList = res.roleList
						this.urbanList = res.urbanList
						this.form.urbanId = this.urbanList[0].urbanId
					} else {
						console.log(res.msg)
					}
				})
			},
			changePro(val) {
				console.log(val)
				queryCityBProvinceId({
					provinceId: this.form.provinceId
				}).then((res) => {
					console.log("cityList:", res);
					if (res.code == 0) {
						// this.roleList = res.roleList
						this.cityList = res.cityList
						// this.form.cityId = this.cityList[0].cityId
					} else {
						console.log(res.msg)
					}
				})
			},
			changePro2(val) {
				console.log(val)
				queryCityBProvinceId({
					provinceId: this.form.provinceId
				}).then((res) => {
					console.log("cityList:", res);
					if (res.code == 0) {
						// this.roleList = res.roleList
						this.cityList = res.cityList
						// this.form.cityId = this.cityList[0].cityId
						this.form.cityId = this.cityList[0].cityId
						queryUrbanCityId({
							cityId: this.form.cityId
						}).then((res) => {
							console.log("角色信息:", res);
							if (res.code == 0) {
								// this.roleList = res.roleList
								this.urbanList = res.urbanList
								this.form.urbanId = this.urbanList[0].urbanId
							} else {
								console.log(res.msg)
							}
						})
					} else {
						console.log(res.msg)
					}
				})
			},
			enterSeach() {
				this.orgName = this.orgName.replace(/ /g,'')
				organizeQueryByName({
					orgName:this.orgName
				}).then((res) => {
					console.log("查询信息:", res);
					if (res.code == 0) {
						this.orgTreeList = res.orgList
						this.oneOrgId = this.orgTreeList[0].orgId
						this.MqueryInfoByOrgId()
						// this.orgList = res.orgList
						// this.oneOrgId = this.orgList[0].orgId
						// this.form.orgId = this.orgList[0].orgId
						// this.MqueryDetailByOrgId()
					} else {
						console.log(res.msg)
					}
				})
			},
			MorganizeQueryList() {
				organizeQueryList().then((res) => {
					console.log("res:", res);
					if (res.code == 0) {
						this.orgList = res.orgList
						this.MqueryDetailByOrgId()
					} else {
						console.log(res.msg)
					}
				})
			},
			MqueryDetailByOrgId() {
				queryDetailByOrgId({
					orgId: this.oneOrgId
				}).then((res) => {
					console.log("res:", res);
					if (res.code == 0) {
						this.imageUrl = res.orgDetail.logoUrl
						this.form = res.orgDetail
						this.changePro()
						this.changeCity()
					}
					else {
						console.log(res.msg)
					}
				})
			},
			MqueryInfoByOrgId() {
				queryInfoByOrgId({
					orgId: this.oneOrgId
				}).then((res) => {
					console.log("res=============:", res);
					if (res.code == 0) {
						this.newForm = res.orgInfo
					}
					else {
						console.log(res.msg)
					}
				})
			},
			cutSe(index, item) {
				this.seIndex = index
				console.log(item)
				this.oneOrgId = item.orgId
				this.MqueryDetailByOrgId()
				
			},
			addOrganization() {
				this.$router.push('addOrganization')
			},
			handleAvatarSuccess(res, file) {
				console.log(res)
				console.log(file)
				if (res.code == 0) {
					this.form.logoUrl = res.url
					this.imageUrl = URL.createObjectURL(file.raw);
				}
			},
			beforeAvatarUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 1;
				console.log(file.type)
				const isJPG = file.type === 'image/jpeg';
				const isPng = file.type === 'image/png';
				if (isLt2M && isJPG || isLt2M && isPng) {
					console.log('222222')
				}else{
					this.$message.error('上传头像只能是PNG或JPG格式，并且不能大于1M');
				}
				console.log(isJPG&&isLt2M || isPng&&isLt2M)
				return isLt2M && isJPG || isLt2M && isPng
			}
		},
		mounted() {}
	}
</script>

<style lang='less' scoped>
	::v-deep .custom-tree-node {
		height: 40px;
	}
	::v-deep .el-tree-node__content {
		height: 40px;
	}
	::v-deep .el-tree-node__expand-icon {
		font-size: 20px;
	}
	.nodeTreeText {
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #333333;
	}
	.editOM {
		margin-right: 36px;
		font-size: 20px;
		/* color: #EB4778; */
	}
	.editOM1 {
		margin-right: 20px;
		font-size: 22px;
		/* color: #EB4778; */
	}
	.custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    padding-right: 8px;
		
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		color: #333333;
	  }
	::v-deep .avatar-uploader .el-upload {
		border: 1px solid #e9e9e9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	::v-deep .avatar-uploader .el-upload:hover {
		border-color: #e9e9e9;
	}

	::v-deep .avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 96px;
		height: 96px;
		line-height: 96px;
		text-align: center;
	}

	::v-deep .avatar {
		width: 96px;
		height: 96px;
		display: block;
	}
	
	::v-deep .avatar-uploader .el-upload {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		border: 2px solid #e9e9e9;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		left: 0.941176rem;
		/* top: 1.882352rem; */
	}

	.logo20img {
		margin-left: 0.470588rem;
		width: 0.588235rem;
		height: 0.588235rem;
	}

	.yhtext {
		margin-left: 0.235294rem;
		font-size: 0.411764rem;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #333333;
	}

	.miniStar {
		margin-left: 6.441176rem;
		font-size: 0.411764rem;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: RIGHT;
		color: #f44e43;
	}

	.miniText {
		margin-left: 0.117647rem;
		font-size: 0.411764rem;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: RIGHT;
		color: #666666;
	}

	.miniInput {
		margin-left: 0.705882rem;
		width: 14.117647rem;
		height: 1.17647rem;
		background: #ffffff;
		/* border: 1px solid #e9e9e9; */
		border-radius: 0.117647rem;
	}

	.miniInput2 {
		width: 4.411764rem;
		height: 1.17647rem;
		background: #ffffff;
		/* border: 0.029411rem solid #e9e9e9; */
		border-radius: 0.117647rem;
	}

	.allPage {
		width: 100%;
		height: 100%;

		.neiBody {
			margin-top: 0.941176rem;
			width: 96%;
			/* height: 25rem; */
			height: 94%;

			/* background-color: red; */
			/* background-color: pink; */
			/* background-color: pink; */
			.neiLeft {
				/* width: 16.470588rem; */
				/* width: 16.470588rem; */
				width: 55%;
				height: 100%;
				background: #ffffff;
				/* background-color: pink; */
				border-radius: 0.235294rem;
				box-sizing: border-box;
				box-shadow: 0px 0px 0.588235rem 0px rgba(236, 72, 121, 0.05);
				/* padding: 0 0.941176rem; */
				.neiLTopBox {
					width: 100%;
					/* background-color: beige; */
					box-sizing: border-box;
					padding-left: 6%;
				}

				.searchInput {
					margin-top: 0.941176rem;
					/* width: 14.588235rem; */
					width: 60%;
					height: 1.17647rem;
					background: #ffffff;
					/* border: 1px solid #e9e9e9; */
					border-radius: 0.117647rem;

					.imgSerch {
						width: 15px;
						height: 15px;
						margin-top: 16px;
						transform: translateY(-50%);
						margin-right: 10px;
					}
				}

				.neiTitel {
					margin-top: 0.67647rem;
					/* width: 14.588235rem; */
					width: 88%;
					/* background-color: beige; */
					font-size: 0.470588rem;
					font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
					font-weight: 600;
					text-align: LEFT;
					color: #333333;
				}

				.neiTitel2 {
					margin-top: 0.67647rem;
					/* width: 14.588235rem; */
					width: 88%;
					/* background-color: navajowhite; */
				}
				
				.listBtop {
					box-sizing: border-box;
					margin-top: 27px;
					height: 40px;
					width: 88%;
					background: #fafafa;
					border-radius: 8px 8px 0px 0px;
					
					font-size: 14px;
					font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
					font-weight: 600;
					text-align: LEFT;
					color: #333333;
					
					padding-left: 16px;
					padding-right: 76px;
				}

				.listBody {
					margin-top: 0.588235rem;
					/* width: 14.588235rem; */
					width: 88%;
					height: 16.17647rem;
					/* background-color: beige; */
					overflow: scroll;
/* 					overflow-y: scroll;
					overflow-x: scroll; */

					.oneList {
						/* width: 14.588235rem; */
						width: 100%;
						height: 1.17647rem;
						background: #f3f3f3;
					}

					.oneList2 {
						/* width: 14.588235rem; */
						width: 100%;
						height: 1.17647rem;
						background: #ffffff;
					}

					.oneList2:hover {
						background: #f3f3f3;
					}
				}

				.listBody::-webkit-scrollbar {
					display: none
				}
			}

			.neiRight {
				/* margin-left: 0.941176rem; */
				/* width: 28.941176rem; */
				width: 43%;
				/* height: 25rem; */
				height: 100%;
				background: #ffffff;
				/* background-color: palegreen; */
				border-radius: 0.235294rem;
				box-shadow: 0px 0px 0.588235rem 0px rgba(236, 72, 121, 0.05);
				
				.NewNeiRimg {
					/* margin-top: 120px; */
					margin-top: 60px;
					width: 96px;
					height: 96px;
					border-radius: 50%;
				}
				
				.NewNeiRText {
					margin-top: 16px;
					font-size: 16px;
					font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
					font-weight: 600;
					text-align: CENTER;
					color: #333333;
				}
				
				.NewNeiRBox {
					/* margin-top: 72px; */
					margin-top: 50px;
					width: 504px;
					height: 491px;
					background: #fafafa;
					border-radius: 8px;
					margin-left: 20px;
					margin-right: 20px;
					.newOne {
						box-sizing: border-box;
						padding-left: 113px;
						font-size: 14px;
						font-family: Microsoft YaHei, Microsoft YaHei-Regular;
						font-weight: 400;
						color: #666666;
						.newOneRoleBox {
							width: 200px;
							.miniRoleBOX {
								width: 100px;
								font-size: 14px;
								font-family: Microsoft YaHei, Microsoft YaHei-Regular;
								font-weight: 400;
								text-align: LEFT;
								color: #333333;
								margin-bottom: 9px;
							}
						}
					}
				}
				
				
				
				
				

				.rightTitle {
					margin-top: 0.941176rem;
					width: 28.941176rem;
					font-size: 0.470588rem;
					font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
					font-weight: 600;
					text-align: center;
					color: #333333;
					/* background-color: pink; */
				}

				.right1 {
					margin-top: 5.029411rem;
					/* height: 96px; */
					/* background-color: pink; */
					width: 100%;

					.miniLogo {
						margin-left: 0.705882rem;
						width: 2.823529rem;
						height: 2.823529rem;
					}
				}

				.right2 {
					margin-top: 0.941176rem;
					/* background-color: pink; */
					width: 100%;
					/* background-color: beige; */
				}
			}
		}
	}

	.leftminiBox {
		width: 37%;
		/* background-color: beige; */
	}
</style>
