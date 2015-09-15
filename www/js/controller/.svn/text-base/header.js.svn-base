/**
 * Created by AaronYuan on 8/8/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../auth.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    //预约活动类型
    (function (PrecontractEnum) {
        PrecontractEnum[PrecontractEnum["star"] = 1] = "star";
        //公众号
        PrecontractEnum[PrecontractEnum["wechat"] = 2] = "wechat";
        PrecontractEnum[PrecontractEnum["weibo"] = 3] = "weibo";
        //微信朋友圈
        PrecontractEnum[PrecontractEnum["friend"] = 4] = "friend";
    })(WeMedia.PrecontractEnum || (WeMedia.PrecontractEnum = {}));
    var PrecontractEnum = WeMedia.PrecontractEnum;
    var HeaderCtrl = (function () {
        function HeaderCtrl($rootScope, $scope, $state, Auth) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.Auth = Auth;
            $scope.logout = angular.bind(this, this.logout);
            $scope.precontract = angular.bind(this, this.precontract);
            $scope.stateName = $state.current.name;
            $scope.userName = $rootScope.user.UserName || $rootScope.user['Company'] || $rootScope.user['Mobile'];
            console.log('isadowner:' + $rootScope.isAdOwner);
        }
        HeaderCtrl.prototype.precontract = function (type) {
            if (type === void 0) { type = 1 /* star */; }
            this.$state.go('precontract', {
                'actionType': type
            }, {});
        };
        HeaderCtrl.prototype.logout = function () {
            this.Auth.logout();
        };
        return HeaderCtrl;
    })();
    HeaderCtrl.$inject = ['$rootScope', '$scope', '$state', 'AuthService'];
    WeMedia.ControllerModule.controller('HeaderCtrl', HeaderCtrl);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=header.js.map