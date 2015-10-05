/**
 *
 * Created by AaronYuan on 8/8/15.
 */

/// <reference path="../app.ts" />
/// <reference path="../config.ts" />
/// <reference path="../service/modal.ts" />
/// <reference path="../service/OrderService.ts" />
/// <reference path="../service/MediaAccount.ts" />

module WeMedia {
    'use strict';

    declare var window;

    export interface IWechatPrecontractScope extends IWMBaseScope {
        dt:any;
        opened: boolean;
        open: Function;
        openList: Function;
        openAgreement: Function;

        wechatForm:any;
        saveWechat:Function;
        selectedList: Array<any>;
        selectedTotalInfo: any;

        currentPageIndex: number;
        setPage: Function;
        pageChanged: Function;

        //数据列表
        modalData: Array<any>;
        deleteItem: Function;
        clearItem: Function;
    }


    class PrecontractCtrl {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IWechatPrecontractScope,
            public $state: ng.ui.IStateService,
            public $stateParams: IWMStateParamsService,
            public ModalService: IModalService,
            //public WechatPublicService: IWechatPublicService,
            public OrderService: IOrderService,
            public $modal: any,
            public MediaAccountService: IMediaAccountService
        ) {

            $scope.open = angular.bind(this, this.open);
            $scope.openList = angular.bind(this, this.openList);
            $scope.openAgreement = angular.bind(this, this.openAgreement);
            $scope.setPage = angular.bind(this, this.setPage);
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.saveWechat = angular.bind(this, this.saveWechat);
            $scope.deleteItem = angular.bind(this, this.deleteItem);
            $scope.clearItem = angular.bind(this, this.clearItem);

            $scope.currentMediaType = $stateParams.mediaType * 1;
            if(!$scope.currentMediaType) {
                //$scope.goToIndex();
            }
            $scope.currentMediaName = allMedias[$stateParams.mediaType];
            this.initData();

            this.calcInfo();
        }

        initData() {
            this.$scope.modalData = [];
            this.$scope.currentPageIndex = 1;
            this.$scope.selectedTotalInfo = {};

            //公众号表单
            this.$scope.wechatForm = {
                Title:'',
                Intro: '',
                StartTime: '',
                EndTime: '',
                FeedbackTime: '',
                IsNoticeResult: '',
                Advertiser_ID: ''
            };

            this.$scope.selectedList = this.OrderService.selectedList; //WechatPublicService.selectedList;
            //this.OrderService.selectedList = [];
        }

        open() {
            this.$scope.opened = !this.$scope.opened;
        }

        openAgreement() {
            this.ModalService.open('lg', './page/agreement.html');
        }

        setPage(page:number) {

        }
        pageChanged(index) {
            this.$scope.currentPageIndex = index;
        }

        saveWechat($valid):void {
            var self = this;
            if(!$valid) {
                window.navigator.notification.alert('请将信息填写完整',null);
            }
            this.$scope.wechatForm.mediaType = this.$scope.currentMediaType;
            if(this.validate()){
                var ids = [];
                angular.forEach(this.$scope.selectedList, function(item){
                    ids.push(item.ID);
                });

                this.$scope.wechatForm.items = ids.join('#');
                //this.$scope.wechatForm.dataList = JSON.stringify(list);
                this.$scope.wechatForm.Advertiser_ID = this.$rootScope.user.ID;

                this.OrderService.save(this.$scope.wechatForm).then(function(result){
                    if(result && result.Status == 1) {
                        window.navigator.notification.alert('您的订单创建完成，请等待审核。',function(){
                            self.goList();
                        });

                    }else {
                        window.navigator.notification.alert('数据保存失败，请稍后重试',null);
                    }
                },function(err){
                    window.navigator.notification.alert('数据保存失败，请稍后重试',null);
                });

            }
        }
        goList(){
            var name = '';
            switch (this.$scope.currentMediaType*1){
                case 1:
                    name = 'advertiser.weibo';
                    break;
                case 2:
                    name = 'advertiser.wechat';
                    break;
                case 3:
                    name = 'advertiser.friends';
                    break;
            }
            if(name){
                this.$state.go(name);
            }
        }
        validate() {
            var result = true;
            var msg = '';
            if((new Date(this.$scope.wechatForm.FeedbackTime)) - (new Date()) < 86400000 ){
                msg = '反馈时间必须晚于当前时间24小时.';
            } else if( (new Date(this.$scope.wechatForm.StartTime))<= (new Date())) {
                msg = '活动开始时间必须晚于今天.';
            } else if( (new Date(this.$scope.wechatForm.StartTime)) > (new Date(this.$scope.wechatForm.EndTime))) {
                msg = '活动开始时间不能在活动结束日期之后!';
            } else if(this.$scope.selectedList.length <=0){
                msg = '请添加预约资源!';
            }

            if(msg) {
                window.navigator.notification.alert(msg,null);
                result = false;
            }

            return result;
        }

        openList(){
            var self =this;
            var modalInstance = this.$modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'DataModalCtrl',
                size: 'lg',
                resolve: {
                    mediaType: function(){
                        return self.$scope.currentMediaType;
                    }
                }
            });

            modalInstance.result.then(function(items){
                if(items && items.length > 0){
                    self.$scope.selectedList =  self.$scope.selectedList.concat(items);
                    self.calcInfo();
                }
            },function(){
            });
        }

        calcInfo() {
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
                2:function(item){
                    self.$scope.selectedTotalInfo.SingleYing += item.PriceJSON.SingleYing;
                    self.$scope.selectedTotalInfo.SingleRuan += item.PriceJSON.SingleRuan;
                    self.$scope.selectedTotalInfo.MoreFirstYing += item.PriceJSON.MoreFirstYing;
                    self.$scope.selectedTotalInfo.MoreFirstRuan += item.PriceJSON.MoreFirstRuan;
                    self.$scope.selectedTotalInfo.MoreSecondYing += item.PriceJSON.MoreSecondYing;
                    self.$scope.selectedTotalInfo.MoreSecondRuan += item.PriceJSON.MoreSecondRuan;
                    self.$scope.selectedTotalInfo.MoreThreeYing += item.PriceJSON.MoreThreeYing;
                    self.$scope.selectedTotalInfo.MoreThreeRuan += item.PriceJSON.MoreThreeRuan;
                },
                1: function(item){
                    self.$scope.selectedTotalInfo.YGZhiFaPrice += item.PriceJSON.YGZhiFaPrice;
                    self.$scope.selectedTotalInfo.YGZhuanFaPrice += item.PriceJSON.YGZhuanFaPrice;
                    self.$scope.selectedTotalInfo.RGZhiFaPrice += item.PriceJSON.RGZhiFaPrice;
                    self.$scope.selectedTotalInfo.RGZhuanFaPrice += item.PriceJSON.RGZhiFaPriceRGZhiFaPrice;
                },
                3: function(item){
                    self.$scope.selectedTotalInfo.Price += item.PriceJSON.Price;

                }
            };
            angular.forEach(this.$scope.selectedList,callbackobj[self.$scope.currentMediaType]);
        }

        deleteItem(id:number){
            var self = this,i =0, temp;
            angular.forEach(this.$scope.selectedList, function(item){
                if(item.id == id){
                    temp = i;
                }
                i++;
            });
            this.$scope.selectedList.splice(temp, 1);
        }

        clearItem() {
            var self = this;
            window.navigator.notification.confirm('确定清空所有的资源吗？', function(index){
                if(index == 1){
                    self.$scope.selectedList = [];
                    self.calcInfo();
                }

            }, '全部清空', ['清空' ,'取消']);
      }

    }

    //数据弹出层
    class Modal {
        constructor(
            public $scope: any,
            public $modalInstance: any,
            public mediaType: any,
            public MediaAccountService:IMediaAccountService
            //public WechatPublicService: IWechatPublicService,
            //public WeiboService: IWeiboService,
            //public WechatFriendService: IWechatFriendService
        ) {
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

        addItem(item) {
            var self =this;
            if(self.$scope.selectedList[item.ID]){
                self.$scope.selectedDataObj[item.ID] = item;
            }else{
                delete self.$scope.selectedDataObj[item.ID];
            }
            this.$scope.selectedTotal = 0;
            angular.forEach(this.$scope.selectedList, function(val,key){
                if(val){
                    self.$scope.selectedTotal += 1;
                }
            });
        }

        refresh() {
            var self = this;
            var arg = {
                pageSize: 10,
                page: self.$scope.currentPageIndex,
                isEnable: 1,
                ChannelID: this.mediaType
            };
            self.MediaAccountService.list(arg).then(function(result){
                if(result && result.Data){
                    self.$scope.items = result.Data;
                    self.$scope.totalItems = result.TotalItems;
                }else {
                    self.$scope.totalItems = 0;
                }
            },function(){
                self.$scope.totalItems = 0;
            });
        }

        ok(){
            var list = [];
            angular.forEach(this.$scope.selectedDataObj, function(item){
                list.push(item);
            });
            this.$modalInstance.close(list);
        }
        cancel() {
            if(this.$scope.selectedTotal > 0) {
                this.ok();
            }else {
                this.$modalInstance.dismiss('cancel');
            }
        }
        pageChanged(page){
            this.$scope.currentPageIndex = page;
            this. refresh();
        }
    }

    Modal.$inject = ['$scope', '$modalInstance','mediaType', 'MediaAccountService'];
    ControllerModule.controller('DataModalCtrl', Modal);

    PrecontractCtrl.$inject = ['$rootScope','$scope', '$state', '$stateParams', 'ModalService',  'OrderService', '$modal', 'MediaAccountService'];
    ControllerModule.controller('WechatPrecontractCtrl', PrecontractCtrl);
    ControllerModule.controller('PrecontractCtrl', PrecontractCtrl);
}

