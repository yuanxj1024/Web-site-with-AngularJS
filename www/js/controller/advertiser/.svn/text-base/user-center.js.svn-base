/**
 * Created by AaronYuan on 8/13/15.
 */
///<reference path="../../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var UserCenter = (function () {
        function UserCenter($rootScope, $scope, $cookies, AuthService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$cookies = $cookies;
            this.AuthService = AuthService;
            $scope.save = angular.bind(this, this.save);
            $scope.savePwd = angular.bind(this, this.savePwd);
            $scope.tabIndex = 0;
            $scope.form = $rootScope.user;
        }
        UserCenter.prototype.save = function ($valid) {
            if (!$valid) {
                ZENG.msgbox.show('您输入的数据格式不正确，无法保存!', 1);
                return;
            }
            var self = this;
            this.$scope.form.mediaType = this.$rootScope.isAdOwner ? 1 : 2;
            this.AuthService.saveAdvertiser(this.$scope.form).then(function (result) {
                if (result && typeof result == 'string') {
                    result = JSON.parse(result);
                }
                if (result && result.Status > 0) {
                    self.$rootScope.user = self.$scope.form;
                    self.AuthService.userInfo(self.$scope.form);
                    window.navigator.notification.alert('数据保存成功!');
                }
                else {
                    window.navigator.notification.alert('数据保存失败，请稍后重试');
                }
            }, function (err) {
                if (err && typeof err == 'string') {
                    err = JSON.parse(err);
                }
                var msg = !!err && err['Message'] ? err['Message'] : '数据保存失败，请稍后重试';
                window.navigator.notification.alert(msg);
            });
        };
        UserCenter.prototype.savePwd = function () {
            var self = this;
            if (self.$scope.pwdForm.newPwd != self.$scope.pwdForm.confirmPwd) {
                ZENG.msgbox.show('两次输入的密码不一致!', 1);
                return;
            }
            if (!self.$scope.pwdForm.newPwd.match(/^[a-zA-Z][a-zA-Z0-9]{5,22}/)) {
                ZENG.msgbox.show('密码格式为6-22位小写字母或数字组合，首字符必须为小写字母!', 1);
                return;
            }
            this.AuthService.updatePassword(this.$scope.pwdForm.oldPwd, this.$scope.pwdForm.confirmPwd, this.$rootScope.isAdOwner ? 1 : 2).then(function (result) {
                if (result && typeof result == 'string') {
                    result = JSON.parse(result);
                }
                if (result && result.Status > 0) {
                    self.$scope.pwdForm = {
                        oldPwd: '',
                        newPwd: '',
                        confirmPwd: ''
                    };
                    window.navigator.notification.alert('数据保存成功!');
                }
                else {
                    window.navigator.notification.alert('数据保存失败，请稍后重试');
                }
            }, function (err) {
                window.navigator.notification.alert('数据保存失败，请稍后重试');
            });
        };
        return UserCenter;
    })();
    UserCenter.$inject = ['$rootScope', '$scope', '$cookies', 'AuthService'];
    WeMedia.ControllerModule.controller('UserCenterCtrl', UserCenter);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=user-center.js.map