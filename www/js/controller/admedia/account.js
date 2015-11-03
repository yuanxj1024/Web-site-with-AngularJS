/**
 * Created by AaronYuan on 8/19/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/MediaAccount.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var Account = (function () {
        function Account($rootScope, $scope, $state, $stateParams, MediaAccountService) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.MediaAccountService = MediaAccountService;
            var self = this;
            $scope.currentMediaType = $stateParams.mediaType;
            $scope.currentMediaName = WeMedia.allMedias[$stateParams.mediaType];
            $scope.addAccount = angular.bind(this, this.addAccount);
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.getStatus = angular.bind(this, this.getStatus);
            $scope.search = angular.bind(this, this.search);
            $scope.openOrClose = angular.bind(this, this.openOrClose);
            $scope.editItem = angular.bind(this, this.editItem);
            $scope.checkedItems = [];
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            $scope.totalItems = 0;
            $scope.searchArgs = {
                keyword: '',
                checkedItems: {}
            };
            $rootScope.$on('$stateChangeSuccess', function (e, state) {
                if (['admedia.account.wechat', 'admedia.account.weibo', 'admedia.account.friends'].indexOf(state.name) > -1) {
                    self.$scope.currentMediaType = state.params.mediaType;
                    self.refresh(state, null);
                    self.$scope.searchArgs.checkedItems = {};
                }
            });
            this.refresh($state.current, null);
        }
        Account.prototype.refresh = function (state, args) {
            var self = this;
            args = angular.extend({
                MediaID: this.$rootScope.user.ID,
                ChannelID: this.$scope.currentMediaType
            }, args);
            this.MediaAccountService.list(args).then(function (result) {
                if (result) {
                    self.$scope.data = result.Data || [];
                    self.$scope.totalItems = result.TotalItems || 0;
                }
                else {
                    self.$scope.totalItems = 0;
                }
            }, function (err) {
                self.$scope.totalItems = 0;
            });
        };
        Account.prototype.addAccount = function () {
            var type = {
                1: 'admedia.account.addweibo',
                2: 'admedia.account.addwechat',
                3: 'admedia.account.addfriends'
            };
            this.$state.go(type[this.$scope.currentMediaType]);
        };
        Account.prototype.pageChanged = function (page) {
            this.$scope.currentPage = page;
            this.refresh(this.$state.current, {
                pageSize: this.$scope.pageSize,
                page: this.$scope.currentPage
            });
        };
        Account.prototype.getStatus = function (status) {
            switch (status * 1) {
                default:
                case 1:
                    return '待审核';
                case 2:
                    return '不通过';
                case 3:
                    return '通过';
            }
        };
        Account.prototype.search = function () {
            var self = this;
            this.refresh(this.$state.current, {
                pageSize: this.$scope.pageSize,
                page: this.$scope.currentPage,
                keyWord: self.$scope.searchArgs.keyword
            });
        };
        Account.prototype.openOrClose = function (tag) {
            var list = [];
            angular.forEach(this.$scope.searchArgs.checkedItems, function (value, key) {
                if (value) {
                    list.push(key);
                }
            });
            if (list.length == 0) {
                ZENG.msgbox.show('请先选择操作的资源!', 1);
                return;
            }
            var self = this;
            this.MediaAccountService.updateStatus({
                ids: list.join('#'),
                status: tag ? 1 : 0
            }).then(function (result) {
                if (result && result.Status == 1) {
                    ZENG.msgbox.show('操作成功!', 4);
                    self.refresh(self.$state.current, {
                        pageSize: self.$scope.pageSize,
                        page: self.$scope.currentPage
                    });
                }
                else {
                    ZENG.msgbox.show('操作失败，稍后重试!', 5);
                }
            }, function (err) {
                ZENG.msgbox.show('操作失败，稍后重试!', 5);
            });
        };
        Account.prototype.editItem = function (id) {
            var url = {
                1: 'admedia.account.addweibo',
                2: 'admedia.account.addwechat',
                3: 'admedia.account.addfriends'
            };
            this.$state.go(url[this.$scope.currentMediaType], {
                ID: id
            });
        };
        return Account;
    })();
    Account.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'MediaAccountService',];
    WeMedia.ControllerModule.controller('AccountCtrl', Account);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=account.js.map