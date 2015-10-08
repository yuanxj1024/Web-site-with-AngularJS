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
        removeItem: Function;
        editItem: Function;

        getStatus: Function;

        currentPageIndex: number;
        totalItems: number;
        pageSize: number;
        pageChanged: Function;
        openDetail: Function;

    }

    class PrecontractList {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IPrecontractListScope,
            public $state: ng.ui.IStateService,
            public $stateParams: IWMStateParamsService,
            public OrderService: IOrderService
        ){
            $scope.removeItem = angular.bind(this, this.removeItem);
            $scope.editItem = angular.bind(this, this.editItem);
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.getStatus = angular.bind(this, this.getStatus);
            $scope.openDetail = angular.bind(this, this.openDetail);

            $scope.currentMediaType = $stateParams.mediaType * 1;

            this.init();

            this.refresh();

        }
        init() {
            this.$scope.currentPageIndex = 1;
            this.$scope.totalItems = 0 ;
            this.$scope.pageSize = 15;
        }

        removeItem(id:number) {
            var self = this;
            window.navigator.notification.confirm('确定取消预约吗?',function(index){
                if(index == 1){
                    self.OrderService.cancel(id).then(function(result){
                        if(result && result.Status ==1){
                            self.refresh();
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
            var stats = {
                2: 'advertiser.wechatprecontract',
                1: 'advertiser.weiboprecontract',
                3: 'advertiser.friendsprecontract'
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
                userID: self.$rootScope.user.ID,
                pageIndex: self.$scope.currentPageIndex,
                pageSize: self.$scope.pageSize,
                channelID: this.$scope.currentMediaType
            });
            this.OrderService.list(args).then(function(result){
                if(result && result.Data){
                    self.$scope.dataList = result.Data || [];
                    self.$scope.totalItems = result.TotalItems || 0;

                    self.$rootScope.$emit('event:refresh-order-info',{
                        totalItems: result.TotalItems || 0,
                        process: 0
                    });
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
                    return '审核不通过';
                case 3:
                    return '通过';
                case 4:
                    return '取消';
                case 9:
                    return '审核通过';
            }
        }

        openDetail(id, type) {
            var url = {
                1: 'advertiser.weiboPrecontractDetail',
                2: 'advertiser.wechatPrecontractDetail',
                3: 'advertiser.friendsPrecontractDetail'
            };
            this.$state.go(url[type],{detailID: id,type:type});
        }

    }

    PrecontractList.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'OrderService'];
    ControllerModule.controller('PrecontractListCtrl', PrecontractList);

}
