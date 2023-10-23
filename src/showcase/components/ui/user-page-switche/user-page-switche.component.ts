import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '@ui';

@Component({
	selector: 'sb-user-page-switche',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
	templateUrl: './user-page-switche.component.html',
	styleUrls: ['./user-page-switche.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageSwitcheComponent {}
