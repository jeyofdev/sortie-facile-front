import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	private contactIsViewDatasSubject = new BehaviorSubject<boolean>(true);
	private contactIsViewDataCheckedSubject = new BehaviorSubject<boolean>(false);

	private descriptionIsViewDatasSubject = new BehaviorSubject<boolean>(true);
	private descriptionIsViewDataCheckedSubject = new BehaviorSubject<boolean>(false);

	private profileIsViewDatasSubject = new BehaviorSubject<boolean>(true);
	private profileIsViewDataCheckedSubject = new BehaviorSubject<boolean>(false);

	private addressIsViewDatasSubject = new BehaviorSubject<boolean>(true);
	private addressIsViewDataCheckedSubject = new BehaviorSubject<boolean>(false);

	private passwordIsViewDatasSubject = new BehaviorSubject<boolean>(true);
	private passwordIsViewDataCheckedSubject = new BehaviorSubject<boolean>(false);

	contactIsViewDatas$: Observable<boolean> = this.contactIsViewDatasSubject.asObservable();
	contactIsViewDataChecked$: Observable<boolean> = this.contactIsViewDataCheckedSubject.asObservable();

	descriptionIsViewDatas$: Observable<boolean> = this.descriptionIsViewDatasSubject.asObservable();
	descriptionIsViewDataChecked$: Observable<boolean> = this.descriptionIsViewDataCheckedSubject.asObservable();

	profileIsViewDatas$: Observable<boolean> = this.profileIsViewDatasSubject.asObservable();
	profileIsViewDataChecked$: Observable<boolean> = this.profileIsViewDataCheckedSubject.asObservable();

	addressIsViewDatas$: Observable<boolean> = this.addressIsViewDatasSubject.asObservable();
	addressIsViewDataChecked$: Observable<boolean> = this.addressIsViewDataCheckedSubject.asObservable();

	passwordIsViewDatas$: Observable<boolean> = this.passwordIsViewDatasSubject.asObservable();
	passwordIsViewDataChecked$: Observable<boolean> = this.passwordIsViewDataCheckedSubject.asObservable();

	setContactIsViewDatas(value: boolean): void {
		this.contactIsViewDatasSubject.next(value);
	}

	setContactIsViewDataChecked(value: boolean): void {
		this.contactIsViewDataCheckedSubject.next(value);
	}

	setDescriptionIsViewDatas(value: boolean): void {
		this.descriptionIsViewDatasSubject.next(value);
	}

	setDescriptionIsViewDataChecked(value: boolean): void {
		this.descriptionIsViewDataCheckedSubject.next(value);
	}

	setProfileIsViewDatas(value: boolean): void {
		this.profileIsViewDatasSubject.next(value);
	}

	setProfileIsViewDataChecked(value: boolean): void {
		this.profileIsViewDataCheckedSubject.next(value);
	}

	setAddressIsViewDatas(value: boolean): void {
		this.addressIsViewDatasSubject.next(value);
	}

	setAddressIsViewDataChecked(value: boolean): void {
		this.addressIsViewDataCheckedSubject.next(value);
	}

	setPasswordIsViewDatas(value: boolean): void {
		this.passwordIsViewDatasSubject.next(value);
	}

	setPasswordIsViewDataChecked(value: boolean): void {
		this.passwordIsViewDataCheckedSubject.next(value);
	}
}
