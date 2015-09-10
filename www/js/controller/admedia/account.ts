/**
 * Created by AaronYuan on 8/19/15.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/WechatPublic.ts" />
/// <reference path="../../service/WeiboService.ts" />
/// <reference path="../../service/WechatFriends.ts" />

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

    }

    class Account {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IAccountScope,
            public $state: ng.ui.IStateService,
            public $stateParams: IWMStateParamsService,
            public WechatPublicService: IWechatPublicService,
            public WeiboService: IWeiboService,
            public WechatFrinedService: IWechatFriendService
        ) {
            var self =this;
            $scope.currentMediaType = $stateParams.mediaType;
            $scope.currentMediaName = allMedias[$stateParams.mediaType];
            $scope.addAccount = angular.bind(this, this.addAccount);
            $scope.pageChanged = angular.bind(this,this.pageChanged);
            $scope.getStatus = angular.bind(this, this.getStatus);
            $scope.search = angular.bind(this, this.search);
            $scope.openOrClose = angular.bind(this, this.openOrClose);

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
                    self.refresh(state,null);
                    self.$scope.searchArgs.checkedItems = {};
                }
            });

            this.refresh($state.current, null);
        }

        refresh(state, args){
            var self = this;
            switch (state.name) {
                case 'admedia.account.wechat':
                    this.$scope.currentMediaType = 2;
                    this.WechatPublicService.list(args).then(function(result){
                        if(result){
                            self.$scope.data = result.Data || [];
                            self.$scope.totalItems = result.TotalItems || 0;
                        }
                    },function(err){
                        self.$scope.totalItems = 0;
                    });
                    break;
                case 'admedia.account.weibo':
                    this.$scope.currentMediaType = 3;
                    this.WeiboService.list(args).then(function(result){
                        if(result) {
                            self.$scope.data = result.Data || [];
                            self.$scope.totalItems = result.TotalItems || 0;
                        }else{
                            self.$scope.totalItems = 0;
                        }
                    }, function(err){
                        self.$scope.totalItems = 0;
                    });
                    break;
                case 'admedia.account.friends':
                    this.$scope.currentMediaType = 4;
                    this.WechatFrinedService.list(args).then(function(result){
                        if(result) {
                            self.$scope.data = result.Data || [];
                            self.$scope.totalItems = result.TotalItems||0;
                        } else {
                            self.$scope.totalItems = 0;
                        }
                    }, function(err){
                        self.$scope.totalItems = 0;
                    });
                    break;
            }
        }

        addAccount(){
            var name = '';
            switch(this.$scope.currentMediaType*1) {
                case 1:
                    break;
                case 2:
                    name = 'admedia.account.addwechat';
                    break;
                case 3:
                    name = 'admedia.account.addweibo';
                    break;
                case 4:
                    name = 'admedia.account.addfriends';
                    break;
            }
            if(name) {
                this.$state.go(name);
            }
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
            console.log(this.$scope.searchArgs);
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
            console.log(list.join('#'));
            if(list.length == 0){
                ZENG.msgbox.show('请先选择操作的资源!',1);
                return ;
            }
            var self = this;
            switch (this.$state.current.name) {
                case  "admedia.account.wechat":
                    this.WechatPublicService.updateStatus({
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
                    break;
                case  "admedia.account.weibo":
                    break;
                case  "admedia.account.friends":
                    break;
            }
        }

    }

    Account.$inject = ['$rootScope', '$scope' , '$state', '$stateParams', 'WechatPublicService', 'WeiboService', 'WechatFriendService'];//, '$stateProvider'];
    ControllerModule.controller('AccountCtrl', Account);
}

