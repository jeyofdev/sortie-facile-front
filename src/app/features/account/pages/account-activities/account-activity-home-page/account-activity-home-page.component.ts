import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '@services/activity.service';
import { AccountRouteEnum, AccountActivityRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { CountAndResult } from '@shared/models/count-and-result.model';
import { ResponseInterestBase } from '@shared/models/interests/response/response-interest-base.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { combineLatest, first, map, Observable, of, tap } from 'rxjs';

@Component({
	selector: 'app-account-activity-home-page',
	templateUrl: './account-activity-home-page.component.html',
	styleUrl: './account-activity-home-page.component.scss',
	providers: [ConfirmationService],
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
		private _confirmationService: ConfirmationService,
		private _messageService: MessageService,
		private _activityService: ActivityService,
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
			PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.ACTIVITIES + '/' + AccountActivityRouteEnum.CREATE,
		);
	};

	deleteActivity(activityId: number): void {
		this._confirmationService.confirm({
			message: 'You are about to delete an activity. Are you sure about your choice? This action is irreversible.',
			header: 'Delete activity',
			icon: 'pi pi-info-circle',
			acceptButtonStyleClass: 'p-button-danger p-button-text',
			rejectButtonStyleClass: 'p-button-text p-button-text',
			acceptIcon: 'none',
			rejectIcon: 'none',

			accept: () => {
				this._activityService
					.deleteActivityById(activityId)
					.pipe(
						tap(() => {
							this._messageService.add({
								severity: 'success',
								detail: 'Activity deleted successfully.',
								icon: 'pi pi-check',
							});
						}),
					)
					.subscribe();
			},
			reject: () => {
				// this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
			},
		});
	}
}
