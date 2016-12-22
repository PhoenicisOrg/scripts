include(["Functions", "Filesystem", "Files"]);

var Downloader = function() {	
	var downloader = Bean("downloader");
	var that = this;

	var fetchFileNameFromUrl = function(url) {
		return url.substring(url.lastIndexOf('/')+1);
	};
	
	var message; 
	
	return {
		"wizard" : function(wizard) {
            that.wizard = wizard;
			return this;
		},
		"url" : function(url) {
            that.url = url;
			return this;
		},
		"checksum": function(checksum) {
            that.checksum = checksum;
			return this;
		},
		"message": function(message) {
            that.message = message;
			return this;
		},
		"to": function(localFile) {
            that.localFile = localFile;
			return this;
		},
		"get" : function() {
			if(!that.message) {
                that.message = "Please wait while {0} is downloaded ...".format(fetchFileNameFromUrl(that.url));
			}
			var progressBar = that.wizard.progressBar(that.message);
			
			if(that.localFile) {
				downloader.get(that.url, that.localFile, function(progressEntity) {
					progressBar.accept(progressEntity);
				});
			
				if(that.checksum) {
					var fileChecksum = Checksum().wizard(that.wizard).of(that.localFile).get();
					if(fileChecksum != that.checksum) {
                        that.wizard.message(
							"Error while calculating checksum. \n\nExpected: {0}\nActual: {1}"
							.format(that.checksum, fileChecksum)
						)
					}
				}
			} else {
				return downloader.get(that.url, function(progressEntity) {
					progressBar.accept(progressEntity);
				});
			}
		}
	}
};