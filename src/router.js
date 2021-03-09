import Vue from "vue";
import VueRouter from "vue-router";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 引入组件
import index from "./components/index";
import getElecUrl from "./components/function/getElecUrl";
import toElec from "./components/function/toElec";
import modifyUserInfo from "./components/function/modifyUserInfo";
import againAction from "./components/function/againAction";
import runFunction from "./components/function/runFunction";
import getAvailableElecPath from "./components/function/getAvailableElecPath";

const routes = [
    {
        path:"/",
        component: index
    },
    {
        path:"/getElecUrl",
        component: getElecUrl
    },
    {
        path:"/toElec",
        component: toElec
    },
    {
        path:"/modifyUserInfo",
        component: modifyUserInfo
    },
    {
        path:"/againAction",
        component: againAction
    },
    {
        path:"/runFunction",
        component: runFunction
    },
    {
        path:"/getAvailableElecPath",
        component: getAvailableElecPath
    }
]

var router =  new VueRouter({
    mode: 'history',
    routes
})
export default router;