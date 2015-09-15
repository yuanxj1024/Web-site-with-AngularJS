/**
 * Created by AaronYuan on 15/9/13.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/OrderService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var PrecontactList = (function () {
        function PrecontactList($rootScope, $scope, OrderService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.OrderService = OrderService;
            this.init();
        }
        PrecontactList.prototype.init = function () {
            this.$scope.dataList = [1];
            this.$scope.currentPageIndex = 1;
            this.$scope.totalItems = 0;
            this.$scope.pageSize = 15;
            this.refresh();
        };
        PrecontactList.prototype.refresh = function (args) {
            if (args === void 0) { args = {}; }
            var self = this;
            args = angular.extend({}, args);
            this.OrderService.myOrderList(args).then(function (result) {
                if (result && result.Data) {
                    self.$scope.dataList = result.Data;
                    self.$scope.totalItems = result.TotalItems;
                }
            }, function () {
            });
        };
        return PrecontactList;
    })();
    PrecontactList.$inject = ['$rootScope', '$scope', 'OrderService'];
    WeMedia.ControllerModule.controller('PrecontactListCtrl', PrecontactList);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=precontact-list.js.map