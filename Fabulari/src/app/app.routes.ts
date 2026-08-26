import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Chat } from './chat/chat';

export const routes: Routes = [
    { path: '', component: Login, title: 'Login' },
    { path: 'signup', component: Signup, title: 'Sign Up' },
    { path: 'chat', component: Chat, title: 'Chat' },
];