/**
 * Created by AaronYuan on 15/8/18.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var allClassData = {
        'common': {},
        'industry': [],
        'employment': []
    };
    var SearchTypes = (function () {
        function SearchTypes($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.searchTypeResouce = $resource('/API/MediaClass/:action', {
                'action': '@action'
            }, {
                mediaClass: {
                    method: 'GET',
                    isArray: false,
                    needAccessToken: true,
                    params: {
                        'action': 'mediaclass'
                    }
                },
                mediaField: {
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
        SearchTypes.prototype.common = function (level) {
            var deferred = this.$q.defer();
            var data = allClassData.common;
            if (data && data.length > 0) {
                deferred.resolve(allClassData.common);
            }
            else {
                this.searchTypeResouce.mediaClass(null, null, function (result) {
                    if (typeof result == 'string') {
                        result = JSON.parse(result);
                    }
                    if (result && result.Data) {
                        allClassData.common = result.Data;
                        deferred.resolve(result.Data);
                    }
                    else {
                        deferred.reject(result);
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        SearchTypes.prototype.getClassList = function (parID) {
            if (parID === void 0) { parID = 0; }
            var deferred = this.$q.defer();
            this.common(0).then(function (data) {
                if (data && data.length > 0) {
                    var list = [];
                    angular.forEach(data, function (item) {
                        if (item.ParID == parID) {
                            list.push(item);
                        }
                    });
                    deferred.resolve(list);
                }
                else {
                    deferred.reject([]);
                }
            }, function () {
                deferred.reject([]);
            });
            return deferred.promise;
        };
        SearchTypes.prototype.industry = function () {
            var deferred = this.$q.defer();
            var data = allClassData.industry;
            if (data && data.length > 0) {
                deferred.resolve(allClassData.industry);
            }
            else {
                this.searchTypeResouce.mediaField(null, null, function (result) {
                    if (typeof result == 'string') {
                        result = JSON.parse(result);
                    }
                    if (result && result.Data) {
                        allClassData.industry = result.Data;
                        deferred.resolve(result.Data);
                    }
                    else {
                        deferred.reject(result);
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        SearchTypes.prototype.employment = function () {
            var deferred = this.$q.defer();
            var data = allClassData.employment;
            if (data && data.length > 0) {
                deferred.resolve(allClassData.employment);
            }
            else {
                this.searchTypeResouce.profession(null, null, function (result) {
                    if (typeof result == 'string') {
                        result = JSON.parse(result);
                    }
                    if (result && result.Data) {
                        allClassData.employment = result.Data;
                        deferred.resolve(result.Data);
                    }
                    else {
                        deferred.reject(result);
                    }
                }, function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        };
        SearchTypes.prototype.fansNumber = function () {
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
        };
        SearchTypes.prototype.fansNumberForFriends = function () {
            var list = [
                {
                    ClassName: '100以下',
                    ID: '<100'
                },
                {
                    ClassName: '100-300',
                    ID: 'between 100 and 300'
                },
                {
                    ClassName: '300-500',
                    ID: 'between 300 and 500'
                },
                {
                    ClassName: '500-1000',
                    ID: 'between 500 and 1000'
                },
                {
                    ClassName: '1000-2000',
                    ID: 'between 1000 and 2000'
                },
                {
                    ClassName: '2000-3000',
                    ID: 'between 2000 and 3000'
                },
                {
                    ClassName: '3000-4000',
                    ID: 'between 3000 and 4000'
                },
                {
                    ClassName: '4000-5000',
                    ID: 'between 4000 and 5000'
                },
                {
                    ClassName: '5000以上',
                    ID: '>=5000'
                }
            ];
            return list;
        };
        SearchTypes.prototype.priceList = function () {
            var self = this;
            var calc = function (price) {
                return price * (1 - self.$rootScope.PlantformCost / 100);
            };
            var list = [
                {
                    ClassName: '20元以下',
                    ID: '<=' + calc(20)
                },
                {
                    ClassName: '20-50',
                    ID: 'between ' + calc(20) + ' and ' + calc(50)
                },
                {
                    ClassName: '50-100',
                    ID: 'between ' + calc(50) + ' and ' + calc(100)
                },
                {
                    ClassName: '100-200',
                    ID: 'between ' + calc(100) + ' and ' + calc(200)
                },
                {
                    ClassName: '200-500',
                    ID: 'between ' + calc(200) + ' and ' + calc(500)
                },
                {
                    ClassName: '500-1000',
                    ID: 'between ' + calc(500) + ' and ' + calc(1000)
                },
                {
                    ClassName: '1000以上',
                    ID: '>=' + calc(1000)
                }
            ];
            return list;
        };
        return SearchTypes;
    })();
    SearchTypes.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('SearchTypeService', SearchTypes);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=SearchTypes.js.map