
var viewedTopics="";var closestatus="";var score="";var lesson_status="incomplete";var isqa="";var currentPage,totalPages,suspend_data,pscore;var saving,ANfile,isScorm,sName,lNAme,fNAme,modcode,qacode;var links='#Stage_sidebar_sidemenubar [id*=Stage_sidebar_SubTopic], #Stage_sidebar_sidemenubar [id*=Stage_sidebar_Topic]';var domainSplit=this.location.href.split("?")[0].split("/");var moduleFileCode=domainSplit[domainSplit.length-2];var oldPage,qaOldPage=1;var main,QA;AdobeEdge.bootstrapCallback(function(compId){if(compId=="Template"){main=AdobeEdge.getComposition(compId).getStage();getFromUrl();timeElapsed();arrangeTopics();editEdgeAnimateFunctions();}else if(compId=="Assessment"){if(sName!==""){$('#username').val(sName);$('#stageTwo_content_page2_form_input, #stageTwo_content_page2_Text4').css('display',"none");}}
AdobeEdge.Symbol.bindElementAction(compId,'stage','document','compositionReady',function(sym,e){$('#Stage').append('<div id = "stageHelp" class="guidedtour" style="display:none"></div>');});});function changePage(){if(userViewingQA()){main.getSymbol("content").getSymbol("assessmentpage").play("2");}else{}
$('#Stage_content_qa_qaControls_menuQA').hide();if(onLastPage()){setViewedTopics();}
counterCSS();parseMessage(buildString());}
function editEdgeAnimateFunctions(){main.setVariable("viewedlastpages",[]);main.setVariable("Topic",0);main.setVariable("SubTopic",0);var oldNext=main.next;main.next=function(){oldNext();changePage();}
var oldPrevious=main.previous;main.previous=function(){oldPrevious();changePage();}
var oldJumpTo=main.JumpTo;main.JumpTo=function(x){$('#Stage_bottombar').show();$('#Stage_Controls').show();oldJumpTo(x);changePage();}
var oldSetSidebarColor=main.SetSidebarColor;main.SetSidebarColor=function(Topic,SubTopic){main.setVariable('Topic',Topic);main.setVariable('SubTopic',SubTopic);oldSetSidebarColor(Topic,SubTopic);}}
function getQueryParams(qs){qs=qs.split('+').join(' ');var params={},tokens,re=/[?&]?([^=]+)=([^&]*)/g;while(tokens=re.exec(qs)){params[decodeURIComponent(tokens[1])]=decodeURIComponent(tokens[2]);}
return params;}
var query=getQueryParams(document.location.search);function getFromUrl(){viewedTopics=(query.viewed!=undefined)?query.viewed:"";isScorm=query.isScorm;sName=query.sname;qacode=query.qacode;modcode=query.modcode;}
function buildString(){currentPage=main.getVariable('currentpage');totalPages=main.getVariable('totalpage')-1;if(currentPage=='qa'){currentPage=totalPages;}
suspend_data=currentPage+"|"+totalPages+"--"+viewedTopics;var elapsedTime=theTime;if(isqa=="qaOpened"){pscore=main.getSymbol('content').getSymbol('qa').getVariable('pscore');score=main.getSymbol('content').getSymbol('qa').getVariable('score');if(parseInt(score)>=parseInt(pscore)){lesson_status="passed";}else if(parseInt(score)>0&&parseInt(score)<parseInt(pscore)){lesson_status="failed";}else{lesson_status="incomplete";}}
var theString=lesson_status+','+suspend_data+','+elapsedTime+','+closestatus+','+pscore+','+score+','+isqa;return theString;}
function parseMessage(msg){if(inIframe()){parent.parseMessage(msg);}else{params=msg.split(",");status=params[0];page=params[1].split("--")[0];views=params[1].split("--")[1];times=params[2];closeme=params[3];score=params[4];isqa=params[5];if(page.split("|")[0]!=""&&page.split("|")[1]!=""){lessonlocation=page.split("|")[0];}
sestime=times.split(":");hhh=Math.round(parseInt(sestime[0]));mmm=Math.round(parseInt(sestime[1]));sss=Math.round(parseInt(sestime[2]));hhh=minTwoDigits(hhh);mmm=minTwoDigits(mmm);sss=minTwoDigits(sss);stimes=hhh+":"+mmm+":"+sss;}}
function counterCSS(){if(isScorm==="true"){$(links).each(function(index,val){currBtn=$(this).attr('id').replace('Stage_sidebar_','');if($(this).css('color')=='rgb(255, 255, 255)'&&stringPresent(currBtn,viewedTopics,";")){$(this).css('color','rgb(102, 102, 110)');}});}}
$('#Stage').on('mouseout',links,function(){counterCSS();});var topicOrder=[];function arrangeTopics(){$(links).each(function(index,val){topicOrder.push(parseInt($(val).css('top').match(/\-?\d+/g)));});topicOrder.sort(function(a,b){return a-b});$(links).each(function(index,val){topicOrder.forEach(function(x,pos){if($(val).css('top').match(/\-?\d+/g)==x){topicOrder[pos]=$(val).attr('id').match(/SubTopic\d+|Topic\d+/).toString();}});});}
function setViewedTopics(){var subTopic="SubTopic"+main.getVariable('SubTopic');if(main.getVariable('SubTopic')!=0&&!stringPresent(subTopic,viewedTopics,";")){viewedTopics=addUniqueString(subTopic,viewedTopics,";");}
var topic="Topic"+main.getVariable('Topic');if(main.getVariable('Topic')!=0&&!stringPresent(topic,viewedTopics,";")){if(findInArr(topic,topicOrder)==topicOrder.length-1||!topicOrder[findInArr(topic,topicOrder)+1].includes("SubTopic")){viewedTopics=addUniqueString(topic,viewedTopics,";");}
else{var allViewed=true;var curPos=findInArr(topic,topicOrder)+1;while(topicOrder[curPos].includes('Sub')){if(!stringPresent(topicOrder[curPos],viewedTopics,';')){allViewed=false;}
curPos++;}
if(allViewed){viewedTopics=addUniqueString(topic,viewedTopics,";");}}}}
$(document).on('keypress click',function(){if(inIframe()){if(main.getVariable('currentpage')!=oldPage){parent.idleTime=0;oldPage=main.getVariable('currentpage');}
else if(isqa=="qaOpened"&&main.getSymbol('content').getSymbol('qa').getVariable('currentpage')!=qaOldPage){parent.idleTime=0;qaOldPage=main.getSymbol('content').getSymbol('qa').getVariable('currentpage');}}});$('#Stage').on('click','#Stage_content_page0content_Continue',function(){var cp=parseInt(query.epages.split('|')[0]);var tp=parseInt(query.epages.split('|')[1]);if(parseInt(cp)>parseInt(tp)||cp=="qa"){cp=parseInt(tp);}
main.setVariable("currentpage",cp);main.JumpTo(cp);});$('#Stage').on('click','#Stage_content_page0content_StartNew',function(){main.JumpTo(1);});$('#Stage').on('click','#Stage_Controls_close, #stageTwo_Controls_close_btn, #Stage_content_assessmentpage_EndCloseBtn',function(){if(closestatus!=="closemenoalert"){closestatus="closeme";}
parseMessage(buildString());closestatus="";});$('#Stage').on('click','#Stage_content_qa_lastpage_close_asse',function(){closestatus="closemenoalert";main.JumpTo(main.getVariable('totalpage'));main.getSymbol("content").getSymbol("assessmentpage").play("thanks");});$("#Stage").on('click','.startQA',function(){if(isqa!="qaOpened"){var myname="";var thename=sName;var firstname="";var lastname="";if(thename===""&&inIframe()){firstname=document.getElementById("firstname").value;lastname=document.getElementById("lastname").value;if(firstname.length>1&&lastname.length>1){myname=firstname+" "+lastname;}}else if(thename===undefined||thename===null){var fullname=document.getElementById("fullname").value;myname=fullname;}else{myname=thename;}
isqa="qaOpened";pscore=main.getSymbol('content').getSymbol('qa').getVariable('pscore');lesson_status="incomplete";elapsedTime=theTime;console.log("work: "+pscore);if(myname.length>=0){parseMessage(buildString());}}})
$("#Stage").on('click','.finishBtn',function(){parseMessage(buildString());})
function onLastPage(){var checkLast=false;main.getVariable('lastpages').forEach(function(x){if(x==main.getVariable('currentpage')){checkLast=true;}})
return checkLast;}
var theTime="00:00:00";function timeElapsed(){var rawTime=0;setInterval(function(){rawTime++;var sec=rawTime%60;var min=Math.floor(rawTime/60)%60;var hr=Math.floor(rawTime/3600);theTime=minTwoDigits(hr)+":"+minTwoDigits(min)+":"+minTwoDigits(sec);},1000);}
function minTwoDigits(n){return(n<10?'0':'')+n;}
function stringPresent(addition,currentString,delimiter){var found=false;if(currentString==addition){found=true;}
else{var parts=currentString.split(delimiter);parts.forEach(function(x){if(x==addition)
found=true;})}
return found;}
function addUniqueString(addition,currentString,delimiter){if(currentString==""){return addition;}
else{return(currentString+delimiter+addition);}}
function inIframe(){try{return window.self!==window.top;}catch(e){return true;}}
function userViewingQA(){if(isqa=="qaOpened"&&(currentPage==totalPages)){return true;}
else{return false;}}
function findInArr(string,arr){var pos="";arr.forEach(function(x,index){if(x==string){pos=index;}})
return pos;}