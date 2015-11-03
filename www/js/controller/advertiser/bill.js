/**
 * Created by AaronYuan on 9/14/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/BillService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Bill = (function () {
        function Bill($rootScope, $scope, BillService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.BillService = BillService;
            $scope.payStatus = angular.bind(this, this.payStatus);
            $scope.searchHandler = angular.bind(this, this.searchHandler);
            this.init();
            this.refresh();
        }
        Bill.prototype.init = function () {
            this.$scope.payRecords = [];
            this.$scope.currentPageIndex = 1;
            this.$scope.totalItems = 0;
            this.$scope.pageSize = 20;
            this.$scope.search = {
                startTime: '',
                endTime: ''
            };
        };
        Bill.prototype.refresh = function (args) {
            if (args === void 0) { args = null; }
            var self = this;
            args = angular.extend({
                userID: this.$rootScope.user.ID
            }, args || {});
            self.BillService.list(args).then(function (result) {
                if (result && result.Data) {
                    self.$scope.payRecords = result.Data;
                    self.$scope.totalItems = result.TotalItems;
                }
            }, function (err) {
                self.$scope.payRecords = [];
                self.$scope.totalItems = 0;
            });
        };
        Bill.prototype.pageChanged = function (page) {
            this.$scope.currentPageIndex = page;
            this.refresh({
                page: page,
                pageSize: this.$scope.pageSize
            });
        };
        Bill.prototype.payStatus = function (code) {
            switch (code * 1) {
                case 1:
                    return '待审核';
                case 2:
                    return '失败';
                case 3:
                    return '成功';
            }
        };
        Bill.prototype.searchHandler = function () {
            var d1 = new Date(this.$scope.search.startTime), d2 = new Date(this.$scope.search.endTime);
            if (d1 == 'Invalid Date') {
                ZENG.msgbox.show('请选择开始时间', 5);
                return null;
            }
            else if (d2 == 'Invalid Date') {
                ZENG.msgbox.show('请选择结束时间', 5);
                return null;
            }
            this.refresh({
                page: this.$scope.currentPageIndex,
                pageSize: this.$scope.pageSize,
                startTime: d1,
                endTime: d2
            });
        };
        return Bill;
    })();
    Bill.$inject = ['$rootScope', '$scope', 'BillService'];
    WeMedia.ControllerModule.controller('advertiserBllCtrl', Bill);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=bill.js.map