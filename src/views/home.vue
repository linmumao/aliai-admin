<template>
  <div class="home" @keydown="submitPassword">
    <!-- <img class="imageHome" src="https://aliai-coupn-1306521056.cos.ap-nanjing.myqcloud.com/back/login_bg2x.png" alt="" /> -->
    <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm">
      <div class="TloginK">
        <div class="homeSubmit">
          <div class="submitTitle">后台登录</div>
          <div class="submitNumber">
            <div style="font-weight: 600; font-size: 0.5rem">账号</div>
            <el-input style="
				  width: 10rem; 
				  height: 1.6rem;
				  margin-top: 0.5rem;
				  box-sizing: border-box;
				  font-size: 0.5rem;
				  color: #999999;
				  font-size: 0.5rem;
				" maxlength="35" v-model="ruleForm.username" placeholder="请输入账号"></el-input>
          </div>
          <div class="submitCode">
            <div style="font-weight: 600; font-size: 0.5rem">密码</div>
            <el-input style="
				  width: 10rem;
				  height: 1.6rem;
				  margin-top: 0.5rem;
				  box-sizing: border-box;
				  font-size: 0.5rem;
				  color: #999999;
				  font-size: 0.5rem;
				" maxlength="35" v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
          </div>
          <div class="submitCode flex_rsb_aic">
            <el-checkbox class="submitRem" v-model="checked">记住密码</el-checkbox>
            <div @click="wangjiMimaM" class="wangjiMima themeC">忘记密码？</div>
          </div>
          <div class="homeLogin themeJbs c_pointer" @click="toHomePage">登录</div>
        </div>
      </div>
    </el-form>
    <div @click="gotoYue" class="yuea c_pointer flex_r_jc">
      粤ICP备15008990号
    </div>
  </div>
</template>

<script>
import {
  getLogin,
  accountOpenTest
} from "../api/management";
import {
  localSave,
  localGet
} from "@/utils/local.js";

export default {
  name: "home",
  data () {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      logining: false,
      checked: false,
      rules: {
        username: [{
          required: true,
          message: "请输入您的帐户",
          trigger: "blur"
        },],
        password: [{
          required: true,
          message: "请输入您的密码",
          trigger: "blur"
        },],
      },
    };
  },
  created () { },
  mounted () {
    this.account(); //获取cookie的方法
  },
  methods: {
    gotoYue () {
      window.location.href = "https://beian.miit.gov.cn/";
    },
    wangjiMimaM () {
      this.$router.push('/accountSecurity/retrieve')
    },
    submitPassword (event) {
      console.log("event:", event);
      if (event.keyCode == 13) {
        if (this.ruleForm.username && this.ruleForm.password) {
          this.toHomePage();
        }
      }
    },
    account () {
      if (document.cookie.length >= 0) {
        console.log(this.getCookie("mobile"));
        this.ruleForm.username = this.getCookie("mobile");
        this.ruleForm.password = this.getCookie("password");
      }
    },
    setCookie (c_name, c_pwd, exdate) {
      //账号，密码 ，过期的天数
      var currentDate = new Date();
      console.log(c_name, c_pwd);
      currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000 * exdate); //保存的天数
      document.cookie =
        "mobile=" + c_name + ";path=/;expires=" + currentDate.toLocaleString();
      document.cookie =
        "password=" + c_pwd + ";path=/;expires=" + currentDate.toLocaleString();
    },
    getCookie (name) {
      var arr = document.cookie.split(";");
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("="); // ["_ga", "GA1.1.1756734561.1561034020"]
        if (arr2[0].trim() == name) {
          return arr2[1];
        }
      }
    },
    clearCookie () {
      this.setCookie("", "", -1); //清除cookie
    },
    toHomePage () {
      this.$refs.ruleForm.validate((value) => {
        if (value) {
          this.logining = true;
          var _this = this;
          if (_this.checked == true) {
            //存入cookie
            _this.setCookie(
              _this.ruleForm.username,
              _this.ruleForm.password,
              7
            ); //保存7天
          } else {
            _this.clearCookie();
          }
          getLogin({
            userName: this.ruleForm.username,
            password: this.$getRsaCode(this.ruleForm.password),
          }).then((res) => {           
            console.log('登录' , res);
            if (res.code == "0") {
              this.$message.success("登录成功");
              localSave(res.jsonToken.accessToken);
              localStorage.setItem("avatar", res.jsonToken.userImg);
              console.log(res)
              if (res.jsonToken.firstLogin == 0) {
                console.log('第一次登录')
                this.$router.push({
                  path: "/accountSecurity/changePassword?userId=" + res
                    .jsonToken.userId,
                });
              } else {
                this.$router.push({
                  path: "/addweb/xinzeng/WorkBench?userId=" + res.jsonToken.userId,
                });
              }
            }
            // console.log( ' token', localGet());
          });
        }
      });
    },
  },
};
</script>
<style lang='less' scoped>
@import "../assets/global.css";

.yuea {
  /* background-color: pink; */
  width: 200px;
  position: absolute;
  right: 50%;
  margin-right: -200/2px;
  bottom: 20px;
}

/* import */
* {
  box-sizing: border-box;
}

::v-deep .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
}

/* ::v-deep .el-checkbox__inner:hover {
		border-color: #dcdfe6 !important;
	}

	::v-deep .el-checkbox__inner {
		border-radius: 50%;
		width: 0.625rem;
		height: 0.625rem;
	}

	::v-deep .el-checkbox__inner::after {
		width: 0.15625rem !important;
		margin-left: 10%;
		height: 0.3125rem !important;
	}

	::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
	::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #eb4778;
		border-color: #eb4778;
	}

	::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
		color: #eb4778;
	} */

.passwordBox {
  width: 100%;
  background-color: pink;
}

.wangjiMima {
  cursor: pointer;
  margin-right: 35px;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: RIGHT;
  color: #eb4778;
}

.TloginK {
  width: 1120px;
  height: 720px;
  /* background-color: pink; */
  /* background: url(https://aliai-coupn-1306521056.cos.ap-nanjing.myqcloud.com/back/login_bg22x.png) no-repeat; */
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -720/2px;
  margin-left: -1120/2px;
}

.home {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  background: url(../assets/add_img/login_bg@2x.png) no-repeat center;
  background-color: #fffafb;
  background-size: 100% auto;

  .imageHome {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    bottom: 0;
    right: 0;
  }

  .homeSubmit {
    position: absolute;
    left: 600px;
    top: 80px;
    /* width: 13.75rem;
			height: 16.5rem; */
    width: 400px;
    height: 500px;
    left: 50%;
    top: 50%;
    margin-top: -500/2px;
    margin-left: -400/2px;
    border-radius: 0.25rem;
    background: #ffffff;
    box-shadow: 0px 4px 20px 0px rgba(162, 201, 255, 0.2);

    .submitTitle {
      /* padding-left: 1.25rem; */
      text-align: center;
      margin-top: 1.375rem;
      color: #303133;
      font-family: Microsoft YaHei;
      font-style: normal;
      font-weight: 600;
      font-size: 0.75rem;
    }

    .homeLogin {
      margin: 1.53125rem 0 0 1.25rem;
      width: 10rem;
      height: 1.6rem;
      line-height: 1.6rem;
      font-size: 0.5rem;
      text-align: center;
      color: white;
      /* background: linear-gradient(278deg, #ff986b 0%, #eb4778 100%); */
      border-radius: 0.125rem;
    }

    .submitNumber {
      margin: 1rem 0 0.9375rem 1.25rem;
    }

    .submitCode {
      margin: 0 0 0.4rem 1.25rem;
      font-weight: 600;
      font-size: 0.5rem;
    }

    .submitRem {
      /* margin: 0 0 0 1.25rem; */
      font-size: 0.5rem;
      border-radius: 50%;
    }
  }
}
</style>
