/**
 * Created by AaronYuan on 10/21/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/BillService.ts" />

module WeMedia {
    'use strict';

    declare var window, ZENG;

    class Bill {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: any,
            public BillService: IBilService,
            public $modal: any
        ){
            $scope.refresh = angular.bind(this, this.refresh);
            $scope.openWithdraw = angular.bind(this, this.openWithdraw);

            $scope.searchArgs = {
                userID: $rootScope.user.ID,
                startTime: '',
                endTime: '',
                currentPageIndex: 1
            };

            $scope.dataList = [];
            $scope.totalItems = 0;

            this.init();
        }
        init(){
            var self = this;
            if(!self.$rootScope.admediaPayment){
                self.BillService.getPaymentInfo({
                    userID: self.$rootScope.user.ID
                }).then(function(result){
                    if(result && result.Status ==1){
                        self.$rootScope.admediaPayment = JSON.parse(result.Message);
                    }

                }, function(err){

                });

            }
        }

        refresh(args){
            var self = this;
            args = angular.extend({},self.$scope.searchArgs, args);

            self.BillService.getAdmediaList(args).then(function(result){
                if(result && result.Data){
                    self.$scope.dataList = result.Data;
                }else{
                    self.$scope.dataList = [];
                }
            }, function(err){
                self.$scope.dataList = [];
            });
        }

        pageChanged(index) {
            var self = this;
            self.$scope.searchArgs.currentPageIndex = index;

            self.refresh({});
        }

        openWithdraw(){
            var self =this;
            var modalInstance = this.$modal.open({
                animation: true,
                templateUrl: 'withdraw.html',
                controller: 'WithdrawModalCtrl',
                size: 'lg',
            });

            modalInstance.result.then(function(money){
                //console.log(money);
            },function(){
            });
        }

    }

    class WithDraw {
        constructor(
            public $rootScope: any,
            public $scope: any,
            public $modalInstance: any
        ){
            $scope.ok = angular.bind(this, this.ok);
            $scope.cancel = angular.bind(this, this.cancel);
            $scope.money = '';
            $scope.user = $rootScope.user;
        }

        ok(){
            this.$modalInstance.close(this.$scope.money);
        }
        cancel(){
            this.$modalInstance.close(0);
        }
    }

    WithDraw.$inject = ['$rootScope', '$scope', '$modalInstance'];
    ControllerModule.controller('WithdrawModalCtrl', WithDraw);

    Bill.$inject = ['$rootScope', '$scope', 'BillService', '$modal'];
    ControllerModule.controller('AdmediaBillCtril', Bill);
}