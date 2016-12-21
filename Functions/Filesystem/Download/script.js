var Downloader = function() {	
	var downloader = Bean("downloader");
	
	var fetchFileNameFromUrl = function(url) {
		return url.substring(url.lastIndexOf('/')+1);
	}
	
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
		"to": function(localFile) {
			this.localFile = localFile;
			return this;
		},
		"get" : function() {
			var progressBar = this.wizard.progressBar("Please wait while " + fetchFileNameFromUrl(this.url) + " is downloaded ...")
			downloader.get(this.url, this.localFile, function(progressEntity) { 
				progressBar.accept(progressEntity);
			});
		}
	}
}