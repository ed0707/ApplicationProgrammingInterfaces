/*********************** 
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
         $(".preloadcontainer").hide();
         $(".preloadcontainer").empty();
         $(".preloadcontainer").remove();
         
         sym.xycompensation = function() {
           var stage = sym.$('Stage');
           var parent = stage.parent();
           var parentWidth = stage.parent().width();
           var stageWidth = stage.width();
           sym.scaleratio = stageWidth.toFixed(0)/parentWidth.toFixed(0); 
           sym.scaleratio.toFixed(0);
           console.log(sym.scaleratio);  
         
           function windowSize() {
         	  var w = window.innerWidth
         	  || document.documentElement.clientWidth
         	  || document.body.clientWidth;
         
         
         	  var h = window.innerHeight
         	  || document.documentElement.clientHeight
         	  || document.body.clientHeight;
         
         	  return {
         			  width : w.toFixed(0),
         			  height: h.toFixed(0)
         		  }
           }
         }
         
         sym.$("body").css("background-color","#000000");
         
         //Code to sharpen elements
         $("style").append(""+
         	"body div, p, img, code{transform-style: unset !important;}");
         
         //bottombar layering when checksolution/excel button added
         $("style").append(""+
         	"div#Stage_bottombar_bottomBarNew{pointer-events: none;}"+
         	"div#Stage_bottombar_bottomBarNew div{pointer-events: all;}");
         
         $("style").append(""+
         	".sharpImage{"+
         		"filter: url(#sharpen);"+
         	"}"+
         	".sharpContent{"+
         		"filter: url(#sharpenContent);"+
         	"}");
         
         $("body").append('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display:none;"> <defs> <filter id="sharpen"> <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 14 -1 -1 -1 -1"/> </filter> </defs> </svg>');
         $("body").append('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display:none;"> <defs> <filter id="sharpenContent"> <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 25 -1 -1 -1 -1"/> </filter> </defs> </svg>');
         
         //class codebox
         /*$("style").append(""+
         	".codeBox1{ "+
         				 "top: 20px; "+
         				 "position: relative; "+
         	"}");
         
         $("style").append(""+
         	".codeBox2{ "+
         				 "top: 0px; "+
         				 "position: relative; "+
         	"}");*/
         
         sym.xycompensation();
         sym.openModule();
         
         //$(window).width() = 640;
         //$(window).height()=480;
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "window", "resize", function(sym, e) {
         sym.xycompensation();
         

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.playcount=1;
         sym.checkyourknowledge = 0;
         sym.deftheme = 0;
         sym.selectedColor = '#006fbf'; // default selected color for highlights 
         sym.activeTopic = 0;
         sym.activeSubtopic = 0;
         // console.log("stage setcoloe:",sym.selectedColor);
         sym.$("outlines").hide();
         sym.getSymbol("Controls").getSymbol("next").play('0');
         sym.setVariable("totalpage",0);
         sym.setVariable("progress",0);
         sym.setVariable("currentpage",0);
         sym.setVariable("pageanimation",0);
         sym.recheck = 0;
         sym.getSymbol("sidebar").getSymbol("progressbar").play(sym.getVariable("progress")*10);
         sym.getSymbol("sidebar").getSymbol("progressbar").stop();
         
         //lastpages represent last pages of each topic/subtopic
         //lastpages should have 1 less than the total number of Topics and subtopics
         sym.setVariable("lastpages",[2,5,10,12,13,14,16,21,23,27,31]);
         
         // Define Pages with Videos
         var pagesWithVideos = [];
         
         // Define Pages with step buttons
         const pagesWithStepButtons = [8,9,10,12,20];
         
         // Define Pages with touchmarker contents
         //const pagesWithTouchmarkers = [9,12,14,16,27];
         
         // Define Pages with Scrollbars
         const pagesWithScrollBars = [];
         
         // Define Pages with Cyk and Excel button
         const pagesWithCYKExcelButtons = [];
         
         // Define Pages with Play Animations
         const pagesWithPlayAnimButtons = [];
         
         // Define Pages with Instructions
         const pagesWithInstructions = [12,14,16,19,25,26,27,30,31];
         
         // Define total number of pages
         var totalPage = 32;
         
         // Define the maximum number of step buttons
         var maxNumStepBtn = 10;
         
         //Functions to set Side Menu colors
         sym.SetSidebarColor = function(Topic,SubTopic)
         { 
         		var x;
         		sym.getComposition().getStage().getSymbol("sidebar").mainhover = Topic;
         		for(x=1;x<=8;x++){
         				if(x==Topic){
         					sym.activeTopic = Topic;
         
         					sym.getComposition().getStage().getSymbol("sidebar").hovercolor = sym.selectedColor;
         					sym.setTopicColor(x,sym.selectedColor);
         				}else
         					sym.setTopicColor(x,"#000000");
         		}
         
         		if(SubTopic==0){
         				sym.getComposition().getStage().getSymbol("sidebar").subhover = 0;
         				for(x=1;x<=4;x++)
         					sym.setSubTopicColor(x,"#000000");	
         		}else{
         				sym.getComposition().getStage().getSymbol("sidebar").subhover = SubTopic;
         
         				for(x=1;x<=4;x++){
         						if(x==SubTopic){
         						sym.activeSubtopic = SubTopic;
         							sym.getComposition().getStage().getSymbol("sidebar").hovercolor = sym.selectedColor;
         							sym.setSubTopicColor(x,sym.selectedColor);
         						}else
         							sym.setSubTopicColor(x,"#000000");	
         					}
         			}
         }
         
         sym.setTopicColor = function(a,color)
         {	
         	sym.getSymbol("sidebar").$("Topic"+a).css('color',color+"");
         }
         
         sym.setSubTopicColor = function(a,color)
         {
         	sym.getSymbol("sidebar").$("SubTopic"+a).css('color',color+"");
         }
         
         sym.next = function()
         {
         	//retrieve variables required for page transition 
         	var myCurrentPage = sym.getComposition().getStage().getVariable("currentpage");
         	var myTotalPage = sym.getComposition().getStage().getVariable("totalpage");
         
         	sym.getComposition().getStage().recheck = 0;
         	sym.getComposition().getStage().$("Controls").hide();
         	sym.getComposition().getStage().$("bottombar").hide();
         	//hide sidebar, but not fully, still able to bring it out with the "menu" button
         	$('#Stage_sidebar').children(':not(#Stage_sidebar_sidemenubar)').css('display', 'none');
         	sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         
         	if(myCurrentPage < myTotalPage)
         	{
         			myCurrentPage+=1; // increment pagenumber
         			sym.getComposition().getStage().getSymbol("content").play(myCurrentPage+"");
         			//play "next page" animatio
         
         		//Show/Hide symbols on some pages
         		if(myCurrentPage>=3 && myCurrentPage!= myTotalPage && myCurrentPage!= myTotalPage-1){
         			sym.getComposition().getStage().$("bottombar").show();
         			$('#Stage_sidebar').children(':not(#Stage_sidebar_sidemenubar)').css('display', 'block');
         			sym.getComposition().getStage().$("Controls").show();
         		} else
         			sym.getComposition().getStage().$("bottombar").hide();
         
         		if(myCurrentPage<10){
         			sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_page").text("0"+myCurrentPage);
         			sym.getSymbol("bottombar").$("#currentPage").text("0"+myCurrentPage);
         		}else{
         			sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_page").text(myCurrentPage+"");
         			sym.getSymbol("bottombar").$("#currentPage").text(""+myCurrentPage);
         		}
         		var myCurrentProgress = ((myCurrentPage/myTotalPage)*100).toFixed(0); // get the progress after page incremented
         		sym.getComposition().getStage().getSymbol("sidebar").getSymbol("progressbar").stop(myCurrentProgress*10);//stop animation at current progress
         		sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_progress").text(myCurrentProgress+"%");
         
         		sym.getComposition().getStage().setVariable("currentpage",myCurrentPage);//set global variables
         		sym.getComposition().getStage().setVariable("progress",myCurrentProgress);//set global variables
         	}
         }
         
         sym.previous = function()
         {	
         	//retrieve variables required for page transition
         	var myCurrentPage = sym.getComposition().getStage().getVariable("currentpage");
         	var myTotalPage = sym.getComposition().getStage().getVariable("totalpage");
         
         	if(myCurrentPage > 1)
         	{
         		myCurrentPage--; // decrement pagenumber
         		sym.getComposition().getStage().$("Controls").hide();
         		sym.getComposition().getStage().$("bottombar").hide();
         		$('#Stage_sidebar').children(':not(#Stage_sidebar_sidemenubar)').css('display', 'none');
         		sym.getComposition().getStage().getSymbol("content").play(myCurrentPage+"");//change page number
         
         		if(myCurrentPage>=3 && myCurrentPage!= myTotalPage && myCurrentPage!= myTotalPage-1){
         			sym.getComposition().getStage().$("bottombar").show();
         			$('#Stage_sidebar').children(':not(#Stage_sidebar_sidemenubar)').css('display', 'block');
         			sym.getComposition().getStage().$("Controls").show();
         		}
         		else
         			sym.getComposition().getStage().$("bottombar").hide();
         
         
         		if(myCurrentPage<10){
         			sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_page").text("0"+myCurrentPage);
         			sym.getSymbol("bottombar").$("#currentPage").text("0"+myCurrentPage);
         		}else{
         			sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_page").text(myCurrentPage+"");
         			sym.getSymbol("bottombar").$("#currentPage").text(""+myCurrentPage);
         		}
         
         		var myCurrentProgress = ((myCurrentPage/myTotalPage)*100).toFixed(0); // get the progress after page incremented
         		sym.getComposition().getStage().getSymbol("sidebar").getSymbol("progressbar").stop(myCurrentProgress*10);//stop animation at current progress
         		//change progress percentage
         		// Change the text in an element
         		sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_progress").text(myCurrentProgress+"%");
         		sym.getComposition().getStage().setVariable("currentpage",myCurrentPage);//set global variables
         		sym.getComposition().getStage().setVariable("progress",myCurrentProgress);//set global variables
         	}
         
         }
         
         sym.JumpTo = function(page)
         {	
         	//retrieve variables required for page transition
         	var myCurrentPage = page;	
         
         	// Set all step active to 0
         	pagesWithStepButtons.forEach(function(page) {
         		 const pageSymbol = sym.getComposition().getStage().getSymbol("content").getSymbol("page"+page+"content");
         		 if (pageSymbol) {
         			  pageSymbol.stepActive = 0;
         		 }
         	});
         
         	sym.getComposition().getStage().$("Controls").hide();
         	sym.getComposition().getStage().$("bottombar").hide();
         	$('#Stage_sidebar').children(':not(#Stage_sidebar_sidemenubar)').css('display', 'none');
         	var myTotalPage = sym.getComposition().getStage().getVariable("totalpage");
         	sym.getComposition().getStage().recheck = 0;
         
         	sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         
         	sym.getComposition().getStage().getSymbol("content").play(myCurrentPage+"");	//change page
         
         	if(myCurrentPage>=3 && myCurrentPage!= myTotalPage && myCurrentPage!= myTotalPage-1){
         		sym.getComposition().getStage().$("bottombar").show();
         		$('#Stage_sidebar').children(':not(#Stage_sidebar_sidemenubar)').css('display', 'block');
         		sym.getComposition().getStage().$("Controls").show();
         	} else {
         		sym.getComposition().getStage().$("bottombar").hide();
         	}
         
         		if(myCurrentPage<10){
         			sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_page").text("0"+myCurrentPage);
         			sym.getSymbol("bottombar").$("#currentPage").text("0"+myCurrentPage);
         		}else{
         			sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_page").text(myCurrentPage+"");
         			sym.getSymbol("bottombar").$("#currentPage").text(myCurrentPage+"");
         
         		}
         
         	var myCurrentProgress = ((myCurrentPage/myTotalPage)*100).toFixed(0); // get the progress after page incremented
         	sym.getComposition().getStage().getSymbol("sidebar").getSymbol("progressbar").stop(myCurrentProgress*10);//stop animation at current progress
         			//change progress percentage
         
         			// Change the text in an element
         	sym.getComposition().getStage().getSymbol("bottombar").$("bottombar_progress").text(myCurrentProgress+"%");
         
         	sym.getComposition().getStage().setVariable("currentpage",myCurrentPage);//set global variables
         	sym.getComposition().getStage().setVariable("progress",myCurrentProgress);//set global variables
         }
         
         
         sym.getParameterByName = function(name, url) {
             if (!url) url = window.location.href;
             var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          	 results = regex.exec(url);
         	 if (!results) return null;
             if (!results[2]) return '';
             return decodeURIComponent(results[2]);
         }
         
         sym.epages = sym.getParameterByName("epages"); 
         if(!sym.epages)
         sym.epages = "00|00";
         
         sym.thepages = sym.epages.split("|");
         sym.cpage = parseInt(sym.thepages[0]);
         sym.tpage = parseInt(sym.thepages[1]);
         
         sym.resumeModule = function(){
         var ssidcpage = sym.cpage
         return(ssidcpage)
         }
         
         sym.openModule = function()
         {
         	var page = sym.cpage;
         	if(!page)
         	{
         		sym.SetDefault(1,totalPage+1);
         		sym.JumpTo(1);
         	}
         	else
         	{
         		sym.SetDefault(page,totalPage+1);
         		sym.JumpTo(0);
         	}
         }
         
         sym.SetDefault = function(c,t)
         {
         	sym.setVariable("currentpage",c);
         	sym.setVariable("totalpage",t);
         	sym.getSymbol("bottombar").$("bottombar_totalpages").html(t+"");	
         	sym.getSymbol("bottombar").$("#currentPage").text(c+"");
         	sym.getSymbol("bottombar").$("#totalPage").text(""+t-1);
         }
         
         // Pause a video track 
         var countVideos = pagesWithVideos.length;
         pagesWithVideos.forEach(function(page) {
         	const pageSymbol = sym.getComposition().getStage().getSymbol("content").getSymbol("page"+page+"content");
         	if (pageSymbol) {
         			for(var i;i<=countVideos;i++){				
         		 		pageSymbol.$("vid"+i)[0].pause();
         			}
         	}
         });
         
         /* ----------------------------THEME Setup------------------------------- */
         
         // Get content symbol
         var contentSymbol = sym.getComposition().getStage().getSymbol("content");
         
         // Gradient colors for bottombar
         var gradient = {
             orange: "linear-gradient(to right, #993300, #CC3300, #FF6600, #FF9900)", 
             blue: "linear-gradient(to right, #002060, #0070C0)",
             magenta: "linear-gradient(to right, #8b008b, #6633CC, #6666CC, #0070C0)",
             red: "linear-gradient(to right, #330000, #990000, #CC0000, #FF0000)",
             green: "linear-gradient(to right,  #004240, #00615f, #007775, #008c89)"
         };
         
         // Gradient colors for buttons, progressbar, etc.
         var gradientBTN = {
             activeGrey:"linear-gradient(to right, #e7e7e7, #e7e7e7)",
             orange: "linear-gradient(to right, #FF6600, #FF6600)", 
             blue: "linear-gradient(to right, #0067b5 , #0067b5)",
             blueprogress: "linear-gradient(to right, #004086 , #004086)",
             magenta: "linear-gradient(to right, #8b008b, #8b008b)",
             red: "linear-gradient(to right, #990000, #990000)",
             green: "linear-gradient(to right, #008991, #008991)"
         };
         
         // Gradient colors for chapters.
         var gradientChapters = {
             orange: "linear-gradient(to right top, #CC3300, #FF6600, #FF9900)", 
             blue: "linear-gradient(to right top, #002060, #0070C0)",
             magenta: "linear-gradient(to right top, #660066, #6633CC, #0070C0)",
             red: "linear-gradient(to right top, #660000, #990000, #CC0000, #FF0000)",
             green: "linear-gradient(to right top,  #003c3a, #006f6d, #00a3a0, #00b2ae)" 
         };
         
         var stepButtonColor = {
             inactive: "#FFFFFF",
             visited:"#CCCCCC",
             orange:{
                 active: "#FF6600",
                 over: "#FF9900"
             },
             blue:{
                 active: "#0067B5",
                 over: "#5CADEE"
             },
             magenta:{
                 active: "#6633CC",
                 over: "#6666CC"
             },
             red:{
                 active: "#990000",
                 over: "#FF0000"
             },
             green:{
                 active: "#00615F",
                 over: "#008C89"
             }
         }
         
         // Get page 1, 2 and assessment symbol
         var page1Intro = contentSymbol.getSymbol("page1contentintro");
         var page2content = contentSymbol.getSymbol("page2content");
         var assessmentSymbol = contentSymbol.getSymbol("assessmentAnimation");
         
         // Get Bottombar element
         //var bottomBar1 = contentSymbol.$("bottomBarBase1");
         var bottomBarPage = sym.getSymbol("bottombar");
         var bottomBarPage1 = page1Intro.$("bottomBarBaseCopy");
         var bottomBarPage2 = page2content.$("bottomBarBase");
         
         // Get progress symbol
         var sidebar = sym.getComposition().getStage().getSymbol("sidebar");
         var progress = sidebar.getSymbol("progressbar");
         
         //Get QA Symbol
         var qaCode = contentSymbol.getSymbol("qa");
         var qaControlSymbol = qaCode.getSymbol("qaControls");
         var bottomBarPage3 = qaControlSymbol.$("bottomBarBase");
         var qnsNumLine = qaCode.$("qnsNum");
         var qnsNumCirc = qaCode.$("Ellipse3");
         var page14Symbol = qaCode.getSymbol("page14");
         
         sym.stepTheme = function(){
             function styleInstructions(page, theme){
                 // Get the content of the specified page
                 var pageContent = contentSymbol.getSymbol("page"+page+"content");
         
             var bgColor = stepButtonColor[theme] || stepButtonColor.default;
         
                 pageContent.$(".instruction").css({
                     "color": bgColor.active
                 });
             }
         // set step button colors
             function updateStepButton(page, theme) {
                 // Get the content of the specified page
                 var pageContent = contentSymbol.getSymbol("page"+page+"content");
         
                 // Create an array to store the visited status of each step button
                 var stepStatus = [];
         
         	    var bgColor = stepButtonColor[theme] || stepButtonColor.default;
         
         	    function setButtonStyles(button, isActive, isVisited, stepIndex) {              
                     var stepBG = pageContent.$('#step'+stepIndex+'_bg_page'+page+'content');
                     var stepBorder = pageContent.$('#step'+stepIndex+'_border_page'+page+'content').children().eq(1);
                     var stepBorder1 = pageContent.$('#step'+stepIndex+'_border1_page'+page+'content').children().eq(1);
                     var stepText = pageContent.$('#step'+stepIndex+'_text_page'+page+'content');  
                     var stepWord = pageContent.$('.Step');  
         
                     stepWord.attr('fill', bgColor.active);
                     if(isActive){
                     	stepBG.attr('fill', bgColor.inactive);
                         stepBorder.attr('fill', bgColor.inactive);
                         stepBorder1.attr('fill', bgColor.inactive);
                         stepText.attr('fill', "#000");
                     }else if(isVisited){
                         stepBG.attr('fill', stepButtonColor.visited);
                         stepBorder.attr('fill', "#999999");
                         stepBorder1.attr('fill', "#999999");
                         stepText.attr('fill', "#000");
                     }else{
                     	stepBG.attr('fill', bgColor.active);
                         stepBorder.attr('fill', bgColor.active);
                         stepBorder1.attr('fill', bgColor.active);
                         stepText.attr('fill', "#fff");
                     }
         	    }
         
         	    function setHoverEvents(button, stepIndex) {
                     var stepBG = pageContent.$('#step'+stepIndex+'_bg_page'+page+'content');
                     var stepBorder = pageContent.$('#step'+stepIndex+'_border_page'+page+'content').children().eq(1);
                     var stepBorder1 = pageContent.$('#step'+stepIndex+'_border1_page'+page+'content').children().eq(1);
                     var stepText = pageContent.$('#step'+stepIndex+'_text_page'+page+'content');
         	        button.hover(function () {  
         	            $(this).css({"cursor":"pointer"});
         
         	            if(stepIndex == 1 && pageContent.stepActive == 0){
         	            	stepBG.attr('fill', bgColor.over);
         	                stepBorder.attr('fill', bgColor.over);
         	                stepBorder1.attr('fill', bgColor.over);
         	                stepText.attr('fill', "#fff");
         	            }else if(pageContent.stepActive === stepIndex || pageContent.stepActive === 0){
         	                stepBG.attr('fill', stepButtonColor.visited);
         	                stepBorder.attr('fill', "#999999");
         	                stepBorder1.attr('fill', "#999999");
         	                stepText.attr('fill', "#000");
         	            }else{
         	            	stepBG.attr('fill', bgColor.over);
         	                stepBorder.attr('fill', bgColor.over);
         	                stepBorder1.attr('fill', bgColor.over);
         	                stepText.attr('fill', "#fff");
         	            }
         
         	        }, function () {
         	            setButtonStyles(button, pageContent.stepActive === stepIndex, stepStatus[stepIndex - 1], stepIndex);
         	        }).click(function () {
                         setButtonStyles(button, false, true, stepIndex);
                         pageContent.play(""+stepIndex);
         	        });
         	    }
         
         	        // replace max number of step buttons in all pages
         	    for (var i = 1; i <= maxNumStepBtn; i++) {
         	        var button = pageContent.$("#step" +i+"_page"+page+"content");
         	        stepStatus.push(pageContent["step" + i + "Visited"]);
         	        setButtonStyles(button, pageContent.stepActive === i, stepStatus[i - 1], i);
         	        setHoverEvents(button, i);
         	    }
         
             }
             // This function set play animation button colors
              function updatePlayAnimation(page, theme) {
                 var playAnimPage = contentSymbol.getSymbol("page"+page+"content");
                 var playBtn = playAnimPage.$("#playBtn_page"+page+"content");
                 var playBtnBg = playAnimPage.$("#bgPlayBtn_page"+page+"content-2").children().eq(0);
                 var playBtnbrdr = playAnimPage.$("#bgPlayBtn_page"+page+"content-2").children().eq(1);
         
                 var btnBgColor = stepButtonColor[theme] || stepButtonColor.default;
         
                 playBtnBg.attr('fill', btnBgColor.over);
                 playBtnbrdr.attr('fill', btnBgColor.over);
                 playAnimPage.$("playAnimButton").css('transform', 'scale(1)');
         
                 playBtn.hover(function(){
                     $(this).css({"cursor":"pointer"});
                     playBtnBg.attr('fill', btnBgColor.active);
                     playBtnbrdr.attr('fill', btnBgColor.active);
                     playAnimPage.$("playAnimButton").css('transform', 'scale(1.1)');
                 },function(){
                     sym.$(this).css({"cursor":"auto"});
                     playBtnBg.attr('fill', btnBgColor.over);
                     playBtnbrdr.attr('fill', btnBgColor.over);
                     playAnimPage.$("playAnimButton").css('transform', 'scale(1)');
                 }).mousedown(function(){
                     playAnimPage.$("playAnimButton").css('transform', 'scale(1)');
                 }).mouseup(function(){
                     playAnimPage.$("playAnimButton").css('transform', 'scale(1.1)');
                 }).click(function(){        
                     playBtnBg.attr('fill', btnBgColor.active);
                     playBtnbrdr.attr('fill', btnBgColor.active);
                     playAnimPage.play("2");
                 });
              }  
         
           /*  // This function set touchmarker colors
          function updateTouchmarker(pageTM, txtGrad) {
             var touchmarkers = contentSymbol.getSymbol("page"+pageTM+"content");
                 touchmarkers.$(".link1").css("color", txtGrad);
          }*/
         
             // This function sets the color of the scroll button. 
             function updateDots(page, showColor) {
             var scrollPage = contentSymbol.getSymbol("page"+page+"content");
             var colors = ["dotsOrange", "dotsBlue", "dotsMagenta", "dotsRed","dotsGreen"];
         
             colors.forEach(function(color) {
                     scrollPage.$(color).toggle(color === showColor);
             });
             }
         
             // This function sets colors to CYK 'Show Answer' button
             function cykShowAnsBtn(pageSymbol, bgGrad){
             var cykPage = contentSymbol.getSymbol("page"+pageSymbol+"content");
                 cykPage.$("show_answer").css("background-image", bgGrad);//.hover(function(){sym.$(this).css({"opacity":"0.8"});},function(){sym.$(this).css({"opacity":"1"});});
                 cykPage.$("t1").css("color", "#fff");
             }
         
             // Render themes
             var stepBtnColor;
             var dotsColor;
             var gradientColor;
             var gradientBtnColor;
             var gradientChptrColor;
             var sideBarColor;
         
             // Assign Colors
             if(sym.themeOrange == 1){
                 stepBtnColor = "orange";
                 dotsColor = "dotsOrange";
                 gradientColor = gradient.orange;
                 gradientBtnColor = gradientBTN.orange;
                 gradientChptrColor = gradientChapters.orange;
                 sideBarColor = '#EF5600';
             }else if(sym.themeBlue == 1){
                 stepBtnColor = "blue";
                 dotsColor = "dotsBlue";
                 gradientColor = gradient.blue;
                 gradientBtnColor = gradientBTN.blue;
                 gradientChptrColor = gradientChapters.blue;
                 sideBarColor = '#0058A3';
             }else if(sym.themeMagenta == 1){
                 stepBtnColor = "magenta";
                 dotsColor = "dotsMagenta";
                 gradientColor = gradient.magenta;
                 gradientBtnColor = gradientBTN.magenta;
                 gradientChptrColor = gradientChapters.magenta;
                 sideBarColor = '#8b008b';
             }else if(sym.themeRed == 1){
                 stepBtnColor = "red";
                 dotsColor = "dotsRed";
                 gradientColor = gradient.red;
                 gradientBtnColor = gradientBTN.red;
                 gradientChptrColor = gradientChapters.red;
                 sideBarColor = '#990000';
             }else if(sym.themeGreen == 1){
                 stepBtnColor = "green";
                 dotsColor = "dotsGreen";
                 gradientColor = gradient.green;
                 gradientBtnColor = gradientBTN.green;
                 gradientChptrColor = gradientChapters.green;
                 sideBarColor = '#008991';
             }
         
             // Step button  
             $.each(pagesWithStepButtons, function(index, btn) {updateStepButton(btn, stepBtnColor);});
         
             // Touchmarkers
             //$.each(pagesWithTouchmarkers, function(index, btn) {updateTouchmarker(btn, gradientBtnColor);});
         
             // Scrollbar dots   
             $.each(pagesWithScrollBars, function(index, btn) {updateDots(btn, dotsColor);});
         
             // CYK or Excel buttons 
             $.each(pagesWithCYKExcelButtons, function(index, btn) {cykShowAnsBtn(btn, gradientBtnColor);});
         
             // Play animation buttons   
             $.each(pagesWithPlayAnimButtons, function(index, btn) {updatePlayAnimation(btn, stepBtnColor);});
         
             // styling instruction 
             $.each(pagesWithInstructions, function(index, btn) {styleInstructions(btn, stepBtnColor);});    
         
             // set color Blue text highlight and active in side bar
             sym.selectedColor = sideBarColor;
             sym.getSymbol("sidebar").$("Topic"+sym.activeTopic).css('color',sideBarColor);
             sym.getSymbol("sidebar").$("SubTopic"+sym.activeSubtopic).css('color',sideBarColor);
             sym.getComposition().getStage().getSymbol("sidebar").hovercolor = sideBarColor;
         
             //Right Background
             contentSymbol.$("rightBG").css({"background-image": gradientChptrColor});
         
             // progress bar
             progress.$("progress").css("background-image", gradientBtnColor);
         
             // Intro button     
             page1Intro.$("btn").css("background-image", gradientBtnColor);
             page2content.$("btn").css("background-image", gradientBtnColor);
             assessmentSymbol.$("btn1").css("background-image", gradientBtnColor);
             assessmentSymbol.$("btn2").css("background-image", gradientBtnColor);
         
             //QA
             qnsNumCirc.css("background-image", gradientBtnColor);
             qnsNumLine.css("background-color", gradientBtnColor);
         
             page14Symbol.$("RoundRect").css("background-image", gradientBtnColor);
             page14Symbol.$("continue").css("color", "#fff");
         
             // Bottombars
             contentSymbol.$("bottomBarBase1").css({"background-image": gradientColor});
             bottomBarPage.$("bottomBarBase").css({"background-image": gradientColor});
             bottomBarPage1.css({"background-image": gradientColor});
             bottomBarPage2.css({"background-image":gradientColor});
             bottomBarPage3.css({"background-image": gradientColor});
         
             //bottomBarBase1
         
             // Glossary
             bottomBarPage.getSymbol("glossary").$("gloBG").css({"background-image":gradientChptrColor});
         
             // help
             bottomBarPage.getSymbol("help").$("helpBG").css({"background-image":gradientChptrColor});
             // Email buttons in Help
             //bottomBarPage.getSymbol("help").$("email").css({"color":"#ffffff !important","background-image":gradientBtnColor});
         
             // Settings
             bottomBarPage.$("glass").css({"background-image":gradientChptrColor});
         }
         
         
         //======== Declaration Client Default Themes =========================//
         //                      New Code 2024                                          //
         //        Please Update in "Bottombar Symbol" line 52 tp 92           //
         //====================================================================//
         
         // Generate a Default theme when load base in Client ID in the URL 
         var modulequeryString = window.location.search;
         var moduleurlParams = new URLSearchParams(modulequeryString);
         var themeParam = moduleurlParams.get('themes');
         
         var firstNumber1= 4;  // Default value
         var secondNumber2= 9;  // Default value
         
         if (themeParam) {
             var parts = themeParam.split(',');
             if (parts.length >= 1) {
                 var temp = parseInt(parts[0], 10);
                 if (!isNaN(temp) && Number.isInteger(temp) && temp > 0) {
                     firstNumber1 = temp;
                 }
             }
             if (parts.length >= 2) {
                 var temp = parseInt(parts[1], 10);
                 if (!isNaN(temp) && Number.isInteger(temp) && temp > 0) {
                     secondNumber2 = temp;
                 }
             }
         }
         
         var secondNumberSwitch = secondNumber2;
         
         if(secondNumberSwitch == 7){
             secondNumber2 = 9;
         }else if(secondNumberSwitch == 9){
             secondNumber2 = 7;
         }
         
         var moduleClientParam = moduleurlParams.get('clientid');
         var moduleClient = parseInt(moduleClientParam,10);
         if (isNaN(moduleClient) || !Number.isInteger(moduleClient) || moduleClient <= 0) {
             moduleClient = 1;
         }
         
         sym.randomNumber = moduleClient;
         sym.firstNumber1 = firstNumber1;
         sym.secondNumber2 = secondNumber2;
         
         
             //====Client Theme BG image ==//=== Tect BG
             contentSymbol.$("bg" + firstNumber1).show();
             contentSymbol.$("bg_cont").css({"background-color": getColor(secondNumber2)});
         
             //=============== Client Id Color Theme=================
             if (sym.randomNumber == 14 || sym.randomNumber == 2 || sym.randomNumber == 6) { // red Theme
                 setThemeColors(0, 0, 0, 1, 0);
         
             } else if (sym.randomNumber == 7 || sym.randomNumber == 10) { // blue green
               setThemeColors(0, 0, 0, 0, 1);
             } else if (sym.randomNumber == 3) { // magenta/violet
               setThemeColors(0, 0, 1, 0, 0);
             } else { // blue
               setThemeColors(0, 1, 0, 0, 0);
             }
             sym.stepTheme();
         
         
         //======== End Declaration Client Default Themes =====================//
         //                      End New Code 2024                                            //
         //        Please Update in "Bottombar Symbol" line 52 tp 92           //
         //====================================================================//
         
         
         function setThemeColors(orange, blue, magenta, red, green) {
           sym.themeOrange = orange;
           sym.themeBlue = blue;
           sym.themeMagenta = magenta;
           sym.themeRed = red;
           sym.themeGreen = green;
         
           sym.stepTheme();
           //contentSymbol.$("bg4").show(); // ====================Please Remove this=================
         }
         
         // Define an object to store the click handlers
         var clickHandlers = {};
         
         // Define a function to show/hide elements and background images
         function showHideElements(bx, c, bg) {
           bottomBarPage.$("c" + bx).show();
           bottomBarPage.$("bxbor" + bx).show();
           contentSymbol.$("bg" + bx).show();
         
           $(this).find(".circ").hide();
           $(this).find(".bxborhover").hide();
         
           for (var i = 1; i <= 6; i++) {
             if (i!== bx) {
               bottomBarPage.$("c" + i).hide();
               bottomBarPage.$("bxbor" + i).hide();
               contentSymbol.$("bg" + i).hide();
             }
           }
         }
         
         // Define click handlers for bx1-bx6
         for (var i = 1; i <= 6; i++) {
           clickHandlers["bx" + i] = function(bx) {
             return function() {
               showHideElements(bx, "c", "bg");
             };
           }(i);
           bottomBarPage.$("bx" + i).click(clickHandlers["bx" + i]);
         }
         
         // Define click handlers for bx7-bx9
         for (var i = 7; i <= 10; i++) {
           clickHandlers["bx" + i] = function(bx) {
             return function() {
               bottomBarPage.$("c" + bx).show();
               bottomBarPage.$("bxbor" + bx).show();
               $(this).find(".circ").hide();
                     $(this).find(".bxborhover").hide();
         
                     for (var j = 7; j <= 10; j++) {
                 if (j!== bx) {
                   bottomBarPage.$("c" + j).hide();
                   bottomBarPage.$("bxbor" + j).hide();
                 }
               }
               contentSymbol.$("bg_cont").css({"background-color": getColor(bx)});
             };
           }(i);
           bottomBarPage.$("bx" + i).click(clickHandlers["bx" + i]);
         }
         
         
         
         // for setting hover effect
         for (var i = 1; i <= 15; i++) {
             bottomBarPage.$("bx" + i).hover(
               function() {
                 // Show the circ and bxborhover elements
                         if (!$(this).find(".ck").is(":visible")) {
                             $(this).find(".circ").show();
                             $(this).find(".bxborhover").show();
                         }
               },
               function() {
                 // Hide the circ and bxborhover elements
                         $(this).find(".circ").hide();
                         $(this).find(".bxborhover").hide();
               }
             ).click(
               function() {
                 // Hide the circ and bxborhover elements
                         $(this).find(".circ").hide();
                         $(this).find(".bxborhover").hide();
                         sym.deftheme = 1; // default theme change
                         sym.getComposition().getStage().getSymbol("sidebar").hovercolor = sym.selectedColor; // set color text highlighted in sidebar
               }
             );
         }
         
         // Define a function to get the background color for bx7-bx9
         function getColor(bx) {
           const colors = {
             7: "#E7E7E7",
             8: "#DEEBF7",
             9: "#D9FFDA",
             10: "#FFFFFF"
           };
         
           return colors[bx] || "";
         }
         
         
         // Define click handlers for bx10-bx14
         for (var i = 11; i <= 15; i++) {
           clickHandlers["bx" + i] = function(bx) {
             return function() {
               bottomBarPage.$("c" + bx).show();
               bottomBarPage.$("bxbor" + bx).show();
               for (var j = 11; j <= 15; j++) {
                 if (j!== bx) {
                   bottomBarPage.$("c" + j).hide();
                   bottomBarPage.$("bxbor" + j).hide();
                 }
               }
               setTheme(bx);
               sym.stepTheme();
             };
           }(i);
           bottomBarPage.$("bx" + i).click(clickHandlers["bx" + i]);
         }
         
         // Define a function to set the theme for bx10-bx14
         function setTheme(bx) {
           var themes = ['themeOrange', 'themeBlue', 'themeMagenta', 'themeRed', 'themeGreen'];
             $.each(themes, function(index, theme) {
                 sym[theme] = (bx === index + 11) ? 1 : 0;
             });
         }
         
         
         //Arrow Key Event
         document.onkeydown = function(e) {
           e = e || window.event;
           var pagecur = sym.getComposition().getStage().getVariable("currentpage");
             var QAcurpage = sym.getComposition().getStage().getSymbol("content").getSymbol("qa").getVariable("currentpage");
         
           if(pagecur >= 3 && pagecur != totalPage && QAcurpage == 0){
                     if (e.keyCode === 37) { // arrow left
                         if(sym.getComposition().getStage().checkyourknowledge == 0){
         							if(pagecur==20){
         								sym.getComposition().getStage().JumpTo(19);
         							}else if(pagecur==21){
         								sym.getComposition().getStage().JumpTo(19);
         							}else if(pagecur==22){
         								sym.getComposition().getStage().JumpTo(19);
         							}else{
         								sym.getComposition().getStage().previous();
         							}
                         }else{
                             sym.getComposition().getStage().getSymbol("content").getSymbol("page"+pagecur+"content").resetpage();
         						  sym.getComposition().getStage().getSymbol("content").getSymbol("page"+pagecur+"content").stepActive = 0;
         					 }
                     } else if (e.keyCode === 39) { // arrow right
                         sym.getComposition().getStage().checkyourknowledge = 0;	
                         if(pagecur==19){
         							sym.getComposition().getStage().JumpTo(22);
                         }else if(pagecur==20){
         							sym.getComposition().getStage().JumpTo(19);
                         }else if(pagecur==21){
         							sym.getComposition().getStage().JumpTo(19);
                         }else{
         							sym.getComposition().getStage().next();
         							sym.getComposition().getStage().getSymbol("content").getSymbol("page"+pagecur+"content").stepActive = 0;	
                         }
         
         
                     }
           }else if(pagecur == 'qa' && QAcurpage != 0){
                     if(QAcurpage >= 4 && QAcurpage <=13){
                         if (e.keyCode === 37) { // arrow left
                             sym.getComposition().getStage().getSymbol("content").getSymbol("qa").previous();
                         } else if (e.keyCode === 39) { // arrow right
                             sym.getComposition().getStage().getSymbol("content").getSymbol("qa").next();
                         }
                     }
             }
         };
         
         //Disable scrolling
         document.addEventListener('wheel', function(event){
             if(event.ctrlKey) {
                 event.preventDefault();
             }
         }, { passive: false });
         
         document.addEventListener('keydown', function(event){
             if(event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
                 event.preventDefault();
             }
         });

      });
      //Edge binding end

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 8750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 50, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 226, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('3');
         sym.stop();
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 347, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 546, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.getSymbol("page0content").play("1");

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         //sym.page3_btn = 0;
         sym.$("outlines").hide();
         sym.$("bg0").hide();
         sym.$("bg1").hide();
         sym.$("bg2").hide();
         sym.$("bg3").hide();
         sym.$("bg4").hide();
         sym.$("bg5").hide();
         sym.$("bg6").hide();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 138, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('3');
         sym.getSymbol("page1contentintro").play('1');
         sym.getComposition().getStage().SetSidebarColor(0,0);
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 300, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page2content").play('1');
         sym.getComposition().getStage().SetSidebarColor(1,0);
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page4content").play('1');
         sym.getComposition().getStage().SetSidebarColor(2,0);
         

      });
      //Edge binding end

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3437, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3346, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("assessmentAnimation").play('1');
         sym.getComposition().getStage().SetSidebarColor(8,0);

      });
      //Edge binding end

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3960, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3848, function(sym, e) {
         //qa not opened yet, start from beginning
         if(parent.isqa!="qaOpened"){
         	sym.getSymbol("qa").openQA();
         }
         
         

      });
      //Edge binding end

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 612, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 588, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page5content").play('1');
         sym.getComposition().getStage().SetSidebarColor(3,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 757, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 681, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page7content").play('1');
         sym.getComposition().getStage().SetSidebarColor(3,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 831, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 773, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page8content").play('1');
         sym.getComposition().getStage().SetSidebarColor(3,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 919, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 854, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page9content").play('1');
         sym.getComposition().getStage().SetSidebarColor(3,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1002, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 942, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page10content").play('1');
         sym.getComposition().getStage().SetSidebarColor(3,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1119, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1031, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page11content").play('1');
         sym.getComposition().getStage().SetSidebarColor(4,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1157, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page12content").play('1');
         sym.getComposition().getStage().SetSidebarColor(4,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1384, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1286, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page13content").play('1');
         sym.getComposition().getStage().SetSidebarColor(5,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1508, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1410, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page14content").play('1');
         sym.getComposition().getStage().SetSidebarColor(5,1);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1628, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1532, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page15content").play('1');
         sym.getComposition().getStage().SetSidebarColor(5,2);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1749, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1661, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page16content").play('1');
         sym.getComposition().getStage().SetSidebarColor(5,2);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1868, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1780, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page17content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1967, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1892, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page18content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2075, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1991, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page19content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2184, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2104, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page20content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2282, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2208, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page21content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2366, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2303, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page22content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,3);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2466, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2389, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page23content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,3);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2563, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2492, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page24content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,4);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2665, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2589, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page25content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,4);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2768, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2689, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page26content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,4);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2875, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2796, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page27content").play('1');
         sym.getComposition().getStage().SetSidebarColor(6,4);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2984, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2897, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page28content").play('1');
         sym.getComposition().getStage().SetSidebarColor(7,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3090, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3014, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page29content").play('1');
         sym.getComposition().getStage().SetSidebarColor(7,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3185, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3109, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page30content").play('1');
         sym.getComposition().getStage().SetSidebarColor(7,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3286, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3211, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page31content").play('1');
         sym.getComposition().getStage().SetSidebarColor(7,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 459, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 372, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page3content").play('1');
         sym.getComposition().getStage().SetSidebarColor(2,0);
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 659, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 629, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         sym.getSymbol("page6content").play('1');
         sym.getComposition().getStage().SetSidebarColor(3,0);
         

      });
      //Edge binding end

   })("content");
   //Edge symbol end:'content'

   //=========================================================

   //=========================================================
   
   //Edge symbol: 'Controls'
   (function(symbolName) {   
   
      

      

   })("Controls");
   //Edge symbol end:'Controls'

   //=========================================================
   
   //Edge symbol: 'help'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_help}", "mouseover", function(sym, e) {
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_help}", "mouseout", function(sym, e) {
         sym.play('up');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 99, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 298, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_help}", "mouseup", function(sym, e) {
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_help}", "mousedown", function(sym, e) {
         sym.play('click');

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.play('up');
         

      });
      //Edge binding end

   })("help");
   //Edge symbol end:'help'

   //=========================================================
   
   //Edge symbol: 'next'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1137, function(sym, e) {
         
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "click", function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         sym.getComposition().getStage().checkyourknowledge = 0
         sym.getComposition().getStage().next();
         
         /*var x = sym.getComposition().getStage().getVariable("currentpage");
         sym.getComposition().getStage().checkyourknowledge = 0
         if(x==37)
         sym.getComposition().getStage().JumpTo(42);
         else
         sym.getComposition().getStage().next();*/

      });
      //Edge binding end

      

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseover", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('over');
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseout", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play(sym.myup);
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1438, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1349, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mousedown", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('click');
         }
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseup", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('over');
         }
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1069, function(sym, e) {
         sym.myup="2";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.myup="0";

      });
      //Edge binding end

   })("next");
   //Edge symbol end:'next'

   //=========================================================
   
   //Edge symbol: 'previous'
   (function(symbolName) {   
   
      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1114, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "click", function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage")
         if(sym.getComposition().getStage().checkyourknowledge == 0)
         	sym.getComposition().getStage().previous();
         else
         	sym.getComposition().getStage().getSymbol("content").getSymbol("page"+x+"content").resetpage();
         /*var x = sym.getComposition().getStage().getVariable("currentpage")
         
         if(x == 13 || x == 18 || x == 24)
         sym.getComposition().getStage().JumpTo(x-1);
         
         if(x == 38 || x == 39 || x == 40 || x == 41 || x == 42)
         sym.getComposition().getStage().JumpTo(38);
         
         if(sym.getComposition().getStage().checkyourknowledge == 0)
         sym.getComposition().getStage().previous();
         else
         sym.getComposition().getStage().getSymbol("content").getSymbol("page"+x+"content").resetpage();*/
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mouseover", function(sym, e) {
         if(sym.getPosition() < 1396){
         	sym.play('over');
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mouseout", function(sym, e) {
         if(sym.getPosition() < 1396){
         	sym.play(sym.myup);
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1449, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1353, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mousedown", function(sym, e) {
         if(sym.getPosition() < 1396){
         	sym.play('click');
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mouseup", function(sym, e) {
         if(sym.getPosition() < 1396){
         	sym.play('over');
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.myup="0";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1069, function(sym, e) {
         sym.myup="2";

      });
      //Edge binding end

   })("previous");
   //Edge symbol end:'previous'

   //=========================================================
   
   //Edge symbol: 'mail'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_mail}", "mouseover", function(sym, e) {
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_mail}", "mouseout", function(sym, e) {
         sym.play('up');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 29, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 133, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 234, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_mail}", "mousedown", function(sym, e) {
         sym.play('click');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_mail}", "mouseup", function(sym, e) {
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.play('up');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 408, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("mail");
   //Edge symbol end:'mail'

   //=========================================================
   
   //Edge symbol: 'close'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_close}", "mouseover", function(sym, e) {
         sym.play("over");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_close}", "mouseout", function(sym, e) {
         sym.play("up");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_close}", "click", function(sym, e) {
         window.close();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 103, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 301, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_close}", "mouseup", function(sym, e) {
         sym.play("over");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_close}", "mousedown", function(sym, e) {
         sym.play("click");

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.play('up');
         

      });
      //Edge binding end

   })("close");
   //Edge symbol end:'close'

   //=========================================================

   //=========================================================
   
   //Edge symbol: 'bottombar'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("glass").css("box-shadow","rgba(0, 0, 0, 0.2) 10px 15px 15px 0px");
         
         sym.iconActive1 = false;
         sym.iconActive2 = false;
         sym.iconActive3 = false;
         sym.iconActive4 = false;
         sym.iconActive5 = false;
         
         sym.$("settingBtn").append('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"> <g id="settings" transform="translate(5488 -7341)"> <path id="gear" d="M6.328,0a.469.469,0,0,0-.465.417L5.7,1.889a5.9,5.9,0,0,0-.888.368L3.65,1.335a.469.469,0,0,0-.624.035L1.368,3.025a.469.469,0,0,0-.035.622L2.257,4.81A5.924,5.924,0,0,0,1.89,5.7L.415,5.861A.469.469,0,0,0,0,6.33V8.672a.469.469,0,0,0,.415.467L1.887,9.3a5.975,5.975,0,0,0,.37.888L1.333,11.35a.469.469,0,0,0,.035.624l1.657,1.657a.469.469,0,0,0,.624.033l1.159-.922a5.921,5.921,0,0,0,.888.367l.167,1.472A.469.469,0,0,0,6.328,15H8.672a.469.469,0,0,0,.465-.415L9.3,13.113a5.966,5.966,0,0,0,.888-.368l1.159.923a.469.469,0,0,0,.624-.035l1.657-1.658a.469.469,0,0,0,.035-.624l-.924-1.159A5.962,5.962,0,0,0,13.11,9.3l1.475-.165A.469.469,0,0,0,15,8.672V6.33a.469.469,0,0,0-.415-.467L13.113,5.7a5.923,5.923,0,0,0-.37-.888l.924-1.161a.469.469,0,0,0-.035-.622L11.975,1.369a.469.469,0,0,0-.624-.035l-1.159.922A5.916,5.916,0,0,0,9.3,1.889L9.137.418A.469.469,0,0,0,8.672,0Zm.417.938H8.253L8.4,2.265a.469.469,0,0,0,.348.4,4.962,4.962,0,0,1,1.282.531.469.469,0,0,0,.532-.037l1.043-.832,1.066,1.064-.832,1.045a.469.469,0,0,0-.038.53,5.013,5.013,0,0,1,.532,1.283.469.469,0,0,0,.4.347l1.326.15V8.255l-1.326.15a.469.469,0,0,0-.4.347,5.02,5.02,0,0,1-.532,1.283.469.469,0,0,0,.038.53l.832,1.045-1.066,1.064-1.043-.832a.469.469,0,0,0-.532-.038,5,5,0,0,1-1.282.534.469.469,0,0,0-.348.4l-.15,1.324H6.747L6.6,12.737a.469.469,0,0,0-.348-.4A5,5,0,0,1,4.968,11.8a.469.469,0,0,0-.532.037l-1.043.832L2.327,11.609l.832-1.045a.469.469,0,0,0,.038-.53,5,5,0,0,1-.532-1.282.469.469,0,0,0-.4-.348L.937,8.255V6.747L2.263,6.6a.469.469,0,0,0,.4-.348A5,5,0,0,1,3.2,4.968a.469.469,0,0,0-.037-.53L2.326,3.394,3.394,2.329l1.043.832a.469.469,0,0,0,.532.037A5,5,0,0,1,6.25,2.663a.469.469,0,0,0,.348-.4ZM7.5,3.75A3.75,3.75,0,1,0,11.25,7.5,3.757,3.757,0,0,0,7.5,3.75Zm0,.938A2.813,2.813,0,1,1,4.687,7.5,2.805,2.805,0,0,1,7.5,4.688Z" transform="translate(-5488 7341)" fill="#fff"/> </g> </svg>');
         sym.$("glossaryBtn").append('<svg xmlns="http://www.w3.org/2000/svg" width="15.65" height="15.65" viewBox="0 0 15.65 15.65"> <g id="glossary" transform="translate(5458.325 -7342.675)"> <path id="glo" d="M8.214,8.728h.3a.155.155,0,0,0,.155-.155.163.163,0,0,0-.015-.067h0L5.489,1.786a.156.156,0,0,0-.14-.089H5.021a.157.157,0,0,0-.14.088h0L1.715,8.506a.152.152,0,0,0-.015.066.155.155,0,0,0,.155.155h.3a.156.156,0,0,0,.14-.088h0l.756-1.61H7.309l.766,1.611a.155.155,0,0,0,.14.088h0ZM3.322,6.44,5.184,2.5,7.036,6.44ZM9.9,8.728h3.3c.035,0,.076,0,.118,0a2.119,2.119,0,0,0,1.42-.543l0,0a1.78,1.78,0,0,0,.564-1.3c0-.012,0-.024,0-.036V6.834a1.855,1.855,0,0,0-1.145-1.713l-.012,0a1.749,1.749,0,0,0,.515-.493l0-.006a1.869,1.869,0,0,0,.331-1.067v-.02h0v-.02a1.735,1.735,0,0,0-.563-1.281h0a2.136,2.136,0,0,0-1.418-.536c-.041,0-.082,0-.123,0H9.9a.155.155,0,0,0-.155.155h0v6.72h0a.155.155,0,0,0,.155.155h0Zm4.4-2.861a1.357,1.357,0,0,1,.395.958v.021h0c0,.008,0,.018,0,.027a1.214,1.214,0,0,1-.385.889h0a1.541,1.541,0,0,1-1.019.382c-.037,0-.073,0-.109,0H10.338V5.454H13.2c.028,0,.06,0,.093,0a1.433,1.433,0,0,1,1.011.416h0Zm-1.114-1H10.338V2.286h2.548c.03,0,.066,0,.1,0a1.588,1.588,0,0,1,1.023.371l0,0a1.158,1.158,0,0,1,.387.865c0,.009,0,.017,0,.026h0v.022a1.374,1.374,0,0,1-.343.911l0,0a1.068,1.068,0,0,1-.827.393h-.032Zm3.38,4.454a.39.39,0,0,0-.548.024h0l-5.87,6.4L8.393,14a.389.389,0,1,0-.548.552h0l2.048,2.029.008,0,0,.007a.379.379,0,0,0,.523-.006h0s.011,0,.016-.007l0-.007.007-.005,6.143-6.7a.387.387,0,0,0-.024-.547h0Z" transform="translate(-5459.7 7341.305)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="0.65"/> </g> </svg>');
         sym.$("helpBtn").append('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"> <g id="help" transform="translate(5428 -7342)"> <path id="info" d="M7.5,0A7.5,7.5,0,1,1,0,7.5,7.5,7.5,0,0,1,7.5,0Zm0,.789A6.711,6.711,0,1,0,14.211,7.5,6.711,6.711,0,0,0,7.5.789Zm-.329,4.9a4.753,4.753,0,0,0-1.8,1.624c-.081.111-.084.179,0,.239.058.042.092.029.177-.062l.023-.025c.073-.079.132-.147.259-.293A3.469,3.469,0,0,1,6.771,6.3c.274-.158.515.074.469.371a1.047,1.047,0,0,1-.092.277c-.023.053-.032.075-.043.1-.1.271-.19.5-.371.968l-.009.023-.11.285c-.238.618-.382,1-.531,1.4l-.009.024L6,9.966a8.714,8.714,0,0,0-.342,1.083l-.023.1a3.334,3.334,0,0,0-.077.417.985.985,0,0,0,.061.519.539.539,0,0,0,.413.3,2.338,2.338,0,0,0,.84-.016,3.185,3.185,0,0,0,.414-.125,3.993,3.993,0,0,0,1.139-.684,6.532,6.532,0,0,0,.944-1l.055-.07a.715.715,0,0,0,.161-.287c.019-.091-.058-.184-.12-.153a.381.381,0,0,0-.111.108c-.035.045-.054.069-.073.09-.076.086-.155.173-.242.266-.143.152-.287.3-.5.514a1.445,1.445,0,0,1-.386.274.273.273,0,0,1-.415-.286,2.131,2.131,0,0,1,.119-.514c.134-.37.244-.669.486-1.328l.207-.564c.168-.458.3-.827.43-1.183a4.974,4.974,0,0,0,.288-1.106.81.81,0,0,0-.2-.667.984.984,0,0,0-.753-.268,2.918,2.918,0,0,0-1.14.3ZM9.581,2.652A1.159,1.159,0,0,0,8.062,3.5a.939.939,0,0,0,.459,1.08,1.144,1.144,0,0,0,1.614-1.022.883.883,0,0,0-.555-.9Z" transform="translate(-5428 7342)" fill="#fff" fill-rule="evenodd"/> </g> </svg>');
         sym.$("homeBtn").append('<svg xmlns="http://www.w3.org/2000/svg" width="16.41" height="16" viewBox="0 0 16.41 16"> <g id="home" transform="translate(-30.295 27.5)"> <path id="wall" d="M16,9v8.25a1.5,1.5,0,0,1-1.5,1.5h-9A1.5,1.5,0,0,1,4,17.25V9" transform="translate(28.5 -30.75)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/> <path id="roof" d="M7.25,17V9.5h4.5V17M2,8.45,9.5,2,17,8.45" transform="translate(29 -29)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/> </g> </svg>');
         sym.$("menuBtn").append('<svg xmlns="http://www.w3.org/2000/svg" width="16.667" height="15" viewBox="0 0 16.667 15"> <g id="menu" transform="translate(-1 -3)"> <path id="line2" d="M1,12a.9.9,0,0,1,.758-1H16.909a.9.9,0,0,1,.758,1,.9.9,0,0,1-.758,1H1.758A.9.9,0,0,1,1,12Z" transform="translate(0 -1.5)" fill="#fff"/> <path id="line1" d="M1,4a.9.9,0,0,1,.758-1H16.909a.9.9,0,0,1,.758,1,.9.9,0,0,1-.758,1H1.758A.9.9,0,0,1,1,4Z" fill="#fff"/> <path id="line3" d="M1,20a.9.9,0,0,1,.758-1H16.909a.9.9,0,0,1,.758,1,.9.9,0,0,1-.758,1H1.758A.9.9,0,0,1,1,20Z" transform="translate(0 -3)" fill="#fff"/> </g> </svg>');
         
         sym.$("hitMark1").hover(function(){
             sym.$(this).css({"cursor":"pointer","opacity":"1"});
         },function(){
             if(sym.iconActive1){
                 sym.$(this).css({"opacity":"1"});
             }else{
                 sym.$(this).css({"opacity":"0"});
             }
         }).click(function(){
             //Hide the  menu sidebar if its open
             var menustat = sym.getComposition().getStage().getSymbol('sidebar').getVariable("menuButtonPressed"); // get the menu bar status
             if(menustat == true){
                 sym.getComposition().getStage().getSymbol('sidebar').setVariable("menuButtonPressed",false);
                 sym.getComposition().getStage().getSymbol("sidebar").playReverse('1'); // hide the side bar
             }
         
             sym.iconActive2 = false;
             sym.iconActive3 = false;
             sym.iconActive4 = false;
             sym.iconActive5 = false;
         
             sym.$("hitMark2").css({"opacity":"0"});
             sym.$("hitMark3").css({"opacity":"0"});
             sym.$("hitMark4").css({"opacity":"0"});
             sym.$("hitMark5").css({"opacity":"0"});
         
             //glossary is showing, hide it
             if(sym.$('Select_BG').css('display') == "block"){
                 sym.$('Select_BG').hide();
                 sym.iconActive1 = false;
             }else{
                 sym.iconActive1 = true;
                 sym.$('Select_BG').show();  //show Settings
                 sym.$('glossary').hide(); // hide glossary
                 sym.$('help').hide(); // hide help
         
         
         //================= Set Default Active Themes =================//
         //                           New code 2024                  ===============//
         // ============================================================//
                 if(sym.getComposition().getStage().deftheme == 0){ // set default Themes by Client ID
         
                 // Get the first and last numbers
                      var firstNumber = sym.getComposition().getStage().firstNumber1;
                      var secondNumber = sym.getComposition().getStage().secondNumber2;
         
                     //Client Theme BG image // Tect BG
                     sym.getComposition().getStage().getSymbol("bottombar").$("c"+firstNumber).show();
                     sym.getComposition().getStage().getSymbol("bottombar").$("bxbor"+firstNumber).show();
                     sym.getComposition().getStage().getSymbol("bottombar").$("c"+secondNumber).show();
                     sym.getComposition().getStage().getSymbol("bottombar").$("bxbor"+secondNumber).show();
         
                     if(sym.getComposition().getStage().randomNumber == 14 || sym.getComposition().getStage().randomNumber == 2 || sym.getComposition().getStage().randomNumber == 6){
                         sym.getComposition().getStage().getSymbol("bottombar").$("c14").show();
                         sym.getComposition().getStage().getSymbol("bottombar").$("bxbor14").show();
         
                     }else if(sym.getComposition().getStage().randomNumber == 7 || sym.getComposition().getStage().randomNumber == 10){
                         sym.getComposition().getStage().getSymbol("bottombar").$("c15").show();
                         sym.getComposition().getStage().getSymbol("bottombar").$("bxbor15").show();
                     }else if(sym.getComposition().getStage().randomNumber == 3){
                         sym.getComposition().getStage().getSymbol("bottombar").$("c13").show();
                         sym.getComposition().getStage().getSymbol("bottombar").$("bxbor13").show();
                     }else{
                         sym.getComposition().getStage().getSymbol("bottombar").$("c12").show();
                         sym.getComposition().getStage().getSymbol("bottombar").$("bxbor12").show();
                     }
                 }
         //================= End Set Default Active Themes =================//
         //                           New code 2024                  ===============//
         // ============================================================//
         
             }
         });
         
         
         sym.$("hitMark2").hover(function(){
             sym.$(this).css({"cursor":"pointer","opacity":"1"});
         },function(){
             if(sym.iconActive2){
                 sym.$(this).css({"opacity":"1"});
             }else{
                 sym.$(this).css({"opacity":"0"});
             }
         }).click(function(){
             //Hide the  menu sidebar if its open
             var menustat = sym.getComposition().getStage().getSymbol('sidebar').getVariable("menuButtonPressed"); // get the menu bar status
                 if(menustat == true){
                     sym.getComposition().getStage().getSymbol('sidebar').setVariable("menuButtonPressed",false);
                     sym.getComposition().getStage().getSymbol("sidebar").playReverse('1'); // hide the side bar
                 }
         
             sym.iconActive1 = false;
             sym.iconActive3 = false;
             sym.iconActive4 = false;
             sym.iconActive5 = false;
         
             sym.$("hitMark1").css({"opacity":"0"});
             sym.$("hitMark3").css({"opacity":"0"});
             sym.$("hitMark4").css({"opacity":"0"});
             sym.$("hitMark5").css({"opacity":"0"});
         
                 //glossary is showing, hide it
                 if(sym.$('glossary').css('display') == "block"){
                     sym.$('glossary').hide();
                     sym.iconActive2 = false;
                 }else{
                     sym.iconActive2 = true;
                     sym.$('glossary').show();   
                     sym.$('help').hide(); // hide help
                     sym.$('Select_BG').hide(); // hide settings
                 }
         });
         
         
         sym.$("hitMark3").hover(function(){
             sym.$(this).css({"cursor":"pointer","opacity":"1"});
         },function(){
             if(sym.iconActive3){
                 sym.$(this).css({"opacity":"1"});
             }else{
                 sym.$(this).css({"opacity":"0"});
             }
         }).click(function(){
             //Hide the  menu sidebar if its open
             var menustat = sym.getComposition().getStage().getSymbol('sidebar').getVariable("menuButtonPressed"); // get the menu bar status
                 if(menustat == true){
                     sym.getComposition().getStage().getSymbol('sidebar').setVariable("menuButtonPressed",false);
                     sym.getComposition().getStage().getSymbol("sidebar").playReverse('1'); // hide the side bar
                 }
         
             sym.iconActive1 = false;
             sym.iconActive2 = false;
             sym.iconActive4 = false;
             sym.iconActive5 = false;
         
             sym.$("hitMark1").css({"opacity":"0"});
             sym.$("hitMark2").css({"opacity":"0"});
             sym.$("hitMark4").css({"opacity":"0"});
             sym.$("hitMark5").css({"opacity":"0"});
         
             if(sym.$('help').css('display') == "block"){
                 sym.$('help').hide();
                     sym.iconActive3 = false;
             }else{
                     sym.iconActive3 = true;
                 sym.$('help').show();
                 sym.$('Select_BG').hide(); // hide settings 
                 sym.$('glossary').hide(); // hide glossary
         
                 // reset to default info in Help
                 sym.getSymbol('help').$("email").show();
                 sym.getSymbol('help').$("HsetBG").css({"opacity":"0"});
                 sym.getSymbol('help').$("HgalBG").css({"opacity":"0"});
                 sym.getSymbol('help').$("HhomeBG").css({"opacity":"0"});
                 sym.getSymbol('help').$("HmenuBG").css({"opacity":"0"});
                 sym.getSymbol('help').$("HtotBG").css({"opacity":"0.2"});
                 sym.getSymbol('help').$("_explain").html(""+
                     "<div style='margin-bottom: 10px; font-weight:bold'>Tutor</div>"+ 
                     "<div>Need help with the course? Our e-tutor is ready to assist! Click below to email tutor@fitforbanking.com and get support for any module queries.</div>");
             }
         });
         
         
         sym.$("hitMark4").hover(function(){
             sym.$(this).css({"cursor":"pointer","opacity":"1"});
         },function(){
             if(sym.iconActive4){
                 sym.$(this).css({"opacity":"1"});
             }else{
                 sym.$(this).css({"opacity":"0"});
             }
         }).click(function(){
             //Hide the  menu sidebar if its open
             var menustat = sym.getComposition().getStage().getSymbol('sidebar').getVariable("menuButtonPressed"); // get the menu bar status
                 if(menustat == true){
                     sym.getComposition().getStage().getSymbol('sidebar').setVariable("menuButtonPressed",false);
                     sym.getComposition().getStage().getSymbol("sidebar").playReverse('1'); // hide the side bar
                 }
         
             sym.iconActive1 = false;
             sym.iconActive2 = false;
             sym.iconActive3 = false;
             sym.iconActive4 = false;
             sym.iconActive5 = false;
         
             sym.$("hitMark1").css({"opacity":"0"});
             sym.$("hitMark2").css({"opacity":"0"});
             sym.$("hitMark3").css({"opacity":"0"});
             sym.$("hitMark4").css({"opacity":"0"});
             sym.$("hitMark5").css({"opacity":"0"});
         
             //Jump to Page 2
             sym.getComposition().getStage().JumpTo(2);
         });
         
         
         sym.$("hitMark5").hover(function(){
             sym.$(this).css({"cursor":"pointer","opacity":"1"});
         },function(){
             if(sym.iconActive5){
                 sym.$(this).css({"opacity":"1"});
             }else{
                 sym.$(this).css({"opacity":"0"});
             }
         }).click(function(){
             sym.iconActive1 = false;
             sym.iconActive2 = false;
             sym.iconActive3 = false;
             sym.iconActive4 = false;
         
             sym.$("hitMark1").css({"opacity":"0"});
             sym.$("hitMark2").css({"opacity":"0"});
             sym.$("hitMark3").css({"opacity":"0"});
             sym.$("hitMark4").css({"opacity":"0"});
         
             //Menu Slide 
             if(sym.getComposition().getStage().getSymbol('sidebar').getVariable("menu") == "closed"){
                 //sym.iconActive5 = true;
                 //sym.$("hitMark5").css({"opacity":"1"});
                 //show Menu
                 var x = sym.getComposition().getStage().getSymbol('sidebar').getVariable("lock");
                 if(x==0){
                     sym.getComposition().getStage().getSymbol('sidebar').setVariable("menuButtonPressed", true);
                     sym.getComposition().getStage().getSymbol('sidebar').play('0');
                     sym.getComposition().getStage().getSymbol('sidebar').$('triggerarea').show();
                 }
             }else{//hide Menu
                 sym.iconActive5 = false;    
                 sym.$("hitMark5").css({"opacity":"0"});
                 var x = sym.getComposition().getStage().getSymbol('sidebar').getVariable("lock");
                 if(x==0){
                     sym.getComposition().getStage().getSymbol('sidebar').setVariable("menuButtonPressed", false);
                     sym.getComposition().getStage().getSymbol('sidebar').playReverse('1');
                     sym.getComposition().getStage().getSymbol('sidebar').$('triggerarea').hide();
         
                 }
             }
         });
         
         //Close background btn
         sym.$('close').html('<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');
         
         //background color for navigation selector
         sym.$("bxbor15b").css({"background-image":"linear-gradient(to right, #008991, #00a3a0, #00b2ae, #00c9c5)"}); //Green #008991
         sym.$("bxbor14b").css({"background-image":"linear-gradient(to right, #b1000d, #b8000e, #d30918, #ff0116)"}); //red
         sym.$("bxbor13b").css({"background-image":"linear-gradient(to left bottom,#146ec2, #6663cc, #664acc, #7e13a3)"});// magenta
         sym.$("bxbor11b").css({"background-image":"linear-gradient(to right, #d23900, #f15800, #ff7900, #ff9200)"});// orange
         sym.$("bxbor12b").css({"background-image":"linear-gradient(to right, #073989, #014c9d, #1065b0, #056cbb)"});//blue

      });
      //Edge binding end

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stepTheme();
         
         $('#svg_3').html("AB");
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 168, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${close}", "click", function(sym, e) {
         sym.iconActive1 = false;
         sym.$("hitMark1").css({"opacity":"0"});
         sym.$("Select_BG").hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${close}", "mouseover", function(sym, e) {
         sym.$('close').css('opacity', '0.5');
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${close}", "mouseout", function(sym, e) {
         sym.$('close').css('opacity', '1');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${backgroundGlass}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.iconActive1 = false;
         sym.$("hitMark1").css({"opacity":"0"});
         sym.$('Select_BG').hide();
         

      });
      //Edge binding end

   })("bottombar");
   //Edge symbol end:'bottombar'

   //=========================================================

   //=========================================================
   
   //Edge symbol: 'sidebar'
   (function(symbolName) {   
      
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 241, function(sym, e) {
         sym.stop();
         sym.setVariable("menu","closed");

      });
      //Edge binding end
      
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.setVariable("menu","open");
         sym.stop();

      });
      //Edge binding end
      
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.hovercolor = '';
         
         sym.setVariable("lock",0);
         sym.$('triggerarea').hide();
         sym.$("check").hide();
         sym.clicked=0;
         sym.mainhover = 0;
         sym.subhover = 0;
         
         sym.setVariable("menu","closed");
         sym.setVariable("menuButtonPressed", false);
         
         /*---------------sidemenubar---------------*/
         sym.$("sidemenubar").hover(function(){
         	sym.setVariable("menuButtonPressed", false);
         },function(){
         	var x = sym.getVariable("lock");
         	if(x==0 && sym.getVariable("menuButtonPressed") == false && sym.getComposition().getStage().getSymbol('sidebar').getVariable("menu") != "closed"){
         		sym.playReverse('1');
         		sym.$('triggerarea').hide();
         	}
         });
         
         /*---------------MenuLock---------------*/
         // sym.$(".menulock").click(function(){
         // 	var x = sym.getVariable("lock");
         // 	if(x == 0){
         // 		sym.$("check").show();
         // 		sym.$("triggerarea").hide();
         // 		sym.setVariable("lock",1);
         // 	}else{
         // 		sym.$("check").hide();
         // 		sym.$("triggerarea").show();
         // 		sym.setVariable("lock",0);
         // 	}
         // });
         
         /*---Add codes for Topic and Subtopic---*/
         // Function to handle hover and click events
         function handleEvents(element, mainHoverValue, jumpToPage, hoverType) {
           element.hover(function() {
               $(this).css('color', sym.hovercolor);
             },
             function() {
               if (sym[hoverType + 'hover'] !== mainHoverValue) {
                 $(this).css('color', '#000000');
               }
             }).click(function() {
               sym.getComposition().getStage().JumpTo(jumpToPage);
               sym[hoverType + 'hover'] = mainHoverValue;
             }
           );
         }
         
         /*---------------Topic---------------*/
         handleEvents(sym.$("Topic1"), 1, 2,'main');
         handleEvents(sym.$("Topic2"), 2, 3,'main');
         handleEvents(sym.$("Topic3"), 3, 6,'main');
         handleEvents(sym.$("Topic4"), 4, 11,'main');
         handleEvents(sym.$("Topic5"), 5, 13,'main');
         handleEvents(sym.$("Topic6"), 6, 17,'main');
         handleEvents(sym.$("Topic7"), 7, 28,'main');
         
         /*---------------Assessment---------------*/
         sym.$("Topic8").hover(function() {
             $(this).css('color', sym.hovercolor);
           },
           function() {
             if (sym.mainhover !== 8) {
               $(this).css('color', '#000000');
             }
           }).click(function() {
             var assPage = sym.getComposition().getStage().getVariable("totalpage") - 1;
             sym.getComposition().getStage().JumpTo(assPage);
             sym.mainhover = 8;
           }
         );
         
         /*---------------Subtopic---------------*/
         handleEvents(sym.$("SubTopic1"), 1, 14, 'sub');
         handleEvents(sym.$("SubTopic2"), 2, 15, 'sub');
         handleEvents(sym.$("SubTopic3"), 3, 22, 'sub');
         handleEvents(sym.$("SubTopic4"), 4, 24, 'sub');

      });
      //Edge binding end
      
      
      
      
      
      
      
      
      
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         //sym.getSymbol("cover").play("0");

      });
      //Edge binding end
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      Symbol.bindElementAction(compId, symbolName, "${sidemenubar}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         sym.setVariable("menuButtonPressed", false);

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${sidemenubar}", "mouseleave", function(sym, e) {
         var x = sym.getVariable("lock");
         if(x==0 && sym.getVariable("menuButtonPressed") == false && sym.getComposition().getStage().getSymbol('sidebar').getVariable("menu") != "closed")
         {
         	sym.playReverse('1');
         	sym.$('triggerarea').hide();
         }
         

      });
      //Edge binding end

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

   })("sidebar");
   //Edge symbol end:'sidebar'

   //=========================================================
   
   //Edge symbol: 'progressbar'
   (function(symbolName) {   
   
      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("progressbar");
   //Edge symbol end:'progressbar'

   //=========================================================

   //=========================================================
   
   //Edge symbol: 'page0content'
   (function(symbolName) {   
   
      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 50, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         //sym.getComposition().getStage().$("Controls").hide();
         //sym.getComposition().getStage().$("bottombar").hide();
         //sym.getComposition().getStage().$("sidebar").hide();
         
         

      });
      //Edge binding end

      

      

      

      

      

      

   })("page0content");
   //Edge symbol end:'page0content'

   //=========================================================
   
   //Edge symbol: 'page3content'
   (function(symbolName) {   
   
      

      

      

      

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         
         //sym.getComposition().getStage().$("Controls").hide();
         //sym.getComposition().getStage().$("bottombar").hide();
         //sym.getComposition().getStage().$("sidebar").hide();
         /*
         sym.play(0);*/
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1633, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page3content");
   //Edge symbol end:'page3content'

   //=========================================================
   
   //Edge symbol: 'page2content'
   (function(symbolName) {   
   
      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2174, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         // insert code to be run when the symbol is created here
         var x = sym.getComposition().getStage().getVariable("currentpage");
         var firstRun = true;	
         
         sym.$("hoverEf").css({
         	"opacity":"0",
         	"transition":"0.4s"
         });
         
         sym.$("continueBtn").hover(function(){
         	sym.$(this).css({"cursor":"pointer"});
         	sym.$("hoverEf").css({"opacity":"0.3"});
         },function(){
         	sym.$(this).css({"cursor":"auto"});
         	sym.$("hoverEf").css({"opacity":"0"});
         }).click(function(){
         	sym.getComposition().getStage().checkyourknowledge = 0
         	sym.getComposition().getStage().next();
         }).attr({
         	"role":"button",
         	"aria-label":"Continue"
         }).on('focus', function() {
         	 $(this).on('keypress', function(event) {
         		  if(event.which === 13) {
         				sym.getComposition().getStage().checkyourknowledge = 0
         				sym.getComposition().getStage().next();
         		  }
         	 });
         });

      });
      //Edge binding end

   })("page2content");
   //Edge symbol end:'page2content'

   //=========================================================
   
   //Edge symbol: 'page66content'
   (function(symbolName) {   
   
      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var qacode = sym.getComposition().getStage().getParameterByName("qacode");
         
         
         sym.getComposition().getStage().stepTheme();
         sym.$("btn2a").hide();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 300, function(sym, e) {
         var qacode = sym.getComposition().getStage().getParameterByName("qacode");
         sym.stop();
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         ///sym.getComposition().getStage().getSymbol("bottombar").continueSound(0,180,"bg1");
         var qacode = sym.getComposition().getStage().getParameterByName("qacode");
         
         sym.getComposition().getStage().stepTheme();
         sym.getComposition().getStage().SetSidebarColor(8,0);

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2400, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.setVariable("qaloaded",false);
         sym.$('qaintrotext').html('<div style="font-size:24px">You have as much time as you need to answer the questions. From the possible options choose the <span style="color:#000000;">one</span> that best answers each question.<br><br>Your score will be saved. You need to get at least <span style="color:#000000;">70%</span> in order to complete the module successfully.<br><br>Questions: <span style="background-color:black;padding:5px 15px;font-size:20px;color:#fff;">10</span> &nbsp; Passing Score: <span style="background-color:black;padding:5px 15px;font-size:20px;color:#ffffff;">70%​</span></div>');
         sym.$("qaintrotext-Mid").css("letter-spacing","-0.3px");
         
         sym.$("hoverEf1").css({
         	"opacity":"0",
         	"transition":"0.4s"
         });
         
         sym.$("hoverEf2").css({
         	"opacity":"0",
         	"transition":"0.4s"
         });
         
         sym.$("continueBtn").hover(function(){
         	sym.$(this).css({"cursor":"pointer"});
         	sym.$("hoverEf1").css({"opacity":"0.3"});
         },function(){
         	sym.$(this).css({"cursor":"auto"});
         	sym.$("hoverEf1").css({"opacity":"0"});
         }).click(function(){
         	sym.play("2");
         }).attr({
         	"role":"button",
         	"aria-label":"Continue"
         }).on('focus', function() {
         	 $(this).on('keypress', function(event) {
         		  if(event.which === 13) {
         				sym.play("2");
         		  }
         	 });
         });
         
         sym.$("startNowBtn").hover(function(){
         	sym.$(this).css({"cursor":"pointer"});
         	sym.$("hoverEf2").css({"opacity":"0.3"});
         },function(){
         	sym.$(this).css({"cursor":"auto"});
         	sym.$("hoverEf2").css({"opacity":"0"});
         }).click(function(){
         	sym.getComposition().getStage().JumpTo("qa");
         }).attr({
         	"role":"button",
         	"aria-label":"Start now"
         }).on('focus', function() {
         	 $(this).on('keypress', function(event) {
         		  if(event.which === 13) {
         				sym.getComposition().getStage().JumpTo("qa");
         		  }
         	 });
         });
         

      });
      //Edge binding end

   })("assessmentpage");
   //Edge symbol end:'assessmentpage'

   //=========================================================
   
   //Edge symbol: 'Preloader'
   (function(symbolName) {   
   
   })("Preloader");
   //Edge symbol end:'Preloader'

   //=========================================================
   
   //Edge symbol: 'newintro'
   (function(symbolName) {   
   
      

      

      

      

      

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         
         //sym.getComposition().getStage().$("Controls").hide();
         //sym.getComposition().getStage().$("bottombar").hide();
         //sym.getComposition().getStage().$("sidebar").hide();
         /*
         sym.play(0);*/
         
         
         
         sym.getComposition().getStage().stepTheme();
         
         sym.$("btn1").hide();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3047, function(sym, e) {
         //sym.getSymbol("Intro_next_btn").play('1');
         
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("hoverEf").css({
         	"opacity":"0",
         	"transition":"0.4s"
         });
         
         sym.$("startBtn").hover(function(){
         	sym.$(this).css({"cursor":"pointer"});
         	sym.$("hoverEf").css({"opacity":"0.3"});
         },function(){
         	sym.$(this).css({"cursor":"auto"});
         	sym.$("hoverEf").css({"opacity":"0"});
         }).click(function(){
         	sym.getComposition().getStage().checkyourknowledge = 0
         	sym.getComposition().getStage().next();
         }).attr({
         	"role":"button",
         	"aria-label":"Start Session"
         }).on('focus', function() {
         	 $(this).on('keypress', function(event) {
         		  if(event.which === 13) {
         				sym.getComposition().getStage().checkyourknowledge = 0
         				//sym.getComposition().getStage().next();
         				sym.getComposition().getStage().JumpTo(2);
         		  }
         	 });
         });
         

      });
      //Edge binding end

   })("page1contentintro");
   //Edge symbol end:'page1contentintro'

   //=========================================================
   
   //Edge symbol: 'page1content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page1content");
   //Edge symbol end:'page1content'

   //=========================================================
   
   //Edge symbol: 'qaContainer'
   (function(symbolName) {   
   
   })("qaContainer");
   //Edge symbol end:'qaContainer'

   //=========================================================
   
   //Edge symbol: 'qtip-mail'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4500, function(sym, e) {
         stop();

      });
      //Edge binding end

   })("qtip-mail");
   //Edge symbol end:'qtip-mail'

   //=========================================================
   
   //Edge symbol: 'qtip-mail_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4500, function(sym, e) {
         stop();

      });
         //Edge binding end

      })("qtip-back");
   //Edge symbol end:'qtip-back'

   //=========================================================
   
   //Edge symbol: 'qtip-back_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4500, function(sym, e) {
         stop();

      });
         //Edge binding end

      })("qtip-next");
   //Edge symbol end:'qtip-next'

   //=========================================================
   
   //Edge symbol: 'qtip-next_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4500, function(sym, e) {
         stop();

      });
         //Edge binding end

      })("qtip-close");
   //Edge symbol end:'qtip-close'

   //=========================================================
   
   //Edge symbol: 'qtip-next_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4500, function(sym, e) {
         stop();

      });
         //Edge binding end

      })("qtip-help");
   //Edge symbol end:'qtip-help'

   //=========================================================
   
   //Edge symbol: 'qtip-back_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4500, function(sym, e) {
         stop();

      });
         //Edge binding end

      })("qtip-solution");
   //Edge symbol end:'qtip-solution'

   //=========================================================
   
   //Edge symbol: 'qa'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_close}", "mouseover", function(sym, e) {
         sym.play("over");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_close}", "mouseout", function(sym, e) {
         sym.play("up");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_close}", "mouseup", function(sym, e) {
         sym.play("over");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_close}", "mousedown", function(sym, e) {
         sym.play("click");

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.play('up');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 103, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 301, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("qa");
   //Edge symbol end:'qa'

   //=========================================================
   
   //Edge symbol: 'previous_4'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "click", function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         
         if(sym.getComposition().getStage().checkyourknowledge == 0){
         	if(x==20){
         		sym.getComposition().getStage().JumpTo(19);
         	}else if(x==21){
         		sym.getComposition().getStage().JumpTo(19);
         	}else if(x==22){
         		sym.getComposition().getStage().JumpTo(19);
         	}else
         		sym.getComposition().getStage().previous();
         }else
         	sym.getComposition().getStage().getSymbol("content").getSymbol("page"+x+"content").resetpage();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mouseover", function(sym, e) {
         if(sym.getPosition() < 1396){
         	sym.play('over');
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mouseout", function(sym, e) {
         if(sym.getPosition() < 1396){
         	sym.play(sym.myup);
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mousedown", function(sym, e) {
         if(sym.getPosition() < 1396){
         	sym.play('click');
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mouseup", function(sym, e) {
         if(sym.getPosition() < 1396){
         	sym.play('over');
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.myup="0";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1069, function(sym, e) {
         sym.myup="2";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1114, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1353, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1449, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("prevBtn").append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17"><defs><clipPath id="b"><rect width="17" height="17"/></clipPath></defs><g id="a" clip-path="url(#b)"><path d="M-7774-4429h-9a3,3,0,0,1-3-3v-9a3,3,0,0,1,3-3h9a3,3,0,0,1,3,3v9A3,3,0,0,1-7774-4429Zm-2-10.833-5.833,3.332,5.833,3.333v-6.665Z" transform="translate(7787 4445)" fill="#fff"/></g></svg>');
         

      });
      //Edge binding end

   })("previous_4");
   //Edge symbol end:'previous_4'

   //=========================================================
   
   //Edge symbol: 'next_4'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_next}", "click", function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         
         if(sym.getComposition().getStage().checkyourknowledge == 0){
         	if(x==19){
         		sym.getComposition().getStage().JumpTo(22);
         	}else if(x==20){
         		sym.getComposition().getStage().JumpTo(19);
         	}else if(x==21){
         		sym.getComposition().getStage().JumpTo(19);
         	}else
         		sym.getComposition().getStage().next();
         }
         
         /*if(x==18){
         	sym.getComposition().getStage().JumpTo(17);
         }
         if(x==19){
         	sym.getComposition().getStage().JumpTo(17);
         }
         
         if(x==17){
         	sym.getComposition().getStage().JumpTo(19);
         }
         
         sym.getComposition().getStage().checkyourknowledge = 0
         sym.getComposition().getStage().next();*/
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseover", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('over');
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseout", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play(sym.myup);
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mousedown", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('click');
         }
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseup", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('over');
         }
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.myup="0";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1069, function(sym, e) {
         sym.myup="2";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1137, function(sym, e) {
         
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1349, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1438, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("nextBtn").append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17"><defs><clipPath id="b"><rect width="17" height="17"/></clipPath></defs><g id="a" clip-path="url(#b)"><path d="M12,15H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0h9a3,3,0,0,1,3,3v9A3,3,0,0,1,12,15ZM10,4.167h0L4.167,7.5,10,10.834V4.167Z" transform="translate(16.001 16.001) rotate(180)" fill="#fff"/></g></svg>');
         
         

      });
      //Edge binding end

   })("next_4");
   //Edge symbol end:'next_4'

   //=========================================================
   
   //Edge symbol: 'home'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_mail}", "mouseover", function(sym, e) {
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_mail}", "mouseout", function(sym, e) {
         sym.play('up');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_mail}", "mousedown", function(sym, e) {
         sym.play('click');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_mail}", "mouseup", function(sym, e) {
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.play('up');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 29, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 133, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 234, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 408, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("home");
   //Edge symbol end:'home'

   //=========================================================
   
   //Edge symbol: 'calcu'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${xclose}", "mouseover", function(sym, e) {
         sym.$("XcalLight").show();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${xclose}", "mouseout", function(sym, e) {
         sym.$("XcalLight").hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${left}", "mouseover", function(sym, e) {
         sym.$("left").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${left}", "mouseout", function(sym, e) {
         sym.$("left").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${right}", "mouseover", function(sym, e) {
         sym.$("right").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${right}", "mouseout", function(sym, e) {
         sym.$("right").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${del}", "mouseover", function(sym, e) {
         sym.$("del").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${del}", "mouseout", function(sym, e) {
         sym.$("del").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${AC}", "mouseover", function(sym, e) {
         sym.$("AC").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${AC}", "mouseout", function(sym, e) {
         sym.$("AC").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${MC}", "mouseover", function(sym, e) {
         sym.$("MC").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${MC}", "mouseout", function(sym, e) {
         sym.$("MC").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${MR}", "mouseover", function(sym, e) {
         sym.$("MR").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${MR}", "mouseout", function(sym, e) {
         sym.$("MR").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Mplus}", "mouseover", function(sym, e) {
         sym.$("Mplus").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Mplus}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         sym.$("Mplus").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${M}", "mouseover", function(sym, e) {
         sym.$("M").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${M}", "mouseout", function(sym, e) {
         sym.$("M").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${mul}", "mouseover", function(sym, e) {
         sym.$("mul").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${mul}", "mouseout", function(sym, e) {
         sym.$("mul").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${min}", "mouseover", function(sym, e) {
         sym.$("min").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${min}", "mouseout", function(sym, e) {
         sym.$("min").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${dev}", "mouseover", function(sym, e) {
         sym.$("dev").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${dev}", "mouseout", function(sym, e) {
         sym.$("dev").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n1}", "mouseover", function(sym, e) {
         sym.$("n1").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n1}", "mouseout", function(sym, e) {
         sym.$("n1").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n2}", "mouseover", function(sym, e) {
         sym.$("n2").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n2}", "mouseout", function(sym, e) {
         sym.$("n2").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n3}", "mouseover", function(sym, e) {
         sym.$("n3").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n3}", "mouseout", function(sym, e) {
         sym.$("n3").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n4}", "mouseover", function(sym, e) {
         sym.$("n4").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n4}", "mouseout", function(sym, e) {
         sym.$("n4").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n5}", "mouseover", function(sym, e) {
         sym.$("n5").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n5}", "mouseout", function(sym, e) {
         sym.$("n5").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n6}", "mouseover", function(sym, e) {
         sym.$("n6").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n6}", "mouseout", function(sym, e) {
         sym.$("n6").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n7}", "mouseout", function(sym, e) {
         sym.$("n7").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n7}", "mouseover", function(sym, e) {
         sym.$("n7").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n8}", "mouseover", function(sym, e) {
         sym.$("n8").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n8}", "mouseout", function(sym, e) {
         sym.$("n8").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n9}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         sym.$("n9").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n9}", "mouseout", function(sym, e) {
         sym.$("n9").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n0}", "mouseover", function(sym, e) {
         sym.$("n0").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n0}", "mouseout", function(sym, e) {
         sym.$("n0").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${plusmin}", "mouseover", function(sym, e) {
         sym.$("plusmin").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${plusmin}", "mouseout", function(sym, e) {
         
         sym.$("n0").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${dot}", "mouseover", function(sym, e) {
         sym.$("dot").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${dot}", "mouseout", function(sym, e) {
         sym.$("dot").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${plus}", "mouseover", function(sym, e) {
         sym.$("plus").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${plus}", "mouseout", function(sym, e) {
         sym.$("plus").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ans}", "mouseover", function(sym, e) {
         sym.$("ans").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ans}", "mouseout", function(sym, e) {
         sym.$("ans").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${op1}", "mouseover", function(sym, e) {
         sym.$("op1").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${op1}", "mouseout", function(sym, e) {
         sym.$("op1").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${sqrt}", "mouseover", function(sym, e) {
         sym.$("sqrt").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${sqrt}", "mouseout", function(sym, e) {
         sym.$("sqrt").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${x3}", "mouseover", function(sym, e) {
         sym.$("x3").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${x3}", "mouseout", function(sym, e) {
         sym.$("x3").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${x2}", "mouseover", function(sym, e) {
         sym.$("x2").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${x2}", "mouseout", function(sym, e) {
         sym.$("x2").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${e}", "mouseover", function(sym, e) {
         sym.$("e").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${e}", "mouseout", function(sym, e) {
         sym.$("e").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${yx}", "mouseover", function(sym, e) {
         sym.$("yx").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${yx}", "mouseout", function(sym, e) {
         sym.$("yx").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ln}", "mouseover", function(sym, e) {
         sym.$("ln").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ln}", "mouseout", function(sym, e) {
         sym.$("ln").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nnot}", "mouseover", function(sym, e) {
         sym.$("nnot").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nnot}", "mouseout", function(sym, e) {
         sym.$("nnot").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${open}", "mouseover", function(sym, e) {
         sym.$("open").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${open}", "mouseout", function(sym, e) {
         sym.$("open").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${close}", "mouseover", function(sym, e) {
         sym.$("close").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${close}", "mouseout", function(sym, e) {
         sym.$("close").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${enter}", "mouseover", function(sym, e) {
         sym.$("enter").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${enter}", "mouseout", function(sym, e) {
         sym.$("enter").css("opacity","0");

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         //set relative positioning for proper dragging
         $('#Stage_bottombar_calcu').css('position', 'relative');
         sym.getParentSymbol().$('calcu').draggable();
         
         sym.$("XcalLight").hide();
         sym.$("left").css("opacity","0");
         sym.$("right").css("opacity","0");
         sym.$("del").css("opacity","0");
         sym.$("AC").css("opacity","0");
         sym.$("MC").css("opacity","0");
         sym.$("MR").css("opacity","0");
         sym.$("Mplus").css("opacity","0");
         sym.$("M").css("opacity","0");
         sym.$("mul").css("opacity","0");
         sym.$("min").css("opacity","0");
         sym.$("dev").css("opacity","0");
         sym.$("n1").css("opacity","0");
         sym.$("n2").css("opacity","0");
         sym.$("n3").css("opacity","0");
         sym.$("n4").css("opacity","0");
         sym.$("n5").css("opacity","0");
         sym.$("n6").css("opacity","0");
         sym.$("n7").css("opacity","0");
         sym.$("n8").css("opacity","0");
         sym.$("n9").css("opacity","0");
         sym.$("n0").css("opacity","0");
         sym.$("plusmin").css("opacity","0");
         sym.$("dot").css("opacity","0");
         sym.$("plus").css("opacity","0");
         sym.$("ans").css("opacity","0");
         sym.$("op1").css("opacity","0");
         sym.$("sqrt").css("opacity","0");
         sym.$("x3").css("opacity","0");
         sym.$("x2").css("opacity","0");
         sym.$("e").css("opacity","0");
         sym.$("yx").css("opacity","0");
         sym.$("ln").css("opacity","0");
         sym.$("nnot").css("opacity","0");
         sym.$("open").css("opacity","0");
         sym.$("close").css("opacity","0");
         sym.$("enter").css("opacity","0");
         sym.$("val").html("<input type='text' id='input_bar' style='width:330px;height:28px;margin-top:-4.5px;font-size:15px;'>");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${xclose}", "click", function(sym, e) {
         // Hide an element 
         //sym.getComposition().getStage().getSymbol("content").getSymbol("page17content").$("cal").hide();
         sym.getParentSymbol().$('calcu').hide();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n7}", "click", function(sym, e) {
         sym.getComposition().getStage().display('7');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${plus}", "click", function(sym, e) {
         sym.getComposition().getStage().display('+');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${close}", "click", function(sym, e) {
         sym.getComposition().getStage().display(')');
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${open}", "click", function(sym, e) {
         sym.getComposition().getStage().display('(');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${dev}", "click", function(sym, e) {
         sym.getComposition().getStage().display('/');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${mul}", "click", function(sym, e) {
         sym.getComposition().getStage().display('*');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${min}", "click", function(sym, e) {
         sym.getComposition().getStage().display('-');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n8}", "click", function(sym, e) {
         sym.getComposition().getStage().display('8');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n9}", "click", function(sym, e) {
         sym.getComposition().getStage().display('9');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n4}", "click", function(sym, e) {
         sym.getComposition().getStage().display('4');
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n5}", "click", function(sym, e) {
         sym.getComposition().getStage().display('5');
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n6}", "click", function(sym, e) {
         sym.getComposition().getStage().display('6');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n1}", "click", function(sym, e) {
         sym.getComposition().getStage().display('1');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n2}", "click", function(sym, e) {
         sym.getComposition().getStage().display('2');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n3}", "click", function(sym, e) {
         sym.getComposition().getStage().display('3');
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${n0}", "click", function(sym, e) {
         sym.getComposition().getStage().display('0');
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${dot}", "click", function(sym, e) {
         sym.getComposition().getStage().display('.');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${enter}", "click", function(sym, e) {
         sym.getComposition().getStage().calculate();
         var equation = sym.getComposition().getStage().getVariable('string');
         var result = sym.getComposition().getStage().getVariable('result');
         
         
         sym.getComposition().getStage().getSymbol("bottombar").getSymbol('calcu').$('formula').html($('#input_bar').val());
         sym.getComposition().getStage().getSymbol("bottombar").getSymbol('calcu').$('answer_bar').html(result);
         document.getElementById('input_bar').value = "";

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${AC}", "click", function(sym, e) {
         sym.getComposition().getStage().clear_screen();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${sqrt}", "click", function(sym, e) {
         sym.getComposition().getStage().display('sqrt(');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ln}", "click", function(sym, e) {
         sym.getComposition().getStage().display('log(');
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${del}", "click", function(sym, e) {
         	 
         	 var position = sym.getComposition().getStage().getVariable("position");
         	 var str = $("#input_bar").val();
         	     str = sym.getComposition().getStage().setCharAt(str,position-1,'');
         	 	 $("#input_bar").val(str);
         	 
         	 var ctl = document.getElementById('input_bar');
         	 var startPos = ctl.selectionStart;
         	 var endPos = ctl.selectionEnd;
         	 
         	 sym.getComposition().getStage().setVariable('position',position-1);
         	 
         	 sym.getComposition().getStage().setCursorPosition();
         	 
         	 //sym.setCursorPosition = function(){
         	 	//var position = sym.getVariable('position');
         	 	//var input = document.getElementById ("input_bar");
         	            // if ('selectionStart' in input) {
         	                 //input.selectionStart = position;
         	                 //input.selectionEnd = position;
         	                // input.focus ();
         	            // }
         	 
         	 //} 

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${x2}", "click", function(sym, e) {
         sym.getComposition().getStage().display('^2');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ans}", "click", function(sym, e) {
         sym.getComposition().getStage().display('Ans');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${yx}", "click", function(sym, e) {
         sym.getComposition().getStage().display('^');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${x3}", "click", function(sym, e) {
         sym.getComposition().getStage().display('^3');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${op1}", "click", function(sym, e) {
         sym.getComposition().getStage().display('1/');
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${e}", "click", function(sym, e) {
         sym.getComposition().getStage().display('e');
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nnot}", "click", function(sym, e) {
         sym.getComposition().getStage().display('!');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${M}", "click", function(sym, e) {
         var set_memory = sym.setVariable('memory_stored',sym.getVariable('result'));
         var memory_stored = sym.getComposition().getStage().memory_store();
         console.log(memory_stored);
         sym.getComposition().getStage().getSymbol('calcu').$('answer_bar').html(memory_stored+" STORED");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${left}", "click", function(sym, e) {
         var inputs = $('#input_bar').val();
         var cursor_position = sym.getComposition().getStage().getVariable("position");
         
         if(inputs.length!=0){
         	sym.getComposition().getStage().setVariable("position",cursor_position-1);
         	sym.getComposition().getStage().setCursorPosition();
         }
         else{
         	sym.getComposition().getStage().setCursorPosition();
         }
         console.log(cursor_position);
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${val}", "click", function(sym, e) {
         
         var ctl = document.getElementById('input_bar');
             var startPos = ctl.selectionStart;
             var endPos = ctl.selectionEnd;
         
         sym.getComposition().getStage().setVariable('position',endPos);
         console.log(sym.getComposition().getStage().getVariable('position'));

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Mplus}", "click", function(sym, e) {
         var memory = sym.getComposition().getStage().getVariable('memory_stored');
         sym.getComposition().getStage().memory_value_add();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${MR}", "click", function(sym, e) {
         sym.getComposition().getStage().memory_read();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${MC}", "click", function(sym, e) {
         sym.getComposition().getStage().memory_cleared();
         sym.getCompostion().getStage().setVariable('result',null);
         sym.getCompostion().getStage().setVariable('memory_stored',0);

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${plusmin}", "click", function(sym, e) {
         sym.getComposition().getStage().display('-');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${right}", "click", function(sym, e) {
         var inputs = $('#input_bar').val();
         var cursor_position = sym.getComposition().getStage().getVariable("position");
         
         if(inputs.length!=cursor_position){
         	sym.getComposition().getStage().setVariable("position",cursor_position+1);
         	sym.getComposition().getStage().setCursorPosition();
         }else{
         	sym.getComposition().getStage().setCursorPosition();
         }

      });
      //Edge binding end

   })("calcu");
   //Edge symbol end:'calcu'

   //=========================================================
   
   //Edge symbol: 'assessmentpage_1'
   (function(symbolName) {   
   
      

      

      

      

      

      

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.setVariable("qaloaded",false);

      });
         //Edge binding end

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3500, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 37)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

      })("assessmentP1");
   //Edge symbol end:'assessmentP1'

   //=========================================================
   
   //Edge symbol: 'assessmentP1_1'
   (function(symbolName) {   
   
      

      

      

      

      

      

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.setVariable("qaloaded",false);

      });
         //Edge binding end

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${StartNow}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         sym.$("StartNow").css("cursor","pointer");
         sym.$("button_background").css("background-color","rgba(0,0,0,0.8)");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${StartNow}", "mouseleave", function(sym, e) {
         // insert code to be run when the mouse leaves an element
         sym.$("button_background").css("background-color","rgba(0,0,0,0.6)");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${StartNow}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.getComposition().getStage().JumpTo("qa");
         

      });
      //Edge binding end

      })("assessmentP2");
   //Edge symbol end:'assessmentP2'

   //=========================================================
   
   //Edge symbol: 'page3content_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1500, function(sym, e) {
         sym.stop();

      });
         //Edge binding end

      })("pageGetStarted");
   //Edge symbol end:'pageGetStarted'

   //=========================================================
   
   //Edge symbol: 'page8'
   (function(symbolName) {   
   
      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 39, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':5,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':5,'answer':'b'});
         

      });
      //Edge binding end

      

      

   })("page8");
   //Edge symbol end:'page8'

   //=========================================================
   
   //Edge symbol: 'page0'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page0");
   //Edge symbol end:'page0'

   //=========================================================
   
   //Edge symbol: 'page10'
   (function(symbolName) {   
   
      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 46, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{	
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':7,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':7,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':7,'answer':'c'});

      });
      //Edge binding end

      

   })("page10");
   //Edge symbol end:'page10'

   //=========================================================
   
   //Edge symbol: 'page13'
   (function(symbolName) {   
   
      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 42, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("note").hide();
         	sym.$("cover").hide();
         }else{
         	sym.$("check").show();
         	sym.$("note").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':10,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':10,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':10,'answer':'c'});

      });
      //Edge binding end

      

   })("page13");
   //Edge symbol end:'page13'

   //=========================================================
   
   //Edge symbol: 'begin_1'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseout", function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         sym.play('click');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 71, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 168, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("begin_1");
   //Edge symbol end:'begin_1'

   //=========================================================
   
   //Edge symbol: 'table'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         //var result = sym.getComposition().getStage().getVariable("finish_result");
         
         //create code for table in a string
         var tableCode = "<table id='resultsTable' style='border:1px solid orange;border-collapse:collapse;width:100%'><thead><tr><td colspan='2' style='font-size:10px;text-align:center;padding-bottom:10px;'>Question & Answers</td></tr></thead></tbody>";
         for(a=1; a<=10; a++){
         	tableCode += "<tr><td style='border:none;text-align:center;width:50%;height:14px;font-size:11px;font-weight:bold;'>" + a + ".</td><td style='border:none;width:50%;height:14px;text-align:center;'><img src='images/wrong.png' height='14'></td></tr>";
         }
         tableCode += "</tbody></table>";
         
         
         //insert the string inside
         sym.$('tableCode').html(tableCode);

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
      });
      //Edge binding end

   })("table");
   //Edge symbol end:'table'

   //=========================================================
   
   //Edge symbol: 'page12'
   (function(symbolName) {   
   
      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 53, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':9,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':9,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':9,'answer':'c'});

      });
      //Edge binding end

      

   })("page12");
   //Edge symbol end:'page12'

   //=========================================================
   
   //Edge symbol: 'lastpage'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${certi}", "click", function(sym, e) {
         	var cert = sym.getParentSymbol().getVariable("cert");
         	var menu = sym.getParentSymbol().getVariable("menu");
         	var module = sym.getParentSymbol().getVariable("module");
         	var hours = sym.getParentSymbol().getVariable("hours");
         	var todayis = sym.getParentSymbol().getVariable("todayis");
         	var name = sym.getParentSymbol().getVariable("examineename");
         	var score = sym.getParentSymbol().getVariable("score")+"%";
         	if(cert == 1){
         		window.open("https://www.fitforbanking.com/sign/printing/do.printcertificate.php?menu="+menu+"&name="+name+"&module="+module+"&score="+score+"&date="+todayis+"&hours="+hours,"Certificate");
         	}

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${StartNow}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         sym.$("StartNow").css("cursor","pointer");
         sym.$("button_background").css("background-color","rgba(0,0,0,0.8)");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${StartNow}", "mouseleave", function(sym, e) {
         // insert code to be run when the mouse leaves an element
         sym.$("button_background").css("background-color","rgba(0,0,0,0.6)");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${StartNow}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.getParentSymbol().JumpTo(3);
         sym.getParentSymbol().setVariable("showcheck",1);

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3666, function(sym, e) {
         sym.$("qaControls").hide();
         ///////////////////////////
         
         var response = sym.getVariable("finish_result");
         var answers = sym.getVariable("items");
         var name = sym.getVariable("examineename");
         var passingscore = sym.getVariable("pscore");
         var score = 0;
         var percentage = 0;
         var markslist = sym.getVariable("markslist");
         var numberOfQuestions = sym.getVariable("totalQuestions");
         var shuffed = sym.getVariable("shuffledArray");
         var orderArr = [];
         for (var k = 0; k < shuffed.length; k++){
         	orderArr[k] = shuffed[k]-3;
         }
         
         //add empty element at idex 0 to balance the markslist array;
         orderArr.unshift("");
         var result = [];
         
         for(var i=1; i<=markslist.length; i++) {
         	result[i] = markslist[orderArr[i]];
         }
         console.log(orderArr);
         console.log(markslist);
         for (var k = 1; k < orderArr.length; k++){
         	targetIndex = orderArr[k];
         	checkedMarks = markslist[targetIndex].replace(/\d+/g, '');
         	console.log(k + "  " +checkedMarks);
         	//check for correct answers only
         	if(checkedMarks == "c"){
         		$('#resultsTable tbody tr:nth-child('+k+') td:nth-child(2)').html('<img src="images/check.png" height="14">');
         	}
         	else{
         		$('#resultsTable tbody tr:nth-child('+k+') td:nth-child(2)').html('<img src="images/wrong.png" height="14">');
         	}
         }
         
         percentage = sym.getVariable("score");
         sym.getSymbol("lastpage").$("score").html('<span style="padding:5px 15px; background-color:black; font-size:24px;">'+percentage+'%'+'</span>');
         
         
         //user fails
         if (percentage < passingscore) {
         	sym.getSymbol("lastpage").getSymbol('certi').$("disablecover").show();
         	sym.getSymbol("lastpage").$("certi").css("opacity","0.3");
         
         	sym.getSymbol("lastpage").$("bgImage").css({'background-image':'url("images/assFail.jpg")', 'background-size':'cover', 'background-position':'50% 50%'	});
         
         } 
         //user passes
         else {
         	sym.setVariable("cert", 1);
         	sym.getSymbol("lastpage").$("bgImage").css({'background-image':'url("images/assPass.jpg")', 'background-size':'cover', 'background-position':'50% 50%'	});
         }
         
         
         

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("fail_text").css("line-height","1.5 !important");
         sym.$("click_with").css("line-height","1.5 !important");

      });
      //Edge binding end

   })("lastpage");
   //Edge symbol end:'lastpage'

   //=========================================================
   
   //Edge symbol: 'QA'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         //var rand_index = sym.getComposition().getStage().getVariable("playRand");
         //console.log("Random_frame"+rand_index);
         
         
         // insert code here
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play("3");
         sym.getSymbol("page0").play('1');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 104, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play("3");
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 250, function(sym, e) {
         sym.getSymbol("page2").play("1");
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('3');
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('2');
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 336, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('3');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 415, function(sym, e) {
         //skip to page 4, page 3 not in use, however if animation is required in future, use it.
         
         //sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         //sym.getComposition().getStage().getSymbol("Controls").getSymbol("previous").play('3');
         //sym.getSymbol("page3").play('1');
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();
         sym.next();
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 587, function(sym, e) {
         
         
         sym.getSymbol("page4").play('1');
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 672, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 750, function(sym, e) {
         sym.getSymbol("page5").play('1');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 807, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 880, function(sym, e) {
         sym.getSymbol("page6").play('1');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 935, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.getSymbol("page7").play('1');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1041, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1090, function(sym, e) {
         sym.getSymbol("page8").play('1');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1140, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1186, function(sym, e) {
         sym.getSymbol("page9").play('1');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1289, function(sym, e) {
         sym.getSymbol("page10").play('1');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1344, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1394, function(sym, e) {
         sym.getSymbol("page11").play('1');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1456, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1500, function(sym, e) {
         sym.getSymbol("page12").play('1');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1544, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1603, function(sym, e) {
         sym.getSymbol("page13").play('1');
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1657, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1712, function(sym, e) {
         //sym.getSymbol("page14").play('1');
         sym.$("qaControls").hide();
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1787, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('3');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1833, function(sym, e) {
         sym.$("qaControls").hide();
         ///////////////////////////
         console.log("test");
         var response = sym.getVariable("finish_result");
         var answers = sym.getVariable("items");
         var name = sym.getVariable("examineename");
         var passingscore = sym.getVariable("pscore");
         var score = 0;
         var percentage = 0;
         var markslist = sym.getVariable("markslist");
         var numberOfQuestions = sym.getVariable("totalQuestions");
         var shuffed = sym.getVariable("shuffledArray");
         var orderArr = [];
         for (var k = 0; k < shuffed.length; k++){
         	orderArr[k] = shuffed[k]-3;
         }
         
         //add empty element at idex 0 to balance the markslist array;
         orderArr.unshift("");
         var result = [];
         
         for(var i=1; i<=markslist.length; i++) {
         	result[i] = markslist[orderArr[i]];
         }
          console.log(orderArr);
          console.log(markslist);
         for (var k = 1; k < orderArr.length; k++){
         	targetIndex = orderArr[k];
         	checkedMarks = markslist[targetIndex].replace(/\d+/g, '');
         	console.log(k + "  " +checkedMarks);
         	//check for correct answers only
         	if(checkedMarks == "c"){
         		$('#resultsTable tbody tr:nth-child('+k+') td:nth-child(2)').html('<img src="images/check.png" height="14">');
         	}
         	else{
         		$('#resultsTable tbody tr:nth-child('+k+') td:nth-child(2)').html('<img src="images/wrong.png" height="14">');
         	}
         }
         
         percentage = sym.getVariable("score");
         sym.getSymbol("lastpage").$("score").html('<span style=" color: #000; border-radius: 3px; text-align: left; padding:5px 15px; background-color:#fc0; font-size:24px; box-shadow: 1px 1px 1px 0 rgba(66, 68, 90, .3);">'+percentage+'%'+'</span>');
         
         
         //user fails
         if (percentage < passingscore) {
         	//sym.getSymbol("lastpage").getSymbol('certi').$("disablecover").show();
         	//sym.getSymbol("lastpage").$("certi").css("opacity","0.3");
         
         	sym.getSymbol("lastpage").$("certi").hide();
         	sym.getSymbol("lastpage").$("fail_text").show();
         	sym.getSymbol("lastpage").$("click_with").hide();
         
         	//sym.getSymbol("lastpage").$("bgImage").css({'background-image':'url("images/assFail.jpg")', 'background-size':'cover', 'background-position':'50% 50%'	});
         
         } 
         //user passes
         else {
         sym.getSymbol("lastpage").$("certi").show();
         	sym.getSymbol("lastpage").$("click_with").show();
         	sym.getSymbol("lastpage").$("fail_text").hide();
         
         	sym.setVariable("cert", 1);
         	//sym.getSymbol("lastpage").$("bgImage").css({'background-image':'url("images/assPass.jpg")', 'background-size':'cover', 'background-position':'50% 50%'	});
         	sym.getSymbol("lastpage").$("AssFail").hide();
         }
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1892, function(sym, e) {
         sym.getComposition().getStage().setVariable("currentpage", 3); //set global variables
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         // insert code to be run when the symbol is created here
         //each Topic is separated by a semicolon (;)
         //each SubTopc has a prefix of 2 dashes (--) and separate by a semicolon (;)
         var menu = "Module Outline;Introduction;Overview;Relevance for Banks;API Open Banking;--Type of Models;--Strategy of Banks;Challenge for Banks;--Advantage for Clients;--Advantage for Banks;Risk for Banks;Assessment";
         var module = "Application Programming Interfaces (API)";
         var hours = "1.0";
         //get date
         var d = new Date();
         var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
         var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
         //get other values
         var todayis = days[d.getDay()]+", "+months[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear(); 
         ////////////////////////////
         var items = [];
         sym.checkyourknowledge = 0;
         sym.getSymbol("qaControls").getSymbol("next").play('0');
         sym.setVariable("totalpage", 0);
         sym.setVariable("p", 0);
         sym.setVariable("module", module);
         sym.setVariable("menu", menu);
         sym.setVariable("hours", hours);
         sym.setVariable("todayis", todayis);
         sym.setVariable("module", module);
         sym.setVariable("currentpage", 0);
         sym.setVariable("examineename", "");
         sym.setVariable("items", items);
         sym.setVariable("result", '');
         sym.setVariable("finish_result", '');
         sym.setVariable("pscore", 70);//passing score
         sym.setVariable("score", 0);//user's score
         sym.setVariable("passfail", "");
         sym.setVariable("statusqa", "incomplete");
         sym.setVariable("cert", 0);
         sym.setVariable("showcheck", 0);
         sym.setVariable("totalQuestions", 10);//total questions shown to the user
         sym.recheck = 0;
         //              question#  1    2    3    4    5    6    7    8    9    10   11  12   13   14   15   16   17   18   19   20   21   22   23   24   25
         var correctanswers = ["", "b", "c", "b", "a", "a", "c", "b", "b", "a", "b" ];
         var selectionlist = [""];
         var markslist = [""];
         sym.calculateScore = function () {
         	var totalScore = 0;
         	var numberOfQuestions = sym.getVariable("totalQuestions");
         	var passingscore = sym.getVariable("pscore");
         	for (var k = 1; k <= numberOfQuestions; k++){
         		if (selectionlist[k] == correctanswers[k]){
         			totalScore++;
         			markslist[k] = "c"+k;
         		}else{
         			markslist[k] = "w"+k;
         		}
         	}
         	var scoreAverage = totalScore / numberOfQuestions * 100;
         	scoreAveragePercentage = scoreAverage.toFixed(2) + "%";
         	sym.setVariable("score", scoreAverage);
         	var passfail = (scoreAverage >= passingscore) ? "pass" : "fail";
         	var statusqa = (scoreAverage >= passingscore) ? "completed" : "incomplete";
         	sym.setVariable("passfail", passfail);
         	sym.setVariable("statusqa", statusqa);
         	sym.setVariable("markslist", markslist);
         	console.log("Score: "+sym.getVariable("score"));
         	console.log("Pass/Fail: "+sym.getVariable("passfail"));
         	console.log("Status: "+sym.getVariable("statusqa"));
         }
         
         sym.next = function () {
         	//retrieve variables required for page transition
         	var myCurrentPage = sym.getVariable("currentpage");
         	var myTotalPage = sym.getVariable("totalpage");
         	sym.recheck = 0;
         
         	//reset currentQnIndex after user finishes QA 
         	if (myCurrentPage == 3) {
         		currentQnIndex = 0;
         	}
         	//user is at last question of SOLUTION, send user to "thank you" page
         	if (myCurrentPage == qnPages[qnPages.length - 1] && sym.getVariable("showcheck") != 0){
         		sym.JumpTo("thanks");
         	}
         	else if (myCurrentPage < myTotalPage) { 
         		//last question
         		if (myCurrentPage == qnPages[qnPages.length - 1]) {
         			currentQnIndex++;
         			myCurrentPage = myTotalPage - 1;
         		}
         		//page 2 or 3
         		else if (myCurrentPage == 2 || myCurrentPage == 3) {
         			myCurrentPage = qnPages[0];
         		}
         		//question pages (eg. 15 pages 4-13)
         		else if (myCurrentPage >= 4 && myCurrentPage <= myTotalPage-2) {
         			currentQnIndex++;
         			myCurrentPage = qnPages[currentQnIndex];
         		}
         		else {
         			myCurrentPage += 1; // increment pagenumber
         		}
         		sym.play(myCurrentPage + ""); //change page
         		sym.setVariable("currentpage", myCurrentPage); //set global variables
         	}
         	setControlButtons();
         }
         sym.previous = function () {
         	var myCurrentPage = sym.getVariable("currentpage");
         	var myTotalPage = sym.getVariable("totalpage");
         
         	if (myCurrentPage > 1) {
         		//first question
         		if (myCurrentPage == qnPages[0]) {	
         			if (sym.getVariable('showcheck') == 1) {
         				myCurrentPage=myTotalPage;
         			} 
         		}
         		//question pages (eg. 15 pages 4-13)
         		else if (myCurrentPage >= 4 && myCurrentPage <= myTotalPage - 1) {
         			currentQnIndex--;
         			myCurrentPage = qnPages[currentQnIndex];
         		}
         		else {
         			myCurrentPage--; // decrement pagenumber
         		}
         		sym.play(myCurrentPage + ""); //change page
         		sym.setVariable("currentpage", myCurrentPage); //set global variables
         	}
         	setControlButtons();
         }
         
         function setControlButtons() {
         	//question pages (eg. 15 pages 4-13)
         	var myCurrentPage = sym.getVariable("currentpage");
         	var myTotalPage = sym.getVariable("totalpage");
         
         	//page1, page 3, last page
         	if (myCurrentPage == 1 || myCurrentPage == 3 || myCurrentPage == myTotalPage) {
         		sym.getSymbol("qaControls").getSymbol("next").play('0');
         		sym.getSymbol("qaControls").getSymbol("previous").play('3');
         	}
         	//page 2
         	else if (myCurrentPage == 2) {
         		sym.getSymbol("qaControls").getSymbol("next").play('3');
         		sym.getSymbol("qaControls").getSymbol("previous").play('2');
         	}
         
         	//first qns 
         	else if (myCurrentPage == qnPages[0]) {
         		if (sym.getVariable('showcheck') == 0) {
         			sym.getSymbol("qaControls").getSymbol("next").play('0');
         			sym.getSymbol("qaControls").getSymbol("previous").play('3');
         		} else {
         			sym.getSymbol("qaControls").getSymbol("next").play('0');
         			sym.getSymbol("qaControls").getSymbol("previous").play('2');
         		}
         	}
         	//last qn
         	else if (myCurrentPage == qnPages[qnPages.length-1]) {
         		if (sym.getVariable('showcheck') == 0) {
         			sym.getSymbol("qaControls").getSymbol("next").play('0');
         			sym.getSymbol("qaControls").getSymbol("previous").play('2');
         		} else {
         			sym.getSymbol("qaControls").getSymbol("next").play('0');
         			sym.getSymbol("qaControls").getSymbol("previous").play('2');
         		}
         	}
         	//normal qn (excluding first and last)
         	else if (myCurrentPage >= 4 && myCurrentPage <= myTotalPage - 2){
         		sym.getSymbol("qaControls").getSymbol("next").play('0');
         		sym.getSymbol("qaControls").getSymbol("previous").play('2');
         	}
         
         	//2nd last page (with finish button)
         	else if (myCurrentPage == myTotalPage-1) {
         		sym.getSymbol("qaControls").getSymbol("next").play('3');
         		sym.getSymbol("qaControls").getSymbol("previous").play('2');
         	}
         
         	//set DYNAMIC question number
         	var tempIndex =currentQnIndex+1;
         
         		if (tempIndex == 10)
         		{
         		sym.$('qnum').html("Question&nbsp;&nbsp;<span style='color:#FFFFFF'>"+tempIndex + "</span>&nbsp;&nbsp;of 10");
         		}
         	else
         		{
         		sym.$('qnum').html("Question&nbsp;&nbsp;&nbsp;<span style='color:#FFFFFF'>"+tempIndex + "</span>&nbsp;&nbsp;&nbsp;of 10");
         		}
         
         
         }
         sym.taker = function (xname) {
         	var examineeName = xname;
         	sym.setVariable("examineename", examineeName);
         }
         sym.printPage = function (btn) {
         	w = window.open('', 'PRINT', 'height=1200,width=700');
         	w.document.write($(btn).html()).onload;
         	w.print();
         	w.close();
         }
         sym.JumpTo = function (page) {
         	//retrieve variables required for page transition
         	var myCurrentPage = page;
         	sym.$("qaControls").show();
         	var myTotalPage = sym.getVariable("totalpage");
         	sym.recheck = 0;
         	sym.getSymbol("qaControls").getSymbol("previous").play('0');
         	sym.play(myCurrentPage + ""); //change page
         	sym.setVariable("currentpage", myCurrentPage); //set global variables
         
         }
         
         sym.getParameterByName = function (name, url) {
         	if (!url) url = window.location.href;
         	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
         		results = regex.exec(url);
         	if (!results) return null;
         	if (!results[2]) return '';
         	return decodeURIComponent(results[2]);
         }
         //get data from database
         //examinee
         sym.sname = sym.getParameterByName("sname");
         //username
         sym.uname = sym.getParameterByName("uname");
         //passing score
         sym.ppscore = sym.getParameterByName("score");
         if(sym.ppscore !== "" && sym.ppscore != null && sym.ppscore != undefined){
         	sym.setVariable("pscore", sym.ppscore);
         }
         
         //sym.epages = sym.getParameterByName("epages"); 
         //if(!sym.epages)
         sym.epages = "00|00";
         sym.thepages = sym.epages.split("|");
         sym.cpage = parseInt(sym.thepages[0]);
         sym.tpage = parseInt(sym.thepages[1]);
         sym.resumeModule = function () {
         	var ssidcpage = sym.cpage
         	return (ssidcpage)
         }
         var qnPages = [];
         var currentQnIndex = 0;
         
         
         sym.openQA = function() {
         	var page = sym.cpage;
         	if (!page) {
         		sym.SetDefault(1, 15);
         		sym.JumpTo(3);
         
         		var thename = sym.sname;
         		var myname = thename;
         		if(myname==null){
         			myname ="";
         		}
         		var x = sym.getVariable("currentpage");
         		sym.taker(myname);
         		sym.getSymbol("name").$("name").html("Examinee: " + myname);
         		sym.setVariable("showcheck",0);//set global variables
         
         	} else {
         		sym.SetDefault(page, sym.tpage);
         		sym.JumpTo(0);
         	}
         
         	//create randomized question order
         	for (i = 4; i < sym.getVariable('totalpage') - 1; i++) {
         		qnPages.push(i);
         	}
         	shuffle(qnPages);
         }
         
         sym.setVariable("shuffledArray",qnPages);
         function shuffle(o) {
         	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
         	return o;
         };
         sym.SetDefault = function (c, t) {
         	sym.setVariable("currentpage", c);
         	sym.setVariable("totalpage", t);
         }
         sym.addTestItem = function (item) {
         		selectionlist[item.question] = item.answer;
         }
         
         
         function dragMoveListener(event) {
         	var target = event.target,
         		// keep the dragged position in the data-x/data-y attributes
         		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
         		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
         	// translate the element
         	target.style.webkitTransform =
         		target.style.transform =
         		'translate(' + x + 'px, ' + y + 'px)';
         
         	// update the posiion attributes
         	target.setAttribute('data-x', x);
         	target.setAttribute('data-y', y);
         }
         // this is used later in the resizing and gesture demos
         window.dragMoveListener = dragMoveListener;
         
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1956, function(sym, e) {
         // insert code here
         sym.$("qaControls").hide();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("QA");
   //Edge symbol end:'QA'

   //=========================================================
   
   //Edge symbol: 'close_asse'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${closeasserec}", "mousedown", function(sym, e) {
         sym.$("close_asse_btn_click").show();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${closeasserec}", "mouseout", function(sym, e) {
         sym.$("close_asse_btn_click").hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${closeasserec}", "mouseup", function(sym, e) {
         sym.$("close_asse_btn_click").hide();

      });
      //Edge binding end

      

   })("close_asse");
   //Edge symbol end:'close_asse'

   //=========================================================
   
   //Edge symbol: 'page9'
   (function(symbolName) {   
   
      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{	
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 44, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':6,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':6,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':6,'answer':'c'});

      });
      //Edge binding end

      

   })("page9");
   //Edge symbol end:'page9'

   //=========================================================
   
   //Edge symbol: 'page6'
   (function(symbolName) {   
   
      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 48, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':3,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':3,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':3,'answer':'c'});

      });
      //Edge binding end

      

   })("page6");
   //Edge symbol end:'page6'

   //=========================================================
   
   //Edge symbol: 'page2new'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         //create input fields depending on whether student is present or not and if QA is viewed offline or online...
         var fullnameholder = sym.getSymbol("examineename").$("nameholder");
         inputFname = $('<input />').attr({'type':'text', 'value':'', 'id':'fullname', 'name':'fullname', 'class':'fullname', 'style':'box-sizing:border-box;width:258px;height:19px;line-height:19px;padding-left:5px;background-color:transparent;border:none;outline:none;'});
         inputFname.appendTo(fullnameholder);
         
         var firstnameholder = sym.getSymbol("firstlastname").$("fnameholder");
         inputFiname = $('<input />').attr({'type':'text', 'value':'', 'id':'firstname', 'name':'firstname', 'class':'firstname', 'style':'box-sizing:border-box;width:168px;height:19px;line-height:19px;padding-left:5px;background-color:transparent;border:none;outline:none;'});
         inputFiname.appendTo(firstnameholder);
         
         var lastnameholder = sym.getSymbol("firstlastname").$("lnameholder");
         inputLaname = $('<input />').attr({'type':'text', 'value':'', 'id':'lastname', 'name':'lastname', 'class':'lastname', 'style':'box-sizing:border-box;width:168px;height:19px;line-height:19px;padding-left:5px;background-color:transparent;border:none;outline:none;'});
         inputLaname.appendTo(lastnameholder);
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${begin}", "click", function(sym, e) {
         var myname = "";
         var thename = sym.getComposition().getStage().sname;
         var firstname = document.getElementById("firstname").value;
         var lastname = document.getElementById("lastname").value;
         var fullname = document.getElementById("fullname").value;
         if(thename === ""){
         	myname = firstname+" "+lastname;
         }else if(thename === undefined || thename === null){
         	myname = fullname;
         }else{
         	myname = thename;
         }
         
         var x = sym.getComposition().getStage().getVariable("currentpage");
         sym.getComposition().getStage().taker(myname);
         sym.getComposition().getStage().setVariable("showcheck",0);//set global variables
         var stage = sym.getParentSymbol();
         var sym2 = stage.getSymbol("name");
         sym2.$("name").html("Examinee: " + myname);
         if(sym.checkfirstlast){
         	if(firstname.length<2){
         		alert("Please enter your first name!");
         	}else if(lastname.length<2){
         		alert("Please enter your last name!");
         	}else if(myname == "" || myname.length < 5){
         		alert("Please enter your first and last names for your certificate!");
         	}else if(x == 2){
         		sym.getComposition().getStage().next();
         		//sym.getComposition().getStage().JumpTo(4);
         	}
         }else{
         	if(x == 2){
         		sym.getComposition().getStage().next();
         		//sym.getComposition().getStage().JumpTo(4);
         	}
         }
         /*if((myname == "" || myname.length < 5) && thename === ""){
         	alert("Please enter your first and last names for your certificate!");
         }else{
         	if(x == 2){
         		sym.getComposition().getStage().next();
         	}
         }*/
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var thename = sym.getComposition().getStage().sname;
         if(thename === ""){
         	sym.play('3');
         }else if(thename === undefined || thename === null){
         	sym.play('2');
         }else{
         	sym.stop();
         }
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 67, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 168, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 196, function(sym, e) {
         sym.checkfirstlast=true;

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 267, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page2new");
   //Edge symbol end:'page2new'

   //=========================================================
   
   //Edge symbol: 'page11'
   (function(symbolName) {   
   
      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 48, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':8,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':8,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':8,'answer':'c'});

      });
      //Edge binding end

      

   })("page11");
   //Edge symbol end:'page11'

   //=========================================================
   
   //Edge symbol: 'page14'
   (function(symbolName) {   
   
      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.$("btn1").hide();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 400, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         // insert code to be run when the symbol is created here
         sym.$('text').html('<p style="margin: 0px;">&#8203;<span style="font-size: 24px;">When you are done, click on "Finish" to view your score. You need at least a score of <span style="color:#000000; padding: 3px;">70%</span> to pass the assessment.</span></p>')
         
         
         sym.$("hoverEf").css({
         	"opacity":"0",
         	"transition":"0.4s"
         });
         
         sym.$("finishtBtn").hover(function(){
         	sym.$(this).css({"cursor":"pointer"});
         	sym.$("hoverEf").css({"opacity":"0.3"});
         },function(){
         	sym.$(this).css({"cursor":"auto"});
         	sym.$("hoverEf").css({"opacity":"0"});
         }).click(function(){
         	sym.getParentSymbol().setVariable("showcheck",1);//set global variables
         	var xxxx = sym.getParentSymbol().getVariable("showcheck");//set global variables
         	var items = sym.getParentSymbol().getVariable("items");
         
         	sym.getParentSymbol().calculateScore();
         	sym.getParentSymbol().next();
         
         }).attr({
         	"role":"button",
         	"aria-label":"Finish"
         }).on('focus', function() {
         	 $(this).on('keypress', function(event) {
         		  if(event.which === 13) {
         				sym.getParentSymbol().setVariable("showcheck",1);//set global variables
         				var xxxx = sym.getParentSymbol().getVariable("showcheck");//set global variables
         				var items = sym.getParentSymbol().getVariable("items");
         
         				sym.getParentSymbol().calculateScore();
         				sym.getParentSymbol().next();
         		  }
         	 });
         });
         

      });
      //Edge binding end

   })("page14");
   //Edge symbol end:'page14'

   //=========================================================
   
   //Edge symbol: 'page5'
   (function(symbolName) {   
   
      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 37, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':2,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':2,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':2,'answer':'c'});

      });
      //Edge binding end

      

   })("page5");
   //Edge symbol end:'page5'

   //=========================================================
   
   //Edge symbol: 'page4'
   (function(symbolName) {   
   
      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 110, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':1,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':1,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':1,'answer':'c'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${d}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(233, 186, 0)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':1,'answer':'d'});
         

      });
      //Edge binding end

   })("page4");
   //Edge symbol end:'page4'

   //=========================================================
   
   //Edge symbol: 'certi'
   (function(symbolName) {   
   
      

      

      

   })("certi");
   //Edge symbol end:'certi'

   //=========================================================
   
   //Edge symbol: 'page3'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 3)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

   })("page3");
   //Edge symbol end:'page3'

   //=========================================================
   
   //Edge symbol: 'page7'
   (function(symbolName) {   
   
      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 42, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         var showcheck = sym.getParentSymbol().getVariable("showcheck");
         
         if(showcheck == 0){
         	sym.$("check").hide();
         	sym.$("cover").hide();
         }else{
         	sym.$("check").show();
         	sym.$("cover").show();
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${a}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(233, 186, 0)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':4,'answer':'a'});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${b}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(233, 186, 0)');
         sym.$("c").css('background-color', 'rgb(191,191,191)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':4,'answer':'b'});
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${c}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.$("a").css('background-color', 'rgb(191,191,191)');
         sym.$("b").css('background-color', 'rgb(191,191,191)');
         sym.$("c").css('background-color', 'rgb(233, 186, 0)');
         sym.$("d").css('background-color', 'rgb(191,191,191)');
         
         //set answer
         sym.getParentSymbol().addTestItem({'question':4,'answer':'c'});

      });
      //Edge binding end

      

   })("page7");
   //Edge symbol end:'page7'

   //=========================================================
   
   //Edge symbol: 'name'
   (function(symbolName) {   
   
   })("name");
   //Edge symbol end:'name'

   //=========================================================
   
   //Edge symbol: 'firstlastname_1'
   (function(symbolName) {   
   
   })("firstlastname_1");
   //Edge symbol end:'firstlastname_1'

   //=========================================================
   
   //Edge symbol: 'examineename_1'
   (function(symbolName) {   
   
   })("examineename_1");
   //Edge symbol end:'examineename_1'

   //=========================================================
   
   //Edge symbol: 'qaBackground'
   (function(symbolName) {   
   
   })("qaBackground");
   //Edge symbol end:'qaBackground'

   //=========================================================
   
   //Edge symbol: 'Controls_1'
   (function(symbolName) {   
   
      

      

      

   })("Controls_1");
   //Edge symbol end:'Controls_1'

   //=========================================================
   
   //Edge symbol: 'printericon'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1141, function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

   })("printericon");
   //Edge symbol end:'printericon'

   //=========================================================
   
   //Edge symbol: 'next_5'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_next}", "click", function(sym, e) {
         sym.getParentSymbol().getParentSymbol().next();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.getParentSymbol().$('next').show();
         sym.myup="0";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1069, function(sym, e) {
         sym.getParentSymbol().$('next').show();
         sym.myup="2";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1137, function(sym, e) {
         
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1349, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1438, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseup", function(sym, e) {
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mousedown", function(sym, e) {
         sym.play('click');

      });
      //Edge binding end

      

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("nextBtn").append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17"><defs><clipPath id="b"><rect width="17" height="17"/></clipPath></defs><g id="a" clip-path="url(#b)"><path d="M12,15H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0h9a3,3,0,0,1,3,3v9A3,3,0,0,1,12,15ZM10,4.167h0L4.167,7.5,10,10.834V4.167Z" transform="translate(16.001 16.001) rotate(180)" fill="#fff"/></g></svg>');
         

      });
      //Edge binding end

   })("next_5");
   //Edge symbol end:'next_5'

   //=========================================================
   
   //Edge symbol: 'print'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${Rectangle3}", "mouseover", function(sym, e) {
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle3}", "mouseout", function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 71, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 184, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 302, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("print");
   //Edge symbol end:'print'

   //=========================================================
   
   //Edge symbol: 'previous_5'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "click", function(sym, e) {
         sym.getParentSymbol().getParentSymbol().previous();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.getParentSymbol().$('previous').show();
         sym.myup="0";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.play('0');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1069, function(sym, e) {
         sym.getParentSymbol().$('previous').show();
         sym.myup="2";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1114, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1353, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1449, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      

      

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mousedown", function(sym, e) {
         sym.play('click');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_prev}", "mouseup", function(sym, e) {
         // insert code to be run when the mouse button is released
         sym.play('over');

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("prevBtn").append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17" height="17" viewBox="0 0 17 17"><defs><clipPath id="b"><rect width="17" height="17"/></clipPath></defs><g id="a" clip-path="url(#b)"><path d="M-7774-4429h-9a3,3,0,0,1-3-3v-9a3,3,0,0,1,3-3h9a3,3,0,0,1,3,3v9A3,3,0,0,1-7774-4429Zm-2-10.833-5.833,3.332,5.833,3.333v-6.665Z" transform="translate(7787 4445)" fill="#fff"/></g></svg>');

      });
      //Edge binding end

   })("previous_5");
   //Edge symbol end:'previous_5'

   //=========================================================
   
   //Edge symbol: 'menu_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1069, function(sym, e) {
         sym.getParentSymbol().$('next').show();
         sym.myup="2";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1137, function(sym, e) {
         
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1349, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1438, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_area}", "mouseup", function(sym, e) {
         sym.play('over');

      });
         //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_area}", "mousedown", function(sym, e) {
         sym.play('click');

      });
         //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.play('up');
         

      });
         //Edge binding end

      })("menuQA");
   //Edge symbol end:'menuQA'

   //=========================================================
   
   //Edge symbol: 'menu'
   (function(symbolName) {   
   
      

      

      

      

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.play('up');
         

      });
      //Edge binding end

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1069, function(sym, e) {
         sym.getParentSymbol().$('next').show();
         sym.myup="2";

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1137, function(sym, e) {
         
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1349, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1438, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseover", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('over');
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseout", function(sym, e) {
         if(sym.getPosition() < 1370){
         	//sym.play(sym.myup);
         	sym.play("2");
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mousedown", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('click');
         }
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${button_next}", "mouseup", function(sym, e) {
         if(sym.getPosition() < 1370){
         	sym.play('over');
         }
         

      });
      //Edge binding end

   })("menu");
   //Edge symbol end:'menu'

   //=========================================================
   
   //Edge symbol: 'page1contentintro_1'
   (function(symbolName) {   
   
      })("thanks");
   //Edge symbol end:'thanks'

   //=========================================================
   
   //Edge symbol: 'page4content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 67, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page4content");
   //Edge symbol end:'page4content'

   //=========================================================
   
   //Edge symbol: 'page5content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1024, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("Interfaces are part of a system to make the communication between two or more applica-tions possible. One software <a style='letter-spacing:-.5px;word-spacing:-1px;'>provides an API, and other soft-</a>wares can communicate with this software.");

      });
      //Edge binding end

   })("page5content");
   //Edge symbol end:'page5content'

   //=========================================================
   
   //Edge symbol: 'page6content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 67, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 167, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 271, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 347, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.playcount = 1;
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         sym.step3Visited = 0;
         sym.step4Visited = 0;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 89, function(sym, e) {
         sym.$("pageContent2").html("");
         
         sym.stepActive = 2;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 0;
         sym.step4Visited = 0;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 186, function(sym, e) {
         sym.$("pageContent2").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>The driver and passenger man-</a>agement or payment services are not developed or operated by Uber.");
         
         sym.stepActive = 3;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 1;
         sym.step4Visited = 0;
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 285, function(sym, e) {
         sym.$("pageContent2").html("Uber only provides data to the external service providers via APIs.");
         
         sym.stepActive = 4;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 1;
         sym.step4Visited = 1;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("Take a company like Uber. Ub-er's core business is to bring car drivers together with pas-<a style='letter-spacing:-.5px;word-spacing:-1px;'>sengers. The business model is</a> similar to the taxi industry, but Uber does not have taxis and drivers.");
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         sym.step3Visited = 0;
         sym.step4Visited = 0;
         
         sym.$('svgCap').append('<div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="139" height="22" viewBox="0 0 139 22"> <defs> <clipPath id="clip-stepBtn_max4"> <rect width="139" height="22"/> </clipPath> </defs> <g id="stepBtn_max4" clip-path="url(#clip-stepBtn_max4)"> <g id="step1_page8content" transform="translate(684 970)"> <path id="step1_bg_page8content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step1_border1_page8content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step1_border_page8content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step1_text_page8content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">1</tspan></text> </g> <g id="step2_page8content" transform="translate(711 970)"> <path id="step2_bg_page8content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step2_border1_page8content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step2_border_page8content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step2_text_page8content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">2</tspan></text> </g> <g id="step3_page8content" transform="translate(738 970)"> <path id="step3_bg_page8content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step3_border1_page8content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step3_border_page8content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step3_text_page8content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">3</tspan></text> </g> <g id="step4_page8content" transform="translate(765 970)"> <path id="step4_bg_page8content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step4_border1_page8content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step4_border_page8content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step4_text_page8content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">4</tspan></text> </g> <text class="Step" transform="translate(1 16)" font-size="14" font-family="ArialMT, Arial"><tspan x="0" y="0">Step</tspan></text> </g></svg></div>');

      });
      //Edge binding end

      

      

      

      

      

   })("page6content");
   //Edge symbol end:'page6content'

   //=========================================================
   
   //Edge symbol: 'page7content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.playcount = 1;
         sym.getSymbol("page7animate").play("1");
         sym.getSymbol("page7animate2").play("1");
         
         sym.$("text1").html("Other Software​Engineers");
         sym.$("text2").html("API Developers");
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         sym.step3Visited = 0;
         sym.step4Visited = 0;
         
         sym.getComposition().getStage().stepTheme();
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 551, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 582, function(sym, e) {
         sym.$("text1").html("Other Software​Engineers");
         sym.$("text2").html("API Developers");
         
         sym.getSymbol("page7animate2").play("1");
         //sym.$("pageContent").html("The API developers write a framework and give other soft- <span style='letter-spacing:-.5px;word-spacing:-1px;'>ware engineers <a id='p7hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>insight</a> into cer-</a><a style='letter-spacing:-.9px;word-spacing:-.1px;'>tain parts of their readable source</a> codes.");
         sym.$("pageContent2").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>A common practice is to write a</a> detailed documentation of the interface function on an elec-tronic document.");
         sym.$("pageContent2Copy").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>Common languages to transmit</a> <a style='letter-spacing:-.5px;word-spacing:-1px;'>messages across platforms are</a> XML or JSON (JavaScript Object Notation).");
         
         sym.stepActive = 2;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 0;
         sym.step4Visited = 0;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 804, function(sym, e) {
         sym.$("text1").html("API Developers");
         sym.$("text2").html("Portal");
         
         sym.getSymbol("page7animate").play("1");
         sym.getSymbol("page7animate2").play("1");
         //sym.$("pageContent").html("The API developers write a framework and give other soft- <span style='letter-spacing:-.5px;word-spacing:-1px;'>ware engineers <a id='p7hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>insight</a> into cer-</a><a style='letter-spacing:-.9px;word-spacing:-.1px;'>tain parts of their readable source</a> codes.");
         
         sym.$("pageContent2").html("APIs then act like messengers. <a style='letter-spacing:-.6px;word-spacing:-1px;'>They take the requests and send</a> the responses back to Uber's portal.");
         
         sym.stepActive = 3;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 1;
         sym.step4Visited = 0;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 956, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2024, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${trig1}", "click", function(sym, e) {
         sym.getSymbol("page7animate").play("2");
         sym.$("trig1").hide();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.$("text1").html("API Developers");
         sym.$("text2").html("Portal");
         //sym.$("pageContent").html("The API developers write a framework and give other soft- <span style='letter-spacing:-.5px;word-spacing:-1px;'>ware engineers <a id='p7hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>insight</a> into cer-</a><a style='letter-spacing:-.9px;word-spacing:-.1px;'>tain parts of their readable source</a> codes.");
         
         sym.$("pageContent2").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>Thanks to API, Uber has no soft-</a>ware development costs and can operate flexible to market requirements.");
         
         sym.stepActive = 4;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 1;
         sym.step4Visited = 1;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      

      

      

      

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         sym.step3Visited = 0;
         sym.step4Visited = 0;
         
         sym.$('svgCap').append('<div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="139" height="22" viewBox="0 0 139 22"> <defs> <clipPath id="clip-stepBtn_max4"> <rect width="139" height="22"/> </clipPath> </defs> <g id="stepBtn_max4" clip-path="url(#clip-stepBtn_max4)"> <g id="step1_page9content" transform="translate(684 970)"> <path id="step1_bg_page9content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step1_border1_page9content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step1_border_page9content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step1_text_page9content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">1</tspan></text> </g> <g id="step2_page9content" transform="translate(711 970)"> <path id="step2_bg_page9content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step2_border1_page9content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step2_border_page9content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step2_text_page9content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">2</tspan></text> </g> <g id="step3_page9content" transform="translate(738 970)"> <path id="step3_bg_page9content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step3_border1_page9content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step3_border_page9content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step3_text_page9content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">3</tspan></text> </g> <g id="step4_page9content" transform="translate(765 970)"> <path id="step4_bg_page9content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step4_border1_page9content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step4_border_page9content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step4_text_page9content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">4</tspan></text> </g> <text class="Step" transform="translate(1 16)" font-size="14" font-family="ArialMT, Arial"><tspan x="0" y="0">Step</tspan></text> </g></svg></div>');
         
         sym.$("pageContent").html("The API developers write a framework and give other soft- <span style='letter-spacing:-.5px;word-spacing:-1px;'>ware engineers <a class='link1' id='p7hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>insight</a> into cer-</a><a style='letter-spacing:-.9px;word-spacing:-.1px;'>tain parts of their readable source</a> codes.");
         
         sym.$(p7hover1).mouseover(function(){
               sym.$(p7hover1).css("opacity", ".7");
               sym.$(p7hover1).css('cursor','pointer');
               sym.$("hovertext").show();
         }); 
         
         sym.$(p7hover1).mouseout(function(){
              sym.$(p7hover1).css("opacity", "1");
              sym.$("hovertext").hide();
         
         });

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1800, function(sym, e) {
         sym.playcount = 1;
         
         sym.getSymbol("P6TV-Animate").play("1");
         sym.getSymbol("P6Doc-Animate").play("1");
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         
         sym.getComposition().getStage().stepTheme();
         
         sym.$("subtext2").html("");

      });
      //Edge binding end

   })("page7content");
   //Edge symbol end:'page7content'

   //=========================================================
   
   //Edge symbol: 'page7animate'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 526, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("hover").html("<a id='p7hover2' style='color:#000;' href='http://api.uber.com/' target='_blank'>http://api.uber.com</a>");
         
         sym.$(p7hover2).mouseover(function(){
               sym.$(p7hover2).css("color", "#ffcc00");
               sym.$(p7hover2).css('cursor','pointer');
         }); 
         
         sym.$(p7hover2).mouseout(function(){
              sym.$(p7hover2).css("color", "#ffffff");
         });

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${hover}", "mouseover", function(sym, e) {
         sym.$("hover").css("color","#ffcc00");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${hover}", "mouseout", function(sym, e) {
         sym.$("hover").css("color","#ffffff");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p7leftimg}", "click", function(sym, e) {
         sym.playReverse("rev");
         sym.getParentSymbol("page7content").$("trig1").show();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 165, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page7animate");
   //Edge symbol end:'page7animate'

   //=========================================================
   
   //Edge symbol: 'page7animate2'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.play("1");

      });
      //Edge binding end

   })("page7animate2");
   //Edge symbol end:'page7animate2'

   //=========================================================
   
   //Edge symbol: 'page8content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.playcount = 1;
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         sym.step3Visited = 0;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${prevarrow}", "click", function(sym, e) {
         sym.playcount--;
         sym.play(sym.playcount+"");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${prevarrow}", "mouseover", function(sym, e) {
         sym.$("prevarrow").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${prevarrow}", "mouseout", function(sym, e) {
         sym.$("prevarrow").css("opacity","0.7");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nextarrow}", "click", function(sym, e) {
         sym.playcount++;
         sym.play(sym.playcount+"");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nextarrow}", "mouseover", function(sym, e) {
         sym.$("nextarrow").css("opacity", "1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nextarrow}", "mouseout", function(sym, e) {
         sym.$("nextarrow").css("opacity", "0.7");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 617, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("The presence of a well-docu-mented API can provide sig-nificant competitive advantage <a style='letter-spacing:-.6px;word-spacing:-1px;'>because other programmers can</a> reuse codes and create addi- <a style='letter-spacing:-.5px;word-spacing:-1px;'>tional software features for desk-</a> tops and mobile apps.");
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         sym.step3Visited = 0;
         
         sym.$('svgCap').append('<div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="112" height="22" viewBox="0 0 112 22"> <defs> <clipPath id="clip-stepBtn_max3"> <rect width="112" height="22"/> </clipPath> </defs> <g id="stepBtn_max3" clip-path="url(#clip-stepBtn_max3)"> <g id="step1_page10content" transform="translate(684 970)"> <path id="step1_bg_page10content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step1_border1_page10content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step1_border_page10content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step1_text_page10content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">1</tspan></text> </g> <g id="step2_page10content" transform="translate(711 970)"> <path id="step2_bg_page10content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step2_border1_page10content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step2_border_page10content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step2_text_page10content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">2</tspan></text> </g> <g id="step3_page10content" transform="translate(738 970)"> <path id="step3_bg_page10content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step3_border1_page10content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step3_border_page10content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step3_text_page10content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">3</tspan></text> </g> <text class="Step" transform="translate(1 16)" font-size="14" font-family="ArialMT, Arial"><tspan x="0" y="0">Step</tspan></text> </g></svg></div>');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1799, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1967, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 674, function(sym, e) {
         sym.$("pageContent2").html("For example you book a flight on a website and the website searches for the best available flight.");
         
         sym.stepActive = 2;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 0;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1842, function(sym, e) {
         sym.$("pageContent2").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>API developers from all over the</a> world code Apps and have the <a style='letter-spacing:-.5px;word-spacing:-1px;'>possibilities to share features of</a> other programmes.");
         sym.$("pageContent2Copy2").html("For example, online pre-order services on your App for duty-free purchases.");
         
         sym.stepActive = 3;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 1;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 582, function(sym, e) {
         
         sym.getSymbol("page7animate2").play("1");
         sym.$("pageContent").html("The API developers write a framework and give other soft- <span style='letter-spacing:-.5px;word-spacing:-1px;'>ware engineers <a id='p7hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>insight</a> into cer-</a><a style='letter-spacing:-.9px;word-spacing:-.1px;'>tain parts of their readable source</a> codes.");
         sym.$("pageContent2").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>A common practice is to write a</a> detailed documentation of the interface function on an elec-tronic document.");
         sym.$("pageContent2Copy").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>Common languages to transmit</a> <a style='letter-spacing:-.5px;word-spacing:-1px;'>messages across platforms are</a> XML or JSON (JavaScript Object Notation).");

      });
      //Edge binding end

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1400, function(sym, e) {
         sym.playcount = 1;
         
         sym.getSymbol("P6TV-Animate").play("1");
         sym.getSymbol("P6Doc-Animate").play("1");
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         
         sym.getComposition().getStage().stepTheme();
         
         sym.$("subtext2").html("");

      });
      //Edge binding end

   })("page8content");
   //Edge symbol end:'page8content'

   //=========================================================
   
   //Edge symbol: 'page9content'
   (function(symbolName) {   
   
      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2800, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 11)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("Rectangle").css("box-shadow","19px 29px 29px 0px rgba(0,0,0,0.16)");

      });
      //Edge binding end

   })("page9content");
   //Edge symbol end:'page9content'

   //=========================================================
   
   //Edge symbol: 'page10content'
   (function(symbolName) {   
   
      

      

      

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1046, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1200, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1667, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2263, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1105, function(sym, e) {
         sym.stepActive = 2;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 0;
         sym.step4Visited = 0;
         
         sym.getComposition().getStage().stepTheme();
         
         sym.$("pageContent2Copy").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>Banks have to share transaction</a> data with third party providers (TPP).");
         
         sym.$("pg10_sym1pic1").css({
         	"z-index":"-1"
         });
         sym.getSymbol("pg10_sym1pic1").play('1');
         sym.getSymbol("pg10_sym1pic1").getSymbol("pg10_sym2pic1").play('1');
         
         
         
         ///////////////////////////////////////////
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1246, function(sym, e) {
         sym.stepActive = 3;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 1;
         sym.step4Visited = 0;
         
         sym.getComposition().getStage().stepTheme();
         
         sym.$("pageContent2").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>In North America and Asia, there</a> are no mandatory regulations about open bank data. How-ever, competition with the Big Techs, has increased pressure to invest in APIs.");
         
         sym.getSymbol("pg10_num3pic1").play('1');
         sym.getSymbol("pg10_num3pic1").getSymbol("pg10_num3_inside").play('1');
         
         sym.getSymbol("pg10_num3pic2").play('1');
         sym.getSymbol("pg10_num3pic2").getSymbol("pg10_num3pic2_inside").play('1');

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("The opening of data for exter-nal parties (such as Fintechs) <a style='letter-spacing:-.6px;word-spacing:-1px;'>will significantly change the land-</a> scape and business model of banks.");
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         sym.step3Visited = 0;
         
         sym.$('svgCap').append('<div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="139" height="22" viewBox="0 0 139 22"> <defs> <clipPath id="clip-stepBtn_max4"> <rect width="139" height="22"/> </clipPath> </defs> <g id="stepBtn_max4" clip-path="url(#clip-stepBtn_max4)"> <g id="step1_page12content" transform="translate(684 970)"> <path id="step1_bg_page12content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step1_border1_page12content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step1_border_page12content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step1_text_page12content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">1</tspan></text> </g> <g id="step2_page12content" transform="translate(711 970)"> <path id="step2_bg_page12content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step2_border1_page12content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step2_border_page12content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step2_text_page12content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">2</tspan></text> </g> <g id="step3_page12content" transform="translate(738 970)"> <path id="step3_bg_page12content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step3_border1_page12content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step3_border_page12content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step3_text_page12content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">3</tspan></text> </g> <g id="step4_page12content" transform="translate(765 970)"> <path id="step4_bg_page12content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step4_border1_page12content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step4_border_page12content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step4_text_page12content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">4</tspan></text> </g> <text class="Step" transform="translate(1 16)" font-size="14" font-family="ArialMT, Arial"><tspan x="0" y="0">Step</tspan></text> </g></svg></div>');
         
         sym.$("pageContent2a").html("A trigger point for the new dig-ital development is, for exam-ple, the <a class='link1' id='p10hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>PSD2 directive</a> for EU banks or the Open Banking in-itiative in the UK.");
         
         sym.$(p10hover1).mouseover(function(){
               sym.$(p10hover1).css("opacity", ".7");
               sym.$(p10hover1).css('cursor','pointer');
               sym.$("hover").show();
         }); 
         
         sym.$(p10hover1).mouseout(function(){
              sym.$(p10hover1).css("opacity", "1");
              sym.$("hover").hide();
         });

      });
      //Edge binding end

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.playcount = 1;
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         sym.step3Visited = 0;
         sym.step4Visited = 0;
         
         sym.getComposition().getStage().stepTheme();
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2143, function(sym, e) {
         sym.stepActive = 4;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         sym.step3Visited = 1;
         sym.step4Visited = 1;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

   })("page10content");
   //Edge symbol end:'page10content'

   //=========================================================
   
   //Edge symbol: 'page11content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 129, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page11content");
   //Edge symbol end:'page11content'

   //=========================================================
   
   //Edge symbol: 'page12content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 107, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 267, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 418, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 578, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 715, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group}", "click", function(sym, e) {
         sym.play("2");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group}", "mouseover", function(sym, e) {
         sym.$(p12hover1).css("opacity",".70");
         sym.$("greentriangle1").hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group}", "mouseout", function(sym, e) {
         sym.$(p12hover1).css("opacity","1");
         sym.$("greentriangle1").show();
         

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("p12hover1").html("<a class='link1' id='p12hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>Private APIs</a>");
         sym.$("p12hover2").html("<a class='link1' id='p12hover2' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>Partner APIs</a>");
         sym.$("p12hover3").html("<a class='link1' id='p12hover3' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>Public APIs</a>");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover1}", "mouseover", function(sym, e) {
         sym.$(p12hover1).css("opacity",".70");
         sym.$("greentriangle1").hide();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover1}", "mouseup", function(sym, e) {
         sym.$(p12hover1).css("opacity",".70");
         sym.$("greentriangle1").hide();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover2}", "mouseover", function(sym, e) {
         sym.$(p12hover2).css("opacity",".70");
         sym.$("greentriangle2").hide();
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover2}", "mouseout", function(sym, e) {
         sym.$(p12hover2).css("opacity",".70");
         sym.$("greentriangle2").hide();
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover3}", "mouseover", function(sym, e) {
         sym.$(p12hover3).css("opacity",".70");
         sym.$("greentriangle3").hide();
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover3}", "mouseout", function(sym, e) {
         sym.$(p12hover3).css("opacity",".70");
         sym.$("greentriangle3").hide();
         
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group2}", "click", function(sym, e) {
         sym.play("3");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group2}", "mouseover", function(sym, e) {
         sym.$(p12hover2).css("opacity",".70");
         sym.$("greentriangle2").hide();
         
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group2}", "mouseout", function(sym, e) {
         sym.$(p12hover2).css("opacity","1");
         sym.$("greentriangle2").show();
         
         
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group3}", "click", function(sym, e) {
         sym.play("4");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group3}", "mouseover", function(sym, e) {
         sym.$(p12hover3).css("opacity",".70");
         sym.$("greentriangle3").hide();
         
         
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group3}", "mouseout", function(sym, e) {
         sym.$(p12hover3).css("opacity","1");
         sym.$("greentriangle3").show();
         
         
         
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${trig}", "click", function(sym, e) {
         sym.play("5");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.$(p12hover1).css("opacity","1");
         sym.$("greentriangle1").show();
         sym.$(p12hover2).css("opacity","1");
         sym.$("greentriangle2").show();
         sym.$(p12hover3).css("opacity","1");
         sym.$("greentriangle3").show();
         
         
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 124, function(sym, e) {
         sym.$(p12hover1).css("opacity",".70");
         sym.$("greentriangle1").hide();
         sym.$(p12hover2).css("opacity","1");
         sym.$("greentriangle2").show();
         sym.$(p12hover3).css("opacity","1");
         sym.$("greentriangle3").show();
         
         sym.$("pageContent2").html("<span style='letter-spacing:0.5px'>Private APIs increase the data transfers within a bank unit. Private APIs are useful in integrating internal IT systems or in creating customer facing apps. External parties have no access.</span>");
         
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 284, function(sym, e) {
         sym.$(p12hover1).css("opacity","1");
         sym.$("greentriangle1").show();
         sym.$(p12hover2).css("opacity",".70");
         sym.$("greentriangle2").hide();
         sym.$(p12hover3).css("opacity","1");
         sym.$("greentriangle3").show();
         
         sym.$("pageContent2").html("<a style='word-spacing:0.8px;'>Banks cooperate with selected partners to</a> optimize processes in certain business fields (Fintechs).");
         
         
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 435, function(sym, e) {
         sym.$(p12hover1).css("opacity","1");
         sym.$("greentriangle1").show();
         sym.$(p12hover2).css("opacity","1");
         sym.$("greentriangle2").show();
         sym.$(p12hover3).css("opacity",".70");
         sym.$("greentriangle3").hide();
         
         sym.$("pageContent2").html("<span style='letter-spacing:0.5px'>Public or open APIs are made available for a wide range of external mobile developers. To get access, external developers have to register.</span>");
         
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 597, function(sym, e) {
         sym.$("pageContent2").html("Open APIs help to leverage platforms because the growing community of developers promote the development of innovative apps which add value to a range of bank products.");
         
         sym.$(p12hover1).css("opacity","1");
         sym.$("greentriangle1").show();
         sym.$(p12hover2).css("opacity","1");
         sym.$("greentriangle2").show();
         sym.$(p12hover3).css("opacity",".70");
         sym.$("greentriangle3").hide();
         
         
         
         
         

      });
      //Edge binding end

   })("page12content");
   //Edge symbol end:'page12content'

   //=========================================================
   
   //Edge symbol: 'page13content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 728, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page13content");
   //Edge symbol end:'page13content'

   //=========================================================
   
   //Edge symbol: 'page14content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("p14hover1").html("<a class='link1' id='p14hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>Integrator</a>");
         sym.$("p14hover2").html("<a class='link1' id='p14hover2' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>Producer</a>");
         sym.$("p14hover3").html("<a class='link1' id='p14hover3' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>Distributors</a>");
         
         sym.$("pageContent").html("<a style='letter-spacing:-.6px;word-spacing:-1px;'>From a bank's perspective, there</a> are three strategies:");
         
         sym.$("text1").html("Banks put their &quot;signs&quot; on apps or websites of third party providers, so that third parties can offer bank ser-vices (e.g. payments). Banks remain visible for end-users.<br><br><a style='letter-spacing:-.5px;word-spacing:-1px;'>E.g., retail shoppers purchase</a> and ask for loans by clicking on a loan button at checkout.");
         
         sym.$("pageContent2a").html("Banks distributing third parties services through its own distri-<a style='letter-spacing:-.5px;word-spacing:-1px;'>bution channels. Problem is that</a> <a style='letter-spacing:-.5px;word-spacing:-1px;'>banks want to use their <span class='link1' id='p14hover5' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>branding</span></a> on external products.");
         
         sym.$(p14hover5).mouseover(function(){
               sym.$(p14hover5).css("opacity", ".70");
               sym.$(p14hover5).css('cursor','pointer');
         }); 
         
         sym.$(p14hover5).mouseout(function(){
              sym.$(p14hover5).css("opacity", "1");
         });
         
         ///////////////////////////////////////////
         
         sym.$(p14hover5).click(function(){
         		sym.play("4");
         });
         
         ///////////////////////////////////////////

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 115, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1750, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4718, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group}", "click", function(sym, e) {
         sym.play("1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group}", "mouseover", function(sym, e) {
         sym.$(p14hover1).css("opacity",".70");
         sym.$("yellowtriangle1").hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group}", "mouseout", function(sym, e) {
         sym.$(p14hover1).css("opacity","1");
         sym.$("yellowtriangle1").show();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover1}", "mouseover", function(sym, e) {
         sym.$(p14hover1).css("opacity",".70");
         sym.$("yellowtriangle1").hide();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover1}", "mouseout", function(sym, e) {
         sym.$(p14hover1).css("opacity",".70");
         sym.$("yellowtriangle1").hide();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group2}", "click", function(sym, e) {
         sym.play("2");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group2}", "mouseover", function(sym, e) {
         sym.$(p14hover2).css("opacity",".70");
         sym.$("yellowtriangle2").hide();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group2}", "mouseout", function(sym, e) {
         sym.$(p14hover2).css("opacity","1");
         sym.$("yellowtriangle2").show();
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover2}", "mouseover", function(sym, e) {
         sym.$(p14hover2).css("opacity",".70");
         sym.$("yellowtriangle2").hide();
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover2}", "mouseout", function(sym, e) {
         sym.$(p14hover2).css("opacity",".70");
         sym.$("yellowtriangle2").hide();
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group3}", "click", function(sym, e) {
         sym.play("3");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group3}", "mouseover", function(sym, e) {
         sym.$(p14hover3).css("opacity",".70");
         sym.$("yellowtriangle3").hide();
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Group3}", "mouseout", function(sym, e) {
         sym.$(p14hover3).css("opacity","1");
         sym.$("yellowtriangle3").show();
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.$(p14hover1).css("opacity",".30");
         sym.$("yellowtriangle1").hide();
         sym.$(p14hover2).css("opacity","1");
         sym.$("yellowtriangle2").show();
         sym.$(p14hover3).css("opacity","1");
         sym.$("yellowtriangle3").show();
         
         sym.$("pageContent2").html("Banks distribute their products under their brand. The custom-<a style='letter-spacing:-.5px;word-spacing:-1px;'>er's UX experience is controlled</a> by the bank.");
         
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 132, function(sym, e) {
         sym.$(p14hover1).css("opacity","1");
         sym.$("yellowtriangle1").show();
         sym.$(p14hover2).css("opacity",".30");
         sym.$("yellowtriangle2").hide();
         sym.$(p14hover3).css("opacity","1");
         sym.$("yellowtriangle3").show();
         
         sym.$("pageContent2").html("Banks build partnerships with start up companies, so called Fin-techs, or third party provid-ers. Banks create the service, while third parties distribute the service to their customers.");
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1786, function(sym, e) {
         sym.$(p14hover1).css("opacity","1");
         sym.$("yellowtriangle1").show();
         sym.$(p14hover2).css("opacity","1");
         sym.$("yellowtriangle2").show();
         sym.$(p14hover3).css("opacity",".30");
         sym.$("yellowtriangle3").hide();
         
         
         
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover3}", "mouseover", function(sym, e) {
         sym.$(p14hover3).css("opacity",".70");
         sym.$("yellowtriangle3").hide();
         
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${cover3}", "mouseout", function(sym, e) {
         sym.$(p14hover3).css("opacity",".70");
         sym.$("yellowtriangle3").hide();
         
         
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3621, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page14content");
   //Edge symbol end:'page14content'

   //=========================================================
   
   //Edge symbol: 'page15content'
   (function(symbolName) {   
   
      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2800, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 17)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("Rectangle").css("box-shadow","19px 29px 29px 0px rgba(0,0,0,0.16)");
         
         

      });
      //Edge binding end

   })("page15content");
   //Edge symbol end:'page15content'

   //=========================================================
   
   //Edge symbol: 'page16content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("Making raw data available via APIs is a challenge for banks <a style='letter-spacing:-.5px;word-spacing:-1px;'>and other service providers. The</a> IT of many banks is currently <a style='letter-spacing:-.6px;word-spacing:-1px;'>mostly composed of many small-</a>scale applications.<br><br>​<a style='letter-spacing:-.5px;word-spacing:-1px;'>This causes compatibility issues</a> with IT architecture. ");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 113, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page16content");
   //Edge symbol end:'page16content'

   //=========================================================
   
   //Edge symbol: 'page17content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("<a style='letter-spacing:-.2px;word-spacing:-1px;'>When banks have to offer the public APIs,</a> <a style='word-spacing:7px;'>they have to look at two other topics:</a>");
         
         sym.$("c1").hide();
         sym.$("check").hide();
         
         sym.end=0;
         sym.end2=0;

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 102, function(sym, e) {
         if(sym.end == 1 && sym.end2 == 1){
         	sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         }else{
         	sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('2');
         
         }
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p17img1}", "click", function(sym, e) {
         sym.$("c1").show();
         sym.getComposition().getStage().JumpTo(20);
         
         sym.end=1;

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p17img2}", "click", function(sym, e) {
         sym.$("check").show();
         sym.getComposition().getStage().JumpTo(21);
         
         sym.end2=1;
         

      });
      //Edge binding end

   })("page17content");
   //Edge symbol end:'page17content'

   //=========================================================
   
   //Edge symbol: 'page18content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2600, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2793, function(sym, e) {
         sym.getComposition().getStage().getSymbol("Controls").getSymbol("next").play('0');
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p8img1}", "click", function(sym, e) {
         sym.play("2");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nextarrow}", "click", function(sym, e) {
         sym.play("2");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nextarrow}", "mouseover", function(sym, e) {
         sym.$("nextarrow").css("opacity", "1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${nextarrow}", "mouseout", function(sym, e) {
         sym.$("nextarrow").css("opacity", "0.7");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${prevarrow}", "click", function(sym, e) {
         sym.play("1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${prevarrow}", "mouseover", function(sym, e) {
         sym.$("prevarrow").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${prevarrow}", "mouseout", function(sym, e) {
         sym.$("prevarrow").css("opacity","0.7");

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         //sym.$("pageContent").html("API designs should be easy to-<a style='letter-spacing:-.5px;word-spacing:-1px;'>learn to attract many end users.</a> API developers only have one shot. Once an API is public, it is hard to make changes with-out impacting end-users.");
         //sym.$("pageContent").css("letter-spacing","-0.5px");
         
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         
         sym.$('svgCap').append('<div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="85" height="22" viewBox="0 0 85 22"> <defs> <clipPath id="clip-stepBtn_max2"> <rect width="85" height="22"/> </clipPath> </defs> <g id="stepBtn_max2" clip-path="url(#clip-stepBtn_max2)"> <g id="step1_page20content" transform="translate(684 970)"> <path id="step1_bg_page20content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step1_border1_page20content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step1_border_page20content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step1_text_page20content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">1</tspan></text> </g> <g id="step2_page20content" transform="translate(711 970)"> <path id="step2_bg_page20content" d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" transform="translate(-647 -969)" fill="#fff"/> <g id="step2_border1_page20content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <g id="step2_border_page20content" transform="translate(-647 -969)" fill="none"> <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none"/> <path d="M 10 0.2999992370605469 C 4.651399612426758 0.2999992370605469 0.2999992370605469 4.651399612426758 0.2999992370605469 10 C 0.2999992370605469 15.34860038757324 4.651399612426758 19.70000076293945 10 19.70000076293945 C 15.34860038757324 19.70000076293945 19.70000076293945 15.34860038757324 19.70000076293945 10 C 19.70000076293945 4.651399612426758 15.34860038757324 0.2999992370605469 10 0.2999992370605469 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z" stroke="none" fill="#000"/> </g> <text id="step2_text_page20content" transform="translate(-637 -955)" font-size="12" font-family="ArialMT, Arial"><tspan x="-3.337" y="0">2</tspan></text> </g> <text class="Step" transform="translate(1 16)" font-size="14" font-family="ArialMT, Arial"><tspan x="0" y="0">Step</tspan></text> </g></svg></div>');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1105, function(sym, e) {
         /*/sym.$("pageContent2").html("A trigger point for the new dig-ital development is, for exam-ple, the <a id='p10hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>PSD2 directive</a> for EU banks or the Open Banking in-itiative in the UK.");
         sym.$("pageContent2Copy").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>Banks have to share transaction</a> data with third party providers (TPP).");
         
         sym.$("pg10_sym1pic1").css({
         	"z-index":"-1"
         });
         sym.getSymbol("pg10_sym1pic1").play('1');
         sym.getSymbol("pg10_sym1pic1").getSymbol("pg10_sym2pic1").play('1');
         
         sym.$(p10hover1).mouseover(function(){
               sym.$(p10hover1).css("color", "#ffcc00");
               sym.$(p10hover1).css('cursor','pointer');
               sym.$("hover").show();
         }); 
         
         sym.$(p10hover1).mouseout(function(){
              sym.$(p10hover1).css("color", "#ffffff");
              sym.$("hover").hide();
         });
         */
         ///////////////////////////////////////////
         

      });
      //Edge binding end

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2691, function(sym, e) {
         sym.$("pageContent2").html("Even if mobile apps communi-cate with APIs, software devel-<a style='letter-spacing:-.5px;word-spacing:-1px;'>opers have to offer easy-to-use</a> documentation (declaration of <a style='letter-spacing:-.6px;word-spacing:-1px;'>attributes, methods and objects).</a>");
         
         sym.stepActive = 2;
         sym.step1Visited = 1;
         sym.step2Visited = 1;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stepActive = 1;
         sym.step1Visited = 1;
         sym.step2Visited = 0;
         
         sym.getComposition().getStage().stepTheme();

      });
      //Edge binding end

   })("page18content");
   //Edge symbol end:'page18content'

   //=========================================================
   
   //Edge symbol: 'page19content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("Finally, banks have to manage the access control, establish test environments, grant the performance and offer end-us-ers service-level agreements.<br><br><a style='letter-spacing:-.5px;word-spacing:-1px;'>API developers not only manage</a> <a style='letter-spacing:-.7px;word-spacing:-1px;'>internal processes, they also rep-</a><a style='letter-spacing:-.5px;word-spacing:-1px;'>resent banks with APIs external-</a>ly.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 84, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page19content");
   //Edge symbol end:'page19content'

   //=========================================================
   
   //Edge symbol: 'page20content'
   (function(symbolName) {   
   
      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2800, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 22)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("Rectangle").css("box-shadow","19px 29px 29px 0px rgba(0,0,0,0.16)");

      });
      //Edge binding end

   })("page20content");
   //Edge symbol end:'page20content'

   //=========================================================
   
   //Edge symbol: 'page21content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>From a client's perspective, API</a> open banking means using a <a style='letter-spacing:-.5px;word-spacing:-1px;'>single front-end platform to han-</a>dle all financial transactions.<br><br>​<a style='letter-spacing:-.5px;word-spacing:-1px;'>End users do not need different</a> online banking platforms with different log-ins.<br><br>API provides a new account in-<a style='letter-spacing:-.5px;word-spacing:-1px;'>formation system (AIS). Innova-</a>tive touch or voice identity sys-<a style='letter-spacing:-.5px;word-spacing:-1px;'>tems connect customers to one</a> platform. With one click clients get all account data.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1347, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1467, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1800, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.click1 = 0;

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "click", function(sym, e) {
         if(sym.click1 == 0){
         	sym.click1 = 1;
         	sym.play("2a");
         }else{
         	sym.click1 = 0;
         	sym.playReverse("2r");
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1400, function(sym, e) {
         sym.click1 = 0;

      });
      //Edge binding end

   })("page21content");
   //Edge symbol end:'page21content'

   //=========================================================
   
   //Edge symbol: 'page22content'
   (function(symbolName) {   
   
      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2800, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 24)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("Rectangle").css("box-shadow","19px 29px 29px 0px rgba(0,0,0,0.16)");

      });
      //Edge binding end

   })("page22content");
   //Edge symbol end:'page22content'

   //=========================================================
   
   //Edge symbol: 'page23content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("The primary benefit for banks is a new customer-oriented di-<a style='letter-spacing:-.5px;word-spacing:-1px;'>rection. Products can be individ-</a>ually selected, either from their <a style='letter-spacing:-.5px;word-spacing:-1px;'>own product range or from third-</a>party providers (TPPs) on cli-ent's request.<br><br><a style='letter-spacing:-.5px;word-spacing:-1px;'>This serves to improve custom-</a>er acquisitions and promotes <a style='letter-spacing:-.5px;word-spacing:-1px;'>customer loyalty throughout the</a> lifecycle.");
         
         sym.$("p23hover1").html("<a class='link1' id='p23hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>AISP</a>");
         sym.$("p23hover2").html("<a class='link1' id='p23hover2' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>PISP</a>");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 127, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 270, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 399, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p23hover1}", "mouseover", function(sym, e) {
         sym.play("2");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p23hover2}", "mouseover", function(sym, e) {
         sym.play("3");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 147, function(sym, e) {
         sym.$("pageContent2").html("Account information service providers only access account information. They analyze and aggregate account data and make them available on behalf of customers to banks.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 286, function(sym, e) {
         sym.$("pageContent2").html("Payment Initiation Service Provider (PISP) <a style='word-spacing:4px;'>are TPPs of payment initiation services. If</a> a client orders PISP to initiate a payment, the PISP has an Access to Account, called &quot;XS2A&quot; and initiates the desired transaction.");

      });
      //Edge binding end

   })("page23content");
   //Edge symbol end:'page23content'

   //=========================================================
   
   //Edge symbol: 'page24content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 103, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 244, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 123, function(sym, e) {
         sym.$("pageContent2").html("Pay with credit card awards.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 365, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 266, function(sym, e) {
         sym.$("pageContent2").html("Financial tools to manage and <a style='letter-spacing:-.5px;word-spacing:-1px;'>track private household budgets.</a>");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 480, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 383, function(sym, e) {
         sym.$("pageContent2").html("Investment recommendations and treasury services.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.$("pageContent2").html("Sale of credit default data.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 586, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 605, function(sym, e) {
         sym.$("pageContent2").html("Online lending platforms for small loans a bank may not want on their balance sheet.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 699, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 717, function(sym, e) {
         sym.$("pageContent2").html("Real estate search.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 810, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 826, function(sym, e) {
         sym.$("pageContent2").html("Identity management.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 931, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>In return, banks can create new</a> products and services and of-fer these to third parties in or-der to increase their revenue streams.");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p24img1}", "mouseover", function(sym, e) {
         sym.play("2");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p24img2}", "mouseover", function(sym, e) {
         sym.play("3");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p24img3}", "mouseover", function(sym, e) {
         sym.play("4");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p24img4}", "mouseover", function(sym, e) {
         sym.play("5");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p24img5}", "mouseover", function(sym, e) {
         sym.play("6");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p24img6}", "mouseover", function(sym, e) {
         sym.play("7");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p24img7}", "mouseover", function(sym, e) {
         sym.play("8");
         

      });
      //Edge binding end

   })("page24content");
   //Edge symbol end:'page24content'

   //=========================================================
   
   //Edge symbol: 'page25content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent2").html("Retailers can be more closely tied to a bank via mobile bank-<a style='letter-spacing:-.5px;word-spacing:-1px;'>ing payment systems. Their cus-</a>tomers are used to pay via on- line accounts of their house banks per mouse click, touch screens, and face or voice <a style='letter-spacing:-.5px;word-spacing:-1px;'>recognition.");
         
         
         sym.$("pageContent").html("The connection between multi-ple platforms creates a lock-in effect with the goal of binding <span style='letter-spacing:-.5px;word-spacing:-1px;'>retailers and <a class='link1' id='p25hover1' style='border-bottom: 1px solid currentColor; display: inline-block; line-height: 0.85;'>SMEs</a> more close-</span>ly to a platform.");
         
         sym.$(p25hover1).mouseover(function(){
               sym.$(p25hover1).css("opacity", ".7");
               sym.$(p25hover1).css('cursor','pointer');
               sym.$("hover").show();
         }); 
         
         sym.$(p25hover1).mouseout(function(){
              sym.$(p25hover1).css("opacity", "1");
              sym.$("hover").hide();
         });
         
         ///////////////////////////////////////////

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 109, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 875, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 158, function(sym, e) {
         //sym.$("pageContent").html("The connection between multi-ple platforms creates a lock-in effect with the goal of binding <span style='letter-spacing:-.5px;word-spacing:-1px;'>retailers and SMEs more close-</span>ly to a platform.");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${p24img22}", "click", function(sym, e) {
         sym.play("2");
         

      });
      //Edge binding end

   })("page25content");
   //Edge symbol end:'page25content'

   //=========================================================
   
   //Edge symbol: 'page26content'
   (function(symbolName) {   
   
      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2800, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 28)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("Rectangle").css("box-shadow","19px 29px 29px 0px rgba(0,0,0,0.16)");
         
         

      });
      //Edge binding end

   })("page26content");
   //Edge symbol end:'page26content'

   //=========================================================
   
   //Edge symbol: 'page27content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>The new business model brings</a> risks for the core business.<br><br>​One problem is to lose the role of a financial intermediary be-tween depositors and borrow-ers.<br><br>Another problem is to protect <a style='letter-spacing:-.5px;word-spacing:-1px;'>and monitor transaction and cli-</a>ent data. KYC standards need an update.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 116, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("page27content");
   //Edge symbol end:'page27content'

   //=========================================================
   
   //Edge symbol: 'page28content'
   (function(symbolName) {   
   
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("pageContent").html("<a style='letter-spacing:-.5px;word-spacing:-1px;'>Technology firms such as Goo-</a><a style='letter-spacing:-.5px;word-spacing:-1px;'>gle, Apple, Facebook and Ama-</a>zon have strong aspirations of entering the banking market.<br><br>​For them, it is a logical step to offer mobile payments for their users. The role of financial in-stitutions might change. They will cooperate with new market entrants.");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 79, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3250, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      Symbol.bindElementAction(compId, symbolName, "${cover}", "click", function(sym, e) {
         if(p28n == 0)
         {
         	p28n = 1;
         	sym.play("2");
         }
         
         else if(p28n == 1)
         {
         	p28n = 0;
         	sym.play("1");
         }

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         p28n = 0;

      });
      //Edge binding end

   })("page28content");
   //Edge symbol end:'page28content'

   //=========================================================
   
   //Edge symbol: 'page29content'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 101, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      

      Symbol.bindElementAction(compId, symbolName, "${amazon}", "mouseover", function(sym, e) {
         sym.$("hover").show();
         sym.$("hover").html("Amazon payments, Amazon Wallet");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${amazon}", "mouseout", function(sym, e) {
         sym.$("hover").hide();
         sym.$("hover").html("");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ebay}", "mouseover", function(sym, e) {
         sym.$("hover").show();
         sym.$("hover").html("Braintree, Pay Pal");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ebay}", "mouseout", function(sym, e) {
         sym.$("hover").hide();
         sym.$("hover").html("");
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${tencent}", "mouseover", function(sym, e) {
         sym.$("hover").show();
         sym.$("hover").html("QQ Wallet, WeBank");
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${tencent}", "mouseout", function(sym, e) {
         sym.$("hover").hide();
         sym.$("hover").html("");
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${alibaba}", "mouseover", function(sym, e) {
         sym.$("hover").show();
         sym.$("hover").html("Alipay, MyBank");
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${alibaba}", "mouseout", function(sym, e) {
         sym.$("hover").hide();
         sym.$("hover").html("");
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${facebook}", "mouseover", function(sym, e) {
         sym.$("hover").show();
         sym.$("hover").html("Facebook Payments, Messenger Payments");
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${facebook}", "mouseout", function(sym, e) {
         sym.$("hover").hide();
         sym.$("hover").html("");
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${apple}", "mouseover", function(sym, e) {
         sym.$("hover").show();
         sym.$("hover").html("Apple Pay, Apple ID");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${apple}", "mouseout", function(sym, e) {
         sym.$("hover").hide();
         sym.$("hover").html("");
         

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.$("hover").hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${google_trig}", "mouseover", function(sym, e) {
         sym.$("hover").show();
         sym.$("hover").html("Google Wallet, Android Pay, Pony Express");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${google_trig}", "mouseout", function(sym, e) {
         sym.$("hover").hide();
         sym.$("hover").html(" ");

      });
      //Edge binding end

   })("page29content");
   //Edge symbol end:'page29content'

   //=========================================================
   
   //Edge symbol: 'pg10_sym1pic1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 133, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 467, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle4}", "mouseover", function(sym, e) {
         sym.play('2');
         sym.getParentSymbol().$("pg10_sym1pic1").css({
         	"z-index":"1"
         });

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle4}", "mouseout", function(sym, e) {
         sym.playReverse('2r');
         sym.getParentSymbol().$("pg10_sym1pic1").css({
         	"z-index":"-1"
         });

      });
      //Edge binding end

      

      

      

      

   })("pg10_sym1pic1");
   //Edge symbol end:'pg10_sym1pic1'

   //=========================================================
   
   //Edge symbol: 'pg10_sym2pic1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 67, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      

   })("pg10_sym2pic1");
   //Edge symbol end:'pg10_sym2pic1'

   //=========================================================
   
   //Edge symbol: 'pg10_sym1pic2'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 133, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 467, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${trig1}", "mouseover", function(sym, e) {
         sym.play('2');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${trig1}", "mouseout", function(sym, e) {
         sym.playReverse('2r');

      });
      //Edge binding end

   })("pg10_sym1pic2");
   //Edge symbol end:'pg10_sym1pic2'

   //=========================================================
   
   //Edge symbol: 'pg10_sym2pic2'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 133, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("pg10_sym2pic2");
   //Edge symbol end:'pg10_sym2pic2'

   //=========================================================
   
   //Edge symbol: 'pg10_num3pic1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 133, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 467, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle3Copy}", "mouseover", function(sym, e) {
         sym.play('2');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle3Copy}", "mouseout", function(sym, e) {
         sym.playReverse('2r');

      });
      //Edge binding end

   })("pg10_num3pic1");
   //Edge symbol end:'pg10_num3pic1'

   //=========================================================
   
   //Edge symbol: 'pg10_num3pic2'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 133, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 467, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle3}", "mouseover", function(sym, e) {
         sym.play('2');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle3}", "mouseout", function(sym, e) {
         sym.playReverse('2r');

      });
      //Edge binding end

   })("pg10_num3pic2");
   //Edge symbol end:'pg10_num3pic2'

   //=========================================================
   
   //Edge symbol: 'p10_num3_inside'
   (function(symbolName) {   
   
   })("p10_num3_inside");
   //Edge symbol end:'p10_num3_inside'

   //=========================================================
   
   //Edge symbol: 'pg10_num3pic2_inside'
   (function(symbolName) {   
   
   })("pg10_num3pic2_inside");
   //Edge symbol end:'pg10_num3pic2_inside'

   //=========================================================
   
   //Edge symbol: 'btnContinue'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${Continue}", "click", function(sym, e) {
         sym.getComposition().getStage().JumpTo(sym.getComposition().getStage().resumeModule());
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Continue}", "mouseout", function(sym, e) {
         sym.$("Continue").css("opacity","1");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Continue}", "mouseover", function(sym, e) {
         sym.$("Continue").css("opacity","0.7");

      });
      //Edge binding end

   })("btnContinue");
   //Edge symbol end:'btnContinue'

   //=========================================================
   
   //Edge symbol: 'btnStartNew'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${StartNew}", "click", function(sym, e) {
         sym.getComposition().getStage().next();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${StartNew}", "mouseout", function(sym, e) {
         sym.$("StartNew").css("opacity","1");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${StartNew}", "mouseover", function(sym, e) {
         sym.$("StartNew").css("opacity","0.7");

      });
      //Edge binding end

   })("btnStartNew");
   //Edge symbol end:'btnStartNew'

   //=========================================================
   
   //Edge symbol: 'page3contents'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2800, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 3)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("Rectangle").css("box-shadow","19px 29px 29px 0px rgba(0,0,0,0.16)");

      });
      //Edge binding end

   })("page3contents");
   //Edge symbol end:'page3contents'

   //=========================================================
   
   //Edge symbol: 'icon5Help'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("icon5Help");
   //Edge symbol end:'icon5Help'

   //=========================================================
   
   //Edge symbol: 'help_1'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${gloss_Background}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.getParentSymbol().$("hitMark3").css({"opacity":"0"});
         sym.getParentSymbol().iconActive3 = false;
         sym.getParentSymbol().$('help').hide();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("helpBG").css("box-shadow","rgba(0, 0, 0, 0.2) 10px 15px 15px 0px");
         sym.$("Text2").html("<a style='text-decoration: none;color: #000;' href='mailto:tutor@fitforbanking.com'>CONTACT US</a>");
         // settings Background
         sym.getSymbol("icon1Help").$('icon1').append('<div style="width:45px; height:45px; margin-top:0px display: flex; justify-content: center;"><svg fill="#ffffff" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M483.184,190.536l-28.04-2.808c-2.84-8.272-6.2-16.368-10.072-24.248l17.888-21.872l18.328-22.408l-20.464-20.472 l-47.488-47.52l-20.488-20.496l-22.424,18.36l-21.792,17.84c-7.888-3.88-15.984-7.256-24.272-10.104l-2.8-27.992L318.688,0h-28.96 h-33.576h-33.864h-28.96l-2.888,28.816l-2.8,27.984c-8.288,2.856-16.4,6.224-24.288,10.112L141.576,49.08l-22.424-18.36 L98.664,51.216l-47.488,47.52l-20.456,20.48l18.328,22.408l17.88,21.856c-3.872,7.888-7.232,15.984-10.08,24.264l-28.032,2.808 L0,193.432v28.96v67.2v28.96l28.816,2.88l28.024,2.808c2.84,8.288,6.208,16.392,10.088,24.288l-17.872,21.856l-18.336,22.4 l20.464,20.472l47.488,47.52l20.488,20.496l22.424-18.36l21.776-17.824c7.896,3.888,16.008,7.264,24.304,10.12l2.8,27.984 l2.88,28.808h28.96h33.584h33.864h28.96l2.888-28.816l2.8-27.992c8.296-2.856,16.4-6.232,24.288-10.12l21.784,17.84l22.424,18.36 l20.488-20.496l47.488-47.52l20.456-20.472l-18.32-22.408l-17.896-21.888c3.864-7.88,7.224-15.976,10.064-24.248l28.04-2.824 L512,318.52v-28.944v-67.2v-28.96L483.184,190.536z M480,289.576l-49.696,5c-4.552,20.68-12.712,39.976-23.76,57.304 l31.688,38.752l-47.488,47.52l-38.688-31.672c-17.328,11.096-36.64,19.296-57.336,23.88L289.744,480H256.16h-0.28h-33.584 l-4.968-49.64c-20.712-4.568-40.024-12.768-57.352-23.864l-38.672,31.664l-47.488-47.52l31.672-38.72 c-11.056-17.336-19.24-36.632-23.792-57.344L32,289.592v-67.2l49.696-4.976c4.568-20.696,12.744-40.008,23.792-57.328 l-31.672-38.72l47.488-47.52l38.672,31.656c17.312-11.08,36.624-19.28,57.336-23.864L222.288,32h33.584h0.28h33.576l4.968,49.64 c20.704,4.584,40.016,12.784,57.328,23.864l38.688-31.672l47.488,47.52l-31.688,38.736c11.04,17.32,19.224,36.616,23.776,57.32 L480,222.376V289.576z"></path> </g> </g> <g> <g> <path d="M256,157.272c-54.448,0-98.736,44.288-98.736,98.736c0,54.44,44.288,98.728,98.736,98.728S354.736,310.44,354.736,256 S310.448,157.272,256,157.272z M256,322.728c-36.8,0-66.736-29.928-66.736-66.728S219.2,189.272,256,189.272 s66.736,29.936,66.736,66.736S292.8,322.728,256,322.728z"></path> </g> </g> </g></svg></div>');
         
         // GLOSSARY
         sym.getSymbol("icon2Help").$('icon2').append('<div style="width:40px; height:45px; padding-top:10px display: flex; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 17" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style = "margin-top:5px;"><polyline points="23 6 12 14 8 10" style="stroke-width: 2px;"></polyline><text xml:space="preserve" text-anchor="start" font-size="15" id="svg_3" y="7" x="0" fill="#ffffff">AB</text></svg></div>');
         
         // TUTORIALS
         sym.getSymbol("icon3Help").$('icon3').append('<div style="width:44px; height:55px; margin-top:0px; display: flex; justify-content: center;"><svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="🔍-System-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="ic_fluent_chat_help_24_regular" fill="#ffffff" fill-rule="nonzero"><path d="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C10.3817,22 8.81782,21.6146 7.41286,20.888 L3.58704,21.9553 C2.92212,22.141 2.23258,21.7525 2.04691,21.0876 C1.98546,20.8676 1.98549,20.6349 2.04695,20.4151 L3.11461,16.5922 C2.38637,15.186 2,13.6203 2,12 C2,6.47715 6.47715,2 12,2 Z M12,3.5 C7.30558,3.5 3.5,7.30558 3.5,12 C3.5,13.4696 3.87277,14.8834 4.57303,16.1375 L4.72368,16.4072 L3.61096,20.3914 L7.59755,19.2792 L7.86709,19.4295 C9.12006,20.1281 10.5322,20.5 12,20.5 C16.6944,20.5 20.5,16.6944 20.5,12 C20.5,7.30558 16.6944,3.5 12,3.5 Z M12,15.5 C12.5523,15.5 13,15.9477 13,16.5 C13,17.0523 12.5523,17.5 12,17.5 C11.4477,17.5 11,17.0523 11,16.5 C11,15.9477 11.4477,15.5 12,15.5 Z M12,6.75 C13.5188,6.75 14.75,7.98122 14.75,9.5 C14.75,10.5108 14.4525,11.074 13.6989,11.8586 L13.5303,12.0303 C12.9084,12.6522 12.75,12.9163 12.75,13.5 C12.75,13.9142 12.4142,14.25 12,14.25 C11.5858,14.25 11.25,13.9142 11.25,13.5 C11.25,12.4892 11.5475,11.926 12.3011,11.1414 L12.4697,10.9697 C13.0916,10.3478 13.25,10.0837 13.25,9.5 C13.25,8.80964 12.6904,8.25 12,8.25 C11.3528,8.25 10.8205,8.74187 10.7565,9.37219 L10.75,9.5 C10.75,9.91421 10.4142,10.25 10,10.25 C9.58579,10.25 9.25,9.91421 9.25,9.5 C9.25,7.98122 10.4812,6.75 12,6.75 Z" id="🎨-Color"></path></g></g></svg></div>');
         
         // Home Icon
         sym.getSymbol("icon4Help").$('icon4').append('<div style="width:45px; height:45px; margin-top:0px display: flex; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg></div>');
         // MENU ICON
         sym.getSymbol("icon5Help").$('icon5').append('<div style="width:45px; height:45px; margin-top:0px display: flex; justify-content: center;"><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12C1 11.4477 1.44772 11 2 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H2C1.44772 13 1 12.5523 1 12Z" fill="#ffffff"/><path d="M1 4C1 3.44772 1.44772 3 2 3H22C22.5523 3 23 3.44772 23 4C23 4.55228 22.5523 5 22 5H2C1.44772 5 1 4.55228 1 4Z" fill="#ffffff"/><path d="M1 20C1 19.4477 1.44772 19 2 19H22C22.5523 19 23 19.4477 23 20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20Z" fill="#ffffff"/></svg></div>');
         
         
         
         sym.$("icon1").hover(function(){//mousehover
         	sym.$(this).css({
         		"cursor":"pointer",
         		"opacity":"0.7"
         	});
         
         	sym.getSymbol("icon1Help").play("1");
         },function(){//mouseout/back to default
         	sym.$(this).css({
         		"cursor":"auto",
         		"opacity":"1"
         	});
         
         	sym.getSymbol("icon1Help").play("rev");
         }).click(function(){
         	sym.$("email").hide();
         	sym.$("HsetBG").css({"opacity":"0.2"});
             sym.$("HgalBG").css({"opacity":"0"});
             sym.$("HtotBG").css({"opacity":"0"});
             sym.$("HhomeBG").css({"opacity":"0"});
             sym.$("HmenuBG").css({"opacity":"0"});
         	sym.$("_explain").html(""+
             "<div style='margin-bottom: 10px; font-weight:bold'>Settings</div>"+    
             "<div>The icon allows you to access module settings and customize your preferred background images and color themes.</div>");
         
         });
         
         
         sym.$("icon2").hover(function(){//mousehover
         	sym.$(this).css({
         		"cursor":"pointer",
         		"opacity":"0.7"
         	});
         
         	sym.getSymbol("icon2Help").play("1");
         },function(){//mouseout/back to default
         	sym.$(this).css({
         		"cursor":"auto",
         		"opacity":"1"
         	});
         
         	sym.getSymbol("icon2Help").play("rev");
         }).click(function(){
         sym.$("email").hide();
         	sym.$("HsetBG").css({"opacity":"0"});
             sym.$("HgalBG").css({"opacity":"0.2"});
             sym.$("HtotBG").css({"opacity":"0"});
             sym.$("HhomeBG").css({"opacity":"0"});
             sym.$("HmenuBG").css({"opacity":"0"});;
         
         	sym.$("_explain").html(""+
         	"<div style='margin-bottom: 10px; font-weight:bold'>Glossary</div>"+ 
             "<div>This icon is your digital dictionary that provides definitions or explanations for technical words and concepts used in this module. It gives you instant access to understanding of foreign terms.</div>");
         
         });
         
         
         sym.$("icon3").hover(function(){//mousehover
         	sym.$(this).css({
         		"cursor":"pointer",
         		"opacity":"0.7"
         	});
         
         	sym.getSymbol("icon3Help").play("1");
         },function(){//mouseout/back to default
         	sym.$(this).css({
         		"cursor":"auto",
         		"opacity":"1"
         	});
         
         	sym.getSymbol("icon3Help").play("rev");
         }).click(function(){
         sym.$("email").show();
         	sym.$("HsetBG").css({"opacity":"0"});
             sym.$("HgalBG").css({"opacity":"0"});
             sym.$("HtotBG").css({"opacity":"0.2"});
             sym.$("HhomeBG").css({"opacity":"0"});
             sym.$("HmenuBG").css({"opacity":"0"});;
         
         	sym.$("_explain").html(""+
         	"<div style='margin-bottom: 10px; font-weight:bold'>Tutor</div>"+ 
             "<div>Need help with the course? Our e-tutor is ready to assist! Click below to email tutor@fitforbanking.com and get support for any module queries.</div>");
         
         });
         
         sym.$("icon4").hover(function(){//mousehover
         	sym.$(this).css({
         		"cursor":"pointer",
         		"opacity":"0.7"
         	});
         
         	sym.getSymbol("icon4Help").play("1");
         },function(){//mouseout/back to default
         	sym.$(this).css({
         		"cursor":"auto",
         		"opacity":"1"
         	});
         
         	sym.getSymbol("icon4Help").play("rev");
         }).click(function(){
         sym.$("email").hide();
         sym.$("HsetBG").css({"opacity":"0"});
             sym.$("HgalBG").css({"opacity":"0"});
             sym.$("HtotBG").css({"opacity":"0"});
             sym.$("HhomeBG").css({"opacity":"0.2"});
             sym.$("HmenuBG").css({"opacity":"0"});
         	sym.$("_explain").html(""+
         	"<div style='margin-bottom: 10px; font-weight:bold'>Home</div>"+  
             "<div>This icon navigates you to go back to the Learning Objectives page.</div>");
         
         });
         
         
         sym.$("icon5").hover(function(){//mousehover
         	sym.$(this).css({
         		"cursor":"pointer",
         		"opacity":"0.7"
         	});
         
         	sym.getSymbol("icon5Help").play("1");
         },function(){//mouseout/back to default
         	sym.$(this).css({
         		"cursor":"auto",
         		"opacity":"1"
         	});
         
         	sym.getSymbol("icon5Help").play("rev");
         }).click(function(){
         sym.$("email").hide();
         sym.$("HsetBG").css({"opacity":"0"});
             sym.$("HgalBG").css({"opacity":"0"});;
             sym.$("HhomeBG").css({"opacity":"0"});
             sym.$("HtotBG").css({"opacity":"0"});
             sym.$("HmenuBG").css({"opacity":"0.2"});
         	sym.$("_explain").html(""+
         	"<div style='margin-bottom: 10px; font-weight:bold'>Menu</div>"+   
             "<div>This icon shows you the Topic List included in the module. Additionally, by clicking on the list of topics, you can navigate from one topic to another.</div>");
         
         });
         
         //Close background btn
         sym.$('clsbtn').html('<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${clsbtn}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.getParentSymbol().$("hitMark3").css({"opacity":"0"});
         sym.getParentSymbol().iconActive3 = false;
         sym.getParentSymbol().$('help').hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${clsbtn}", "mouseenter", function(sym, e) {
         // insert code to be run when the mouse enters an element
         sym.$('clsbtn').css('opacity', '0.8');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${clsbtn}", "mouseleave", function(sym, e) {
         // insert code to be run when the mouse leaves an element
         sym.$('clsbtn').css('opacity', '1');
         
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${email}", "mouseover", function(sym, e) {
         sym.$('email1').css('opacity','0.5');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${email}", "mouseout", function(sym, e) {
         sym.$('email1').css('opacity','1');
         sym.$('email1').css('background-color','#dddddd');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${email}", "click", function(sym, e) {
         sym.$('email1').css('background-color','#c1c1c1');

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         //default Infor showed in box
         sym.$("HsetBG").css({"opacity":"0"});
             sym.$("HgalBG").css({"opacity":"0"});
             sym.$("HhomeBG").css({"opacity":"0"});
             sym.$("HmenuBG").css({"opacity":"0"});
             sym.$("HtotBG").css({"opacity":"0.2"});
         	sym.$("_explain").html(""+
         	"<div style='margin-bottom: 10px; font-weight:bold'>Tutor</div>"+ 
             "<div>Need help with the course? Our e-tutor is ready to assist! Click below to email tutor@fitforbanking.com and get support for any module queries.</div>");

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 100, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("help_1");
   //Edge symbol end:'help_1'

   //=========================================================
   
   //Edge symbol: 'icon1Help'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("icon1Help");
   //Edge symbol end:'icon1Help'

   //=========================================================
   
   //Edge symbol: 'icon3Help'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("icon3Help");
   //Edge symbol end:'icon3Help'

   //=========================================================
   
   //Edge symbol: 'icon2Help'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("icon2Help");
   //Edge symbol end:'icon2Help'

   //=========================================================
   
   //Edge symbol: 'icon4Help'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("icon4Help");
   //Edge symbol end:'icon4Help'

   //=========================================================
   
   //Edge symbol: 'glossary'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${gloss_Background}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.getParentSymbol().iconActive2 = false;
         sym.getParentSymbol().$("hitMark2").css({"opacity":"0"});
         sym.getParentSymbol().$('glossary').hide();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("gloBG").css("box-shadow","rgba(0, 0, 0, 0.2) 10px 15px 15px 0px");
         
         var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
         
         var glossary = [
         	{  
         		term: "API open banking", 
         		description: "Technical term for the willingness of banks to share data with external parties." 
         	},
         	{  
         		term: "Fintechs", 
         		description: "Financial technology firms that offer financial services." 
         	},
         	{  
         		term: "PSD2", 
         		description: "Payment service directive in the EU. The directive requires banks to share bank data with external parties." 
         	},
         	{  
         		term: "Interfaces", 
         		description: "Connection between two computer systems." 
         	},
         	{  
         		term: "Uber", 
         		description: "U.S. transportation network company." 
         	},
         	{  
         		term: "XML", 
         		description: "eXtensible Markup Language, designed to store and transport data." 
         	},
         	{  
         		term: "UX experience", 
         		description: "User experience (UX) to describe a person's emotion and attitude about using a software application." 
         	},
         	{  
         		term: "XS2A", 
         		description: "Technical term for access to account." 
         	},
         	{  
         		term: "SME", 
         		description: "Small and medium sized enterprises (below 250 employees, below 50 million revenue and balance sheet below 50 million)." 
         	},
         ];
         
         // Sorting
         glossary.sort(function(a, b) {
         	if (a.term < b.term) {
         			return -1;
         	}
         
         	if (a.term > b.term) {
         			return 1;
         	}
         	return 0;
         });
         
         //make the line thinner by removing the other sides of the reactangle, leaving just one line
         sym.$("horizontalLine").css({"border-right":"none", "border-left":"none", "border-bottom":"none"});
         sym.$("verticalLine").css({"border-right":"none", "border-top":"none", "border-bottom":"none"});
         
         //add some css styling to head
         //$('head').append("<style>.active, .letter:hover{background-color:rgb(255,192,0); cursor:pointer;} .letter{border-bottom:1px solid currentColor}</style>");
         sym.$('_meaning').css({"line-height":"1.5"});
         $('head').append("<style>.active{background-color:rgba(0 0 0/ 10%); font-weight: bold;} .glossTitle:hover{background-color:rgba(0 0 0/ 10%); cursor:pointer;} .glossTitle{margin-bottom: 1px; display: inline-block;width:100%; padding: 2px 0px 2px 5px; border-radius: 3px;}</style>");
         
         //clear the "instruction text"
         sym.$('_terms').html("").css({"color":"black"});
         sym.$('_clickedTerm').html("API open banking").css({"color":"black"});
         sym.$('_meaning').html("Technical term for the willingness of banks to share data with external parties.").css({"color":"black"});
         sym.$('_letters').html("").css({"color":"black"});
         // Display letters
         letters.forEach(function(letter) {
         	sym.$('_letters').append("<span class='letter'>" + letter + "</span> ");
         });
         
         // Click event for letters
         $('.letter').on('click', function() {
         	var clickedLetter = $(this).text();
         	var filteredTerms = glossary.filter(function(item) {
         			var activeLetter = item.term.startsWith(clickedLetter);			
         			return activeLetter;
         	});
         
         	sym.$('_terms').html(""); // Clear previous terms	
         	sym.$('_clickedTerm').html("");
         	sym.$('_meaning').html("");
         
         	if (filteredTerms.length === 0) {
         		// Handle the case when filteredTerms is empty
         		sym.$('_terms').append("<span style='opacity:0.70;font-style: italic;'>No terms available.</span>");
         	} else {
         		filteredTerms.forEach(function(item) {
         			sym.$('_terms').append("<span class='glossTitle'>" + item.term + "</span><br>");
         		});
         	}
         
         	// Remove existing "active" classes and add to clicked term
         	$('.active').removeClass('active');
         	$(this).addClass('active');
         
         	// Click event for glossary terms
         	$('.glossTitle').on('click', function() {
         			var index = $(this).index('.glossTitle');
         			var clickedItem = filteredTerms[index];
         			sym.$('_clickedTerm').html(clickedItem.term);
         			sym.$('_meaning').html(clickedItem.description);
         
         			// Remove existing "active" classes and add to clicked term
         			$('.active').removeClass('active');
         			$(this).addClass('active');
         	});
         });
         
         glossary.forEach(function(item) {
         	sym.$('_terms').append("<span class='glossTitle'>"+item.term+"</span><br>");	
         });
         $('.glossTitle').first().addClass('active');
         
         // Attach the click event handler after appending all items
         $('.glossTitle').on('click', function(){
         	// Get the index of the clicked item
         	var index = $(this).index('.glossTitle');
         	var clickedItem = glossary[index];
         	console.log(index)
         
         	// Change the text to display the clicked term and its description
         	sym.$('_clickedTerm').html(clickedItem.term);
         	sym.$('_meaning').html(clickedItem.description);
         
         	// Remove existing "active" classes
         	$('.active').removeClass('active');
         
         	// Add "active" class to change the CSS for the clicked item
         	$(this).addClass('active');
         });
         //Close background btn
         sym.$('gloCose').html('<div><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${gloCose}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.getParentSymbol().iconActive2 = false;
         sym.getParentSymbol().$("hitMark2").css({"opacity":"0"});
         sym.getParentSymbol().$('glossary').hide();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${gloCose}", "mouseenter", function(sym, e) {
         // insert code to be run when the mouse enters an element
         sym.$('gloCose').css('opacity', '0.8');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${gloCose}", "mouseleave", function(sym, e) {
         // insert code to be run when the mouse leaves an element
         sym.$('gloCose').css('opacity', '1');
         
         

      });
      //Edge binding end

   })("glossary");
   //Edge symbol end:'glossary'

   //=========================================================
   
   //Edge symbol: 'page6contents'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2800, function(sym, e) {
         var x = sym.getComposition().getStage().getVariable("currentpage");
         if(x == 6)
         sym.getComposition().getStage().next();
         sym.stop();

      });
      //Edge binding end

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         sym.$("Rectangle").css("box-shadow","19px 29px 29px 0px rgba(0,0,0,0.16)");
         
         

      });
      //Edge binding end

   })("page6contents");
   //Edge symbol end:'page6contents'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "Template");