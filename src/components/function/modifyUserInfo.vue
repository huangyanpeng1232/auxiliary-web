<template>
<div id="modifyUserInfo">
  <div class="container mainDiv">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 text-center">
        <h2>修改投保人信息</h2>
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
            <input type="text" id="productNo" class="form-control" placeholder="保单号">
          </div>
          <div class="form-group">
            <input type="text" id="customerNo" class="form-control" placeholder="客户号">
          </div>
          <div class="form-group">
            <input type="text" id="dataGuid" class="form-control" placeholder="保单主键">
          </div>
        </div>
      </div>
      <div class="col-md-4 col-md-offset-4 formText">
        <div class="title">
          修改部分
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <input type="text" id="celler" class="form-control" placeholder="手机号">
          </div>
          <div class="form-group">
            <input type="text" id="idno" class="form-control" placeholder="证件号码">
          </div>
          <div class="form-group">
            <input type="text" id="name" class="form-control" placeholder="投保人姓名">
          </div>
          <div class="form-group">
            <input type="button" @click="modifyUserInfo()" value="修改投保人信息" class="form-control btn btn-info">
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 col-md-offset-1 text-center resultText">{{resultText}}</div>
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
  name: "modifyUserInfo",
  components:{
    backHome,
    Alert
  },
  data(){
    return{
      resultText:''
    }
  },
  methods:{
    modifyUserInfo:function (){
      let environment = $('#environment').val();
      let productNo = $('#productNo').val();
      let customerNo = $('#customerNo').val();
      let dataGuid = $('#dataGuid').val();
      if(productNo == '' && dataGuid == '' && customerNo == ''){
        this.$refs.alert.alert('请录入保单号或客户号');
        return;
      }

      let celler = $('#celler').val();
      let idno = $('#idno').val();
      let name = $('#name').val();
      if(celler == '' && idno == '' && name == ''){
        this.$refs.alert.alert('请至少修改一项信息');
        return;
      }

      let reqdata = {
        'environment':environment,
        'dataGuid':dataGuid,
        'productNo':productNo,
        'customerNo':customerNo,
        'celler':celler,
        'idno':idno,
        'name':name
      }
      this.resultText = '正在修改...'
      axis.post('/api/elec/modifyUserInfo',reqdata).then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.resultText = '修改成功';
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
.title{
  margin-bottom: 10px;
  color: #666;
  margin-left: -15px;
  font-size: 18px;
}
</style>