const util = {
	api: 'http://192.168.0.100:8090/',
    //api: 'https://api.jiayiworld.com/',
    //api: 'https://test.jiayiworld.com/',
    data: {
        //timestamp: new Date().getTime(),
    },
    $http: function(params){
    	const that = this;
    	let {data={}, url='', method='POST', success=()=>{}, fail=()=>{}, complete=()=>{}} = params;
        url = this.api + url;
        that.loading();
    	return new Promise((resolve,reject)=>{
	        wx.request({
	            url: url,
	            data: data,
	            method: method,
	            success: function (res) {
	                //console.log(res);
	                if (res.statusCode == 200){
	                    resolve(res);
	                }else{
	                    reject(res);
	                }
	            },
	            fail: function(res){
	                reject(res);
	                wx.showToast({
	                    title: '服务器异常',
	                    icon: 'none',
	                    duration: 1500
	                });
	            },
	            complete: function(res){
	                that.navloading('close');
	                that.loading('close');
	            },
	        });
    	});
    },
	getUserInfo(params){
    	return new Promise((resolve,reject)=>{
	        wx.request({
	            url: 'https://api.weixin.qq.com/sns/jscode2session',
	            data: params.data,
	            method: 'GET',
	            success: function (res) {
	                //console.log(res);
	                if (res.statusCode == 200){
	                    resolve(res);
	                }else{
	                    reject(res);
	                }
	            },
	            fail: function(res){
	                reject(res);
	            }
	        });
    	});
	},
    navloading: type=> {
	    if (type == 'close') {
	        wx.hideNavigationBarLoading();
	    } else {
	        wx.showNavigationBarLoading();
	    }
	},
	loading: param=> {
	    if (param == 'close') {
	        wx.hideLoading();
	    } else {
	        wx.showLoading({
	            mask: true,
	            title: param ? param.title : ''
	        });
	    }
	},
	 convertTimeToMin(e){
		 let  currentTi = Math.floor(e);
		 let currentTimeHour = 0;
		 let currentTimeMin = 0;
		 let currentTimeSec = 0 ;
		 currentTimeHour = parseInt(currentTi/3600);
		 currentTimeMin = parseInt((currentTi-currentTimeHour*3600)/60);
		 currentTimeSec = parseInt(currentTi -(currentTimeHour*3600)-(currentTimeMin*60));
		 if(currentTimeMin<10) currentTimeMin = "0"+currentTimeMin;
		 if(currentTimeSec<10) currentTimeSec = "0"+currentTimeSec;
		 return  currentTimeMin+':'+currentTimeSec;
	 }
}

export {util}
