                function calculation()
                {
						var enableSubmitButton = false; 
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
						
						var numofqty1 = parseFloat(document.getElementById("numofqty1").value);									
						var ansL = document.getElementById("rwt1");
						ansL.value = (numofqty1*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);
			
						var ansM = document.getElementById("ovm1");
						ansM.value = (numofqty1*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt1");
						ansN.value = (numofqty1*ansH.value);
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
						
						var numofqty2 = parseFloat(document.getElementById("numofqty2").value);									
						var ansL = document.getElementById("rwt2");
						ansL.value = (numofqty2*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm2");
						ansM.value = (numofqty2*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt2");
						ansN.value = (numofqty2*ansH.value);
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
						
						var numofqty3 = parseFloat(document.getElementById("numofqty3").value);									
						var ansL = document.getElementById("rwt3");
						ansL.value = (numofqty3*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm3");
						ansM.value = (numofqty3*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt3");
						ansN.value = (numofqty3*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);	

                        var lp4 = parseFloat(document.getElementById("lp4").value);
                        var dp4 = parseFloat(document.getElementById("dp4").value);
                        var ansC = document.getElementById("d4");
                        ansC.value = lp4*dp4/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad4");
						ansD.value = lp4-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e4 = parseFloat(document.getElementById("e4").value);
						var ansE = document.getElementById("m4");
						ansE.value = (e4/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm4");
						ansF.value = (e4/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t4");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt4 = parseFloat(document.getElementById("wt4").value);
						var ansH = document.getElementById("wt4");
						ansH.value = (e4/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty4 = parseFloat(document.getElementById("numofqty4").value);									
						var ansL = document.getElementById("rwt4");
						ansL.value = (numofqty4*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm4");
						ansM.value = (numofqty4*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt4");
						ansN.value = (numofqty4*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp5 = parseFloat(document.getElementById("lp5").value);
                        var dp5 = parseFloat(document.getElementById("dp5").value);
                        var ansC = document.getElementById("d5");
                        ansC.value = lp5*dp5/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad5");
						ansD.value = lp5-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e5 = parseFloat(document.getElementById("e5").value);
						var ansE = document.getElementById("m5");
						ansE.value = (e5/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm5");
						ansF.value = (e5/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t5");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt5 = parseFloat(document.getElementById("wt5").value);
						var ansH = document.getElementById("wt5");
						ansH.value = (e5/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty5 = parseFloat(document.getElementById("numofqty5").value);									
						var ansL = document.getElementById("rwt5");
						ansL.value = (numofqty5*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm5");
						ansM.value = (numofqty5*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt5");
						ansN.value = (numofqty5*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp6 = parseFloat(document.getElementById("lp6").value);
                        var dp6 = parseFloat(document.getElementById("dp6").value);
                        var ansC = document.getElementById("d6");
                        ansC.value = lp6*dp6/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad6");
						ansD.value = lp6-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e6 = parseFloat(document.getElementById("e6").value);
						var ansE = document.getElementById("m6");
						ansE.value = (e6/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm6");
						ansF.value = (e6/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t6");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt6 = parseFloat(document.getElementById("wt6").value);
						var ansH = document.getElementById("wt6");
						ansH.value = (e6/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty6 = parseFloat(document.getElementById("numofqty6").value);									
						var ansL = document.getElementById("rwt6");
						ansL.value = (numofqty6*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm6");
						ansM.value = (numofqty6*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt6");
						ansN.value = (numofqty6*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp7 = parseFloat(document.getElementById("lp7").value);
                        var dp7 = parseFloat(document.getElementById("dp7").value);
                        var ansC = document.getElementById("d7");
                        ansC.value = lp7*dp7/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad7");
						ansD.value = lp7-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e7 = parseFloat(document.getElementById("e7").value);
						var ansE = document.getElementById("m7");
						ansE.value = (e7/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm7");
						ansF.value = (e7/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t7");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt7 = parseFloat(document.getElementById("wt7").value);
						var ansH = document.getElementById("wt7");
						ansH.value = (e7/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty7 = parseFloat(document.getElementById("numofqty7").value);									
						var ansL = document.getElementById("rwt7");
						ansL.value = (numofqty7*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm7");
						ansM.value = (numofqty7*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt7");
						ansN.value = (numofqty7*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp8 = parseFloat(document.getElementById("lp8").value);
                        var dp8 = parseFloat(document.getElementById("dp8").value);
                        var ansC = document.getElementById("d8");
                        ansC.value = lp8*dp8/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad8");
						ansD.value = lp8-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e8 = parseFloat(document.getElementById("e8").value);
						var ansE = document.getElementById("m8");
						ansE.value = (e8/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm8");
						ansF.value = (e8/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t8");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt8 = parseFloat(document.getElementById("wt8").value);
						var ansH = document.getElementById("wt8");
						ansH.value = (e8/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty8 = parseFloat(document.getElementById("numofqty8").value);									
						var ansL = document.getElementById("rwt8");
						ansL.value = (numofqty8*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm8");
						ansM.value = (numofqty8*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt8");
						ansN.value = (numofqty8*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp9 = parseFloat(document.getElementById("lp9").value);
                        var dp9 = parseFloat(document.getElementById("dp9").value);
                        var ansC = document.getElementById("d9");
                        ansC.value = lp9*dp9/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad9");
						ansD.value = lp9-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e9 = parseFloat(document.getElementById("e9").value);
						var ansE = document.getElementById("m9");
						ansE.value = (e9/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm9");
						ansF.value = (e9/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t9");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt9 = parseFloat(document.getElementById("wt9").value);
						var ansH = document.getElementById("wt9");
						ansH.value = (e9/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty9 = parseFloat(document.getElementById("numofqty9").value);									
						var ansL = document.getElementById("rwt9");
						ansL.value = (numofqty9*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm9");
						ansM.value = (numofqty9*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt9");
						ansN.value = (numofqty9*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp10 = parseFloat(document.getElementById("lp10").value);
                        var dp10 = parseFloat(document.getElementById("dp10").value);
                        var ansC = document.getElementById("d10");
                        ansC.value = lp10*dp10/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad10");
						ansD.value = lp10-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e10 = parseFloat(document.getElementById("e10").value);
						var ansE = document.getElementById("m10");
						ansE.value = (e10/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm10");
						ansF.value = (e10/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t10");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt10 = parseFloat(document.getElementById("wt10").value);
						var ansH = document.getElementById("wt10");
						ansH.value = (e10/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty10 = parseFloat(document.getElementById("numofqty10").value);									
						var ansL = document.getElementById("rwt10");
						ansL.value = (numofqty10*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm10");
						ansM.value = (numofqty10*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt10");
						ansN.value = (numofqty10*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp11 = parseFloat(document.getElementById("lp11").value);
                        var dp11 = parseFloat(document.getElementById("dp11").value);
                        var ansC = document.getElementById("d11");
                        ansC.value = lp11*dp11/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad11");
						ansD.value = lp11-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e11 = parseFloat(document.getElementById("e11").value);
						var ansE = document.getElementById("m11");
						ansE.value = (e11/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm11");
						ansF.value = (e11/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t11");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt11 = parseFloat(document.getElementById("wt11").value);
						var ansH = document.getElementById("wt11");
						ansH.value = (e11/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty11 = parseFloat(document.getElementById("numofqty11").value);									
						var ansL = document.getElementById("rwt11");
						ansL.value = (numofqty11*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm11");
						ansM.value = (numofqty11*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt11");
						ansN.value = (numofqty11*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);

                        var lp12 = parseFloat(document.getElementById("lp12").value);
                        var dp12 = parseFloat(document.getElementById("dp12").value);
                        var ansC = document.getElementById("d12");
                        ansC.value = lp12*dp12/100;
						ansC.value = parseFloat(ansC.value).toFixed(2);
						
						var ansD = document.getElementById("ad12");
						ansD.value = lp12-(ansC.value);
						ansD.value = parseFloat(ansD.value).toFixed(2);
						
						var e12= parseFloat(document.getElementById("e12").value);
						var ansE = document.getElementById("m12");
						ansE.value = (e12/100*ansD.value);
						ansE.value = parseFloat(ansE.value).toFixed(2);
						
						var ansF = document.getElementById("wm12");
						ansF.value = (e12/100*ansD.value) + parseFloat(ansD.value);
						ansF.value = parseFloat(ansF.value).toFixed(2);
						
						var h = parseFloat(document.getElementById("h").value);
						var ansG = document.getElementById("t12");
						ansG.value = (h/100*ansF.value);
						ansG.value = parseFloat(ansG.value).toFixed(2);
						
						var wt12 = parseFloat(document.getElementById("wt12").value);
						var ansH = document.getElementById("wt12");
						ansH.value = (e12/100*ansD.value) + parseFloat(ansD.value) + parseFloat(ansG.value);
						ansH.value = parseFloat(ansH.value).toFixed(2);
						
						var numofqty12 = parseFloat(document.getElementById("numofqty12").value);									
						var ansL = document.getElementById("rwt12");
						ansL.value = (numofqty12*ansE.value);
						ansL.value = parseFloat(ansL.value).toFixed(2);						

						var ansM = document.getElementById("ovm12");
						ansM.value = (numofqty12*ansF.value);	
						ansM.value = parseFloat(ansM.value).toFixed(2);

						var ansN = document.getElementById("tvwt12");
						ansN.value = (numofqty12*ansH.value);
						ansN.value = parseFloat(ansN.value).toFixed(2);						
						
						var z = Math.min("tvwt1", "tvwt2", "tvwt3");
						document.getElementById("leastvalue").value;
				
                }
     