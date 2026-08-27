import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Group {
  id: number;
  name: string;
}

const GROUPS: Group[] = [
  { id: 1, name: 'Group 1 Name' },
  { id: 2, name: 'Group 2 Name' },
  { id: 3, name: 'Group 3 Name' },
  { id: 4, name: 'Group 4 Name' },
  { id: 5, name: 'Group 5 Name' },
  { id: 6, name: 'Group 6 Name' },
]

@Component({
  selector: 'app-groups',
  imports: [RouterLink],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups {
  protected readonly groups = signal<Group[]>(GROUPS);
  protected readonly appliedIds = signal<Set<number>>(new Set());

  apply(group: Group) {
    this.appliedIds.update((ids) => new Set(ids).add(group.id));
  }

  hasApplied(group: Group) {
    return this.appliedIds().has(group.id);
  }
}
