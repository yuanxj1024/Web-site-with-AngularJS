/**
 * Created by AaronYuan on 15/9/13.
 */
/// <reference path="../../app.ts" />
/// <reference path="../../service/OrderService.ts" />

module WeMedia {
    'use strict';

    declare var window;

    var orderTypeNames = {
        1: '全部',
        2: '待执行',
        3: '已完成'
    };

    class PrecontactList {
        constructor(
            public $rootScope: IWMRootScope,
            public $scope: any,
            public OrderService:IOrderService,
            public $stateParams: IWMStateParamsService
        ){
            $scope.getChannelName = angular.bind(this, this.getChannelName);
            $scope.getStateName = angular.bind(this, this.getStateName);
            $scope.searchHandler = angular.bind(this, this.searchHandler);

            $scope.orderType = this.convertOrderType($stateParams.orderType);
            $scope.orderTitle = orderTypeNames[$stateParams.orderType];

            var self = this;

            this.init();
            this.$rootScope.$on('$stateChangeSuccess', function(e,state){
                $scope.orderType = self.convertOrderType(state.params.orderType);
                $scope.orderTitle = orderTypeNames[state.params.orderType];
                self.refresh();
            });
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
            args =  angular.extend({
                userID: self.$rootScope.user.ID,
                page: self.$scope.currentPageIndex,
                pageSize: self.$scope.pageSize,
                state: self.$scope.orderType,
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
            return {
                1: '审核中',
                2: '审核不通过',
                3: '审核通过'
            }[code];
        }

        searchHandler(){
            this.refresh();
        }



    }

    PrecontactList.$inject = ['$rootScope', '$scope', 'OrderService', '$stateParams'];
    ControllerModule.controller('AdMediaPrecontactListCtrl', PrecontactList);

}
