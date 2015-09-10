/**
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface ICommonService {
        noticeList(arg:any): ng.IPromise<any>;

    }

    export interface ICommonResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object, success?:Function, error?:Function);
    }

    class Common implements ICommonService {
        private noticeResource: any;
        constructor (
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {

            this.noticeResource = $resource('/API/Notice', {action: '@action'},{
                list: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        action: 'list'
                    }
                }
            });


        }

        noticeList(arg:any) :ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.noticeResource.list(arg,null,function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }

    Common.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('CommonService', Common);
}


