(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13978002"],{"0483":function(e,t,a){},"30f2":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"addMechanism themeBgc"},[a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{staticClass:"myColor",attrs:{to:{path:"/addweb/downstreamManagement/institutionsList"}}},[e._v("机构列表 ")]),a("el-breadcrumb-item",{directives:[{name:"show",rawName:"v-show",value:"-1"==e.editStatus,expression:"editStatus == '-1'"}]},[e._v("新增机构")]),a("el-breadcrumb-item",{directives:[{name:"show",rawName:"v-show",value:"-1"!==e.editStatus,expression:"editStatus !== '-1'"}]},[e._v("编辑机构")])],1)],1),a("div",{staticClass:"bigBox"},[e._m(0),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[a("el-form-item",{staticStyle:{"margin-top":"0.941176rem"},attrs:{required:"",label:"机构名称：",prop:"orgName"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"35"},model:{value:e.form.orgName,callback:function(t){e.$set(e.form,"orgName","string"===typeof t?t.trim():t)},expression:"form.orgName"}})],1),a("el-form-item",{attrs:{label:"简称：",prop:"orgShortName"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"35"},model:{value:e.form.orgShortName,callback:function(t){e.$set(e.form,"orgShortName","string"===typeof t?t.trim():t)},expression:"form.orgShortName"}})],1),a("el-form-item",{attrs:{label:"机构地址：",prop:"addr"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"10"},model:{value:e.form.addr,callback:function(t){e.$set(e.form,"addr","string"===typeof t?t.trim():t)},expression:"form.addr"}})],1),a("el-form-item",{attrs:{label:"详细地址：",prop:"detailAddr"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"12"},model:{value:e.form.detailAddr,callback:function(t){e.$set(e.form,"detailAddr","string"===typeof t?t.trim():t)},expression:"form.detailAddr"}})],1),a("el-form-item",{attrs:{label:"营业执照：",prop:"busLicense"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.homeUrl+"docking/open/file","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{attrs:{label:"关联上游：",required:"",prop:"superId"}},[a("el-select",{staticStyle:{width:"30.5%"},attrs:{disabled:e.isCloseSuper,"popper-append-to-body":!1,placeholder:"请选择"},model:{value:e.form.superId,callback:function(t){e.$set(e.form,"superId","string"===typeof t?t.trim():t)},expression:"form.superId"}},e._l(e.AllList,(function(e,t){return a("el-option",{key:e.upMangerId,attrs:{label:e.upName,value:e.upMangerId}})})),1)],1)],1)],1),a("div",{staticClass:"bigBox"},[e._m(1),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[a("el-form-item",{staticStyle:{"margin-top":"0.941176rem"},attrs:{label:"联系人姓名：",prop:"contactsName"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"35"},model:{value:e.form.contactsName,callback:function(t){e.$set(e.form,"contactsName","string"===typeof t?t.trim():t)},expression:"form.contactsName"}})],1),a("el-form-item",{attrs:{label:"联系人电话：",prop:"contactsPhone"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"11"},model:{value:e.form.contactsPhone,callback:function(t){e.$set(e.form,"contactsPhone","string"===typeof t?t.trim():t)},expression:"form.contactsPhone"}})],1),a("el-form-item",{attrs:{label:"联系人邮箱：",prop:"contactsEmain"}},[a("el-input",{staticClass:"miniInput",model:{value:e.form.contactsEmain,callback:function(t){e.$set(e.form,"contactsEmain","string"===typeof t?t.trim():t)},expression:"form.contactsEmain"}})],1)],1)],1),a("div",{staticClass:"bigBox"},[e._m(2),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",staticStyle:{"margin-top":"0.941176rem"},attrs:{model:e.form,rules:e.rules,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"纳税人类型：",required:"",prop:"taxpayerType"}},[a("el-radio-group",{model:{value:e.form.taxpayerType,callback:function(t){e.$set(e.form,"taxpayerType",t)},expression:"form.taxpayerType"}},[a("el-radio",{attrs:{label:0}},[e._v("一般纳税人")]),a("el-radio",{attrs:{label:1}},[e._v("小规模纳税人")])],1)],1),a("el-form-item",{attrs:{label:"开票税点：",required:"",prop:"taxPoint"}},[a("el-radio-group",{model:{value:e.form.taxPoint,callback:function(t){e.$set(e.form,"taxPoint",t)},expression:"form.taxPoint"}},[a("el-radio",{attrs:{label:0}},[e._v("1%")]),a("el-radio",{attrs:{label:1}},[e._v("3%")]),a("el-radio",{attrs:{label:2}},[e._v("6%")])],1)],1),a("el-form-item",{attrs:{label:"开户许可证：",prop:"licenceUrl"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.homeUrl+"docking/open/file","show-file-list":!1,"on-success":e.handleAvatarSuccessTwo,"before-upload":e.beforeAvatarUpload}},[e.imageUrlTwo?a("img",{staticClass:"avatar",attrs:{src:e.imageUrlTwo}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{staticStyle:{"margin-top":"-20px"},attrs:{label:"开户行：",prop:"bankName"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"35"},model:{value:e.form.bankName,callback:function(t){e.$set(e.form,"bankName","string"===typeof t?t.trim():t)},expression:"form.bankName"}})],1),a("el-form-item",{attrs:{label:"银行账号：",prop:"bankNo"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"35"},model:{value:e.form.bankNo,callback:function(t){e.$set(e.form,"bankNo","string"===typeof t?t.trim():t)},expression:"form.bankNo"}})],1),a("el-form-item",{attrs:{label:"法人身份证：",prop:"idcardUrl"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.homeUrl+"docking/open/file","show-file-list":!1,"on-success":e.handleAvatarSuccessThree,"before-upload":e.beforeAvatarUpload}},[e.imageUrlThree?a("img",{staticClass:"avatar",attrs:{src:e.imageUrlThree}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),a("el-form-item",{staticStyle:{"margin-top":"-20px"},attrs:{label:"法人姓名：",prop:"legalPerName"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"10"},model:{value:e.form.legalPerName,callback:function(t){e.$set(e.form,"legalPerName","string"===typeof t?t.trim():t)},expression:"form.legalPerName"}})],1),a("el-form-item",{attrs:{label:"身份证号：",prop:"legalPerIdcard"}},[a("el-input",{staticClass:"miniInput",attrs:{maxlength:"18"},model:{value:e.form.legalPerIdcard,callback:function(t){e.$set(e.form,"legalPerIdcard","string"===typeof t?t.trim():t)},expression:"form.legalPerIdcard"}})],1)],1)],1),a("div",{staticClass:"flex_d_center footerBox"},[a("el-button",{on:{click:e.goBack}},[e._v("返回")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:"-1"==e.editStatus,expression:"editStatus == '-1'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("提交")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:"-1"!==e.editStatus,expression:"editStatus !== '-1'"}],attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存")])],1)])},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"right2 flex_r_ic",staticStyle:{"margin-top":"0px"}},[a("div",{staticClass:"fontS_m fontW_b fontC_303133",staticStyle:{"margin-left":"24px","margin-top":"24px","font-weight":"800"}},[e._v("基本信息 ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"right2 flex_r_ic",staticStyle:{"margin-top":"0px"}},[a("div",{staticClass:"fontS_m fontW_b fontC_303133",staticStyle:{"margin-left":"24px","margin-top":"24px","font-weight":"800"}},[e._v("联系人信息 ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"right2 flex_r_ic",staticStyle:{"margin-top":"0px"}},[a("div",{staticClass:"fontS_m fontW_b fontC_303133",staticStyle:{"margin-left":"24px","margin-top":"24px","font-weight":"800"}},[e._v("结算信息 ")])])}],i=(a("d81d"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("e072")),o=a("4b90"),l={name:"addMechanism",data:function(){return{radioTaxpayer:3,radioInvoicing:2,statusList:[],editStatus:"-1",typeList:"",orgTreeList:[],homeUrl:"",form:{addr:"",bankName:"",bankNo:"",busLicense:"",contactsEmain:"",contactsName:"",contactsPhone:"",detailAddr:"",idcardUrl:"",legalPerIdcard:"",legalPerName:"",licenceUrl:"",orgName:"",orgShortName:"",superId:"",taxPoint:0,taxpayerType:0},value:"",imageUrl:"",imageUrlTwo:"",imageUrlThree:"",rules:{orgName:[{required:!0,message:"请选择机构名称",trigger:"change"}],superId:[{required:!0,message:"请选择关联上游",trigger:"change"}]},AllList:[],idItem:{},isCloseSuper:!1}},created:function(){var e=this;this.homeUrl=o["a"],this.editStatus=this.$route.query.upMangerId,"1"==this.$route.query.upMangerId?this.isCloseSuper=!0:this.isCloseSuper=!1,this.$route.query.item&&(this.idItem=JSON.parse(this.$route.query.item),this.form=this.idItem,this.imageUrl=this.form.busLicense,this.imageUrlTwo=this.form.licenceUrl,this.imageUrlThree=this.form.idcardUrl),Object(i["ob"])({currentPage:1,endTime:"",pageSize:999999,phone:"",startTime:"",status:""}).then((function(t){0==t.code?(console.log(t),e.AllList=[],t.data.list.map((function(t){0==t.status&&e.AllList.push(t)}))):e.$message.error(t.msg)}))},methods:{goBack:function(){this.$router.go(-1)},saveUser:function(){var e=this;Object(i["m"])(this.form).then((function(t){0==t.code?(e.$message.success("保存成功"),e.$router.go(-1)):e.$message.error(t.msg)}))},submitForm:function(e){var t=this;""==this.form.orgName?this.$message.error("请输入机构名称"):""==this.form.busLicense?this.$message.error("请上传营业执照"):""==this.form.superId?this.$message.error("请上传关联上游"):this.$refs[e].validate((function(e){if(!e)return!1;"-1"==t.editStatus?t.saveUser():Object(i["getAlowerorgUpdate"])(t.form).then((function(e){0==e.code?(t.$message.success("编辑成功"),t.$router.go(-1)):t.$message.error(e.msg)}))}))},handleAvatarSuccess:function(e,t){0==e.code&&(this.form.busLicense=e.url,this.imageUrl=URL.createObjectURL(t.raw))},handleAvatarSuccessTwo:function(e,t){0==e.code&&(this.form.licenceUrl=e.url,this.imageUrlTwo=URL.createObjectURL(t.raw))},handleAvatarSuccessThree:function(e,t){0==e.code&&(this.form.idcardUrl=e.url,this.imageUrlThree=URL.createObjectURL(t.raw))},beforeAvatarUpload:function(e){var t=e.size/1024/1024<1,a="image/jpeg"===e.type,r="image/png"===e.type;return t&&a||t&&r||this.$message.error("上传头像只能是PNG或JPG格式，并且不能大于1M"),t&&a||t&&r}},mounted:function(){}},n=l,m=(a("a158"),a("2877")),c=Object(m["a"])(n,r,s,!1,null,"247431d5",null);t["default"]=c.exports},a158:function(e,t,a){"use strict";a("0483")},b727:function(e,t,a){var r=a("0366"),s=a("44ad"),i=a("7b0b"),o=a("50c4"),l=a("65f0"),n=[].push,m=function(e){var t=1==e,a=2==e,m=3==e,c=4==e,u=6==e,d=7==e,p=5==e||u;return function(f,g,h,b){for(var v,x,y=i(f),w=s(y),C=r(g,h,3),S=o(w.length),_=0,U=b||l,N=t?U(f,S):a||d?U(f,0):void 0;S>_;_++)if((p||_ in w)&&(v=w[_],x=C(v,_,y),e))if(t)N[_]=x;else if(x)switch(e){case 3:return!0;case 5:return v;case 6:return _;case 2:n.call(N,v)}else switch(e){case 4:return!1;case 7:n.call(N,v)}return u?-1:m||c?c:N}};e.exports={forEach:m(0),map:m(1),filter:m(2),some:m(3),every:m(4),find:m(5),findIndex:m(6),filterReject:m(7)}},d81d:function(e,t,a){"use strict";var r=a("23e7"),s=a("b727").map,i=a("1dde"),o=i("map");r({target:"Array",proto:!0,forced:!o},{map:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);