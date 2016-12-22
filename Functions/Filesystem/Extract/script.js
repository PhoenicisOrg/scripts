include(["Functions", "Filesystem", "Files"]) 

var Extractor = function() {
	var that = this;
	var extractor = Bean("extractor");
	
	return {
		"wizard" : function(wizard) {
			that.wizard = wizard;
			return this;
		},
		"archive" : function(archive) {
			that.archive = archive;
			return this;
		},
		"message": function(progressMessage) {
			that.progressMessage = progressMessage;
			return this;
		},
		"to": function(destination) {
			that.destination = destination;
			return this;
		},
		"extract": function() {
			if(!that.progressMessage) {
				that.progressMessage = "Please wait while {0} is extracted ...".format(that.archive);
			}
			
			var progressBar = that.wizard.progressBar(that.progressMessage);
			
			mkdir(that.destination);
			extractor.uncompress(that.archive, that.destination, function(progress) {
				progressBar.accept(progress);
			});
		}
	}
}