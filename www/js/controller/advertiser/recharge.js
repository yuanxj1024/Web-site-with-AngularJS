/**
 * Created by AaronYuan on 10/18/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../config.ts" />
/// <reference path="../../service/modal.ts" />
/// <reference path="../../service/BillService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Recharge = (function () {
        function Recharge($rootScope, $scope, $modal, BillService, $state) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$modal = $modal;
            this.BillService = BillService;
            this.$state = $state;
            $scope.saveBankPay = angular.bind(this, this.saveBankPay);
            $scope.showAlipayTip = angular.bind(this, this.showAlipayTip);
            this.init();
        }
        Recharge.prototype.init = function () {
            this.$scope.tabIndex = 0;
            this.$scope.BankInfo = {
                AdvertiserID: this.$rootScope.user.ID,
                Type: 2,
                bank: '中国工商银行',
                PayMoney: '',
                ReMark: ''
            };
            this.$scope.AliInfo = {
                AdvertiserID: this.$rootScope.user.ID,
                payType: '1',
                PayMoney: ''
            };
        };
        Recharge.prototype.saveBankPay = function () {
            var self = this;
            if (this.validBank()) {
                this.BillService.rechargeBank(this.$scope.BankInfo).then(function (result) {
                    //console.log(result);
                    if (result && result.Status > 0) {
                        ZENG.msgbox.show("提交成功，请耐心等待客服处理。", 4);
                        self.$rootScope.$emit('event:refresh-user-info');
                        self.$state.go('advertiser.bill');
                    }
                    else {
                        ZENG.msgbox.show("提交失败，请稍后重试。", 5);
                    }
                }, function (err) {
                    ZENG.msgbox.show("提交失败，请稍后重试。", 5);
                });
            }
        };
        Recharge.prototype.validBank = function () {
            var result = true, msg = '';
            if (!this.$scope.BankInfo.bank) {
                msg = '请选择银行!';
                result = false;
            }
            else if (!this.$scope.BankInfo.PayMoney) {
                msg = '请输入充值金额!';
                result = false;
            }
            else if (isNaN(this.$scope.BankInfo.PayMoney)) {
                msg = '充值金额请输入正整数!';
                result = false;
            }
            if (msg) {
                //window.navigator.notification.alert(msg,null);
                ZENG.msgbox.show(msg, 1);
            }
            return result;
        };
        Recharge.prototype.showAlipayTip = function () {
            var self = this;
            window.navigator.notification.confirm('支付完成后，请根据您支付的情况点击下面按钮。', function (index) {
                if (index == 1) {
                    self.$state.go("advertiser.bill");
                }
                else if (index == 2) {
                }
                self.$rootScope.$emit('event:refresh-user-info');
            }, '提示', ['支付完成', '重新支付'], '');
        };
        return Recharge;
    })();
    Recharge.$inject = ['$rootScope', '$scope', '$modal', 'BillService', '$state'];
    WeMedia.ControllerModule.controller('RechargeCtrl', Recharge);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=recharge.js.map