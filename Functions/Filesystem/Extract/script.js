include(["Functions", "Filesystem", "Files"]) 

var Extractor = function() {	
	var extractor = Bean("extractor");
	
	return {
		"wizard" : function(wizard) {
			this.wizard = wizard;
			return this;
		},
		"archive" : function(archive) {
			this.archive = archive;
			return this;
		},
		"message": function(progressMessage) {
			this.progressMessage = progressMessage;
			return this;
		},
		"to": function(destination) {
			this.destination = destination;
			return this;
		},
		"extract": function() {
			if(!this.progressMessage) {
				this.progressMessage = "Please wait while {0} is extracted ...".format(this.archive);
			}
			
			var progressBar = this.wizard.progressBar(this.progressMessage);
			
			mkdir(this.destination);
			extractor.uncompress(this.archive, this.destination, function(progress) {
				progressBar.accept(progress);
			});
		}
	}
}