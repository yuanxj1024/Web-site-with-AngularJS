/**
 *
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/OrderService.ts" />
/// <reference path="../../service/MediaAccount.ts" />
module WeMedia {
    'use strict';

    declare var window, ZENG;

    interface IDashboardScope extends IWMBaseScope {
        test:Function;
        noticeList: Array<any>;
        orderList: Array<any>;
        getStatus: Function;
        orderInfo: any;

        newList: any;
        dataList:any;

        openNotice: Function;
        modalInstance: any;

        editItem: Function;
        removeItem: Function;
        getStateName: Function;
        updateState: Function;
    }

    class Dashboard {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IDashboardScope,
            public CommonService: ICommonService,
            public OrderService: IOrderService,
            public $modal: any,
            public ModalService: any,
            public MediaAccountService: IMediaAccountService,
            public $state: ng.ui.IStateService
        ) {
            $scope.getStatus = angular.bind(this, this.getStatus);
            $scope.test = angular.bind(this,this.test);
            $scope.openNotice = angular.bind(this,this.openNotice);
            $scope.removeItem = angular.bind(this, this.removeItem);
            $scope.getStateName = angular.bind(this, this.getStateName);
            $scope.updateState = angular.bind(this, this.updateState);
            $scope.editItem = angular.bind(this, this.editItem);

            $scope.noticeList = [];
            $scope.orderList = [];
            $scope.orderInfo = {
                totalItems: 0,
                process: 0
            };
            this.init();

            $rootScope.$on('event:refresh-order-info', function(e,data){
                if(data){
                    $scope.orderInfo.totalItems = data.totalItems;
                    $scope.orderInfo.process = data.process;
                }
            });
        }
        init() {
            var self = this;
            this.CommonService.noticeList({
                page: 1,
                pageSize: 4,
                type: self.$rootScope.isAdOwner? 3: 4
            }).then(function(result){
                if(result && result.Data){
                    self.$scope.noticeList = result.Data;
                }
            }, function(err){
            });

            if(this.$rootScope.isAdOwner){
                self.getOrderList();
            }else{
                this.admediaOrderList();
            }

            self.MediaAccountService.list({
                pageSize: 6
            }).then(function(result){
                if(result && result.Data){
                    self.$scope.newList = result.Data || [];
                }
            });

            //self.WeiboService.list({
            //    pageSize: 6,
            //    page:1 ,
            //    isEnable: 1
            //}).then(function(result){
            //    if(result && result.Data){
            //        self.$scope.newList = result.Data || [];
            //    }
            //});
        }

        getOrderList(){
            var self =this;
            this.OrderService.list({
                userID:  this.$rootScope.user.ID
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
                    return '不通过';
                case 3:
                    return '通过';
                case 4:
                    return '取消';
                case 9:
                    return '完成';
            }
        }
        openNotice(id){
            var self = this;
            self.CommonService.noticeDetail(id).then(function(result){
                self.$scope.modalInstance = self.$modal.open({
                    animation: true,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalCtrl',
                    size: 'lg',
                    resolve: {
                        item: function () {
                            return result.Data[0];
                        }
                    }
                });
                self.ModalService.currentModal = self.$scope.modalInstance;

            }, function(err){
            });
        }

        trustHtml(val){
            var self = this;
            //return function(input){
                //return self.$sec.trustAsHtml(input);
            //};
        }

        editItem(id: number, type: number) {
            var stats = {
                2: 'advertiser.wechatprecontract',
                1: 'advertiser.weiboprecontract',
                3: 'advertiser.friendsprecontract'
            };
            this.$state.go(stats[type],{ editID: id});
        }

        removeItem(id:number): void{
            var self = this;
            window.navigator.notification.confirm('确定放弃该预约吗？', function(index){
                if(index == 1){
                    self.OrderService.cancel(id).then(function(result){
                        if(result && result.Status ==1){
                            ZENG.msgbox.show('操作成功!',4);
                            self.getOrderList();
                        }else{
                            ZENG.msgbox.show('操作失败，请稍候重试!',5);
                        }
                    }, function(err){
                        ZENG.msgbox.show('操作失败，请稍候重试!',1);
                    });
                }
            }, '放弃预约', ['确定' ,'取消']);
        }

        admediaOrderList(){
            var self = this;
            this.OrderService.myOrderList({
                userID: self.$rootScope.user.ID,
                page: 1,
                pageSize: 15,
                state: '',
                name: '',
                channelID: ''
            }).then(function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                if(result && result.Data){
                    self.$scope.orderList = result.Data;
                }
            }, function(){
                self.$scope.orderList= [];
            });
        }
        getStateName(code){
            return {
                1: '待确认',
                2: '已同意',
                3: '待执行',
                4: '执行完成'
            }[code];
        }

        updateState(id: number, state:number = 1){
            var args = {
                    id: id,
                    state: state
                },
                self = this;
            self.OrderService.orderDetailState(args).then(function(result){
                if(result && result.Status*1 > 0){
                    self.admediaOrderList();
                    ZENG.msgbox.show('操作成功!',4);
                }else{
                    ZENG.msgbox.show('操作失败，请稍候重试!',1);
                }
            }, function(){
                ZENG.msgbox.show('操作失败，请稍候重试!',5);
            });

        }
    }

    Dashboard.$inject = ['$rootScope', '$scope', 'CommonService', 'OrderService', '$modal', 'ModalService',  'MediaAccountService','$state'];
    ControllerModule.controller('DashboardCtrl', Dashboard);

}

