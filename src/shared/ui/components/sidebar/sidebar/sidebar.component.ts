import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoopAnimationPlayer } from '@angular/animations';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
	selector: 'sb-sidebar',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive],
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	viewProviders: [NoopAnimationPlayer],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
