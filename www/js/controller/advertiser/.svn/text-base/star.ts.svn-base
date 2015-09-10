/**
 * Created by AaronYuan on 8/14/15.
 */
///<reference path="../../app.ts" />
module WeMedia {
    'use strict';

    interface IStarScope  extends IWMBaseScope {
        tabIndex: number;

    }


    class Star {
        constructor (
            public $rootScope: IWMRootScope,
            public $scope: IStarScope,
            public $stateParams: IWMStateParamsService
        ) {

            $scope.tabIndex = 1;

        }

    }

    Star.$inject =  ['$rootScope', '$scope', '$stateParams'];
    ControllerModule.controller('StarCtrl', Star);
}

