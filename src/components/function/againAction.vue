<template>
  <div id="againAction">
    <div class="container mainDiv">
      <div class="row">
        <div class="col-md-4 col-md-offset-4 text-center">
          <h2>新契约重新进挡</h2>
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
              <input type="text" id="dataGuid" class="form-control" placeholder="保单主键">
            </div>
            <div class="form-group">
              <input type="button" @click="againAction()" value="重新进挡" class="form-control btn btn-info">
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
import backHome from '../backHome';
import Alert from '../Alert';
export default {
  name: "againAction",
  data(){
    return{
      resultText:''
    }
  },
  components:{
    backHome,
    Alert
  },
  methods:{
    againAction:function (){
      let environment = $('#environment').val();
      let productNo = $('#productNo').val();
      let dataGuid = $('#dataGuid').val();

      if(productNo == '' && dataGuid == '' ){
        this.$refs.alert.alert('请录入保单号');
        return;
      }

      let reqdata = {
        'environment':environment,
        'dataGuid':dataGuid,
        'productNo':productNo
      }

      this.resultText = '正在重新进挡...';
      this.$axios.post('/action/againAction',reqdata).then(response => {

        if(response.status == 200 && response.data.status == 'succeed'){
          this.resultText = '重新进挡成功';
        }else {
          if(response.data.message != null){
            this.resultText = response.data.message;
          }else{
            this.resultText = '系统异常';
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