"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessagesComponent = void 0;
var core_1 = require("@angular/core");
var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(messageService, confirmService) {
        this.messageService = messageService;
        this.confirmService = confirmService;
        this.messages = [];
        this.container = 'Unread';
        this.pageNumber = 1;
        this.pageSize = 5;
        this.loading = false;
    }
    MessagesComponent.prototype.ngOnInit = function () {
        this.loadMessages();
    };
    MessagesComponent.prototype.loadMessages = function () {
        var _this = this;
        this.loading = true;
        this.messageService
            .getMessages(this.pageNumber, this.pageSize, this.container)
            .subscribe(function (response) {
            _this.messages = response.result;
            _this.pagination = response.pagination;
            _this.loading = false;
        });
    };
    MessagesComponent.prototype.deleteMessage = function (id) {
        var _this = this;
        this.confirmService
            .confirm('Confirm delete message', 'This  cannot be undone')
            .subscribe(function (result) {
            if (result) {
                _this.messageService.deleteMessage(id).subscribe(function () {
                    _this.messages.splice(_this.messages.findIndex(function (m) { return m.id === id; }), 1);
                });
            }
        });
    };
    MessagesComponent.prototype.pageChanged = function (event) {
        if (this.pageNumber !== event.page) {
            this.pageNumber = event.page;
            this.loadMessages();
        }
    };
    MessagesComponent = __decorate([
        core_1.Component({
            selector: 'app-messages',
            templateUrl: './messages.component.html',
            styleUrls: ['./messages.component.css']
        })
    ], MessagesComponent);
    return MessagesComponent;
}());
exports.MessagesComponent = MessagesComponent;
