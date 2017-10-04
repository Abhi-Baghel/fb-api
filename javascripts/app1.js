$(document).ready(function(){
   
   $("#logout_button").hide();
   $("#Link_Post").hide();
   $("#Basic_Profile").hide();
   $("#Postfb").hide();
   $("#getPost").hide();
   $("#RecentPost").hide();
   
   // login button part
    
    $("#logbtn").click(function(){
        $.token=$("#accesstoken").val();
        if ($.token.length < 6) {
              alert("Please enter the valid token")
             // $("#accesstoken").val("");
        } // if condition
        else {

             $.ajax({
                      url:'https://graph.facebook.com/me?fields=email,name,age_range,hometown&access_token='+$.token,
                      success:function(response){
                         console.log(response);
                         $("#myEmail").text(response.email);
                         $("#myName").text(response.name);
                         $("#myAge").text(response.age_range.min);
                         $("#myHomeTown").text(response.hometown.name);

                         $("#logout_button").show(1000);
                         $("#Link_Post").show(1000);
                         $("#Basic_Profile").show(1000);
                         $("#getPost").show(3000);
                         $("#main_heading").hide(1000);
                      }, //end success function
                      
                      error : function(request,errorType,errorMessage){
                       
                       if (errorType === "timeout") {
                           alert("TIMEOUT!!! Please try again");
                       } else {
                           alert("errorType");
                       } 
                            
                      },// end error function
                     timeout: 1000,
                      
                   }); //end ajax call
            } //else 
    }); //logbtn

   //login button part ends
    

    //post part

    $("#postbtn").click(function(){
        $.ajax({
                url:'https://graph.facebook.com/me?fields=posts&access_token='+$.token,
                success:function(response){
                    console.log(response);
                    $.each(response.posts.data, function(index,element){
                           console.log(index);
                           console.log(element.story);
                           $(".post").append(element.story + "<br/>");
                     }); // $.each()
                
                     $("#logout_button").show();
                     $("#getPost").hide();
                     $("#Postfb").show();
                     $("#main_heading").hide();
                }, // end success

                error : function(request,errorType,errorMessage){
                       
                       if (errorType === "timeout") {
                           alert("TIMEOUT!!! Please try again");
                       } else {
                           alert("errorType");
                       } 
                            
                      },// end error function
                     timeout: 1000,
                
        }); // end ajax call
    }); // end postbtn

                              
    //logout button part
        
        $("#logout_button").on('click',function(){
          
          $("#Basic_Profile").hide(500);
          $("#Post_fb").hide(500);
          $("#logout_button").hide(500);
          $("#Link_Post").hide(500);
          $("#RecentPost").hide(500);
          $(".post").hide(500);
          $("#main_heading").show(500);
          $("#accesstoken").val("");

        });//logout_button
    

    //logout button part ends


}); // end ready function
    
    