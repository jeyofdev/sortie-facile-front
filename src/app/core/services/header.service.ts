import { Injectable } from '@angular/core';
import { AccountRouteEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HeaderService {
	private _itemsSubject: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
	items$: Observable<MenuItem[]> = this._itemsSubject.asObservable();

	constructor(private _authService: AuthService) {
		this._authService._isLoggedInSubject$.subscribe((userIsConnected: boolean) => {
			const items = userIsConnected ? this.getItemsWhenUserConnected() : this.getItemsWhenUserNotConnected();
			this._itemsSubject.next(items);
		});
	}

	private getItemsWhenUserNotConnected(): MenuItem[] {
		return [
			{
				items: [
					{
						label: 'Signin',
						routerLink: PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN,
					},
					{
						label: 'Signup',
						routerLink: PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNUP,
					},
				],
			},
		];
	}

	private getItemsWhenUserConnected(): MenuItem[] {
		return [
			{
				items: [
					{
						label: 'Account',
						routerLink: PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.HOME,
					},
					{
						label: 'Logout',
						routerLink: PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN,
						command: () => this._authService.logout(),
					},
				],
			},
		];
	}
}
