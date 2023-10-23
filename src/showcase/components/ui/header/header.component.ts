import { Component, DestroyRef, inject, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@showcase/services';
import { PersistenceService } from '@shared/services';
import { User } from '@types';
import { UserAvatarComponent } from '@shared/ui/components/user';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { IS_MOBILE, SEARCH_FORM } from '@di';
import { NgxMaskDirective } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent, SidebarContainerComponent, SidebarRef } from '@ui';
import { Portal } from '@cdk';
import { ButtonComponent, RippleDirective } from '@showcase/components/ui';

@Component({
	selector: 'sb-header',
	standalone: true,
	imports: [
		CommonModule,
		UserAvatarComponent,
		RouterLink,
		RouterLinkActive,
		NgxMaskDirective,
		ReactiveFormsModule,
		ButtonComponent,
		RippleDirective,
		IconComponent,
	],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	providers: [Portal, SidebarRef],
})
export class HeaderComponent implements OnInit {
	private _userService = inject(UserService);
	private _persistenceService = inject(PersistenceService);
	private _sidebarRef = inject(SidebarRef);
	private _destroyRef = inject(DestroyRef);
	protected token = this._persistenceService.getItem('token');
	protected user$!: Observable<User>;
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected IS_LANDSCAPE$ = inject(IS_MOBILE);
	protected search = inject(SEARCH_FORM);

	protected open(templateRef: TemplateRef<unknown>) {
		this._sidebarRef.open(SidebarContainerComponent, { template: templateRef, width: 250 }, {}).subscribe();
	}

	ngOnInit() {
		if (this.token) {
			this.user$ = this._userService.getCurrentUser();
		}
	}
}
