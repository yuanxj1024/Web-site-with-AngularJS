/**
 *
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/common.ts" />
/// <reference path="../../service/OrderService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Dashboard = (function () {
        function Dashboard($rootScope, $scope, CommonService, OrderService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.CommonService = CommonService;
            this.OrderService = OrderService;
            $scope.test = angular.bind(this, this.test);
            $scope.noticeList = [];
        }
        Dashboard.prototype.init = function () {
            var self = this;
            this.CommonService.noticeList({
                page: 1,
                pageSize: 4
            }).then(function (result) {
                if (result && result.Data) {
                    self.$scope.noticeList = result.Data;
                }
            }, function (err) {
            });
            this.OrderService.list({}).then(function (result) {
                if (result && result.Data) {
                    self.$scope.orderList = result.Data;
                }
            }, function (err) {
            });
        };
        Dashboard.prototype.test = function () {
            ZENG.msgbox.show('提示信息,图标类型', 1);
        };
        return Dashboard;
    })();
    Dashboard.$inject = ['$rootScope', '$scope', 'CommonService', 'OrderService'];
    WeMedia.ControllerModule.controller('DashboardCtrl', Dashboard);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=dashboard.js.map