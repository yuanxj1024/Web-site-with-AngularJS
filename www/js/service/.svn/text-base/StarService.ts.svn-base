/**
 * Created by AaronYuan on 8/14/15.
 */

/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface IStarService {
        list(args:any):any;
        createPreContract(args:any):any;
        detail(args:any):any;
        addFavorite(args:any): any;
    }

    export interface IStarResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //获取明星列表
        list(params:Object, data:Object, success?:Function, error?:Function);
        //创建预约活动
        createPrecontract(params:Object, data:Object, success?:Function, error?:Function);
        //详情
        detail(params:Object, data:Object, success?:Function, error?:Function);
        //收藏
        addFavorite(id:any);
    }

    class Star  implements IStarService {
        private starResource: IStarResource;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ) {

            this.starResource = <IStarResource> $resource('/API/Star/:action',{
                'action':'@action'
            },{

                list: {
                    method: 'GET',
                    isArray: true,
                    needAccessToken: true,
                    params: {
                        'action': 'list'
                    }
                },
                createPrecontract: {
                    method: 'POST',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'list'
                    }
                },
                detail: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'list'
                    }
                },
                addFavorite: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'list'
                    }
                }
            });
        }

        list(args:any): any {

            return null;
        }
        createPreContract(args:any): any {

            return null;
        }
        detail(args:any):any {

        }
        addFavorite(args:any): any {

        }

    }

    Star.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('StarService', Star);

}


