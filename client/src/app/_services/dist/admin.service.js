"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
        this.baseUrl = environment_1.environment.apiUrl;
    }
    AdminService.prototype.getUsersWithRoles = function () {
        return this.http.get(this.baseUrl + 'admin/users-with-roles');
    };
    AdminService.prototype.updateUserRoles = function (username, roles) {
        return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
    };
    AdminService.prototype.getPhotosForApproval = function () {
        return this.http.get(this.baseUrl + 'admin/photos-to-moderate');
    };
    AdminService.prototype.approvePhoto = function (photoId) {
        return this.http.post(this.baseUrl + 'admin/approve-photo/' + photoId, {});
    };
    AdminService.prototype.rejectPhoto = function (photoId) {
        return this.http.post(this.baseUrl + 'admin/reject-photo/' + photoId, {});
    };
    AdminService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
