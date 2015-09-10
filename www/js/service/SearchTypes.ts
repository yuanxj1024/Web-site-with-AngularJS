/**
 * Created by AaronYuan on 15/8/18.
 */
/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface ISearchTypeService {
        common(mediaType:number):ng.IPromise<any>;
        industry():ng.IPromise<any>;
        employment():ng.IPromise<any>;

        fansNumber(): Array<any>;
        priceList(): Array<any>;
    }

    interface ISearchTypeResource extends ng.resource.IResourceClass<ng.resource.IResource<any>> {
        //��
        mediaClass(params:Object, data:Object, success?:Function, error?:Function);
        //��ҵ
        mediaField(params:Object, data:Object, success?:Function, error?:Function);
        //ְҵ
        profession(params:Object, data:Object, success?:Function, error?:Function);
    }

    //��ݻ���
    var allClassData: any ={
        //�����
        'common': {},
        //��ҵ
        'industry': [],
        //ְҵ
        'employment': []
    };

    class SearchTypes  implements ISearchTypeService {
        private searchTypeResouce: ISearchTypeResource;
        constructor(
            public $rootScope: IWMRootScope,
            public $q: ng.IQService,
            public $resource: ng.resource.IResourceService
        ){
            this.searchTypeResouce = <ISearchTypeResource> $resource('/API/MediaClass/:action', {
                'action': '@action'
            },{
                mediaClass: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'mediaclass'
                    }
                },
                mediaField:{
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'mediafield'
                    }
                },
                profession: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'profession'
                    }
                }
            });
        }

        common(mediaType:number):ng.IPromise<any> {
            var deferred = this.$q.defer();
            var data = allClassData.common[mediaType];
            if(data && data.length > 0) {
                deferred.resolve(allClassData.common[mediaType]);
            }else {
                this.searchTypeResouce.mediaClass({'mediaType': mediaType}, null, function (result) {
                    if(typeof result == 'string') {
                        result = JSON.parse(result);
                    }
                    if(result && result.Data) {
                        allClassData.common[mediaType] = result.Data;
                        deferred.resolve(result.Data);
                    }else {
                        deferred.reject(result);
                    }
                }, function(error){
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        }

        industry():ng.IPromise<any> {
            var deferred = this.$q.defer();
            var data = allClassData.industry;
            if(data && data.length > 0) {
                deferred.resolve(allClassData.industry);
            }else {
                this.searchTypeResouce.mediaField(null, null, function (result) {
                    if(typeof result == 'string') {
                        result = JSON.parse(result);
                    }
                    if(result && result.Data) {
                        allClassData.industry = result.Data;
                        deferred.resolve(result.Data);
                    }else {
                        deferred.reject(result);
                    }
                }, function(error){
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        }

        employment():ng.IPromise<any> {
            var deferred = this.$q.defer();
            var data = allClassData.employment;
            if(data && data.length > 0) {
                deferred.resolve(allClassData.employment);
            }else {
                this.searchTypeResouce.profession(null, null, function (result) {
                    if(typeof result == 'string') {
                        result = JSON.parse(result);
                    }
                    if(result && result.Data) {
                        allClassData.employment = result.Data;
                        deferred.resolve(result.Data);
                    }else {
                        deferred.reject(result);
                    }
                }, function(error){
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        }

        fansNumber(): Array<any> {
            var list = [
                {
                    ClassName: '5万以下',
                    ID: '<50000'
                },
                {
                    ClassName: '5万-10万',
                    ID: 'between 50000 and 100000'
                },
                {
                    ClassName: '10万-20万',
                    ID: 'between 100000 and 200000'
                },
                {
                    ClassName: '20万-40万',
                    ID: 'between 200000 and 400000'
                },
                {
                    ClassName: '40万-80万',
                    ID: 'between 400000 and 800000'
                },
                {
                    ClassName: '80万-120万',
                    ID: 'between 800000 and 1200000'
                },
                {
                    ClassName: '120万-200万',
                    ID: 'between 1200000 and 2000000'
                },
                {
                    ClassName: '200万-500万',
                    ID: 'between 2000000 and 5000000'
                },
                {
                    ClassName: '500万-1000万',
                    ID: 'between 5000000 and 10000000'
                },
                {
                    ClassName: '1000万以上',
                    ID: '>=10000000'
                }
            ];


            return list;
        }

        priceList() :Array<any> {
            var list = [
                {
                    ClassName: '20元以下',
                    ID: '<=20'
                },
                {
                    ClassName: '20-50',
                    ID: 'between 20 and 50'
                },
                {
                    ClassName: '50-100',
                    ID: 'between 50 and 100'
                },
                {
                    ClassName: '100-200',
                    ID: 'between 100 and 200'
                },
                {
                    ClassName: '200-500',
                    ID: 'between 200 and 500'
                },
                {
                    ClassName: '500-1000',
                    ID: 'between 500 and 1000'
                },
                {
                    ClassName: '1000以上',
                    ID: '>=1000'
                }
            ];
            return list;
        }


    }

    SearchTypes.$inject = ['$rootScope', '$q', '$resource'];
    ServiceModule.service('SearchTypeService', SearchTypes);
}

