import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProfileService } from '@services/profile.service';
import { ResponseAddProfile } from '@shared/models/profile/response-add-profile.model';

export const profileResolver: ResolveFn<ResponseAddProfile> = () => {
	const profileService = inject(ProfileService);

	return profileService.getById();
};
