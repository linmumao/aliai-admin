<template>
    <div style="padding: 0 20px;  background-color:#f5f7fa ">

        <div style="padding-top: 15px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="myColor" :to="{ path: '/' }">工作台
                </el-breadcrumb-item>
                <el-breadcrumb-item >审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- <div style="padding-top: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div id="examinepage">
            <div id="examinepageone" >
                <div style="margin-bottom: 20px; font-size: 16px; font-weight: 600; color: black; ">操作日志</div>
                <el-table
                    :header-cell-style="{ background:'#f5f7fa', color: '#000' }"
                    :data="dialogData"
                    style="width: 100% ;height: 550px; overflow-y: auto;">
                        <el-table-column
                            type="index"
                            label="序号"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="operationType"
                            label="操作类型"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="operationName"
                            label="操作内容"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="operatorName"
                            label="操作人"
                            width="190">
                        </el-table-column>
                        <el-table-column
                            prop="operationTime"
                            label="操作时间"
                            width="250">
                        </el-table-column>
                </el-table>
                <div class="footerBox flex_rjs_aend">
                    <div class="sumBox">
                        共 <span class="themeC">{{ totalone }}</span> 条
                    </div>
                    <el-pagination @size-change="handleSizeChangeone" @current-change="handleCurrentChangeone" background
                        :page-sizes="[10, 20, 50, 100]" :page-size="pageSizeone" :current-page="pageNoone"
                        layout="sizes, prev, pager, next" :total="totalone">
                    </el-pagination>
                </div>
            </div>
            <div id="examinepagetwo">
                <div class="examinepageasidecss">
                    <div class="asidefont">活动基本信息</div>
                    <el-form :model="form" >
                        <el-form-item label="活动名称：" :label-width="formLabelWidth">
                            <el-input v-model="list.activityName" autocomplete="off" style="width: 338px;" :disabled="true" ></el-input>
                        </el-form-item>
                        <el-form-item label="活动类型：" :label-width="formLabelWidth">
                            <el-input v-model="list.activityType" autocomplete="off" style="width: 338px;" :disabled="true" ></el-input>
                            <!-- <el-select v-model="form.activityType" placeholder="请选择" style="width: 340px;">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                        </el-form-item>
                        <el-form-item label="所属支行：" :label-width="formLabelWidth">
                            <el-input v-model="list.belongBank" autocomplete="off" style="width: 338px;" :disabled="true" ></el-input>
                            <!-- <el-select v-model="form.belongBank" placeholder="请选择" style="width: 340px;">
                                <el-option
                                v-for="item in belongBank"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select> -->
                        </el-form-item>
                        <el-form-item label="活动日期：" :label-width="formLabelWidth">
                            <el-input v-model="list.activityDate" autocomplete="off" style="width: 338px;" :disabled="true" ></el-input>
                            <!-- <el-date-picker
                            v-model="form.activityDate"
                            type="date"
                           >
                            </el-date-picker> -->
                        </el-form-item>
                        <el-form-item label="活动地点：" :label-width="formLabelWidth">
                            <el-input v-model="list.activityAddress" autocomplete="off" style="width: 338px;" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：" :label-width="formLabelWidth">
                            <textarea name="one" id="one"  v-model="list.remark" placeholder="请输入不多50字的描述"    maxlength="10" :disabled="true">
                            </textarea>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="examinepageasidecss">
                    <div class="asidefont">活动内容</div>
                    <el-form :model="form" >
                        <el-form-item label="活动类型名称：" :label-width="formLabelWidth">
                            <el-select v-model="form.activityTypeName" placeholder="请选择" style="width: 340px;">
                                <el-option
                                v-for="item in activityTypeName"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="当前跟进人员：" :label-width="formLabelWidth">
                            <el-input v-model="form.followPeople" autocomplete="off" style="width: 338px;"></el-input>
                        </el-form-item>
                        <el-form-item label="邀约人数：" :label-width="formLabelWidth">
                            <el-input v-model="form.inviteNum" autocomplete="off" style="width: 338px;"></el-input>
                        </el-form-item>
                        <el-form-item label="初步预估费用：" :label-width="formLabelWidth">
                            <el-input v-model="form.estimatedCost" autocomplete="off" style="width: 338px;"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                
                <div id="buttomcss">
                    <el-button @click="goBack">取消</el-button>
                    <el-button @click="reject" type="primary">拒绝</el-button>
                    <el-button @click="submit" type="primary" >保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { shenheinformation , shenheactivity , journal } from '../../api/xinzeng'

    export default{
        data () {
            return{
                formLabelWidth: '120px',
                //请求参数
                // forms :{ 'id':1,},

                //请求到的不可改数据
                list:[
                    {activityName: ""},
                    {activityType: ""},
                    {belongBank: ""},   
                    {activityDate: ""},
                    {activityAddress: ""},
                    {remark: ""},
                ],

                //请求参数
                form: {
                    activityStatus: 1,
                    id:1,
                    activityTypeName: 1,
                    followPeople: "",
                    inviteNum: 10,
                    estimatedCost: "",
                },

                //活动类型
                options:  [
                        {
                        value: '徐坤',
                        label: '徐坤'
                        },
                        {
                        value: '蔡徐坤',
                        label: '蔡徐坤'
                        },
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
                //所属银行
                belongBank:[
                        {
                        value: '北部湾银行',
                        label: '北部湾银行'
                        }, {
                        value: '中国银行',
                        label: '中国银行'
                        },
                        {
                        value: '广发银行',
                        label: '广发银行'
                        },
                ],
                //活动类型名称
                activityTypeName:[
                        {
                        value: '徐坤',
                        label: '徐坤'
                        },
                        {
                        value: '蔡徐坤',
                        label: '蔡徐坤'
                        },
                        {
                        value: '读书分享会',
                        label: '读书分享会'
                        }, {
                        value: '回复',
                        label: '回复'
                        },
                        {
                        value: '误区二',
                        label: '误区二'
                        },
                ],

                //查询操作日志
                totalone: 0,
                pageNoone: 1,
                pageSizeone: 10,
                logForm: {
                    "beginTime": "",
                    "currentPage": 1,
                    "endTime": "",
                    "operationName": "",
                    "operationType": "",
                    "operatorName": "",
                    "pageSize": 10
                },
                //响应日志数据
                dialogData:[],






                //模拟数据
                // tableData: [{
                //     activityName:'新增',
                //     createTime: '2016-05-02',
                //     activityDate: '宝安支行',
                //     belongBank: '活动名称'
                // }, {
                //     activityName:'修改',
                //     createTime: '2016-05-04',
                //     activityDate: '南山支行',
                //     belongBank: '时代的和健康教育·'
                // }, {
                //     activityName:'删除',
                //     createTime: '2016-05-01',
                //     activityDate: '龙岗支行',
                //     belongBank: ' 该地区的那就违法'
                // }, {

                //     activityName:'新增',
                //     createTime: '2016-05-03',
                //     activityDate: '福田支行',
                //     belongBank: '上海市普陀区金沙江路 1516 弄'
                // }],
            }
        },

        created(){
            this.form.id = this.$route.query.upMangerId.id;
            console.log('id' ,this.form.id);
        },

        mounted(){
            //操作日志
            this.journal(this.logForm);

            shenheinformation(this.form).then(
                (res) => {
                    console.log('审核信息' , res);
                    //不可以修改数据
                    this.list.activityName = res.data.activityName;
                    this.list.activityType = res.data.activityType;
                    this.list.belongBank = res.data.belongBank;
                    this.list.activityDate = res.data.activityDate;
                    this.list.activityAddress = res.data.activityAddress;
                    this.list.remark = res.data.remark;

                    //可以修改数据
                    this.form.activityTypeName = res.data.activityTypeName;
                    this.form.followPeople = res.data.followPeople;
                    this.form.inviteNum = res.data.inviteNum;
                    this.form.estimatedCost = res.data.estimatedCost;
                }
            )
            
        },

        methods: {
            //退回上一级
            goBack () {
                this.$router.go(-1);
            },

            //保存
            submit(){
                shenheactivity(this.form).then(
                    (res) => {
                        console.log("保存:", res);
                        if (res.code == 0) {
                            this.$message.success('保存成功')
                            this.$router.go(-1)
                        } else {
                            this.$message.error(res.msg);
                        }
                    },
                )
            },

            //拒绝
            reject(){
                this.form.activityStatus = 3,
                shenheactivity(this.form).then(
                    (res) => {
                        console.log("拒绝:", res);
                        if (res.code == 0) {
                            this.$message.success('拒绝成功')
                            this.$router.go(-1)
                        } else {
                            this.$message.error(res.msg);
                        }
                    },
                )
            },

                  //查询操作日志
            journal() {
                this.logForm.pageSize = this.pageSizeone
                this.logForm.currentPage = this.pageNoone
                journal(this.logForm).then((res) => {
                    console.log("查询日志:", res);
                    if (res.code == 0) {
                    this.dialogData = res.logList.logList
                    this.totalone = res.logList.totalCount
                    } else {
                    this.$message.error(res.msg);
                    }
                })
            },

            // 日志数据分页
            handleSizeChangeone(val) {
                this.pageSizeone = val
                console.log(`每页 ${val} 条`);
                this.journal(this.logForm);
            },
            handleCurrentChangeone(val) {
                this.pageNoone = val
                console.log(`当前页: ${this.pageNo}`);
                this.journal(this.logForm);
            },


        },

    }
</script>

<style>
#examinepage{
    height: 1000px;
    margin-top: 20px;
    display: flex;

}

#examinepageone{
    width: 960px;
    height: 900px;
    background-color: white;
    margin-right: 20px;
    padding: 20px;
}

#examinepagetwo{
    width: 640px;
    display: flex;
    flex-direction: column;

    /* height: 900px; */
    /* background-color: white; */
}

.examinepageasidecss{
    background-color: white;
    /* height: 350px; */
    /* margin-top: 3px; */
    padding: 15px 15px 0px 15px;
}

.asidefont{
    font-size: 14px;
    font-weight: 600;
    color: black;
}

#buttomcss{
    width: 100%;
    display: flex; 
    justify-content: center;
    background-color: rgb(255, 255, 255);
    margin-top: 3px;
}

</style>
