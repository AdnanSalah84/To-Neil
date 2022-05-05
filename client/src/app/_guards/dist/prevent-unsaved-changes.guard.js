"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PreventUnsavedChangesGuard = void 0;
var core_1 = require("@angular/core");
var PreventUnsavedChangesGuard = /** @class */ (function () {
    function PreventUnsavedChangesGuard(confirmService) {
        this.confirmService = confirmService;
    }
    PreventUnsavedChangesGuard.prototype.canDeactivate = function (component) {
        if (component.editForm.dirty) {
            // return confirm(
            //   'Are you sure you want to continue? Any unsaved changes will be lost'
            // );
            return this.confirmService.confirm();
        }
        return true;
    };
    PreventUnsavedChangesGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PreventUnsavedChangesGuard);
    return PreventUnsavedChangesGuard;
}());
exports.PreventUnsavedChangesGuard = PreventUnsavedChangesGuard;
