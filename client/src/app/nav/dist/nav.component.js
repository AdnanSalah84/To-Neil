"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavComponent = void 0;
var core_1 = require("@angular/core");
var NavComponent = /** @class */ (function () {
    // loggedIn: boolean;
    // currentUser$: Observable<User>;
    function NavComponent(accountService, router, toastr) {
        this.accountService = accountService;
        this.router = router;
        this.toastr = toastr;
        this.model = {};
    }
    NavComponent.prototype.ngOnInit = function () {
        // this.getCurrentUser();
        // this.currentUser$ = this.accountService.currentUser$;
    };
    NavComponent.prototype.login = function (loginForm) {
        // this.accountService.login(this.model).subscribe(
        //   (response) => {
        //     console.log(response);
        //     this.loggedIn = true;
        //   },
        //   (error) => {
        //     console.log(error);
        //   }
        // );
        var _this = this;
        this.accountService.login(this.model).subscribe({
            next: function (response) {
                // console.log(response);
                // this.loggedIn = true;
                _this.router.navigateByUrl('/members');
                loginForm.resetForm();
            }
        });
    };
    NavComponent.prototype.logout = function () {
        this.accountService.logout();
        this.router.navigateByUrl('/');
        // this.model = {};
        // this.loggedIn = false;
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.css']
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
