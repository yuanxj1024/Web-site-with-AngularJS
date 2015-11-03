/**
 *
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/OrderService.ts" />
/// <reference path="../../service/MediaAccount.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Dashboard = (function () {
        function Dashboard($rootScope, $scope, CommonService, OrderService, $modal, ModalService, MediaAccountService, $state) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.OrderService = OrderService;
            this.$modal = $modal;
            this.ModalService = ModalService;
            this.MediaAccountService = MediaAccountService;
            this.$state = $state;
            $scope.getStatus = angular.bind(this, this.getStatus);
            $scope.test = angular.bind(this, this.test);
            $scope.openNotice = angular.bind(this, this.openNotice);
            $scope.removeItem = angular.bind(this, this.removeItem);
            $scope.getStateName = angular.bind(this, this.getStateName);
            $scope.updateState = angular.bind(this, this.updateState);
            $scope.editItem = angular.bind(this, this.editItem);
            $scope.openDetail = angular.bind(this, this.openDetail);
            $scope.rejectOrder = angular.bind(this, this.rejectOrder);
            $scope.noticeList = [];
            $scope.orderList = [];
            $scope.orderInfo = {
                totalItems: 0,
                process: 0
            };
            this.init();
            $rootScope.$on('event:refresh-order-info', function (e, data) {
                if (data) {
                    $scope.orderInfo.totalItems = data.totalItems;
                    $scope.orderInfo.process = data.process;
                }
            });
            $rootScope.$emit('event:refresh-user-info');
        }
        Dashboard.prototype.init = function () {
            var self = this;
            this.CommonService.noticeList({
                page: 1,
                pageSize: 4,
                type: self.$rootScope.isAdOwner ? 3 : 4
            }).then(function (result) {
                if (result && result.Data) {
                    self.$scope.noticeList = result.Data;
                }
            }, function (err) {
            });
            if (this.$rootScope.isAdOwner) {
                self.getOrderList();
            }
            else {
                this.admediaOrderList();
            }
            self.MediaAccountService.recommend({}).then(function (result) {
                if (result && result.Data) {
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
        };
        Dashboard.prototype.getOrderList = function () {
            var self = this;
            this.OrderService.list({
                userID: this.$rootScope.user.ID,
                pageSize: 10,
                page: 1
            }).then(function (result) {
                if (result && result.Data) {
                    self.$scope.orderList = result.Data;
                }
            }, function (err) {
            });
        };
        Dashboard.prototype.test = function () {
            ZENG.msgbox.show('提示信息,图标类型', 1);
        };
        Dashboard.prototype.getStatus = function (code) {
            switch (code * 1) {
                default:
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
        };
        Dashboard.prototype.openNotice = function (id) {
            var self = this;
            self.CommonService.noticeDetail(id).then(function (result) {
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
            }, function (err) {
            });
        };
        Dashboard.prototype.trustHtml = function (val) {
            var self = this;
            //return function(input){
            //return self.$sec.trustAsHtml(input);
            //};
        };
        Dashboard.prototype.editItem = function (id, type) {
            var stats = {
                2: 'advertiser.wechatprecontract',
                1: 'advertiser.weiboprecontract',
                3: 'advertiser.friendsprecontract'
            };
            this.$state.go(stats[type], { editID: id });
        };
        Dashboard.prototype.openDetail = function (id, type) {
            var url = {
                1: 'advertiser.weiboPrecontractDetail',
                2: 'advertiser.wechatPrecontractDetail',
                3: 'advertiser.friendsPrecontractDetail'
            };
            this.$state.go(url[type], { detailID: id, type: type });
        };
        Dashboard.prototype.removeItem = function (id) {
            var self = this;
            window.navigator.notification.confirm('确定放弃该预约吗？', function (index) {
                if (index == 1) {
                    self.OrderService.cancel(id).then(function (result) {
                        if (result && result.Status == 1) {
                            ZENG.msgbox.show('操作成功!', 4);
                            self.getOrderList();
                        }
                        else {
                            ZENG.msgbox.show('操作失败，请稍候重试!', 5);
                        }
                    }, function (err) {
                        ZENG.msgbox.show('操作失败，请稍候重试!', 1);
                    });
                }
            }, '放弃预约', ['确定', '取消']);
        };
        Dashboard.prototype.admediaOrderList = function () {
            var self = this;
            this.OrderService.myOrderList({
                userID: self.$rootScope.user.ID,
                page: 1,
                pageSize: 15,
                state: '',
                name: '',
                channelID: ''
            }).then(function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                if (result && result.Data) {
                    self.$scope.orderList = result.Data;
                }
            }, function () {
                self.$scope.orderList = [];
            });
        };
        Dashboard.prototype.getStateName = function (code) {
            return {
                //1: '等自媒体确认',
                //2: '自媒体同意',
                //3: '自媒体拒单',
                //4: '已支付',
                //5: '执行完成',
                //6: '未执行',
                //7: '已验收',
                //8: '付款'
                1: '等自媒体确认',
                2: '等待客户支付',
                3: '自媒体拒单',
                4: '已支付，请执行',
                5: '执行完成',
                6: '未执行',
                7: '已验收',
                8: '付款'
            }[code];
        };
        //updateState(id: number, state:number = 1){
        //    var args = {
        //            id: id,
        //            state: state
        //        },
        //        self = this;
        //    self.OrderService.orderDetailState(args).then(function(result){
        //        if(result && result.Status*1 > 0){
        //            self.admediaOrderList();
        //            ZENG.msgbox.show('操作成功!',4);
        //        }else{
        //            ZENG.msgbox.show('操作失败，请稍候重试!',1);
        //        }
        //    }, function(){
        //        ZENG.msgbox.show('操作失败，请稍候重试!',5);
        //    });
        //}
        Dashboard.prototype.updateState = function (id, state, msg, money, attachment) {
            if (state === void 0) { state = 1; }
            if (msg === void 0) { msg = ''; }
            if (money === void 0) { money = ''; }
            if (attachment === void 0) { attachment = ''; }
            var args = {
                id: id,
                state: state,
                message: msg,
                money: money,
                attachment: attachment
            }, self = this;
            self.OrderService.orderDetailState(args).then(function (result) {
                if (result && result.Status * 1 > 0) {
                    self.admediaOrderList();
                    ZENG.msgbox.show('操作成功!', 4);
                }
                else {
                    ZENG.msgbox.show('操作失败，请稍候重试!', 1);
                }
            }, function () {
                ZENG.msgbox.show('操作失败，请稍候重试!', 5);
            });
        };
        Dashboard.prototype.rejectOrder = function (id) {
            var reject = prompt('请输入拒单理由：');
            if (reject) {
                this.updateState(id, 3, reject);
            }
            else {
                ZENG.msgbox.show('请输入拒单理由!', 1);
            }
        };
        return Dashboard;
    })();
    Dashboard.$inject = ['$rootScope', '$scope', 'CommonService', 'OrderService', '$modal', 'ModalService', 'MediaAccountService', '$state'];
    WeMedia.ControllerModule.controller('DashboardCtrl', Dashboard);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=dashboard.js.map