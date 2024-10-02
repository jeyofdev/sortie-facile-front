import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthStepService {
	private stepData: any = {};

	setStepData(step: string, data: any) {
		this.stepData[step] = data;
	}

	getStepData(step: string) {
		return this.stepData[step];
	}

	getAllData() {
		return this.stepData;
	}
}
