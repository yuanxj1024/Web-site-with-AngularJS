/*!
 * ����WEB JS FUNCTION 
 * Copyright Xintui
 * @author ZQF
 * @version: 1.0.0
 */
$(document).ready(function () {	

  'use strict';

	//��½TAB�л�
	//var $loginMainTab = $(".loginMainTab li");
	//$loginMainTab.click(function(){
	//	var that = $(this);
	//	$loginMainTab.removeClass("on");
	//	that.addClass("on");

		//�л�Tab��ʱ�����ͬʱ�л���������ݲ���
	//});
  var errMsg = '';

  var mobileCodeHandle = function() {
    var time = 89, btn = $(this),timeid=null,mobile=$('#loginName').val();
    var res = mobile.match(/^\d{11}$/g);
    if(!mobile || mobile.length < 11 || !res){
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
  //绑定获取验证码按钮
  $('#phoneCode').on('click', mobileCodeHandle);

  $('#adowner-form').isHappy({
    submitButton: $('.submit-btn'),
    fields: {
      //'#adowner-form .username':{
      //  required: true,
      //  message: '请输入符合要求的用户名',
      //  trim: true,
      //  test: function(val){
      //    return !!val.match(/^[a-zA-Z][a-zA-Z0-9._]{5,22}$/);
      //  }
      //},
      '#loginName': {
        required: true,
        message: '请输入正确的手机号码',
        trim: true,
        test: function(val){
          return !!val.match(/^\d{11}$/g);
        }
      },
      '#pwd':{
        required: true,
        message: '请输入符合要求的密码',
        trim: true,
        test: function(val){
          return !!val.match(/^[a-zA-Z][a-zA-Z0-9]{5,22}$/);
        }
      },
      '#pwd2':{
        required: true,
        message: '密码输入不一致',
        trim: true,
        test: function(val){
          return val == $('#pwd').val().trim();
        }
      },
      //'#adowner-form .mobile':{
      //  required: true,
      //  message: '请输入正确的手机号码',
      //  trim: true,
      //  test: function(val){
      //    return !!val.match(/^1[0-9]{10}$/);
      //  }
      //},
      '#mobileCode':{
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
      $.ajax({
        url: '/API/User/register',
        method: 'POST',
        data: {
          role: $('[name="role"]').val(),
          mobile: $('#loginName').val(),
          password: $('#mobileCode').val()
        },
        success: function(res) {
          if(typeof res ==='string') {
            res = JSON.parse(res);
          }
          if(!res || res.Status <= 0) {
            errMsg = !!res? res.Message:"注册失败，请稍候重试.";
            alert(errMsg);
          }
          else if (res && res.Status > 0){
            $('#reg-info').hide();
            $('#reg-success').show();
            //location.href = '/';
          }
        },
        error: function(err) {
          errMsg = "注册失败，请稍候重试.";
          alert(errMsg);
        }
      });
    }
  });

	
});