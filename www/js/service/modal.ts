/**
 *
 * Created by AaronYuan on 8/10/15.
 */
/// <reference path="../app.ts" />

module WeMedia {
    'use strict';

    export interface IModalService {
        open(size: string, url:string): void;
        currentModal:any;
        modalURL: string;

    }

    class ModalService implements IModalService {
        public currentModal: any;
        public modalURL: string;
        constructor(
            public $rootScope: IWMRootScope,
            public $modal: any

        ) {

        }
        open(size: string, url:string) :void {
            this.modalURL = url;
            this.currentModal = this.$modal.open({
                animation: true,
                templateUrl: './page/modal.html',
                controller: 'InfoModalCtrl',
                size: size,
                resolve: {
                    item: function () {
                        return {};
                    }
                }
            });
        }
    }

    ModalService.$inject = ['$rootScope', '$modal'];
    ServiceModule.service('ModalService', ModalService);

}

