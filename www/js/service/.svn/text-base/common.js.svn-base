/**
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Common = (function () {
        function Common($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.noticeResource = $resource('/API/Notice/:action', { action: '@action' }, {
                list: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                },
                detail: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'detail'
                    }
                }
            });
        }
        Common.prototype.noticeList = function (arg) {
            var deferred = this.$q.defer();
            this.noticeResource.list(arg, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        Common.prototype.noticeDetail = function (id) {
            var deferred = this.$q.defer();
            this.noticeResource.detail({
                id: id
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
        return Common;
    })();
    Common.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('CommonService', Common);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=common.js.map