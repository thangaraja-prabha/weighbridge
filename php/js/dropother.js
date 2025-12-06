function showfield(name){
	if(name == 'Yes') 
	{
	document.getElementById('divothers').innerHTML ='<input type="text" name="tender_no" required />';
	}
	else 
	{
	document.getElementById('divothers').innerHTML='';
	}	
}