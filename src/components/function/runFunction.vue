<template>
  <div id="toElec">
    <div class="container mainDiv">
      <div class="row">
        <div class="col-md-4 col-md-offset-4 text-center">
          <h2>手动执行批处理</h2>
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
              <select id="function" ref="functionList" class="form-control">
                <option v-for="fun in functionList" :value="fun.id" :key="fun.id">{{fun.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <input type="button" @click="run()" value="确认触发" class="form-control btn btn-info">
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
  name: "toElec",
  data(){
    return{
      resultText:'',
      functionList:[]
   }
  },
  components:{
    backHome,
    Alert
  },
  created() {
    axis.post('/api/runFunction/getRunFunctionList').then(response => {

      if(response.status == 200 && response.data.status == 'succeed'){
        this.functionList = eval(response.data.functionList);
      }else {
        if(response.data.message != null){
          this.resultText = response.data.message;
        }else{
          this.resultText = '系统异常'
        }
      }
    })
  }
  ,methods:{
    run:function (){
      let environment = $('#environment').val();
      let id = this.$refs.functionList.value;

      if(id == ''){
        this.$refs.alert.alert('请选择要触发的方法');
        return;
      }

      let reqdata = {
        'environment':environment,
        'id':id
      }

      this.resultText = '请稍等...';
      axis.post('/api/runFunction/runFunction',reqdata).then(response => {
        if(response.status == 200 && response.data.status == 'succeed'){
          this.resultText = '执行成功';
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