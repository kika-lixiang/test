(function () {

	var reporter = {

		appid: 10074,

		flag1: 3127,

		enableClick: true,

		tcssDomain: 'games.imlianpu.com',

		rtnCodeDomain: 'games.imlianpu.com',

		speed: function (config) {

			var baseUrl = window.location.protocol == 'https:' ? 'https://huatuo.weiyun.com/report.cgi?' : 'http://report.huatuo.qq.com/report.cgi?';
			baseUrl += 'appid=' + this.appid + '&speedparams=';

			var params = {
				flag1: this.flag1
			};

			config = config || {};
			
			for (var key in config) {
				params[key] = config[key];
			}

			var _self = this,
				_report = function () {
					var timing = window.performance.timing,
						startPoint = timing.navigationStart,
						timePoints = ['unloadEventStart', 'unloadEventEnd', 'redirectStart', 'redirectEnd', 'fetchStart',
									'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'requestStart',
									'responseStart', 'responseEnd', 'domLoading', 'domInteractive', 'domContentLoadedEventStart',
									'domContentLoadedEventEnd', 'domComplete', 'loadEventStart', 'loadEventEnd'];

					for (var i = 0, len; i < timePoints.length; i++) {
						var time = timing[timePoints[i]];
						if (time) {
							params[i+1] = time - startPoint;
						} else if (time == 0) {
							params[i+1] = 0;
						}
					}

					var url = baseUrl + encodeURIComponent(_self.toQueryString(params));
					var sender = _self.httpImgSender();
			        sender(url);
				};

			if (window.performance && 'addEventListener' in document) {
				window.addEventListener('load', function () {
					setTimeout(_report, 300);
			    }, false); 
			}
			
		},

		click: function (tag) {

			if (!this.enableClick || !tag) {
				return
			}

			var rpUrl = 'http://pinghot.qq.com/pingd?';

			var params = {
				"dm": this.tcssDomain + '.hot',
				"url": '/hottag/',
				"tt": "-",
				"hottag": tag,
				"hotx": 9999,
				"hoty": 9999,
				"_": new Date().getTime()
			};

			var url = rpUrl + this.toQueryString(params);
			var sender = this.httpImgSender();
			sender(url);
		},

		basic: function (path) {
			if (!path) {
				return
			}

			if (!/^\//.test(path)) {
				path = '/' + path;
			}
			var params = {
				"dm": this.tcssDomain,
				"url": path,
				"_": new Date().getTime()
			};

			var url = "http://pingfore.qq.com/pingd?" + this.toQueryString(params);
			var sender = this.httpImgSender();
			sender(url);
		},

        retCode: function (cgi, code, duration) {
            var params = {
                "domain": this.rtnCodeDomain,
                "cgi": cgi,
                "type": code == 0 ? 1 : 2,
                "code": code,
                "time": duration,
                "_": new Date().getTime()
            }

            var url = "http://c.isdspeed.qq.com/code.cgi?" + this.toQueryString(params);
			var sender = this.httpImgSender();
			sender(url);

        },

		toQueryString: function (obj) { 
			var ret = []; 
			for (var key in obj) {
				ret.push(key + '=' + obj[key]);
			} 
			return ret.join('&'); 
		},

		httpImgSender: function () {
			var _self = this;
			var img = new Image();
			var sender = function (src) {
				var _send = function () {
					img.onload = img.onerror = img.onabort = function () {
						img.onload = img.onerror = img.onabort = null;
						img = null;
					};
					img.src = src;
				};
				if (_self.isOnload) {
					_send();
				} else {
					window.addEventListener("load", function (event) { 
					    _self.isOnload = true;
						_send();
					}, false);
				}
			};
			return sender;
		}

	};

	window.speedReportConfig && reporter.speed(window.speedReportConfig);
	reporter.basic(location.pathname);
	window.ptReporter = reporter;

})();
