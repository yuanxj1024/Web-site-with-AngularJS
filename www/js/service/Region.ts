/**
 * Created by AaronYuan on 8/25/15.
 */
/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface IRegionService {
        list(arg:any): ng.IPromise<any>;
        province(args:any):ng.IPromise<any>;
    }

    interface IRegionResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object, success?:Function, error?:Function);
    }

    var regionCache = [];

    class Region implements IRegionService {
        private regionResource: IRegionResource;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {
            this.regionResource = <IRegionResource> $resource('/API/Area/:action',{
                action: '@action'
            },{
                list: {
                    method: "GET",
                    isArray: false,
                    needAccessToken: true,
                    params:{
                        action: 'list'
                    }
                }
            });
        }

        list(args:any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            if(regionCache && regionCache.length > 0){
                deferred.resolve(regionCache);
            } else {
                this.regionResource.list(args, null,function(result){
                    if(typeof result == "string") {
                        result = JSON.parse(result);
                    }
                    if(result && result.Data.length>0) {
                        regionCache = result.Data;
                        deferred.resolve(result.Data);
                    }else{
                        deferred.reject(result);
                    }
                },function(err){
                    deferred.reject(err)
                });
            }
            return deferred.promise;
        }

        province(args:any):ng.IPromise<any> {
            var deferred = this.$q.defer();
            var list = [];
            this.list(args).then(function(result){
                angular.forEach(result, function(item){
                    if(item.ParID == 0){
                        list.push(item);
                    }
                });
                deferred.resolve(list);
            }, function(){
                deferred.reject([]);
            });
            return deferred.promise;
        }
    }

    Region.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('RegionService', Region);
}
