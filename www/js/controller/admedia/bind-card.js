/**
 * Created by AaronYuan on 9/20/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/BillService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var BindCard = (function () {
        function BindCard($rootScope, $scope, $state, BillService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.BillService = BillService;
            $scope.save = angular.bind(this, this.save);
            $scope.tabIndex = '1';
            $scope.form = {
                PayType: '1'
            };
        }
        BindCard.prototype.save = function ($valid) {
            var self = this;
            //console.log(self.$scope.form);
            self.BillService.savePaymentInfo(self.$scope.form).then(function (result) {
                if (result && result.Status == 1) {
                    ZENG.msgbox.show('绑定成功', 4);
                    self.$state.go('admedia.bill');
                }
                else {
                    ZENG.msgbox.show('绑定失败，请稍后重试', 1);
                }
            }, function (err) {
                ZENG.msgbox.show('绑定失败，请稍后重试', 5);
            });
        };
        return BindCard;
    })();
    BindCard.$inject = ['$rootScope', '$scope', '$state', 'BillService'];
    WeMedia.ControllerModule.controller('BindCardCtrl', BindCard);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=bind-card.js.map