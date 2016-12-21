include(["Functions", "Filesystem", "Files"]) 

var Downloader = function() {	
	var downloader = Bean("downloader");
	
	var fetchFileNameFromUrl = function(url) {
		return url.substring(url.lastIndexOf('/')+1);
	}
	
	var message; 
	
	return {
		"wizard" : function(wizard) {
			this.wizard = wizard;
			return this;
		},
		"url" : function(url) {
			this.url = url;
			return this;
		},
		"checksum": function(checksum) {
			this.checksum = checksum;
			return this;
		},
		"message": function(message) {
			message = message;
			return this;
		},
		"to": function(localFile) {
			this.localFile = localFile;
			return this;
		},
		"get" : function() {
			if(!message) {
				message = "Please wait while {0} is downloaded ...".format(fetchFileNameFromUrl(this.url));
			}
			var progressBar = this.wizard.progressBar(message)
			
			if(this.localFile) {
				downloader.get(this.url, this.localFile, function(progressEntity) { 
					progressBar.accept(progressEntity);
				});
			
				if(this.checksum) {
					var fileChecksum = Checksum().wizard(this.wizard).of(this.localFile).get();
					if(fileChecksum != this.checksum) {
						this.wizard.message(
							"Error while calculating checksum. \n\nExpected: {0}\nActual: {1}"
							.format(this.checksum, fileChecksum)
						)
					}
				}
			} else {
				return downloader.get(this.url, function(progressEntity) { 
					progressBar.accept(progressEntity);
				});
			}
		}
	}
}