<template>
  <div style="padding: 0 20px;  background-color:#f5f7fa ">
    <div style="padding-top: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="myColor" :to="{ path: '/' }"
          >活动列表
        </el-breadcrumb-item>
        <el-breadcrumb-item v-show="editStatus == '-1'"
          >新增</el-breadcrumb-item
        >
        <el-breadcrumb-item v-show="editStatus !== '-1'"
          >编辑</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>

    <!-- <div style="padding-top: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
    <div id="operationlog">
      <div id="mainoperationlog" style="width: 58%; ">
        <div style="font-size: 16px;font-weight: 600;color: black; ">
          操作日志
        </div>
        <div style="margin-top: 15px;">
          <el-table
            :header-cell-style="{ background: '#f5f7fa', color: '#000' }"
            border
            :data="dialogData"
            style="width: 100% ;height: 550px; overflow-y: auto;"
          >
            <el-table-column type="index" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="operationType" label="操作类型" width="120">
            </el-table-column>
            <el-table-column prop="operationName" label="操做内容" width="300">
            </el-table-column>
            <el-table-column prop="operatorName" label="操做人" width="120">
            </el-table-column>
            <el-table-column prop="operationTime" label="操做时间">
            </el-table-column>
          </el-table>
          <div class="footerBox flex_rjs_aend">
            <div class="sumBox">
              共 <span class="themeC">{{ totalone }}</span> 条
            </div>
            <el-pagination
              @size-change="handleSizeChangeone"
              @current-change="handleCurrentChangeone"
              background
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSizeone"
              :current-page="pageNoone"
              layout="sizes, prev, pager, next"
              :total="totalone"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div style="width: 41%; ">
        <div class="asidecss">
          <div class="asidefont">活动基本信息</div>
          <el-form :model="form">
            <el-form-item label="活动名称：" :label-width="formLabelWidth">
              <el-input
                v-model="form.activityName"
                autocomplete="off"
                style="width: 338px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动类型：" :label-width="formLabelWidth">
              <el-select
                v-model="form.activityType"
                placeholder="请选择"
                style="width: 340px;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属支行：" :label-width="formLabelWidth">
              <el-select
                v-model="form.belongBank"
                placeholder="请选择"
                style="width: 340px;"
              >
                <el-option
                  v-for="item in belongBank"
                  :key="item.value"
                  :label="item.bankBranchName"
                  :value="item.bankBranchName"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动日期：" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.activityDate"
                :clearable="false"
                type="date"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动地点：" :label-width="formLabelWidth">
              <el-input
                v-model="form.activityAddress"
                autocomplete="off"
                style="width: 338px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth">
              <textarea
                name="one"
                id="one"
                v-model="form.remark"
                placeholder="请输入不多50字的描述"
                maxlength="10"
              >
              </textarea>
            </el-form-item>
          </el-form>
        </div>
        <div class="asidecss">
          <div class="asidefont">活动内容</div>
          <el-form :model="form">
            <el-form-item label="活动类型名称：" :label-width="formLabelWidth">
              <el-select
                v-model="form.activityTypeName"
                placeholder="请选择"
                style="width: 340px;"
              >
                <el-option
                  v-for="item in activityTypeName"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前跟进人员：" :label-width="formLabelWidth">
              <el-input
                v-model="form.followPeople"
                autocomplete="off"
                style="width: 338px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="邀约人数：" :label-width="formLabelWidth">
              <el-input
                v-model="form.inviteNum"
                autocomplete="off"
                style="width: 338px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="初步预估费用：" :label-width="formLabelWidth">
              <el-input
                v-model="form.estimatedCost"
                autocomplete="off"
                style="width: 338px;"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="asidecss">
          <div style="display: flex; justify-content: space-between;">
            <div class="asidefont">结项资料</div>
            <el-button type="primary" plain v-show="this.editStatus != -1"
              >全部下载</el-button
            >
          </div>
          <el-form :model="form">
            <el-form-item label="活动视频地址：" :label-width="formLabelWidth">
              <!-- <el-input v-model="form.videoAddress" autocomplete="off" style="width: 338px;" ></el-input> -->
              <!-- <el-input v-model="ooooo" autocomplete="off" style="width: 338px;" ></el-input> -->
              <table>
                <tr v-for="(item, index) in shopingCarts">
                  <td><el-input v-model="item.price"></el-input></td>
                  <td>
                    <el-button type="primary" @click="remove(index)" plain
                      >删除</el-button
                    >
                  </td>
                </tr>
              </table>

              <el-button type="primary" @click="add" plain
                >点击添加更多视频地址</el-button
              >
              <el-button type="primary" @click="sha" plain>测试</el-button>
            </el-form-item>
            <div style="display: flex; justify-content: space-between;">
              <el-form-item label="其它文件：" :label-width="formLabelWidth">
                <el-upload
                  class="upload-demo"
                  drag
                  show-file-list
                  :on-success="handleAvatarSuccessOne"
                  :action="homeUrl + 'docking/open/tenUploadFile'"
                  multiple
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                  </div>
                  <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </el-form-item>
              <!-- <a
                href="http://192.168.1.74/api/marketing/activitylist/download/img?id=1622864707356594176&fileName=down"
                >下载</a
              > -->
              <el-button
                type="primary"
                plain
                v-show="this.editStatus != -1"
                @click="downloadfiles"
                >下载</el-button
              >
            </div>
            <div style="display: flex; justify-content: space-between;">
              <el-form-item label="活动图片：" :label-width="formLabelWidth">
                <!-- <el-upload
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
                                <div style="font-size: 8px; color: rgb(161, 161, 160); " >最多一张照片，建议尺寸100*100像素，大小2M以下，jpg,gif,png格式</div> -->
                <el-upload
                  :action="homeUrl + 'docking/open/file'"
                  list-type="picture-card"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="30%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </el-form-item>
              <el-button
                type="primary"
                plain
                v-show="this.editStatus != -1"
                @click="downloadpictures"
                >下载</el-button
              >
            </div>
            <div style="display: flex; justify-content: space-between;">
              <el-form-item label="简短总结：" :label-width="formLabelWidth">
                <textarea
                  name="one"
                  id="one"
                  v-model="form.sumUp"
                  placeholder="请输入不多50字的描述"
                  maxlength="10"
                >
                </textarea>
              </el-form-item>
              <el-button
                type="primary"
                plain
                v-show="this.editStatus != -1"
                @click="downloadtext"
                >下载</el-button
              >
            </div>
            <el-form-item label="活动实际费用：" :label-width="formLabelWidth">
              <el-input
                v-model="form.actualCost"
                autocomplete="off"
                style="width: 338px;"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div id="buttomcss">
          <el-button @click="goBack">返回</el-button>
          <el-button
            type="primary"
            v-show="editStatus == '-1'"
            @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button
            type="primary"
            v-show="editStatus !== '-1'"
            @click="submitForm('ruleForm')"
            >保存</el-button
          >
        </div>
        <!-- <div id="buttomcss">
                    <el-button>取消</el-button>
                    <el-button type="primary">保存</el-button>
                </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import homeUrl from "../../utils/url.js";
import {
  addneiactivitylist,
  updataactivitylist,
  journal,
  findbankbranch,
  downloadfiles,
  downloadpictures,
  downloadtext,
} from "../../api/xinzeng";

export default {
  data() {
    return {
      //上传图片测试
      arr: [], //将链接存进空数组中
      newarr: "", //将数组转换成用','隔开的字符串

      //上传文件测试
      fileone: "",

      //点击添加更多链接
      shopingCarts: [{ price: "" }],
      one: [],
      two: "",

      editStatus: "-1",
      imageUrl: "",
      form: {
        // 真实数据
        activityAddress: "",
        activityDate: "",
        activityImg: "",
        activityName: "",
        activityType: "",
        activityTypeName: "",
        actualCost: 0,
        belongBank: "",
        belongBankId: 0,
        estimatedCost: 0,
        followPeople: "",
        inviteNum: 0,
        otherFile: "",
        remark: "",
        sumUp: "",
        videoAddress: "",
      },

      //活动类型
      options: [
        {
          value: "徐坤",
          label: "徐坤",
        },
        {
          value: "蔡徐坤",
          label: "蔡徐坤",
        },
        {
          value: "精选活动",
          label: "精选活动",
        },
        {
          value: "备选活动",
          label: "备选活动",
        },
        {
          value: "备选服务",
          label: "备选服务",
        },
      ],
      //所属银行
      belongBank: [
        // {
        // value: '北部湾银行',
        // label: '北部湾银行'
        // }, {
        // value: '中国银行',
        // label: '中国银行'
        // },
        // {
        // value: '广发银行',
        // label: '广发银行'
        // },
      ],
      //活动类型名称
      activityTypeName: [
        {
          value: "徐坤",
          label: "徐坤",
        },
        {
          value: "蔡徐坤",
          label: "蔡徐坤",
        },
        {
          value: "读书分享会",
          label: "读书分享会",
        },
        {
          value: "回复",
          label: "回复",
        },
        {
          value: "误区二",
          label: "误区二",
        },
      ],

      //查询操作日志参数
      totalone: 0,
      pageNoone: 1,
      pageSizeone: 10,
      logForm: {
        beginTime: "",
        currentPage: 1,
        endTime: "",
        operationName: "",
        operationType: "",
        operatorName: "",
        pageSize: 10,
      },
      //响应日志数据
      dialogData: [],

      // tableData: [{
      //     index: 1,
      //     type:'新增',
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '活动名称'
      // }, {
      //     index: 2,
      //     type:'修改',
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '时代的和健康教育·'
      // }, {
      //     index: 3,
      //     type:'删除',
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: ' 该地区的那就违法'
      // }, {
      //     index: 4,
      //     type:'新增',
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      // }],

      // form: {
      //     "currentPage": 1,
      //     "failureTime": "",
      //     "pageSize": 10,
      //     "productListId": "",
      //     "productName": "",
      //     "productType": "",
      //     "createTime": "",
      //     "status": "",
      //     "sourceUpName": "",
      //     "upMangerId":""
      // },
      // options: [{
      //     value: '选项1',
      //     label: '黄金糕'
      //     }, {
      //     value: '选项2',
      //     label: '双皮奶'
      //     }, {
      //     value: '选项3',
      //     label: '蚵仔煎'
      //     }, {
      //     value: '选项4',
      //     label: '龙须面'
      //     }, {
      //     value: '选项5',
      //     label: '北京烤鸭'
      // }],
      formLabelWidth: "120px",
      value: "",
      // loading: false,

      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },

  created() {
    //查询支行信息及id
    this.findbankbranch();

    //操作日志数据申请
    this.journal(this.logForm);

    this.homeUrl = homeUrl;
    console.log("this.$route.query.upMangerId", this.$route.query.upMangerId);

    if (this.$route.query.upMangerId == -1) {
      this.editStatus = this.$route.query.upMangerId;
    } else {
      this.editStatus = this.$route.query.upMangerId.id; //id
      this.form.activityDate = this.$route.query.upMangerId.activityDate; //活动日期
      this.form.activityName = this.$route.query.upMangerId.activityName; //内部活动名称
      // this.form.activityStatus = this.$route.query.upMangerId.activityStatus; //活动状态
      this.form.activityType = this.$route.query.upMangerId.activityType; //热门类型
      this.form.actualCost = this.$route.query.upMangerId.actualCost; //	活动实际费用
      this.form.auditPerson = this.$route.query.upMangerId.auditPerson; //审核人
      this.form.auditTime = this.$route.query.upMangerId.auditTime; //审核时间
      this.form.belongBank = this.$route.query.upMangerId.belongBank; //所属银行
      this.form.belongBankId = this.$route.query.upMangerId.belongBankId; //所属银行
      this.form.createTime = this.$route.query.upMangerId.createTime; //创建时间
      this.form.followPeople = this.$route.query.upMangerId.followPeople; //跟进人员

      // console.log('this.form.hotRecommend' ,this.form.hotRecommend);
      // this.form.hotRecommend == 0 ? this.hotRecommend = false : this.hotRecommend = true;
    }
  },

  methods: {
    //查询支行及id
    findbankbranch() {
      findbankbranch().then((res) => {
        // console.log('查询支行及id' , res);
        this.belongBank = res.data;
        console.log("查询支行及id", this.belongBank);
      });
    },

    //退回上一级
    goBack() {
      this.$router.go(-1);
    },

    // 新增||编辑
    submitForm(formName) {
      this.form.otherFile = this.fileone; //文件地址
      this.form.activityImg = this.newarr; //图片地址
      for (var i = 0; i < this.shopingCarts.length; i++) {
        //处理视频地址
        this.one.push(this.shopingCarts[i].price);
        this.two = this.one.join(",");
        console.log("two", this.two);
      }
      this.form.videoAddress = this.two; //视频地址

      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //     console.log(valid)
      //     console.log(this.form)

      if (this.editStatus == "-1") {
        for (var i = 0; i < this.belongBank.length; i++) {
          //处理所属银行id
          if (this.form.belongBank == this.belongBank[i].bankBranchName) {
            this.form.belongBankId = this.belongBank[i].id;
          }
        }
        // 新增
        addneiactivitylist(this.form).then((res) => {
          console.log("保存:", res);
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.$router.go(-1);
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        // 编辑
        this.form.id = this.editStatus; //ID

        // this.form.otherFile = this.fileone;  //文件地址
        // this.form.activityImg = this.newarr;  //图片地址
        // for( var i = 0; i < this.shopingCarts.length; i++){   //处理视频地址
        //     this.one.push(this.shopingCarts[i].price);
        //     this.two = this.one.join(',')
        //     console.log('two' ,this.two );
        // }
        // this.form.videoAddress = this.two;  //视频地址

        updataactivitylist(this.form).then((res) => {
          console.log("编辑:", res);
          if (res.code == 0) {
            this.$message.success("编辑成功");
            this.$router.go(-1);
          } else {
            this.$message.error(res.msg);
          }
        });
      }
      //     } else {
      //     console.log('error submit!!');
      //     return false;
      //     }
      // });
    },

    //查询操作日志
    journal() {
      this.logForm.pageSize = this.pageSizeone;
      this.logForm.currentPage = this.pageNoone;
      journal(this.logForm).then((res) => {
        console.log("查询日志:", res);
        if (res.code == 0) {
          this.dialogData = res.logList.logList;
          this.totalone = res.logList.totalCount;
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    // 日志数据分页
    handleSizeChangeone(val) {
      this.pageSizeone = val;
      console.log(`每页 ${val} 条`);
      this.journal(this.logForm);
    },
    handleCurrentChangeone(val) {
      this.pageNoone = val;
      console.log(`当前页: ${this.pageNo}`);
      this.journal(this.logForm);
    },

    //上传文件成功时候触发的钩子
    handleAvatarSuccessOne(res, file) {
      console.log(res);
      if (res.code == 0) {
        this.fileone = res.url;
        console.log("上传文件时产生的地址", this.fileone);
      }
    },

    //上传图片成功时触发的钩子
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
      if (res.code == 0) {
        this.form.activityImg = res.url;
        this.arr.push(res.url);
        console.log("arr", this.arr);
        this.newarr = this.arr.join(",");
        console.log("上传多张图片地址转换成字符串", this.newarr);
        // this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
    //上传图片前做判断 （本函数判断上传文件只能是PNG或JPG格式或gif格式,并且不能大于2M）
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(file.type);
      const isJPG = file.type === "image/jpeg";
      const isPng = file.type === "image/png";
      const isGif = file.type === "image/gif";
      if ((isLt2M && isJPG) || (isLt2M && isPng) || (isLt2M && isGif)) {
        console.log("222222");
      } else {
        this.$message.error(
          "上传头像只能是PNG或JPG格式或gif格式,并且不能大于2M"
        );
      }
      console.log((isJPG && isLt2M) || (isPng && isLt2M));
      return (isLt2M && isJPG) || (isLt2M && isPng);
    },
    //删除图片时触发的钩子函数
    handleRemove(file, fileList) {
      console.log("file", file, "fileList", fileList);
    },
    //点击已上传图片时触发的函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //处理上传多条视频地址
    //添加
    add() {
      this.one = [];
      this.shopingCarts.push({ price: "" });
    },
    //移除
    remove(index) {
      this.shopingCarts.splice(index, 1);
    },
    //将视频地址整合成字符串
    sha() {
      for (var i = 0; i < this.shopingCarts.length; i++) {
        this.one.push(this.shopingCarts[i].price);
        this.two = this.one.join(",");
        console.log("two", this.two);
      }
    },

    // 批量下载文件
    downloadfiles() {
      downloadfiles(this.editStatus).then((res) => {});
    },
    // 批量下载图片
    downloadpictures() {
      downloadpictures({
        id: this.editStatus,
      }).then((res) => {
        // console.log("批量下载图片", res);
        const blob = new Blob([res.data], {
          type: "application/x-zip-compressed",
        });
        let filename;
        const disposition = res.headers["content-disposition"];
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
        const url = URL.createObjectURL(blob);
        this.download(url, filename);
      });
    },
    // 批量下载文本
    downloadtext() {
      downloadtext(this.editStatus).then((res) => {
        const blob = new Blob([res.data], {
          type: "text/plain",
        });
        const blobUrl = window.URL.createObjectURL(blob);
        // const list = blobUrl.split("/");
        let filename;
        const disposition = res.headers["content-disposition"];
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
        this.download(blobUrl, filename || "总结.txt");
      });
    },
    download(href, name) {
      let eleLink = document.createElement("a");
      eleLink.download = name;
      eleLink.href = href;
      eleLink.click();
      eleLink.remove();
    },
  },
};
</script>

<style>
#operationlog {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  /* height: 1000px; */
  /* background-color: aqua; */
}

#mainoperationlog {
  padding: 15px 0 0 15px;
  background-color: white;
}

.asidecss {
  background-color: white;
  /* height: 350px; */
  margin-top: 3px;
  padding: 15px 15px 15px 15px;
}

.asidefont {
  font-size: 14px;
  font-weight: 600;
  color: black;
}

textarea {
  border: 1px solid #d9d9d9;
  width: 300px;
  height: 100px;
  max-width: 300px;
  max-height: 100px;
  resize: none;
}

#buttomcss {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  margin-top: 3px;
  /* position: absolute;
    right: 0;
    bottom: 0; */
  /* bottom: 0; */
  /* left: 50%; */
}
</style>
