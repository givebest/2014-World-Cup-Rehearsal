/*
Author: Pei Wang
Email: givenlovs@msn.com
Last updated: 2014-06-12
*/
$(function(){
	$("#teams ul:nth-child(2n)").addClass("even");

	//tooltip
	var x = 10;
	var y = 15;

	$('#teams li img').hover(function(e){
		this.Mytitle= this.alt;
		this.title = '';
		var tooltip = $('<div id="tooltip" class="tooltip">' +this.Mytitle+ '</div>');

		$('body').append(tooltip);

		$('#tooltip').css({
			'left': (e.pageX + x) + 'px',
			'top': (e.pageY + y) + 'px'
		}).show();
	},function(){
		this.alt = this.Mytitle;
		$('#tooltip').remove();
	}).mousemove(function(e){
		$('#tooltip').css({
			'left': (e.pageX + x) + 'px',
			'top': (e.pageY + y) + 'px'
		});
	});

	
	
	var $teams = $("#teams");
	var $gradeList = $("#gradeList");

	//玩法介绍
	$("#cupHelp").hover(function(){
		$(this).find("div.tooltip").show();
	}, function(){
		$(this).find("div.tooltip").hide();	
	});

	$teams.find("li").each(function(){
		$("<b></b>").appendTo($(this));
	});
	
	$teams.find("li").each(function(){
		var divthis = $(this);
		divthis.live("mouseover", function(){
			divthis.find("div.tooltip").show();
		}).mouseleave(function(){
			divthis.find("div").hide();
		});	
	});

	$teams.find("li").each(function(){
		var $this = $(this),
			thisSup = $this.find("sup");
		thisSup.live("click", function(){
			$this.removeClass("dis");
			$(this).remove();
			$gradeList.find("span").each(function(){	
				if ($(this).text() == $this.find("span").text()){
					$(this).remove();
				}
			});
		});
		
	});
	
	$gradeList.find("div.tmFlag").each(function(){
		var divthis = $(this);
		divthis.live("mouseover", function(){
			divthis.find("i").show();
		}).mouseleave(function(){
			divthis.find("i").hide();
		});	
	});

	//玩法介绍
	$gradeList.find("div.tips").hover(function(){
		$(this).find("div.tooltip").show();
	}, function(){
		$(this).find("div.tooltip").hide();	
	});


	//节流函数
	function throttle(method, scope) {
            clearTimeout(method.tId);
            method.tId= setTimeout(function(){
                method.call(scope);
            }, 100);
     }

	//添加
	function addTeam(thisteam, gteam, num){
		var thisTeam = thisteam,
			teamParent = thisTeam.parent(),
			parentUl = teamParent.parent(),
			tNum = num,
			gTeam = gteam,
			thisOS = thisTeam.offset(),
			thisOSTop = thisOS.top,
			thisOSLeft = thisOS.left,
			gTeam1 = gTeam.eq(0),
			gTeam2 = gTeam.eq(1),
			gt1OS = gTeam1.offset(),
			gt1OSTop = gt1OS.top,
			gt1OSLeft = gt1OS.left,
			gt2OS = gTeam2.offset(),
			gt2OSTop = gt2OS.top,
			gt2OSLeft = gt2OS.left,
			gTeamTop = "",
			gTeamLeft = "",
			gTeam = "",
			teamSup = "",
			tSup1 = $("<sup>1</sup>"),
			tSup2 = $("<sup>2</sup>");

			$("#teams span.poa").remove();
			
			if (gTeam1.find("span").text() && gTeam2.find("span").text()){
				cloneTeam = "";
			}else if( thisTeam.text() == gTeam1.find("span").text() ){
				cloneTeam = "";
			}else if( thisTeam.text() == gTeam2.find("span").text() ){
				cloneTeam = "";
			}else{
				cloneTeam = teamParent.addClass("dis").end().clone().appendTo(thisteam.parent()).addClass("poa");	
			}

			//console.log(gTeam1.text());

			if (tNum == "1" || tNum == "3" || tNum == "5" || tNum == "7"){
				if (!gTeam1.find("span:first").length &&  (thisTeam.text() != gTeam2.find("span").text()) ){
					gTeamTop = gt1OSTop;
					gTeamLeft = gt1OSLeft;
					gTeam = gTeam1;
				}else if(!gTeam2.find("span:first").length &&  (thisteam.text() != gTeam1.find("span").text())){
					gTeamTop = gt2OSTop;
					gTeamLeft = gt2OSLeft;
					gTeam = gTeam2;
				}
			}else{
				if (!gTeam2.find("span:first").length &&  (thisTeam.text() != gTeam1.find("span").text()) ){
					gTeamTop = gt2OSTop;
					gTeamLeft = gt2OSLeft;
					gTeam = gTeam2;
				}else if(!gTeam1.find("span:first").length &&  (thisteam.text() != gTeam2.find("span").text())){
					gTeamTop = gt1OSTop;
					gTeamLeft = gt1OSLeft;
					gTeam = gTeam1;
				}	
			}

			//console.log(parentUl.find("sup").text().indexOf("1"));
			
			if( parentUl.find("sup").text().indexOf("1") >= 0 ){
				teamSup = tSup2;
			}else{
				teamSup = tSup1;	
			}

			if (cloneTeam != ""){
				thisTeam.clone().appendTo(gTeam).css({opacity: 0}).delay(400).stop().animate({opacity: 1});
				teamSup.appendTo(teamParent);
				cloneTeam.animate({
					left: (gTeamLeft - thisOSLeft + 24) + "px",
					top: (gTeamTop - thisOSTop) + "px",
					opacity: 0
				}, 400, function(){
					cloneTeam.remove();
				});	
			}
			
		
	}

	//del按钮显示/隐藏
	function delTeam(){
		var $tm8 = $gradeList.find("div.team8").children("span").length,
				$tmSup = $teams.find("li.dis");
			if ($tm8 >= 1){
				$tmSup.addClass("ddel");
			}else{
				$tmSup.removeClass("ddel");
			}
	}
	

	//点击
	function clickTeam(){
		$("#teams span").click(function(){
			var $this = $(this);

			var ulTeamName = $this.parents("ul").attr("rel");
			var num;
			switch(ulTeamName){
				case "1":
						addTeam($this, $gradeList.find(".teamA"), ulTeamName)
					break;
				case "2":
						addTeam($this, $gradeList.find(".teamB"), ulTeamName)
					break;
				case "3":
						addTeam($this, $gradeList.find(".teamC"), ulTeamName)
					break;
				case "4":
						addTeam($this, $gradeList.find(".teamD"), ulTeamName)
					break;
				case "5":
						addTeam($this, $gradeList.find(".teamE"), ulTeamName)
					break;
				case "6":
						addTeam($this, $gradeList.find(".teamF"), ulTeamName)
					break;
				case "7":
						addTeam($this, $gradeList.find(".teamG"), ulTeamName)
					break;
				case "8":
						addTeam($this, $gradeList.find(".teamH"), ulTeamName)
					break;
				default: alert("default");
			}
		
		});
	}
	throttle(clickTeam);
	
	//进阶
	function toTeam(divparent, divchild){
		var divParent = divparent,
			divChild = divchild;
		

		$(divParent +" > "+ divParent).live("click", function(){
			var $this = $(this),
				$thisSpan = $this.find("span"),
				$thisDiv = $this.parent().parent().children(divParent),
				$toTeam = $this.parents(divChild).find(divChild);
				if ($thisSpan.length){
					if (!$toTeam.find("span").length){
						if ($thisDiv.eq(0).children(divParent).find("span").length && $thisDiv.eq(1).children(divParent).find("span").length){
								$thisSpan.clone().removeClass("del").find("i").hide().end().appendTo($toTeam).css({opacity: 0}).animate({opacity: 1});
								$this.parents(divChild).find(divParent).find("span").addClass("del");

								if (divParent == "div.team2"){
									$("div.btnBet > button").removeAttr("disabled");
								}

							}else{
								alert("请选择对手");
							}
					}
				}
		});
	}

	//8强
	//addTeam2("div.team16", "div.team8");
	$("div.team8 > div.team16").live("click", function(){
		var $this = $(this);
		var $thisDiv = $this.parent().find("div.team16");
		var $thisSpan = $this.find("span");
		var $toTeam = $this.parent().find("div.team8");
		if ($thisSpan.length){
			if (!$toTeam.find("span").length){
				if ($thisDiv.eq(0).find("span").length && $thisDiv.eq(1).find("span").length){
					$thisSpan.clone().removeClass("del").css({"z-index": "19"}).find("i").hide().end().appendTo($toTeam).css({opacity: 0}).animate({opacity: 1});
					$this.parents("div.team8").find(".team16").find("span").addClass("del");
				}else{
					alert("请选择对手");
				}
			}
		}
			
		delTeam();

	});
	//4强
	toTeam("div.team8", "div.team4");

	//2强
	toTeam("div.team4", "div.team2");

	//冠军
	toTeam("div.team2", "div.team1");


	//删除
	$gradeList.find("div.tmFlag em").live("click", function(){
		var $this = $(this),
			$thisText = $this.parent().text(),
			$thisParents = $this.parent().parent();

		if ($thisParents.hasClass("team16")){
			$teams.find("span").each(function(){	
				if ($(this).text() == $thisText){
					$(this).parent().removeClass("dis").find("sup").remove();
				}
			});
		}else if($thisParents.hasClass("team8")){
			$thisParents.siblings().children("span").removeClass("del");
		}else if($thisParents.hasClass("team4")){
			$thisParents.siblings().children("div.team8").children("span").removeClass("del");
		}else if($thisParents.hasClass("team2")){
			$thisParents.siblings().children("div.team4").children("span").removeClass("del");
		}else if($thisParents.hasClass("team1")){
			$thisParents.siblings().children("div.team2").children("span").removeClass("del");
			$("div.btnBet > button").attr("disabled", "disabled");
		}
		
        
		$this.parent().remove();

		delTeam();
	});
	



	//重置
	$("#aReset").click(function(){
		$("#teams li").removeClass("dis").find("span.poa").remove().end().find("sup").remove();
		$("#gradeList span").remove();
		return false;
	});
});