/**
 *
 * Created by AaronYuan on 8/7/15.
 */
/// <reference path="../typescript/angularjs/angular.d.ts" />
/// <reference path="../typescript/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../typescript/angularjs/angular-resource.d.ts" />
/// <reference path="../typescript/angularjs/angular-cookies.d.ts" />
/// <reference path="auth.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    //全局根据MVC划分模块
    //控制
    WeMedia.ControllerModule = angular.module('WeMedia.controllers', ['ngFileUpload', 'ui.bootstrap', 'datePicker', 'ngCookies']);
    //服务
    WeMedia.ServiceModule = angular.module('WeMedia.services', ['ngFileUpload', 'ngResource', 'ui.bootstrap']);
    //指令
    WeMedia.DirectiveModule = angular.module('WeMedia.directives', ['ui.bootstrap']);
    WeMedia.CtrlResolves = {};
    //应用模块
    WeMedia.AppModule = angular.module('WeMedia', ['ngFileUpload', 'ui.bootstrap', 'ui.router', 'ngCookies', 'WeMedia.controllers', 'WeMedia.services', 'WeMedia.directives']);
    //媒体类型
    (function (MediaType) {
        MediaType[MediaType["star"] = 1] = "star";
        MediaType[MediaType["wechat"] = 2] = "wechat";
        MediaType[MediaType["weibo"] = 3] = "weibo";
        MediaType[MediaType["friend"] = 4] = "friend";
    })(WeMedia.MediaType || (WeMedia.MediaType = {}));
    var MediaType = WeMedia.MediaType;
    WeMedia.allMedias = ['', '明星', '微信公众号', '新浪微博', '微信朋友圈'];
    //应用启动入口-构造函数
    var AppInit = (function () {
        function AppInit($rootScope, $injector, $state, $location, $cookies, AuthService) {
            $rootScope.isDebug = location.host.indexOf('127.0.0.1') >= 0;
            if ($rootScope.isDebug) {
                //测试数据
                $cookies.put('accessToken', '23dfasfas23afsdf');
                var userinfo = {
                    Mobile: '12313123123',
                    name: 'Aaron Yuan',
                    UserName: 'AaaronYuan',
                    Company: 'tests'
                };
                $cookies.put('authUser', JSON.stringify(userinfo));
                $rootScope.isAdOwner = !false;
            }
            else {
                //角色设定
                $rootScope.isAdOwner = $cookies.get('isAdvertiser') == 'true';
            }
            $rootScope.accessToken = $cookies.get('accessToken');
            var user = AuthService.userInfo(null);
            console.log(user);
            if (user && user.Mobile) {
                $rootScope.user = user;
                if (!user['UserName']) {
                    window.navigator.notification.alert('您的信息不完整，请及时完善', function () {
                        $state.go('advertiser.user');
                    });
                }
            }
            else {
                var url = window.location.origin + '/login.html';
                window.navigator.notification.alert('登陆信息已经过期，请重新登陆！', function () {
                    window.location.href = url;
                });
            }
            $rootScope.setAccessToken = function (token) {
                $rootScope.accessToken = token;
                if (!token) {
                    $cookies.remove('accessToken');
                }
                else {
                    $cookies.put('accessToken', token);
                }
            };
            $rootScope.getAccessToken = function () {
                return $cookies.get('accessToken');
            };
            $rootScope.redirectTo = function (name, params, options) {
                $state.go(name, params, options);
            };
            $rootScope.redirect = function (url) {
                window.location.href = url;
            };
            $rootScope.goToIndex = function () {
                if ($rootScope.isAdOwner) {
                    $state.go('advertiser.dashboard');
                }
                else {
                    $state.go('advertiser.dashboard');
                }
            };
            //利用路由，选中顶级菜单
            $rootScope.$on('$stateChangeSuccess', function (e, state) {
                var selector = '';
                if (state.name.indexOf('.account.') > 0) {
                    selector = 'a:contains("账号管理")';
                }
                if (state.name.indexOf('advertiser.wechat') >= 0) {
                    selector = 'a:contains("微信公众号")';
                }
                if (state.name.indexOf('advertiser.weibo') >= 0) {
                    selector = 'a:contains("新浪微博")';
                }
                if (state.name.indexOf('advertiser.star') >= 0) {
                    selector = 'a:contains("明星")';
                }
                if (state.name.indexOf('advertiser.friends') >= 0) {
                    selector = 'a:contains("微信朋友圈")';
                }
                if (selector) {
                    setTimeout(function () {
                        $(selector, '.header-wrap').parent('li').attr('class', 'active');
                    }, 100);
                }
            });
        } //end constructor
        return AppInit;
    })();
    //注入
    AppInit.$inject = ['$rootScope', '$injector', '$state', '$location', '$cookies', 'AuthService'];
    WeMedia.AppModule.run(AppInit);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=app.js.map