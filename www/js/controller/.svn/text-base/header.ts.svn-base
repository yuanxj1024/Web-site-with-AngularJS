/**
 * Created by AaronYuan on 8/8/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../auth.ts" />
module WeMedia {
    'use strict';

    export interface IHeaderScope extends ng.IScope {
        //预约活动
        precontract:Function;
        currentMediaType: number;

        stateName: string;
        userName: string;
        logout: Function;
    }
    //预约活动类型
    export enum PrecontractEnum {
        star = 1,
        //公众号
        wechat = 2,
        weibo = 3,
        //微信朋友圈
        friend = 4
    }

    class HeaderCtrl {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IHeaderScope,
            public $state: ng.ui.IStateService,
            public Auth: IAuthInfoService

        ) {
            $scope.logout = angular.bind(this, this.logout);
            $scope.precontract = angular.bind(this, this.precontract);
            $scope.stateName = $state.current.name;
            $scope.userName = $rootScope.user.UserName || $rootScope.user['Company'] ||$rootScope.user['Mobile'];

        }

        precontract(type: PrecontractEnum = PrecontractEnum.star): void {
            this.$state.go('precontract',{
                'actionType': type
            }, {});
        }

        logout() {
            this.Auth.logout();
        }


    }

    HeaderCtrl.$inject = ['$rootScope', '$scope', '$state','AuthService'];
    ControllerModule.controller('HeaderCtrl', HeaderCtrl);
}