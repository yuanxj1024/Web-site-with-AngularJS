/**
 *
 * Created by AaronYuan on 8/11/15.
 */

$(function() {
  'use strict';

  var errMsg = "";

  function getQueryStringByName(name){
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
      return "";
    }
    return result[1];
  }

  var mediaType = getQueryStringByName('mediaType');

  var mobileCodeHandle = function() {
    var time = 89, btn = $(this),timeid=null,mobile=$('.mobile').val();
    if(!mobile || mobile.length < 11){
      alert('请填写正确的手机号码!');
      return ;
    }
    btn.off('click').attr('disabled','disabled');
    var timeChange = function(){
      if(time<= 0) {
        btn.text('获取短信验证码');
        btn.on('click', mobileCodeHandle).attr('disabled', false);
        clearInterval(timeid);
      } else {
        btn.text('('+ (time--) +')秒后重新获取');
      }
    };

    btn.text('('+ (time) +')秒后重新获取');
    timeid = setInterval(timeChange,1000);
  };

  $('.mobile-captcha-btn').on('click', mobileCodeHandle);

  $('.accept-service-agreement-a').on('click', function(){
    $('#agreementModal').modal('show');
  });


  $('#adowner-form').isHappy({
    submitButton: $('#adowner-form .submit-btn'),
    fields: {
      //'#adowner-form .username':{
      //  required: true,
      //  message: '请输入符合要求的用户名',
      //  trim: true,
      //  test: function(val){
      //    return !!val.match(/^[a-zA-Z][a-zA-Z0-9._]{5,22}$/);
      //  }
      //},
      '#adowner-form .password':{
        required: true,
        message: '请输入符合要求的密码',
        trim: true,
        test: function(val){
          return !!val.match(/^[a-zA-Z][a-zA-Z0-9]{5,22}$/);
        }
      },
      '#adowner-form .password-confirm':{
        required: true,
        message: '密码输入不一致',
        trim: true,
        test: function(val){
          return val == $('#adowner-form .password').val().trim();
        }
      },
      '#adowner-form .mobile':{
        required: true,
        message: '请输入正确的手机号码',
        trim: true,
        test: function(val){
          return !!val.match(/^1[0-9]{10}$/);
        }
      },
      '#adowner-form .mobile-code':{
        required: true,
        message: '请输入正确的验证码',
        trim: true,
        test: function(val){
          return !!val.match(/^[0-9]{4}$/);
        }
      }
    },
    happy: function() {
      var data = $('#adowner-form').serialize();
      console.log(data);
      $.ajax({
        url: '/API/User/register',
        method: 'POST',
        data: data,
        success: function(res) {
          if(typeof res ==='string') {
            res = JSON.parse(res);
          }
          if(!res || res.Status <= 0) {
            errMsg = !!res? res.Message:"注册失败，请稍候重试.";
            $('#errorTipModal').modal('show');
          }
          else if (res && res.Status > 0){
            location.href = '/index.html';
          }
        },
        error: function(err) {
          errMsg = "注册失败，请稍候重试.";
          $('#errorTipModal').modal('show');

        }
      });
    }
  });

  $('#errorTipModal').on('show.bs.modal', function(e){
    var modal = $(this);
    modal.find('.modal-body p').text(errMsg);
  });
});
