/**
 * Created by AaronYuan on 8/19/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/MediaAccount.ts" />

module WeMedia {
    'use strict';

    declare var ZENG:any;
    interface IAccountScope extends IWMBaseScope {
        wechatSearch:any;
        weiboSearch:any;

        data:any;
        addAccount:Function;
        getStatus: Function;
        search: Function;
        searchArgs: any;

        pageChanged:Function;
        currentPage: number;
        totalItems: number;
        pageSize: number;

        openOrClose:Function;
        checkedItems: any;

        uploadFile:Function;
        fileContainer: any;

        editItem: Function;
    }

    class Account {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IAccountScope,
            public $state: ng.ui.IStateService,
            public $stateParams: IWMStateParamsService,
            public MediaAccountService: IMediaAccountService
            //public WechatPublicService: IWechatPublicService,
            //public WeiboService: IWeiboService,
            //public WechatFrinedService: IWechatFriendService
        ) {
            var self =this;
            $scope.currentMediaType = $stateParams.mediaType;
            $scope.currentMediaName = allMedias[$stateParams.mediaType];
            $scope.addAccount = angular.bind(this, this.addAccount);
            $scope.pageChanged = angular.bind(this,this.pageChanged);
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
                checkedItems:{}
            };

            $rootScope.$on('$stateChangeSuccess', function(e,state){
                if(['admedia.account.wechat', 'admedia.account.weibo','admedia.account.friends'].indexOf(state.name) > -1){
                    self.$scope.currentMediaType = state.params.mediaType;
                    self.refresh(state,null);
                    self.$scope.searchArgs.checkedItems = {};
                }
            });

            this.refresh($state.current, null);
        }

        refresh(state, args){
            var self = this;
            args = angular.extend({
                MediaID:this.$rootScope.user.ID,
                ChannelID: this.$scope.currentMediaType
            }, args);

            this.MediaAccountService.list(args).then(function(result){
                if(result) {
                    self.$scope.data = result.Data || [];
                    self.$scope.totalItems = result.TotalItems || 0;
                }else{
                    self.$scope.totalItems = 0;
                }
            }, function(err){
                self.$scope.totalItems = 0;
            });
        }

        addAccount(){
            var type = {
                1:  'admedia.account.addweibo',
                2: 'admedia.account.addwechat',
                3: 'admedia.account.addfriends'
            };
            this.$state.go(type[this.$scope.currentMediaType]);
        }

        pageChanged(page) {
            this.$scope.currentPage = page;
            this.refresh(this.$state.current, {
                pageSize: this.$scope.pageSize,
                page: this.$scope.currentPage
            });
        }

        getStatus(status) {
            switch (status) {
                default:
                case 'WX1':
                    return '审核中';
                case 'WX2':
                    return '通过';
            }
        }

        search() {
            var self = this;
            this.refresh(this.$state.current, {
                pageSize: this.$scope.pageSize,
                page: this.$scope.currentPage,
                keyWord: self.$scope.searchArgs.keyword
            });
        }

        openOrClose(tag:boolean) {
            var list = [];
            angular.forEach(this.$scope.searchArgs.checkedItems, function(value,key){
                if(value){
                    list.push(key);
                }
            });
            if(list.length == 0){
                ZENG.msgbox.show('请先选择操作的资源!',1);
                return ;
            }
            var self = this;
            this.MediaAccountService.updateStatus({
                ids: list.join('#'),
                status: tag? 1: 0
            }).then(function (result) {
                if(result && result.Status == 1){
                    ZENG.msgbox.show('操作成功!',4);
                    self.refresh(self.$state.current, {
                        pageSize: self.$scope.pageSize,
                        page: self.$scope.currentPage
                    });
                }else {
                    ZENG.msgbox.show('操作失败，稍后重试!',5);
                }
            }, function(err) {
                ZENG.msgbox.show('操作失败，稍后重试!',5);
            });
        }

        editItem(id){
            var url = {
                1: 'admedia.account.addweibo',
                2:  'admedia.account.addwechat',
                3:  'admedia.account.addfriends'
            };

            this.$state.go( url[this.$scope.currentMediaType], {
                ID: id
            });
        }

    }

    Account.$inject = ['$rootScope', '$scope' , '$state', '$stateParams','MediaAccountService',];
    ControllerModule.controller('AccountCtrl', Account);
}

