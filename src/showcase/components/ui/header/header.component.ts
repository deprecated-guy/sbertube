import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, VideoLoader } from '@showcase/services';
import { CountryLoader, PersistenceService } from '@shared/services';
import { User } from '@types';
import { UserAvatarComponent } from '@shared/ui/components/user';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { IS_MOBILE, SEARCH_FORM } from '@di';
import { NgxMaskDirective } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent, SidebarContainerComponent, SidebarRef } from '@ui';
import { Portal } from '@cdk';
import { ButtonComponent, RippleDirective } from '@showcase/components/ui';
import { SettingsComponent } from '@showcase/components/ui/settings/settings.component';
import { UserEditorComponent } from '@showcase/components/user/account-menu';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
		SettingsComponent,
		UserEditorComponent,
	],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	providers: [Portal, SidebarRef],
})
export class HeaderComponent implements OnInit {
	private _userService = inject(UserService);
	private _persistenceService = inject(PersistenceService);
	private _sidebarRef = inject(SidebarRef);
	private _changeDetector = inject(ChangeDetectorRef);
	private _countryLoader = inject(CountryLoader);
	private _videoLoader = inject(VideoLoader);
	private _countries = this._countryLoader.getCountries();
	protected _countryCode = this._persistenceService.getItem('countryCode') as string;
	private _lon!: number;
	private _lat!: number;
	protected iconPath = `../../../assets/menu-icons/`;
	private _destroyRef = inject(DestroyRef);
	protected token = this._persistenceService.getItem('token');
	protected user$!: Observable<User>;
	protected IS_MOBILE$ = inject(IS_MOBILE);
	protected search = inject(SEARCH_FORM);

	protected open(templateRef: TemplateRef<unknown>) {
		this._sidebarRef.open(SidebarContainerComponent, { template: templateRef, width: 250 }, {}).subscribe();
	}

	private getPosition() {
		navigator.geolocation.getCurrentPosition((position) => {
			this._lon = position.coords.longitude;
			this._lat = position.coords.latitude;
		});
	}

	private getCountryCode() {
		combineLatest([this._countryLoader.getCountryImage(this._lon, this._lat), this._countries])
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(([country, countries]) => {
				this._countryCode = country.countryCode;
				countries.forEach((item) => {
					if (this._countryCode === item.name) {
						this.iconPath += item.icon;
					}
					console.log(item);
					this._changeDetector.detectChanges();
				});
				console.log(this.iconPath);
			});
	}

	private get searchValue() {
		return this.search.get('search')?.value;
	}

	protected searchVideo() {
		this._videoLoader.getVideos(this.searchValue).pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
	}

	ngOnInit() {
		this.getPosition();
		this.getCountryCode();
		console.log(this.iconPath);
		if (this.token) {
			this.user$ = this._userService.getCurrentUser();
		}
	}
}
