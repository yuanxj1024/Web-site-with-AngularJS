/**
 *
 * Created by AaronYuan on 8/7/15.
 */
/// <reference path="../typescript/angularjs/angular.d.ts" />
/// <reference path="../typescript/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typescript/angularjs/angular-resource.d.ts" />
/// <reference path="../typescript/angularjs/angular-cookies.d.ts" />
/// <reference path="auth.ts" />

module WeMedia {
    'use strict';

    declare var window;
    //全局根据MVC划分模块
    //控制
    export var ControllerModule: ng.IModule = angular.module('WeMedia.controllers',['ngFileUpload','ui.bootstrap', 'datePicker','ngCookies']);
    //服务
    export var ServiceModule: ng.IModule = angular.module('WeMedia.services', ['ngFileUpload','ngResource', 'ui.bootstrap']);
    //指令
    export var DirectiveModule: ng.IModule = angular.module('WeMedia.directives', ['ui.bootstrap']);

    export var CtrlResolves: any = {};
    //应用模块
    export var AppModule: ng.IModule = angular.module('WeMedia', ['ngFileUpload','ui.bootstrap','ui.router','ngCookies','WeMedia.controllers','WeMedia.services','WeMedia.directives']);

    export interface IWMRootScope extends ng.IRootScopeService {
        accessToken: string;
        isAdOwner: boolean;
        user:any;
        isDebug: boolean;

        setAccessToken: Function;
        getAccessToken():string;
        //setUserInfo: Function;
        redirectTo:Function;
        redirect:Function;
        //回到当前首页
        goToIndex: Function;
        calcDate: Function;
    }

    //scope通用接口
    export interface IWMBaseScope extends ng.IScope {
        currentMediaType?: MediaType;
        currentMediaName?: string;
        goToIndex?: Function;
    }

    export interface IWMStateParamsService extends ng.ui.IStateParamsService {
        mediaType:MediaType;
        ID?: number;
        orderType: number;
    }

    //媒体类型
    export enum MediaType {
        wechat = 2,
        weibo = 1,
        friend =3
    }
    export var allMedias:string[] = ['', '新浪微博','微信公众号', '微信朋友圈'];

    //应用启动入口-构造函数
    class AppInit {
        constructor(
            $rootScope: IWMRootScope,
            $injector: ng.auto.IInjectorService,
            $state: ng.ui.IStateService,
            $location: ng.ILocationService,
            $cookies: ng.cookies.ICookieStoreService,
            AuthService: IAuthInfoService
        ) {
            $rootScope.isDebug = true;
            if($rootScope.isDebug) {
                //测试数据
                $cookies.put('accessToken', '23dfasfas23afsdf');
                var userinfo = {
                    ID: 1,
                    Mobile: '12313123123',
                    name: 'Aaron Yuan',
                    UserName: 'AaaronYuan',
                    Company: 'tests'
                };
                $cookies.put('authUser', JSON.stringify(userinfo));
                $rootScope.isAdOwner = !false;
            } else {
                //角色设定
                $rootScope.isAdOwner = $cookies.get('isAdvertiser') == 'true';
            }

            $rootScope.goToIndex = function() {
                if($rootScope.isAdOwner) {
                    $state.go('advertiser.dashboard');
                }else {
                    $state.go('advertiser.dashboard');
                }
            };

            $rootScope.accessToken = $cookies.get('accessToken');
            var user = AuthService.userInfo(null);
            if(user && user.Mobile) {
                $rootScope.user = user;
                if(!user['UserName']){
                    window.navigator.notification.alert('您的信息不完整，请及时完善', function(){
                        $state.go('advertiser.user');
                    });
                }
                //else{
                //    $rootScope.goToIndex();
                //}

            } else {
                var url = window.location.origin + '/advertiserlogin.html';
                window.navigator.notification.alert('登陆信息已经过期，请重新登陆！', function(){
                    window.location.href = url;
                });
            }

            $rootScope.setAccessToken = function(token:string):void {
                $rootScope.accessToken = token;
                if(!token) {
                    $cookies.remove('accessToken');
                } else {
                    $cookies.put('accessToken', token);
                }
            };

            $rootScope.getAccessToken = function() {
                return $cookies.get('accessToken');
            };

            $rootScope.redirectTo =  function(name:string, params:any, options:any) {
                $state.go(name, params, options);
            };
            $rootScope.redirect =  function(url:string) {
                window.location.href = url;
            };


            $rootScope.calcDate = function(text){
                if(text){
                    var r = text.match(/\d+(?=[+])/);
                    if(r && r[0]){
                        return new Date(r[0]*1);
                    }
                }
                return new Date();
            };
            //利用路由，选中顶级菜单
            $rootScope.$on('$stateChangeSuccess', function(e, state) {
                var selector ='';
                if(state.name.indexOf('.account.') > 0) {
                    selector = 'a:contains("账号管理")';
                }
                if(state.name.indexOf('advertiser.wechat') >= 0) {
                    selector = 'a:contains("微信公众号")';
                }
                if(state.name.indexOf('advertiser.weibo') >= 0) {
                    selector = 'a:contains("新浪微博")';
                }
                if(state.name.indexOf('advertiser.star') >= 0) {
                    selector = 'a:contains("明星")';
                }
                if(state.name.indexOf('advertiser.friends') >= 0) {
                    selector = 'a:contains("微信朋友圈")';
                }
                if(selector) {
                    setTimeout(function(){
                        $(selector, '.header-wrap').parent('li').attr('class','active')
                    },100);
                }

            });
        } //end constructor
    }

    //注入
    AppInit.$inject = ['$rootScope','$injector','$state','$location','$cookies', 'AuthService'];

    AppModule.run(AppInit);

}