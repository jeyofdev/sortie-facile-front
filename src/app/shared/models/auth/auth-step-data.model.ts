import { StepAuthProfileAddress } from './steps/step-auth-profile-address.model';
import { StepAuthProfileContact } from './steps/step-auth-profile-contact.model';
import { StepAuthProfileDescription } from './steps/step-auth-profile-description.model';
import { StepAuthProfileInterests } from './steps/step-auth-profile-interests.model';
import { StepAuthProfilePersonnalInfo } from './steps/step-auth-profile-personal-infos.model';

export class AuthStepData {
	constructor(
		public step1: StepAuthProfilePersonnalInfo,
		public step2: StepAuthProfileAddress,
		public step3: StepAuthProfileContact,
		public step4: StepAuthProfileDescription,
		public step5: StepAuthProfileInterests,
	) {}
}
