export interface BundleState {
	[key: string]:
		| {
				readonly bundling: boolean
				readonly code: string
				readonly error: string
		  }
		| undefined
}
