/**
 * Created by AaronYuan on 9/9/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../config.ts" />
/// <reference path="../../service/modal.ts" />
/// <reference path="../../service/OrderService.ts" />

module WeMedia {
    'use strict';

    declare var window;

    export interface IPrecontractListScope extends IWMBaseScope {
        dataList: Array<any>;
        showDetail: Function;
        removeItem: Function;
        editItem: Function;

        getStatus: Function;

        currentPageIndex: number;
        totalItems: number;
        pageSize: number;
        pageChanged: Function;

    }

    class PrecontractList {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IPrecontractListScope,
            public $state: ng.ui.IStateService,
            public $stateParams: IWMStateParamsService,
            public OrderService: IOrderService
        ){
            $scope.showDetail = angular.bind(this, this.showDetail);
            $scope.removeItem = angular.bind(this, this.removeItem);
            $scope.editItem = angular.bind(this, this.editItem);
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.getStatus = angular.bind(this, this.getStatus);

            $scope.currentMediaType = $stateParams.mediaType * 1;

            this.init();

            this.refresh();

        }
        init() {
            this.$scope.currentPageIndex = 1;
            this.$scope.totalItems = 0 ;
            this.$scope.pageSize = 15;
        }

        showDetail(id:number) {


        }
        removeItem(id:number) {
            var self = this;
            window.navigator.notification.confirm('确定取消预约吗?',function(index){
                if(index == 1){
                    self.OrderService.cancel(id).then(function(result){
                        if(result && result.Status ==1){
                            window.navigator.notification.alert('操作成功!')
                        }else{
                            window.navigator.notification.alert('操作失败，请稍后重试!')
                        }
                    },function(err){
                        window.navigator.notification.alert('操作失败，请稍后重试!')
                    });
                }
            }, '取消预约', ['确定', '取消']);

        }
        editItem(id: number) {
            console.log(id);
            var stats = {
                2: 'advertiser.wechatprecontract',
                3: 'advertiser.weiboprecontract',
                4: 'advertiser.friendsprecontract'
            };
            this.$state.go(stats[this.$scope.currentMediaType],{ editID: id});
        }

        pageChanged(index) {
            this.$scope.currentPageIndex = index;
            this.refresh();
        }

        refresh(args = {}){
            var self = this;
            this.$scope.dataList = [];
            args = angular.extend(args, {
                pageIndex: self.$scope.currentPageIndex,
                pageSize: self.$scope.pageSize
            });
            this.OrderService.list(args).then(function(result){
                if(result && result.Data){
                    self.$scope.dataList = result.Data || [];
                    self.$scope.totalItems = result.TotalItems || 0;
                }else {
                    self.$scope.totalItems = 0;
                }
            }, function(err){
                self.$scope.totalItems = 0;
            });
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

    PrecontractList.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'OrderService'];
    ControllerModule.controller('PrecontractListCtrl', PrecontractList);

}
