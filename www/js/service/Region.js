/**
 * Created by AaronYuan on 8/25/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var regionCache = [];
    var Region = (function () {
        function Region($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.regionResource = $resource('/API/Area/:action', {
                action: '@action'
            }, {
                list: {
                    method: "GET",
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        action: 'list'
                    }
                }
            });
        }
        Region.prototype.list = function (args) {
            var deferred = this.$q.defer();
            if (regionCache && regionCache.length > 0) {
                deferred.resolve(regionCache);
            }
            else {
                this.regionResource.list(args, null, function (result) {
                    if (typeof result == "string") {
                        result = JSON.parse(result);
                    }
                    if (result && result.Data.length > 0) {
                        regionCache = result.Data;
                        deferred.resolve(result.Data);
                    }
                    else {
                        deferred.reject(result);
                    }
                }, function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        };
        Region.prototype.province = function (args) {
            var deferred = this.$q.defer();
            var list = [];
            this.list(args).then(function (result) {
                angular.forEach(result, function (item) {
                    if (item.ParID == 0) {
                        list.push(item);
                    }
                });
                deferred.resolve(list);
            }, function () {
                deferred.reject([]);
            });
            return deferred.promise;
        };
        return Region;
    })();
    Region.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('RegionService', Region);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=Region.js.map