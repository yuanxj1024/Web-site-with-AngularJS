/**
 * Created by AaronYuan on 9/9/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../config.ts" />
/// <reference path="../../service/modal.ts" />
/// <reference path="../../service/OrderService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var PrecontractList = (function () {
        function PrecontractList($rootScope, $scope, $state, $stateParams, OrderService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.OrderService = OrderService;
            $scope.showDetail = angular.bind(this, this.showDetail);
            $scope.removeItem = angular.bind(this, this.removeItem);
            $scope.editItem = angular.bind(this, this.editItem);
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.getStatus = angular.bind(this, this.getStatus);
            $scope.currentMediaType = $stateParams.mediaType * 1;
            this.init();
            this.refresh();
        }
        PrecontractList.prototype.init = function () {
            this.$scope.currentPageIndex = 1;
            this.$scope.totalItems = 0;
            this.$scope.pageSize = 15;
        };
        PrecontractList.prototype.showDetail = function (id) {
        };
        PrecontractList.prototype.removeItem = function (id) {
            var self = this;
            window.navigator.notification.confirm('确定取消预约吗?', function (index) {
                if (index == 1) {
                    self.OrderService.cancel(id).then(function (result) {
                        if (result && result.Status == 1) {
                            self.refresh();
                            window.navigator.notification.alert('操作成功!');
                        }
                        else {
                            window.navigator.notification.alert('操作失败，请稍后重试!');
                        }
                    }, function (err) {
                        window.navigator.notification.alert('操作失败，请稍后重试!');
                    });
                }
            }, '取消预约', ['确定', '取消']);
        };
        PrecontractList.prototype.editItem = function (id) {
            var stats = {
                2: 'advertiser.wechatprecontract',
                1: 'advertiser.weiboprecontract',
                3: 'advertiser.friendsprecontract'
            };
            this.$state.go(stats[this.$scope.currentMediaType], { editID: id });
        };
        PrecontractList.prototype.pageChanged = function (index) {
            this.$scope.currentPageIndex = index;
            this.refresh();
        };
        PrecontractList.prototype.refresh = function (args) {
            if (args === void 0) { args = {}; }
            var self = this;
            this.$scope.dataList = [];
            args = angular.extend(args, {
                userID: self.$rootScope.user.ID,
                pageIndex: self.$scope.currentPageIndex,
                pageSize: self.$scope.pageSize,
                channelID: this.$scope.currentMediaType
            });
            this.OrderService.list(args).then(function (result) {
                if (result && result.Data) {
                    self.$scope.dataList = result.Data || [];
                    self.$scope.totalItems = result.TotalItems || 0;
                    self.$rootScope.$emit('event:refresh-order-info', {
                        totalItems: result.TotalItems || 0,
                        process: 0
                    });
                }
                else {
                    self.$scope.totalItems = 0;
                }
            }, function (err) {
                self.$scope.totalItems = 0;
            });
        };
        PrecontractList.prototype.getStatus = function (code) {
            switch (code * 1) {
                default:
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
        };
        return PrecontractList;
    })();
    PrecontractList.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'OrderService'];
    WeMedia.ControllerModule.controller('PrecontractListCtrl', PrecontractList);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=precontract-list.js.map