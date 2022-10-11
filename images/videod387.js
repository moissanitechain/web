Main.Video = {
	main: Main,
	
	initFooter: function() {
		$('.video-tb img').click(function() {
			var pos = $('.video-ov').fadeIn('fast')
			.parents('section').offset();
			
			this.main.ScrollNav.blockScroll(pos.top);
			
			this.opened = true;
			
			return false;
		}.bind(this));
		
		this.setupSize();
		this.setupLinks();
	},
	
	opened: false,
	
	close: function() {
		
		if(!this.opened)
			return false;
		
		this.opened = false;
		
		//Forcing Safari to stop video playback
		var cnt = $('.video-cnt').html();
		$('.video-cnt').html('  ');
		$('.video-cnt').html(cnt);
		
		$('.video-ov').fadeOut('fast');
		
		this.main.ScrollNav.unblockScroll();
		
		return false;
	},
	
	setupSize: function() {
		var item = $('.video-box iframe');
		
		if(!item.length)
			return;
		
		$('.video-box').css({
			width: item.attr('width'),
			height: item.attr('height')
		});
	},
	
	getVideoId: function() {
		return $('.video-cnt iframe').attr('src').match(/embed\/([^?]+)/)[1];
	},
	
	getVideoUrl: function() {
		return 'https://youtu.be/' + this.getVideoId();
	},
	
	shareLink: function(provider) {
		
		var video = this.getVideoUrl();
		
		var url = encodeURIComponent(video);
				
		var mailb = encodeURIComponent('Check out “Moissanite Chain - Forever Gems Only” video on YouTube ' + video + ' .\r\nMoissanite Chain is an independent boutique brand creating handmade GRA-certified moissanite jewels.');
		
		var img = encodeURIComponent('https://i.ytimg.com/vi/' + this.getVideoId() + '/hqdefault.jpg');
		
		var title = encodeURIComponent('Moissanite Chain - Forever Gems Only. GRA-certified, handmade moissanite jewels.');
		
		var twtext = encodeURIComponent('Check out "Moissanite Chain - Forever Gems Only" on YouTube ' + video + ' #moissanite #chain #cuban #tennischain #baguette @moissanitechain');
		
		var provs = {
			'twitter': 'https://twitter.com/intent/tweet?text=' + twtext,
			'facebook': 'https://www.facebook.com/sharer.php?u=' + url + '&t=',
			'pinterest': 'https://pinterest.com/pin/create/button/?url=' + url + '&media=' + img + '&description=' + title,
			'mail': 'mailto:?subject=I think you will like this video&body=' + mailb			
		};
		
		return provs[provider];
	},
	
	setupLinks: function() {
		
		$('.video-ov').click(function(e) {
			
			if(e.currentTarget == e.target)
			{
				this.close();
				return false;
			}
			
		}.bind(this));
		
		$(document).keyup(function(e) {
			if (e.keyCode == 27) 
			{ 
				this.close();
				return false;
			}
		}.bind(this));
		
		$('.video-ctrl a').each(function(i, item) {
			
			item = $(item);
			
			if(item.parent().attr('class').match(/close/))
			{
				item.click(this.close.bind(this));
			}
			else
			{
				var prov = item.parent().attr('class').match(/share-([^ ]+)/);
				
				if(prov)
				{
					prov = prov[1];
					
					item.attr('target', '_blank').attr('href', this.shareLink(prov));
				}
			}
			
			
		}.bind(this));
	}
};
