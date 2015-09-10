/**
 * Created by AaronYuan on 8/7/15.
 */
/// <reference path="app.ts" />
var WeMedia;
(function (WeMedia) {
    'use strict';
    WeMedia.AppModule.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('advertiser', {
            'url': '/advertiser',
            'abstract': true,
            'templateUrl': './page/main.html'
        }).state('advertiser.dashboard', {
            'url': '/dashboard',
            'views': {
                'advertiser': {
                    'templateUrl': './page/advertiser/dashboard.html'
                }
            }
        }).state('advertiser.datalist', {
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
        }).state('advertiser.star', {
            'url': '/star',
            'params': {
                'mediaType': '1'
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/media-data-list.html',
                    'controller': 'MediaDataListCtrl'
                }
            }
        }).state('advertiser.wechat', {
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
        }).state('advertiser.weibo', {
            'url': '/weibo',
            'params': {
                'mediaType': '3'
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/media-data-list.html',
                    'controller': 'WeiboDataListCtrl'
                }
            }
        }).state('advertiser.friends', {
            'url': '/friends',
            'params': {
                'mediaType': '4'
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/media-data-list.html',
                    'controller': 'FriendsDataListCtrl'
                }
            }
        }).state('advertiser.starprecontract', {
            'url': '/starprecontract',
            'params': {
                'mediaType': '1',
                'isEdit': 0
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/precontract.html'
                }
            }
        }).state('advertiser.wechatprecontract', {
            'url': '/wechatprecontract',
            'params': {
                'mediaType': '2',
                'isEdit': 0,
                'editID': 0
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/precontract.html'
                }
            }
        }).state('advertiser.weiboprecontract', {
            'url': '/weiboprecontract',
            'params': {
                'mediaType': '3',
                'isEdit': 0,
                'editID': 0
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/precontract.html'
                }
            }
        }).state('advertiser.friendsprecontract', {
            'url': '/friendsprecontract',
            'params': {
                'mediaType': '4',
                'isEdit': 0,
                'editID': 0
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/precontract.html'
                }
            }
        }).state('advertiser.precontractList', {
            'url': '/precontractList',
            'params': {
                'mediaType': ''
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/precontract-list.html'
                }
            }
        }).state('advertiser.wechatPreList', {
            'url': '/wechatPreList',
            'params': {
                'mediaType': '2'
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/precontract-list.html'
                }
            }
        }).state('advertiser.weiboPreList', {
            'url': '/weiboPreList',
            'params': {
                'mediaType': '3'
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/precontract-list.html'
                }
            }
        }).state('advertiser.friendsPreList', {
            'url': '/friendsPreList',
            'params': {
                'mediaType': '4'
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/precontract-list.html'
                }
            }
        }).state('advertiser.user', {
            'url': '/user',
            'params': {
                'mediaType': ''
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/advertiser/user-center.html'
                }
            }
        }).state('advertiser.bill', {
            'url': '/bill',
            'params': {
                'mediaType': ''
            },
            'views': {
                'advertiser': {
                    'templateUrl': './page/advertiser/bill.html'
                }
            }
        }).state('admedia', {
            'url': '/admedia',
            'abstract': true,
            'templateUrl': './page/main.html'
        }).state('admedia.dashboard', {
            'url': '/dashboard',
            'views': {
                'admedia': {
                    'templateUrl': './page/admedia/dashboard.html'
                }
            }
        }).state('admedia.account', {
            'url': '/account',
            'views': {
                'admedia': {
                    'templateUrl': './page/admedia/account.html'
                }
            }
        }).state('admedia.account.wechat', {
            'url': '/wechat',
            'params': {
                'mediaType': '2'
            },
            'templateUrl': './page/admedia/account-list.html'
        }).state('admedia.account.weibo', {
            'url': '/weibo',
            'params': {
                'mediaType': '3'
            },
            'templateUrl': './page/admedia/account-list.html'
        }).state('admedia.account.friends', {
            'url': '/friends',
            'params': {
                'mediaType': '4'
            },
            'templateUrl': './page/admedia/account-list.html'
        }).state('admedia.account.addwechat', {
            'url': '/addwechat',
            'params': {
                'mediaType': '2'
            },
            'templateUrl': './page/admedia/add-account.html'
        }).state('admedia.account.addweibo', {
            'url': '/addweibo',
            'params': {
                'mediaType': '3'
            },
            'templateUrl': './page/admedia/add-account.html'
        }).state('admedia.account.addfriends', {
            'url': '/addfriends',
            'params': {
                'mediaType': '4'
            },
            'templateUrl': './page/admedia/add-account.html'
        }).state('admedia.preorderlist', {
            'url': '/preorderlist',
            'views': {
                'admedia': {
                    'templateUrl': './page/admedia/precontract-list.html'
                }
            }
        }).state('admedia.bill', {
            'url': '/bill',
            'views': {
                'admedia': {
                    'templateUrl': './page/admedia/bill-info.html'
                }
            }
        }).state('precontract', {
            'url': '/precontract',
            'params': {
                'mediaType': ''
            },
            'templateUrl': './page/precontract.html'
        });
        $urlRouterProvider.otherwise('/advertiser/dashboard');
    });
})(WeMedia || (WeMedia = {}));
//# sourceMappingURL=router.js.map