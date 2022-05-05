"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HasRoleDirective = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var HasRoleDirective = /** @class */ (function () {
    function HasRoleDirective(viewContainerRef, templateRef, accountService) {
        var _this = this;
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
        this.accountService = accountService;
        this.accountService.currentUser$.pipe(operators_1.take(1)).subscribe(function (user) {
            _this.user = user;
        });
    }
    HasRoleDirective.prototype.ngOnInit = function () {
        // clear view if no roles
        var _this = this;
        var _a, _b;
        if (!((_a = this.user) === null || _a === void 0 ? void 0 : _a.roles) || this.user == null) {
            this.viewContainerRef.clear();
            return;
        }
        if ((_b = this.user) === null || _b === void 0 ? void 0 : _b.roles.some(function (r) { return _this.appHasRole.includes(r); })) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainerRef.clear();
        }
    };
    __decorate([
        core_1.Input()
    ], HasRoleDirective.prototype, "appHasRole");
    HasRoleDirective = __decorate([
        core_1.Directive({
            selector: '[appHasRole]'
        })
    ], HasRoleDirective);
    return HasRoleDirective;
}());
exports.HasRoleDirective = HasRoleDirective;
