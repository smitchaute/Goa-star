$(document).ready(function() {
   //alert("ss");
	setInterval(function() { get_total_chatroom(); } , 2000);
	
	function get_total_chatroom()
	{          
     //       alert("ss2");
            $.post(base_url + "/main/ajax_getHomeText/", {user_id : user_id}, function(data) {
                if (data.status == 'ok' )
                {
                        document.getElementById("todays_date").firstChild.nodeValue = data.todays_date;
                        document.getElementById("result_time").firstChild.nodeValue = data.result_time;
                        document.getElementById("star3_single").firstChild.nodeValue = data.star3_single;
                        document.getElementById("result_GA").firstChild.nodeValue = data.result_GA;
                        document.getElementById("result_GB").firstChild.nodeValue = data.result_GB;
                        document.getElementById("result_GC").firstChild.nodeValue = data.result_GC;
                        document.getElementById("star3_sp").firstChild.nodeValue = data.star3_sp;
                        document.getElementById("currentTime").firstChild.nodeValue = data.currentTime;
                        document.getElementById("nextDraw").firstChild.nodeValue = data.nextDraw;
                        document.getElementById("nxtDrTime").value = data.nextDrawCount;
                        $("div#pointlimit_viewport").html(data.point_limit);
                        document.getElementById("nextDraw2").firstChild.nodeValue = data.nextDraw;
                }
                else
                {
                        // there was an error do something 

                } 

            }, "json");
	}
        
	get_total_chatroom();
	
});

  
    
	function add_ticket(user_id)
	{
            
            document.getElementById("mySubmitButton").disabled = true;
		//alert(V);
		if(user_id > 0)
		{
                    $(".modal").show();
			$.post(base_url + "/main/print_ticket/", $("#home_content").serialize(), function(data) {
				if (data.status == 'ok')
				{
                                    
                        $(".modal").hide();
					if(data.content == 'PointLimitExceed')
					{
						alert("Your can sale upto Point Limit only");
                                                document.getElementById("mySubmitButton").disabled = false;
					} else if(data.content == 'SlotClosed')
					{
						alert("This Slot is closed. Please wait a minute!");
                                                document.getElementById("mySubmitButton").disabled = false;
					} else if(data.content == 'TicketLimitExceed')
					{
						alert(data.msg);
                                                document.getElementById("mySubmitButton").disabled = false;
					}else {
                                                alert(data.content);
                                                document.getElementById("mySubmitButton").disabled = false;
					
						self.name="main"
					}
                                        ClearAllControls();
				}
				else
				{
					alert("Somthing went wrong");	
                                        document.getElementById("mySubmitButton").disabled = false;
				}
			
			}, "json");
		} 
		else 
		{
			alert("Please login with your valid login details to generate tickets");
                        document.getElementById("mySubmitButton").disabled = false;
		}
                
	}