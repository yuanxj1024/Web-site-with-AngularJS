/**
 * Created by AaronYuan on 8/24/15.
 */
/// <reference path="../app.ts" />
module WeMedia {
    'use strict';
    export interface IBilService {
        list(args:any): ng.IPromise<any>;
        info(): ng.IPromise<any>;
    }

    interface IBillResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object, success?:Function, error?:Function);
        info(params:Object, data:Object, success?:Function, error?:Function);
    }


    class Bill {
        private billResource: IBillResource;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {
            this.billResource = <IBillResource> $resource('/API/Bill/:action',{
                action: '@action'
            },{
                list: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'list'
                    }
                },
                info: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'info'
                    }
                }
            });

        }

        list(args:any): ng.IPromise<any> {
            var deferred = this.$q.defer();

            return deferred.promise;
        }

        info(): ng.IPromise<any> {
            var deferred = this.$q.defer();

            return deferred.promise;
        }

    }

    Bill.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('BillService', Bill);
}
