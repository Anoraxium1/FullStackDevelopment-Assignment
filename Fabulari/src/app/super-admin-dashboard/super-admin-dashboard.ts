import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface Group {
  id: number;
  name: string;
  description: string;
  ageLimit: number;
  colourTheme: string;
  members: { userId: number; role: string }[];
}

interface AppUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuditLogEntry {
  type: string;
  details: string;
  timestamp: string;
}

@Component({
  selector: 'app-super-admin-dashboard',
  imports: [FormsModule, RouterLink],
  templateUrl: './super-admin-dashboard.html',
  styleUrl: './super-admin-dashboard.css',
})
export class SuperAdminDashboard {
  private readonly http = inject(HttpClient);

  protected readonly groups = signal<Group[]>([]);
  protected readonly users = signal<AppUser[]>([]);
  protected readonly errorMessage = signal('');

  protected readonly auditLog = signal<AuditLogEntry[]>([
    { type: 'GROUP_CREATED', details: 'Demo Group was created', timestamp: '2026-08-01' },
    { type: 'ROOM_APPROVED', details: 'General channel approved for Demo Group', timestamp: '2026-08-01' },
  ]);

  protected newGroupName = '';
  protected newGroupDescription = '';
  protected newGroupAgeLimit = 13;
  protected newGroupColourTheme = 'Blue';
  protected newGroupAdminId: number | null = null;

  ngOnInit() {
    this.loadGroups();
    this.loadUsers();
  }

  private loadGroups() {
    this.http.get<Group[]>('http://localhost:3000/api/groups').subscribe({
      next: (groups) => this.groups.set(groups),
    });
  }

  private loadUsers() {
    this.http.get<AppUser[]>('http://localhost:3000/api/users').subscribe({
      next: (users) => this.users.set(users),
    });
  }

  usernameFor(userId: number) {
    return this.users().find((u) => u.id === userId)?.username ?? `User #${userId}`;
  }

  adminCountFor(group: Group) {
    return group.members.filter((m) => m.role === 'admin').length;
  }

  createGroup() {
    if (!this.newGroupName.trim() || !this.newGroupAdminId) {
      this.errorMessage.set('A name and an assigned admin are required.');
      return;
    }

    this.http
      .post<Group>('http://localhost:3000/api/groups', {
        name: this.newGroupName,
        description: this.newGroupDescription,
        ageLimit: this.newGroupAgeLimit,
        colourTheme: this.newGroupColourTheme,
        adminUserId: this.newGroupAdminId,
      })
      .subscribe({
        next: () => {
          this.errorMessage.set('');
          this.newGroupName = '';
          this.newGroupDescription = '';
          this.newGroupAgeLimit = 13;
          this.newGroupColourTheme = 'Blue';
          this.newGroupAdminId = null;
          this.loadGroups();
        },
        error: () => this.errorMessage.set('Unable to create that group.'),
      });
  }
}
