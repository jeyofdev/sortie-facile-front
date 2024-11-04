import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountRouteEnum, ActivityRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { CountAndResult } from '@shared/models/count-and-result.model';
import { ResponseInterestBase } from '@shared/models/interests/response/response-interest-base.model';
import { combineLatest, first, map, Observable, of } from 'rxjs';

@Component({
	selector: 'app-account-activity-home-page',
	templateUrl: './account-activity-home-page.component.html',
	styleUrl: './account-activity-home-page.component.scss',
})
export class AccountActivityHomePageComponent {
	resolvedActivities$!: Observable<CountAndResult<ResponseActivity>>;
	filteredActivities$!: Observable<ResponseActivity[]>;
	layout: 'list' | 'grid' = 'list';

	categories: ResponseInterestBase[] | undefined;
	selectedCategory$!: Observable<ResponseInterestBase | null>;
	searchTitle$!: Observable<string>;

	constructor(
		public _router: Router,
		protected _activatedRoute: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this._activatedRoute.data.pipe(first()).subscribe(data => {
			this.resolvedActivities$ = of(data['profile'].activities);
			const profileActivitiesCategories: any[] = [];

			data['profile'].activities.results.map((activity: ResponseActivity) =>
				activity.categories.results.map((cat: ResponseInterestBase) => {
					const categoriesTitle = profileActivitiesCategories.map((category: any) => category.title);

					if (!categoriesTitle.includes(cat.title)) {
						profileActivitiesCategories.push(cat);
					}
				}),
			);

			this.selectedCategory$ = of(null);
			this.searchTitle$ = of('');
			this.categories = profileActivitiesCategories;
		});

		this.updateFilteredActivities();
	}

	updateFilteredActivities() {
		this.filteredActivities$ = combineLatest([
			this.resolvedActivities$,
			this.selectedCategory$,
			this.searchTitle$,
		]).pipe(
			map(([activitiesData, selectedCategory, searchTitle]) => {
				return activitiesData.results.filter(activity => {
					const matchesCategory =
						!selectedCategory ||
						activity.categories.results.some(category => category.title === selectedCategory.title);
					const matchesSearch = !searchTitle || activity.name.toLowerCase().includes(searchTitle.toLowerCase());
					return matchesCategory && matchesSearch;
				});
			}),
		);
	}

	onCategoryChange(event: any) {
		const category = event.value;
		this.selectedCategory$ = of(category);
		this.updateFilteredActivities();
	}

	onSearchTitleChange(event: Event) {
		const searchText = (event.target as HTMLInputElement).value;
		this.searchTitle$ = of(searchText);
		this.updateFilteredActivities();
	}

	onClick = () => {
		this._router.navigateByUrl(
			PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.ACTIVITIES + '/' + ActivityRouteEnum.CREATE,
		);
	};
}
