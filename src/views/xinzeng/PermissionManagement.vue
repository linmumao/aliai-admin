<template>
    <div style="padding: 0 20px;  background-color:#f5f7fa ">
        <div style="padding-top: 20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div id="Permissionmanagement">
            <div style="padding: 50px 0 0 50px;">
                <div class="margintop">超管</div>
                <div class="margintop">策划，工作台、活动类型、活动列表、银行管理</div>
                <div class="margintop">银行，工作台、银行-活动列表（下属所有支行的活动）</div>
                <div class="margintop">支行，工作台，外部-活动列表、外部-申请活动、外部-活动详情</div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style>
#Permissionmanagement{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 800px;
    background-color: white;

}

.margintop{
    margin-top: 15px;
    font-weight: 600;
}

</style>