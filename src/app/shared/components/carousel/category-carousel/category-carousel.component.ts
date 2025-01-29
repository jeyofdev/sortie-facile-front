import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InterestService } from '@services/interests.service';
import { PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseInterest } from '@shared/models/interests/response/response-interests.interface';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-category-carousel',
	templateUrl: './category-carousel.component.html',
	styleUrl: './category-carousel.component.scss',
})
export class CategoryCarouselComponent implements OnDestroy {
	interests$!: Observable<ResponseInterest[]>;
	responsiveOptions: any[] = [];
	numVisibleClass: string = 'visible-6';

	constructor(
		private interestService: InterestService,
		private cdr: ChangeDetectorRef,
		private router: Router,
	) {}

	ngOnInit() {
		this.interests$ = this.interestService.getAllInterests();

		this.responsiveOptions = [
			{
				breakpoint: '1400px',
				numVisible: 6,
				numScroll: 1,
			},
			{
				breakpoint: '1220px',
				numVisible: 5,
				numScroll: 1,
			},
			{
				breakpoint: '1024px',
				numVisible: 4,
				numScroll: 1,
			},
			{
				breakpoint: '768px',
				numVisible: 3,
				numScroll: 1,
			},
			{
				breakpoint: '560px',
				numVisible: 2,
				numScroll: 1,
			},
			{
				breakpoint: '400px',
				numVisible: 1,
				numScroll: 1,
			},
		];

		this.updateNumVisibleClass();
		window.addEventListener('resize', this.updateNumVisibleClass.bind(this));
	}

	redirectTo(interest: string) {
		const formatInterest = interest.toLowerCase().replace(' ', '-');
		this.router.navigateByUrl(`/${PrimaryRouteEnum.ACTIVITY}/${formatInterest}`);
	}

	private updateNumVisibleClass() {
		const screenWidth = window.innerWidth;
		let matchedClass = 'visible-6';

		for (const option of this.responsiveOptions.sort((a, b) => parseInt(a.breakpoint) - parseInt(b.breakpoint))) {
			const breakpoint = parseInt(option.breakpoint.replace('px', ''), 10);

			if (screenWidth <= breakpoint) {
				matchedClass = `visible-${option.numVisible}`;
				break;
			}
		}

		this.numVisibleClass = matchedClass;
		this.cdr.detectChanges();
	}

	ngOnDestroy() {
		window.removeEventListener('resize', this.updateNumVisibleClass.bind(this));
	}
}
