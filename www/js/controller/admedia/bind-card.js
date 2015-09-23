/**
 * Created by AaronYuan on 9/20/15.
 */
/// <reference path="../../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var BindCard = (function () {
        function BindCard($rootScope, $scope) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            $scope.tabIndex = 0;
        }
        return BindCard;
    })();
    BindCard.$inject = ['$rootScope', '$scope'];
    WeMedia.ControllerModule.controller('BindCardCtrl', BindCard);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=bind-card.js.map