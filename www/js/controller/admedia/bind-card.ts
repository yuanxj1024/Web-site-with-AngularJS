/**
 * Created by AaronYuan on 9/20/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/BillService.ts" />

module WeMedia {
    'use strict';

    declare  var window, ZENG;

    class BindCard {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope:any,
            public $state: ng.ui.IStateService,
            public BillService: IBilService
        ){
            $scope.save = angular.bind(this, this.save);
            $scope.tabIndex = '1';
            $scope.form = {
                PayType: '1'
            };

        }

        save($valid){
            var self  = this;
            //console.log(self.$scope.form);
            self.BillService.savePaymentInfo(self.$scope.form).then(function(result){
                if(result && result.Status == 1){
                    ZENG.msgbox.show('绑定成功',4);
                    self.$state.go('admedia.bill');
                }else{
                    ZENG.msgbox.show('绑定失败，请稍后重试',1);
                }
            }, function(err){
                ZENG.msgbox.show('绑定失败，请稍后重试',5);
            });
        }

    }
    BindCard.$inject = ['$rootScope','$scope', '$state', 'BillService'];
    ControllerModule.controller('BindCardCtrl', BindCard);

}
