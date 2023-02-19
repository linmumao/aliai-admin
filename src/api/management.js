import request from "../utils/request";
// 登录
export function getLogin (data) {
  return request({
    url: "account/open/login",
    method: "post",
    data,
  });
}

// 修改密码
export function accountUserUpdatePwd (data) {
  return request({
    url: "/account/user/updatePwd",
    method: "post",
    data,
  });
}

// 获取手机号验证码
export function accountOpenCode (data) {
  return request({
    url: "/account/open/code/" + data.phone,
    method: "GET"
  });
}

// 找回密码的手机号和验证码验证
export function accountOpenVerifyPhoneCode (data) {
  return request({
    url: "/account/open/verify/phone/code",
    method: "post",
    data,
  });
}

// 重新设置密码
export function accountOpenResetPwd (data) {
  return request({
    url: "/account/open/reset/pwd",
    method: "post",
    data,
  });
}

// 根据用户ID初始化密码
export function accountUserInitPwd (data) {
  return request({
    url: "/account/user/init/pwd",
    method: "post",
    data,
  });
}

// 编辑密码（修改密码）
export function accountUserEditPwd (data) {
  return request({
    url: "/account/user/edit/pwd",
    method: "post",
    data,
  });
}

// 查询首页数据
export function merchantQueryHomeData (data) {
  return request({
    url: "/merchant/merchant/query/home/data",
    method: "GET"
  });
}

// 查询商户分布详情
export function queryMerScatter (data) {
  return request({
    url: "/merchant/open/queryMerScatter",
    method: "GET"
  });
}

// 首页数据查询和头像
export function getHomePage () {
  return request({
    url: "merchant/merchant/queryHomePage",
    method: "get",
  });
}

// 查询地图分布点
export function getMerScatter () {
  return request({
    url: "/merchant/merchant/queryMerScatter",
    method: "get",
  });
}

// 商户中心   查询热门品牌类型
export function getHotType () {
  return request({
    url: "/merchant/brand/type/getHotType",
    method: "get",
  });
}

//根据条件查询
export function getMerchantInfo (data) {
  return request({
    url:
      "/merchant/merchant/merchantInfo/" +
      data.currentPage +
      "/" +
      data.pageSize,
    method: "get",
  });
}

//根据条件查询商户
export function getqueryByCondition (data) {
  return request({
    url: "/merchant/merchant/queryByCondition",
    method: "post",
    data,
  });
}

// 根据大类名称查询商户
export function getByBigType (data) {
  return request({
    url: "/merchant/merchant/query/type/" + data,
    method: "get",
  });
}

// 查询热门商圈
export function getHotArea () {
  return request({
    url: "/merchant/trade/area/getHotArea",
    method: "get",
  });
}

// 根据商圈名称查询商户
export function getByTradeArea (data) {
  return request({
    url: "/merchant/merchant/query/area/" + data,
    method: "get",
  });
}

// 根据商户ID查询信息
export function getDetailInfo (data) {
  return request({
    url: "/merchant/merchant/info/" + data,
    method: "get",
  });
}

// 查询池组关系列表
export function getPoolGroup () {
  return request({
    url: "/merchant/pool/queryPoolGroup",
    method: "get",
  });
}

// 多个商户复制到多个商户组
export function getqueryAddToGroup (data) {
  return request({
    url: "/merchant/merchantGroup/addToGroup",
    method: "post",
    data,
  });
}

// 根据品牌ID集合查询商户
export function getByBrandName (data) {
  return request({
    url: "/merchant/merchant/queryByBrandIds",
    method: "post",
    data,
  });
}

// 根据坐标及范围查询坐标集合
export function getCoordinate (data) {
  return request({
    url: "/merchant/merchant/queryCoordinate",
    method: "post",
    data,
  });
}

// 多条件查询商户
export function getQueryByConditions (data) {
  return request({
    url: "/merchant/merchant/queryByConditions",
    method: "post",
    data,
  });
}

//商户池
//商户池查询
export function getPollList () {
  return request({
    url: "merchant/pool/queryPoolList",
    method: "get",
  });
}

//新增商户池
export function newAddPoll (data) {
  return request({
    url: "/merchant/pool/addPool",
    method: "post",
    data,
  });
}

//编辑商户池
export function editPoll (data) {
  return request({
    url: "/merchant/pool/update",
    method: "put",
    data,
  });
}

// 删除商户池
export function deletePoll (data) {
  return request({
    url: "/merchant/pool/delete/" + data.id,
    method: "delete",
  });
}

// 商户组
// 商户组查询
export function getGroupList (data) {
  return request({
    url: "/merchant/group/groupList",
    method: "get",
    params: data,
  });
}

// 根据组ID查询池列表
export function getPollListByGid (data) {
  return request({
    url: "/merchant/pool/queryPoolListByGid",
    method: "get",
    params: {
      groupId: data.id,
    },
  });
}

// 商户导入
export function downloadExcel () {
  return request({
    url: "merchant/merchant/exportExcel",
    method: "get",
    responseType: "blob",
  });
}

export function upload (data) {
  return request({
    url: "merchant/merchant/importExcel",
    method: "post",
    data: data,
  });
}

//新增商户组
export function newAddGroup (data) {
  return request({
    url: "/merchant/group/addGroup",
    method: "post",
    data,
  });
}

// 删除商户组
export function deleteGroup (data) {
  return request({
    url: "/merchant/group/update/" + data.id,
    method: "delete",
  });
}

// 编辑商户组
export function editGroup (data) {
  return request({
    url: "/merchant/group/update",
    method: "put",
    data,
  });
}

//把组移动到商户池
export function moveGroupToPool (data) {
  return request({
    url: "/merchant/group/moveGroupToPool",
    method: "post",
    data,
  });
}

//根据组ID查询池组关系列表
export function queryPoolGroupByGid (data) {
  return request({
    url: "/merchant/pool/queryPoolGroupByGid",
    method: "get",
    params: {
      groupId: data.id,
    },
  });
}

//模糊搜索池列表
export function queryByName (data) {
  return request({
    url: "/merchant/pool/queryByName",
    method: "post",
    data,
  });
}

//模糊搜索池列表
export function queryByGid (data) {
  return request({
    url: "/merchant/group/queryByGid",
    method: "get",
    params: {
      groupId: data.groupId,
    },
  });
}

//将商户移动到其他组
export function moveMerToGroup (data) {
  return request({
    url: "/merchant/merchantGroup/moveMerToGroup",
    method: "post",
    data,
  });
}

//组下条件查询商户
export function queryByCdt (data) {
  return request({
    url: "/merchant/group/queryByCdt",
    method: "post",
    data,
  });
}

//根据商户ID和组ID删除商户
export function queryDelete (data) {
  return request({
    url: "/merchant/group/delete/merchant/" + data.groupId + '/' + data.merchantId,
    method: "delete",
  });
}


//卡券管理
// 活动列表
// 获取活动分类的列表
export function getActiveTypeList (data) {
  return request({
    url: "/coupon/active/type/list",
    method: "post",
    data,
  });
}

// 获取机构信息的列表
export function getOrgInfo () {
  return request({
    url: "/account/organize/query/admin/orgList",
    method: "get",
  });
}

// 获取机构信息的列表2
export function getOrgInfo2 (data) {
  return request({
    url: "/coupon/active/info/get/org/info",
    method: "post",
    data,
  });
}

// 分页查询活动列表
export function getInfoPageList (data) {
  return request({
    url: "/coupon/active/info/page/list",
    method: "post",
    data,
  });
}

//根据活动ID查询活动详情
export function infoQueryById (data) {
  return request({
    url: "/coupon/active/info/query/by/id",
    method: "get",
    params: {
      activeId: data.activeId,
    },
  });
}

// 更新活动信息
export function activeInfoUpdate (data) {
  return request({
    url: "/coupon/active/info/update/active",
    method: "post",
    data,
  });
}

// 保存活动信息
export function activeInfoSave (data) {
  return request({
    url: "/coupon/active/info/save",
    method: "post",
    data,
  });
}



// 用户管理
// 根据条件查询用户列表
export function accountUserList (data) {
  return request({
    url: "/account/user/list",
    method: "post",
    data,
  });
}

//根据机构ID查询角色列表
export function queryListByOrgId (data) {
  return request({
    url: "/account/role/queryList/by/orgId",
    method: "get",
    params: data
  });
}

//根据机构ID查询角色列表2
export function queryListByOrgId2 (data) {
  return request({
    url: "/account/role/queryList/no/own/by/orgId",
    method: "get",
    params: data
  });
}

// 添加成员
export function accountUserAdd (data) {
  return request({
    url: "/account/user/add",
    method: "post",
    data,
  });
}

//根据用户ID查询用户信息
export function userQueryByUserId (data) {
  return request({
    url: "/account/user/query/byUserId",
    method: "get",
    params: data
  });
}

// 角色管理模块
// 查询角色列表
export function accountRoleList () {
  return request({
    url: "/account/role/list",
    method: "get",
  });
}

// 查询角色列表（包括自己的角色）
export function accountRoleListHasO () {
  return request({
    url: "/account/role/list/has/own",
    method: "get",
  });
}

// 根据ID删除用户
export function userDeleteByUid (data) {
  return request({
    url: "/account/user/delete/byUid",
    method: "post",
    data,
  });
}

// 查询角色菜单列表（树形结构）
export function queryRoleMenuListTree () {
  return request({
    url: "/account/role/query/role/menu/listTree",
    method: "get",
  });
}

// 新建角色与权限的关系
export function roleAddRoleMenu (data) {
  return request({
    url: "/account/role/add/roleMenu",
    method: "post",
    data,
  });
}

// 根据角色ID查询角色与权限关系
// export function queryRoleAndMenuByRid(data) {
//   return request({
//     url: "/account/role/query/roleAndMenu/byRid",
//     method: "get",
// 	params: data
//   });
// }

// 根据角色ID修改角色与权限关系
export function updateRoleAndMenuByRid (data) {
  return request({
    url: "/account/role/update/roleAndMenu/byRid",
    method: "post",
    data,
  });
}

// 根据ID删除角色
export function roleDeleteById (data) {
  return request({
    url: "/account/role/delete/byId",
    method: "post",
    data,
  });
}

// 机构管理
// 根据ID删除角色
export function organizeAdd (data) {
  return request({
    url: "/account/organize/add",
    method: "post",
    data,
  });
}

// 查询省份列表
export function queryProvinceList () {
  return request({
    url: "/account/dataAreas/query/province/list",
    method: "get",
  });
}

// 根据省份ID查询城市列表
export function queryCityBProvinceId (data) {
  return request({
    url: "/account/dataAreas/query/city/list/by/provinceId",
    method: "get",
    params: data
  });
}

// 根据城市ID查询区列表
export function queryUrbanCityId (data) {
  return request({
    url: "account/open/query/urban/list/by/cityId",
    method: "get",
    params: data
  });
}

// 获取机构信息的列表
export function organizeQueryList () {
  return request({
    url: "/account/organize/query/admin/orgList",
    method: "get",
  });
}

// 获取机构信息的树形列表
export function organizeQueryTreeList () {
  return request({
    url: "/account/organize/list",
    method: "get",
  });
}

// 查询行业列表
export function tradeList () {
  return request({
    url: "/account/trade/list",
    method: "get",
  });
}

// 根据机构名查询机构
export function organizeQueryByName (data) {
  return request({
    url: "/account/organize/query/byName",
    method: "post",
    data,
  });
}

// 根据ID查询机构详情
export function queryDetailByOrgId (data) {
  return request({
    url: "/account/organize/query/detail/by/orgId",
    method: "get",
    params: data
  });
}

// 根据ID查询机构详情2
export function queryInfoByOrgId (data) {
  return request({
    url: "/account/organize/query/info/by/orgId",
    method: "get",
    params: data
  });
}

// 修改机构
export function organizeUpdateById (data) {
  return request({
    url: "/account/organize/update/byId",
    method: "post",
    data,
  });
}

// 个人信息
export function queryPersonalInfo () {
  return request({
    url: "/account/user/query/personal/info",
    method: "get",
  });
}

// 查询用户权限列表
export function menuQueryUserMenuList () {
  return request({
    url: "/account/menu/query/userMenu/list",
    method: "get",
  });
}

// 编辑昵称
export function userUpdateNickName (data) {
  return request({
    url: "/account/user/update/nickName",
    method: "post",
    data,
  });
}

// 更换头像
export function userUpdateImgUrl (data) {
  return request({
    url: "/account/user/update/imgUrl",
    method: "post",
    data,
  });
}

// 编辑用户
export function userUpdate (data) {
  return request({
    url: "/account/user/update",
    method: "post",
    data,
  });
}

// 上架下架
export function modifyActiveStatus (data) {
  return request({
    url: "/coupon/active/info/modify/active/status",
    method: "post",
    data,
  });
}


// 数据查找的接口
// 根据条件查询活动数据
export function getByCondition (data) {
  return request({
    url: "/coupon/active/record/receiveList/byCondition",
    method: "post",
    data,
  });
}

// 查询用户活动领取的券码
export function getReceiveInfo (data) {
  return request({
    url:
      "/coupon/active/record/user/receiveInfo/" +
      data.activityId +
      "/" +
      data.mobile,
    method: "get",
  });
}

//发券
export function getCoupon (data) {
  return request({
    url: "/coupon/open/send/coupon",
    method: "post",
    data,
  });
}

// 查看活动数据
export function getSeeCondition (data) {
  return request({
    url: "/coupon/active/record/activity/data/condition",
    method: "post",
    data,
  });
}

// 通过日期类型查看活动数据
export function getDayList (data) {
  return request({
    url:
      "/coupon/active/record/activity/data/list/" +
      data.activeId +
      "/" +
      data.dateType,
    method: "get",
  });
}

// 根据条件导出活动领取券码数据
export function getExport (data) {
  return request({
    url: "/coupon/active/record/receiveList/byCondition/export",
    method: "post",
    data,
  });
}

// 商户信息模块
// 条件查询后台商户列表
export function queryMerBankList (data) {
  return request({
    url: "/merchant/merchant/query/mer/bank/list",
    method: "post",
    data,
  });
}

// 查询行政区下拉列表
export function recordUserReceiveInfo () {
  return request({
    url: "/merchant/open/query/urban/drop/down",
    method: "get",
  });
}

// 查询大类下拉列表
export function queryBigTypeDropDown () {
  return request({
    url: "/merchant/open/query/bigType/drop/down",
    method: "get",
  });
}

// 根据商户ID删除后台商户
export function merchantDeletedById (data) {
  return request({
    url: "/merchant/merchant/deleted/by/id",
    method: "delete",
    data,
  });
}

// 查询商户信息多个下拉列表
export function queryManyDropList () {
  return request({
    url: "/merchant/merchant/query/many/drop/list",
    method: "get",
  });
}

// 根据商户ID查询后台编辑商户信息
export function getBankMerInfoBid (data) {
  return request({
    url: "/merchant/merchant/get/bank/mer/info/by/id",
    method: "get",
    params: data
  });
}

// 根据商户ID查询后台商户详情
export function getBankMerBetailBid (data) {
  return request({
    url: "/merchant/merchant/get/bank/mer/detail/by/id",
    method: "get",
    params: data
  });
}

// 根据大类ID查询小类下拉列表
export function getDropByBigTypeId (data) {
  return request({
    url: "/merchant/brand/type/query/drop/by/bigType/id",
    method: "get",
    params: data
  });
}

// 根据地铁线路ID查询地铁站点下拉列表
export function stepsQueryDropByLineId (data) {
  return request({
    url: "/merchant/steps/query/drop/by/line/id",
    method: "get",
    params: data
  });
}

// 根据区ID查询商圈下拉列表
export function AreaQueryDropByUrbanId (data) {
  return request({
    url: "/merchant/business/area/query/drop/by/urban/id",
    method: "get",
    params: data
  });
}

// 编辑后台商户
export function UpdateBankMerchant (data) {
  return request({
    url: "/merchant/merchant/update/bank/merchant",
    method: "post",
    data,
  });
}
// 导入 Excel 商户数据
export function merchantExcelImportMerchant (data) {
  return request({
    url: "/merchant/excel/import/merchant",
    method: "post",
    data: data,
  });
}

// 导入商圈 Excel 数据
export function merchantExcelImportBusiness (data) {
  return request({
    url: "/merchant/excel/import/business",
    method: "post",
    data: data,
  });
}

// 根据行政区编号查询商户分布详情
export function queryMerScatterByUrbanCode (data) {
  return request({
    url: "/merchant/open/query/merScatter/by/urbanCode",
    method: "get",
    params: data
  });
}

// 查询商圈信息列表
export function businessAreaQueryInfoList (data) {
  return request({
    url: "/merchant/business/area/query/info/list",
    method: "post",
    data,
  });
}

// 根据商圈ID查询商圈信息
export function businessAreaQueryInfoById (data) {
  return request({
    url: "/merchant/business/area/query/info/by/id",
    method: "get",
    params: data
  });
}

// 根据商圈ID查询编辑商圈信息
export function businessAreaQueryUpdateInfoById (data) {
  return request({
    url: "/merchant/business/area/query/update/info/by/id",
    method: "get",
    params: data
  });
}

// 修改商圈
export function businessAreaUpdate (data) {
  return request({
    url: "/merchant/business/area/update",
    method: "post",
    data,
  });
}

// 根据商圈ID删除商圈 
export function MBAreaDeleteById (data) {
  return request({
    url: "/merchant/business/area/delete/by/id",
    method: "post",
    data,
  });
}

// 查询用户首页数据
export function homePageQueryHomePage (data) {
  return request({
    url: "/account/homePage/query/home/page",
    method: "get",
    params: data
  });
}

// 查询待办事项
export function homePageQueryWaitMatter (data) {
  return request({
    url: "/account/homePage/query/wait/matter",
    method: "get",
    params: data
  });
}

// 查询快捷功能列表
export function homePageQueryFuncMenuList (data) {
  return request({
    url: "/account/homePage/query/func/menu/list",
    method: "get",
    params: data
  });
}

// 查询系统公告列表
export function homePageQueryFuncNoticeList (data) {
  return request({
    url: "/account/homePage/query/notice/list",
    method: "get",
    params: data
  });
}

// 查询全部功能
export function homePageQueryFuncMenu (data) {
  return request({
    url: "/account/homePage/query/func/menu",
    method: "get",
    params: data
  });
}

// 添加快捷功能
export function homePageAddFunc (data) {
  return request({
    url: "/account/homePage/add/func/menu",
    method: "post",
    data,
  });
}

// 查询用户消息列表
export function homePageQueryUserMsgList (data) {
  return request({
    url: "/account/homePage/query/user/msg/list",
    method: "get",
    params: data
  });
}

// 轮询用户消息通知
export function accountHomePagePolling (data) {
  return request({
    url: "/account/homePage/polling",
    method: "get",
    params: data
  });
}

// 查询日志类型列表
export function accountUserQueryLogTypeL (data) {
  return request({
    url: "/account/user/query/log/type/list",
    method: "get",
    params: data
  });
}

// 查询操作日志列表
export function accountUserQueryLogL (data) {
  return request({
    url: "/account/user/query/log/list",
    method: "post",
    data,
  });
}

// 查询客户列表
export function accountOrgUserCusList (data) {
  return request({
    url: "/account/org/user/query/cus/list",
    method: "post",
    data,
  });
}

// 新增客户
export function accountOrgUserAddCus (data) {
  return request({
    url: "/account/org/user/add/cus",
    method: "post",
    data,
  });
}

// 编辑客户
export function accountOrgUserUpdateCus (data) {
  return request({
    url: "/account/org/user/update/cus",
    method: "post",
    data,
  });
}

// 编辑查询客户信息
// export function accountOrgUserQueryUpdateCusInfo(data) {
//   return request({
//     url: "/account/org/user/query/update/cus/info",
//     method: "get",
// 	params:data
//   });
// }

// 根据客户ID删除客户
export function accountOrgUserDeleteCus (data) {
  return request({
    url: "/account/org/user/delete/cus/by/id",
    method: "post",
    data,
  });
}

// 根据客户ID锁定客户
export function accountOrgUserLockCus (data) {
  return request({
    url: "/account/org/user/lock/cus/by/id",
    method: "post",
    data,
  });
}

// 新增黑名单
export function accountBlackUserAddBlack (data) {
  return request({
    url: "/account/black/user/add/black/user",
    method: "post",
    data,
  });
}

// 查询黑名单列表
export function accountBlackUserQueryBlackUserList (data) {
  return request({
    url: "/account/black/user/query/black/user/list",
    method: "post",
    data,
  });
}

// 查询编辑黑名单客户信息
export function accountBlackUserQueryBlackCusInfo (data) {
  return request({
    url: "/account/black/user/query/black/cus/info",
    method: "get",
    params: data
  });
}

// 编辑黑名单客户
export function accountBlackUserUpdateBlackCus (data) {
  return request({
    url: "/account/black/user/update/black/cus",
    method: "post",
    data,
  });
}

// 根据名单ID移出黑名单客户
export function accountBlackUserMoveBlackCus (data) {
  return request({
    url: "/account/black/user/move/black/cus",
    method: "post",
    data,
  });
}

// 根据名单ID删除黑名单客户
export function accountBlackUserDeletedBlackCus (data) {
  return request({
    url: "/account/black/user/deleted/black/cus",
    method: "post",
    data,
  });
}

// 批量移出黑名单客户
export function accountBlackUserBatchMoveCus (data) {
  return request({
    url: "/account/black/user/batch/move/cus",
    method: "post",
    data,
  });
}

// 查询白名单列表
export function accountWhiteUserQueryList (data) {
  return request({
    url: "/account/white/user/query/list",
    method: "post",
    data,
  });
}


// 新增白名单
export function accountWhiteUserAddWhiteCus (data) {
  return request({
    url: "/account/white/user/add/white/cus",
    method: "post",
    data,
  });
}

// 删除白名单
export function accountWhiteUserDeleteWhiteCus (data) {
  return request({
    url: "/account/white/user/delete/white/cus",
    method: "post",
    data,
  });
}

// 编辑白名单
export function accountWhiteUserUpdateWhiteCus (data) {
  return request({
    url: "/account/white/user/update/white/cus",
    method: "post",
    data,
  });
}

// 导入客户
export function accountOrgUserImportCus (data) {
  return request({
    url: "/account/org/user/import/cus",
    method: "post",
    data: data,
  });
}

// 导入黑名单 excel
export function accountBlackUserImportExcel (data) {
  return request({
    url: "/account/black/user/import/excel",
    method: "post",
    data: data,
  });
}

// 查询商家列表
export function shoppingBusinessQueryList (data) {
  return request({
    url: "/coupon/business/query/list",
    method: "post",
    data: data,
  });
}

// 新增商家
export function shoppingBusinessAdd (data) {
  return request({
    url: "/coupon/business/add",
    method: "post",
    data: data,
  });
}

// 编辑商家
export function shoppingBusinessUpdate (data) {
  return request({
    url: "/coupon/business/update",
    method: "post",
    data: data,
  });
}

// 根据商家ID删除商家
export function shoppingBusinessDeleteById (data) {
  return request({
    url: "/coupon/business/delete/by/id",
    method: "post",
    data: data,
  });
}

// 根据商家ID启用商家
export function shoppingBusinessEnableById (data) {
  return request({
    url: "/coupon/business/enable/by/id",
    method: "post",
    data: data,
  });
}

// 根据商家ID锁定商家
export function shoppingBusinessLockById (data) {
  return request({
    url: "/coupon/business/lock/by/id",
    method: "post",
    data: data,
  });
}

// 查询服务网点列表
export function shoppingServerPointQueryList (data) {
  return request({
    url: "/coupon/server/point/query/list",
    method: "post",
    data: data,
  });
}

// 查询商家下拉列表
export function shoppingBusinessQueryDrop (data) {
  return request({
    url: "/coupon/business/query/drop",
    method: "get",
    params: data
  });
}

// 查询限制商家下拉列表
export function couponBusinessQLBL (data) {
  return request({
    url: "/coupon/business/query/limit/buss/list",
    method: "get",
    params: data
  });
}

// 根据ID查询服务点详情
export function shoppingServerPointQueryIBId (data) {
  return request({
    url: "/coupon/server/point/query/info/by/id",
    method: "get",
    params: data
  });
}

// 新增服务网点
export function shoppingServerPointAdd (data) {
  return request({
    url: "/coupon/server/point/add",
    method: "post",
    data: data,
  });
}

// 编辑服务点
export function shoppingServerPointUpdate (data) {
  return request({
    url: "/coupon/server/point/update",
    method: "post",
    data: data,
  });
}

// 开启网点
export function shoppingServerPEnableById (data) {
  return request({
    url: "/coupon/server/point/enable/by/id",
    method: "post",
    data: data,
  });
}

// 禁用网点
export function shoppingServerPLockById (data) {
  return request({
    url: "/coupon/server/point/lock/by/id",
    method: "post",
    data: data,
  });
}

// 根据ID删除网点
export function shoppingServerPDeleteById (data) {
  return request({
    url: "/coupon/server/point/delete/by/id",
    method: "post",
    data: data,
  });
}

// 查询商品列表
export function shoppingGQList (data) {
  return request({
    url: "/shopping/goods/query/list",
    method: "post",
    data: data,
  });
}

// 查询品牌下拉列表
export function shoppingBrandQDList (data) {
  return request({
    url: "/shopping/brand/query/drop/list",
    method: "get",
    params: data
  });
}

// 添加商品
export function shoppingGoodsAdd (data) {
  return request({
    url: "/shopping/goods/add",
    method: "post",
    data: data,
  });
}

// 根据ID下架商品
export function shoppingGoodsOBId (data) {
  return request({
    url: "/shopping/goods/off/by/id",
    method: "post",
    data: data,
  });
}

// 根据ID上架商品
export function shoppingGoodsPBId (data) {
  return request({
    url: "/shopping/goods/put/by/id",
    method: "post",
    data: data,
  });
}

// 根据ID删除商品
export function shoppingGoodsDeleteBId (data) {
  return request({
    url: "/shopping/goods/delete/by/id",
    method: "post",
    data: data,
  });
}

// 根据ID查询商品详情
export function shoppingGoodsQueryInfo (data) {
  return request({
    url: "/shopping/goods/query/info",
    method: "get",
    params: data
  });
}

// 根编辑商品
export function shoppingGoodsUpdate (data) {
  return request({
    url: "/shopping/goods/update",
    method: "post",
    data: data,
  });
}

// 查询卡券下拉列表
export function shoppingGoodsQueryCDrop (data) {
  return request({
    url: "/shopping/goods/query/coupon/drop",
    method: "get",
    params: data
  });
}

// 查询卡券类别列表
export function couponTypeQueryList (data) {
  return request({
    url: "/coupon/type/query/list",
    method: "post",
    data: data,
  });
}

// 1、	新增卡券类别
export function couponTypeAdd (data) {
  return request({
    url: "/coupon/type/add",
    method: "post",
    data: data,
  });
}

// 4、	编辑卡券类别
export function couponTypeUpdate (data) {
  return request({
    url: "/coupon/type/update",
    method: "post",
    data: data,
  });
}

// 5、	删除卡券类别
export function couponTypeDeleteBID (data) {
  return request({
    url: "/coupon/type/delete/by/id",
    method: "get",
    params: data
  });
}

// 根据商家ID查询类别下拉列表
export function couponQueryTypeDrop (data) {
  return request({
    url: "/coupon/query/type/drop",
    method: "get",
    params: data
  });
}

// 查询类型下拉列表
export function couponQueryBigTD (data) {
  return request({
    url: "/coupon/query/big/type/drop",
    method: "get",
    params: data
  });
}

// 根据商家ID查询服务网点下拉列表
export function couponServerPointQDBBId (data) {
  return request({
    url: "/coupon/server/point/query/drop/by/business/id",
    method: "get",
    params: data
  });
}

// 4、	导入卡券模板并且返回卡券数量
export function couponImportExcel (data) {
  return request({
    url: "/coupon/import/excel",
    method: "post",
    data: data,
  });
}

// 查询卡券列表
export function couponQueryCouponlist (data) {
  return request({
    url: "/coupon/query/coupon/list",
    method: "post",
    data: data,
  });
}

// 添加卡券
export function couponAdd (data) {
  return request({
    url: "/coupon/add",
    method: "post",
    data: data,
  });
}

// 查询类型下拉列表
export function couponQueryBTD (data) {
  return request({
    url: "/coupon/query/big/type/drop",
    method: "get",
    params: data
  });
}

// 查询卡券池列表
export function couponPoolQueryList (data) {
  return request({
    url: "/coupon/pool/query/list",
    method: "post",
    data: data,
  });
}

// 新增卡券池
export function couponPoolQAdd (data) {
  return request({
    url: "/coupon/pool/add",
    method: "post",
    data: data,
  });
}

// 根据池ID作废卡券
export function couponPoolCanceldataByPid (data) {
  return request({
    url: "/coupon/pool/cancel/by/pid",
    method: "post",
    data: data,
  });
}

// 删除卡券
export function couponDeleteById (data) {
  return request({
    url: "/coupon/delete/by/id",
    method: "post",
    data: data,
  });
}

// 查询卡券编辑信息
export function couponQueryInfo (data) {
  return request({
    url: "/coupon/query/info",
    method: "get",
    params: data
  });
}

// 编辑卡券
export function couponUpdate (data) {
  return request({
    url: "/coupon/update",
    method: "post",
    data: data,
  });
}

// 批量新增卡券池
export function couponPoolAatchAdd (data) {
  return request({
    url: "/coupon/pool/batch/add",
    method: "post",
    data: data,
  });
}

// 多笔卡券作废
export function couponPoolCancelMany (data) {
  return request({
    url: "/coupon/pool/cancel/many",
    method: "post",
    data: data
  });
}

// 批量作废卡券
export function couponPoolBatchCancel (data) {
  return request({
    url: "/coupon/pool/batch/cancel",
    method: "post",
    data: data,
  });
}

// 分页查询活动列表
export function shoppingActivePageList (data) {
  return request({
    url: "/shopping/active/page/list",
    method: "post",
    data: data,
  });
}

// 查询对接服务下拉列表
export function couponQueryDockDsrop (data) {
  return request({
    url: "/coupon/query/dock/drop",
    method: "get",
    params: data
  });
}

// 查询卡券下拉列表
export function couponQueryDropList (data) {
  return request({
    url: "/coupon/query/drop/list",
    method: "get",
    params: data
  });
}

// 查询策略卡券信息
export function couponQueryStrategyCouponInfo (data) {
  return request({
    url: "/coupon/query/strategy/coupon/info",
    method: "get",
    params: data
  });
}

// 活动信息的保存
export function shoppingActiveSave (data) {
  return request({
    url: "/shopping/active/save",
    method: "post",
    data: data,
  });
}

// 根据商品类型查询商品下拉列表（0-实物商品 1-卡券）
export function shoppingGoodsQDBID (data) {
  return request({
    url: "/shopping/goods/query/drop/by/type",
    method: "get",
    params: data
  });
}

// 查询策略商品信息
export function shoppingGoodsQSGinfo (data) {
  return request({
    url: "/shopping/goods/query/strategy/goods/info",
    method: "get",
    params: data
  });
}

// 根据活动ID查询活动详情
export function shoppingActiveQBID (data) {
  return request({
    url: "/shopping/active/query/by/id",
    method: "get",
    params: data
  });
}

// 修改活动的状态
export function shoppingActiveUpdateStatus (data) {
  return request({
    url: "/shopping/active/update/status",
    method: "post",
    data: data,
  });
}

// 分页查询订单列表
export function shoppingOrdersPageList (data) {
  return request({
    url: "/shopping/orders/page/list",
    method: "post",
    data: data,
  });
}

// 分页退款记录订单列表
export function shoppingOrdersRefundPageList (data) {
  return request({
    url: "/shopping/orders/refund/page/list",
    method: "post",
    data: data,
  });
}

// 根据订单ID查询订单详情
export function shoppingOrdersQueryBID (data) {
  return request({
    url: "/shopping/orders/query/by/id",
    method: "get",
    params: data
  });
}

// 根据退款记录查询退款详细
export function shoppingOrdersRefundBID (data) {
  return request({
    url: "/shopping/orders/query/refund/by/id",
    method: "get",
    params: data
  });
}

//活动修改信息
export function shoppingActiveUpdate (data) {
  return request({
    url: "/shopping/active/update",
    method: "post",
    data: data,
  });
}

// 批量导入商品
export function shoppingGoodsImportExcelGoods (data) {
  return request({
    url: "/shopping/goods/import/excel/goods",
    method: "post",
    data: data,
  });
}

// 查询策略列表
export function couponStrategyQueryStrategyBaseList (data) {
  return request({
    url: "/coupon/strategy/queryStrategyBaseList",
    method: "post",
    data: data,
  });
}

//-------------------JCH-----------------------
// 查询策略配置基础信息列表
export function getPaidList (data) {
  return request({
    url: "/coupon/strategy/queryStrategyBaseList",
    method: "post",
    data: data,
  });
}

// 根据策略ID查询策略信息
export function getAddStrategyId (id) {
  return request({
    url: `/coupon/strategy/queryById/${id}`,
    method: "get",
  });
}

// 分类查询支付配置列表
export function getTypePaidList (id) {
  return request({
    url: "/coupon/paid/queryTypePaidList",
    method: "get",
  });
}

// 添加策略
export function getAddStrategy (data) {
  return request({
    url: "/coupon/strategy/add",
    method: "post",
    data: data,
  });
}

// 删除策略
export function getDeleteStrategy (id) {
  return request({
    url: `/coupon/strategy/delete/${id}`,
    method: "get",
  });
}

// 修改策略
export function getUpdateStrategy (data) {
  return request({
    url: "/coupon/strategy/update",
    method: "post",
    data: data,
  });
}

// 查询支付配置列表
export function getSearchPay (data) {
  return request({
    url: "/coupon/paid/queryPaidList",
    method: "post",
    data: data,
  });
}

// 添加支付配置
export function getAddPay (data) {
  return request({
    url: "/coupon/paid/add",
    method: "post",
    data: data,
  });
}

// 删除支付配置信息
export function getDeletePay (id) {
  return request({
    url: `/coupon/paid/delete/${id}`,
  });
}

// 修改支付配置
export function getUpdatePay (data) {
  return request({
    url: "/coupon/paid/update",
    method: "post",
    data: data,
  });
}

// 修改支付配置状态
export function getUpdateStatus (data) {
  return request({
    url: `/coupon/paid/updateStatus/${data.id}/${data.status}`,
  });
}

// 上传证书的接口
export function getCertFile (data) {
  return request({
    url: "/docking/open/certFile",
    method: "post",
    data: data,
  });
}
// -----------






// ------------------------------------------------ADDADDADD------------------------------------------------------------------------------ADDADD-----------------------------ADDADD-----------------
// 上游新增
export function shoppingAupmangerSave (data) {
  return request({
    url: "/shopping/aupmanger/save",
    method: "post",
    data: data,
  });
}

// 查询类型下拉
export function shoppingAuptypeInfoSelectAll () {
  return request({
    url: "/shopping/auptype/info/selectAll",
    method: "get",
  });
}

// 条件查询上游信息
export function shoppingAupmangerInfosSlect (data) {
  return request({
    url: "/shopping/aupmanger/info/selectList",
    method: "post",
    data: data,
  });
}

// 修改状态信息
export function shoppingAupmangerUpdateStatus (data) {
  return request({
    url: "/shopping/aupmanger/update/status",
    method: "post",
    data: data,
  });
}

// 删除上游
export function shoppingAupmangerDelete (data) {
  return request({
    url: "/shopping/aupmanger/delete",
    method: "post",
    data: data,
  });
}

// 上游回显
export function shoppingAupmangerUpdate (data) {
  return request({
    url: "/shopping/aupmanger/update/" + data.id,
    method: "post",
    // data: data,
  });
}

export function shoppingAupmangerUpdateQ (data) {
  return request({
    url: "/shopping/aupmanger/update",
    method: "post",
    data: data,
  });
}


// 产品类型表模块
// 条件查询信息列表
export function shoppingAproducttypeInfoSelectList (data) {
  return request({
    url: "/shopping/aproducttype/info/selectList",
    method: "post",
    data: data,
  });
}

// 产品类型下拉框
export function shoppingAuptypeInfolist () {
  return request({
    url: "/shopping/aproducttype/info/list",
    method: "get",
  });
}

// 新增
export function shoppingAproducttypeSave (data) {
  return request({
    url: "/shopping/aproducttype/save",
    method: "post",
    data: data,
  });
}

// 编辑信息
export function shoppingAproducttypeUpdate (data) {
  return request({
    url: "/shopping/aproducttype/update",
    method: "post",
    data: data,
  });
}

// 删除
export function shoppingAproducttypeDelete (data) {
  return request({
    url: "/shopping/aproducttype/delete",
    method: "post",
    data,
  });
}

// 产品列表模块
// 条件查询信息列表
export function shoppingAproductlistInfoS (data) {
  return request({
    url: "/shopping/aproductlist/info/selectList",
    method: "post",
    data,
  });
}

// 删除
export function shoppingAproductlistDelete (data) {
  return request({
    url: "/shopping/aproductlist/delete",
    method: "post",
    data,
  });
}

// 新增
export function shoppingAproductlistSave (data) {
  return request({
    url: "/shopping/aproductlist/save",
    method: "post",
    data,
  });
}

// 详情信息查询
export function shoppingAproductlistiInfoSBId (data) {
  return request({
    url: "/shopping/aproductlist/info/selectDetails/id",
    method: "post",
    data,
  });
}

// 编辑
export function shoppingAproductlistUpdate (data) {
  return request({
    url: "/shopping/aproductlist/update",
    method: "post",
    data,
  });
}

// 修改状态信息
export function shoppingAproductlistUpdateStatus (data) {
  return request({
    url: "/shopping/aproductlist/update/status",
    method: "post",
    data,
  });
}

// ------------------------------------------

// 下游机构列表
export function getAlowerorgList (data) {
  return request({
    url: "/shopping/alowerorg/list",
    method: "post",
    data,
  });
}

// 删除下游机构信息
export function getAlowerorgDel (data) {
  return request({
    url: "/shopping/alowerorg/deleteInfo?id=" + data,
    method: "post",
  });
}

// 根据机构ID查询机构详情
export function getAlowerorgID (params) {
  return request({
    url: "/shopping/alowerorg/queryInfoById?id=" + params,
  });
}

// 新增下游机构
export function getAlowerorgAdd (data) {
  return request({
    url: "/shopping/alowerorg/add",
    method: "post",
    data,
  });
}

// 修改机构合作状态------------------
export function getAlowerorgStatus (data) {
  return request({
    url: "/shopping/alowerorg/updateStatus?id=" + data.id + '&status=' + data.status,
    method: "post",
  });
}

// 修改渠道机构信息
export function getChannelUpdate (data) {
  return request({
    url: "/shopping/achannel/updateInfo",
    method: "post",
    data,
  });
}

// 修改渠道合作状态
export function getChannelStatus (params) {
  return request({
    url: "/shopping/achannel/updateStatus?id=" + params.id + '&status=' + params.status,
  });
}

// 渠道列表
export function getChannelList (data) {
  return request({
    url: "/shopping/achannel/list",
    method: "post",
    data,
  });
}

// 删除渠道信息
export function getChannelDel (params) {
  return request({
    url: "/shopping/achannel/deleteInfo?id=" + params,
  });
}

// 根据渠道ID查询渠道详情
export function getchannelID (params) {
  return request({
    url: "/shopping/achannel/queryInfoById?id=" + params,
  });
}

// 新增渠道机构
export function getChannelAdd (data) {
  return request({
    url: "/shopping/achannel/add",
    method: "post",
    data,
  });
}

// 修改推广员信息
export function getPromoterUpdate (data) {
  return request({
    url: "/shopping/apromoter/updateInfo",
    method: "post",
    data,
  });
}

// 修改推广员合作状态------------------
export function getPromoterStatus (params) {
  return request({
    url: "/shopping/apromoter/updateStatus?id=" + params.id + '&status=' + params.status,
  });
}

// 推广员列表
export function getPromoterList (data) {
  return request({
    url: "/shopping/apromoter/list",
    method: "post",
    data,
  });
}

// 删除推广员信息
export function getPromoterDel (data) {
  return request({
    url: "/shopping/apromoter/deleteById?id=" + data,
  });
}

// 根据推广员ID查询推广员详情
export function getPromoterID (params) {
  return request({
    url: "/shopping/apromoter/querDetailById?id=" + params,
  });
}

// 新增推广员机构
export function getPromoterAdd (data) {
  return request({
    url: "/shopping/apromoter/add",
    method: "post",
    data,
  });
}

// 新增合作产品
export function getCoopproAdd (data) {
  return request({
    url: "/shopping/acooppro/add",
    method: "post",
    data,
  });
}

// 查询合作产品列表
export function getCoopproList (data) {
  return request({
    url: "/shopping/acooppro/list",
    method: "post",
    data,
  });
}

// 根据合作产品ID查询合作产品详情
export function getCoopproID (params) {
  return request({
    url: "/shopping/acooppro/selectDetailById?coopProId=" + params,
  });
}

// 修改合作产品
export function getCoopproUpdate (data) {
  return request({
    url: "/shopping/acooppro/update",
    method: "post",
    data,
  });
}

// 修改合作产品状态
export function getCoopproStatus (params) {
  return request({
    url: "/shopping/acooppro/updateStatus?id=" + params.id + '&status=' + params.status,
  });
}


// 删除推广员信息
export function getCoopproDel (params) {
  return request({
    url: "/shopping/acooppro/deleteInfo?id=" + params,
  });
}