"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberDetailComponent = void 0;
var core_1 = require("@angular/core");
var ngx_gallery_1 = require("@kolkov/ngx-gallery");
var operators_1 = require("rxjs/operators");
var MemberDetailComponent = /** @class */ (function () {
    function MemberDetailComponent(memberService, presence, route, messageService, accountService, router) {
        var _this = this;
        this.memberService = memberService;
        this.presence = presence;
        this.route = route;
        this.messageService = messageService;
        this.accountService = accountService;
        this.router = router;
        this.messages = [];
        this.accountService.currentUser$
            .pipe(operators_1.take(1))
            .subscribe(function (user) { return (_this.user = user); });
        this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    }
    MemberDetailComponent.prototype.ngOnInit = function () {
        // this.loadMember();
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.member = data.member;
        });
        this.route.queryParams.subscribe(function (params) {
            params.tab ? _this.selectTab(params.tab) : _this.selectTab(0);
        });
        this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation: ngx_gallery_1.NgxGalleryAnimation.Slide,
                preview: false
            },
        ];
        this.galleryImages = this.getImages();
    };
    MemberDetailComponent.prototype.getImages = function () {
        var imageUrls = [];
        for (var _i = 0, _a = this.member.photos; _i < _a.length; _i++) {
            var photo = _a[_i];
            imageUrls.push({
                small: photo === null || photo === void 0 ? void 0 : photo.url,
                medium: photo === null || photo === void 0 ? void 0 : photo.url,
                big: photo === null || photo === void 0 ? void 0 : photo.url
            });
        }
        return imageUrls;
    };
    MemberDetailComponent.prototype.loadMessages = function () {
        var _this = this;
        this.messageService
            .getMessageThread(this.member.username)
            .subscribe(function (messages) {
            _this.messages = messages;
        });
    };
    // loadMember() {
    //   this.memberService
    //     .getMember(this.route.snapshot.paramMap.get('username'))
    //     .subscribe((member) => {
    //       this.member = member;
    //       // this.galleryImages = this.getImages();
    //     });
    // }
    MemberDetailComponent.prototype.selectTab = function (tabId) {
        this.memberTabs.tabs[tabId].active = true;
    };
    MemberDetailComponent.prototype.onTabActivated = function (data) {
        this.activeTab = data;
        if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
            // this.loadMessages();
            this.messageService.createHubConnection(this.user, this.member.username);
        }
        else {
            this.messageService.stopHubConnection();
        }
    };
    MemberDetailComponent.prototype.ngOnDestroy = function () {
        this.messageService.stopHubConnection();
    };
    __decorate([
        core_1.ViewChild('memberTabs', { static: true })
    ], MemberDetailComponent.prototype, "memberTabs");
    MemberDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-member-detail',
            templateUrl: './member-detail.component.html',
            styleUrls: ['./member-detail.component.css']
        })
    ], MemberDetailComponent);
    return MemberDetailComponent;
}());
exports.MemberDetailComponent = MemberDetailComponent;
