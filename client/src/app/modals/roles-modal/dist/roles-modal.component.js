"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesModalComponent = void 0;
var core_1 = require("@angular/core");
var RolesModalComponent = /** @class */ (function () {
    function RolesModalComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.updateSelectedRoles = new core_1.EventEmitter();
    }
    RolesModalComponent.prototype.ngOnInit = function () { };
    RolesModalComponent.prototype.updateRoles = function () {
        this.updateSelectedRoles.emit(this.roles);
        this.bsModalRef.hide();
    };
    __decorate([
        core_1.Input()
    ], RolesModalComponent.prototype, "updateSelectedRoles");
    RolesModalComponent = __decorate([
        core_1.Component({
            selector: 'app-roles-modal',
            templateUrl: './roles-modal.component.html',
            styleUrls: ['./roles-modal.component.css']
        })
    ], RolesModalComponent);
    return RolesModalComponent;
}());
exports.RolesModalComponent = RolesModalComponent;
