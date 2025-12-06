	$(document).ready(function(){
    $('#variable3').on('change',function(){
      var e = document.getElementById("variable3");
      var option3 = e.options[e.selectedIndex].value
        
        if(option3=="110"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="451,572,00">451,572,00</option>' );
        }else if(option3=="160"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="11,460,00">11,460,00</option>' );
        }
        else if(option3=="su160"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="8,740.00">8,740.00</option>' );
        }
         else if(option3=="su200"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="118,195.00">118,195.00</option>' );
        }
        else if(option3=="sc350"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="2,618.00">2,618.00</option>' );
        }else if(option3=="sc400"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="2,510.00">2,510.00</option>' );
        }
        else if(option3=="sc450"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="1,485.00">1,485.00</option>' );
        } else if(option3=="sc500"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="1,319.00">1,319.00</option>' );
        }else if(option3=="sc600"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="1,138.00">1,138.00</option>' );
        }else if(option3=="sc700"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="656.00">656.00</option>' );
        }else if(option3=="sd200"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="14,973.00">14,973.00</option>' );
        }
        else if(option3=="sd250"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="2,425.00">2,425.00</option>' );
        }
        else if(option3=="sd300"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="3,115.00">3,115.00</option>' );
        }
        
        else if(option3=="150"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="2,872.00">2,872.00</option>' );
        }
        else if(option3=="400"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="5,256.00">5,256.00</option>' );
        }
        else if(option3=="500"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="5,100.00">5,100.00</option>' );
        }
        else if(option3=="600"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="85.00">85.00</option>' );
        }
        else if(option3=="700"){
        	 $('#variable4').empty()
        	 $("#divvaribale4").show();
        	 $('#variable4').append( '<option value="">Select</option><option value="5,920.00">5,920.00</option>' );
        }
       
    });
});