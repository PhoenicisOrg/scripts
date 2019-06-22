class PlainInstaller {
	constructor() {
		// do nothing
	}

	withScript(command) {
		this.command = command;
		return this;
	}

	go() {
		this.command();
	}
}
