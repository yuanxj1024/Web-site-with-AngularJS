/**
 * Created by AaronYuan on 8/13/15.
 */
/// <reference path="app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var AuthInfo = (function () {
        function AuthInfo($rootScope, $q, $resource, $cookies) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.$cookies = $cookies;
            this.authResource = $resource('/API/User/:action', {
                action: '@action'
            }, {
                checkLogin: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    needLoginRequire: false,
                    params: {
                        'action': 'checkLogin'
                    }
                },
                info: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    needLoginRequire: true,
                    params: {
                        'action': 'info'
                    }
                },
                saveAdvertiser: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'info'
                    }
                },
                updatePwd: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'password'
                    }
                },
                detail: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'detail'
                    }
                }
            });
        }
        AuthInfo.prototype.checkLogin = function () {
        };
        AuthInfo.prototype.getUser = function (args) {
            var defrred = this.$q.defer();
            this.authResource.detail(args, null, function (result) {
                if (typeof result == 'string') {
                    result = JSON.parse(result);
                }
                defrred.resolve(result);
            }, function (reject) {
                defrred.reject(reject);
            });
            return defrred.promise;
        };
        AuthInfo.prototype.userInfo = function (user) {
            if (user === void 0) { user = null; }
            if (user && user.Mobile) {
                this.$cookies.put('authUser', JSON.stringify(user));
                return user;
            }
            else {
                var userInfo = this.$cookies.get('authUser');
                if (typeof userInfo == 'string') {
                    return JSON.parse(userInfo);
                }
                return null;
            }
        };
        AuthInfo.prototype.saveAdvertiser = function (user) {
            var deferred = this.$q.defer();
            this.authResource.saveAdvertiser(user, null, function (result) {
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        AuthInfo.prototype.logout = function () {
            this.$cookies.remove('authUser');
            this.$cookies.remove('accessToken');
            location.href = window.location.origin;
        };
        AuthInfo.prototype.updatePassword = function (oldPwd, newPwd, type) {
            var deferred = this.$q.defer();
            this.authResource.updatePwd({
                id: this.$rootScope.user.ID,
                oldPassword: oldPwd,
                newPassword: newPwd,
                type: type
            }, null, function (result) {
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        return AuthInfo;
    })();
    AuthInfo.$inject = ['$rootScope', '$q', '$resource', '$cookies'];
    WeMedia.ServiceModule.service('AuthService', AuthInfo);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=auth.js.map