/**
 * Created by AaronYuan on 8/7/15.
 */
/// <reference path="app.ts" />
module WeMedia {
    'use strict';

    AppModule.config(function(
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider
    ) {

        $stateProvider
            .state('advertiser',{
                'url': '/advertiser',
                'abstract': true,
                'templateUrl': './page/main.html'
            })
            .state('advertiser.dashboard', {
                'url': '/dashboard',
                'views': {
                    'advertiser': {
                        'templateUrl': './page/advertiser/dashboard.html'
                    }
                }
            })
            .state('advertiser.datalist',{
                'url': '/datalist',
                'params': {
                    'mediaType': ''
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/advertiser/star.html',
                        'controller': 'MediaDataListCtrl'
                    }
                }
            })
            .state('advertiser.wechat',{
                'url': '/wechat',
                'params': {
                    'mediaType': '2'
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/media-data-list.html',
                        'controller': 'WechatDataListCtrl'
                    }
                }
            })
            .state('advertiser.weibo',{
                'url': '/weibo',
                'params': {
                    'mediaType': '1'
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/media-data-list.html',
                        'controller': 'WeiboDataListCtrl'
                    }
                }
            })
            .state('advertiser.friends',{
                'url': '/friends',
                'params': {
                    'mediaType': '3'
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/media-data-list.html',
                        'controller': 'FriendsDataListCtrl'
                    }
                }
            })
            .state('advertiser.wechatprecontract', {
                'url': '/wechatprecontract',
                'params': {
                    'mediaType': '2',
                    'editID': 0
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract.html'
                    }
                }
            })
            .state('advertiser.weiboprecontract', {
                'url': '/weiboprecontract',
                'params': {
                    'mediaType': '1',
                    'editID': 0
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract.html'
                    }
                }
            })
            .state('advertiser.friendsprecontract', {
                'url': '/friendsprecontract',
                'params': {
                    'mediaType': '3',
                    'editID': 0
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract.html'
                    }
                }
            })
            .state('advertiser.wechatPrecontractDetail', {
                'url': '/wechatPrecontractDetail',
                'params': {
                    'mediaType': '2',
                    'detailID': 0
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract-detail.html'
                    }
                }
            })
            .state('advertiser.weiboPrecontractDetail', {
                'url': '/weiboPrecontractDetail',
                'params': {
                    'mediaType': '1',
                    'detailID': 0
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract-detail.html'
                    }
                }
            })
            .state('advertiser.friendsPrecontractDetail', {
                'url': '/friendsPrecontractDetail',
                'params': {
                    'mediaType': '3',
                    'detailID': 0
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract-detail.html'
                    }
                }
            })
            .state('advertiser.precontractList', {
                'url': '/precontractList',
                'params': {
                    'mediaType': ''
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract-list.html'
                    }
                }
            })
            .state('advertiser.wechatPreList', {
                'url': '/wechatPreList',
                'params': {
                    'mediaType': '2'
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract-list.html'
                    }
                }
            })
            .state('advertiser.weiboPreList', {
                'url': '/weiboPreList',
                'params': {
                    'mediaType': '1'
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract-list.html'
                    }
                }
            })
            .state('advertiser.friendsPreList', {
                'url': '/friendsPreList',
                'params': {
                    'mediaType': '3'
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/precontract-list.html'
                    }
                }
            })
            .state('advertiser.user', {
                'url': '/user',
                'params': {
                    'mediaType': ''
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/advertiser/user-center.html'
                    }
                }
            })
            .state('advertiser.bill', {
                'url': '/bill',
                'params': {
                    'mediaType': ''
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/advertiser/bill.html'
                    }
                }
            })
            .state('advertiser.recharge', {
                'url': '/recharge',
                'params': {
                    'mediaType': ''
                },
                'views': {
                    'advertiser': {
                        'templateUrl': './page/advertiser/recharge.html'
                    }
                }
            })

            //自媒体
            .state('admedia', {
                'url': '/admedia',
                'abstract': true,
                'templateUrl': './page/main.html'
            })

            .state('admedia.dashboard', {
                'url': '/dashboard',
                'views': {
                    'admedia': {
                        'templateUrl': './page/admedia/dashboard.html'
                    }
                }
            })
            .state('admedia.account', {
                'url': '/account',
                'views': {
                    'admedia': {
                        'templateUrl': './page/admedia/account.html'
                    }
                }
            })
            .state('admedia.account.wechat', {
                'url': '/wechat',
                'params': {
                    'mediaType': '2'
                },
                'templateUrl': './page/admedia/account-list.html'
            })
            .state('admedia.account.weibo', {
                'url': '/weibo',
                'params': {
                    'mediaType': '1'
                },
                'templateUrl': './page/admedia/account-list.html'
            })
            .state('admedia.account.friends', {
                'url': '/friends',
                'params': {
                    'mediaType': '3'
                },
                'templateUrl': './page/admedia/account-list.html'
            })
            .state('admedia.account.addwechat', {
                'url': '/addwechat',
                'params': {
                    'mediaType': '2',
                    'ID': ''
                },
                'templateUrl': './page/admedia/add-account.html'
            })
            .state('admedia.account.addweibo', {
                'url': '/addweibo',
                'params': {
                    'mediaType': '1',
                    'ID': ''
                },
                'templateUrl': './page/admedia/add-account.html'
            })
            .state('admedia.account.addfriends', {
                'url': '/addfriends',
                'params': {
                    'mediaType': '3',
                    'ID': ''
                },
                'templateUrl': './page/admedia/add-account.html'
            })
            //所有订单
            .state('admedia.preorderlist', {
                'url': '/preorderlist',
                'views':{
                    'admedia': {
                        'templateUrl': './page/admedia/order.html'
                    }
                }
            })
            .state('admedia.preorderlist.all', {
                'url': '/all',
                'params': {
                    'orderType': 1
                },
                'templateUrl': './page/admedia/precontract-list.html',
                controller: 'AdMediaPrecontactListCtrl'
            })
            .state('admedia.preorderlist.unexecute', {
                'url': '/unexecute',
                'params': {
                    'orderType': 2
                },
                'templateUrl': './page/admedia/precontract-list.html',
                controller: 'PendingAdMediaPrecontactListCtrl'
            })
            .state('admedia.preorderlist.finished', {
                'url': '/finished',
                'params': {
                    'orderType':3
                },
                'templateUrl': './page/admedia/precontract-list.html',
                controller: 'DoneAdMediaPrecontactListCtrl'
            })
            .state('admedia.bill', {
                'url': '/bill',
                'views': {
                    'admedia': {
                        'templateUrl': './page/admedia/bill-info.html'
                    }
                }
            })
            .state('admedia.bindcard', {
                'url': '/bindcard',
                'views': {
                    'admedia': {
                        'templateUrl': './page/admedia/bind-card.html'
                    }
                }
            })

            //公用路由
            .state('precontract', {
                'url': '/precontract',
                'params': {
                    'mediaType': ''
                },
                'templateUrl': './page/precontract.html'
            })
        ;

        if(window.location.href.indexOf('advertiser')>0){
            $urlRouterProvider.otherwise('/advertiser/dashboard');
        }else {
            $urlRouterProvider.otherwise('/advertiser/dashboard');
        }
    });

}

