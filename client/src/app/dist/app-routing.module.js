"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var admin_panel_component_1 = require("./admin/admin-panel/admin-panel.component");
var not_found_component_1 = require("./errors/not-found/not-found.component");
var server_error_component_1 = require("./errors/server-error/server-error.component");
var test_errors_component_1 = require("./errors/test-errors/test-errors.component");
var home_component_1 = require("./home/home.component");
var lists_component_1 = require("./members/lists/lists.component");
var member_detail_component_1 = require("./members/member-detail/member-detail.component");
var member_edit_component_1 = require("./members/member-edit/member-edit.component");
var member_list_component_1 = require("./members/member-list/member-list.component");
var messages_component_1 = require("./messages/messages.component");
var admin_guard_1 = require("./_guards/admin.guard");
var auth_guard_1 = require("./_guards/auth.guard");
var prevent_unsaved_changes_guard_1 = require("./_guards/prevent-unsaved-changes.guard");
var member_detailed_resolver_1 = require("./_resolvers/member-detailed.resolver");
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [auth_guard_1.AuthGuard],
        children: [
            {
                path: 'members',
                component: member_list_component_1.MemberListComponent
            },
            {
                path: 'members/:username',
                component: member_detail_component_1.MemberDetailComponent,
                resolve: { member: member_detailed_resolver_1.MemberDetailedResolver }
            },
            {
                path: 'member/edit',
                component: member_edit_component_1.MemberEditComponent,
                canDeactivate: [prevent_unsaved_changes_guard_1.PreventUnsavedChangesGuard]
            },
            {
                path: 'lists',
                component: lists_component_1.ListsComponent
            },
            {
                path: 'messages',
                component: messages_component_1.MessagesComponent
            },
            {
                path: 'admin',
                component: admin_panel_component_1.AdminPanelComponent,
                canActivate: [admin_guard_1.AdminGuard]
            },
        ]
    },
    {
        path: 'errors',
        component: test_errors_component_1.TestErrorsComponent
    },
    {
        path: 'not-found',
        component: not_found_component_1.NotFoundComponent
    },
    {
        path: 'server-error',
        component: server_error_component_1.ServerErrorComponent
    },
    {
        path: '**',
        component: not_found_component_1.NotFoundComponent,
        pathMatch: 'full'
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
