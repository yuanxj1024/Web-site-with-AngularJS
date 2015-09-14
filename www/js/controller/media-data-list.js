/**
 * Created by AaronYuan on 8/8/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../config.ts" />
/// <reference path="../service/SearchTypes.ts" />
/// <reference path="../service/WechatPublic.ts" />
/// <reference path="../service/WeiboService.ts" />
/// <reference path="../service/WechatFriends.ts" />
/// <reference path="../service/OrderService.ts" />
/// <reference path="../service/Region.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var MediaDataList = (function () {
        function MediaDataList($scope, $rootScope, $state, $stateParams, SearchTypeService, WechatPublicService, WechatFriendsService, WeiboService, OrderService, RegionService) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.SearchTypeService = SearchTypeService;
            this.WechatPublicService = WechatPublicService;
            this.WechatFriendsService = WechatFriendsService;
            this.WeiboService = WeiboService;
            this.OrderService = OrderService;
            this.RegionService = RegionService;
            if (!$stateParams.mediaType) {
            }
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.createOrder = angular.bind(this, this.createOrder);
            $scope.addItem = angular.bind(this, this.addItem);
            $scope.currentMediaType = $stateParams.mediaType * 1;
            $scope.tabIndex = 1;
            $scope.currentMediaName = WeMedia.allMedias[$stateParams.mediaType];
            $scope.searchTypeData = $scope.searchTypeData || {};
            $scope.selected = {
                'common': 0,
                'industry': 0,
                'employment': 0,
                fansNumber: 0,
                price: 0,
                area: 0
            };
            $scope.selectedMediaItems = {};
            $scope.selectedMediaTotal = 0;
            $scope.selectedMediaObject = {};
            $scope.commonTag = false;
            $scope.industryTag = false;
            $scope.employmentTag = false;
            $scope.areaTag = false;
            $scope.searchKey = '';
            $scope.list = [];
            $scope.pageSize = 20;
            $scope.currentPage = 1;
            this.init();
            //this.refresh();
        } //end constructor
        MediaDataList.prototype.init = function () {
            var self = this;
            this.SearchTypeService.common(this.$scope.currentMediaType).then(function (result) {
                self.$scope.searchTypeData.common = result;
            }, function (err) {
                console.log(err);
            });
            this.SearchTypeService.industry().then(function (result) {
                self.$scope.searchTypeData.industry = result;
            }, function (err) {
                console.log(err);
            });
            this.SearchTypeService.employment().then(function (result) {
                self.$scope.searchTypeData.employment = result;
            }, function (err) {
                console.log(err);
            });
            this.RegionService.province({}).then(function (result) {
                self.$scope.searchTypeData.provinceList = result;
            });
            this.$scope.searchTypeData.fansNumber = this.SearchTypeService.fansNumber();
            this.$scope.searchTypeData.priceList = this.SearchTypeService.priceList();
            this.$scope.$watch('selected.common', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    self.refresh('');
                }
            });
            this.$scope.$watch('selected.industry', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    self.refresh('');
                }
            });
            this.$scope.$watch('selected.employment', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    self.refresh('');
                }
            });
            this.$scope.$watch('selected.price', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    self.refresh('');
                }
            });
            this.$scope.$watch('selected.fansNumber', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    self.refresh('');
                }
            });
            this.$rootScope.$on('$stateChangeSuccess', function (e, state) {
                if (['admedia.account.wechat', 'admedia.account.weibo', 'admedia.account.friends'].indexOf(state.name) > -1) {
                    self.refresh(state);
                }
            });
            this.$scope.$watch('tabIndex', function (newValue, oldValue) {
                if (newValue == 1) {
                    self.refresh('');
                }
                else if (newValue == 2) {
                    self.favoriteList();
                }
                else if (newValue == 3) {
                }
            });
        };
        //刷新
        MediaDataList.prototype.refresh = function (state, args) {
            if (state === void 0) { state = ''; }
            if (args === void 0) { args = {}; }
            var self = this;
            args = angular.extend({}, this.createSearchArg(), args);
            var callbackObj = {
                2: function () {
                    self.WechatPublicService.list(args).then(function (result) {
                        if (result && result.Data) {
                            self.$scope.list = result.Data || [];
                            self.$scope.totalItems = result.TotalItems || 0;
                        }
                    }, function (err) {
                        console.log(err);
                    });
                },
                3: function () {
                    self.WeiboService.list(args).then(function (result) {
                        if (result && result.Data) {
                            self.$scope.list = result.Data || [];
                            self.$scope.totalItems = result.TotalItems || 0;
                        }
                    }, function (err) {
                        console.log(err);
                    });
                },
                4: function () {
                    self.WechatFriendsService.list(args).then(function (result) {
                        if (result && result.Data) {
                            self.$scope.list = result.Data || [];
                            self.$scope.totalItems = result.TotalItems || 0;
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }
            };
            callbackObj[this.$scope.currentMediaType]();
        };
        MediaDataList.prototype.favoriteList = function (state, args) {
            if (state === void 0) { state = ''; }
            if (args === void 0) { args = {}; }
            var self = this;
            switch (this.$scope.currentMediaType) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    break;
            }
        };
        MediaDataList.prototype.favoritePageChanged = function (page) {
            this.$scope.currentPage = page;
            this.favoriteList(null, {
                pageSize: this.$scope.pageSize,
                page: this.$scope.currentPage
            });
        };
        MediaDataList.prototype.pageChanged = function (page) {
            this.$scope.currentPage = page;
            this.refresh(null, {
                pageSize: this.$scope.pageSize,
                page: this.$scope.currentPage
            });
        };
        MediaDataList.prototype.createOrder = function () {
            var self = this;
            self.OrderService.selectedList = [];
            angular.forEach(this.$scope.selectedMediaObject, function (val, key) {
                self.OrderService.selectedList.push(val);
            });
            switch (this.$scope.currentMediaType) {
                case 1:
                    this.$state.go('advertiser.starprecontract');
                    break;
                case 2:
                    this.$state.go('advertiser.wechatprecontract');
                    break;
                case 3:
                    this.$state.go('advertiser.weiboprecontract');
                    break;
                case 4:
                    this.$state.go('advertiser.friendsprecontract');
                    break;
            }
        };
        MediaDataList.prototype.addItem = function (item) {
            var self = this;
            if (self.$scope.selectedMediaItems[item.ID]) {
                self.$scope.selectedMediaObject[item.ID] = item;
            }
            else {
                delete self.$scope.selectedMediaObject[item.ID];
            }
            this.$scope.selectedMediaTotal = 0;
            angular.forEach(this.$scope.selectedMediaItems, function (val, key) {
                if (val) {
                    self.$scope.selectedMediaTotal += 1;
                }
            });
        };
        MediaDataList.prototype.createSearchArg = function () {
            return {
                page: this.$scope.currentPage,
                pageSize: this.$scope.pageSize,
                fansNumber: this.$scope.selected.fansNumber ? this.$scope.selected.fansNumber.ID : 0,
                price: this.$scope.selected.price ? this.$scope.selected.price.ID : 0,
                isEnable: 1
            };
        };
        return MediaDataList;
    })();
    MediaDataList.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'SearchTypeService', 'WechatPublicService', 'WechatFriendService', 'WeiboService', 'OrderService', 'RegionService'];
    WeMedia.ControllerModule.controller('MediaDataListCtrl', MediaDataList);
    WeMedia.ControllerModule.controller('WechatDataListCtrl', MediaDataList);
    WeMedia.ControllerModule.controller('WeiboDataListCtrl', MediaDataList);
    WeMedia.ControllerModule.controller('FriendsDataListCtrl', MediaDataList);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=media-data-list.js.map