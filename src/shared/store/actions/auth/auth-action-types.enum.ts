export const AuthActionTypes = {
	REGISTER_SUCCESS: '[AUTH] Register Success',
	REGISTER_START: '[AUTH] Register Start',
	REGISTER_FAIL: '[AUTH] Register Failed',
	LOGIN_SUCCESS: '[AUTH] Login Success',
	LOGIN_FAILED: '[AUTH] Login Failed',
	LOGIN_START: '[AUTH] Login Start',
	VERIFY_START: '[AUTH] Verify Start',
	VERIFY_SUCCESS: '[AUTH] Verify Success',
	VERIFY_FAIL: '[AUTH] Verify Fail',
} as const;
