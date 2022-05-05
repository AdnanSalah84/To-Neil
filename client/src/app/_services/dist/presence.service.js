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
exports.PresenceService = void 0;
var core_1 = require("@angular/core");
var signalr_1 = require("@microsoft/signalr");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var PresenceService = /** @class */ (function () {
    function PresenceService(toastr, router) {
        this.toastr = toastr;
        this.router = router;
        this.hubUrl = environment_1.environment.hubUrl;
        this.onlineUsersSource = new rxjs_1.BehaviorSubject([]);
        this.onlineUsers$ = this.onlineUsersSource.asObservable();
    }
    PresenceService.prototype.createHubConnection = function (user) {
        var _this = this;
        this.hubConnection = new signalr_1.HubConnectionBuilder()
            .configureLogging(signalr_1.LogLevel.Information)
            .withUrl(this.hubUrl + 'presence', {
            accessTokenFactory: function () { return user.token; }
        })
            .withAutomaticReconnect()
            .build();
        this.hubConnection.start()["catch"](function (error) { return console.log(error); });
        this.hubConnection.on('UserIsOnline', function (username) {
            // this.toastr.info(username + ' has connected');
            _this.onlineUsers$.pipe(operators_1.take(1)).subscribe(function (usernames) {
                _this.onlineUsersSource.next(__spreadArrays(usernames, [username]));
            });
        });
        this.hubConnection.on('UserIsOffline', function (username) {
            // this.toastr.info(username + ' has disconnected');
            _this.onlineUsers$.pipe(operators_1.take(1)).subscribe(function (usernames) {
                _this.onlineUsersSource.next(__spreadArrays(usernames.filter(function (x) { return x !== username; })));
            });
        });
        this.hubConnection.on('GetOnlineUsers', function (usernames) {
            _this.onlineUsersSource.next(usernames);
        });
        this.hubConnection.on('NewMessageReceived', function (_a) {
            var username = _a.username, knownAs = _a.knownAs;
            _this.toastr
                .info(knownAs + ' has sent you a new message!')
                .onTap.pipe(operators_1.take(1))
                .subscribe(function () {
                return _this.router.navigateByUrl('/members/' + username + '?tab=3');
            });
        });
    };
    PresenceService.prototype.stopHubConnection = function () {
        this.hubConnection.stop()["catch"](function (error) { return console.log(error); });
    };
    PresenceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PresenceService);
    return PresenceService;
}());
exports.PresenceService = PresenceService;
