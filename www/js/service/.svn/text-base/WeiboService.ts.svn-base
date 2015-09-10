/**
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface IWeiboService {
        save(args:any): ng.IPromise<any>;
        upadateStatus(args:any): ng.IPromise<any>;
        list(args: any): ng.IPromise<any>;
    }

    interface IWeiboResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object, success?:Function, error?:Function);
        saveData(params:Object, data:Object, success?:Function, error?:Function);
        updateStatus(params:Object, data:Object, success?:Function, error?:Function);
    }

    class WeiboService {
        private weiboResource: IWeiboResource;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {
            this.weiboResource = <IWeiboResource> $resource('/API/Weibo/:action',{
                action: '@action'
            }, {
                list: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                },
                saveData: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'add'
                    }
                },
                updateStatus: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'status'
                    }
                }
            });
        }
        list(arg: any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.weiboResource.list(arg, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        save(arg: any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.weiboResource.saveData(arg, null, function(result){
               if(typeof result == 'string'){
                   result = JSON.parse(result);
               }
               deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        updateStatus(arg: any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.weiboResource.updateStatus(arg, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }

    WeiboService.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('WeiboService', WeiboService);
}