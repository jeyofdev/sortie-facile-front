import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		private _authService: AuthService,
		private _localStorageService: LocalStorageService,
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const idToken = this._localStorageService.getAuthToken();

		if (idToken) {
			// clone the request to add a new 'Authorization' header with the user token
			const cloned = request.clone({
				headers: request.headers.set('Authorization', 'Bearer ' + idToken),
			});

			return this.mapStream(cloned, next);
		} else {
			return this.mapStream(request, next);
		}
	}

	mapStream(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			tap(incomingRequest => {
				// intercept the requests that my server returns to me in status 200
				if (incomingRequest instanceof HttpResponse) {
					this._authService.setHttpSuccessSubject$(incomingRequest);
				}
			}),

			catchError((err: HttpErrorResponse) => {
				// intercept the requests that my server returns to me in status 400 - 500
				this._authService.setHttpErrorSubject$(err);
				console.log('err', err);

				return throwError(() => new Error(err.error.message ?? 'An error has occurred'));
			}),
		);
	}
}
