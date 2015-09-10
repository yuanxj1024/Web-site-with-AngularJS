/**
 * Created by AaronYuan on 8/14/15.
 */
///<reference path="../../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Star = (function () {
        function Star($rootScope, $scope, $stateParams) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            $scope.tabIndex = 1;
        }
        return Star;
    })();
    Star.$inject = ['$rootScope', '$scope', '$stateParams'];
    WeMedia.ControllerModule.controller('StarCtrl', Star);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=star.js.map