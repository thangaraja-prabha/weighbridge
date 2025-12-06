                function calculation()
                {
                        var lp1 = parseFloat(document.getElementById("lp1").value);
                        var dp1 = parseFloat(document.getElementById("dp1").value);
                        var ansC = document.getElementById("d1");
                        ansC.value = lp1*dp1/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad1");
						ansD.value = lp1-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e1 = parseFloat(document.getElementById("e1").value);
						var ansE = document.getElementById("m1");
						ansE.value = (e1/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm1");
						ansF.value = (e1/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t1");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
				
						var wt1 = parseFloat(document.getElementById("wt1").value);
						var ansH = document.getElementById("wt1");
						ansH.value = (e1/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty = parseFloat(document.getElementById("numofqty").value);									
						var ansL = document.getElementById("rwt1");
						ansL.value = (numofqty*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);
			
						var ansM = document.getElementById("ovm1");
						ansM.value = (numofqty*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt1");
						ansN.value = (numofqty*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp2 = parseFloat(document.getElementById("lp2").value);
                        var dp2 = parseFloat(document.getElementById("dp2").value);
                        var ansC = document.getElementById("d2");
                        ansC.value = lp2*dp2/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad2");
						ansD.value = lp2-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e2 = parseFloat(document.getElementById("e2").value);
						var ansE = document.getElementById("m2");
						ansE.value = (e2/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm2");
						ansF.value = (e2/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t2");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt2 = parseFloat(document.getElementById("wt2").value);
						var ansH = document.getElementById("wt2");
						ansH.value = (e2/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty = parseFloat(document.getElementById("numofqty").value);									
						var ansL = document.getElementById("rwt2");
						ansL.value = (numofqty*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm2");
						ansM.value = (numofqty*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt2");
						ansN.value = (numofqty*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp3 = parseFloat(document.getElementById("lp3").value);
                        var dp3 = parseFloat(document.getElementById("dp3").value);
                        var ansC = document.getElementById("d3");
                        ansC.value = lp3*dp3/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad3");
						ansD.value = lp3-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e3 = parseFloat(document.getElementById("e3").value);
						var ansE = document.getElementById("m3");
						ansE.value = (e3/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm3");
						ansF.value = (e3/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t3");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt3 = parseFloat(document.getElementById("wt3").value);
						var ansH = document.getElementById("wt3");
						ansH.value = (e3/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty = parseFloat(document.getElementById("numofqty").value);									
						var ansL = document.getElementById("rwt3");
						ansL.value = (numofqty*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm3");
						ansM.value = (numofqty*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt3");
						ansN.value = (numofqty*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);
						
                }
     