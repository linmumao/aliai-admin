<template>
	<div class="themeBgc allPage flex_d_center">
		<div class="bigBox">
			<div class="neiTitle">个人信息</div>
			<div class="neiImgBox">
				<el-upload class="avatar-uploader" :action="homeUrl+'docking/open/file'"
					:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<div v-if="imageUrl" class="bigAvatar">
						<div class="avatar">
							<img class="avatarImg" :src="imageUrl">
						</div>
					</div>
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>
			<div class="neiBox2 flex_r_ic">
				<div class="leftText">名称</div>
				<div class="rightText">{{infoList.nickName}}</div>
				<div @click="editName" class="miniIcon c_pointer">
					<i class="el-icon-edit"></i>
				</div>
			</div>
			<div class="neiBox2 flex_r_ic">
				<div class="leftText">账号</div>
				<div class="rightText">{{infoList.userName}}</div>
			</div>
			<div class="neiBox2 flex_r_ic">
				<div class="leftText">密码</div>
				<div @click="xiugaiPass" class="rightText c_pointer themeC">修改密码</div>
			</div>
			<div class="neiBox2 flex_r_ic">
				<div class="leftText">机构</div>
				<div class="rightText">{{infoList.orgName}}</div>
			</div>
			<div class="neiBox2 flex_r_ic">
				<div class="leftText">角色</div>
				<div class="rightText">{{infoList.roleNames}}</div>
			</div>
			<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="编辑昵称" :visible.sync="dialogOne" top="30vh" width="30%">
				<el-input maxlength='35' v-model.trim="WnickName"></el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogOne = false">取 消</el-button>
					<el-button @click="sbmit" type="primary">保 存</el-button>
				</span>
			</el-dialog>
			<el-dialog custom-class="dialogClass" :close-on-click-modal="false" title="编辑密码" :visible.sync="modification" top="25vh" width="30%">
				<el-input maxlength='20' show-password placeholder="请输入原登录密码" v-model="oldPwd"></el-input>
				<el-input style="margin-top: 32px;" show-password placeholder="请输入新的登录密码" v-model="newPwd" maxlength='20'></el-input>
				<el-input style="margin-top: 32px;margin-bottom: 32px;" show-password placeholder="请再次输入新的登录密码" v-model="againNewPwd" maxlength='20'></el-input>
				<span class="mimatishi">* 请输入8~20位数字、字母和特殊字符的两种或多种组合（区分大小写）</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="modification = false">取 消</el-button>
					<el-button @click="yesmodification" type="primary">保 存</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import {
		queryPersonalInfo,
		userUpdateNickName,
		userUpdateImgUrl,
		accountUserEditPwd
	} from "../../api/management";
	import homeUrl from "../../utils/url.js";
	export default {
		data() {
			return {
				oldPwd:'',
				newPwd:'',
				againNewPwd:'',
				WnickName:'',
				homeUrl:'',
				infoList: '',
				dialogOne: false,
				modification: false,
				imageUrl: ''
			}
		},
		created() {
			this.MqueryPersonalInfo()
			console.log('homeUrl')
			console.log(homeUrl)
			this.homeUrl = homeUrl
			console.log('homeUrl2')
			console.log(this.homeUrl)
		},
		methods: {
			yesmodification() {
				if(this.oldPwd == '') {
					this.$message.error('旧密码不能为空')
				}else if(this.newPwd == '') {
					this.$message.error('新密码不能为空')
				}else if(this.againNewPwd == '') {
					this.$message.error('确认密码不能为空')
				}else {
					accountUserEditPwd({
							"oldPwd": this.$getRsaCode(this.oldPwd),
							"newPwd": this.$getRsaCode(this.newPwd),
							"againNewPwd" : this.$getRsaCode(this.againNewPwd),
						}).then((res) => {
							console.log("res:", res);
							if (res.code == 0) {
								this.modification = false
								this.$message.success('修改密码成功')
								this.$router.push('/')
							} else {
								this.$message.error(res.msg);
							}
						})
				}
			},
			xiugaiPass() {
				this.oldPwd = ''
				this.newPwd = ''
				this.againNewPwd = ''
				this.modification = true
			},
			editName() {
				this.dialogOne = true
				this.WnickName = this.infoList.nickName
			},
			sbmit() {
				this.WnickName = this.WnickName.replace(/ /g,'')
				console.log(this.infoList)

				if(this.stripscript(this.WnickName)) {
					this.$message.error('名称只能输入中文，字母或数字');
				}else{
					userUpdateNickName({
						// "nickName": this.infoList.nickName,
						"nickName": this.WnickName,
						"userId": this.infoList.userId
					}).then((res) => {
						console.log("res:", res);
						if (res.code == 0) {
							this.dialogOne = false
							this.MqueryPersonalInfo()
							this.$message.success('修改名称成功')
						} else {
							this.$message.error(res.msg);
						}
					})
				}
			},
			// 过滤所有特殊字符
			stripscript(s) {
			    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]");
			        
			    return pattern.test(s);
			},
			MqueryPersonalInfo() {
				queryPersonalInfo().then((res) => {
					console.log("查询:", res);
					if (res.code == 0) {
						// this.$message.success('保存成功')
						this.infoList = res.person
						this.imageUrl = res.person.userImg
						this.WnickName = this.infoList.nickName
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			handleAvatarSuccess(res, file) {
				console.log(res)
				console.log(file)
				if (res.code == 0) {
					console.log(res)
					this.infoList.userImg = res.url
					this.imageUrl = URL.createObjectURL(file.raw);
					console.log(this.infoList.userImg)
					userUpdateImgUrl({
						imgUrl:this.infoList.userImg
					}).then((res) => {
					console.log("上传:", res);
					if (res.code == 0) {
						this.$message.success('修改头像成功')
						this.$emit('touxiangImg',res.imgUrl)
					} else {
						this.$message.error(res.msg);
					}
				})
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
		}
	}
</script>

<style lang='less' scoped>
	::v-deep .avatar-uploader {
		height: 96px;
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
	}

	::v-deep .avatar-uploader .el-upload:hover {
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
		display: block;
		/* position: relative; */
		width: 96px;
		height: 96px;
	}
	
	.mimatishi {
		font-size: 12px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: LEFT;
		color: #f44e43;
	}

	.bigAvatar {
		position: relative;
		width: 96px;
		height: 96px;
		/* background: #000000; */
	}

	.avatarImg {
		width: 96px;
		height: 96px;
	}

	/* ::v-deep .avatar:hover {
		position: relative;
		width: 96px;
		height: 96px;
		
		opacity: 0.6;
		filter: alpha(opacity=60);
		display: block;
	} */

	.bigAvatar:hover:after {
		/* display: block; */
		position: absolute;
		width: 96px;
		opacity: 0.6;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 96px;
		border: 50%;
		line-height: 96px;
		background: #000000;
		/* background-color: rgb(0,0,0,.1); */
		content: "更换头像";
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		color: #ffffff;
		/* background-color: red; */
		/* z-index: 100; */
	}





	.allPage {
		width: 100%;
		height: 100%;
		/* background-image:url('../../assets/image/jigou.png');
		background-size: cover; */
		/* background-color: #fffafb; */

		.bigBox {
			width: 96%;
			height: 94%;
			background: #ffffff;
			border-radius: 8px;

			.neiTitle {
				margin-top: 32px;
				margin-left: 32px;
				font-size: 16px;
				font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
				font-weight: 600;
				text-align: LEFT;
				color: #333333;
			}

			.neiImgBox {
				margin-top: 64px;
				height: 96px;
				/* width: 96px;
		  height: 96px;
		  background: #000;
		  border-radius: 50%;
		  border: 2px solid #ffffff; */
				/* .changeImg {
			  position: absolute;
			  top: 50%;
			  left: 20px;
			  transform: translateY(-50%);
			  font-size: 14px;
			  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
			  font-weight: 400;
			  text-align: LEFT;
			  color: #ffffff;
			  z-index: 999;
		  }
		  .neiImg {
		  		  width: 96px;
		  		  height: 96px;
		  		  background: #000;
		  		  border-radius: 50%;
		  		  opacity: 0.6;
		  		  filter: alpha(opacity=60);
		  } */
			}

			.neiBox2 {
				margin-top: 32px;

				.leftText {
					margin-left: 32px;
					font-size: 14px;
					font-family: Microsoft YaHei, Microsoft YaHei-Regular;
					font-weight: 400;
					text-align: LEFT;
					color: #999999;
				}

				.rightText {
					margin-left: 24px;
					font-size: 14px;
					font-family: Microsoft YaHei, Microsoft YaHei-Regular;
					font-weight: 400;
					text-align: LEFT;
					color: #333333;
				}

				.miniIcon {
					margin-left: 5px;
					font-size: 16px;
					color: #999999;
				}
			}
		}
	}
</style>
