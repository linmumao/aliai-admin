<template>
    <div id="workbench">
        <div id="topcontent">
            <div class="topmemu">
                <div class="fontthree">活动概览</div>
                <div id="selectmemu" class="margintop" ></div>
                <div class="margintop">
                    <div style="color: black; ">活动完成率</div>
                    <div id="childtopmemu">
                        <div>
                            <div id='mychart' style="width: 700px; height:100px;"></div>
                        </div>
                        <div class="column">
                            <div class="fontsize_fout">{{count }}</div>
                            <div class="fontsize_shisi">活动总数量</div>
                        </div>
                        <div  class="column">
                            <div class="fontsize_fout">{{ underway }}</div>
                            <div class="fontsize_shisi">进行中活动</div>
                        </div>
                        <div  class="column">
                            <div class="fontsize_fout">{{ rejected }}</div>
                            <div class="fontsize_shisi">已拒绝活动</div>
                        </div>
                    </div>
                </div>
                <div class="margintop">
                    <div style="color: black;">活动响应时间</div>
                    <div id="responsetime">
                        <div class="responsetimechild">
                            <div>平均<span style="font-size: 24px; color: #1677FF; margin: 0 5px; ">{{activityPeriod}}</span>天</div>
                            <div style="color: #909399; font-size: 14px;">活动周期</div>
                        </div>
                        <div class="responsetimechild">
                            <div>平均<span style="font-size: 24px; color: #1677FF; margin: 0 5px; ">{{ processingTime }}</span>天</div>
                            <div style="color: #909399; font-size: 14px;">业务人员处理活动时间</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="topmemu">
                <div class="fontthree">活动日历</div> 
                <div>
                    <div style="height: 300px; width: 100%; background-color: aquamarine; margin-top: 20px;" >
                        <!-- 代办任务  日程表 -->
                        <div class="top" style="background: #fff; padding: 8px 6px">
                            <div class="modelBox">
                            <!-- <span class="radis"></span> -->
                            <!-- <span style="color: black; font-size: 16px; font-weight: bold">待办任务</span> -->
                            </div>
                            <div class="tabs" style="width: 100%">
                            <FullCalendar ref="fullCalendar" :options="calendarOptions" class="demo-app-calendar" style="width: 500px;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="bottomcontent">
           <div class="fontthree">我的待办</div> 
           <div>
                <div style="margin-top: 15px;">
                    <el-table
                    :header-cell-style="{ background:'#f5f7fa', color: '#000' }"
                    :data="tableData"
                    style="width: 100%">
                        <el-table-column
                            type="index"
                            label="序号"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="activityName"
                            label="活动名称"
                            width="280">
                        </el-table-column>
                        <el-table-column
                            prop="belongBank"
                            label="所属支行"
                            width="280">
                        </el-table-column>
                        <el-table-column
                            prop="activityDate"
                            label="活动日期"
                            width="280">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="创建时间"
                            width="280">
                        </el-table-column>
                        <el-table-column align="center" label="操作"   >
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary"  @click="editUser(scope.row)">审核</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
           </div>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import zhCnLocale from '@fullcalendar/core/locales/zh-cn'

    import {activityOverview , UnfinishedBusiness , calendar , UnfinishedBusinessnum } from '../../api/xinzeng'


    // import {getMerScatter} from '../../api/management'


    export default{
        name: 'echart',
        components: {
            FullCalendar  // 像使用自定义组件一样使用
        },

        data () {
            return{
                // 活动概览数据
                accomplish:'',
                activityPeriod: 0,
                count: 0,
                processingTime:0,
                rejected: 0,
                underway: 0,
                // 活动概览数据


                //活动日历方法数据
                calendarOptions: {
                    plugins: [
                    // 加载插件，V5采用插件模块方式加入
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin, // needed for dateClick
                    ],
                    height: 380, //日历高度
                    width: 400,
                    headerToolbar: {
                    // 头部toolba
                    //   left: 'prev,next today',
                    left: 'dayGridYear,dayGridMonth',
                    center: 'title',
                    //   right: 'timeGridDay,timeGridWeek,dayGridMonth,dayGridYear ',
                    right: 'prev,next',
                    },
                    handleWindowResize: true, //随浏览器窗口变化
                    initialView: 'dayGridMonth', // 初始化插件显示
                    // initialDate:""//初始化日期
                    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                    // editable: true, //是否可编辑
                    // droppable: true,//可拖拽的
                    // timeZone: 'local',//采用时区
                    selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true,
                    weekends: true, // 是否显示一周七天
                    // select: this.handleDateSelect,
                    // eventClick: this.handleEventClick, // 日程点击事件
                    eventMouseEnter: this.handleEventMouseEnter, // 用户将鼠标悬停在事件上时触发
                    // eventsSet: this.handleEvents,
                    // dateClick: this.handleDateClick,//日期方格点击事件
                    eventClick: this.handleEventClick, //日程点击事件
                    locale: zhCnLocale,
                    nextDayThreshold: '01:00:00',
                    
                    events: [
                    //日程事件的json
                    { title: 'event 1', date: '2023-02-23 12:00:00' },
                    { title: 'event 2', date: '2023-02-24 05:59:23' },
                    { title: 'event 3', date: '2023-02-25 08:23:00' },
                    { title: 'event 4', date: '2023-02-25 09:30:00' },
                    { title: 'event 5', date: '2023-02-26 12:00:00' },
                    { title: 'event 2', date: '2023-02-26 15:00:00' }
                    ],
                    // datesSet: this.handleDateSet,
                    /* you can update a remote database when these fire:
                    eventAdd:
                    eventChange:
                    eventRemove:
                    */
                },

                //待办事项
                tableData:[],









                // tableData: [{
                //     index: 1,
                //     type:'新增',
                //     date: '2016-05-02',
                //     name: '宝安支行',
                //     address: '活动名称'
                // }, {
                //     index: 2,
                //     type:'修改',
                //     date: '2016-05-04',
                //     name: '南山支行',
                //     address: '时代的和健康教育·'
                // }, {
                //     index: 3,
                //     type:'删除',
                //     date: '2016-05-01',
                //     name: '龙岗支行',
                //     address: ' 该地区的那就违法'
                // }, {
                //     index: 4,
                //     type:'新增',
                //     date: '2016-05-03',
                //     name: '福田支行',
                //     address: '上海市普陀区金沙江路 1516 弄'
                // }],
            }
        },

        mounted(){

            this.activityOverview();

            this.UnfinishedBusiness();

            this.calendar();

            this.UnfinishedBusinessnum();
        },

        methods: {

            //查看活动概况 
            activityOverview() {
                activityOverview().then((res) => {
                    console.log('查看活动概况' , res);
                    this.accomplish = res.data.accomplish,
                    this.activityPeriod = res.data.activityPeriod,
                    this.count = res.data.count,
                    this.processingTime = res.data.processingTime,
                    this.rejected = res.data.rejected,
                    this.underway = res.data.underway,

                    //画原环图
                    this.drawLine();
                })
            },
            // 画圆形图
            drawLine(){
                // 初始化实例
                let myChart = echarts.init(document.getElementById('mychart'))
                let option = {
                    series: [{
                        type: 'gauge',
                        radius: '100%',
                        startAngle: 90,
                        endAngle: -270,
                        pointer: {
                            show: false
                        },
                        progress: {
                            show: true,
                            overlap: false,
                            roundCap: true,
                            clip: true,
                            itemStyle: {
                                // borderWidth: 10,
                                // borderColor: ['#FFC16B','#0050E7']
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 6,
                                borderColor: '#04BEFB'
                            }
                        },
                        splitLine: {
                            show: false,
                            distance: 0,
                            length: 10
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            distance: 5
                        },
                        color:"#1677FF",
                        // fontSize: 30,
                        // fontSize:'40px',
                        data: [
                            {
                                value: this.accomplish*100,
                                name: '',
                                title: {
                                    offsetCenter: ['1%', '40%'],
                                },
                                detail: {
                                    offsetCenter: ['4%', '0%']
                                }
                            },
                        ],
                        title: {
                            fontSize: 10,
                            color: '#1677FF',
                        },
                        detail: {
                            width: 15,
                            height: 6,
                            // lineHeight:6,
                            // marginTop:18,
                            // paddingTop:18,
                            fontSize: 20,
                            color: 'auto',
                            borderColor: 'auto',
                            fontFamily: "FinFont-Bold, FinFont",
                            // borderRadius: 20,
                            // borderWidth: 8,
                            // formatter: '{value}%',
                            formatter: this.accomplish,
                        }
                    }]
                }
                // 渲染数据
                myChart.setOption(option, true)
            },

            //查询待办事项
            UnfinishedBusiness(){
                UnfinishedBusiness().then(
                    (res) => {
                        console.log('查询待办事项' , res);
                        this.tableData = res.data;
                    }
                )
            },

            //查询待办事项数量
            UnfinishedBusinessnum(){
                UnfinishedBusinessnum().then(
                    (res) => {
                        console.log('查询待办事项数量' , res);
                        if(res.code == 0){
                            this.$notify({
                                title: '消息通知',
                                message: `你有${res.data}条待办事项，请尽快前往处理`,
                                type: 'success'
                            });
                        }
                    }
                )
            },

            //查看日历信息
            calendar(){
                calendar().then(
                    (res) => {
                        console.log('查看日历信息' , res);  
                    }
                )
            },

            // 编辑
            editUser (row) {
                console.log('row' ,row)
                this.$router.push({
                name: 'ExaminePage',
                query: {
                    upMangerId: row
                }
                })
            },


            //查看我的待办



        },
    }

</script>

<style>
    #workbench{
        padding: 20px;
        background-color: #EBEEF5;
        /* display: flex;
        flex-direction: column;
        justify-content: center; */
        /* height: 1100px; */
    }

    #topcontent{
        height: 450px;
        width: 1550px ;
        display: flex;
        justify-content: space-between;
    }

    .topmemu{
        width: 765px;
        background-color: white;
        height: 100%;
        padding: 15px;
    }


    #bottomcontent{
        margin-top: 15px;
        background-color: white;
        /* height: 450px; */
        width: 1550px ;
        padding: 15px 15px 30px 15px;
    }

    .fontthree{
        font-size: 16px;
        font-weight: 600;
        color: black;
    }

    #selectmemu{
        height: 20px;
        background-color: #EBEEF5;
    }

    .margintop{
        margin-top: 15px;
    }

    #childtopmemu{
        height: 150px;
        /* background-color: aqua; */
        display: flex;
        justify-content: space-around;
    }

    #childtopmemu>div{
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* border: 1px solid wheat; */
    }

    .column{
        display: flex;
        flex-direction: column;
        color: #303133;
    }

    .fontsize_fout{
        font-size: 40px;
        font-weight: 700;
    }

    .fontsize_shisi{
        font-size: 14px;
        color: #909399;
    }

    #responsetime{
        display: flex;
        margin-top: 15px;
    }

    .responsetimechild{
        margin-left: 32px;
        height: 72px;
        width: 188px;
        border-radius: 30px;
        background-color: #F5F7FA;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>