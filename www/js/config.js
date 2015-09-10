/**
 * Created by AaronYuan on 8/7/15.
 */
/// <reference path="app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var httpInterceptor = function ($q, $rootScope) {
        return {
            request: function (config) {
                var deferred = $q.defer();
                if (!config.hasOwnProperty('needAccessToken')) {
                    config.needAccessToken = false;
                }
                if (config.needAccessToken) {
                    if (!config.hasOwnProperty('needLoginRequire')) {
                        config.needLoginRequire = true;
                    }
                }
                else {
                    config.needLoginRequire = false;
                }
                if (!config.hasOwnProperty('cache')) {
                    if ($rootScope.accessToken) {
                        config.params = angular.extend({
                            //params: {
                            'accessToken': $rootScope.accessToken
                        }, config.params);
                        deferred.resolve(config);
                    }
                    else if (config.needAccessToken && !$rootScope.accessToken) {
                        var tempConfig = angular.extend({ 'accessToken': '' }, config, {
                            data: {
                                message: '尚未登录!!'
                            },
                            status: 401,
                            needLoginRequire: config.needLoginRequire
                        });
                        deferred.reject(tempConfig);
                    }
                }
                else {
                    deferred.resolve(config);
                }
                return deferred.promise;
            },
            response: function (response) {
                var accessToken = response.headers('x-access-token');
                if (accessToken && accessToken != $rootScope.accessToken) {
                    $rootScope.setAccessToken(accessToken);
                }
                return response;
            },
            responseError: function (rejection) {
                switch (rejection.status) {
                    case 401:
                        //TODO
                        alert(401);
                        break;
                    default:
                        console.log('TODO');
                        console.log(rejection);
                        break;
                }
                return $q.reject(rejection);
            }
        };
    };
    httpInterceptor.$inject = ['$q', '$rootScope'];
    WeMedia.AppModule.config(function ($provide, $httpProvider, $resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
        //处理路由状态
        $provide.decorator('$state', ['$delegate', '$rootScope', function ($delegate, $rootScope) {
            $rootScope.$on('$stateChangeStart', function (event, state, params) {
                $delegate.next = state;
                $delegate.toParams = params;
            });
            return $delegate;
        }]);
        //注入请求拦截处理
        $provide.factory('interceptor', httpInterceptor);
        $httpProvider.interceptors.push('interceptor');
        //优化事件处理
        $provide.decorator('$rootScope', ['$delegate', function ($delegate) {
            Object.defineProperty($delegate.constructor.prototype, '$once', {
                value: function (name, listener) {
                    var unsubscribe = $delegate.$on(name, listener);
                    this.$on('$destroy', unsubscribe);
                    return unsubscribe;
                },
                enumerable: false
            });
            return $delegate;
        }]);
    });
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=config.js.map