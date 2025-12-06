	$(document).ready(function(){
    $('#variable1').on('change',function(){
        var option1 = $("#variable1 option:selected").text();
        if(option1=="HSC"){
        	$('#variable2').empty();
        	$('#variable3').empty();
        	$('#variable4').empty();
        	 $("#divvaribale2").show();
        	 $('#variable2').append( '<option value="">Select</option><option value="UPVC">UPVC</option>' );
        }else if(option1=="Sewareline"){
        	$('#variable2').empty();
        	$('#variable3').empty();
        	$('#variable4').empty();
        	$("#divvaribale2").show();
        	$('#variable2').append( '<option value="">Select</option><option value="SUPVC">UPVC</option><option value="SDWC">DWC</option><option value="SCI">CI</option>' );
        }else if(option1=="Pumping"){
        	$('#variable2').empty();
        	 $('#variable3').empty();
        	$('#variable4').empty();
        	$("#divvaribale2").show();
        	$('#variable2').append( '<option value="">Select</option><option value="CI">CI</option>' );
        }
    });
});
