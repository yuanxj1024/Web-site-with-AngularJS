/**
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var WeiboService = (function () {
        function WeiboService($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.weiboResource = $resource('/API/Weibo/:action', {
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                },
                saveData: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'add'
                    }
                },
                updateStatus: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'status'
                    }
                }
            });
        }
        WeiboService.prototype.list = function (arg) {
            var deferred = this.$q.defer();
            this.weiboResource.list(arg, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        WeiboService.prototype.save = function (arg) {
            var deferred = this.$q.defer();
            this.weiboResource.saveData(arg, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        WeiboService.prototype.updateStatus = function (arg) {
            var deferred = this.$q.defer();
            this.weiboResource.updateStatus(arg, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        return WeiboService;
    })();
    WeiboService.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('WeiboService', WeiboService);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=WeiboService.js.map