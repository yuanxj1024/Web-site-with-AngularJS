/**
 * Created by AaronYuan on 8/10/15.
 */

/// <reference path="../app.ts" />
/// <reference path="../service/modal.ts" />

module  WeMedia {
    'use strict';

    interface IModalScope extends ng.IScope {
        close: Function;
        modalURL:string;
    }

    class Modal {
        constructor(
            public $scope: IModalScope,
            public ModalService: IModalService
        ) {
            $scope.close = angular.bind(this, this.close);
            $scope.modalURL = ModalService.modalURL;

        }

        close() {
            this.ModalService.currentModal.close();
        }
    }

    Modal.$inject = ['$scope','ModalService'];
    ControllerModule.controller('ModalCtrl', Modal);
}
