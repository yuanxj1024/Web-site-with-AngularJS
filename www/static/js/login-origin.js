/**
 * Created by AaronYuan on 8/9/15.
 */
$(function () {
  'use strict';

  var username = $('.i-username'),
    password = $('.i-password'),
    code = $('.i-code');


  $('#myTabs a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
  });

  $('.tab-item').on('click', function(){
    $('.tab-item').removeClass('active');
    $(this).addClass('active');
    $('#mediaType').val($(this).attr('data-type'));
  });

  var errMsg = '未知错误!';

  $('.login-btn').on('click', function(){

    if(checkDate()) {
      $.ajax({
        method:'POST',
        url: '/API/User/Login',
        data:$('#login-form').serialize(),
        success:function(result) {
          if(typeof result == 'string') {
            result = JSON.parse(result);
          }
          if(result && result.Status> 0) {
            if($('#mediaType').val() == 1){
              window.location.href = '/home.html#/advertiser/dashboard'
            }else if($('#mediaType').val() == 2){
              window.location.href = '/home.html#/admedia/dashboard'
            }
          }else {
            errMsg = !!result? result.Message: '登陆失败，请稍后再试！';
            $('#errorTipModal').modal('show');
          }
        },
        error: function(){
          errMsg = '登陆服务器异常，请稍后再试！';
          $('#errorTipModal').modal('show');
        }
      });
    }
  });

  $('#errorTipModal').on('show.bs.modal', function(e){
    var modal = $(this);
    modal.find('.modal-body p').text(errMsg);
  });

  var checkDate = function(){
    errMsg = '';
    if(!username.val() || !password.val()) {
      errMsg = "请填写登陆信息";
    }else if(!code.val()) {
      errMsg = '请填写验证码';
    }
    if(!errMsg) {
      return true;
    }else {
      $('#errorTipModal').modal('show');
    }
    return false;
  };


});
