<template>
  <div class='topContent'>
    <el-row :gutter="24">
      <el-col :span="6" v-show="isShowOne">
        <div class="flex_r_ic">
          <span class="rowContent">{{nameText.one}}</span>
          <el-input v-model.trim="form.orgName" @keyup.enter.native="serchAll" maxlength="35" placeholder="请输入">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" v-show="isShowTwo">
        <div class="flex_r_ic">
          <span class="rowContent">{{nameText.two}}</span>
          <el-input v-model.trim="form.channelName" @keyup.enter.native="serchAll" maxlength="35" placeholder="请输入">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" v-show="isShowFive">
        <div class="flex_r_ic">
          <span class="rowContent">{{nameText.five}}</span>
          <el-input v-model.trim="form.name" @keyup.enter.native="serchAll" maxlength="35" placeholder="请输入">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" v-show="isShowSix">
        <div class="flex_r_ic">
          <span class="rowContent">{{nameText.six}}</span>
          <el-input v-model.trim="form.proName" @keyup.enter.native="serchAll" maxlength="35" placeholder="请输入">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" v-show="isShowThree">
        <div class="flex_r_ic">
          <span class="rowContent">{{nameText.three}}</span>
          <el-select v-model.trim="form.status" style="width: 100%;" :popper-append-to-body="false" placeholder="请选择">
            <el-option v-for="(item, index) in statusList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" v-show="isShowFour">
        <div class="flex_r_ic">
          <span :style="[getSourceStyle()]">{{nameText.four}}</span>
          <el-date-picker v-model=" form.beginTime" style="width: 50%;" :clearable="false" type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span style="margin-left: 4px;margin-right: 3px;">-</span>
          <el-date-picker v-model="form.endTime" style="width: 50%;" :clearable="false" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 16px;" :gutter="24">
      <el-col :span="6">
        <div class="flex_r">
          <span class="rowContent">&#12288;&#12288;&#12288;&#12288;</span>
          <el-button @click="serchAll" type="primary">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template> 
<script>

export default {
  name: 'topContent',
  data () {
    return {
    }
  },
  props: {
    form: {
      type: Object,
    },
    statusList: {
      type: Array
    },
    isShowOne: {
      type: Boolean
    },
    isShowTwo: {
      type: Boolean
    },
    isShowThree: {
      type: Boolean
    },
    isShowFour: {
      type: Boolean
    },
    isShowFive: {
      type: Boolean
    },
    isShowSix: {
      type: Boolean
    },
    nameText: {
      type: Object
    }
  },
  created () {
  },
  methods: {
    getSourceStyle () {
      let temp = {}
      temp.whiteSpace = 'nowrap';
      temp.marginRight = '12px';
      return temp
    },
    serchAll () {
      if (new Date(this.form.beginTime).getTime() > new Date(this.form.endTime).getTime()) {
        this.$message.error('结束时间不能小于开始时间');
      } else {
        this.form.pageNo = 1
        this.$emit('currentDate')
      }
    },
    reset () {
      this.$emit('reset')
    },
  },
}
</script>
<style scoped lang='less'>
.topContent {
  .rowContent {
    white-space: nowrap;
    margin-right: 12px;
  }
}
</style>