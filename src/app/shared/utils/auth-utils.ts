import { LocalStorageService } from '@services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

export class AuthUtils {
	public _isLoggedInSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(protected localStorageService: LocalStorageService) {
		if (this.localStorageService.checkIfKeyExistInLocalStorage('authToken')) {
			this._isLoggedInSubject$.next(true);
		}
	}

	public notifyLoggedInStatus(status: boolean): void {
		this._isLoggedInSubject$.next(status);
	}
}
