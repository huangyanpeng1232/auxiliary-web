<template>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="myModalLabel">提示</h4>
        </div>
        <div class="modal-body">{{alertContent}}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">好的</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: "Alert",
  data(){
    return{
      alertContent: '1'
    }
  },
  methods:{
    alert:function (content){
      this.alertContent = content
      $('#myModal').modal('show')
    }
  }
}
</script>

<style scoped>
.modal-body{
  font-size: 18px;
}
</style>