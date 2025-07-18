function process_hint_inputs() {
	var lines = document.getElementById("hintInput").value.split('\n');
	var str = "";
	for (var i= 0; i < hintInputs.length; i++) {
		for (var j=0; j < lines.length; j++) {
			if (lines[j].startsWith(hintInputs[i]+" ")) {
				for (var k = 0; k < inputs.length; k++) {
					str = inputs[k];
					str = capitalizeFirstLetter(str);
					
					if (k == 0) {
						if (lines[j].endsWith(" " + inputs[k]) && Check[hintIndexes[i]] == "unknown") {
							thisIsHinted = true; 
							document.getElementById("text_" + hintIndexes[i]).dispatchEvent(new Event('mousedown')); 
							thisIsHinted = false; 
						}
					}
					else {
						if (lines[j].endsWith(" " + inputs[k])) {
							if (Check[hintIndexes[i]] == "unknown") {
								hintedInput = str.toLowerCase();
								document.getElementById(hintIndexes[i]).value = str;
							}
							else
								Hinted[hintIndexes[i]] = true;
						}
					}
				}
			}
		}
	}
}

function woth_and_barren_processing() {
	for(var i = 1; i <= AreaNames.length-1; i++) {
		Area[i] = "normal";
	}
	
	wothAreas = ["", "", "", "", "", ""];
	
	// loops the 5 woth entries
	for (var i = 1; i <= 5; i++) {
		var str = document.getElementById("woth_input" + i).value;
		str = str.replace("1",""); // if there's a 2, ignore it
		str = str.replace("2",""); // if there's a 2, ignore it
		str = str.replace("3",""); // if there's a 2, ignore it
		str = str.replace("4",""); // if there's a 2, ignore it
		str = str.replace("5",""); // if there's a 2, ignore it
		str = str.replace("6",""); // if there's a 2, ignore it
		str = str.replace("7",""); // if there's a 2, ignore it
		str = str.replace("8",""); // if there's a 2, ignore it
		str = str.replace("9",""); // if there's a 2, ignore it
		
		for(var j = 1; j < AreaNames.length; j++) {
			if (str == areaInputs[j] && str != "") {
				if (Area[j] == "4woth") {Area[j] = "5woth";} 
				else if (Area[j] == "3woth") {Area[j] = "4woth";} 
				else if (Area[j] == "2woth") {Area[j] = "3woth";} 
				else if (Area[j] == "woth") {Area[j] = "2woth";} 
				else {Area[j] = "woth";}
				wothAreas[i] = AreaNames[j];
			}
		}
	}
	for (var i = 1; i <= 4; i++) {
		var str2 = document.getElementById("barren_input" + i).value;
		str2 = str2.replace("2",""); // if there's a 2, ignore it
		
		var foolish_except_song = false;
		if(str2.indexOf("*") != -1) {
			str2 = str2.replace("*",""); // if there's a *, set the foolish except song flag
			foolish_except_song = true;
		}
		
		for(var j = 1; j < AreaNames.length; j++) {
			if(str2 == areaInputs[j] && !foolish_except_song) {
				Area[j] = "barren";
			}
			else if (str2 == areaInputs[j] && foolish_except_song) {
				Area[j] = "barren_except_song";
			}
		}
	}
	
	// add the area woth title or change it
	for(var i = 1; i <= wothAreas.length-1; i++) {
		if(wothAreas[i] != "" && Area[AreaNames.indexOf(wothAreas[i])].includes("woth")) {
			document.getElementById("woth"+i+"_title").innerHTML = wothAreas[i]; 
			document.getElementById("woth"+i+"_title").style.color= WotHColors[i];
		}
		else
			document.getElementById("woth"+i+"_title").innerHTML = "";
	}
	
	// process woth hints
	for (var i = 1; i <= AreaNames.length; i++) {
		var wothRowNumber = 1;
		var wothNumber = 0;
		var numAreaWotHItemsFound = 1;
		var tempbool = false;
	
		// if it's a woth area
		if (wothAreas[1] == AreaNames[i] || wothAreas[2] == AreaNames[i] || wothAreas[3] == AreaNames[i] || wothAreas[4] == AreaNames[i] || wothAreas[5] == AreaNames[i]) {
			if (wothAreas[1] == AreaNames[i]) {wothNumber = 1;}
			else if (wothAreas[2] == AreaNames[i]) {wothNumber = 2;}
			else if (wothAreas[3] == AreaNames[i]) {wothNumber = 3;}
			else if (wothAreas[4] == AreaNames[i]) {wothNumber = 4;}
			else if (wothAreas[5] == AreaNames[i]) {wothNumber = 5;}
			var tempArray = [];
			for (var k = 1; k <= 7; k++){
				document.getElementById("woth" + wothNumber + "_text" + k).innerHTML="";
			}
			
			for (var k = 1; k < Items.length; k++) {
				
				// Cannot be hinted WotH
				if (Items[k] == "giants_mask") {continue;}
				if (Items[k] == "fiercedeity_mask" && document.getElementById("settings_option").value != "S6") {continue;}
				if (Items[k] == Check["Starting Song"]) {continue;} // it doesn't have an area
				if (Items[k] == Check["Keaton Quiz"] && document.getElementById("settings_option").value != "S6") {continue;} // multi-region check. none of them can be woth
				if (Items[k] == Check["Postbox"] && document.getElementById("settings_option").value != "S6") {continue;} // multi-region check. none of them can be woth
				if (Items[k] == Check["Woodfall Map Purchase"] && document.getElementById("settings_option").value != "S6") {continue;} // multi-region check. none of them can be woth
				if (Items[k] == "oath" && document.getElementById("settings_option").value != "S6") {continue;} // it can't lock an item, so cannot be woth
				
				// Logically useless
				if (Items[k] == "sword1") {continue;}
				if (Items[k] == "sword2") {continue;}
				if (Items[k] == "great_fairy_sword") {continue;}
				if (Items[k] == "circusleaders_mask") {continue;}
				if (Items[k] == "stone_mask") {continue;}
				if (Items[k] == "greatfairy_mask" && document.getElementById("settings_option").value != "S6") {continue;}
				if (Items[k] == "pendant_of_memories" && document.getElementById("settings_option").value != "S6") {continue;}
				if (Items[k] == "dongero_mask" && document.getElementById("settings_option").value != "S6") {continue;}

				if (alwaysHints.indexOf(ItemLocation[Items[k]]) == -1 && ItemLocation[Items[k]] != null && (Hinted[ItemLocation[Items[k]]] == false || typeof Hinted[ItemLocation[Items[k]]] == "undefined")) 
				{
					var blue_warp_song = false;
					if(ItemLocation[Items[k]] == "Boss Blue Warp" && ((AreaNames[i] == "WFT" && Items[k] != "sonata") || (AreaNames[i] == "SHT" && Items[k] != "lullaby") || (AreaNames[i] == "GBT" && Items[k] != "nwbn") || (AreaNames[i] == "STT" && Items[k] != "elegy")))
						blue_warp_song = true;
					
					if(ItemLocation[Items[k]] == "Biggest Bomb Bag Purchase" && ((AreaNames[i] == "Swamp" && ((Items[k] == "deku_mask") || (Items[k] == "moons_tear") || (Items[k] == "land_title_deed") || (Items[k] == "swamp_title_deed"))) || (AreaNames[i] == "Gor Village" && Items[k] == "goron_mask")))
						continue;
					
					multiLocationOverride = false;
					
					if(document.getElementById("settings_option").value == "S6") {
						if(ItemLocation[Items[k]] == "Postbox" && (AreaNames[i] == "SCT" || AreaNames[i] == "NCT" || AreaNames[i] == "ECT"))
							multiLocationOverride = true;
						if(ItemLocation[Items[k]] == "Clock Town Map Purchase" && (AreaNames[i] == "NCT" || AreaNames[i] == "Canyon"))
							multiLocationOverride = true;
						if(ItemLocation[Items[k]] == "Woodfall Map Purchase" && (AreaNames[i] == "NCT" || AreaNames[i] == "Road Swamp"))
							multiLocationOverride = true;
						if(ItemLocation[Items[k]] == "Snowhead Map Purchase" && (AreaNames[i] == "Road Swamp" || AreaNames[i] == "Twin Islands"))
							multiLocationOverride = true;
						if(ItemLocation[Items[k]] == "Romani Ranch Map Purchase" && (AreaNames[i] == "Twin Islands" || AreaNames[i] == "Milk Road"))
							multiLocationOverride = true;
						if(ItemLocation[Items[k]] == "Great Bay Map Purchase" && (AreaNames[i] == "Milk Road" || AreaNames[i] == "Great Bay"))
							multiLocationOverride = true;
						if(ItemLocation[Items[k]] == "Stone Tower Map Purchase" && (AreaNames[i] == "Great Bay" || AreaNames[i] == "Canyon"))
							multiLocationOverride = true;
						if(ItemLocation[Items[k]] == "Keaton Quiz" && (AreaNames[i] == "NCT" || AreaNames[i] == "Milk Road" || AreaNames[i] == "Mtn Village"))
							multiLocationOverride = true;
					}
					
					if ((Locations.indexOf(ItemLocation[Items[k]]) >= AreaIndexes[i-1] && Locations.indexOf(ItemLocation[Items[k]]) < AreaIndexes[i]) 
					|| Locations.indexOf(ItemLocation[Items[k]]) == SongIndexes[i-1] || blue_warp_song || multiLocationOverride) 
					{
						document.getElementById("woth" + wothNumber + "_text" + wothRowNumber).innerHTML = "<img id = 'wothMajor" + wothNumber + "_" + k + "'" + " class = 'wothMajorImages' src=" + ItemImages[k] + " data-item = '" + Items[k] + "' onmousedown = 'markWothItem(this)'>";
						
						if(ManualWotHItems[Items[k]]) {
							document.getElementById("woth" + wothNumber + "_text" + wothRowNumber).style.display = "block";
							document.getElementById("wothMajor" + wothNumber + "_" + k).className = "manualWothImages";
						}
						else if(ManualNotWotHItems[Items[k]]) {
							document.getElementById("woth" + wothNumber + "_text" + wothRowNumber).style.display = "none";
							document.getElementById("wothMajor" + wothNumber + "_" + k).className = "notWothItemImages";
						}
						else {
							document.getElementById("woth" + wothNumber + "_text" + wothRowNumber).style.display = "block";
							document.getElementById("wothMajor" + wothNumber + "_" + k).className = "wothMajorImages";
						}
						
						document.getElementById("woth" + wothNumber + "_text" + wothRowNumber).innerHTML += "<span onmousedown = 'markWothItemArrow(this)' id = 'wothItemArrow" + wothNumber + "_" + k + "' data-item = '" + Items[k] + "' class = 'woth_item_arrow'> &#8594; </span>"; 
							
						if(MarkedWotHItemArrow == "wothItemArrow" + wothNumber + "_" + k)
							document.getElementById("wothItemArrow" + wothNumber + "_" + k).style.color = "chartreuse";
						
						if(ManualWotHItemLocked[Items[k]] != undefined) {
							for(var q = 0; q < ManualWotHItemLocked[Items[k]].length; q++) {
								for (var j = 0; j < Items.length; j++) {
									if(Items[j] == ManualWotHItemLocked[Items[k]][q]) {
										document.getElementById("woth" + wothNumber + "_text" + wothRowNumber).innerHTML += "<img id = 'wothMinor" + wothNumber + "_" + wothRowNumber + "_" + j + "'" + "class = 'wothImages' data-item = '" + Items[j] + "' data-parent = '" + Items[k] + "'onmousedown = 'markMinorWothItem(this)' src=" + ItemImages[j] + ">";
										
										if (ManualWotHMinorItems[Items[j]]) {
											document.getElementById("wothMinor" + wothNumber + "_" + wothRowNumber + "_" + j).style.setProperty("-webkit-filter", "drop-shadow(0px 0px 5px yellow)"); 
										} 
									}
								}
							}
						}
						if(ManualWotHItemPutInLogic[Items[k]] != undefined) {
							for(var q = 0; q < ManualWotHItemPutInLogic[Items[k]].length; q++) {
								for (var j = 0; j < Items.length; j++) {
									if(Items[j] == ManualWotHItemPutInLogic[Items[k]][q]) {
										document.getElementById("woth" + wothNumber + "_text" + wothRowNumber).innerHTML += "<img id = 'wothMinor" + wothNumber + "_" + wothRowNumber + "_" + j + "'" + "class = 'putInLogicByWothItemImages' data-item = '" + Items[j] + "' data-parent = '" + Items[k] + "'onmousedown = 'markMinorWothItem(this)' src=" + ItemImages[j] + ">";
										
										if (ManualWotHMinorItems[Items[j]]) {
										document.getElementById("wothMinor" + wothNumber + "_" + wothRowNumber + "_" + j).style.setProperty("-webkit-filter", "drop-shadow(0px 0px 5px yellow)"); 
										} 
									}
								}
							}
						}
						
						document.getElementById("woth" + wothNumber + "_text" + wothRowNumber).innerHTML += " <br>"; 
						wothRowNumber += 1; 
						tempArray.push(Items[k]); 
					}
				} 	
			}
		}	
	}
	
	// process barren hints
	for (var i = 2; i <= AreaNames.length; i++) {
		
		if (Area[i] == "barren" || Area[i] == "barren_except_song") {
			
			for (var j = AreaIndexes[i-1]; j < AreaIndexes[i]; j++) {
				if(Locations[j].includes("h_"))
					continue;
				if((AreaNames[i] == "WFT" || AreaNames[i] == "SHT" || AreaNames[i] == "GBT" || AreaNames[i] == "STT") && j == AreaIndexes[i]-1)
					continue;
				
				if(Check[Locations[j]] == "unknown") {
					if(AreaNames[i] == "Gor Village" && Locations[j] == "Biggest Bomb Bag Purchase") {
						continue;
					}
					
					//document.getElementById("text_" + Locations[j]).style.border = "solid 1px red";
					//document.getElementById("text_" + Locations[j]).dispatchEvent(new Event('mousedown'));
					document.getElementById(Locations[j]).value = "x";
				}
			}
			
			if(Area[i] == "barren") {
				if(SongIndexes[i-1] != 1000) {
					if(Check[Locations[SongIndexes[i-1]]] == "unknown") {
						document.getElementById("text_" + Locations[SongIndexes[i-1]]).style.border = "solid 1px red";
					}
				}
			}
			
			if(AreaNames[i] == "Milk Road" && Check["Keaton Quiz"] == "unknown") {
				//document.getElementById("text_" + "Keaton Quiz").style.border = "solid 1px red";
				//document.getElementById("text_" + "Keaton Quiz").dispatchEvent(new Event('mousedown'));
				document.getElementById("Keaton Quiz").value = "x";
			}
			if(AreaNames[i] == "Road Swamp" && Check["Woodfall Map Purchase"] == "unknown") {
				//document.getElementById("text_" + "Woodfall Map Purchase").style.border = "solid 1px red";
				//document.getElementById("text_" + "Woodfall Map Purchase").dispatchEvent(new Event('mousedown'));
				document.getElementById("Woodfall Map Purchase").value = "x";
			}
			if((AreaNames[i] == "NCT" || AreaNames[i] == "ECT") && Check["Postbox"] == "unknown") {
				//document.getElementById("text_" + "Postbox").style.border = "solid 1px red";
				//document.getElementById("text_" + "Postbox").dispatchEvent(new Event('mousedown'));
				document.getElementById("Postbox").value = "x";
			}
		}
	}
}

function markWothItem(x) {
	if(event.which == 1 && ManualWotHItems[x.getAttribute("data-item")] != true) {
		ManualWotHItems[x.getAttribute("data-item")] = true;
		ManualNotWotHItems[x.getAttribute("data-item")] = false;
	}
	else if(event.which == 3 && ManualNotWotHItems[x.getAttribute("data-item")] != true) {
		ManualNotWotHItems[x.getAttribute("data-item")] = true;
		ManualWotHItems[x.getAttribute("data-item")] = false;
	}
	else {
		ManualWotHItems[x.getAttribute("data-item")] = false;
		ManualNotWotHItems[x.getAttribute("data-item")] = false;
	}
	Update();
}

function markWothItemArrow(x) {
	if(MarkedWotHItemArrow == x.id)
		MarkedWotHItemArrow = null;
	else
		MarkedWotHItemArrow = x.id;
	Update();
}

function markMinorWothItem(x) {
	var theItem = x.getAttribute("data-item");
	var theParent = x.getAttribute("data-parent");
	
	if(event.which == 1) {
		if(ManualWotHMinorItems[theItem] == undefined || ManualWotHMinorItems[theItem] == false)
			ManualWotHMinorItems[theItem] = true;
		else
			ManualWotHMinorItems[theItem] = false;
	}
	else if(event.which == 2) {
		if(ManualWotHItemLocked[theParent].includes(theItem)) {
			ManualWotHItemLocked[theParent].splice(ManualWotHItemLocked[theParent].indexOf(theItem), 1);
			ManualWotHItemPutInLogic[theParent].push(theItem);
		}
		else if(ManualWotHItemPutInLogic[theParent].includes(theItem)) {
			ManualWotHItemPutInLogic[theParent].splice(ManualWotHItemPutInLogic[theParent].indexOf(theItem), 1);
			ManualWotHItemLocked[theParent].push(theItem);
		}
	}
	else if(event.which == 3 && ManualNotWotHItems[theItem] != true) {
		if(ManualWotHItemLocked[theParent].includes(theItem))
			ManualWotHItemLocked[theParent].splice(ManualWotHItemLocked[theParent].indexOf(theItem), 1);
		if(ManualWotHItemPutInLogic[theParent].includes(theItem))
			ManualWotHItemPutInLogic[theParent].splice(ManualWotHItemPutInLogic[theParent].indexOf(theItem), 1);
		
		ManualWotHMinorItems[theItem] = false;
	}
	Update();
}

function resetWoth(num) {
	for (var i = 1; i <= 34; i++) {
		if(AreaNames[i] == wothAreas[num]) {
			for (var k = 0; k < Items.length; k++) {
				if(ManualNotWotHItems[Items[k]] && ((Locations.indexOf(ItemLocation[Items[k]]) >= AreaIndexes[i-1] && Locations.indexOf(ItemLocation[Items[k]]) < AreaIndexes[i]) || Locations.indexOf(ItemLocation[Items[k]]) == SongIndexes[i-1])) {
					ManualNotWotHItems[Items[k]] = false;
				}
			}
		}
	}	
}
