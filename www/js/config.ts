/**
 * Created by AaronYuan on 8/7/15.
 */
/// <reference path="app.ts" />

module WeMedia {
    'use strict';

    interface IWMRequestConfig extends ng.IRequestConfig {
        needAccessToken?: boolean;
        needLoginRequire?: boolean;
    }

    interface IWMHttpPromiseCallbackArg<T> extends ng.IHttpPromiseCallbackArg<T> {
        needAccessToken?: boolean;
        needLoginRequire?: boolean;
        config?: IWMRequestConfig;
    }

    export interface IWMState extends ng.ui.IState {
        next: ng.ui.IState;
        toParams: ng.ui.IStateOptions;
    }

    var httpInterceptor = function(
        $q: ng.IQService,
        $rootScope: IWMRootScope
    ) {
        return {
            request: function(config: IWMRequestConfig): ng.IPromise<IWMRequestConfig> {
                var deferred:ng.IDeferred<IWMRequestConfig> = $q.defer();
                if(!config.hasOwnProperty('needAccessToken')) {
                    config.needAccessToken = false;
                }
                if(config.needAccessToken) {
                    if(!config.hasOwnProperty('needLoginRequire')) {
                        config.needLoginRequire = true;
                    }
                } else {
                    config.needLoginRequire = false;
                }

                if(!config.hasOwnProperty('cache')) {
                    if($rootScope.accessToken) {
                        config.params = angular.extend({
                            //params: {
                                'accessToken': $rootScope.accessToken
                            }, config.params);

                        deferred.resolve(config);
                    } else if(config.needAccessToken && !$rootScope.accessToken) {
                        var tempConfig = angular.extend({'accessToken':''},config,{
                            data: {
                                message:'尚未登录!!'
                            },
                            status: 401,
                            needLoginRequire: config.needLoginRequire
                        });
                        deferred.reject(tempConfig);
                    }
                } else {
                    deferred.resolve(config);
                }

                return deferred.promise;
            },
            response: function(response: IWMHttpPromiseCallbackArg<any>): IWMHttpPromiseCallbackArg<any> {
                var accessToken: string = response.headers('x-access-token');
                if(accessToken && accessToken != $rootScope.accessToken) {
                    $rootScope.setAccessToken(accessToken);
                }
                return response;
            },
            responseError: function(rejection: IWMHttpPromiseCallbackArg<any>): any {

                switch(rejection.status) {
                    case 401:
                        //TODO
                        //alert(401);
                        break;
                    default:
                        //console.log('TODO');
                        //console.log(rejection);
                        break;
                }

                return $q.reject(rejection);
            }
        };
    };

    httpInterceptor.$inject = ['$q','$rootScope'];

    AppModule.config(function(
        $provide: ng.auto.IProvideService,
        $httpProvider: ng.IHttpProvider,
        $resourceProvider: any
    ){
        $resourceProvider.defaults.stripTrailingSlashes = false;

        //处理路由状态
        $provide.decorator('$state', ['$delegate', '$rootScope', function($delegate:IWMState, $rootScope: IWMRootScope){
            $rootScope.$on('$stateChangeStart', function(event:any, state:ng.ui.IState, params:any) {
                $delegate.next = state;
                $delegate.toParams = params;
            });
            return $delegate;
        }]);

        //注入请求拦截处理
        $provide.factory('interceptor', httpInterceptor);
        $httpProvider.interceptors.push('interceptor');

        //优化事件处理
        $provide.decorator('$rootScope', ['$delegate', function($delegate:any) {
            Object.defineProperty($delegate.constructor.prototype, '$once', {
                value: function(name:string, listener:any) {
                   var unsubscribe = $delegate.$on(name, listener);
                    this.$on('$destroy', unsubscribe);
                    return unsubscribe;
                },
                enumerable: false
            });
            return $delegate;
        }]);

    });


    AppModule.filter('trustHtml', function($sce){
        return function(input){
            return $sce.trustAsHtml(input);
        };
    });


}
