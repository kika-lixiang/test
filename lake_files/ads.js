

//Create an ad display container
var adObject;
var AdDistance;
var adContainer=$("#adContainer");
$('#mainContainer').height($(window).height());
adContainer.width($(window).width());
adContainer.height($(window).height());
// adContainer.width($(document.body).width());
// adContainer.height($(document.body).height()-100);
var videoContent = document.getElementById('contentElement');

var adDisplayContainer = new google.ima.AdDisplayContainer(
    document.getElementById('adContainer')
    // , videoContent
);
adDisplayContainer.initialize();
var adsLoader = new google.ima.AdsLoader(adDisplayContainer);

// Add event listeners
adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false);
adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false);
function onAdError(adErrorEvent) {
    // Handle the error logging and destroy the AdsManager
    showGame();
    console.log(">>>>>>"+adErrorEvent.getError());
    // adsManager.destroy();

}

// An event listener to tell the SDK that our content video
// is completed so the SDK can play any post-roll ads.
//一个事件侦听器来告诉我们的内容视频SDK //完成因此SDK可以播放任何片尾广告。
var contentEndedListener = function() {adsLoader.contentComplete();};
videoContent.onended = contentEndedListener;
var descriptionURL="http://h5d.hello-game.net/";

// Request video ads.
//请求视频广告
var adsRequest = new google.ima.AdsRequest();
var clientpub=afg_clientpub;
var ad_channel=afg_channel_id;
if(clientpub=="None")
{
    adsRequest.adTagUrl="";
}else {
    adsRequest.adTagUrl =
        "http://googleads.g.doubleclick.net/pagead/ads?client="
        + clientpub
        + "&ad_type=text_image_flash&hl=en&channel="
        + ad_channel
        + "&max_ad_duration=30000&adsafe=high&description_url="
        + encodeURIComponent(descriptionURL);
    adsRequest.forceNonLinearFullSlot = true;
}
 var video_ads=false;
  if(video_ads)
  {
adsRequest.linearAdSlotWidth =  $(window).width();
adsRequest.linearAdSlotHeight =  $(window).height();
}else {
// Specify the linear and nonlinear slot sizes. This helps the SDK to
// select the correct creative if multiple are returned.
//指定线性和非线性槽的尺寸。这有助于SDK来//选择正确的广告如果有多个被返回
    adsRequest.nonLinearAdSlotWidth =  $("#adContainer").width();
    adsRequest.nonLinearAdSlotHeight = $("#adContainer").height();

}

var timeCounter=15;
var timeoutTimer=null;
$(document).ready(function () {
    start();
})

function  start() {
    requestAds();
    // $(window).bind("resize",correctPositions);
}

function requestAds() {

    adsLoader.requestAds(adsRequest);
}

//Getting the AdsManager and Display Ads

function onAdsManagerLoaded(adsManagerLoadedEvent) {
    // var adsRenderingSettings = new google.ima.AdsRenderingSettings();
    // adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    // Get the ads manager.
    adsManager = adsManagerLoadedEvent.getAdsManager(videoContent);  // See API reference for contentPlayback

    // Add listeners to the required events.
    adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE,onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,onAdEvent);

    try {
        // Initialize the ads manager. Ad rules playlist will start at this time.
        //初始化广告管理。广告规则播放列表将在此时开始。
        adsManager.init(adContainer.width(), adContainer.height(), google.ima.ViewMode.NORMAL);
        // adsManager.init($(document.body ).width(),$(document.body).height(), google.ima.ViewMode.NORMAL);
        // Call start to show ads. Single video and overlay ads will
        // start at this time; this call will be ignored for ad rules, as ad rules
        // ads start when the adsManager is initialized.
        //调用开始展示广告。单个视频和重叠式广告将
        // 开始在这个时候; 此调用将为广告规则被忽略，因为广告规则
        // 广告时，AdsManager的初始化启动。
        adsManager.start();
    } catch (adError) {
        console.log("adError++"+adError);
        alert("adError++"+adError);
        showGame();
        // An error may be thrown if there was a problem with the VAST response.
    }
}
function  showGame() {
    $("#mainContainer").hide();
    $("#gameframediv").show();
    //更新界面样式
}

function correctPositions() {
   $("#adContainer_logo").hide();
            if(adObject && adsManager ){
				if(SysOS=="pc"){
					if(adObject.isLinear()){
						$("#mainContainer").css({"margin-top":0});
		                              $("#mainContainer").height(604);
		                             adContainer.height(604);
		                              $("#adContainer").css({
		                                   "padding-top":     10
		                              });
		                              adsManager.resize(adContainer.width(), 604, google.ima.ViewMode.NORMAL);
					}else{
						$("#mainContainer").css({"margin-top":0});
						$("#mainContainer").height(594);
						adContainer.height(594 - adObject.getHeight() / 2);
						adsManager.resize(adObject.getWidth(),adObject.getHeight(), google.ima.ViewMode.NORMAL);
						var PaddingLeft=(488-adObject.getWidth())/2;
						if(PaddingLeft<0) PaddingLeft=0;
						$("#adContainer").css({
							"padding-left":	PaddingLeft
						});
					}
				}else{
					if(adObject.isLinear()){
		                              $("#adContainer").height($(window).height()-AdDistance);
		                              adsManager.resize($(window).width(), $(window).height()-AdDistance, google.ima.ViewMode.NORMAL);
					}else{
						$("#mainContainer").css({"margin-top":0});
						$("#mainContainer").height($(window).height()-AdDistance);
						$("#adContainer").height($(window).height()-AdDistance - ($(window).height()- AdDistance +adObject.getHeight()) / 2);
						adsManager.resize(adObject.getWidth(), adObject.getHeight(), google.ima.ViewMode.NORMAL);
						var PaddingLeft=($(window).width()-adObject.getWidth())/2;
						if(PaddingLeft<0) PaddingLeft=0;
						$("#adContainer").css({
							"padding-left":	PaddingLeft
						});
					}
				}
			}
}

function  onAdEvent(e) {
    console.log("Ad event:"+e.type);
    var i=e.getAd();
    switch (e.type){
        case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
            onContentResumeRequested();
            break;
        case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
            onContentPauseRequested();
            break;
        case google.ima.AdEvent.Type.LOADED:
            console.log("loaded");
            adObject = i;
            // correctPositions()
            // i.isLinear() || tickTimer()
            ;
            break;
        case google.ima.AdEvent.Type.STARTED:
            break;
        case google.ima.AdEvent.Type.COMPLETE:
            showGame();
            break;
        case google.ima.AdEvent.Type.CLICK:
            showGame();
            break;
        case google.ima.AdEvent.Type.USER_CLOSE:
            showGame();
            break;
        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            showGame();
            break;
    }
}
function onContentPauseRequested() {
    // This function is where you should setup UI for showing ads (e.g.
    // display ad timer countdown, disable seeking, etc.)

}

function onContentResumeRequested() {
    // This function is where you should ensure that your UI is ready
    // to play content.
    showGame();
}
function tickTimer() {
    timeoutTimer = setTimeout(function () {
        timeCounter--;
        if(timeCounter==0){
            showGame();
            clearTimeout(timeoutTimer);
        }else{
            tickTimer();
        }
    }, 1e3)
}
