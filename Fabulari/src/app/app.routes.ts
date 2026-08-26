import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Chat } from './chat/chat';
import { Settings } from './settings/settings';
import { ChangePassword } from './changepassword/changepassword';

export const routes: Routes = [
    { path: '', component: Login, title: 'Login' },
    { path: 'signup', component: Signup, title: 'Sign Up' },
    { path: 'chat', component: Chat, title: 'Chat' },
    { path: 'settings', component: Settings, title: 'Settings' },
    { path: 'changePassword', component: ChangePassword, title: 'ChangePassword' },
];