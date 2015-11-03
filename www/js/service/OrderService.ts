/**
 * Created by AaronYuan on 15/8/17.
 */
/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface IOrderService {
        dasboard():ng.IPromise<any>;
        save(arg:any): ng.IPromise<any>;
        list(arg:any): ng.IPromise<any>;
        cancel(id:number): ng.IPromise<any>;
        detail(id:number): ng.IPromise<any>;
        orderMediaList(id:number): ng.IPromise<any>;

        myOrderList(args:any): ng.IPromise<any>;
        orderDetailState(args:any): ng.IPromise<any>;
        orderDetailMediaList(id: number, userID: number): ng.IPromise<any>;

        selectedList: Array<any>;

        //冻结广告主资金
        frozenAdvertiser(args:any): ng.IPromise<any>;
        acceptExecute(args:any): ng.IPromise<any>;
    }

    export interface IOrderResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        dashboard(params:Object, data:Object, success?:Function, error?:Function);
        saveOrder(params:Object, data:Object, success?:Function, error?:Function);
        list(params:Object, data:Object, success?:Function, error?:Function);
        cancel(params:Object, data:Object, success?:Function, error?:Function);
        detail(params:Object, data:Object, success?:Function, error?:Function);
        myOrder(params:Object, data:Object, success?:Function, error?:Function);
        orderDetailState(params:Object, data:Object, success?:Function, error?:Function);
        orderMediaList(params:Object, data:Object, success?:Function, error?:Function);
        orderDetailMediaList(params:Object, data:Object, success?:Function, error?:Function);
        frozenAdvertiser(params:Object, data:Object, success?:Function, error?:Function);
        acceptExecute(params:Object, data:Object, success?:Function, error?:Function);
    }

    class Order {
        private orderResource: IOrderResource;
        public selectedList: Array<any>;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {
            this.selectedList = [];
            this.orderResource = <IOrderResource> $resource('/API/OrderReservation/:action',{
                'action': '@action'
            },{
                dashboard: {
                    method: 'GET',
                    accessToken: true,
                    isArray: true,
                    params: {
                        'action': 'dashboard'
                    }
                },
                saveOrder: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'save'
                    }
                },
                list: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'list'
                    }
                },
                cancel: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'cancel'
                    }
                },
                detail: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'detail'
                    }
                },
                orderMediaList: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'mediaList'
                    }
                },
                myOrder: {
                    method: 'GET',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'myOrderList'
                    }
                },
                orderDetailState: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'comfirmOrder'
                    }
                },
                orderDetailMediaList: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'mediaListForDetail'
                    }
                },
                frozenAdvertiser: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'frozenAdvertiser'
                    }

                },
                acceptExecute: {
                    method: 'POST',
                    accessToken: true,
                    isArray: false,
                    params: {
                        'action': 'acceptExecute'
                    }
                }
            });
        }

        dashboard():ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.orderResource.dashboard(null, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        save(arg:any): ng.IPromise<any>{
            var deferred = this.$q.defer();
            this.orderResource.saveOrder(arg, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        list(arg:any): ng.IPromise<any>{
            var deferred = this.$q.defer();
            this.orderResource.list(arg, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        cancel(id:any): ng.IPromise<any> {
            var deferred = this.$q.defer();

            this.orderResource.cancel({id: id}, null ,function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });

            return deferred.promise;
        }
        detail(id:number): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.orderResource.detail({ID: id} ,null, function(result){
                if(typeof result == 'string'){
                    result.JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        myOrderList(args:any): ng.IPromise<any> {
            var deferred = this.$q.defer();
            this.orderResource.myOrder(args ,null, function(result){
                if(typeof result == 'string'){
                    result.JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        orderDetailState(args:any){
            var deferred = this.$q.defer();
            this.orderResource.orderDetailState(args ,null, function(result){
                if(typeof result == 'string'){
                    result.JSON.parse(result);
                }
                deferred.resolve(result);
            }, function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        orderMediaList(id:number): ng.IPromise<any> {
            var deferred =  this.$q.defer();
            this.orderResource.orderMediaList({
                ID: id
            }, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        orderDetailMediaList(id: number, userID:number = 0): ng.IPromise<any> {
            var deferred =  this.$q.defer();
            this.orderResource.orderDetailMediaList({
                ID: id,
                userID: userID > 0? userID: ''
            }, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }

        frozenAdvertiser(arg: any): ng.IPromise<any> {
            var deferred =  this.$q.defer();
            this.orderResource.frozenAdvertiser(arg, null, function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                deferred.resolve(result);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
        acceptExecute(arg: any) : ng.IPromise<any> {
            var deferred =  this.$q.defer();
            this.orderResource.acceptExecute(arg, null, function(result){
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


    Order.$inject = ['$rootScope', '$q','$resource'];

    ServiceModule.service('OrderService', Order);


}


