import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Chat } from './chat/chat';

export const routes: Routes = [
    { path: '', component: Login, title: 'Login' },
    { path: 'chat', component: Chat, title: 'Chat' },
];
