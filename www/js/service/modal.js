/**
 *
 * Created by AaronYuan on 8/10/15.
 */
/// <reference path="../app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var ModalService = (function () {
        function ModalService($rootScope, $modal) {
            this.$rootScope = $rootScope;
            this.$modal = $modal;
            console.log($modal);
        }
        ModalService.prototype.open = function (size, url) {
            this.modalURL = url;
            this.currentModal = this.$modal.open({
                animation: true,
                templateUrl: './page/modal.html',
                controller: 'ModalCtrl',
                size: size
            });
        };
        return ModalService;
    })();
    ModalService.$inject = ['$rootScope', '$modal'];
    WeMedia.ServiceModule.service('ModalService', ModalService);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=modal.js.map