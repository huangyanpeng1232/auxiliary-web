<template>
  <div id="toElec">
    <div class="container mainDiv">
      <div class="row">
        <div class="col-md-4 col-md-offset-4 text-center">
          <h2>获取可用的电子化回访链接</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-md-offset-4 formText">
          <div class="form-horizontal">
            <div class="form-group">
              <select id="environment" class="form-control">
                <option value="sit">SIT</option>
                <option value="uat">UAT</option>
                <option value="stg">STG</option>
              </select>
            </div>
            <div class="form-group">
              <select id="type" class="form-control">
                <option value="1">短信回访介绍界面</option>
                <option value="2">短信回访跳过身份验证</option>
                <option value="3">第三方回访介绍界面</option>
                <option value="4">第三方回访跳过身份验证</option>
              </select>
            </div>
            <div class="form-group">
              <input type="number" id="count" class="form-control" value="5" placeholder="获取数量(默认5)">
            </div>
            <div class="form-group">
              <input type="text" id="organCode" class="form-control" placeholder="机构代码(可选)">
            </div>
            <div class="form-group">
              <input type="text" id="channelCode" class="form-control" placeholder="渠道(可选)">
            </div>
            <div class="form-group">
              <input type="button" @click="getElec()" value="一键获取" class="form-control btn btn-info">
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-10 col-md-offset-1 text-center resultText" v-html="resultText"></div>
      </div>
    </div>
    <backHome></backHome>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import $ from 'jquery';
import axis from "axios";
import backHome from '../backHome';
import Alert from '../Alert';

export default {
  name: "toElec",
  data(){
    return{
      resultText:'',
      urls:[]
   }
  },
  components:{
    backHome,
    Alert
  },methods:{
    getElec:function (){
      let environment = $('#environment').val();
      let count = $('#count').val();
      let type = $('#type').val();
      let organCode = $('#organCode').val();
      let channelCode = $('#channelCode').val();

      if(count <= 0){
        count = 5;
      }


      let reqdata = {
        'environment':environment,
        'count':count,
        'type':type,
        'organCode':organCode,
        'channelCode':channelCode
      }

      this.resultText = '正在获取...';
      axis.post('/api/elec/getAvailableElecPath',reqdata).then(response => {

        if(response.status == 200 && response.data.status == 'succeed'){

          let content = '';
          this.urls = eval(response.data.pathArray);
          for(let i = 0;i<this.urls.length;i++){
            content += '<a href="'+this.urls[i]+'" target="_blank">'+this.urls[i]+'</a><br/>'
          }
          this.resultText = content;
        }else {
          if(response.data.message != null){
            this.resultText = response.data.message;
          }else{
            this.resultText = '系统异常'
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.mainDiv{
  margin-top: 40px;
}
.formText{
  margin-top: 50px;
}
</style>