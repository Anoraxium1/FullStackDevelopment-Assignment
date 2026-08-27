import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Chat } from './chat/chat';
import { Settings } from './settings/settings';
import { ChangePassword } from './change-password/change-password';
import { ChangeUsername } from './change-username/change-username';
import { ChangeBirthdate } from './change-birthdate/change-birthdate';
import { Report } from './report/report';
import { Groups } from './groups/groups';
import { GroupAdminDashboard } from './group-admin-dashboard/group-admin-dashboard';
import { SuperAdminDashboard } from './super-admin-dashboard/super-admin-dashboard';

export const routes: Routes = [
    { path: '', component: Login, title: 'Login' },
    { path: 'signup', component: Signup, title: 'Sign Up' },
    { path: 'chat', component: Chat, title: 'Chat' },
    { path: 'settings', component: Settings, title: 'Settings' },
    { path: 'change-password', component: ChangePassword, title: 'Change Password' },
    { path: 'change-username', component: ChangeUsername, title: 'Change Username' },
    { path: 'change-birthdate', component: ChangeBirthdate, title: 'Change Birthdate' },
    { path: 'report', component: Report, title: 'Report' },
    { path: 'groups', component: Groups, title: 'Groups' },
    { path: 'admin/group/:groupId', component: GroupAdminDashboard, title: 'Group Admin' },
    { path: 'admin/super', component: SuperAdminDashboard, title: 'Super Admin' },
];