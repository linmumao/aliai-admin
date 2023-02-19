import Vue from "vue";
import Router from "vue-router";
import { localGet, localRemove } from "@/utils/local.js";
import { Message } from "element-ui";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/accountSecurity",
    name: "accountSecurity",
    component: () => import("../views/accountSecurity.vue"),
    redirect: "/accountSecurity/changePassword",
    children: [
      {
        path: "/accountSecurity/changePassword",
        name: "changePassword",
        component: () => import("../views/ASecurity/changePassword.vue"),
      },
      {
        path: "/accountSecurity/successfully",
        name: "successfully",
        component: () => import("../views/ASecurity/successfully.vue"),
      },
      {
        path: "/accountSecurity/retrieve",
        name: "retrieve",
        component: () => import("../views/ASecurity/retrieve.vue"),
      },
      {
        path: "/accountSecurity/reset",
        name: "reset",
        component: () => import("../views/ASecurity/reset.vue"),
      }
    ]
  },
  {
      path: "/topTitle",
      name: "topTitle",
      component: () => import("../views/topTitle.vue"),
      redirect: "/addweb/xinzeng/WorkBench",
      children: [
          {
            path: "/addweb/homePage",
            name: "homePage",
            component: () => import("../views/homePage.vue"),
          },
          {
            // 工作台
            path: "/addweb/xinzeng/WorkBench",
            name: "WorkBench",
            component: () => import("../views/xinzeng/WorkBench.vue"),
          },
          {
            //前往审核台
            path: "/addweb/xinzeng/ExaminePage",
            name: "ExaminePage",
            component: () => import("../views/xinzeng/ExaminePage.vue"),
            hidden: true,
            meta: {
              activeMenu: "/addweb/xinzeng/WorkBench",
            },
          },
          {
            // 活动面板
            path: "/addweb/xinzeng/ActivityPanel",
            name: "ActivityPanel",
            component: () => import("../views/xinzeng/ActivityPanel.vue"),
          },
          {
            //活动类型
            path: "/addweb/xinzeng/DetailsPages",
            name: "WorkBench",
            component: () => import("../views/xinzeng/DetailsPages.vue"),
          },
          {
            //活动类型新增
            path: "/addweb/xinzeng/HuodongXingzeng",
            name: "HuodongXingzeng",
            component: () => import("../views/xinzeng/HuodongXingzeng.vue"),
            hidden: true,
            meta: {
              activeMenu: "/addweb/xinzeng/DetailsPages",
            },
          },
          {
            //外部活动列表
            path: "/addweb/xinzeng/WaiActivityList",
            name: "WaiActivityList",
            component: () => import("../views/xinzeng/WaiActivityList.vue"),
          },
          {
            //查看外部活动列表
            path: "/addweb/xinzeng/AddWaiActivityList",
            name: "AddWaiActivityList",
            component: () => import("../views/xinzeng/AddWaiActivityList.vue"),
            hidden: true,
            meta: {
              activeMenu: "/addweb/xinzeng/WaiActivityList",
            },
          },
          {
            //外部活动列表-申请活动
            path: "/addweb/xinzeng/shenqinghuodong",
            name: "shenqinghuodong",
            component: () => import("../views/xinzeng/shenqinghuodong.vue"),
            hidden: true,
            meta: {
              activeMenu: "/addweb/xinzeng/WaiActivityList",
            },
          },
          {
            //内部活动列表
            path: "/addweb/xinzeng/NeiActivityList",
            name: "NeiActivityList",
            component: () => import("../views/xinzeng/NeiActivityList.vue"),
          },
          {
            //新增||编辑内部活动列表
            path: "/addweb/xinzeng/AddNeiActivityList",
            name: "AddNeiActivityList",
            component: () => import("../views/xinzeng/AddNeiActivityList.vue"),
            hidden: true,
            meta: {
              activeMenu: "/addweb/xinzeng/NeiActivityList",
            },
          },
          {
            //银行管理
            path: "/addweb/xinzeng/BankManagement",
            name: "BankManagement",
            component: () => import("../views/xinzeng/BankManagement.vue"),
          },
          {
            //支行管理
            path: "/addweb/xinzeng/SubBranchManagement",
            name: "SubBranchManagement",
            component: () => import("../views/xinzeng/SubBranchManagement.vue"),
          },
          {
            //权限管理
            path: "/addweb/xinzeng/PermissionManagement",
            name: "PermissionManagement",
            component: () => import("../views/xinzeng/PermissionManagement.vue"),
          },
          {
            //用户管理
          path: "/addweb/systemManagement/MembersManagement",
          name: "membersManagement",
          component: () =>
            import("../views/systemManagement/membersManagement.vue"),
          },
          {
            //角色管理
            path: "/addweb/systemManagement/RightsManagement",
            name: "rightsManagement",
            component: () =>
              import("../views/systemManagement/rightsManagement.vue"),
          },
          {
            //机构管理
            path: "/addweb/systemManagement/OrganizationManagement",
            name: "organizationManagement",
            component: () =>
              import("../views/systemManagement/organizationManagement.vue"),
          },
          {
            //个人中心
            path: "/addweb/systemManagement/PersonalData",
            name: "personalData",
            component: () => import("../views/systemManagement/personalData.vue"),
          },
          {
            //用户管理
            path: "/addweb/systemManagement/AddMember",
            name: "addMember",
            hidden: true,
            component: () => import("../views/systemManagement/addMember.vue"),
            meta: {
              activeMenu: "/addweb/systemManagement/membersManagement",
            },
          },
          // {
          //   path: "/addweb/systemManagement/LogManage",
          //   name: "logManage",
          //   component: () => import("../views/systemManagement/logManage.vue"),
          // },
          {
            path: "/addweb/systemManagement/AddOrganization",
            name: "addOrganization",
            hidden: true,
            component: () =>
              import("../views/systemManagement/addOrganization.vue"),
            meta: {
              activeMenu: "/addweb/systemManagement/organizationManagement",
            },
          },

      ]  
  },
  // {
  //   path: "/topTitle",
  //   name: "topTitle",
  //   component: () => import("../views/topTitle.vue"),
  //   redirect: "/addweb/homePage",
  //   children: [
  //     {
  //       path: "/addweb/homePage",
  //       name: "homePage",
  //       component: () => import("../views/homePage.vue"),
  //     },
  //     {
  //       path: "/addweb/systemManagement/membersManagement",
  //       name: "membersManagement",
  //       component: () =>
  //         import("../views/systemManagement/membersManagement.vue"),
  //     },
  //     {
  //       path: "/addweb/systemManagement/rightsManagement",
  //       name: "rightsManagement",
  //       component: () =>
  //         import("../views/systemManagement/rightsManagement.vue"),
  //     },
  //     {
  //       path: "/addweb/systemManagement/organizationManagement",
  //       name: "organizationManagement",
  //       component: () =>
  //         import("../views/systemManagement/organizationManagement.vue"),
  //     },
  //     {
  //       path: "/addweb/systemManagement/personalData",
  //       name: "personalData",
  //       component: () => import("../views/systemManagement/personalData.vue"),
  //     },
  //     {
  //       path: "/addweb/systemManagement/addMember",
  //       name: "addMember",
  //       hidden: true,
  //       component: () => import("../views/systemManagement/addMember.vue"),
  //       meta: {
  //         activeMenu: "/addweb/systemManagement/membersManagement",
  //       },
  //     },
  //     {
  //       path: "/addweb/systemManagement/logManage",
  //       name: "logManage",
  //       component: () => import("../views/systemManagement/logManage.vue"),
  //     },
  //     {
  //       path: "/addweb/systemManagement/addOrganization",
  //       name: "addOrganization",
  //       hidden: true,
  //       component: () =>
  //         import("../views/systemManagement/addOrganization.vue"),
  //       meta: {
  //         activeMenu: "/addweb/systemManagement/organizationManagement",
  //       },
  //     },
  //     // 产品管理
  //     {
  //       path: "/addweb/productM/upstreamM",
  //       name: "upstreamM",
  //       component: () => import("../views/productM/upstreamM.vue"),
  //     },
  //     {
  //       path: "/addweb/productM/addUpstream",
  //       name: "addUpstream",
  //       hidden: true,
  //       component: () => import("../views/productM/addUpstream.vue"),
  //       meta: {
  //         activeMenu: "/addweb/productM/upstreamM",
  //       },
  //     },
  //     {
  //       path: "/addweb/productM/productType",
  //       name: "productType",
  //       component: () => import("../views/productM/productType.vue"),
  //     },
  //     {
  //       path: "/addweb/productM/productList",
  //       name: "productList",
  //       component: () => import("../views/productM/productList.vue"),
  //     },
  //     {
  //       path: "/addweb/productM/add_editProduct",
  //       name: "add_editProduct",
  //       hidden: true,
  //       component: () => import("../views/productM/add_editProduct.vue"),
  //       meta: {
  //         activeMenu: "/addweb/productM/productList",
  //       },
  //     },
  //     // 下游管理
  //     {
  //       path: "/addweb/downstreamManagement/institutionsList",
  //       name: "institutionsList",
  //       component: () => import("../views/downstreamManagement/institutionsList.vue"),
  //     },
  //     {
  //       path: "/addweb/downstreamManagement/addMechanism",
  //       name: "addMechanism",
  //       hidden: true,
  //       component: () => import("../views/downstreamManagement/addMechanism.vue"),
  //       meta: {
  //         activeMenu: "/addweb/downstreamManagement/institutionsList",
  //       },
  //     },
  //     {
  //       path: "/addweb/downstreamManagement/channelList",
  //       name: "channelList",
  //       component: () => import("../views/downstreamManagement/channelList.vue"),
  //     },
  //     {
  //       path: "/addweb/downstreamManagement/promotersList",
  //       name: "promotersList",
  //       component: () => import("../views/downstreamManagement/promotersList.vue"),
  //     },
  //     {
  //       path: "/addweb/downstreamManagement/accountBalance",
  //       name: "accountBalance",
  //       hidden: true,
  //       component: () => import("../views/downstreamManagement/accountBalance.vue"),
  //       meta: {
  //         activeMenu: "/addweb/downstreamManagement/promotersList",
  //       },
  //     },
  //     {
  //       path: "/addweb/downstreamManagement/cooperativeNumber",
  //       name: "cooperativeNumber",
  //       component: () => import("../views/downstreamManagement/cooperativeNumber.vue"),
  //     },
  //     {
  //       path: "/addweb/downstreamManagement/productDetail",
  //       name: "productDetail",
  //       hidden: true,
  //       component: () => import("../views/downstreamManagement/productDetail.vue"),
  //       meta: {
  //         activeMenu: "/addweb/downstreamManagement/cooperativeNumber",
  //       },
  //     },
  //   ],
  // },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  var userInfo = localGet();
  if (userInfo) {
    next();
  } else {
    if (to.path == "/" || to.path == "/accountSecurity/retrieve" || to.path == "/accountSecurity/successfully" || to.path == "/accountSecurity/changePassword" || to.path == "/accountSecurity/reset") {
      next();
    } else {
      Message.error("请重新登录");
      localRemove();
      next("/");
    }
  }
});

export default router;
