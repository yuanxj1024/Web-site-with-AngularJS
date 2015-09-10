/**
 * Created by AaronYuan on 8/24/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Bill = (function () {
        function Bill($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.billResource = $resource('/API/Bill/:action', {
                action: '@action'
            }, {
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
        Bill.prototype.list = function (args) {
            var deferred = this.$q.defer();
            return deferred.promise;
        };
        Bill.prototype.info = function () {
            var deferred = this.$q.defer();
            return deferred.promise;
        };
        return Bill;
    })();
    Bill.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('BillService', Bill);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=BillService.js.map