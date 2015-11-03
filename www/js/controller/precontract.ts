/**
 *
 * Created by AaronYuan on 8/8/15.
 */

/// <reference path="../app.ts" />
/// <reference path="../auth.ts" />
/// <reference path="../config.ts" />
/// <reference path="../service/modal.ts" />
/// <reference path="../service/OrderService.ts" />
/// <reference path="../service/MediaAccount.ts" />

module WeMedia {
    'use strict';

    declare var window, ZENG;

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

        editID: number;

        detailBackUrl: string;
        closeDetail: Function;
        detailTotalInfo: any;

        getMediaStatus:Function;
        priceText: Function;
        priceText2: Function;
        CommissionedPrice: Function;

        uploadFile: Function;
        ReleaseTypeObject: any;
        PriceTypeNames: any;
        //releaseType: number;
        //releaseTypeList: Array<any>;
        //冻结资金
        frozenCapital:Function;
        acceptExecute: Function;

        canSaveTag: boolean;
    }

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
            public MediaAccountService: IMediaAccountService,
            public $timeout: ng.ITimeoutService,
            public Upload: any,
            public AuthService: IAuthInfoService
        ) {
            $scope.open = angular.bind(this, this.open);
            $scope.openList = angular.bind(this, this.openList);
            $scope.openAgreement = angular.bind(this, this.openAgreement);
            $scope.setPage = angular.bind(this, this.setPage);
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.saveWechat = angular.bind(this, this.saveWechat);
            $scope.deleteItem = angular.bind(this, this.deleteItem);
            $scope.clearItem = angular.bind(this, this.clearItem);
            $scope.getMediaStatus = angular.bind(this, this.getMediaStatus);
            $scope.closeDetail = angular.bind(this, this.closeDetail);
            $scope.priceText = angular.bind(this,this.priceText);
            $scope.priceText2 = angular.bind(this,this.priceText2);
            $scope.uploadFile = angular.bind(this, this.uploadFile);
            $scope.frozenCapital = angular.bind(this ,this.frozenCapital);
            $scope.CommissionedPrice = angular.bind(this, this.CommissionedPrice);
            $scope.acceptExecute = angular.bind(this, this.acceptExecute);

            $scope.editID = $stateParams['editID'];
            $scope.currentMediaType = $stateParams.mediaType * 1;
            if(!$scope.currentMediaType) {
                $scope.goToIndex();
            }

            $scope.canSaveTag = true;

            //$scope.releaseTypeList = ReleaseTypeObject[$scope.currentMediaType];

            $scope.currentMediaName = allMedias[$stateParams.mediaType];

            $scope.ReleaseTypeObject = ReleaseTypeObject;
            $scope.PriceTypeNames = PriceTypeNames;

            this.initData();
            this.initForEdit();
            this.initForDetail();
            this.calcInfo();
        }


        initData() {
            var self = this;
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
                Advertiser_ID: '',
                PriceType: '',
                agree: false
            };

            if(this.$scope.currentMediaType == 1){
                this.$scope.wechatForm.PriceType = '11';
            }
            if(this.$scope.currentMediaType == 2){
                this.$scope.wechatForm.PriceType = '2';
            }
            if(this.$scope.currentMediaType == 3){
                this.$scope.wechatForm.PriceType = '1';
            }
            this.$scope.selectedList = this.OrderService.selectedList; //WechatPublicService.selectedList;
            //this.OrderService.selectedList = [];

            this.$scope.$watch('wechatForm.PriceType', function(newValue,oldValue){
                    self.calcInfo();
            });
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

            if(!self.$scope.canSaveTag){
                window.navigator.notification.alert('已选资源中有部分账号不接受当前投放形式，请选择其它投放形式，或选择其它资源！',null);
                return;
            }

            this.$scope.wechatForm.mediaType = this.$scope.currentMediaType;
            if(this.validate()){
                if(!$valid) {
                    window.navigator.notification.alert('请检查所有输入项是否符合规则',null);
                    return ;
                }
                var ids = [];
                angular.forEach(this.$scope.selectedList, function(item){
                    ids.push(item.ID);
                });

                this.$scope.wechatForm.items = ids.join('#');
                //this.$scope.wechatForm.dataList = JSON.stringify(list);
                this.$scope.wechatForm.Advertiser_ID = this.$rootScope.user.ID;
                if(self.$scope.editID>0){
                    self.$scope.wechatForm.editID = self.$scope.editID;
                }

                this.OrderService.save(this.$scope.wechatForm).then(function(result){
                    if(result && result.Status == 1) {
                        var msg = '您的订单创建完成，请等待审核。';
                        if(self.$scope.editID){
                            msg = '订单修改成功，请等待审核。';
                        }
                        var message = msg + "</br><p style='font-size:10px; margin-top: 10px;'>温馨提示：订单审核通过后将不能修改/删除，请仔细核对您填写的订单信息，确认无误后点击发布。</br>如果您需要在订单审核通过后进行修改/删除，请联系客服。</p>";
                        window.navigator.notification.alert(message,function(){
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
                    name = 'advertiser.weiboPreList';
                    break;
                case 2:
                    name = 'advertiser.wechatPreList';
                    break;
                case 3:
                    name = 'advertiser.friendsPreList';
                    break;
            }
            if(name){
                this.$state.go(name);
                this.OrderService.selectedList = [];
            }
        }
        validate() {
            var result = true;
            var msg = '';
            if(!this.$scope.wechatForm.Title){
                msg = '请输入活动名称!';
            } else if(!this.$scope.wechatForm.Intro || this.$scope.wechatForm.Intro.length < 10){
                msg = '活动描述不能少于十个字，请修改您所填写的信息!';
            } else if((new Date(this.$scope.wechatForm.FeedbackTime)) - (new Date()) < 86400000 ){
                msg = '反馈时间必须晚于当前时间24小时.';
            } else if( (new Date(this.$scope.wechatForm.StartTime))<= (new Date())) {
                msg = '活动开始时间必须晚于今天.';
            } else if( (new Date(this.$scope.wechatForm.StartTime)) > (new Date(this.$scope.wechatForm.EndTime))) {
                msg = '活动开始时间不能在活动结束日期之后!';
            } else if(this.$scope.selectedList.length <=0){
                msg = '请添加预约资源!';
            } else if(!this.$scope.wechatForm.PriceType){
                msg = "请选择投放形式！";
            } else if(!this.$scope.wechatForm.agree){
                msg = '请同意相关服务协议！';
            }

            //else if(!this.$scope.wechatForm.Attachment || this.$scope.wechatForm.Attachment.length<=0){
            //    msg = "请上传附件！";
            //}

            if(msg) {
                //window.navigator.notification.alert(msg,null);
                ZENG.msgbox.show(msg, 1);
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
                MoreThreeRuan: 0,
                YGZhiFaPrice: 0,
                YGZhuanFaPrice:0,
                RGZhiFaPrice: 0,
                RGZhuanFaPrice: 0,
                Price: 0
            };
            var self = this;
            self.$scope.canSaveTag = true;
            var calcPrice = function(item){
                var price = item.PriceJSON[PriceTypeNames[self.$scope.wechatForm.PriceType]];
                if(isNaN(price) || price == 0) {
                    self.$scope.canSaveTag = false;
                    price = 0;
                }
                self.$scope.selectedTotalInfo[PriceTypeNames[self.$scope.wechatForm.PriceType]]  += price;

            };
            if(self.$scope.selectedList && self.$scope.selectedList.length>0){
                angular.forEach(this.$scope.selectedList,calcPrice); //callbackobj[self.$scope.currentMediaType]);
            }
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
            this.calcInfo();
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

        //
        initForEdit(){
            var self = this;
            if(self.$scope.editID > 0){
                this.OrderService.detail(self.$scope.editID).then(function (result) {
                    if (result && result.Data) {
                        self.$scope.wechatForm = result.Data[0];
                        self.$scope.wechatForm.PriceType +='';
                        self.$scope.wechatForm.FeedbackTime = self.calcTime(self.$scope.wechatForm.FeedbackTime);
                        self.$scope.wechatForm.StartTime = self.calcTime(self.$scope.wechatForm.StartTime);
                        self.$scope.wechatForm.EndTime = self.calcTime(self.$scope.wechatForm.EndTime);
                    }
                }, function (err) {
                    self.$timeout(function () {
                        self.$scope.selectedList = [];
                        self.calcInfo();
                    }, 2000);
                });

                this.OrderService.orderMediaList(self.$scope.editID).then(function (result) {
                    if (result && result.Data) {
                        self.$scope.selectedList = result.Data;
                        self.calcInfo();
                    }
                }, function (err) {
                });
            }
        }
        initForDetail(){
            var self = this;
            var detailID = self.$state.params['detailID'],
                type = self.$state.params["mediaType"] || 1,
                urls= {
                    2: 'advertiser.wechatPreList',
                    1: 'advertiser.weiboPreList',
                    3: 'advertiser.friendsPreList'
                };
            if(detailID) {
                self.$scope.detailBackUrl = urls[type];

                this.OrderService.detail(detailID).then(function (result) {
                    if (result && result.Data) {
                        self.$scope.wechatForm = result.Data[0];
                        self.$scope.wechatForm.FeedbackTime = self.calcTime(self.$scope.wechatForm.FeedbackTime);
                        self.$scope.wechatForm.StartTime = self.calcTime(self.$scope.wechatForm.StartTime);
                        self.$scope.wechatForm.EndTime = self.calcTime(self.$scope.wechatForm.EndTime);
                        self.$scope.wechatForm.AddTime = self.calcTime(self.$scope.wechatForm.AddTime);
                    }
                }, function (err) {
                    self.$timeout(function () {
                        self.$scope.selectedList = [];
                        //self.calcInfo();
                    }, 2000);
                });

                this.OrderService.orderDetailMediaList(detailID,null).then(function (result) {
                    if (result && result.Data) {
                        self.$scope.selectedList = result.Data;
                        //self.calcInfo();
                        self.calcTotalInfo();
                    }
                }, function (err) {
                });
            }
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
                   case 4:
                       self.$scope.detailTotalInfo.doing += 1;
                       break;
                   case 5:
                       self.$scope.detailTotalInfo.finish += 1;
                       break;
               }

           }) ;
        }

        closeDetail(){
            this.OrderService.selectedList = [];
            this.$state.go(this.$scope.detailBackUrl);
        }
        getMediaStatus(type){
            var statusName ={
                1: '等自媒体确认',
                2: '自媒体同意',
                3: '自媒体拒单',
                4: '待执行',//'已支付',
                5: '待验收',
                6: '未执行',
                7: '已完成',//'验收',
                8: '付款'
            };
            return statusName[type];
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
        priceText(price) {
            if(isNaN(price) || (price * 1) < 0){
                return '面议';
            }
            if(price == 0){
                return '不接';
            }
            return '￥'+ this.$rootScope.DisplayPrice(price).toFixed(2);
        }
        priceText2(price) {
            if(isNaN(price)){
                price = 0;
            }
            if(price < 0){
                return '价格请联系客服确定。';
            }
            return this.$rootScope.DisplayPrice(price||0).toFixed(2) + '元';
        }

        CommissionedPrice(price){
            if(isNaN(price)){
                price = 0;
            }
            return '￥'+ this.$rootScope.DisplayPrice(price).toFixed(2);
        }

        uploadFile(file) {
            var self = this;
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
                            self.$scope.wechatForm.Attachment = file.result.Message;
                            self.$scope.wechatForm.AttachmentName = file.name;
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

        //金额预付
        frozenCapital(item){
            var self = this;
            window.navigator.notification.confirm('预付后的金额将被暂时冻结，点击“确定”继续操作，点击“取消”返回。',function(index){
                if(index ==1){
                    self.frozenMoney(item);
                }else if(index ==2) {
                }
            },'提示',['确定','取消'],'');
        }

        frozenMoney(item){
            var self = this,
                state = item.BState;
            self.$rootScope.$emit("event:refresh-user-info",function(){
                if(self.$rootScope.user.AvailableBalance < item.CommissionedPrice){
                    ZENG.msgbox.show('您的账户余额不足，请先充值!',1);
                    self.$state.go('advertiser.recharge');
                } else{
                    self.OrderService.frozenAdvertiser({
                        ID: item.BID,
                        Cost: self.$rootScope.PlantformCost
                    }).then(function(result){
                        if(result && result.Status ==1){
                            item.BState = 4;
                            self.updateState(item, state, '支付成功，你的资金暂时由平台代管!',null);
                        }else{
                            ZENG.msgbox.show(result.Message || '操作失败，请确认您的账户中有可用余额。若您的账户余额为0，请先充值!',1);
                        }
                    }, function(err){
                        ZENG.msgbox.show('操作失败，请确认您的账户中有可用余额。若您的账户余额为0，请先充值!',1);
                    });
                }
            }, function(err){
            });
        }

        //确认验收
        acceptExecute(item){
            var self = this,
                state = item.BState;
            window.navigator.notification.confirm('确认完成后您的预付金额将转入对方（自媒体）账户，点击“确定”继续操作，点击“取消”返回。',function(index){
                if(index == 1){
                    item.BState = 7;

                    self.OrderService.acceptExecute({
                        ID: item.BID,
                        Cost: self.$rootScope.PlantformCost
                    }).then(function(result){
                        if(result && result.Status == 1){
                            ZENG.msgbox.show('验收成功.', 4);
                            self.updateState(item, state, '验收成功，将会付款给自媒体。', null);
                        }else{
                            item.BState = state;
                            ZENG.msgbox.show('操作失败，请稍后重试', 1);
                        }
                    },function(e){
                        item.BState = state;
                        ZENG.msgbox.show('操作失败，请稍后重试', 1);
                    });
                }
            },'提示',['确定','取消'],'');
        }
        updateState(item,state, msg ,callback){
            var args = {
                    id: item.BID,
                    state: item.BState
                },
                self = this;
            self.OrderService.orderDetailState(args).then(function(result){
                if(result && result.Status*1 > 0){
                    msg && ZENG.msgbox.show(msg, 4);
                    callback && callback();
                }else{
                    item.BState = state;
                    ZENG.msgbox.show('操作失败，请稍候重试!',1);
                }
            }, function(){
                item.BState = state;
                ZENG.msgbox.show('操作失败，请稍候重试!',5);
            });

        }


    }

    //数据弹出层
    class Modal {
        constructor(
            public $scope: any,
            public $modalInstance: any,
            public mediaType: any,
            public MediaAccountService:IMediaAccountService
        ) {
            $scope.cancel = angular.bind(this, this.cancel);
            $scope.ok = angular.bind(this, this.ok);
            $scope.addItem = angular.bind(this, this.addItem);
            $scope.pageChanged = angular.bind(this,this.pageChanged);
            $scope.priceText = angular.bind(this, this.priceText);
            $scope.refresh = angular.bind(this, this.refresh);

            //数据
            $scope.selectedList = {};
            $scope.selectedDataObj = {};
            $scope.items = [];
            $scope.selectedTotal = 0;
            $scope.currentPageIndex = 1;
            $scope.totalItems = 0;
            $scope.mediaType = mediaType;
            $scope.keyword = '';

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
                ChannelID: this.mediaType,
                keyword: self.$scope.keyword
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
        priceText(price) {
            if(isNaN(price) || (price * 1) < 0){
                return '电议';
            }
            if(price == 0){
                return '不接';
            }
            return '￥'+ this.$scope.$root.DisplayPrice(price).toFixed(2);
        }
    }

    Modal.$inject = ['$scope', '$modalInstance','mediaType', 'MediaAccountService'];
    ControllerModule.controller('DataModalCtrl', Modal);

    PrecontractCtrl.$inject = ['$rootScope','$scope', '$state', '$stateParams', 'ModalService',  'OrderService', '$modal', 'MediaAccountService', '$timeout', 'Upload', 'AuthService'];
    ControllerModule.controller('WechatPrecontractCtrl', PrecontractCtrl);
    ControllerModule.controller('PrecontractCtrl', PrecontractCtrl);
    ControllerModule.controller('PrecontractDetailCtrl', PrecontractCtrl);
}

