import { Injectable } from '@angular/core';
import { AuthStepData } from '@shared/models/auth/auth-step-data.model';
import { StepAuthProfileAddress } from '@shared/models/auth/steps/step-auth-profile-address.model';
import { StepAuthProfileContact } from '@shared/models/auth/steps/step-auth-profile-contact.model';
import { StepAuthProfileDescription } from '@shared/models/auth/steps/step-auth-profile-description.model';
import { StepAuthProfileInterests } from '@shared/models/auth/steps/step-auth-profile-interests.model';
import { StepAuthProfilePersonnalInfo } from '@shared/models/auth/steps/step-auth-profile-personal-infos.model';
import { StepAuthRegister } from '@shared/models/auth/steps/step-auth-register.model';

@Injectable({
	providedIn: 'root',
})
export class AuthStepService {
	private stepData: AuthStepData = new AuthStepData(
		new StepAuthRegister('', ''),
		new StepAuthProfilePersonnalInfo('', '', ''),
		new StepAuthProfileAddress(0, '', 0, 0, 0),
		new StepAuthProfileContact('', '', '', ''),
		new StepAuthProfileDescription(''),
		new StepAuthProfileInterests([]),
	);

	setStepData<K extends keyof AuthStepData>(step: K, data: AuthStepData[K]) {
		this.stepData[step] = data;
	}

	getStepData<K extends keyof AuthStepData>(step: K): AuthStepData[K] {
		return this.stepData[step];
	}

	getAllData() {
		return this.stepData;
	}
}
