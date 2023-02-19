import request from "../utils/request";


//查询操作日志
export function journal (data) {
  return request({
    url: "/account/user/query/log/list",
    method: "POST",
    data,
  });
}


////////////////////////////////////////////////////////////////////////////工作台面板

//查看活动概况
export function activityOverview () {
    return request({
      url: "/marketing/activitylist/query/rejected",
      method: "GET"
    });
}

//查询活动日历
export function calendar () {
  return request({
    url: "/marketing/activitylist/query/activity/calendar",
    method: "GET"
  });
}

//查询待办事项
export function UnfinishedBusiness () {
  return request({
    url: "/marketing/activitylist/query/backlog",
    method: "GET"
  });
}

// 根据id查询审核信息(工作台界面)
export function shenheinformation (data) {
  return request({
    url: "/marketing/activitylist/query/audit/information",
    method: "POST",
    data,
  });
}

// 根据id审核活动(工作台界面)
export function shenheactivity (data) {
  return request({
    url: "/marketing/activitylist/update/activity/status",
    method: "POST",
    data,
  });
}

//查询待办事项数量    （未用）
export function UnfinishedBusinessnum () {
  return request({
    url: "/marketing/activitylist/query/backlog/num",
    method: "GET"
  });
}

////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////活动面板界面

//查看活动面板信息
export function ActivityPanel () {
  return request({
    url: "/marketing/activitylist/query/activity/list",
    method: "GET"
  });
}



////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////活动类型界面
// 根据条件分页查询(活动类型界面)
export function DetailsPages (data) {
  return request({
    url: "/marketing/activitytype/page/list",
    method: "POST",
    data,
  });
}

//删除活动类型信息
export function deleteactivityType (data) {
  return request({
    url: "/marketing/activitytype/delete",
    method: "POST",
    data,
  });
}


// 新增(活动类型界面)
export function addactivitytype (data) {
  return request({
    url: "/marketing/activitytype/save",
    method: "POST",
    data,
  });
}

// 编辑(活动类型界面)
export function editoractivitytype (data) {
  return request({
    url: "/marketing/activitytype/update",
    method: "POST",
    data,
  });
}

////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////活动列表外部

// 批量下载文件
export function downloadfiles (data) {
  return request({
    url: "/marketing/activitylist/download/file",
    method: "GET",
    params: {
      id: data,
    },
  });
}

// 批量下载图片
export function downloadpictures (data) {
  return request({
    url: "/marketing/activitylist/download/img",
    method: "POST",
    data
  });
}

// 批量下载文本
export function downloadtext (data) {
  return request({
    url: "/marketing/activitylist/download/txt",
    method: "GET",
    params: {
      id: data,
    },
  });
}

// 分页查询活动列表(活动列表外部)
export function waiactivitylist (data) {
  return request({
    url: "/marketing/activitylist/out/list",
    method: "POST",
    data,
  });
}

// 外部-查询活动列表修改
export function waiupdataactivitylist (data) {
  return request({
    url: "/marketing/activitylist/update/out/list",
    method: "POST",
    data,
  });
}

// 外部-申请活动(活动列表外部)
export function addwaiactivitylist (data) {
  return request({
    url: "/marketing/activitylist/apply/activity",
    method: "POST",
    data,
  });
}

// 外部-查询活动列表详情(活动列表外部)
export function seewaiactivitylist (data) {
  return request({
    url: "/marketing/activitylist/query/out/list",
    method: "POST",
    data,
  });
}



//外部-活动列表-申请活动（精选活动）
export function selectness () {
  return request({
    url: "/marketing/activitytype/apply/by/selectness",
    method: "GET"
  });
}

//外部-活动列表-申请活动（备选活动）
export function alternative () {
  return request({
    url: "/marketing/activitytype/apply/by/alternative",
    method: "GET"
  });
}

// 外部-查看申请活动详情(点击活动列表图片查看详情)
export function toApplyActivitiesDetails (data) {
  return request({
    url: "/marketing/activitytype/apply/activity/details/by/id",
    method: "POST",
    data,
  });
}

// 外部-申请活动
export function ApplyActivities (data) {
  return request({
    url: "/marketing/activitylist/apply/activity",
    method: "POST",
    data,
  });
}

// // 数据上传(活动列表内部)
// export function uploadneiactivitylist (data) {
//   return request({
//     url: "/marketing/activitylist/data/upload",
//     method: "POST",
//     data,
//   });
// }


////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////活动列表内部
// 分页查询活动列表(活动列表内部)
export function neiactivitylist (data) {
  return request({
    url: "/marketing/activitylist/list",
    method: "POST",
    data,
  });
}

// 内部-新建活动列表信息(活动列表内部)
export function addneiactivitylist (data) {
  return request({
    url: "/marketing/activitylist/insert",
    method: "POST",
    data,
  });
}

//内部-根据id编辑活动
export function updataactivitylist (data) {
  return request({
    url: "/marketing/activitylist/update/in/by/id",
    method: "POST",
    data,
  });
}

//内部-根据id删除活动
export function deleteactivitylist(data) {
  return request({
    url: "/marketing/activitylist/delete/in/by/id",
    method: "POST",
    data,
  });
}

// 数据上传(活动列表内部)
export function uploadneiactivitylist (data) {
  return request({
    url: "/marketing/activitylist/data/upload",
    method: "POST",
    data,
  });
}


////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////银行界面
//根据条件分页查询(银行页面)
export function paginationQuery (data) {
    return request({
      url: "/marketing/bankbase/page/list",
      method: "POST",
      data,
    });
}


//新增银行
export function addbank (data) {
  return request({
    url: "/marketing/bankbase/add",
    method: "POST",
    data,
  });
}

//修改银行信息
export function updatabank (data) {
  return request({
    url: "/marketing/bankbase/update",
    method: "POST",
    data,
  });
}

//删除银行信息
export function deletebank (data) {
  return request({
    url: "/marketing/bankbase/delete",
    method: "POST",
    data,
  });
}

//重置银行余额信息
export function updatamoney (data) {
  return request({
    url: "/marketing/bankbase/update/money",
    method: "POST",
    data,
  });
}

//批量修改银行信息
export function batchmodify (data) {
  return request({
    url: "/marketing/bankbase/batch/update",
    method: "POST",
    data,
  });
}

//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////支行界面
//查看活动概况
export function findbankbranch () {
  return request({
    url: "/marketing/bankbranch/query/bank/branch",
    method: "GET"
  });
}


//根据条件分页查询(支行页面)
export function bankbranch (data) {
  return request({
    url: "/marketing/bankbranch/list",
    method: "POST",
    data,
  });
}

//新增支行
export function addbankbranch (data) {
  return request({
    url: "/marketing/bankbranch/insert",
    method: "POST",
    data,
  });
}

//修改支行信息
export function updatabankbranch (data) {
  return request({
    url: "/marketing/bankbranch/update",
    method: "POST",
    data,
  });
}

//删除银行信息
export function deletebankbranch (data) {
  return request({
    url: "/marketing/bankbranch/delete",
    method: "POST",
    data,
  });
}

//重置银行余额信息
export function updatabankbranchmoney (data) {
  return request({
    url: "/marketing/bankbranch/update/money",
    method: "POST",
    data,
  });
}

//批量支行行信息
export function branchbatchmodify (data) {
  return request({
    url: "/marketing/bankbranch/batch/update",
    method: "POST",
    data,
  });
}
//////////////////////////////////////////////////////////////////////