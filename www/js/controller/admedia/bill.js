/**
 * Created by AaronYuan on 10/21/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/BillService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Bill = (function () {
        function Bill($rootScope, $scope, BillService, $modal) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.BillService = BillService;
            this.$modal = $modal;
            $scope.refresh = angular.bind(this, this.refresh);
            $scope.openWithdraw = angular.bind(this, this.openWithdraw);
            $scope.searchArgs = {
                userID: $rootScope.user.ID,
                startTime: '',
                endTime: '',
                currentPageIndex: 1
            };
            $scope.dataList = [];
            $scope.totalItems = 0;
            this.init();
        }
        Bill.prototype.init = function () {
            var self = this;
            if (!self.$rootScope.admediaPayment) {
                self.BillService.getPaymentInfo({
                    userID: self.$rootScope.user.ID
                }).then(function (result) {
                    if (result && result.Status == 1) {
                        self.$rootScope.admediaPayment = JSON.parse(result.Message);
                    }
                }, function (err) {
                });
            }
        };
        Bill.prototype.refresh = function (args) {
            var self = this;
            args = angular.extend({}, self.$scope.searchArgs, args);
            self.BillService.getAdmediaList(args).then(function (result) {
                if (result && result.Data) {
                    self.$scope.dataList = result.Data;
                }
                else {
                    self.$scope.dataList = [];
                }
            }, function (err) {
                self.$scope.dataList = [];
            });
        };
        Bill.prototype.pageChanged = function (index) {
            var self = this;
            self.$scope.searchArgs.currentPageIndex = index;
            self.refresh({});
        };
        Bill.prototype.openWithdraw = function () {
            var self = this;
            var modalInstance = this.$modal.open({
                animation: true,
                templateUrl: 'withdraw.html',
                controller: 'WithdrawModalCtrl',
                size: 'lg'
            });
            modalInstance.result.then(function (money) {
                //console.log(money);
            }, function () {
            });
        };
        return Bill;
    })();
    var WithDraw = (function () {
        function WithDraw($rootScope, $scope, $modalInstance) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$modalInstance = $modalInstance;
            $scope.ok = angular.bind(this, this.ok);
            $scope.cancel = angular.bind(this, this.cancel);
            $scope.money = '';
            $scope.user = $rootScope.user;
        }
        WithDraw.prototype.ok = function () {
            this.$modalInstance.close(this.$scope.money);
        };
        WithDraw.prototype.cancel = function () {
            this.$modalInstance.close(0);
        };
        return WithDraw;
    })();
    WithDraw.$inject = ['$rootScope', '$scope', '$modalInstance'];
    WeMedia.ControllerModule.controller('WithdrawModalCtrl', WithDraw);
    Bill.$inject = ['$rootScope', '$scope', 'BillService', '$modal'];
    WeMedia.ControllerModule.controller('AdmediaBillCtril', Bill);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=bill.js.map