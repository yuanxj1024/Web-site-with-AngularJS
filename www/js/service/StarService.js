/**
 * Created by AaronYuan on 8/14/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Star = (function () {
        function Star($rootScope, $q, $resource) {
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$resource = $resource;
            this.starResource = $resource('/API/Star/:action', {
                'action': '@action'
            }, {
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
        Star.prototype.list = function (args) {
            return null;
        };
        Star.prototype.createPreContract = function (args) {
            return null;
        };
        Star.prototype.detail = function (args) {
        };
        Star.prototype.addFavorite = function (args) {
        };
        return Star;
    })();
    Star.$inject = ['$rootScope', '$q', '$resource'];
    WeMedia.ServiceModule.service('StarService', Star);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=StarService.js.map