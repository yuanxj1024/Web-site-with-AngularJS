/**
 *
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/OrderService.ts" />
module WeMedia {
    'use strict';

    declare var window, ZENG;

    interface IDashboardScope extends IWMBaseScope {
        test:Function;
        noticeList: Array<any>;
        orderList: Array<any>;
        getStatus: Function;
    }

    class Dashboard {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IDashboardScope,
            public CommonService: ICommonService,
            public OrderService: IOrderService
        ) {
            $scope.getStatus = angular.bind(this, this.getStatus);
            $scope.test = angular.bind(this,this.test);

            $scope.noticeList = [];
            $scope.orderList = [];
            this.init();

        }
        init() {
            var self = this;
            this.CommonService.noticeList({
                page: 1,
                pageSize: 4
            }).then(function(result){
                if(result && result.Data){
                    self.$scope.noticeList = result.Data;
                }
            }, function(err){
            });

            this.OrderService.list({
            }).then(function(result){
                if(result && result.Data){
                    self.$scope.orderList = result.Data;
                }
            }, function(err){
            });

        }

        test(){
            ZENG.msgbox.show('提示信息,图标类型',1);
        }

        getStatus(code) {
            switch (code *1) {
                default :
                case 1:
                    return '待审核';
                case 2:
                    return '审核中';
                case 3:
                    return '审核未通过';
                case 4:
                    return '取消';
                case 9:
                    return '审核通过';
            }
        }

    }

    Dashboard.$inject = ['$rootScope', '$scope', 'CommonService', 'OrderService'];
    ControllerModule.controller('DashboardCtrl', Dashboard);

}

