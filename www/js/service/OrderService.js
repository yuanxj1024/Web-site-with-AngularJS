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
                orderMediaList: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'mediaList'
                    }
                },
                myOrder: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'myOrderList'
                    }
                },
                orderDetailState: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'comfirmOrder'
                    }
                },
                orderDetailMediaList: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'mediaListForDetail'
                    }
                },
                frozenAdvertiser: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'frozenAdvertiser'
                    }
                },
                acceptExecute: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'acceptExecute'
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
            this.orderResource.detail({ ID: id }, null, function (result) {
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
        Order.prototype.orderDetailState = function (args) {
            var deferred = this.$q.defer();
            this.orderResource.orderDetailState(args, null, function (result) {
                if (typeof result == 'string') {
                    result.JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.orderMediaList = function (id) {
            var deferred = this.$q.defer();
            this.orderResource.orderMediaList({
                ID: id
            }, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.orderDetailMediaList = function (id, userID) {
            if (userID === void 0) { userID = 0; }
            var deferred = this.$q.defer();
            this.orderResource.orderDetailMediaList({
                ID: id,
                userID: userID > 0 ? userID : ''
            }, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.frozenAdvertiser = function (arg) {
            var deferred = this.$q.defer();
            this.orderResource.frozenAdvertiser(arg, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Order.prototype.acceptExecute = function (arg) {
            var deferred = this.$q.defer();
            this.orderResource.acceptExecute(arg, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
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