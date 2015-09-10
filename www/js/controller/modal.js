/**
 * Created by AaronYuan on 8/10/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../service/modal.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Modal = (function () {
        function Modal($scope, ModalService) {
            this.$scope = $scope;
            this.ModalService = ModalService;
            $scope.close = angular.bind(this, this.close);
            $scope.modalURL = ModalService.modalURL;
        }
        Modal.prototype.close = function () {
            this.ModalService.currentModal.close();
        };
        return Modal;
    })();
    Modal.$inject = ['$scope', 'ModalService'];
    WeMedia.ControllerModule.controller('ModalCtrl', Modal);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=modal.js.map