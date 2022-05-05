"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfirmService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var confirm_dialog_component_1 = require("../modals/confirm-dialog/confirm-dialog.component");
var ConfirmService = /** @class */ (function () {
    function ConfirmService(modalService) {
        this.modalService = modalService;
    }
    ConfirmService.prototype.confirm = function (title, message, btnOkText, btnCancelText) {
        if (title === void 0) { title = 'Confirmation'; }
        if (message === void 0) { message = 'Are you sure you want to do this?'; }
        if (btnOkText === void 0) { btnOkText = 'Ok'; }
        if (btnCancelText === void 0) { btnCancelText = 'Cancel'; }
        var config = {
            initialState: {
                title: title,
                message: message,
                btnOkText: btnOkText,
                btnCancelText: btnCancelText
            }
        };
        this.bsModelRef = this.modalService.show(confirm_dialog_component_1.ConfirmDialogComponent, config);
        return new rxjs_1.Observable(this.getResult());
    };
    ConfirmService.prototype.getResult = function () {
        var _this = this;
        return function (observer) {
            var subscription = _this.bsModelRef.onHidden.subscribe(function () {
                observer.next(_this.bsModelRef.content.result);
                observer.complete();
            });
            return {
                unsubscribe: function () {
                    subscription.unsubscribe();
                }
            };
        };
    };
    ConfirmService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ConfirmService);
    return ConfirmService;
}());
exports.ConfirmService = ConfirmService;
