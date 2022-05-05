"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MessageService = void 0;
var core_1 = require("@angular/core");
var signalr_1 = require("@microsoft/signalr");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var paginationHelper_1 = require("./paginationHelper");
var MessageService = /** @class */ (function () {
    function MessageService(http, busyService) {
        this.http = http;
        this.busyService = busyService;
        this.baseUrl = environment_1.environment.apiUrl;
        this.hubUrl = environment_1.environment.hubUrl;
        this.messageThreadSource = new rxjs_1.BehaviorSubject([]);
        this.messageThread$ = this.messageThreadSource.asObservable();
    }
    MessageService.prototype.createHubConnection = function (user, otherUsername) {
        var _this = this;
        this.hubConnection = new signalr_1.HubConnectionBuilder()
            .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
            accessTokenFactory: function () { return user.token; }
        })
            .withAutomaticReconnect()
            .build();
        this.hubConnection.start()["catch"](function (error) { return console.log(error); });
        this.hubConnection.on('ReceiveMessageThread', function (messages) {
            _this.messageThreadSource.next(messages);
        });
        this.hubConnection.on('NewMessage', function (message) {
            _this.messageThread$.pipe(operators_1.take(1)).subscribe(function (messages) {
                _this.messageThreadSource.next(__spreadArrays(messages, [message]));
            });
        });
        this.hubConnection.on('UpdatedGroup', function (group) {
            if (group.connections.some(function (x) { return x.username === otherUsername; })) {
                _this.messageThread$.pipe(operators_1.take(1)).subscribe(function (messages) {
                    messages.forEach(function (message) {
                        if (!message.dateRead) {
                            message.dateRead = new Date(Date.now());
                        }
                    });
                    _this.messageThreadSource.next(__spreadArrays(messages));
                });
            }
        });
    };
    MessageService.prototype.stopHubConnection = function () {
        if (this.hubConnection) {
            this.hubConnection.stop();
        }
    };
    MessageService.prototype.getMessages = function (pageNumber, pageSize, container) {
        var params = paginationHelper_1.getPaginationHeaders(pageNumber, pageSize);
        params = params.append('Container', container);
        return paginationHelper_1.getPaginatedResult(this.baseUrl + 'messages', params, this.http);
    };
    MessageService.prototype.getMessageThread = function (username) {
        return this.http.get(this.baseUrl + 'messages/thread/' + username);
    };
    MessageService.prototype.sendMessage = function (username, content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // return this.http.post<Message>(this.baseUrl + 'messages', {
                //   recipientUsername: username,
                //   content,
                // });
                return [2 /*return*/, this.hubConnection
                        .invoke('SendMessage', {
                        recipientUsername: username,
                        content: content
                    })["catch"](function (error) { return console.log(error); })];
            });
        });
    };
    MessageService.prototype.deleteMessage = function (id) {
        return this.http["delete"](this.baseUrl + 'messages/' + id);
    };
    MessageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
