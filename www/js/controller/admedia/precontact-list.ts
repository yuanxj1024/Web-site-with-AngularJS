/**
 * Created by AaronYuan on 15/9/13.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/OrderService.ts" />

module WeMedia {
    'use strict';

    declare var window, ZENG;

    var orderTypeNames = {
        1: '全部',
        2: '待执行',
        3: '已完成'
    };

    var PriceTypeNames = {
        1: "Price",
        2:"SingleYing",
        3:"SingleRuan",
        4:"MoreFirstYing",
        5:"MoreFirstRuan",
        6:"MoreSecondYing",
        7:"MoreSecondRuan",
        8:"MoreThreeYing",
        9:"MoreThreeRuan",
        10:"YGZhuanFaPrice",
        11: "YGZhiFaPrice",
        12: "RGZhuanFaPrice",
        13: "RGZhiFaPrice"
    };
    var ReleaseTypeObject = {
        10: '硬广转发',
        11: '硬广直发',
        12: '软广转发',
        13: '软广直发',
        2: '硬广单图文',
        3: '软广单图文',
        4: '硬广多图文第一条',
        5: '软广多图文第一条',
        6: '硬广多图文第二条',
        7: '软广多图文第二条',
        8: '硬广多图文3~N条',
        9: '软广多图文3~N条',
        1: '直发'
    };


    class PrecontactList {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: any,
            public OrderService:IOrderService,
            public $stateParams: IWMStateParamsService,
            public $state: ng.ui.IStateService,
            public $timeout: ng.ITimeoutService,
            public Upload: any
        ){
            $scope.getChannelName = angular.bind(this, this.getChannelName);
            $scope.getStateName = angular.bind(this, this.getStateName);
            $scope.searchHandler = angular.bind(this, this.searchHandler);
            $scope.updateState = angular.bind(this, this.updateState);
            $scope.rejectOrder = angular.bind(this, this.rejectOrder);
            $scope.openDetail = angular.bind(this, this.openDetail);
            $scope.closeDetail = angular.bind(this, this.closeDetail);
            $scope.getMediaStatus = angular.bind(this, this.getMediaStatus);
            $scope.priceText = angular.bind(this, this.priceText);
            $scope.uploadFile = angular.bind(this, this.uploadFile);
            $scope.ReleaseType = ReleaseType;
            $scope.agreeOrder = angular.bind(this, this.agreeOrder);

            $scope.orderType = $stateParams.orderType;
            $scope.orderTitle = orderTypeNames[$stateParams.orderType];

            $scope.PriceTypeNames = PriceTypeNames;
            $scope.ReleaseTypeObject = ReleaseTypeObject;

            var self = this;

            this.init();
            this.initDetail();
            //this.$rootScope.$on('$stateChangeSuccess', function(e,state){
            //    console.log(23);
            //    console.log(state);
            //    if(state.name.indexOf('preorderlist') > 0 && state.params['orderType']){
            //        $scope.orderType = state.params.orderType;
            //        $scope.orderTitle = orderTypeNames[state.params.orderType];
            //        //self.refresh();
            //        self.init();
            //    }
            //});
        }
        convertOrderType(type){
            if(type ==1){
                return null;
            }else if(type == 2){
                return 3;
            } else if(type == 3){
                return 4;
            }
            return null;
        }

        init() {
            this.$scope.dataList = [1];
            this.$scope.currentPageIndex = 1;
            this.$scope.totalItems = 0;
            this.$scope.pageSize = 15;
            this.$scope.search = {
                channelID: '',
                name: ''
            };

            this.refresh();
        }


        refresh(args = {}){
            var self = this;
            var statelist = {
                1: '',
                2: '4',
                3: '7'
            };
            args =  angular.extend({
                userID: self.$rootScope.user.ID,
                page: self.$scope.currentPageIndex,
                pageSize: self.$scope.pageSize,
                state: statelist[self.$scope.orderType] ,
                name: self.$scope.search.name,
                channelID: self.$scope.search.channelID? self.$scope.search.channelID: ''
            }, args);
            this.OrderService.myOrderList(args).then(function(result){
                if(typeof result == 'string'){
                    result = JSON.parse(result);
                }
                if(result && result.Data){
                    self.$scope.dataList = result.Data;
                    self.$scope.totalItems = result.TotalItems;
                }
            }, function(){
                self.$scope.dataList= [];
                self.$scope.totalItems = 0;
            });
        }

        getChannelName(code) {
            return {
                1: '微博',
                2: '公众号',
                3: '朋友圈'
            }[code];
        }

        getStateName(code){
            //return {
            //    1: '待确认',
            //    2: '已同意',
            //    3: '待执行',
            //    4: '执行完成',
            //    5: '已拒绝'
            //}[code];
        }

        updateState(id: number, state:number = 1,msg:string ='',money:any='',attachment:any=''){
            var args = {
                id: id,
                state: state,
                message: msg,
                money: money,
                attachment: attachment
            },
                self = this;
            self.OrderService.orderDetailState(args).then(function(result){
                if(result && result.Status*1 > 0){
                    self.refresh();
                    ZENG.msgbox.show('操作成功!',4);
                }else{
                    ZENG.msgbox.show('操作失败，请稍候重试!',1);
                }
            }, function(){
                ZENG.msgbox.show('操作失败，请稍候重试!',5);
            });

        }

        searchHandler(){
            this.refresh();
        }

        agreeOrder(item){
            var self = this,
                price = item.PriceJSON[PriceTypeNames[item.PriceType]];
            if(price* 1 <= 0){
                var money = prompt('请输入最终商议后的价格：');
                if(money && /^\d+(\.\d{1,3})?$/.test(money)){
                    self.updateState(item.BID,2, '',money);
                }else{
                    ZENG.msgbox.show('请输入正确的价格!',1);
                }
            }else{
                self.updateState(item.BID,2, '', price);
            }
        }

        rejectOrder(id:number) {
            var reject = prompt('请输入拒单理由：');
            if(reject){
                this.updateState(id, 3, reject);
            }else{
                ZENG.msgbox.show('请输入拒单理由!',1);
            }
        }
        openDetail(id, type) {
            var url = {
                1: 'admedia.weiboPrecontractDetail',
                2: 'admedia.wechatPrecontractDetail',
                3: 'admedia.friendsPrecontractDetail'
            };
            this.$state.go(url[type],{detailID: id,type:type ,tag: this.$scope.orderType});
        }
        calcTime(time) {
            if(time){
                var t = time.match(/\d{10,}/);
                if(t){
                    return new Date(t*1);
                }
            }
            return new Date();
        }

        initDetail(){
            var self = this ;
            this.$scope.detailID = this.$stateParams['detailID'];
            this.$scope.currentMediaType = this.$stateParams['type'];
            self.$scope.PerformImage = "";
            var tag =  this.$stateParams['tag'];
            self.$scope.selectedList = [];
            var urls = {
                1: 'admedia.preorderlist.all',
                2: 'admedia.preorderlist.unexecute',
                3: 'admedia.preorderlist.finished'
            };


            var list = function(){
                self.OrderService.orderDetailMediaList(self.$scope.detailID,self.$rootScope.user.ID).then(function (result) {
                    if (result && result.Data) {
                        self.$scope.selectedList = result.Data;
                        //self.calcTotalInfo();
                    }
                }, function (err) {
                });
            };
            if(this.$scope.detailID){
                this.$scope.detailBackUrl = urls[tag];
                this.OrderService.detail(self.$scope.detailID).then(function (result) {
                    if (result && result.Data) {
                        self.$scope.wechatForm = result.Data[0];
                        self.$scope.wechatForm.FeedbackTime = self.calcTime(self.$scope.wechatForm.FeedbackTime);
                        self.$scope.wechatForm.StartTime = self.calcTime(self.$scope.wechatForm.StartTime);
                        self.$scope.wechatForm.EndTime = self.calcTime(self.$scope.wechatForm.EndTime);
                        self.$scope.wechatForm.AddTime = self.calcTime(self.$scope.wechatForm.AddTime);
                        list();
                    }
                }, function (err) {
                    self.$timeout(function () {
                        self.$scope.selectedList = [];
                    }, 2000);
                });


            }
        }
        closeDetail(){
            this.$state.go(this.$scope.detailBackUrl);
        }
        getMediaStatus(type){
            var status ={
                1: '等自媒体确认',
                2: '等待客户支付',//'媒介主同意',
                3: '自媒体拒单',
                4: '已支付，请执行',
                5: '执行完成',
                6: '未执行',
                7: '已验收',
                8: '付款'
            };
            return status[type];
        }
        calcTotalInfo(){
            var self = this;
            self.$scope.detailTotalInfo = {
                all: this.$scope.selectedList.length,
                pending: 0,
                doing: 0,
                finish: 0
            };
            angular.forEach(this.$scope.selectedList,function(item){
                switch (item.BState){
                    case 1:
                        self.$scope.detailTotalInfo.pending += 1;
                        break;
                    case 3:
                        self.$scope.detailTotalInfo.doing += 1;
                        break;
                    case 4:
                        self.$scope.detailTotalInfo.finish += 1;
                        break;
                }

            }) ;
        }
        priceText(price) {
            if(isNaN(price) || (price * 1) < 0){
                return '电议';
            }
            if(price == 0){
                return '不接';
            }
            return '￥'+price.toFixed(2);
        }

        uploadFile(file, item) {
            var self = this,
                status = item.BState;
            if (file) {
                file.upload = self.Upload.upload({
                    url: '/API/Upload?ID='+ self.$rootScope.user.ID,
                    file: file
                });
                file.upload.then(function (response) {
                    self.$timeout(function () {
                        file.result = response.data;
                        if(typeof file.result == 'string') {
                            file.result = JSON.parse(file.result);
                        }
                        if(file.result){
                            item.BState = 5;
                            item.BPerformImage = file.result.Message;
                            self.updateState(item.BID,5, '','', item.BPerformImage);
                        }
                    });
                }, function (response) {
                    if (response.status > 0) {
                        ZENG.msgbox.show('文件上传失败，请重试!',5);
                    }
                });
                file.upload.progress(function (evt) {
                    file.progress = Math.min(100, parseInt((100 *  evt.loaded / evt.total)+''));
                });
            }
        }


    }

    PrecontactList.$inject = ['$rootScope', '$scope', 'OrderService', '$stateParams', '$state' ,'$timeout', 'Upload'];
    ControllerModule.controller('AdMediaPrecontactListCtrl', PrecontactList);
    ControllerModule.controller('PendingAdMediaPrecontactListCtrl', PrecontactList);
    ControllerModule.controller('DoneAdMediaPrecontactListCtrl', PrecontactList);
    ControllerModule.controller('AdmediaPrecontactDetalCtrl', PrecontactList);

}
