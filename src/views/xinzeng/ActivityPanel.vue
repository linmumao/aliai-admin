<template>
    <div id="activitypanel">
        <div class="same">
            <span style="margin-right: 15px;font-weight: 600; color: black; ">待审核</span>{{ await }}
            <div class="sameone"
                 style="height: 120px;"
                 v-for="(item,index) in monishujv"
                :key="index"
                v-if="item.activityStatus == 0">
                <div class="sametwo" >
                    <div style="display: flex;">
                        <!-- <img src="../../assets/qizhi.png" width="20px" height="20px" alt="" style="margin-right: 3px;"> -->
                        <span style="font-size: 16px; font-weight: 600; line-height:20px; color: black; ">{{item.activityName}}</span>
                    </div>
                    <div style="margin-top: 8px;" >
                        <span  style="margin-right: 15px; font-size: 14px; color: rgb(150, 150, 150); font-weight: 500; "> {{ item.activityDate }}</span>
                        <span  style="font-size: 14px; color: rgb(150, 150, 150); font-weight: 500; "> 创建</span>
                    </div>
                    <div style="display: flex; margin-top: 15px;">
                        <!-- <img src="../../assets/fengmian.png" width="20px" height="20px" style="border-radius: 50%; margin-right: 3px; " alt=""> -->
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; color: black; ">{{ item.belongBank }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="same">
            <span style="margin-right: 15px;font-weight: 600; color: black; ">进行中</span>{{ underway }}
            <div class="sameone"
                 v-for="(item,index) in monishujv"
                :key="index" 
                v-if="item.activityStatus == 1" >
                <div class="sametwo" >
                    <div style="display: flex;">
                        <!-- <img src="../../assets/qizhi.png" width="20px" height="20px" alt="" style="margin-right: 3px;"> -->
                        <span style="font-size: 16px; font-weight: 600; line-height:20px; color: black; ">{{item.activityName}}</span>
                    </div>
                    <div style="margin-top: 8px;" >
                        <span  style="margin-right: 15px; font-size: 14px; color: rgb(150, 150, 150); font-weight: 500; "> {{ item.activityDate }}</span>
                        <span  style="font-size: 14px; color: rgb(150, 150, 150); font-weight: 500; "> 创建</span>
                    </div>
                    <div style="display: flex; margin-top: 15px;">
                        <!-- <img src="../../assets/fengmian.png" width="20px" height="20px" style="border-radius: 50%; margin-right: 3px; " alt=""> -->
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; color: black; ">{{ item.belongBank }}</span>
                    </div>
                    <hr style="margin: 10px 0 10px 0; background-color: rgb(230, 229, 229); height: 1px; border: none;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-size: 14px; font-weight: 500; line-height:20px; color: black; ">{{ item.followPeople }}</span>
                            <span style="font-size: 14px; font-weight: 500; line-height:20px; color: black; ">￥{{ item.estimatedCost }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="same">
            <span style="margin-right: 15px;font-weight: 600; color: black; ">已结束</span>{{ over }}
            <div class="sameone"
                 v-for="(item,index) in monishujv"
                :key="index" 
                v-if="item.activityStatus == 2" >
                <div class="sametwo" >
                    <div style="display: flex;">
                        <!-- <img src="../../assets/qizhi.png" width="20px" height="20px" alt="" style="margin-right: 3px;"> -->
                        <span style="font-size: 16px; font-weight: 600; line-height:20px; color: black; ">{{item.activityName}}</span>
                    </div>
                    <div style="margin-top: 8px;" >
                        <span  style="margin-right: 15px; font-size: 14px; color: rgb(150, 150, 150); font-weight: 500; "> {{ item.activityDate }}</span>
                        <span  style="font-size: 14px; color: rgb(150, 150, 150); font-weight: 500; "> 创建</span>
                    </div>
                    <div style="display: flex; margin-top: 15px;">
                        <!-- <img src="../../assets/fengmian.png" width="20px" height="20px" style="border-radius: 50%; margin-right: 3px; " alt=""> -->
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; color: black; ">{{ item.belongBank }}</span>
                    </div>
                    <hr style="margin: 10px 0 10px 0; background-color: rgb(230, 229, 229); height: 1px; border: none;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-size: 14px; font-weight: 500; line-height:20px; color: black; ">{{ item.followPeople }}</span>
                            <span style="font-size: 14px; font-weight: 500; line-height:20px; color: black; ">￥{{ item.estimatedCost }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="same">
            <span style="margin-right: 15px;font-weight: 600; color: black; ">已拒绝</span>{{ rejected }}
            <div class="sameone"
                 v-for="(item,index) in monishujv"
                :key="index" 
                v-if="item.activityStatus == 3" >
                <div class="sametwo" >
                    <div style="display: flex;">
                        <!-- <img src="../../assets/qizhi.png" width="20px" height="20px" alt="" style="margin-right: 3px;"> -->
                        <span style="font-size: 16px; font-weight: 600; line-height:20px; color: black; ">{{item.activityName}}</span>
                    </div>
                    <div style="margin-top: 8px;" >
                        <span  style="margin-right: 15px; font-size: 14px; color: rgb(150, 150, 150); font-weight: 500; "> {{ item.activityDate }}</span>
                        <span  style="font-size: 14px; color: rgb(150, 150, 150); font-weight: 500; "> 创建</span>
                    </div>
                    <div style="display: flex; margin-top: 15px;">
                        <!-- <img src="../../assets/fengmian.png" width="20px" height="20px" style="border-radius: 50%; margin-right: 3px; " alt=""> -->
                        <span style="font-size: 14px; font-weight: 600; line-height:20px; color: black; ">{{ item.belongBank }}</span>
                    </div>
                    <hr style="margin: 10px 0 10px 0; background-color: rgb(230, 229, 229); height: 1px; border: none;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-size: 14px; font-weight: 500; line-height:20px; color: black; ">{{ item.followPeople }}</span>
                            <span style="font-size: 14px; font-weight: 500; line-height:20px; color: black; ">￥{{ item.estimatedCost }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ActivityPanel }  from '../../api/xinzeng'

export default{
    data() {
        return{ 
            await: 0, // 待审核
            over: 0, // 已经结束
            rejected: 0, // 已经拒绝
            underway: 0, //进行中

            monishujv:[],


            // monishujv:[
            //     {title:'菜歇活动' , time: '2022年12月21日' , name:'农业银行' , autor:'张三' , money:1000 },
            //     {title:'shab活动' , time: '2052年4月41日' , name:'中国银行' , autor:'李四' , money:1000 }
            // ],
        }
    },

    mounted(){
        this.ActivityPanel()
    },

    methods:{
        //查看活动面板信息
        ActivityPanel(){
            ActivityPanel().then(
                (res) => {
                    console.log('查看活动面板信息',res);
                    this.monishujv = res.data;
                    console.log('this.monishujv',this.monishujv);
                    this.await = res.num.await;
                    this.over = res.num.over;
                    this.rejected = res.num.rejected;
                    this.underway = res.num.underway;
                }
            )
        },
    },


}


</script>

<style>
#activitypanel{
    display: flex;
    justify-content: space-around;
    padding: 25px 0;
    background-color:#f5f7fa
}

.same{
    width: 380px;
    height: 800px;
    padding: 15px;
    background-color: white;
    border: 1px dashed  rgb(156, 154, 154);
}

.sameone{
    height: 150px;
    width: 100%;
    background-color: #fff;
    border: 1px solid rgb(230, 229, 229);
    margin-top: 15px;
    /* padding: 10px; */
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sametwo{
    width: 92%;
    height: 80%;
    /* background-color: aquamarine; */
}

/* h4{
    display: inline;
} */
</style>