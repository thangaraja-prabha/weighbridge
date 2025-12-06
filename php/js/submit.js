function update() 
	{
    var bt = document.getElementById('btUpdate');
	if (ansN.value != 'Nan') {
	bt.disabled = false;
	}
	else {
	bt.disabled = true;
	}
	}