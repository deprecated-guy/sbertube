import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from 'src/showcase/components/ui/header';

@Component({
	selector: 'sb-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, HeaderComponent],
	templateUrl: './app.component.html',
})
export class AppComponent {
	title = 'sbertube-2';
}
