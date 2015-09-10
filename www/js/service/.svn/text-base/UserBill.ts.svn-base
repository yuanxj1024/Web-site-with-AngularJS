/**
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../app.ts" />
module WeMedia {
    'use strict';

    export interface IUserBillService {
        accountInfo(args:any):any;
        list(args:any):any;
    }

    export interface IUserBillResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //账户信息
        accountInfo(params:Object, data:Object, success?:Function, error?:Function);
        //金额使用明细
        list(params:Object, data:Object, success?:Function, error?:Function);
    }

    class UserBill implements IUserBillService {
        private userBillResource: IUserBillResource;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {


        }
        accountInfo(args:any):any {

        }
        list(args:any):any {

        }

    }

    UserBill.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('UserBillService', UserBill);
}