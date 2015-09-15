/**
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var WechatPublic = (function () {
        function WechatPublic($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.selectedList = [];
            this.wechatResource = $resource('/API/Wechat/:action', {
                'action': '@action'
            }, {
                list: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'list'
                    }
                },
                saveWechat: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'add'
                    }
                },
                updateStatus: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'status'
                    }
                }
            });
        }
        WechatPublic.prototype.list = function (args) {
            var deferred = this.$q.defer();
            this.wechatResource.list(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        WechatPublic.prototype.save = function (model) {
            var deferred = this.$q.defer();
            this.wechatResource.saveWechat(model, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        WechatPublic.prototype.updateStatus = function (args) {
            var deferred = this.$q.defer();
            this.wechatResource.updateStatus(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        return WechatPublic;
    })();
    WechatPublic.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('WechatPublicService', WechatPublic);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=WechatPublic.js.map