import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProfileService } from '@services/profile.service';
import { ResponseProfile } from '@shared/models/profile/response/response-profile.model';

export const profileResolver: ResolveFn<ResponseProfile> = () => {
	const profileService = inject(ProfileService);

	return profileService.getById();
};
