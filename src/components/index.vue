<template>
  <div class="index">
    <div class="case-container">
      <div class="case-index-title">
        <h2>客服系统辅助功能</h2>
      </div>
      <div class="case-index-content">
        <ul class="clearfix">
          <li class="case-example-item" v-for="fun in functionArray" v-show="fun.open" :key="fun.title">
            <router-link v-bind:to="fun.uri">
              <img :src="fun.imgUrl" class="case-pad">
              <div class="case-item-info">
                <div class="case-info-title"><h3>{{ fun.title }}</h3></div>
                <div class="case-info-text">{{ fun.details }}</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      functionArray: [
        {
          title: '获取电子化回访链接',
          uri: '/getElecUrl',
          open:true,
          details: '获取客服系统中可用的电子化回访链接',
          imgUrl: 'https://auxiliary-web.oss-cn-beijing.aliyuncs.com/actions/img001.jpg'
        },
        {
          title: '强制进行电子化回访',
          uri: '/toElec',
          open:true,
          details: '将指定保单强制转为可电子化回访状态',
          imgUrl: 'https://auxiliary-web.oss-cn-beijing.aliyuncs.com/actions/img002.jpg'
        },
        {
          title: '新契约保单重新进挡',
          uri: '/againAction',
          open:true,
          details: '针对保单数据异常、记录异常等情况，可以使用重新进挡功能恢复数据原始状态',
          imgUrl: 'https://auxiliary-web.oss-cn-beijing.aliyuncs.com/actions/img003.jpg'
        },
        {
          title: '修改投保人信息',
          uri: '/modifyUserInfo',
          open:true,
          details: '此功能可以修改投保人身份信息，便于通过电子化回访人脸认证',
          imgUrl: 'https://auxiliary-web.oss-cn-beijing.aliyuncs.com/actions/img004.jpg'
        },
        {
          title: '重新启动测试环境',
          uri: '',
          open:false,
          details: '此功能可以重启sit、uat、stg测试环境。慎用！',
          imgUrl: 'https://auxiliary-web.oss-cn-beijing.aliyuncs.com/actions/img005.jpg'
        },
        {
          title: '手动触发批处理',
          uri: '/runFunction',
          open:true,
          details: '此方法可以手动运行批处理、动态触发正在运行中的程序逻辑',
          imgUrl: 'https://auxiliary-web.oss-cn-beijing.aliyuncs.com/actions/img006.jpg'
        },
        {
          title: '保单信息查询',
          uri: '',
          open:false,
          details: '扩展客服系统保单信息查询功能，快速找到想要的信息',
          imgUrl: 'https://auxiliary-web.oss-cn-beijing.aliyuncs.com/actions/img007.jpg'
        },
        {
          title: '批量获取电子化回访链接',
          uri: '/getAvailableElecPath',
          open:true,
          details: '快速获取测试环境可以进行电子化回访的保单回访链接',
          imgUrl: 'https://auxiliary-web.oss-cn-beijing.aliyuncs.com/actions/img008.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
@import "../assets/index/css/style.css";
body{
  background-color: rgb(250,250,250);
}
.case-example-item:hover{
  box-shadow: 4px 4px 6px #bbb;
}
.case-index-title h2{
  letter-spacing: 10px;
}
</style>
