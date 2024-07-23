function isLetter(s){
	return s.match("^[a-zA-Z\(\)]+$");    
}

function isUpperCase(str) {
	if(!isLetter(str))
		return false;
    return str === str.toUpperCase();
}

function isLowerCase(str) {
	if(!isLetter(str))
		return false;
    return str === str.toLowerCase();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeThirdLetter(string) {
    return string.charAt(0) + string.charAt(1) + string.charAt(2).toUpperCase();
}

function process_inputs() {
	var peeked = false;
	var hinted = false;
	
	for (var i = 0; i < Locations.length; i++) {
		var key = Locations[i];
		
		for (var j = AreaIndexes.length-1; j > 0; j--) {
			if (i < AreaIndexes[j]) {
				var AreaNamesIndex = AreaIndexes.indexOf(AreaIndexes[j]);
			};
		}
		
		if(key.startsWith("h_")) { continue; }
		
		if(Check[key] != "unknown") {continue;}
		if(!inputs.includes(document.getElementById(key).value.toLowerCase()))
			continue;
		
		if (isUpperCase(document.getElementById(key).value.charAt(2)) && document.getElementById(key).value.length == 3) {
			peeked = true;
			document.getElementById(key).value = document.getElementById(key).value.toLowerCase();
		}
		else if (isUpperCase(document.getElementById(key).value.charAt(0)) && document.getElementById(key).value.length == 3){
			hinted = true;
			document.getElementById(key).value = document.getElementById(key).value.toLowerCase();
		}
		
		for (var j = 0; j < inputs.length; j++) {
			if (document.getElementById(key).value == inputs[j]) {
				if(j == 0) {
					document.getElementById("text_" + Locations[i]).dispatchEvent(new Event('mousedown')); continue;
				}
				
				for (var k = 0; k <= 5; k++) {
					if (k == 0) {
						var duplicate = "";
					}
					else {
						var duplicate = k + "";
					}
					if (!Known[Items2[j] + duplicate] && Items.indexOf(Items2[j] + duplicate) >= 0) {
						Check[document.getElementById(key).id] = Items2[j] + duplicate; 
						ItemLocation[Items2[j] + duplicate] = document.getElementById(key).id;
						Known[Items2[j] + duplicate] = true; 
						
						if(!hinted && !peeked) {
							Game[Items2[j] + duplicate] = true;
							CouldHave[Items2[j] + duplicate] = true;
						}
						if (hinted) {
							Hinted[key] = true;
						} 
						if(hintedInput == inputs[j])
							thisIsHinted = true;
						if (!Game[Items2[j] + duplicate] && i < lastItem) {
							forcedDisplay[i] = true; 
							document.getElementById(key).style.backgroundImage= ""; 
							document.getElementById(key).value = document.getElementById(key).value.toUpperCase();
						}
						ItemLocations[Items2[j] + duplicate] = AreaNamesShort[AreaNamesIndex] + ": " + Names[i];
						lastCheck.push(key);
						if(SongItems.indexOf(key) >= 0)
							document.getElementById("text_"+key).innerHTML = document.getElementById("text_"+key).innerHTML + ": " + SongNames[Check[key]];
						
						if(!thisIsHinted && !overrideFocus && !simActive) {
							for(var k = 0; k < AreaIndexes.length-1; k++) {
								if(Locations.indexOf(key) < AreaIndexes[k])
									break;
							}

							for (var i = Locations.indexOf(key) + 1; i < Locations.length; i++) {
								if(i >= AreaIndexes[k])
									break;
								
								if (document.getElementById(Locations[i]).style.display != "none" && Location_Peek[Locations[i]]) {
									document.getElementById(Locations[i]).focus();
									break;
								}
							}
						}
						
						break;
					}
				}
			}
		}
	}
}

function update_check_display() {
	
	if(toFocus != null) {
		toFocus.focus();
		toFocus = null;
	}
	
	Game.logically_accessible = 0;
	Game.checks_remaining = 0;
	
	for (var i = 0; i < Locations.length; i++) {
		
		document.getElementById(Locations[i]).style.display = "none";
		document.getElementById("text_" + Locations[i]).style.display = "none";
		document.getElementById("br_" + Locations[i]).style.display = "none";
		
		if (Locations[i] == "Fisherman Pictograph") {continue;}
		if (Locations[i] == "Beaver Race #2") {continue;}
		if (Locations[i] == "Frog Choir") {continue;}
		if (document.getElementById("settings_option").value == "BLITZ" && blitz_disabled_checks.includes(Locations[i])) {continue;}
		if (document.getElementById("settings_option").value == "BLITZ" && wft_junked && blitz_disabled_checks_wft.includes(Locations[i])) {Check["Woodfall Heart Container"] = "junk"; continue;}
		if (document.getElementById("settings_option").value == "BLITZ" && sht_junked && blitz_disabled_checks_sht.includes(Locations[i])) {Check["Snowhead Heart Container"] = "junk"; continue;}
		if (document.getElementById("settings_option").value == "BLITZ" && gbt_junked && blitz_disabled_checks_gbt.includes(Locations[i])) {Check["Great Bay Heart Container"] = "junk"; continue;}
		if (document.getElementById("settings_option").value == "BLITZ" && stt_junked && blitz_disabled_checks_stt.includes(Locations[i])) {Check["Stone Tower Heart Container"] = "junk"; continue;}
		if (document.getElementById("settings_option").value == "S3" && s3_disabled_checks.includes(Locations[i])) {continue;}
		if (document.getElementById("settings_option").value == "S4" && s4_disabled_checks.includes(Locations[i])) {continue;}
		if (document.getElementById("settings_option").value == "S5" && s5_disabled_checks.includes(Locations[i])) {continue;}
		if (document.getElementById("settings_option").value == "EASTER" && easter_disabled_checks.includes(Locations[i])) {continue;}
		if (document.getElementById("gossips_option").value != "ON" && Locations[i].startsWith("h_")) {continue;}
		
		var key = Locations[i];
		str = "text_" + key;
		str2 = "br_" + key;
		
		if(key.startsWith("h_")) {
			document.getElementById(str).className = "gossip_text";
			if (/*Location_Peek[key] && */Check[key] != "junk") {
				document.getElementById(str).style.display = "inline-block";
				document.getElementById(str2).style.display = "inline-block";
				document.getElementById(key).style.display = "inline-block";
			}
			else {
				document.getElementById(str).style.display = "none"
				document.getElementById(str2).style.display = "none";
				document.getElementById(key).style.display = "none";
			}
			continue;
		}
		
		if(document.getElementById(key).value != "")
			document.getElementById(key).style.backgroundBlendMode = "overlay"; 
		else
			document.getElementById(key).style.backgroundBlendMode = ""; 
		
		if(Check[key] == "unknown" || SongItems.indexOf(key) >= 0 || forcedDisplay[i]) {
		
			if (document.getElementById(key).style.display != "inline-block") {
				document.getElementById(str).style.display = "inline-block";
				document.getElementById(key).style.display = "inline-block";
				document.getElementById(str2).style.display = "inline-block";
			}
			
			if(SongItems.indexOf(key) < 0 && Check[key] == "unknown")
				Game.checks_remaining += 1;
			
			if(Location_Logic[key]) {
				if (Location_Peek[key] && Location_Access[key]) {
					document.getElementById(str).className= "logic_check_text"; 
					document.getElementById(str).style.fontWeight = "bold";
					document.getElementById(str).style.opacity = 1;
				}
				else {
					document.getElementById(str).className= "known_check_text";
					document.getElementById(str).style.fontWeight = "normal";
					document.getElementById(str).style.opacity = .5;
				}
				document.getElementById(str).style.color = "chartreuse";
				if(SongItems.indexOf(key) >= 0 && Check[key] != "unknown")
					;
				else {
					if(Check[key] == "unknown") {
						if(SongItems.indexOf(key) < 0)
							Game.logically_accessible += 1;
					}
				}
				
			}
			else if (Location_Access[key]) {
				document.getElementById(str).className= "access_check_text";
				document.getElementById(str).style.opacity = .7;
				document.getElementById(str).style.fontWeight = "normal";
				document.getElementById(str).style.color = "yellow";
			}
			else if (Location_Peek[key]) {
				document.getElementById(str).className= "peek_check_text";
				document.getElementById(str).style.opacity = 1;
				document.getElementById(str).style.fontWeight = "normal";
				document.getElementById(str).style.color ="orange";
			}
			else if (Location_Could_Access[key]) {
				document.getElementById(str).className= "access_check_text";
				document.getElementById(str).style.fontWeight = "normal";
				document.getElementById(str).style.opacity = .3;
				document.getElementById(str).style.color = "yellow";
			}
			else if (Location_Could_Peek[key]) {
				document.getElementById(str).className= "peek_check_text";
				document.getElementById(str).style.opacity = .3;
				document.getElementById(str).style.fontWeight = "normal";
				document.getElementById(str).style.color ="orange";
			}
			else {
				document.getElementById(str).className= "ool_check_text";
				document.getElementById(str).style.opacity = .5;
				document.getElementById(str).style.fontWeight = "normal";
				document.getElementById(str).style.color = "black";
			}
		}
		
		if(Check[key] == "unknown" && alwaysHints.includes(key)) {
			document.getElementById(str).style.fontStyle = "italic";
		}
		else {
			document.getElementById(str).style.fontStyle = "";
		}
		
		if(Check[key] != "unknown" && !forcedDisplay[i] && document.getElementById(key) != null) {
			
			if(SongItems.indexOf(key) >= 0) {
				document.getElementById(key).style.display = "none";
			}
			else {
				document.getElementById(key).style.display = "none";
				document.getElementById("text_"+key).style.display = "none";;
				document.getElementById("br_"+key).style.display = "none";
			}
		}
	}
	
	document.getElementById("checks_remaining").innerHTML="Remaining: "+Game.checks_remaining;
	document.getElementById("logically_accessible").innerHTML="In Logic: "+Game.logically_accessible;
}

function highlight(x) {

	var theItem = x.id.slice(0, -4);
	
	if(theItem == "wallet1" && Game["wallet1"] == true && Game["wallet2"] == false) {
		Game["wallet2"] = true;
		return;
	}
	else if(theItem == "wallet1" && Game["wallet1"] == true && Game["wallet2"] == true) {
		Game["wallet1"] = false;
		Game["wallet2"] = false;
		document.getElementById("wallet1_img").src = Game.wallet1_img;
		x.style.opacity =.2;
		return;
	}

	if (x.style.opacity == 1) {
		Game[theItem] = false;
		x.style.opacity =.2;
	}
	else {
		Game[theItem] = true;
		x.style.opacity =1;
	}
	
	Update();
}

function click_remains(x) {
	if(event.button == 2 && document.getElementById("settings_option").value == "BLITZ") {
	
		let theRemains = x.id.slice(0, -4);
		
		if(theRemains == "odolwasremains") {
			wft_junked = true;
		}
		if(theRemains == "gohtsremains") {
			sht_junked = true;
		}
		if(theRemains == "gyorgsremains") {
			gbt_junked = true;
		}
		if(theRemains == "twinmoldsremains") {
			stt_junked = true;
		}
	}
}

function click_check() {
	var type = event.button;
	var str = event.target.id;
	var str = str.substring('text_'.length);
	var temp = Locations.indexOf(str);
	//if (Check[str] != "unknown" && !forcedDisplay[temp]) {return;}
	
	if(!simActive) {
		if(SongItems.indexOf(str) != -1)
			return;
	
		if(type == 0 && !event.altKey) {
			if(Check[str] == "unknown")
				Check[str]="junk";
		}
		
		else if(type == 1 || (type == 0 && event.altKey)) {
			return;
		}
		
		else if ((type == 2 && !event.altKey)) {
			return;
		}
		else if (type == 2 && event.altKey) {
			if (x.style.color == "orange") {x.style.color = "pink";}
			else {x.style.color = "orange";}
			return;
		}
		else {
			if(Check[str] == "unknown")
				Check[str]="junk";
		}
		
		if (document.getElementById(str).style.display != "none") {
			document.getElementById(str).style.display = "none";
		}
		
		
		if (forcedDisplay[temp]) {forcedDisplay[temp] = false; Game[Check[str]] = true; Update(); }
		
		if (type == 0){
			if (document.getElementById("text_" + str).style.display != "none") {
				document.getElementById("text_" + str).style.display = "none";
			}
			if (document.getElementById("br_" + str).style.display != "none") {
				document.getElementById("br_" + str).style.display = "none";
			}
		}
		lastCheck.push(str);
		
		if(!thisIsHinted && !overrideFocus && !simActive) {
			for(var j = 0; j < AreaIndexes.length-1; j++) {
				if(Locations.indexOf(str) < AreaIndexes[j])
					break;
			}

			for (var i = Locations.indexOf(str) + 1; i < Locations.length; i++) {
				if(i >= AreaIndexes[j])
					break;
				
				if (document.getElementById(Locations[i]).style.display != "none" && Location_Peek[Locations[i]]) {
					toFocus = document.getElementById(Locations[i]);
					break;
				}
			}
		}
		
		Update();Update();Update();
	}
	else {
		// Sim active
		
		if(Locations.indexOf(str) == -1)
			console.log(str + " is not a known location in the sim");
		
		if(!str.startsWith("h_")) { 
			// clicked an item check, not a gossip hint
		
			var input = SpoilerItemToInput[SpoilerLocToItem[str]];
			
			if(input == undefined && type != 2) {
				Check[str]="junk";
				
				document.getElementById(str).style.display = "none";
				document.getElementById("text_" + str).style.display = "none";
				document.getElementById("br_" + str).style.display = "none";
				
				if (forcedDisplay[temp]) {forcedDisplay[temp] = false; Game[Check[str]] = true; Update(); }
				
				if(SpoilerLocToItem[str] == "Heart Container")
					document.getElementById("simLog").value = str + " -> " + SpoilerLocToItem[str] + "\n" + document.getElementById("simLog").value;
				
				lastCheck.push(str);
			}
			else if(type == 0 && Check[str] == "unknown") {
				document.getElementById(str).value = input;
				document.getElementById("simLog").value = str + " -> " + SpoilerLocToItem[str] + "\n" + document.getElementById("simLog").value;
			}
			else if(type == 2 && Check[str] == "unknown" && document.getElementById(str).value != "???") {
				// right click, peek the item
				if(SongItems.indexOf(str) != -1)
					return;
				
				if (input != undefined && PeekableItemLocations.indexOf(str) != -1) {
					item = SpoilerLocToItem[str]
					document.getElementById(str).value = input.charAt(0) + input.charAt(1) + input.charAt(2).toUpperCase();
				}
				else if (LargeGildedItems.includes(SpoilerLocToItem[str])){
					item = "large gilded chest";
					document.getElementById(str).value = "???";
				}
				else if (SmallGildedItems.includes(SpoilerLocToItem[str])){
					item = "small gilded chest";
					document.getElementById(str).value = "?  ";
				}
				else {
					Check[str]="junk";
				
					document.getElementById(str).style.display = "none";
					document.getElementById("text_" + str).style.display = "none";
					document.getElementById("br_" + str).style.display = "none";
					
					if (forcedDisplay[temp]) {forcedDisplay[temp] = false; Game[Check[str]] = true; Update(); }
					
					if(SpoilerLocToItem[str] == "Heart Container")
						document.getElementById("simLog").value = str + " -> " + SpoilerLocToItem[str] + "\n" + document.getElementById("simLog").value;
				
					lastCheck.push(str);
					
					return;
				}
				document.getElementById("simLog").value = str + " -> " + item + " (peeked)\n" + document.getElementById("simLog").value;
			}
			else if (Check[str] != "unknown" && Check[str] != "junk" && forcedDisplay[temp]) {
				forcedDisplay[temp] = false; 
				Game[Check[str]] = true; 
			}
			
		}
		else {
			// clicked a gossip hint
			temp_hint = SpoilerHintDict[str];
			for(var i = 0; i < hintStrings1.length; i++)
				temp_hint = temp_hint.replace(hintStrings1[i], "");
			document.getElementById("simLog").value = temp_hint + "\n" + document.getElementById("simLog").value;
			simProcessHint(str);
			Check[str] = "junk";
			document.getElementById(str).style.display = "none";
			document.getElementById("text_" + str).style.display = "none";
			document.getElementById("br_" + str).style.display = "none";
			lastCheck.push(str);
		}
	}
}	

function handle_item_highlights() {
	
	var temp_img = document.getElementById("sword1_img");
	if(Game.gilded_sword) {
		temp_img.src = Game.sword3_img;
		temp_img.style.opacity =1;
	}
	else if(Game.razor_sword) {
		temp_img.src = Game.sword2_img;
		temp_img.style.opacity =1;
	}
	else {
		temp_img.src = Game.sword1_img;
		temp_img.style.opacity =1;
	}
	
	var temp_img = document.getElementById("wallet1_img");
	if (Game.giants_wallet) {
		temp_img.src = Game.wallet2_img;
		temp_img.style.opacity =1;
	} 
	else if(Game.adults_wallet) {
		temp_img.src = Game.wallet1_img;
		temp_img.style.opacity =1;
	}
	else
		temp_img.style.opacity =.2;
	
	var temp_img = document.getElementById("magic1_img");
	if (Game.magic2 && Game.magic1) {
		temp_img.src = Game.magic2_img;
		temp_img.style.opacity =1;
	} 
	else if(Game.magic1 || Game.magic2) {
		temp_img.src = Game.magic1_img;
		temp_img.style.opacity =1;
	}
	else
		temp_img.style.opacity =.2;
	
	for(var i = 0; i < NonprogressiveItems.length; i++) {
		var temp_img = document.getElementById(NonprogressiveItems2[i]+"_img");
		if(Game[NonprogressiveItems[i]])
			temp_img.style.opacity =1;
		else
			temp_img.style.opacity =.2;
	}
	
	var temp_img = document.getElementById("odolwasremains_img");
	if(Check["Woodfall Heart Container"] != "unknown")
		temp_img.style.opacity =1;
	else
		temp_img.style.opacity =.2;
	
	var temp_img = document.getElementById("gohtsremains_img");
	if(Check["Snowhead Heart Container"] != "unknown")
		temp_img.style.opacity =1;
	else
		temp_img.style.opacity =.2;
	
	var temp_img = document.getElementById("gyorgsremains_img");
	if(Check["Great Bay Heart Container"] != "unknown")
		temp_img.style.opacity =1;
	else
		temp_img.style.opacity =.2;
	
	var temp_img = document.getElementById("twinmoldsremains_img");
	if(Check["Stone Tower Heart Container"] != "unknown")
		temp_img.style.opacity =1;
	else
		temp_img.style.opacity =.2;
}

function update_summary_text() {
	for (var i = 1; i < checkSummaryText.length; i++) {
		var summary_text_elem = document.getElementById(Items[i]+"_location");
		if(Logic[Items[i]]) {
			if (!Game[Items[i]])
				summary_text_elem.className = "checked_text_summary_not_have";
			else
				summary_text_elem.className = "checked_text_summary";
		}
		else if(Game[Items[i]]) {
			summary_text_elem.className = "checked_text_summary_have_ool";
		}
		else if(CouldHave[Items[i]]) {
			summary_text_elem.className = "checked_text_summary_could_have";
		}
		else if(Known[Items[i]]) {
			summary_text_elem.className = "checked_text_summary_known";
		}
		else {
			summary_text_elem.className = "checked_text_summary_ool";
		}
		
		if(ItemLocations[Items[i]] != undefined)
			summary_text_elem.innerHTML = ItemNames[i]+" &#8594; "+ItemLocations[Items[i]];
		else
			summary_text_elem.innerHTML = ItemNames[i]+" &#8594; ";
	}
}

function Undo() {

	if (lastCheck[lastCheck.length-1] == "start")
		return;
	
	if (Check[lastCheck[lastCheck.length-1]] != "unknown")
	{
		if (Check[lastCheck[lastCheck.length-1]] == "song_of_healing" || Check[lastCheck[lastCheck.length-1]] == "eponas_song" || Check[lastCheck[lastCheck.length-1]] == "song_of_storms" || Check[lastCheck[lastCheck.length-1]] == "sonata" || Check[lastCheck[lastCheck.length-1]] == "lullaby" || Check[lastCheck[lastCheck.length-1]] == "nwbn" || Check[lastCheck[lastCheck.length-1]] == "elegy" || Check[lastCheck[lastCheck.length-1]] == "oath") {
			document.getElementById("text_" + lastCheck[lastCheck.length-1]).innerHTML = document.getElementById("text_" + lastCheck[lastCheck.length-1]).innerHTML.split(': ')[0];
			Game.checks_remaining -= 1;
		}
		else if (Check[lastCheck[lastCheck.length-1]] != "junk") {
			document.getElementById(Check[lastCheck[lastCheck.length-1]] + "_location").innerHTML = document.getElementById(Check[lastCheck[lastCheck.length-1]] + "_location").innerHTML.split('-&gt; ')[0] + "-> ";
			document.getElementById(Check[lastCheck[lastCheck.length-1]] + "_location").className = "checkSummaryText";
		}
		document.getElementById(lastCheck[lastCheck.length-1]).value = "";
	}
	
	for(var j = 0; j < AreaIndexes.length; j++) {
		if(Locations.indexOf(lastCheck[lastCheck.length-1]) >= AreaIndexes[j] && Locations.indexOf(lastCheck[lastCheck.length-1]) < AreaIndexes[j+1]) {
			if(j < 31)
				document.getElementById(lastCheck[lastCheck.length-1]).style.backgroundImage = "url('./images/areas/"+AreaImages[j]+"')";
			else
				document.getElementById(lastCheck[lastCheck.length-1]).style.backgroundImage = "";
		}
	}
	
	forcedDisplay[Check[lastCheck[lastCheck.length-1]]] = false;
	ItemLocations[Check[lastCheck[lastCheck.length-1]]] = undefined;
	ItemLocation[Check[lastCheck[lastCheck.length-1]]] = "";
	Game[Check[lastCheck[lastCheck.length-1]]] = false;
	CouldHave[Check[lastCheck[lastCheck.length-1]]] = false;
	Known[Check[lastCheck[lastCheck.length-1]]] = false;
	Logic[Check[lastCheck[lastCheck.length-1]]] = false;
	Hinted[lastCheck[lastCheck.length-1]] = false;
	Check[lastCheck[lastCheck.length-1]] = "unknown";
	lastCheck.pop();
	Update();Update();Update();
}

document.onkeydown = function(e) {
	if (e.ctrlKey && e.which == 90) {
		e.preventDefault();
		Undo();
	}
}

function clickSummary(loc) {	
	var type = event.button;
	var item = "";
	var str = "";
	var temp = "";
	var clickedSong = false;
	
	theLocation = "";
	if(loc.id.includes("text_")) {
		clickedSong = true;
		str = event.target.id.substring('text_'.length);
		temp = Locations.indexOf(str);
		theLocation = loc.id.slice(5); 
		if(Check[str] != "unknown") {
			item = Check[str];
		}
	}
	else {
		item = loc.id.slice(0, -9);
		theLocation = ItemLocation[item];
	}
	
	if(MarkedWotHItemArrow == null) {
		if(event.which == 3) { // right click, toggle if you have it or not
			if(!clickedSong)
				Game[item] = !Game[item];
			else if(Check[str] != "unknown")
				Game[Check[str]] = !Game[Check[str]];
		}
		else if(event.which == 1 && simActive && clickedSong) {
			// Sim active
			
			if(Locations.indexOf(str) == -1)
				console.log(str + " is not a known location in the sim");
			
			// clicked an item check, not a gossip hint
			
			var input = SpoilerItemToInput[SpoilerLocToItem[str]];
			
			if(input == undefined) {
				Check[str]="junk";
				
				document.getElementById(str).style.display = "none";
				document.getElementById("text_" + str).style.display = "none";
				document.getElementById("br_" + str).style.display = "none";
				
				if (forcedDisplay[temp]) {forcedDisplay[temp] = false; Game[Check[str]] = true; Update(); }
				
				lastCheck.push(str);
			}
			else if(type == 0 && Check[str] == "unknown") {
				document.getElementById(str).value = input;
				document.getElementById("simLog").value = str + " -> " + SpoilerLocToItem[str] + "\n" + document.getElementById("simLog").value;
			}
			else if(type == 2 && Check[str] == "unknown" && document.getElementById(str).value != "???") {
				// right click, peek the item
				if(SongItems.indexOf(str) != -1)
					return;
				
				if (document.getElementById("settings_option").value == "EASTER" && PeekableItemLocationsEaster.indexOf(str) != -1) {
					item = SpoilerLocToItem[str]
					document.getElementById(str).value = input.charAt(0) + input.charAt(1) + input.charAt(2).toUpperCase();
				}
				else if (PeekableItemLocations.indexOf(str) != -1) {
					item = SpoilerLocToItem[str]
					document.getElementById(str).value = input.charAt(0) + input.charAt(1) + input.charAt(2).toUpperCase();
				}
				else {
					item = "unknown gilded chest";
					document.getElementById(str).value = "???";
				}
				document.getElementById("simLog").value = str + " -> " + item + " (peeked)\n" + document.getElementById("simLog").value;
			}
			else if (Check[str] != "unknown" && Check[str] != "junk" && forcedDisplay[temp]) {
				forcedDisplay[temp] = false; 
				Game[Check[str]] = true; 
			}
		}
		else if(event.ctrlKey && event.which == 1) {

			if (Check[theLocation] != "unknown")
			{
				if (Check[theLocation] == "song_of_healing" || Check[theLocation] == "eponas_song" || Check[theLocation] == "song_of_storms" || Check[theLocation] == "sonata" || Check[theLocation] == "lullaby" || Check[theLocation] == "nwbn" || Check[theLocation] == "elegy" || Check[theLocation] == "oath") {
					document.getElementById("text_" + theLocation).innerHTML = document.getElementById("text_" + theLocation).innerHTML.split(': ')[0];
					Game.checks_remaining -= 1;
				}
				else if (Check[theLocation] != "junk") {
					document.getElementById(Check[theLocation] + "_location").className = "checkSummaryText";
				}
				document.getElementById(theLocation).value = "";
			}
			
			forcedDisplay[Locations.indexOf(theLocation)] = false;
			for (var i = 0; i < AreaIndexes.length - 5; i++) {
				if (Locations.indexOf(theLocation) >= AreaIndexes[i] && Locations.indexOf(theLocation) < AreaIndexes[i+1]) {
					document.getElementById(theLocation).style.backgroundImage = "url('./images/areas/"+AreaImages[i]+"')"; 
					break;
				}
			}
			
			ItemLocation[Check[theLocation]] = "";
			ItemLocations[Check[theLocation]] = undefined;
			Game[Check[theLocation]] = false;
			Known[Check[theLocation]] = false;
			CouldHave[Check[theLocation]] = false;
			Logic[Check[theLocation]] = false;
			Hinted[theLocation] = false;
			Check[theLocation] = "unknown";
			
			var t = lastCheck.indexOf(theLocation);
			if (t > -1) {
				lastCheck.splice(t, 1);
			}
			Update();
		}
	}
	else {
		var itemToAdd = document.getElementById(MarkedWotHItemArrow).getAttribute("data-item");
		
		if(event.which == 1) {
			for (var j = 0; j < Items.length; j++) {
				if(Items[j] == itemToAdd) {
					if(ManualWotHItemLocked[Items[j]] == undefined)
						ManualWotHItemLocked[Items[j]] = [];
					if(ManualWotHItemPutInLogic[Items[j]] == undefined)
						ManualWotHItemPutInLogic[Items[j]] = [];
					
					if(item == "")
						continue;
					
					if(item != itemToAdd) {
						if(ManualWotHItemPutInLogic[Items[j]].includes(item))
							ManualWotHItemPutInLogic[Items[j]].splice(ManualWotHItemPutInLogic[Items[j]].indexOf(item), 1);
						if(ManualWotHItemLocked[Items[j]].includes(item))
							ManualWotHItemLocked[Items[j]].splice(ManualWotHItemLocked[Items[j]].indexOf(item), 1);
						else
							ManualWotHItemLocked[Items[j]].push(item);
					}
				}
			}
		}
		else if(event.which == 3) {
			for (var j = 0; j < Items.length; j++) {
				if(Items[j] == itemToAdd) {
					if(ManualWotHItemPutInLogic[Items[j]] == undefined)
						ManualWotHItemPutInLogic[Items[j]] = [];
					if(ManualWotHItemLocked[Items[j]] == undefined)
						ManualWotHItemLocked[Items[j]] = [];
					
					if(item == "")
						continue;
					
					if(item != itemToAdd) {
						if(ManualWotHItemLocked[Items[j]].includes(item))
							ManualWotHItemLocked[Items[j]].splice(ManualWotHItemLocked[Items[j]].indexOf(item), 1);
						if(ManualWotHItemPutInLogic[Items[j]].includes(item))
							ManualWotHItemPutInLogic[Items[j]].splice(ManualWotHItemPutInLogic[Items[j]].indexOf(item), 1);
						else
							ManualWotHItemPutInLogic[Items[j]].push(item);
					}
				}
			}
		}
		MarkedWotHItemArrow = null;
	}
	Update();
}

function resetCycle() {
	Game.magic_bean1 = false;
	Game.magic_bean2 = false;
	Game.letter_to_kafei = false;
	Game.pendant_of_memories = false;
	Game.room_key = false;
	Game.special_delivery = false;
	Game.moons_tear = false;
	Game.land_title_deed = false;
	Game.swamp_title_deed = false;
	Game.mountain_title_deed = false;
	Game.ocean_title_deed = false;
	if(Game.bottle_gold_dust) {
		Game.bottle_gold_dust = false;
		Game.bottle5 = true;
	}
}

function update_settings() {
	if(document.getElementById("settings_option").value == "BLITZ") {
		document.getElementById("woth_input4").style.display = "inline";
		document.getElementById("woth_input5").style.display = "inline";
		document.getElementById("barren_input4").style.display = "none";
	}
	else {
		document.getElementById("woth_input4").style.display = "none";
		document.getElementById("woth_input5").style.display = "none";
		document.getElementById("barren_input4").style.display = "none";
	}
	
	localStorage.setItem("settings_option", document.getElementById("settings_option").value);
}
