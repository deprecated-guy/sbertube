import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'sb-welcome-page',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss'],
	animations: [
		trigger('dropdown', [
			state(
				'open',
				style({
					opacity: 1,
					transform: 'translateY(0)',
				}),
			),
			state(
				'closed',
				style({
					opacity: 0,
					transform: 'translateY(-10px)',
				}),
			),
			transition('closed => open', animate('300ms ease-in')),
			transition('open => closed', animate('300ms ease-out')),
		]),
	],
})
export class WelcomePageComponent {
	protected name = '';
	protected method = '';
	protected state = 'closed';
	protected names: string[] = [
		'Аарон',
		'Абрам',
		'Аваз',
		'Аввакум',
		'Август',
		'Августа',
		'Августин',
		'Августина',
		'Авдей',
		'Авдий',
		'Авдотья',
		'Авигея',
		'Авксентий',
		'Авраам',
		'Аврор',
		'Аврора',
		'Автандил',
		'Автоноя',
		'Агап',
		'Агапия',
		'Агата',
		'Агафон',
		'Агафья',
		'Аггей',
		'Аглая',
		'Агнес',
		'Агнесса',
		'Агнета',
		'Агния',
		'Агриппина',
		'Агунда',
		'Ада',
		'Адам',
		'Аделаида',
		'Аделина',
		'Аделия',
		'Адель',
		'Адельфина',
		'Адиля',
		'Адис',
		'Адольф',
		'Адриан',
		'Адриана',
		'Адриенна',
		'Аза',
		'Азалия',
		'Азамат',
		'Азарий',
		'Азат',
		'Азиза',
		'Аида',
		'Айганым',
		'Айгерим',
		'Айгуль',
		'Айдар',
		'Айжан',
		'Айлин',
		'Айнагуль',
		'Айнур',
		'Айрат',
		'Акакий',
		'Аким',
		'Аксён',
		'Аксинья',
		'Акулина',
		'Алан',
		'Алана',
		'Алдона',
		'Алевтин',
		'Алевтина',
		'Александр',
		'Александра',
		'Александрина',
		'Алексей',
		'Алексий',
		'Ален',
		'Алёна',
		'Алеся',
		'Али',
		'Алика',
		'Алико',
		'Алима',
		'Алина',
		'Алира',
		'Алиса',
		'Алихан',
		'Алия',
		'Алла',
		'Алмаз',
		'Андрей',
	];

	protected changeState() {
		this.state = this.state == 'closed' ? 'open' : 'closed';
	}

	protected onSubmit(value: string) {
		this.name = value;
	}
}
