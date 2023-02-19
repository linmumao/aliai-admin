<template>
    <div style="padding: 20px;  background-color:#f5f7fa ; height: 100%;" >
        <div style="padding: 20px; background-color: white; margin-bottom: 20px; width: 1660px; height: 380px; ">
            <div style="font-size: 16x; font-weight: 600; color: black; ">精选活动</div>
            <div style="width: 98%;height: 100%;  display: flex; flex-direction: column;  flex-wrap: wrap;overflow-x: scroll;  ">
                <div 
                v-for="(item,index ) in selectnessarr"
                style="height: 280px;width: 374px;background-color: #f5f7fa; border-radius: 15px; margin:10px; " 
                @click.stop="dialogTableVisible = true"
                >
                    <img :src=item.typeImg width="100%" height="233px" alt="">
                    <div style="display: flex; justify-content: space-between;align-items: center; height: 47px; padding: 15px; "> 
                       <div>{{ item.activityTypeName }}</div> 
                       <el-button type="primary" size="mini"  @click="" >申请活动</el-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 精选活动 -->
        <!-- <div style="padding: 20px; background-color: white;  margin-bottom: 20px; width: 1660px; height: 650px;   overflow-x:auto; ">
            <div style="font-size: 16x; font-weight: 600; color: black; ">精选活动</div>


            <div style=" width: 3000px; height: 300px; display: flex;   ">
                <div 
                v-for="(item,index ) in newarr"
                v-if="index % 2 == 0" 
                style="height: 280px; width: 374px; margin:10px 10px ;" >
                    <img src="../../assets/fengmian.png" width="100%" height="233px" alt="">
                    <div style="display: flex; justify-content: space-between;align-items: center; height: 47px; padding: 15px; "> 
                       <div>{{ item.data }}</div> 
                       <el-button type="primary" size="mini">申请活动</el-button>
                    </div>
                </div>
            </div>
            <div style="width: 3000px; height: 300px;  display: flex;  ">
                <div 
                v-for="(item,index ) in newarr"
                v-if="index % 2 == 1" 
                style="height: 280px;width: 374px; margin:10px 10px ;" >
                <img src="../../assets/fengmian.png" width="100%" height="233px" alt="">
                    <div style="display: flex; justify-content: space-between;align-items: center; height: 47px; padding: 15px; "> 
                        <div>{{ item.data }}</div> 
                        <el-button type="primary" size="mini">申请活动</el-button>
                        </div>
                    </div>
            </div>
        </div> -->

        <div style="padding: 20px; background-color: white; margin-bottom: 20px; width: 1660px; height: 380px; ">
            <div style="font-size: 16x; font-weight: 600; color: black; ">备选活动</div>
            <div style="width: 98%;height: 100%;  display: flex; flex-direction: column;  flex-wrap: wrap;overflow-x: scroll;  ">
                <div 
                v-for="(item,index ) in alternativearr"
                style="height: 280px;width: 374px;background-color: #f5f7fa; border-radius: 15px; margin:10px; " 
                @click="$event => toApplyActivitiesDetails(item) "
                >
                    <img :src=item.typeImg  width="100%" height="233px" alt="">
                    <div style="display: flex; justify-content: space-between;align-items: center; height: 47px; padding: 15px; "> 
                       <div>{{ item.activityTypeName }}</div> 
                       <el-button type="primary" size="mini"  @click.stop="$event => ApplyActivities(item)" >申请活动</el-button>
                    </div>
                </div>
            </div>
        </div>


        <el-dialog title="活动详情" :visible.sync="dialogTableVisible" width="550px"  top = 3vh center lock-scroll >
            <div style=" height: 82vh;">
                <div>
                    <img :src="ActivitiesDetailsarr.typeImg" width="100%" alt="">
                    <div style="font-size: 16px;font-weight: 600; color: black; margin-top: 15px; ">{{ ActivitiesDetailsarr.activityTypeName }}</div>
                    <hr>
                    <div style="margin-top: 20px;">{{ ActivitiesDetailsarr.activityContent }}</div>
                </div>
                <!-- tabs标签页 -->
                <!-- <div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="基本信息" name="first">
                            用户管理让哈尔条件不符合客观环境你开发规划
                        </el-tab-pane>
                        <el-tab-pane label="交易信息" name="second">
                            配置管理现代风格v回家KFC给v环境
                        </el-tab-pane>
                    </el-tabs>
                </div> -->
                <div style="text-align: center; margin-top: 300px;">
                    <el-button type="primary" size="mini" @click="ApplyActivitiesOne(item)"  >申请活动</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="申请活动" :visible.sync="dialogVisible" width="550px"  top = 3vh center lock-scroll >
            <div style=" height: 82vh;">
                <el-form @submit.native.prevent :model="ruleForm"  ref="ruleForm"
                label-width="115px" class="demo-ruleForm">
                    <el-form-item label="活动名称: " prop="typeDescribe">
                        <el-input maxlength="35" v-model="ruleForm.activityName"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间: " prop="typeDescribe">
                        <el-date-picker v-model="ruleForm.activityDate" :clearable="false" type="date"  size="small">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动地点: " prop="typeDescribe">
                        <el-input maxlength="35" v-model="ruleForm.activityAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="邀约人数: " prop="typeDescribe">
                        <el-input maxlength="35" v-model="ruleForm.inviteNum"></el-input>
                    </el-form-item>
                    <el-form-item label="活动内容: " prop="typeDescribe">
                        <!-- <el-select v-model="dataOne.activityType"  size="small" style="width: 400px;">
                            <el-option
                            v-for="item in frequency"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> -->
                        <!-- <el-input maxlength="35" v-model="ruleForm.updateNum"></el-input> -->
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {selectness , alternative , toApplyActivitiesDetails , ApplyActivities} from '../../api/xinzeng'

export default{

    data(){
        return{
            //查看详情弹窗页
            dialogTableVisible:false,
            activeName: 'second',

            //申请活动弹窗页
            dialogVisible:false,

            // 精选活动
            selectnessarr:[],
            // 备选活动
            alternativearr:[],

            //点击查看详情信息
            ActivitiesDetailsarr:[],

            //申请活动参数
            ruleForm:{
                        "activityAddress": "",           //活动地点
                        "activityContent": [             //活动内容
                            {
                                "activityTypeId": 0,     //活动类型名称Id
                            "activityTypeName": ""       //活动类型名称
                            }
                        ],
                        "activityDate": "",              //活动日期
                        "activityName": "",              //活动名称
                        "id": 0,                         //活动列表ID
                        "inviteNum": 0                   //邀约人数
                    },




            newarr:[
                {data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},
                {data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},
                {data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},{data:'创意虎皮饺子/汤圆'},
            ]
        }
    },

    created () {
        this.toApplyActivities()
    },

    methods:{


        //进入申请活动页渲染初始界面
        toApplyActivities(){
            selectness().then(
                (res) => {
                    this.selectnessarr = res.data;
                    console.log('查看外部-活动列表-申请活动（精选）' , this.selectnessarr);
                }
            )
            alternative().then(
                (res) => {
                    this.alternativearr = res.data;
                    console.log('查看外部-活动列表-申请活动（备选）' , this.alternativearr);
                }
            )
        },

        // 外部-查看申请活动详情(点击活动列表图片查看详情)
        toApplyActivitiesDetails(data){
            this.dialogTableVisible = true;
            toApplyActivitiesDetails({id:data.id}).then(
                (res) => {
                    this.ActivitiesDetailsarr = res.data;
                    console.log('外部-查看申请活动详情(点击活动列表图片查看详情)' , this.ActivitiesDetailsarr);

                }
            )
        },

        //外部-申请活动(大页面点击申请活动)
        ApplyActivities(){
            this.dialogVisible=true;
        },
        //外部-申请活动(弹窗页点击申请活动)
        ApplyActivitiesOne(){
            this.dialogTableVisible = false;
            this.dialogVisible=true;
        },


        handleClick(tab, event) {
            console.log(tab, event);
        }


    },



}
</script>

<style>

</style>