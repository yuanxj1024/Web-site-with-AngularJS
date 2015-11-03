/**
 * Created by AaronYuan on 9/3/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../config.ts" />
/// <reference path="../../service/modal.ts" />
/// <reference path="../../service/WechatPublic.ts" />
/// <reference path="../../service/OrderService.ts" />

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

        currentPageIndex: number;
        setPage: Function;
        pageChanged: Function;
    }


    class PrecontractCtrl {
        constructor(
            public $scope: IWechatPrecontractScope,
            public $state: ng.ui.IStateService,
            public $stateParams: IWMStateParamsService,
            public ModalService: IModalService,
            public WechatPublicService: IWechatPublicService,
            public OrderService: IOrderService,
            public $modal: any
        ) {

            $scope.open = angular.bind(this, this.open);
            $scope.openList = angular.bind(this, this.openList);
            $scope.openAgreement = angular.bind(this, this.openAgreement);
            $scope.setPage = angular.bind(this, this.setPage);
            $scope.pageChanged = angular.bind(this, this.pageChanged);
            $scope.saveWechat = angular.bind(this, this.saveWechat);

            //公众号表单
            $scope.wechatForm = {
                Title:'',
                Intro: '',
                StartTime: '',
                EndTime: '',
                FeedbackTime: '',
                IsNoticeResult: '',
                Advertiser_ID: ''
            };

            $scope.selectedList = WechatPublicService.selectedList;

            $scope.currentPageIndex = 1;

            $scope.currentMediaType = $stateParams.mediaType;
            if(!$scope.currentMediaType) {
                //$scope.goToIndex();
            }
            $scope.currentMediaName = allMedias[$stateParams.mediaType];
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
            if(!$valid) {
                window.navigator.notification.alert('请将信息填写完整',null);
            }
            if(this.validate()){
                this.OrderService.save(this.$scope.wechatForm).then(function(result){
                    if(result && result.Status == 1) {
                        window.navigator.notification.alert('数据保存失败，请稍后重试',null);
                    }else {
                        window.navigator.notification.alert('数据保存失败，请稍后重试',null);
                    }
                },function(err){
                    window.navigator.notification.alert('数据保存失败，请稍后重试',null);
                });

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
            } else if(this.WechatPublicService.selectedList.length <=0){
                msg = '请添加预约资源!';
            }

            if(msg) {
                window.navigator.notification.alert(msg,null);
                result = false;
            }

            return result;
        }

        openList(){
            var modalInstance = this.$modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'DataModalCtrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        return [{id:1},{id:2}];
                    }
                }
            });

            modalInstance.result.then(function(items){
            },function(){

            });
        }

        closeModal() {
            //this.$modalInstance.
            //this.$modalInstance.dismiss('cancel');
        }
    }

    class Modal {
        constructor(
            public $scope: any,
            public $modalInstance: any,
            public items: any
        ) {
            $scope.cancel = angular.bind(this, this.cancel);
            $scope.ok = angular.bind(this, this.ok);
            $scope.addItem = angular.bind(this, this.addItem);

            $scope.selectedList = {};
            $scope.items = items;
            $scope.selectedTotal = 0;
            $scope.$watch('selectedList' ,function(){
                angular.forEach($scope.selectedList, function(item){
                });

            });
        }

        addItem(item) {
            this.$scope.selectedTotal = 0;
            var self = this;
            angular.forEach(this.$scope.selectedList, function(value,key){
                if(value){
                    self.$scope.selectedTotal += 1;
                }
            });
        }

        ok(){
            this.$modalInstance.close(this.$scope.selectedList);
        }

        cancel() {
            if(this.$scope.selectedTotal>0) {
                this.$modalInstance.close(this.$scope.selectedList);
            }else {
                this.$modalInstance.dismiss('cancel');
            }
        }
    }

    Modal.$inject = ['$scope', '$modalInstance','items'];
    ControllerModule.controller('DataModalCtrl', Modal);

    PrecontractCtrl.$inject = ['$scope', '$state', '$stateParams', 'ModalService', 'WechatPublicService', 'OrderService', '$modal'];
    ControllerModule.controller('WechatPrecontractCtrl', PrecontractCtrl);
    ControllerModule.controller('PrecontractCtrl', PrecontractCtrl);
    //ControllerModule.controller('WechatPrecontractCtrl', PrecontractCtrl);
    ControllerModule.controller('PrecontractListCtrl', PrecontractCtrl);
}

