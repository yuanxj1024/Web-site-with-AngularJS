/**
 * Created by AaronYuan on 8/14/15.
 */

/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface IWechatFriendService {
        list(args:any): ng.IPromise<any>;
        save(model:any):ng.IPromise<any>;
        updateStatus(args:any):ng.IPromise<any>;
    }

    interface IWechatFriendResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object, success?:Function, error?:Function);

        saveWechat(params:Object, data:Object, success?:Function, error?:Function);

        updateStatus(params:Object, data:Object, success?:Function, error?:Function);
    }


    class WechatFriend {
        private wechatResource: IWechatFriendResource;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {
            this.wechatResource = <IWechatFriendResource> $resource('/API/WXFriends/:action',
                {
                    'action': '@action'
                },
                {
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
                }
            );

        }

        list(args:any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.wechatResource.list(args,null,function(result){
                if(typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        save(model:any):ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.wechatResource.saveWechat(model,null,function(result){
                if(typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        updateStatus(args:any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.wechatResource.updateStatus(args,null, function(result){
                if(typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });


            return deferred.promise;
        }

    }
    WechatFriend.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('WechatFriendService', WechatFriend);
}

