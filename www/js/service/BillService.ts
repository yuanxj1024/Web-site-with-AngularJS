/**
 * Created by AaronYuan on 8/24/15.
 */
/// <reference path="../app.ts" />
module WeMedia {
    'use strict';
    export interface IBilService {
        list(args:any): ng.IPromise<any>;
        info(): ng.IPromise<any>;
        rechargeBank(args:any): ng.IPromise<any>;
        getPaymentInfo(args:any): ng.IPromise<any>;
        savePaymentInfo(args:any): ng.IPromise<any>;
        getAdmediaList(args:any): ng.IPromise<any>;
    }

    interface IBillResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        list(params:Object, data:Object, success?:Function, error?:Function);
        info(params:Object, data:Object, success?:Function, error?:Function);
        paymentInfo(params:Object, data:Object, success?:Function, error?:Function);
        savePaymentInfo(params:Object, data:Object, success?:Function, error?:Function);
        getAdmediaList(params:Object, data:Object, success?:Function, error?:Function);
    }
    interface IRechargeResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        bankPay(params:Object, data:Object, success?:Function, error?:Function);
    }


    class Bill implements IBilService {
        private billResource: IBillResource;
        private rechargeResource: IRechargeResource;

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
                },
                paymentInfo: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'admediaGetPayInfo'
                    }
                },
                savePaymentInfo: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'admediaSavePaymentInfo'
                    }
                },
                getAdmediaList: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'getAdmediaList'
                    }
                }
            });

            this.rechargeResource = <IRechargeResource> $resource('/API/Advertiser/:action',{
               action: '@action'
            },{
                bankPay: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'recharge'
                    }
                }
            });

        }

        list(args:any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.billResource.list(args,null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        info(): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.billResource.info(null,null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        //银行转账
        rechargeBank(args:any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.rechargeResource.bankPay(args, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        getPaymentInfo(args:any){
            var deferred = this.$q.defer();
            this.billResource.paymentInfo(args, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        savePaymentInfo(args:any){
            var deferred = this.$q.defer();
            this.billResource.savePaymentInfo(args, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        getAdmediaList(args:any){
            var deferred = this.$q.defer();
            this.billResource.getAdmediaList(args, null, function(result){
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

    Bill.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('BillService', Bill);
}
