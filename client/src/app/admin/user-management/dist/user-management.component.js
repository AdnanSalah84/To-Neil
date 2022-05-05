"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.UserManagementComponent = void 0;
var core_1 = require("@angular/core");
var roles_modal_component_1 = require("src/app/modals/roles-modal/roles-modal.component");
var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(adminService, modalService) {
        this.adminService = adminService;
        this.modalService = modalService;
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        this.getUsersWithRoles();
    };
    UserManagementComponent.prototype.getUsersWithRoles = function () {
        var _this = this;
        this.adminService.getUsersWithRoles().subscribe(function (users) {
            _this.users = users;
        });
    };
    UserManagementComponent.prototype.openRolesModal = function (user) {
        var _this = this;
        var config = {
            "class": 'modal-dialog-centered',
            initialState: {
                user: user,
                roles: this.getRolesArray(user)
            }
        };
        this.bsModalRef = this.modalService.show(roles_modal_component_1.RolesModalComponent, config);
        this.bsModalRef.content.updateSelectedRoles.subscribe(function (values) {
            var rolesToUpdate = {
                roles: __spreadArrays(values.filter(function (el) { return el.checked === true; }).map(function (el) { return el.name; }))
            };
            if (rolesToUpdate) {
                _this.adminService
                    .updateUserRoles(user.username, rolesToUpdate.roles)
                    .subscribe(function () {
                    user.roles = __spreadArrays(rolesToUpdate.roles);
                });
            }
        });
    };
    UserManagementComponent.prototype.getRolesArray = function (user) {
        var roles = [];
        var userRoles = user.roles;
        var availableRoles = [
            { name: 'Admin', value: 'Admin' },
            { name: 'Moderator', value: 'Moderator' },
            { name: 'Member', value: 'Member' },
        ];
        availableRoles.forEach(function (role) {
            var isMatch = false;
            for (var _i = 0, userRoles_1 = userRoles; _i < userRoles_1.length; _i++) {
                var userRole = userRoles_1[_i];
                if (role.name === userRole) {
                    isMatch = true;
                    role.checked = true;
                    roles.push(role);
                    break;
                }
            }
            if (!isMatch) {
                role.checked = false;
                roles.push(role);
            }
        });
        return roles;
    };
    UserManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-user-management',
            templateUrl: './user-management.component.html',
            styleUrls: ['./user-management.component.css']
        })
    ], UserManagementComponent);
    return UserManagementComponent;
}());
exports.UserManagementComponent = UserManagementComponent;
