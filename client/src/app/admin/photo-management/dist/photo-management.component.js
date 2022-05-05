"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PhotoManagementComponent = void 0;
var core_1 = require("@angular/core");
var PhotoManagementComponent = /** @class */ (function () {
    function PhotoManagementComponent(adminService) {
        this.adminService = adminService;
    }
    PhotoManagementComponent.prototype.ngOnInit = function () {
        this.getPhotosForApproval();
    };
    PhotoManagementComponent.prototype.getPhotosForApproval = function () {
        var _this = this;
        this.adminService.getPhotosForApproval().subscribe(function (photos) {
            _this.photos = photos;
        });
    };
    PhotoManagementComponent.prototype.approvePhoto = function (photoId) {
        var _this = this;
        this.adminService.approvePhoto(photoId).subscribe(function () {
            _this.photos.splice(_this.photos.findIndex(function (p) { return p.id === photoId; }), 1);
        });
    };
    PhotoManagementComponent.prototype.rejectPhoto = function (photoId) {
        var _this = this;
        this.adminService.rejectPhoto(photoId).subscribe(function () {
            _this.photos.splice(_this.photos.findIndex(function (p) { return p.id === photoId; }), 1);
        });
    };
    PhotoManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-photo-management',
            templateUrl: './photo-management.component.html',
            styleUrls: ['./photo-management.component.css']
        })
    ], PhotoManagementComponent);
    return PhotoManagementComponent;
}());
exports.PhotoManagementComponent = PhotoManagementComponent;
