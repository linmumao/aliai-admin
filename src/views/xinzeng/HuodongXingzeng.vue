<template>
    <div style="padding: 0 15px;  background-color:#f5f7fa " >

        <div style="padding-top: 15px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="myColor" :to="{ path: '/' }">活动类型
                </el-breadcrumb-item>
                <el-breadcrumb-item v-show="editStatus == '-1'">新增</el-breadcrumb-item>
                <el-breadcrumb-item v-show="editStatus !== '-1'">编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- <div style="padding-top: 15px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">上游管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div id="main" ref="form"> 
            <h5>基本信息</h5>
                <div class="onecss">
                    <span class="fontsize margin_right">活动类型：</span>
                    <el-select v-model="form.activityType" placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="display: flex; align-items: center; margin-top: 15px;">
                    <span class="fontsize " style="margin-left: 20px;">活动类型名称：</span>
                    <el-input v-model="form.activityTypeName" placeholder="请输入" size="mini" style="width: 200px;" >
                    </el-input>
                </div>
                <div class="onecss">
                    <span class="fontsize margin_right">类型图片：</span>
                    <div>
                        <el-upload
                            class="avatar-uploader"
                            :action="homeUrl+'docking/open/file'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;width: 90px;height: 90px; ">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div style="font-size: 14px; color:rgb(161, 161, 160); ;">上传图片</div>
                            </div>
                        </el-upload>
                        <div style="font-size: 8px; color: rgb(161, 161, 160); " >最多一张照片，建议尺寸100*100像素，大小2M以下，jpg,gif,png格式</div>
                    </div>
                </div>
                <div class="onecss">
                    <span class="fontsize margin_right">热门推荐：</span>
                    <div>
                        <el-checkbox v-model="hotRecommend " @click="checkedSelected" ></el-checkbox>
                    </div>
                </div>
                <div class="onecss">
                    <span class="fontsize margin_right">活动内容：</span>
                    <div>
                        <textarea name="one" id="one" v-model="form.activityContent" placeholder="请输入不多50字的描述"    maxlength="10">

                        </textarea>
                    </div>
                </div>
                <div style=" display: flex;  position: fixed; bottom: 50px; left: 50%;  " >
                    <el-button @click="goBack">返回</el-button>
                    <el-button type="primary" v-show="editStatus == '-1'" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button type="primary" v-show="editStatus !== '-1'" @click="submitForm('ruleForm')">保存</el-button>
                </div>
        </div>
    </div>
</template>
<script>
import homeUrl from "../../utils/url.js";
import {addactivitytype ,editoractivitytype } from '../../api/xinzeng'

    export default{
        data(){
            return{
                editStatus: '-1',
                imageUrl: '',
                form: {
                    // 真实数据
                    "activityContent": "",
                    "activityType": "",
                    "activityTypeName": "",
                    "hotRecommend": 0,
                    "typeImg": ""
                },
                hotRecommend:'flase',
                options:  [
                        {
                        value: '精选活动',
                        label: '精选活动'
                        }, {
                        value: '备选活动',
                        label: '备选活动'
                        },
                        {
                        value: '备选服务',
                        label: '备选服务'
                        },
                    ],


                input:'',
                value:'',
                checked:true,
            }
        },

        created () {
            this.homeUrl = homeUrl
            console.log('this.$route.query.upMangerId',this.$route.query.upMangerId );

            if(this.$route.query.upMangerId == -1){
                this.editStatus = this.$route.query.upMangerId;
            }else{
                this.editStatus = this.$route.query.upMangerId.id;
                // this.form.activityContent = this.$route.query.upMangerId.activityContent;
                this.form.activityType = this.$route.query.upMangerId.activityType; //活动类型
                this.form.activityTypeName = this.$route.query.upMangerId.activityTypeName; //活动名称
                this.form.hotRecommend = this.$route.query.upMangerId.hotRecommend; //热门推荐

                console.log('this.form.hotRecommend' ,this.form.hotRecommend);
                this.form.hotRecommend == 0 ? this.hotRecommend = false : this.hotRecommend = true;
                
                // if(this.form.hotRecommend = 0){
                //     this.form.hotRecommend = 0
                // }else{
                //     this.hotRecommend = true
                // }
            }


            // this.Id = this.$route.query.upMangerId  新加/
            // shoppingAuptypeInfoSelectAll().then((res) => {
            // console.log("查询类型下拉:", res);
            // if (res.code == 0) {
            //     this.typeList = res.list
            // } else {
            //     this.$message.error(res.msg);
            // }
            // })

            // if (this.editStatus !== '-1') {
            // shoppingAupmangerUpdate({
            //     id: this.editStatus
            // }).then((res) => {
            //     console.log("数据回显:", res);
            //     if (res.code == 0) {
            //     // this.typeList = res.list
            //     this.form = res.data
            //     this.imageUrl = this.form.logo
            //     } else {
            //     this.$message.error(res.msg);
            //     }
            // })
            // }
        },

        methods: {
            checkedSelected() {
                if(this.hotRecommend === 'false'){
                    this.form.hotRecommend = 0,
                    console.log('this.form.hotRecommend=0' ,this.form.hotRecommend);
                }else{
                    this.form.hotRecommend = 1,
                    console.log('this.form.hotRecommend=1' ,this.form.hotRecommend);
                }
            },

            //退回上一级
            goBack () {
                this.$router.go(-1);
            },

            // 新增||编辑
            submitForm (formName) {

                if(this.hotRecommend == false){
                    this.form.hotRecommend = 0,
                    console.log('this.form.hotRecommend=0' ,this.form.hotRecommend);
                }else{
                    this.form.hotRecommend = 1,
                    console.log('this.form.hotRecommend=1' ,this.form.hotRecommend);
                }

                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //     console.log(valid)
                //     console.log(this.form)

                    if (this.editStatus == '-1') {
                        // 新增
                        addactivitytype(this.form).then((res) => {
                        console.log("保存:", res);
                        if (res.code == 0) {
                            this.$message.success('保存成功')
                            this.$router.go(-1)
                        } else {
                            this.$message.error(res.msg);
                        }
                        })
                    } else {
                        // 编辑
                        this.form.id = this.editStatus;
                        editoractivitytype(this.form).then((res) => {
                        console.log("编辑:", res);
                        if (res.code == 0) {
                            this.$message.success('编辑成功')
                            this.$router.go(-1)
                        } else {
                            this.$message.error(res.msg);
                        }
                        })
                    }
                //     } else {
                //     console.log('error submit!!');
                //     return false;
                //     }
                // });
            },

            //上传图片
            handleAvatarSuccess (res, file) {
                console.log(res)
                console.log(file)
                if (res.code == 0) {
                    this.form.typeImg = res.url
                    this.imageUrl = URL.createObjectURL(file.raw);
            }
            },
            beforeAvatarUpload (file) {
                const isLt2M = file.size / 1024 / 1024 < 1;
                console.log(file.type)
                const isJPG = file.type === 'image/jpeg';
                const isPng = file.type === 'image/png';
                if (isLt2M && isJPG || isLt2M && isPng) {
                    console.log('222222')
                } else {
                    this.$message.error('上传头像只能是PNG或JPG格式，并且不能大于1M');
                }
                console.log(isJPG && isLt2M || isPng && isLt2M)
                return isLt2M && isJPG || isLt2M && isPng
            },

            // //上传图片
            // handleAvatarSuccess(res, file) {
            //     this.imageUrl = URL.createObjectURL(file.raw);
            // },
            // beforeAvatarUpload(file) {
            //     const isJPG = file.type === 'image/jpeg';
            //     const isLt2M = file.size / 1024 / 1024 < 2;

            //     if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!');
            //     }
            //     if (!isLt2M) {
            //     this.$message.error('上传头像图片大小不能超过 2MB!');
            //     }
            //     return isJPG && isLt2M;
            // }



        }

    }


</script>
<style>
 #main{
    height: 800px;
    background-color:white;
    margin-top: 20px;
    padding: 20px 15px;
 }

 .onecss{
    display: flex;
    align-items: center;
    margin:15px 0 0 20px;
 }

 .fontsize{
    /* background-color: #409EFF;
    text-align: end; */
    /* width: 100px; */
    font-size: 14px;
 }

 /* 上传图片样式 */
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    /* width: 100px; */
    /* height: 80px; */
    /* line-height: 80px; */
    /* text-align: center; */
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* 上传图片样式 */

  textarea::-webkit-input-placeholder {
       /* placeholder颜色  */
       color: #aab2bd;
       /* placeholder字体大小  */
       font-size: 12px;
    }

    textarea{
        border: 1px solid #d9d9d9;
        width: 300px;
        height: 100px;
        max-width: 300px;
        max-height: 100px; 
        resize: none;
    }

    .margin_right{
        margin-right: 29px;
    }

</style>