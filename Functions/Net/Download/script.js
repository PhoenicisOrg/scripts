include(["Functions", "Filesystem", "Files"]);

var Downloader = {
        _downloader: Bean("downloader"),
        _fetchFileNameFromUrl: function(url) {
            return url.substring(url.lastIndexOf('/')+1);
        },
		wizard : function(wizard) {
            this._wizard = wizard;
			return this;
		},
		url : function(url) {
            this._url = url;
			return this;
		},
		checksum: function(checksum) {
            this._checksum = checksum;
			return this;
		},
		message: function(message) {
            this._message = message;
			return this;
		},
		to: function(localFile) {
            this._localFile = localFile;
			return this;
		},
		get: function() {
			if(!this._message) {
                this._message = "Please wait while {0} is downloaded ...".format(this._fetchFileNameFromUrl(this._url));
			}
			var progressBar = this._wizard.progressBar(this._message);
			
			if(this._localFile) {
				this._downloader.get(this._url, this._localFile, function(progressEntity) {
					progressBar.accept(progressEntity);
				});
			
				if(this._checksum) {
					var fileChecksum = Checksum.wizard(this._wizard).of(this._localFile).get();
					if(fileChecksum != this._checksum) {
                        this._wizard.message(
							"Error while calculating checksum. \n\nExpected: {0}\nActual: {1}"
							.format(this._checksum, fileChecksum)
						)
					}
				}
			} else {
				return this._downloader.get(this._url, function(progressEntity) {
					progressBar.accept(progressEntity);
				});
			}
		}
	};