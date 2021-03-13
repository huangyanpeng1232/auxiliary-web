
<template>
  <div id="getElecUrl">
    <div class="container mainDiv">
      <div class="row">
        <div class="col-md-4 col-md-offset-4 text-center">
          <h2>获取电子化回访链接</h2>
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
              <input type="text" id="productNo" class="form-control" placeholder="保单号">
            </div>
            <div class="form-group">
              <input type="text" id="customerNo" class="form-control" placeholder="客户号">
            </div>
            <div class="form-group">
              <input type="text" id="dataGuid" class="form-control" placeholder="保单主键">
            </div>
            <div class="form-group">
              <input type="text" id="idno" class="form-control" placeholder="证件号码">
            </div>
            <div class="form-group">
              <input type="button" id="getUrl" @click="getUrl()" value="获取链接" class="form-control btn btn-info">
            </div>
          </div>

        </div>
      </div>
      <div class="row">
        <div class="col-md-10 col-md-offset-1 text-center resultText">
         <a :href="resultUrl" title="打开链接" target="_blank">{{resultText}}</a>
        </div>
      </div>
    </div>

    <backHome></backHome>
    <Alert ref="alert"></Alert>
  </div>
</template>

<script>
import $ from 'jquery';
import backHome from '../backHome';
import Alert from '../Alert';

export default {
  name: "getElecUrl",
  components:{
    backHome,
    Alert
  },
  data() {
    return {
      resultUrl :'',
      resultText:''
    }
  },
  methods:{
    getUrl:function(){
      let productNo = $('#productNo').val();
      let dataGuid = $('#dataGuid').val();
      let idno = $('#idno').val();
      let customerNo = $('#customerNo').val();

      if(productNo == '' && dataGuid == '' && idno == '' && customerNo == ''){
        this.$refs.alert.alert('请录入保单号或证件号码或客户号码');
        return;
      }

      let reqdata = {
        'environment':$('#environment').val(),
        'type':$('#type').val(),
        'idno':idno,
        'dataGuid':dataGuid,
        'customerNo':$('#customerNo').val(),
        'productNo':productNo
      }
      this.resultUrl = '';
      this.resultText = '正在查询...';
      this.$axios.post('/elec/getElecPath',reqdata).then(response => {

          if(response.status == 200 && response.data.status == 'succeed'){
            this.resultUrl = response.data.url;
            this.resultText = this.resultUrl;
            if(response.data.hasElecAction == 'true'){
              console.log('链接下有待回访保单')
            }else {
              console.log('链接下没有待回访保单')
            }
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


body{
  background-color: rgb(250,250,250);
}
.mainDiv{
  margin-top: 40px;
}
html,body{
  background-color: #F4F5F9;
}
.resultText{
  margin-top: 50px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 6px #ddd;
  padding: 10px;
  min-height: 120px;
}
.formText{
  margin-top: 50px;
}

</style>