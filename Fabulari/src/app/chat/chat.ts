import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [RouterLink],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  protected readonly selectedGroup = signal(1);
  protected readonly selectedRoom = signal(1);
  protected readonly showDescription = signal(false);
  protected readonly showGroups = signal(true);
  protected readonly infoTab = signal<'info' | 'age' | 'colour'>('info');

  selectGroup(id: number) {
    this.selectedGroup.set(id);
  }

  selectRoom(id: number) {
    this.selectedRoom.set(id);
  }

  setInfoTab(tab: 'info' | 'age' | 'colour') {
    this.infoTab.set(tab);
  }

  toggleDescription() {
    this.showDescription.update((v) => !v);
  }

  toggleGroups() {
    this.showGroups.update((v) => !v);
  }
}