/**
 * Created by AaronYuan on 15/8/17.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Order = (function () {
        function Order($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.selectedList = [];
            this.orderResource = $resource('/API/OrderReservation/:action', {
                'action': '@action'
            }, {
                dashboard: {
                    method: 'GET',
                    accessToken: true,
                    isArray: true,
                    params: {
                        'action': 'dashboard'
                    }
                },
                saveOrder: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'save'
                    }
                },
                list: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'list'
                    }
                },
                cancel: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'cancel'
                    }
                },
                detail: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'detail'
                    }
                },
                myOrder: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'myOrderList'
                    }
                }
            });
        }
        Order.prototype.dashboard = function () {
            var deferred = this.$q.defer();
            this.orderResource.dashboard(null, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.save = function (arg) {
            var deferred = this.$q.defer();
            this.orderResource.saveOrder(arg, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.list = function (arg) {
            var deferred = this.$q.defer();
            this.orderResource.list(arg, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.cancel = function (id) {
            var deferred = this.$q.defer();
            this.orderResource.cancel({ id: id }, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.detail = function (id) {
            var deferred = this.$q.defer();
            this.orderResource.detail({ id: id }, null, function (result) {
                if (typeof result == 'string') {
                    result.JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.myOrderList = function (args) {
            var deferred = this.$q.defer();
            this.orderResource.myOrder(args, null, function (result) {
                if (typeof result == 'string') {
                    result.JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        return Order;
    })();
    Order.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('OrderService', Order);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=OrderService.js.map