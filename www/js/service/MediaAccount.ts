/**
 * Created by AaronYuan on 9/19/15.
 */
/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface IMediaAccountService {
        list(args:any): ng.IPromise<any>;
        save(model:any):ng.IPromise<any>;
        updateStatus(args:any):ng.IPromise<any>;
        selectedList: Array<any>;
        oneItem(id:number): ng.IPromise<any>;
        updateItem(model:any): ng.IPromise<any>;
    }

    interface IMediaAccountResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object, success?:Function, error?:Function);

        saveData(params:Object, data:Object, success?:Function, error?:Function);

        updateStatus(params:Object, data:Object, success?:Function, error?:Function);
        oneItem(params:Object, data:Object, success?:Function, error?:Function);
        updateItem(params:Object, data:Object, success?:Function, error?:Function);
    }

    class MediaAccount implements IMediaAccountService {
        private accountResource: IMediaAccountResource;
        public selectedList: Array<any>;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {
            this.selectedList = [];
            this.accountResource = <IMediaAccountResource> $resource('/API/MediaAccount/:action',
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
                    }
                }
            );

        }

        list(args:any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.accountResource.list(args,null,function(result){
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
            this.accountResource.saveData(model,null,function(result){
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
            this.accountResource.updateStatus(args,null, function(result){
                if(typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        oneItem(id: number): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.accountResource.oneItem({ID: id},null, function(result){
                if(typeof result == 'string') {
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        updateItem(model: any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.accountResource.updateItem(model,null, function(result){
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

    MediaAccount.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('MediaAccountService', MediaAccount);
}
