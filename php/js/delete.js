$(document).ready(function(){
    $("a.delete").click(function(e){
        if(!confirm('Are you sure to Delete?')){
            e.preventDefault();
            return false;
        }
        return true;
    });
});