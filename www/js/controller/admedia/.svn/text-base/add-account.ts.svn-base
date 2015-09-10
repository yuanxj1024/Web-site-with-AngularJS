/**
 * Created by AaronYuan on 8/21/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/SearchTypes.ts" />
/// <reference path="../../service/WeChatPublic.ts" />
/// <reference path="../../service/WeiboService" />
/// <reference path="../../service/WechatFriends.ts" />
/// <reference path="../../service/Region.ts" />

module WeMedia {
    'use strict';

    declare var window,ZENG;

    interface IAddAccountScope extends IWMBaseScope {
        searchTypeData: any;
        wechatForm: any;
        resetWechat: any;
        resetWeibo: any;
        resetFriend: any;

        weiboForm: any;
        friendsForm: any;

        goBack:Function;
        save: Function;

        uploadFile: Function;
        fileContainer: Function;

        getRegionList: Function;
        provinceList: Array<any>;
        cityList: Array<any>;
    }



    class AddAccount {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IAddAccountScope,
            public $state: ng.ui.IStateService,
            public $stateParams: IWMStateParamsService,
            public SearchTypeService: ISearchTypeService,
            public WechatPublicService: IWechatPublicService,
            public WeiboService: IWeiboService,
            public WechatFriend: IWechatFriendService,
            public Upload: any,
            public $timeout: ng.ITimeoutService,
            public RegionService: IRegionService
        ) {
            $scope.currentMediaType = $stateParams.mediaType;
            $scope.currentMediaName = allMedias[$stateParams.mediaType];
            $scope.goBack = angular.bind(this,this.goBack);
            $scope.save = angular.bind(this,this.save);
            $scope.uploadFile = angular.bind(this, this.uploadFile);
            $scope.getRegionList = angular.bind(this, this.getRegionList);

            $scope.searchTypeData = {
                common: [],
                industry: [],
                employment: []
            };

            var name = 'a:contains("' + $scope.currentMediaName+ '")';
            $(name).parent('li').addClass('active');

            this.initData();

            this.initForms();
        }

        initData(){
            var self = this;
            self.$scope.cityList = [];
            self.$scope.provinceList = [];
            this.SearchTypeService.common(self.$scope.currentMediaType).then(function(result){
                self.$scope.searchTypeData.common = result;
            }, function(err){
                console.log(err);
            });

            this.SearchTypeService.industry().then(function(result){
                self.$scope.searchTypeData.industry = result;
            }, function(err){
                console.log(err);
            });

            this.SearchTypeService.employment().then(function(result){
                self.$scope.searchTypeData.employment = result;
            }, function(err){
                console.log(err);
            });

            this.$scope.$watch('friendsForm.ProvinceID', function(newValue,oldValue){
                if(newValue && newValue.ID){
                    self.$scope.cityList = self.getRegionList(null,newValue.ID);
                    self.$scope.friendsForm.CityID = self.$scope.cityList[0];
                }else{
                    self.$scope.cityList = [];
                }
            });
            self.$scope.provinceList = this.getRegionList(0,null);
        }

        initForms() {
            this.$scope.wechatForm = {
                'WX': '',
                'WXImage': '',
                'NickName': '',
                'FansNumber': '',
                'ClassID': '',
                'ClassName': '',
                'SingleYing': '',
                'SingleRuan': '',
                'MoreFirstYing': '',
                'MoreFirstRuan': '',
                'MoreSecondYing': '',
                'MoreSecondRuan': '',
                'MoreThreeYing': '',
                'MoreThreeRuan': '',
                'Intro': '',
                'ClassMediaFieldID': '',
                'ClassMediaFieldName': '',
                'ClassProfessionID': '',
                'ClassProfessionName': ''
            };
            this.$scope.resetWechat = angular.copy(this.$scope.wechatForm);
            this.$scope.weiboForm = {
                WeiBoURL: '',
                WeiBoImage: '',
                NickName: '',
                FansNumber: '',
                ClassID: '',
                ClassName: '',
                YGZhuanFaPrice: '',
                YGZhiFaPrice: '',
                RGZhuanFaPrice: '',
                RGZhiFaPrice: '',
                Intro: '',
                ClassMediaFieldID: '',
                ClassMediaFieldName: '',
                ClassProfessionID: '',
                ClassProfessionName: '',
                selectClass: '',
                selectMedia: '',
                selectProfession: ''
            };
            this.$scope.resetWeibo = angular.copy(this.$scope.weiboForm);
            this.$scope.friendsForm = {
                WX: '',
                WXImage: '',
                NickName: '',
                FriendNumber: '',
                FriendNumberImage: '',
                FriendNumberState: '',
                Birthday: '',
                Sex: '',
                ProvinceID: '',
                ProvinceName: '',
                CityID: '',
                CityName: '',
                Price: '',
                ClassID: '',
                ClassName: '',
                Intro: '',
                ClassMediaFieldID: '',
                ClassMediaFieldName: '',
                ClassProfessionID: '',
                ClassProfessionName: ''
            };
            this.$scope.resetFriend = angular.copy(this.$scope.friendsForm);

        }

        goBack() {
            switch (this.$scope.currentMediaType*1) {
                case 1:
                    //this.$state.go('');
                    break;
                case 2:
                    this.$state.go('admedia.account.wechat');
                    break;
                case 3:
                    this.$state.go('admedia.account.weibo');
                    break;
                case 4:
                    this.$state.go('admedia.account.friends');
                    break;
            }
        }

        save($valid) {
            if(!$valid) {
                ZENG.msgbox.show('请完成所有项的数据，数据不完整，无法保存!',1);
                return;
            }
            if(this.$scope.currentMediaType == 2){
                this.$scope.wechatForm.Media_ID = this.$rootScope.user.ID;
                this.saveWechat();
            } else if(this.$scope.currentMediaType == 3) {
                this.$scope.weiboForm.Media_ID = this.$rootScope.user.ID;
                this.saveWeibo();
            }else if(this.$scope.currentMediaType == 4) {
                this.$scope.friendsForm.Media_ID = this.$rootScope.user.ID;
                this.saveFriends();
            }
        }

        saveWechat() {
            var self = this;
            self.$scope.wechatForm.ClassName = self.$scope.wechatForm.ClassID.ClassName;
            self.$scope.wechatForm.ClassID = self.$scope.wechatForm.ClassID.ID;

            //self.$scope.wechatForm.ClassMediaFieldName = self.$scope.wechatForm.ClassMediaFieldID.ClassName;
            //self.$scope.wechatForm.ClassMediaFieldID = self.$scope.wechatForm.ClassMediaFieldID.ID;
            //
            //self.$scope.wechatForm.ClassProfessionName = self.$scope.wechatForm.ClassProfessionID.ClassName;
            //self.$scope.wechatForm.ClassProfessionID = self.$scope.wechatForm.ClassProfessionID.ID;
            self.$scope.wechatForm.WXImage = self.$scope.wechatForm.WXImage.replace(window.location.origin, '');

            this.WechatPublicService.save(this.$scope.wechatForm).then(function(result){
                if(result && result.Status == 1) {
                    window.navigator.notification.confirm('保存成功，继续添加？',function(index){
                        if(index ==1){
                            self.$state.go('admedia.account.wechat');
                        }else if(index ==2) {
                            self.$scope.wechatForm = angular.copy( self.$scope.resetWechat, {});
                            $('form')[0].reset();
                        }
                    },'提示',['取消','继续添加'],'');
                } else if(result && result.Status !=1){
                    window.navigator.notification.alert(result.Message, null);
                }
            }, function(err){
                window.navigator.notification.alert("数据保存失败，请稍候重试",null);
            });
        }
        saveWeibo() {
            var self = this;
            self.$scope.weiboForm.ClassName = self.$scope.weiboForm.selectClass.ClassName;
            self.$scope.weiboForm.ClassID = self.$scope.weiboForm.selectClass.ID;

            //self.$scope.weiboForm.ClassMediaFieldName = self.$scope.weiboForm.selectMedia.ClassName;
            //self.$scope.weiboForm.ClassMediaFieldID = self.$scope.weiboForm.selectMedia.ID;
            //
            //self.$scope.weiboForm.ClassProfessionName = self.$scope.weiboForm.selectProfession.ClassName;
            //self.$scope.weiboForm.ClassProfessionID = self.$scope.weiboForm.selectProfession.ID;
            self.$scope.weiboForm.WeiBoImage = self.$scope.weiboForm.WeiBoImage.replace(window.location.origin, '');

            this.WeiboService.save(this.$scope.weiboForm).then(function(result){
                if(result && result.Status == 1) {
                    window.navigator.notification.confirm('保存成功，继续添加？',function(index){
                        if(index ==1){
                            self.$state.go('admedia.account.weibo');
                        }else if(index == 2) {
                            self.$scope.weiboForm = angular.copy(self.$scope.resetWeibo, {});
                            $('form')[0].reset();
                        }
                    },'提示',['取消','继续添加'],'');
                } else if(result && result.Status !=1){
                    window.navigator.notification.alert(result.Message, null);
                }
            }, function(err){
                window.navigator.notification.alert("数据保存失败，请稍候重试",null);
            });
        }
        saveFriends(){
            var self = this;
            self.$scope.friendsForm.ClassName = self.$scope.friendsForm.ClassID.ClassName;
            self.$scope.friendsForm.ClassID = self.$scope.friendsForm.ClassID.ID;

            //self.$scope.friendsForm.ClassMediaFieldName = self.$scope.friendsForm.ClassMediaFieldID.ClassName;
            //self.$scope.friendsForm.ClassMediaFieldID = self.$scope.friendsForm.ClassMediaFieldID.ID;
            //
            //self.$scope.friendsForm.ClassProfessionName = self.$scope.friendsForm.ClassProfessionID.ClassName;
            //self.$scope.friendsForm.ClassProfessionID = self.$scope.friendsForm.ClassProfessionID.ID;

            self.$scope.friendsForm.WXImage = self.$scope.friendsForm.WXImage.replace(window.location.origin, '');
            self.$scope.friendsForm.FriendNumberImage = self.$scope.friendsForm.FriendNumberImage.replace(window.location.origin, '');

            self.$scope.friendsForm.ProvinceName = self.$scope.friendsForm.ProvinceID.ClassName;
            self.$scope.friendsForm.ProvinceID = self.$scope.friendsForm.ProvinceID.ID;
            self.$scope.friendsForm.CityName = self.$scope.friendsForm.CityID.ClassName;
            self.$scope.friendsForm.CityID = self.$scope.friendsForm.CityID.ID;

            this.WechatFriend.save(this.$scope.friendsForm).then(function(result){
                if(result && result.Status == 1) {
                    window.navigator.notification.confirm('保存成功，继续添加？',function(index){
                        if(index ==1){
                            self.$state.go('admedia.account.friends');
                        }else if(index ==2) {
                            self.$scope.friendsForm = angular.copy(self.$scope.resetFriend, {});
                            $('form')[0].reset();
                        }
                    },'提示',['取消','继续添加'],'');
                } else if(result && result.Status !=1){
                    window.navigator.notification.alert(result.Message, null);
                }
            }, function(err){
                window.navigator.notification.alert("数据保存失败，请稍候重试",null);
            });
        }

        uploadFile(file,type) {
            var self = this;
            this.$scope.fileContainer = file;
            if (file && file.type.indexOf('image')>=0) {
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
                            self.setFileValue(type, file.result.Message);
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

        setFileValue(type,path) {
            path = window.location.origin + path
            switch (type) {
                case 'wx_head':
                    this.$scope.wechatForm.WXImage = path;
                    break;
                case 'fri_fans':
                    this.$scope.friendsForm.FriendNumberImage = path;
                    break;
                case 'wb_head':
                    this.$scope.weiboForm.WeiBoImage = path;
                    break;
                case 'fri_head':
                    this.$scope.friendsForm.WXImage = path;
                    break;
            }
        }

        getRegionList(type,parId){
            var list = [];
            var self = this;
            this.RegionService.list({}).then(function(data){
                if(data && data.length>0){
                    if(type == 0) {
                        angular.forEach(data, function(item){
                            if(item.ParID == 0){
                                list.push(item);
                            }
                        });
                        self.$scope.friendsForm.ProvinceID = list[0];
                    }
                    else if(!type && parId > 0) {
                        angular.forEach(data, function(item){
                            if(item.ParID == parId){
                                list.push(item);
                            }
                        });
                    }
                }
            },function(err){
                console.log(err);
            });
            return list;
        }
    }

    AddAccount.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'SearchTypeService', 'WechatPublicService', 'WeiboService', 'WechatFriendService','Upload','$timeout','RegionService'];
    ControllerModule.controller('AddAccountCtrl', AddAccount);
}
