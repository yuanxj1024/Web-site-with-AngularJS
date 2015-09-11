/**
 *
 * Created by AaronYuan on 8/8/15.
 */
/// <reference path="../app.ts" />
/// <reference path="../config.ts" />
/// <reference path="../service/modal.ts" />
/// <reference path="../service/WechatPublic.ts" />
/// <reference path="../service/WeiboService.ts" />
/// <reference path="../service/WechatFriends.ts" />
/// <reference path="../service/OrderService.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    var PrecontractCtrl = (function () {
        function PrecontractCtrl($rootScope, $scope, $state, $stateParams, ModalService, WechatPublicService, OrderService, $modal) {
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.ModalService = ModalService;
            this.WechatPublicService = WechatPublicService;
            this.OrderService = OrderService;
            this.$modal = $modal;
            $scope.open = angular.bind(this, this.open);
            $scope.openList = angular.bind(this, this.openList);
            $scope.openAgreement = angular.bind(this, this.openAgreement);
            $scope.setPage = angular.bind(this, this.setPage);
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.saveWechat = angular.bind(this, this.saveWechat);
            $scope.deleteItem = angular.bind(this, this.deleteItem);
            $scope.clearItem = angular.bind(this, this.clearItem);
            $scope.currentMediaType = $stateParams.mediaType * 1;
            console.log($stateParams);
            if (!$scope.currentMediaType) {
            }
            $scope.currentMediaName = WeMedia.allMedias[$stateParams.mediaType];
            this.initData();
            this.calcInfo();
        }
        PrecontractCtrl.prototype.initData = function () {
            this.$scope.modalData = [];
            this.$scope.currentPageIndex = 1;
            this.$scope.selectedTotalInfo = {};
            //公众号表单
            this.$scope.wechatForm = {
                Title: '',
                Intro: '',
                StartTime: '',
                EndTime: '',
                FeedbackTime: '',
                IsNoticeResult: '',
                Advertiser_ID: ''
            };
            this.$scope.selectedList = this.OrderService.selectedList; //WechatPublicService.selectedList;
            //this.OrderService.selectedList = [];
        };
        PrecontractCtrl.prototype.open = function () {
            this.$scope.opened = !this.$scope.opened;
        };
        PrecontractCtrl.prototype.openAgreement = function () {
            this.ModalService.open('lg', './page/agreement.html');
        };
        PrecontractCtrl.prototype.setPage = function (page) {
        };
        PrecontractCtrl.prototype.pageChanged = function (index) {
            this.$scope.currentPageIndex = index;
            console.log(this.$scope.currentPageIndex);
        };
        PrecontractCtrl.prototype.saveWechat = function ($valid) {
            var self = this;
            if (!$valid) {
                window.navigator.notification.alert('请将信息填写完整', null);
            }
            this.$scope.wechatForm.mediaType = this.$scope.currentMediaType * 1 - 1;
            if (this.validate()) {
                var ids = [];
                angular.forEach(this.$scope.selectedList, function (item) {
                    ids.push(item.ID);
                });
                this.$scope.wechatForm.items = ids.join('#');
                this.$scope.wechatForm.Advertiser_ID = this.$rootScope.user.ID;
                console.log('form:');
                console.log(this.$scope.wechatForm);
                this.OrderService.save(this.$scope.wechatForm).then(function (result) {
                    if (result && result.Status == 1) {
                        window.navigator.notification.alert('数据保存成功!', function () {
                            self.goList();
                        });
                    }
                    else {
                        window.navigator.notification.alert('数据保存失败，请稍后重试', null);
                    }
                }, function (err) {
                    window.navigator.notification.alert('数据保存失败，请稍后重试', null);
                });
            }
        };
        PrecontractCtrl.prototype.goList = function () {
            var name = '';
            switch (this.$scope.currentMediaType * 1) {
                case 1:
                    break;
                case 2:
                    name = 'advertiser.weiboprecontract';
                    break;
                case 3:
                    name = 'advertiser.friendsprecontract';
                    break;
                case 4:
                    name = 'advertiser.precontractList';
                    break;
            }
            if (name) {
                this.$state.go(name);
            }
        };
        PrecontractCtrl.prototype.validate = function () {
            var result = true;
            var msg = '';
            if ((new Date(this.$scope.wechatForm.FeedbackTime)) - (new Date()) < 86400000) {
                msg = '反馈时间必须晚于当前时间24小时.';
            }
            else if ((new Date(this.$scope.wechatForm.StartTime)) <= (new Date())) {
                msg = '活动开始时间必须晚于今天.';
            }
            else if ((new Date(this.$scope.wechatForm.StartTime)) > (new Date(this.$scope.wechatForm.EndTime))) {
                msg = '活动开始时间不能在活动结束日期之后!';
            }
            else if (this.$scope.selectedList.length <= 0) {
                msg = '请添加预约资源!';
            }
            if (msg) {
                window.navigator.notification.alert(msg, null);
                result = false;
            }
            return result;
        };
        PrecontractCtrl.prototype.openList = function () {
            var self = this;
            var modalInstance = this.$modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'DataModalCtrl',
                size: 'lg',
                resolve: {
                    mediaType: function () {
                        return self.$scope.currentMediaType;
                    }
                }
            });
            modalInstance.result.then(function (items) {
                console.log(items);
                if (items && items.length > 0) {
                    self.$scope.selectedList = self.$scope.selectedList.concat(items);
                    self.calcInfo();
                }
            }, function () {
            });
        };
        PrecontractCtrl.prototype.calcInfo = function () {
            this.$scope.selectedTotalInfo = {
                SingleYing: 0,
                SingleRuan: 0,
                MoreFirstYing: 0,
                MoreFirstRuan: 0,
                MoreSecondYing: 0,
                MoreSecondRuan: 0,
                MoreThreeYing: 0,
                MoreThreeRuan: 0
            };
            var self = this;
            var callbackobj = {
                2: function (item) {
                    self.$scope.selectedTotalInfo.SingleYing += item.SingleYing;
                    self.$scope.selectedTotalInfo.SingleRuan += item.SingleRuan;
                    self.$scope.selectedTotalInfo.MoreFirstYing += item.MoreFirstYing;
                    self.$scope.selectedTotalInfo.MoreFirstRuan += item.MoreFirstRuan;
                    self.$scope.selectedTotalInfo.MoreSecondYing += item.MoreSecondYing;
                    self.$scope.selectedTotalInfo.MoreSecondRuan += item.MoreSecondRuan;
                    self.$scope.selectedTotalInfo.MoreThreeYing += item.MoreThreeYing;
                    self.$scope.selectedTotalInfo.MoreThreeRuan += item.MoreThreeRuan;
                },
                3: function (item) {
                    self.$scope.selectedTotalInfo.YGZhiFaPrice += item.YGZhiFaPrice;
                    self.$scope.selectedTotalInfo.YGZhuanFaPrice += item.YGZhuanFaPrice;
                    self.$scope.selectedTotalInfo.RGZhiFaPrice += item.RGZhiFaPrice;
                    self.$scope.selectedTotalInfo.RGZhuanFaPrice += item.RGZhiFaPriceRGZhiFaPrice;
                },
                4: function (item) {
                    self.$scope.selectedTotalInfo.Price += item.Price;
                }
            };
            angular.forEach(this.$scope.selectedList, callbackobj[self.$scope.currentMediaType]);
        };
        PrecontractCtrl.prototype.deleteItem = function (id) {
            var self = this, i = 0, temp;
            angular.forEach(this.$scope.selectedList, function (item) {
                if (item.id == id) {
                    temp = i;
                }
                i++;
            });
            this.$scope.selectedList.splice(temp, 1);
        };
        PrecontractCtrl.prototype.clearItem = function () {
            var self = this;
            window.navigator.notification.confirm('确定清空所有的资源吗？', function (index) {
                if (index == 1) {
                    self.$scope.selectedList = [];
                    self.calcInfo();
                }
            }, '全部清空', ['清空', '取消']);
        };
        return PrecontractCtrl;
    })();
    //数据弹出层
    var Modal = (function () {
        function Modal($scope, $modalInstance, mediaType, WechatPublicService, WeiboService, WechatFriendService) {
            this.$scope = $scope;
            this.$modalInstance = $modalInstance;
            this.mediaType = mediaType;
            this.WechatPublicService = WechatPublicService;
            this.WeiboService = WeiboService;
            this.WechatFriendService = WechatFriendService;
            $scope.cancel = angular.bind(this, this.cancel);
            $scope.ok = angular.bind(this, this.ok);
            $scope.addItem = angular.bind(this, this.addItem);
            //数据
            $scope.selectedList = {};
            $scope.selectedDataObj = {};
            $scope.items = [];
            $scope.selectedTotal = 0;
            $scope.currentPageIndex = 1;
            $scope.totalItems = 0;
            $scope.mediaType = mediaType;
            this.refresh();
        }
        Modal.prototype.addItem = function (item) {
            var self = this;
            if (self.$scope.selectedList[item.ID]) {
                self.$scope.selectedDataObj[item.ID] = item;
            }
            else {
                delete self.$scope.selectedDataObj[item.ID];
            }
            this.$scope.selectedTotal = 0;
            angular.forEach(this.$scope.selectedList, function (val, key) {
                if (val) {
                    self.$scope.selectedTotal += 1;
                }
            });
        };
        Modal.prototype.refresh = function () {
            var self = this;
            var arg = {
                pageSize: 10,
                page: self.$scope.currentPageIndex
            };
            var callbackObj = {
                2: function () {
                    self.WechatPublicService.list(arg).then(function (result) {
                        if (result && result.Data) {
                            self.$scope.items = result.Data;
                            self.$scope.totalItems = result.TotalItems;
                        }
                        else {
                            self.$scope.totalItems = 0;
                        }
                    }, function () {
                        self.$scope.totalItems = 0;
                    });
                },
                3: function () {
                    self.WeiboService.list(arg).then(function (result) {
                        if (result) {
                            self.$scope.items = result.Data || [];
                            self.$scope.totalItems = result.TotalItems || 0;
                        }
                        else {
                            self.$scope.totalItems = 0;
                        }
                    }, function (err) {
                        self.$scope.totalItems = 0;
                    });
                },
                4: function () {
                    self.WechatFriendService.list(arg).then(function (result) {
                        if (result) {
                            self.$scope.items = result.Data || [];
                            self.$scope.totalItems = result.TotalItems || 0;
                        }
                        else {
                            self.$scope.totalItems = 0;
                        }
                    }, function (err) {
                        self.$scope.totalItems = 0;
                    });
                }
            };
            callbackObj[this.mediaType]();
        };
        Modal.prototype.ok = function () {
            var list = [];
            angular.forEach(this.$scope.selectedDataObj, function (item) {
                list.push(item);
            });
            this.$modalInstance.close(list);
        };
        Modal.prototype.cancel = function () {
            if (this.$scope.selectedTotal > 0) {
                this.ok();
            }
            else {
                this.$modalInstance.dismiss('cancel');
            }
        };
        Modal.prototype.pageChanged = function (page) {
            this.$scope.currentPageIndex = page;
            this.refresh();
        };
        return Modal;
    })();
    Modal.$inject = ['$scope', '$modalInstance', 'mediaType', 'WechatPublicService', 'WeiboService', 'WechatFriendService'];
    WeMedia.ControllerModule.controller('DataModalCtrl', Modal);
    PrecontractCtrl.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'ModalService', 'WechatPublicService', 'OrderService', '$modal'];
    WeMedia.ControllerModule.controller('WechatPrecontractCtrl', PrecontractCtrl);
    WeMedia.ControllerModule.controller('PrecontractCtrl', PrecontractCtrl);
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=precontract.js.map