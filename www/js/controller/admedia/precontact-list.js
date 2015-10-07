/**
 * Created by AaronYuan on 15/9/13.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/OrderService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var orderTypeNames = {
        1: '全部',
        2: '待执行',
        3: '已完成'
    };
    var PrecontactList = (function () {
        function PrecontactList($rootScope, $scope, OrderService, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.OrderService = OrderService;
            this.$stateParams = $stateParams;
            $scope.getChannelName = angular.bind(this, this.getChannelName);
            $scope.getStateName = angular.bind(this, this.getStateName);
            $scope.searchHandler = angular.bind(this, this.searchHandler);
            $scope.updateState = angular.bind(this, this.updateState);
            $scope.orderType = $stateParams.orderType;
            $scope.orderTitle = orderTypeNames[$stateParams.orderType];
            var self = this;
            this.init();
            //this.$rootScope.$on('$stateChangeSuccess', function(e,state){
            //    console.log(23);
            //    console.log(state);
            //    if(state.name.indexOf('preorderlist') > 0 && state.params['orderType']){
            //        $scope.orderType = state.params.orderType;
            //        $scope.orderTitle = orderTypeNames[state.params.orderType];
            //        //self.refresh();
            //        self.init();
            //    }
            //});
        }
        PrecontactList.prototype.convertOrderType = function (type) {
            if (type == 1) {
                return null;
            }
            else if (type == 2) {
                return 3;
            }
            else if (type == 3) {
                return 4;
            }
            return null;
        };
        PrecontactList.prototype.init = function () {
            this.$scope.dataList = [1];
            this.$scope.currentPageIndex = 1;
            this.$scope.totalItems = 0;
            this.$scope.pageSize = 15;
            this.$scope.search = {
                channelID: '',
                name: ''
            };
            this.refresh();
        };
        PrecontactList.prototype.refresh = function (args) {
            if (args === void 0) { args = {}; }
            var self = this;
            var statelist = {
                1: '',
                2: '3',
                3: '4'
            };
            args = angular.extend({
                userID: self.$rootScope.user.ID,
                page: self.$scope.currentPageIndex,
                pageSize: self.$scope.pageSize,
                state: statelist[self.$scope.orderType],
                name: self.$scope.search.name,
                channelID: self.$scope.search.channelID ? self.$scope.search.channelID : ''
            }, args);
            this.OrderService.myOrderList(args).then(function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                if (result && result.Data) {
                    self.$scope.dataList = result.Data;
                    self.$scope.totalItems = result.TotalItems;
                }
            }, function () {
                self.$scope.dataList = [];
                self.$scope.totalItems = 0;
            });
        };
        PrecontactList.prototype.getChannelName = function (code) {
            return {
                1: '微博',
                2: '公众号',
                3: '朋友圈'
            }[code];
        };
        PrecontactList.prototype.getStateName = function (code) {
            return {
                1: '待确认',
                2: '已同意',
                3: '待执行',
                4: '执行完成'
            }[code];
        };
        PrecontactList.prototype.updateState = function (id, state) {
            if (state === void 0) { state = 1; }
            var args = {
                id: id,
                state: state
            }, self = this;
            self.OrderService.orderDetailState(args).then(function (result) {
                if (result && result.Status * 1 > 0) {
                    self.refresh();
                    ZENG.msgbox.show('操作成功!', 4);
                }
                else {
                    ZENG.msgbox.show('操作失败，请稍候重试!', 1);
                }
            }, function () {
                ZENG.msgbox.show('操作失败，请稍候重试!', 5);
            });
        };
        PrecontactList.prototype.searchHandler = function () {
            this.refresh();
        };
        return PrecontactList;
    })();
    PrecontactList.$inject = ['$rootScope', '$scope', 'OrderService', '$stateParams'];
    WeMedia.ControllerModule.controller('AdMediaPrecontactListCtrl', PrecontactList);
    WeMedia.ControllerModule.controller('PendingAdMediaPrecontactListCtrl', PrecontactList);
    WeMedia.ControllerModule.controller('DoneAdMediaPrecontactListCtrl', PrecontactList);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=precontact-list.js.map