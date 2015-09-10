/**
 * Created by AaronYuan on 8/13/15.
 */

/// <reference path="app.ts" />

module WeMedia {
    'use strict';

    declare  var window;
    export interface IUser {
        Id: number;
        Mobile:string;
        UserName: string;
    }

    export interface IAuthInfoService {
        checkLogin(): void;
        userInfo(user:IUser): IUser;
        getUser():ng.IPromise<any>;
        logout(): void;

        saveAdvertiser(user:Object): ng.IPromise<any>;
        updatePassword(o:string, n:string, t:number): ng.IPromise<any>;
    }

    export interface IAuthResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        checkLogin(params:Object, data:Object, success?:Function, error?:Function);
        info(params:Object, data:Object, success?:Function, error?:Function);

        //保存广告主type=1，自媒体信息type=2
        saveAdvertiser(params:Object, data:Object, success?:Function, error?:Function);
        updatePwd(params:Object, data:Object, success?:Function, error?:Function);
    }

    class AuthInfo implements IAuthInfoService {
        private authResource: IAuthResource;

        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService,
            public $cookies: ng.cookies.ICookieStoreService

        ) {
            this.authResource = <IAuthResource>$resource('/API/User/:action',{
                action:'@action'
            },{
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
                }
            });
        }

        checkLogin(): void {

        }

        getUser():ng.IPromise<any> {
            var defrred = this.$q.defer();

            this.authResource.info(null,null,function(result){
                if(typeof result == 'string') {
                    console.log(result);
                    defrred.resolve(result);

                } else {
                    alert('失败');
                    defrred.reject(result);
                }
            },function(reject){
                alert('erro');
                defrred.reject(reject);
            });
            return defrred.promise;
        }

        userInfo(user:IUser): IUser {
           if(user && user.Mobile) {
               this.$cookies.put('authUser', JSON.stringify(user));
               return user;
           } else {

               var userInfo = this.$cookies.get('authUser');
               if(userInfo) {
                   return JSON.parse(userInfo);
               }

               return null;
           }
        }

        saveAdvertiser(user:Object): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.authResource.saveAdvertiser(user,null,function(result){
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        logout(): void {
            this.$cookies.remove('authUser');
            this.$cookies.remove('accessToken');
            location.href = window.location.origin;
        }

        updatePassword(oldPwd:string, newPwd: string, type:number) {
            var deferred = this.$q.defer();
            this.authResource.updatePwd({
                id: this.$rootScope.user.ID,
                oldPassword: oldPwd,
                newPassword: newPwd,
                type: type
            },null,function(result){
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

    }


    AuthInfo.$inject = ['$rootScope', '$q', '$resource', '$cookies'];
    ServiceModule.service('AuthService', AuthInfo);


}

