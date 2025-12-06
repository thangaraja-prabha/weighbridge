	$(document).ready(function(){
    $('#variable2').on('change',function(){
      var e = document.getElementById("variable2");
      var option2 = e.options[e.selectedIndex].value
        
        if(option2=="UPVC"){
        	 $('#variable3').empty();
        	 $('#variable4').empty();
        	 $("#divvaribale3").show();
        	 $('#variable3').append( '<option value="">Select</option><option value="110">110</option><option value="160">160</option>' );
        }else if(option2=="SUPVC"){
        	$('#variable3').empty();
        	$('#variable4').empty();
        	$("#divvaribale3").show();
        	$('#variable3').append( '<option value="">Select</option><option value="su160">160</option><option value="su200">200</option>' );
        }else if(option2=="SCI"){
        	$('#variable3').empty();
        	$('#variable4').empty();
        	$("#divvaribale3").show();
        	$('#variable3').append( '<option value="">Select</option><option value="sc350">350</option><option value="sc400">400</option><option value="sc450">450</option><option value="sc500">500</option><option value="sc600">600</option><option value="sc700">700</option>' );
        }
        else if(option2=="SDWC"){
        	$('#variable3').empty();
        	$('#variable4').empty();
        	$("#divvaribale3").show();
        	$('#variable3').append( '<option value="">Select</option><option value="sd200">200</option><option value="sd250">250</option><option value="sd300">300</option>' );
        }
        else if(option2=="CI"){
        	$('#variable3').empty();
        	$('#variable4').empty();
        	$("#divvaribale3").show();
        	$('#variable3').append( '<option value="">Select</option><option value="150">150</option><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option>' );
        }
    });
});