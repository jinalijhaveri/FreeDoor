

$(document).ready(function()
{
   $("#AddProduct").click(function () 
              {            
                       
               
               // if(temp==0)
               // {                 
               //    $(".message_addToCart").append("Enter the quantity");
               //    return false;
               // }
               console.log("so it was called!")
               var prodName=$("#productName").val();

               var data = {};
                  data.productName = $("#productName").val() ;
                  //data.input_no_of_products = $("input[name='text[]']").val();
                  
               //data.input_no_of_products = temp;
               //temp=0;
                               
                  var ajax_url = "/category/:1/product";      
                  //alert(data.input_no_of_products);
            
                  $.ajax({
                     type: "POST",
                     url:ajax_url,
                     data: JSON.stringify(data),
                     contentType: 'application/json',
                     
                     success: function(output_string) 
                     {                    
                    	 var data=JSON.parse(output_string);
                        //$(".messageLabel").append("Successfully Added"); 
                        alert('Product successfully added'+data.prodName);
                        
                        $("#AddedProduct").append(data.prodName);
                        $("#AddedProduct").append("<br/>"+data.value);
                        
                     },
                     error: function (error) {
                           alert('Error');
                     }
                  }); 
            });

});


