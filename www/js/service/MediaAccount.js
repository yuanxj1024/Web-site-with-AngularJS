/**
 * Created by AaronYuan on 9/19/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var MediaAccount = (function () {
        function MediaAccount($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.selectedList = [];
            this.accountResource = $resource('/API/MediaAccount/:action', {
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
                saveData: {
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
                },
                oneItem: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'detail'
                    }
                },
                updateItem: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'update'
                    }
                },
                exists: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'exists'
                    }
                },
                recommend: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'recommend'
                    }
                }
            });
        }
        MediaAccount.prototype.list = function (args) {
            var deferred = this.$q.defer();
            this.accountResource.list(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        MediaAccount.prototype.save = function (model) {
            var deferred = this.$q.defer();
            this.accountResource.saveData(model, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        MediaAccount.prototype.updateStatus = function (args) {
            var deferred = this.$q.defer();
            this.accountResource.updateStatus(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        MediaAccount.prototype.oneItem = function (id) {
            var deferred = this.$q.defer();
            this.accountResource.oneItem({ ID: id }, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        MediaAccount.prototype.updateItem = function (model) {
            var deferred = this.$q.defer();
            this.accountResource.updateItem(model, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        //检查是否存在
        MediaAccount.prototype.exists = function (args) {
            var deferred = this.$q.defer();
            this.accountResource.exists(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        MediaAccount.prototype.recommend = function (args) {
            var deferred = this.$q.defer();
            this.accountResource.recommend(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        return MediaAccount;
    })();
    MediaAccount.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('MediaAccountService', MediaAccount);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=MediaAccount.js.map