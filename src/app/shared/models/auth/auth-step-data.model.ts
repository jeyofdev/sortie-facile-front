import { StepAuthProfileAddress } from '@shared/models/auth/steps/step-auth-profile-address.model';
import { StepAuthProfileContact } from '@shared/models/auth/steps/step-auth-profile-contact.model';
import { StepAuthProfileDescription } from '@shared/models/auth/steps/step-auth-profile-description.model';
import { StepAuthProfileInterests } from '@shared/models/auth/steps/step-auth-profile-interests.model';
import { StepAuthProfilePersonnalInfo } from '@shared/models/auth/steps/step-auth-profile-personal-infos.model';
import { StepAuthRegister } from '@shared/models/auth/steps/step-auth-register.model';

export class AuthStepData {
	constructor(
		public step1: StepAuthRegister,
		public step2: StepAuthProfilePersonnalInfo,
		public step3: StepAuthProfileAddress,
		public step4: StepAuthProfileContact,
		public step5: StepAuthProfileDescription,
		public step6: StepAuthProfileInterests,
	) {}
}
