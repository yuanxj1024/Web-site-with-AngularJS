/**
 * Created by AaronYuan on 8/21/15.
 */

/// <reference path="../../app.ts" />
/// <reference path="../../service/SearchTypes.ts" />
/// <reference path="../../service/Region.ts" />
/// <reference path="../../service/MediaAccount.ts" />
/// <reference path="../../auth.ts" />
module WeMedia {
    'use strict';

    declare var window,ZENG;

    interface IAddAccountScope extends IWMBaseScope {
        searchTypeData: any;
        //数据表单
        accountForm: any;
        resetForm: any;

        goBack:Function;
        save: Function;

        uploadFile: Function;
        fileContainer: Function;

        getRegionList: Function;
        provinceList: Array<any>;
        cityList: Array<any>;
        editID: number
    }

    var stateNames = {
        1: 'admedia.account.weibo',
        2: 'admedia.account.wechat',
        3: 'admedia.account.friends'
    };


    class AddAccount {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: IAddAccountScope,
            public $state: ng.ui.IStateService,
            public $stateParams: IWMStateParamsService,
            public SearchTypeService: ISearchTypeService,
            public MediaAccountService: IMediaAccountService,
            //public WechatPublicService: IWechatPublicService,
            //public WeiboService: IWeiboService,
            //public WechatFriend: IWechatFriendService,
            public Upload: any,
            public $timeout: ng.ITimeoutService,
            public RegionService: IRegionService,
            public AuthService: IAuthInfoService
        ) {
            $scope.currentMediaType = $stateParams.mediaType;
            $scope.currentMediaName = allMedias[$stateParams.mediaType];
            $scope.editID = $stateParams.ID;

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

            //this.SearchTypeService.industry().then(function(result){
            //    self.$scope.searchTypeData.industry = result;
            //}, function(err){
            //    console.log(err);
            //});
            //
            //this.SearchTypeService.employment().then(function(result){
            //    self.$scope.searchTypeData.employment = result;
            //}, function(err){
            //    console.log(err);
            //});

            this.$scope.$watch('accountForm.ProvinceID', function(newValue,oldValue){
                if(newValue && newValue.ID){
                    self.$scope.cityList = self.getRegionList(null,newValue.ID);
                    self.$scope.accountForm.CityID = self.$scope.cityList[0];
                }else{
                    self.$scope.cityList = [];
                }
            });
            if(this.$scope.currentMediaType == 3){
                self.$scope.provinceList = this.getRegionList(0,null);
            }
        }

        initForms() {
            this.$scope.accountForm = {
                Media_ID: this.$rootScope.user.ID,
                ChannelID: this.$scope.currentMediaType,
                AccountName:'',
                Image:'',
                URL:'',
                NickName:'',
                FansNumber:'',
                Sex:'0',
                Birthday:'',
                ProvinceID:'',
                ProvinceName:'',
                CityID:'',
                CityName:'',
                ClassID:'',
                ClassName:'',
                Price:'',
                MinPrice:'',
                MaxPrice:'',
                Intro:'',
                Content:'',
                State:'',
                IsEnable:'',
                IsReservation:'',
                ClassMediaFieldID:'',
                ClassMediaFieldName:'',
                ClassProfessionID:'',
                ClassProfessionName:'',
                CheckAdminId:'',
                CheckAdminName:'',
                CheckReason:'',
                CheckTime:'',
                AddTime:'',
                //  公众号
                SingleYing: '',
                SingleRuan: '',
                MoreFirstYing: '',
                MoreFirstRuan: '',
                MoreSecondYing: '',
                MoreSecondRuan: '',
                MoreThreeYing: '',
                MoreThreeRuan: '',
                //微博
                YGZhuanFaPrice: '',
                YGZhiFaPrice: '',
                RGZhuanFaPrice: '',
                RGZhiFaPrice: ''
            };

            var self = this;
            if(this.$scope.editID){
                self.bindEditForm();
            }
            this.$scope.resetForm = angular.copy(this.$scope.accountForm);
        }

        bindEditForm(){
            var self = this;
            this.MediaAccountService.oneItem(this.$scope.editID).then(function(result){
                if(result && result.Data){
                    self.$scope.accountForm = result.Data[0];
                    var priceJson = self.$scope.accountForm.PriceJSON;
                    self.$timeout(function () {
                        angular.forEach(self.$scope.searchTypeData.common,function(item){
                            if(item.ID == self.$scope.accountForm.ClassID){
                                self.$scope.accountForm.ClassID = item;
                            }
                        });
                    },400);

                    self.$scope.accountForm.Price = priceJson.Price;
                    self.$scope.accountForm.SingleYing = priceJson.SingleYing;
                    self.$scope.accountForm.SingleRuan= priceJson.SingleRuan;
                    self.$scope.accountForm.MoreFirstYing= priceJson.MoreFirstYing;
                    self.$scope.accountForm.MoreFirstRuan= priceJson.MoreFirstRuan ;
                    self.$scope.accountForm.MoreSecondYing= priceJson.MoreSecondYing;
                    self.$scope.accountForm.MoreSecondRuan= priceJson.MoreSecondRuan;
                    self.$scope.accountForm.MoreThreeYing= priceJson.MoreThreeYing;
                    self.$scope.accountForm.MoreThreeRuan= priceJson.MoreThreeRuan;
                    self.$scope.accountForm.YGZhuanFaPrice= priceJson.YGZhuanFaPrice;
                    self.$scope.accountForm.YGZhiFaPrice= priceJson.YGZhiFaPrice;
                    self.$scope.accountForm.RGZhuanFaPrice= priceJson.RGZhuanFaPrice;
                    self.$scope.accountForm.RGZhiFaPrice= priceJson.RGZhiFaPrice;

                    self.$scope.accountForm.AddTime = self.dateFormt(result.Data[0].AddTime);
                    self.$scope.accountForm.Birthday = self.dateFormt(result.Data[0].Birthday);

                    self.$scope.resetForm = angular.copy(self.$scope.accountForm);
                }else {
                    window.navigator.notification.alert('获取数据异常，暂时无法编辑。',function(){
                        self.$state.go(stateNames[self.$scope.currentMediaType]);
                    });
                }
            }, function(err){
                window.navigator.notification.alert('获取数据异常，暂时无法编辑。',function(){
                    self.$state.go(stateNames[self.$scope.currentMediaType]);
                });
            });
        }

        dateFormt(time) {
            if(time){
                var t = time.substring(6,19);
                return new Date(t*1);
            }
            return null;
        }


        goBack() {
            switch (this.$scope.currentMediaType*1) {
                case 1:
                    this.$state.go('admedia.account.weibo');
                    break;
                case 2:
                    this.$state.go('admedia.account.wechat');
                    break;
                case 3:
                    this.$state.go('admedia.account.friends');
                    break;
            }
        }

        save($valid) {
            if(!$valid) {
                ZENG.msgbox.show('请完成所有项的数据，数据不完整，无法保存!',1);
                return;
            }

            this.saveAccount();
        }

        saveAccount() {
            var self = this;
            if(!self.$scope.accountForm.ClassID){
                ZENG.msgbox.show('请选择类型!',1);
                return ;
            }
            self.$scope.accountForm.ClassName = self.$scope.accountForm.ClassID.ClassName;
            self.$scope.accountForm.ClassID = self.$scope.accountForm.ClassID.ID;

            //self.$scope.wechatForm.ClassMediaFieldName = self.$scope.wechatForm.ClassMediaFieldID.ClassName;
            //self.$scope.wechatForm.ClassMediaFieldID = self.$scope.wechatForm.ClassMediaFieldID.ID;
            //
            //self.$scope.wechatForm.ClassProfessionName = self.$scope.wechatForm.ClassProfessionID.ClassName;
            //self.$scope.wechatForm.ClassProfessionID = self.$scope.wechatForm.ClassProfessionID.ID;
            if(this.$scope.currentMediaType == 3){
                self.$scope.accountForm.ProvinceName = self.$scope.accountForm.ProvinceID.ClassName;
                self.$scope.accountForm.ProvinceID = self.$scope.accountForm.ProvinceID.ID;
                self.$scope.accountForm.CityName = self.$scope.accountForm.CityID.ClassName;
                self.$scope.accountForm.CityID = self.$scope.accountForm.CityID.ID;
            }
            self.$scope.accountForm.Image = self.$scope.accountForm.Image.replace(window.location.origin, '');
            self.$scope.accountForm.MaxPrice = self.findValue('max');
            self.$scope.accountForm.MinPrice = self.findValue('min');
            self.$scope.accountForm.PriceJSON = self.priceJson();

            if(self.$scope.editID){
                self.MediaAccountService.updateItem(this.$scope.accountForm).then(function(result){
                    if(result && result.Status >= 1) {
                        window.navigator.notification.alert('修改成功!',function(){
                            self.$state.go(stateNames[self.$scope.currentMediaType]);
                        });
                    }else{
                        window.navigator.notification.alert("数据保存失败，请稍候重试",null);
                    }
                }, function(err){
                    window.navigator.notification.alert("数据保存失败，请稍候重试",null);
                });

            }else {
                this.MediaAccountService.save(this.$scope.accountForm).then(function(result){
                    if(result && result.Status >= 1) {
                        window.navigator.notification.confirm('保存成功，继续添加？',function(index){
                            if(index ==1){
                                self.$state.go(stateNames[self.$scope.currentMediaType]);
                            }else if(index ==2) {
                                self.$scope.accountForm = angular.copy( self.$scope.resetForm, {});
                                $('form')[0].reset();
                            }
                        },'提示',['取消','继续添加'],'');
                    } else if(result && result.Status <=0){
                        window.navigator.notification.alert(result.Message||'保存失败', null);
                    }
                }, function(err){
                    window.navigator.notification.alert("数据保存失败，请稍候重试",null);
                });
            }
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
            path = window.location.origin + path;
            switch (type) {
                case 'wx_head':
                    this.$scope.accountForm.Image = path;
                    break;
                case 'fri_fans':
                    this.$scope.accountForm.FriendNumberImage = path;
                    break;
                case 'wb_head':
                    this.$scope.accountForm.Image = path;
                    break;
                case 'fri_head':
                    this.$scope.accountForm.Image = path;
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
                        self.$scope.accountForm.ProvinceID = list[0];
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

        priceJson():string {
            var form = this.$scope.accountForm;

            return JSON.stringify({
                Price: form.Price ||0,
                SingleYing: form.SingleYing||0,
                SingleRuan: form.SingleRuan || 0,
                MoreFirstYing: form.MoreFirstYing || 0,
                MoreFirstRuan: form.MoreFirstRuan || 0,
                MoreSecondYing: form.MoreSecondYing || 0,
                MoreSecondRuan: form.MoreSecondRuan || 0,
                MoreThreeYing: form.MoreThreeYing || 0,
                MoreThreeRuan: form.MoreThreeRuan || 0,
                //微博
                YGZhuanFaPrice: form.YGZhuanFaPrice || 0,
                YGZhiFaPrice: form.YGZhiFaPrice || 0,
                RGZhuanFaPrice: form.RGZhuanFaPrice || 0,
                RGZhiFaPrice: form.RGZhiFaPrice || 0
            });
        }

        findValue(type = 'min'){
            var form = this.$scope.accountForm;
            var arr = [
                form.Price*1 ||0,
                form.SingleYing *1||0,
                form.SingleRuan *1 || 0,
                form.MoreFirstYing *1 || 0,
                form.MoreFirstRuan *1|| 0,
                form.MoreSecondYing *1|| 0,
                form.MoreSecondRuan *1|| 0,
                form.MoreThreeYing *1|| 0,
                form.MoreThreeRuan *1|| 0,
                //微博
                form.YGZhuanFaPrice *1|| 0,
                form.YGZhiFaPrice *1|| 0,
                form.RGZhuanFaPrice *1|| 0,
                form.RGZhiFaPrice *1|| 0
            ];
            if(type == 'min') {
                return Math.min.apply(Math, arr);
            }else if(type == 'max') {
                return Math.max.apply(Math, arr);
            }
            return 0;
        }


    }

    AddAccount.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'SearchTypeService', 'MediaAccountService','Upload','$timeout','RegionService','AuthService'];
    ControllerModule.controller('AddAccountCtrl', AddAccount);
}
