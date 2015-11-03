/**
 * Created by AaronYuan on 8/24/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Bill = (function () {
        function Bill($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.billResource = $resource('/API/Bill/:action', {
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'list'
                    }
                },
                info: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'info'
                    }
                },
                paymentInfo: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'admediaGetPayInfo'
                    }
                },
                savePaymentInfo: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'admediaSavePaymentInfo'
                    }
                },
                getAdmediaList: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'getAdmediaList'
                    }
                }
            });
            this.rechargeResource = $resource('/API/Advertiser/:action', {
                action: '@action'
            }, {
                bankPay: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'recharge'
                    }
                }
            });
        }
        Bill.prototype.list = function (args) {
            var deferred = this.$q.defer();
            this.billResource.list(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Bill.prototype.info = function () {
            var deferred = this.$q.defer();
            this.billResource.info(null, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        //银行转账
        Bill.prototype.rechargeBank = function (args) {
            var deferred = this.$q.defer();
            this.rechargeResource.bankPay(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Bill.prototype.getPaymentInfo = function (args) {
            var deferred = this.$q.defer();
            this.billResource.paymentInfo(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Bill.prototype.savePaymentInfo = function (args) {
            var deferred = this.$q.defer();
            this.billResource.savePaymentInfo(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Bill.prototype.getAdmediaList = function (args) {
            var deferred = this.$q.defer();
            this.billResource.getAdmediaList(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        return Bill;
    })();
    Bill.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('BillService', Bill);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=BillService.js.map