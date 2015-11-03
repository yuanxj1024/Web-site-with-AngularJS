/**
 * Created by AaronYuan on 8/13/15.
 */

///<reference path="../../app.ts" />

module  WeMedia {
    'use strict';

    declare var window,ZENG;

    interface  IUserCenterScope extends IWMBaseScope {
        form: any;
        pwdForm:any;
        save: Function;
        tabIndex: number;
        savePwd:Function;
    }

    class UserCenter {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IUserCenterScope,
            public $cookies : ng.cookies.ICookieStoreService,
            public AuthService: IAuthInfoService
        ) {
            $scope.save = angular.bind(this, this.save);
            $scope.savePwd = angular.bind(this, this.savePwd);
            $scope.tabIndex = 0;

            $scope.form = $rootScope.user;
        }

        save($valid):void {
            if(!$valid) {
                ZENG.msgbox.show('请将数据填写完整!',1);
                return;
            }
            var self = this;
            this.$scope.form.mediaType = this.$rootScope.isAdOwner ? 1: 2;
            this.AuthService.saveAdvertiser(this.$scope.form).then(function(result){
                if(result && typeof result == 'string') {
                    result = JSON.parse(result);
                }
                if(result && result.Status > 0) {
                    self.$rootScope.user = self.$scope.form;
                    self.AuthService.userInfo(self.$scope.form);
                    //window.navigator.notification.alert('数据保存成功!');
                    ZENG.msgbox.show('数据保存成功',4);
                    self.$rootScope.goToIndex();
                }else {
                    window.navigator.notification.alert('数据保存失败，请稍后重试');
                }

            }, function(err){
                if(err && typeof err == 'string') {
                    err = JSON.parse(err);
                }
                var msg = !!err && err['Message'] ? err['Message']: '数据保存失败，请稍后重试';
                window.navigator.notification.alert(msg);
            });
        }

        savePwd($valid){
            var self = this;
            if(!$valid){
                ZENG.msgbox.show('请填写密码!',1);
                return;
            }
            if(self.$scope.pwdForm.newPwd != self.$scope.pwdForm.confirmPwd){
                ZENG.msgbox.show('两次输入的密码不一致!',1);
                return;
            }
            if(!self.$scope.pwdForm.newPwd.match(/^[a-zA-Z][a-zA-Z0-9]{5,22}/)){
                ZENG.msgbox.show('密码格式为6-22位小写字母或数字组合，首字符必须为小写字母!',1);
                return;
            }
            this.AuthService.updatePassword(this.$scope.pwdForm.oldPwd,this.$scope.pwdForm.confirmPwd,this.$rootScope.isAdOwner?1: 2).then(function(result){
                if(result && typeof result == 'string') {
                    result = JSON.parse(result);
                }
                if(result && result.Status > 0) {
                    self.$scope.pwdForm = {
                        oldPwd: '',
                        newPwd: '',
                        confirmPwd: ''
                    };
                    window.navigator.notification.alert('数据保存成功!');
                }else {
                    window.navigator.notification.alert('数据保存失败，请稍后重试');
                }
            }, function(err){
                window.navigator.notification.alert('数据保存失败，请稍后重试');

            });

        }

    }

    UserCenter.$inject = ['$rootScope','$scope', '$cookies', 'AuthService'];
    ControllerModule.controller('UserCenterCtrl', UserCenter);
}
