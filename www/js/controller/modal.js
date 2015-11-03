/**
 * Created by AaronYuan on 8/10/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/modal.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Modal = (function () {
        function Modal($scope, ModalService, item) {
            this.$scope = $scope;
            this.ModalService = ModalService;
            this.item = item;
            $scope.close = angular.bind(this, this.close);
            $scope.modalURL = ModalService.modalURL;
            $scope.item = item;
        }
        Modal.prototype.close = function () {
            this.ModalService.currentModal.close();
        };
        return Modal;
    })();
    Modal.$inject = ['$scope', 'ModalService', 'item'];
    WeMedia.ControllerModule.controller('ModalCtrl', Modal);
    WeMedia.ControllerModule.controller('InfoModalCtrl', Modal);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=modal.js.map