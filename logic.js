/*
Toggled tricks:

-Lensless Chests
-Run Through Poisoned Water
-Pinnacle Rock without Seahorse
*/

function update_item_logic() {
	// Assumes you start with Kokiri Sword, Hero's Shield, Ocarina of Time, Song of Time, Song of Soaring
	
	// Progressive Swords
	if(Known.sword1 == true) {Logic.sword1 = Location_Logic[ItemLocation.sword1];} 
	if(Known.sword2 == true) {Logic.sword2 = Location_Logic[ItemLocation.sword2];}
	Logic.razor_sword = Logic.sword1 || Logic.sword2;
	Logic.gilded_sword = Logic.sword1 && Logic.sword2;
	
	// Progressive Magic Upgrades
	if(Known.magic1 == true) {Logic.magic1 = Location_Logic[ItemLocation.magic1];} 
	if(Known.magic2 == true) {Logic.magic2 = Location_Logic[ItemLocation.magic2];}
	Logic.magic = Logic.magic1 || Logic.magic2;
	Logic.double_magic = Logic.magic1 && Logic.magic2;
	
	// Progressive Wallets
	if(Known.wallet1 == true) {Logic.wallet1 = Location_Logic[ItemLocation.wallet1];} 
	if(Known.wallet2 == true) {Logic.wallet2 = Location_Logic[ItemLocation.wallet2];}
	Logic.adults_wallet = Logic.wallet1 || Logic.wallet2;
	Logic.giants_wallet = Logic.wallet1 && Logic.wallet2;
	
	// Progressive Bows
	if(Known.bow1 == true) {Logic.bow1 = Location_Logic[ItemLocation.bow1];} 
	if(Known.bow2 == true) {Logic.bow2 = Location_Logic[ItemLocation.bow2];}
	if(Known.bow3 == true) {Logic.bow3 = Location_Logic[ItemLocation.bow3];}
	Logic.bow = Logic.bow1 || Logic.bow2 || Logic.bow3;
	
	// Progressive Bomb Bags
	if(Known.bomb1 == true) {Logic.bomb1 = Location_Logic[ItemLocation.bomb1];} 
	if(Known.bomb2 == true) {Logic.bomb2 = Location_Logic[ItemLocation.bomb2];}
	if(Known.bomb3 == true) {Logic.bomb3 = Location_Logic[ItemLocation.bomb3];}
	Logic.bomb = Logic.bomb1 || Logic.bomb2 || Logic.bomb3;
	
	// Bottles
	if(Known.bottle1 == true) {Logic.bottle1 = Location_Logic[ItemLocation.bottle1];} else{Logic.bottle1 = false; Known.bottle1 = false;} 
	if(Known.bottle2 == true) {Logic.bottle2 = Location_Logic[ItemLocation.bottle2];} else{Logic.bottle2 = false; Known.bottle2 = false;} 
	if(Known.bottle3 == true) {Logic.bottle3 = Location_Logic[ItemLocation.bottle3];} else{Logic.bottle3 = false; Known.bottle3 = false;} 
	if(Known.bottle4 == true) {Logic.bottle4 = Location_Logic[ItemLocation.bottle4];} else{Logic.bottle4 = false; Known.bottle4 = false;} 
	if(Known.bottle5 == true) {Logic.bottle5 = Location_Logic[ItemLocation.bottle5];} else{Logic.bottle5 = false; Known.bottle5 = false;} 
	if(Known.bottle_gold_dust == true) {Logic.bottle_gold_dust = Location_Logic[ItemLocation.bottle_gold_dust];} else{Logic.bottle_gold_dust = false;}
	if (document.getElementById("settings_option").value == "EASTER") {Logic.bottle1 = true; Logic.bottle2 = true; Game.bottle1 = true; Game.bottle2 = true;}
	Logic.any_bottle = Logic.bottle1 || Logic.bottle2 || Logic.bottle3 || Logic.bottle4 || Logic.bottle5 || Logic.bottle_gold_dust;
	
	// Magic beans
	if(Known.magic_bean1 == true) {Logic.magic_bean1 = Location_Logic[ItemLocation.magic_bean1];}
	if(Known.magic_bean2 == true) {Logic.magic_bean2 = Location_Logic[ItemLocation.magic_bean2];}
	Logic.magic_bean = Logic.magic_bean1 || Logic.magic_bean2;
	
	// Single Items
	for(let i = 0; i < SingleItems.length; i++) {
		if(Known[SingleItems[i]] == true) {Logic[SingleItems[i]] = Location_Logic[ItemLocation[SingleItems[i]]];} else{Logic[SingleItems[i]] = false;}
	}
	
	
	// Misc Shortcuts
	Logic.explosive = Logic.bomb || Logic.blast_mask;
	Logic.night_inn_access = Logic.deku_mask || Logic.room_key;
	Logic.ranch_day_1_access = Logic.goron_mask && Logic.powder_keg;
	Logic.water_for_magic_bean = Logic.any_bottle || Logic.song_of_storms;
	Logic.shoot_fire_arrow = Logic.bow && Logic.fire_arrow && Logic.magic;
	Logic.shoot_ice_arrow = Logic.bow && Logic.ice_arrow && Logic.magic;
	Logic.shoot_light_arrow = Logic.bow && Logic.light_arrow && Logic.magic;
	
	// Swamp area shortcuts
	Logic.cross_poisoned_water = Logic.deku_mask || Logic.zora_mask;
	Logic.poison_swamp_access = Logic.cross_poisoned_water && (Logic.hookshot || Logic.bow || Logic.pictobox || Logic.zora_mask || Logic.any_bottle);
	Logic.limitless_magic_beans = Logic.poison_swamp_access && Logic.deku_mask;
	Logic.any_magic_bean = (Logic.poison_swamp_access && Logic.deku_mask) || Logic.magic_bean; 
	
	Logic.wft_access = Logic.deku_mask && Logic.sonata && Logic.poison_swamp_access;
	Logic.woodfall_clear = Logic.wft_access && Logic.bow; 
	
	// Mountain area shortcuts
	Logic.north_access = Logic.bow && (Logic.explosive || Logic.shoot_fire_arrow || Logic.goron_mask);
	Logic.hot_spring_water = Logic.any_bottle && ((Logic.north_access && ((Logic.lens && Logic.goron_mask && Logic.magic) || Logic.shoot_fire_arrow || Logic.snowhead_clear)) || (Logic.ikana_canyon_access && Logic.gibdo_mask && Logic.any_blue_potion && (Logic.zora_mask || Logic.explosive)));
	
	Logic.sht_access = Logic.north_access && Logic.goron_mask && Logic.lullaby && Logic.magic;
	Logic.snowhead_clear = Logic.sht_access && Logic.shoot_fire_arrow;
	
	// Great Bay area shortcuts
	Logic.west_access = Logic.eponas_song;
	Logic.ocean_skulltulas = Logic.explosive && Logic.west_access && Logic.hookshot;
	Logic.pirates_fortress_access = Logic.west_access && Logic.zora_mask;
	Logic.pinnacle_rock_access = Logic.zora_mask;
	Logic.seahorse = Logic.pictobox && Logic.west_access && Logic.pirates_fortress_access;
	Logic.gbt_access = Logic.pirates_fortress_access && Logic.nwbn && Logic.hookshot;
	Logic.great_bay_clear = Logic.gbt_access && Logic.shoot_fire_arrow && Logic.shoot_ice_arrow; 

	// Ikana area shortcuts
	Logic.ikana_graveyard_access = Logic.eponas_song;
	Logic.east_access = Logic.hookshot && Logic.ikana_graveyard_access && (Logic.garo_mask || Logic.gibdo_mask);
	Logic.ikana_canyon_access = Logic.east_access && Logic.shoot_ice_arrow;
	Logic.stt_access = Logic.ikana_canyon_access && Logic.hookshot && Logic.elegy && (Logic.goron_mask || Logic.zora_mask);
	Logic.istt_access = Logic.stt_access && Logic.shoot_light_arrow;
	Logic.ikana_clear = Logic.istt_access && Logic.deku_mask && (Logic.giants_mask || Logic.fiercedeity_mask);
	
	// Bottle shortcuts
	Logic.any_blue_potion = Logic.any_bottle && (Logic.adults_wallet || Logic.mask_of_scents);
	Logic.any_milk = Logic.any_bottle; // gorman bros purchase requires nothing but bottle
	Logic.zora_egg = Logic.any_bottle && Logic.pirates_fortress_access && Logic.hookshot && Logic.pinnacle_rock_access && ((Logic.deku_mask && Logic.magic) || Logic.bow);
	Logic.big_poe = Logic.any_bottle && Logic.ikana_canyon_access && Logic.gibdo_mask && Logic.bomb && (Logic.shoot_light_arrow || (Logic.limitless_magic_beans && (Logic.bow || Logic.zora_mask)));
	
	for (var j = 0; j < Items.length; j++) {
		if(Location_Could_Access[ItemLocation[Items[j]]] || Game[Items[j]])
			CouldHave[Items[j]] = true;
		else
			CouldHave[Items[j]] = false;
	}
	
	for(let i = 0, Has = Game; i < 2; i++) {
		Has.razor_sword = Has.sword1 || Has.sword2;
		Has.gilded_sword = Has.sword1 && Has.sword2;
		
		Has.adults_wallet = Has.wallet1 || Has.wallet2;
		Has.giants_wallet = Has.wallet1 && Has.wallet2;
		
		Has.magic = Has.magic1 || Has.magic2;
		Has.double_magic = Has.magic1 && Has.magic2;
		
		Has.bow = Has.bow1 || Has.bow2 || Has.bow3;
		Has.bomb = Has.bomb1 || Has.bomb2 || Has.bomb3;
		Has.magic_bean = Has.magic_bean1 || Has.magic_bean2;
		Has.any_bottle = Has.bottle1 || Has.bottle2 || Has.bottle3 || Has.bottle4 || Has.bottle5 || Has.bottle_gold_dust;
		
		// Misc Shortcuts
		Has.explosive = Has.bomb || Has.blast_mask;
		Has.night_inn_access = Has.deku_mask || Has.room_key || Has.explosive || Has.bow || Has.hookshot || Has.zora_mask;
		Has.ranch_day_1_access = Has.goron_mask && Has.powder_keg;
		Has.water_for_magic_bean = Has.any_bottle || Has.song_of_storms;
		Has.shoot_fire_arrow = Has.bow && Has.fire_arrow && Has.magic;
		Has.shoot_ice_arrow = Has.bow && Has.ice_arrow && Has.magic;
		Has.shoot_light_arrow = Has.bow && Has.light_arrow && Has.magic;
		
		// Swamp area shortcuts
		Has.cross_poisoned_water = Has.deku_mask || Has.zora_mask || Has.goron_mask;
		Has.poison_swamp_access = Has.cross_poisoned_water && (Has.hookshot || Has.bow || Has.pictobox || Has.zora_mask || Has.any_bottle);
		Has.limitless_magic_beans = Has.poison_swamp_access && Has.deku_mask;
		Has.any_magic_bean = (Has.poison_swamp_access && Has.deku_mask) || Has.magic_bean; 
		
		Has.wft_access = Has.deku_mask && Has.sonata && Has.poison_swamp_access;
		Has.woodfall_clear = Has.wft_access && Has.bow; 
		
		// Mountain area shortcuts
		Has.north_access = Has.bow && (Has.explosive || Has.shoot_fire_arrow || Has.goron_mask);
		Has.hot_spring_water = Has.north_access && Has.any_bottle && (Has.goron_mask || Has.shoot_fire_arrow || Has.snowhead_clear || (Has.ikana_canyon_access && Has.gibdo_mask && Has.any_blue_potion));
		
		Has.sht_access = Has.north_access && Has.goron_mask && Has.lullaby;
		Has.snowhead_clear = Has.sht_access && Has.shoot_fire_arrow;
		
		// Great Bay area shortcuts
		Has.west_access = Has.eponas_song;
		Has.ocean_skulltulas = Has.explosive && Has.west_access && Has.hookshot;
		Has.pirates_fortress_access = Has.west_access && Has.zora_mask;
		Has.pinnacle_rock_access = Has.zora_mask;
		Has.seahorse = Has.pictobox && Has.west_access && Has.pirates_fortress_access;
		Has.gbt_access = Has.pirates_fortress_access && Has.nwbn && Has.hookshot;
		Has.great_bay_clear = Has.gbt_access && Has.shoot_ice_arrow; 

		// Ikana area shortcuts
		Has.ikana_graveyard_access = Has.eponas_song;
		Has.east_access = Has.hookshot && Has.ikana_graveyard_access && (Has.garo_mask || Has.gibdo_mask);
		Has.ikana_canyon_access = Has.east_access;
		Has.stt_access = Has.ikana_canyon_access && Has.hookshot && Has.elegy && (Has.goron_mask || Has.zora_mask);
		Has.istt_access = Has.stt_access && Has.shoot_light_arrow;
		Has.ikana_clear = Has.istt_access;
		
		// Bottle shortcuts
		Has.any_blue_potion = Has.any_bottle && (Has.adults_wallet || Has.mask_of_scents);
		Has.any_milk = Has.any_bottle; // gorman bros purchase requires nothing but bottle
		Has.zora_egg = Has.any_bottle && Has.pirates_fortress_access && Has.hookshot && Has.pinnacle_rock_access && ((Has.deku_mask && Has.magic) || Has.bow);
		Has.big_poe = Has.any_bottle && Has.ikana_canyon_access && Has.gibdo_mask && Has.bomb && (Has.shoot_light_arrow || (Has.limitless_magic_beans && (Has.bow || Has.zora_mask)));
		
		Has = CouldHave;
	}
}

function update_location_logic() {
	
	// South Clock Town
	Location_Logic["Clock Tower Entrance"] = true;
	Location_Logic["South Clock Town Straw Roof Chest"] = Logic.hookshot || (Logic.deku_mask && Logic.moons_tear);
	Location_Logic["South Clock Town Final Day Chest"] = Logic.hookshot || (Logic.deku_mask && Logic.moons_tear);
	Location_Logic["Clock Town Scrub Trade"] = Logic.moons_tear;
	Location_Logic["Postbox"] = Logic.postmans_hat;
		
	// North Clock Town
	Location_Logic["Bombers' Hide and Seek"] = (Logic.deku_mask && Logic.magic) || Logic.zora_mask || Logic.bow || Logic.hookshot;
	Location_Logic["Clock Town Map Purchase"] = (Logic.deku_mask && Logic.magic) || Logic.zora_mask || Logic.bow || Logic.hookshot;
	Location_Logic["Deku Playground Any Day"] = Logic.deku_mask;
	Location_Logic["Keaton Quiz"] = Logic.keaton_mask;
	Location_Logic["North Clock Town Tree"] = true;
	Location_Logic["Old Lady"] = true;
	Location_Logic["Town Great Fairy"] = true;
	Location_Logic["Town Great Fairy Non-Human"] = Logic.deku_mask || Logic.goron_mask || Logic.zora_mask;
		
	// West Clock Town
	Location_Logic["Bomb Bag Purchase"] = true;
	Location_Logic["Big Bomb Bag Purchase"] = true;
	Location_Logic["Bank Reward #1"] = true;
	Location_Logic["Postman's Game"] = Logic.bunny_hood;
	Location_Logic["Rosa Sisters"] = Logic.kamaro_mask;
	Location_Logic["Swordsman's School"] = true;
	Location_Logic["All-Night Mask Purchase"] = Logic.giants_wallet;
	Location_Logic["Bank Reward #3"] = Logic.giants_wallet;
	Location_Logic["Bank Reward #2"] = Logic.adults_wallet;
		
	// Laundry Pool
	Location_Logic["Guru Guru"] = true;
	Location_Logic["Kafei"] = Logic.letter_to_kafei;
	Location_Logic["Curiosity Shop Man #1"] = Logic.letter_to_kafei;
	Location_Logic["Curiosity Shop Man #2"] = Logic.letter_to_kafei;
		
	// East Clock Town
	Location_Logic["Bombers' Hideout Chest"] = Logic.explosive && (Logic.deku_mask || Logic.zora_mask || Logic.bow || Logic.hookshot);
	Location_Logic["East Clock Town Chest"] = true;
	Location_Logic["Gorman"] = Logic.deku_mask && Logic.goron_mask && Logic.zora_mask && Logic.romani_mask;
	Location_Logic["Honey and Darling Any Day"] = Logic.bow || Logic.bomb || (Logic.deku_mask && Logic.magic);
	Location_Logic["Madame Aroma in Bar"] = Logic.special_delivery && Logic.kafei_mask;
	Location_Logic["Madame Aroma in Office"] = true;
	Location_Logic["Mayor"] = Logic.couples_mask;
	Location_Logic["Postman's Freedom Reward"] = Logic.special_delivery;
	Location_Logic["Town Archery #1"] = Logic.bow;
	Location_Logic["Treasure Chest Game Goron"] = Logic.goron_mask;
	Location_Logic["Milk Bar Milk"] = Logic.romani_mask;
	Location_Logic["Milk Bar Chateau"] = Logic.romani_mask && Logic.adults_wallet;
		
	// Stock Pot Inn
	Location_Logic["Inn Reservation"] = true;
	Location_Logic["Midnight Meeting"] = Logic.kafei_mask && Logic.night_inn_access;
	Location_Logic["Toilet Hand"] = Logic.land_title_deed || Logic.swamp_title_deed || Logic.mountain_title_deed || Logic.ocean_title_deed || Logic.letter_to_kafei || Logic.special_delivery;
	Location_Logic["Grandma Short Story"] = Logic.allnight_mask;
	Location_Logic["Grandma Long Story"] = Logic.allnight_mask;
	Location_Logic["Inn Staff Room Chest"] = true;
	Location_Logic["Inn Guest Room Chest"] = Logic.room_key;
		
	// Termina Field
	Location_Logic["Astronomy Telescope"] = Logic.deku_mask || Logic.hookshot || Logic.zora_mask || Logic.bow;
	Location_Logic["Gossip Stones"] = (Logic.goron_mask && Logic.lullaby) || (Logic.deku_mask && Logic.sonata && (Logic.explosive || Logic.goron_mask)) || (Logic.zora_mask && Logic.nwbn && (Logic.explosive || Logic.goron_mask));
	Location_Logic["Business Scrub Purchase"] = Logic.adults_wallet && (Logic.deku_mask || Logic.hookshot || Logic.zora_mask || Logic.bow);
	Location_Logic["Peahat Grotto"] = true;
	Location_Logic["Dodongo Grotto"] = true;
	Location_Logic["Kamaro"] = Logic.song_of_healing;
	Location_Logic["Termina Field Pillar Grotto"] = true;
	Location_Logic["Termina Field Grass Grotto"] = true;
	Location_Logic["Termina Field Underwater Chest"] = Logic.zora_mask;
	Location_Logic["Termina Field Grass Chest"] = true;
	Location_Logic["Termina Field Stump Chest"] = Logic.hookshot || (Logic.any_magic_bean && Logic.water_for_magic_bean); 
	Location_Logic["Bio Baba Grotto"] = Logic.zora_mask && (Logic.explosive || Logic.goron_mask);
		
	// Road to Southern Swamp
	Location_Logic["Swamp Archery #1"] = Logic.bow;
	Location_Logic["Swamp Archery #2"] = Logic.bow;
	Location_Logic["Path to Swamp Grotto"] = true;
	Location_Logic["Path to Swamp Tree"] = (Logic.deku_mask && Logic.magic) || Logic.bow || Logic.hookshot || Logic.zora_mask;
	Location_Logic["Woodfall Map Purchase"] = (Logic.deku_mask && Logic.magic) || Logic.zora_mask || Logic.bow || Logic.hookshot;
	Location_Logic["Snowhead Map Purchase"] = (Logic.deku_mask && Logic.magic) || Logic.zora_mask || Logic.bow || Logic.hookshot;
		
	// Southern Swamp
	Location_Logic["Koume"] = Logic.any_bottle;
	Location_Logic["Kotake"] = true;
	Location_Logic["Swamp Scrub Trade"] = Logic.land_title_deed;
	Location_Logic["Pictograph Contest Winner"] = Logic.pictobox;
	Location_Logic["Boat Archery"] = Logic.woodfall_clear && Logic.any_bottle; 
	
	Location_Logic["Swamp Spider House Reward"] = Logic.poison_swamp_access && (Logic.hookshot || Logic.zora_mask || (Logic.deku_mask && (Logic.bow || Logic.magic || Logic.bomb))) && (Logic.hookshot || Logic.zora_mask || (Logic.deku_mask && Logic.water_for_magic_bean)) && Logic.any_bottle && (Logic.hookshot || Logic.zora_mask || (Logic.water_for_magic_bean && Logic.any_magic_bean && (Logic.goron_mask || Logic.explosive))) && (Logic.hookshot || Logic.zora_mask || Logic.bow || (Logic.deku_mask && Logic.magic));
	// can get without hookshot or zora mask with beans: https://www.twitch.tv/videos/1032053901
	
	Location_Logic["Near Swamp Spider House Grotto"] = Logic.poison_swamp_access && (Logic.deku_mask || Logic.zora_mask);
	Location_Logic["Mystery Woods Grotto"] = true;
	Location_Logic["Swamp Tourist Center Roof"] = Logic.deku_mask && Logic.land_title_deed;
		
	// Deku Palace
	Location_Logic["Bean Man"] = Logic.poison_swamp_access && Logic.deku_mask;
	Location_Logic["Butler"] = Logic.woodfall_clear && Logic.poison_swamp_access && Logic.deku_mask && Logic.any_bottle; 
	Location_Logic["Bean Grotto"] = Logic.poison_swamp_access && (((Logic.hookshot || Logic.water_for_magic_bean) && Logic.deku_mask)); 
	Location_Logic["Deku Palace West Garden"] = Logic.poison_swamp_access && Logic.deku_mask;
		
	// Woodfall
	Location_Logic["Woodfall Bridge Chest"] = Logic.poison_swamp_access && Logic.deku_mask;
	Location_Logic["Behind Woodfall Owl Chest"] = Logic.poison_swamp_access && Logic.deku_mask;
	Location_Logic["Entrance to Woodfall Chest"] = Logic.poison_swamp_access && Logic.deku_mask;
		
	// Milk Road
	Location_Logic["Gorman Bros Race"] = Logic.eponas_song;
	Location_Logic["Romani Ranch Map Purchase"] = (Logic.deku_mask && Logic.magic) || Logic.zora_mask || Logic.bow || Logic.hookshot;
	Location_Logic["Great Bay Map Purchase"] = (Logic.deku_mask && Logic.magic) || Logic.zora_mask || Logic.bow || Logic.hookshot;
	Location_Logic["Gorman Bros Milk Purchase"] = true;
	
	// Romani Ranch
	Location_Logic["Aliens Defense"] = Logic.ranch_day_1_access && Logic.bow;
	Location_Logic["Dog Race"] = Logic.mask_of_truth;
	Location_Logic["Grog"] = Logic.bremen_mask;
	Location_Logic["Cremia"] = Logic.ranch_day_1_access && Logic.bow;
	Location_Logic["Doggy Racetrack Roof Chest"] = Logic.zora_mask || Logic.hookshot || (Logic.any_magic_bean && Logic.water_for_magic_bean);
		
	// Mountain Village
	Location_Logic["Mountain Smithy Day 1"] = Logic.north_access && Logic.adults_wallet && (Logic.shoot_fire_arrow || Logic.hot_spring_water || Logic.snowhead_clear);
	Location_Logic["Mountain Smithy Day 2"] = Logic.north_access && Logic.bottle_gold_dust && (Logic.shoot_fire_arrow || Logic.hot_spring_water || Logic.snowhead_clear);
	Location_Logic["Frog Choir"] = Logic.dongero_mask && Logic.snowhead_clear && Logic.wft_access && Logic.gbt_access && Logic.hookshot && Logic.deku_mask && Logic.zora_mask && Logic.shoot_ice_arrow && Logic.shoot_fire_arrow;
	Location_Logic["Hungry Goron"] = Logic.north_access && Logic.goron_mask && Logic.magic && (Logic.lullaby || Logic.shoot_fire_arrow);
	Location_Logic["Darmani"] = Logic.song_of_healing && Logic.north_access && Logic.lens && Logic.magic;
	Location_Logic["Mountain Waterfall Chest"] = Logic.snowhead_clear;
	Location_Logic["Mountain Spring Grotto"] = Logic.snowhead_clear;
		
	// Twin Islands
	Location_Logic["Goron Race"] = Logic.snowhead_clear && Logic.goron_mask && Logic.magic;
	Location_Logic["Twin Islands Underwater Ramp Chest"] = Logic.snowhead_clear && Logic.zora_mask;
	Location_Logic["Hot Spring Water Grotto"] = Logic.north_access && Logic.explosive && (Logic.shoot_fire_arrow || Logic.hot_spring_water || Logic.snowhead_clear);
	Location_Logic["Twin Islands Cave Chest"] = Logic.snowhead_clear && Logic.zora_mask;
	Location_Logic["Goron Racetrack Grotto"] = Logic.north_access && Logic.explosive && (Logic.goron_mask || Logic.hookshot); // hookshot also needs scarecrow song
	
	// Goron Village
	Location_Logic["Goron Shop 10 Arrows"] = Logic.north_access;
	Location_Logic["Goron Shop 10 Bombs"] = Logic.north_access;
	Location_Logic["Goron Shop Red Potion"] = Logic.north_access;
	Location_Logic["Powder Keg Challenge"] = Logic.north_access && Logic.goron_mask && (Logic.shoot_fire_arrow || Logic.snowhead_clear);
	Location_Logic["Lens of Truth Chest"] = Logic.north_access;
	Location_Logic["Biggest Bomb Bag Purchase"] = Logic.north_access && Logic.adults_wallet && (
		Logic.goron_mask // buy from mountain village
		|| (Logic.deku_mask && Logic.moons_tear && Logic.land_title_deed && Logic.swamp_title_deed) // move the scrub from clock town, then from swamp to clock town, and from mountain to swamp, then buy from swamp one as any form 
	);
	Location_Logic["Mountain Scrub Trade"] = Logic.north_access && Logic.deku_mask && Logic.swamp_title_deed;
	Location_Logic["Lens Cave Invisible Chest"] = Logic.north_access;
	Location_Logic["Lens Cave Rock Chest"] = Logic.north_access && Logic.explosive;
	Location_Logic["Goron Village Ledge"] = Logic.north_access && Logic.deku_mask && Logic.swamp_title_deed;
		
	// Path to Snowhead
	Location_Logic["Path to Snowhead Grotto"] = Logic.north_access && Logic.explosive && Logic.goron_mask && Logic.magic;
	Location_Logic["Path to Snowhead Pillar"] = Logic.north_access && Logic.hookshot && Logic.goron_mask && Logic.magic && Logic.lens;
		
	// Great Bay Coast
	Location_Logic["Ocean Spider House Day 1 Reward"] = Logic.ocean_skulltulas && Logic.shoot_fire_arrow;
	Location_Logic["Fisherman Game"] = Logic.great_bay_clear && Logic.hookshot;
	Location_Logic["Ocean Spider House Chest"] = Logic.bow && Logic.ocean_skulltulas && Logic.captains_hat;
	Location_Logic["Mikau"] = Logic.west_access && Logic.song_of_healing;
	Location_Logic["Great Bay Coast Grotto"] = Logic.west_access;
	Location_Logic["Lab Fish"] = Logic.west_access && Logic.any_bottle;
	Location_Logic["Great Bay Coast Ledge"] = Logic.west_access && Logic.hookshot && Logic.any_magic_bean && Logic.water_for_magic_bean;
	Location_Logic["Stone Tower Map Purchase"] = Logic.west_access && (Logic.hookshot || Logic.bow);
	Location_Logic["Fisherman Pictograph"] = Logic.pictobox && Logic.west_access && Logic.pirates_fortress_access;
		
	// Zora Cape
	Location_Logic["Beaver Race #1"] = Logic.hookshot && Logic.zora_mask && Logic.west_access;
	Location_Logic["Beaver Race #2"] = Logic.hookshot && Logic.zora_mask && Logic.west_access;
	Location_Logic["Zora Cape Ledge Without Tree Chest"] = Logic.hookshot && Logic.west_access;
	Location_Logic["Zora Cape Ledge With Tree Chest"] = Logic.hookshot && Logic.west_access;
	Location_Logic["Zora Cape Grotto"] = Logic.west_access && (Logic.goron_mask || Logic.explosive);
	Location_Logic["Zora Cape Underwater Chest"] = Logic.zora_mask && Logic.west_access;
	Location_Logic["Zora Cape Like-Like"] = Logic.pirates_fortress_access;
		
	// Zora Hall
	Location_Logic["Zora Shop 10 Arrows"] = Logic.zora_mask && Logic.west_access;
	Location_Logic["Zora Shop Hero's Shield"] = Logic.zora_mask && Logic.west_access;
	Location_Logic["Zora Shop Red Potion"] = Logic.zora_mask && Logic.west_access;
	Location_Logic["Ocean Scrub Trade"] = Logic.goron_mask && Logic.mountain_title_deed && Logic.zora_mask && Logic.west_access;
	Location_Logic["Evan"] = Logic.zora_mask && Logic.west_access;
	Location_Logic["Lulu's Room Ledge"] = Logic.pirates_fortress_access && Logic.goron_mask && Logic.deku_mask && Logic.mountain_title_deed;
	Location_Logic["Zora Hall Stage Lights"] = Logic.zora_mask && Logic.west_access && Logic.shoot_fire_arrow;
		
	// Pirates' Fortress Exterior
	Location_Logic["Pirates' Fortress Exterior Log Chest"] = Logic.pirates_fortress_access;
	Location_Logic["Pirates' Fortress Exterior Sand Chest"] = Logic.pirates_fortress_access;
	Location_Logic["Pirates' Fortress Exterior Corner Chest"] = Logic.pirates_fortress_access;
		
	// Pirates' Fortress Sewer
	Location_Logic["Pirates' Fortress Cage Room Shallow Chest"] = Logic.pirates_fortress_access && Logic.goron_mask;
	Location_Logic["Pirates' Fortress Cage Room Deep Chest"] = Logic.pirates_fortress_access && Logic.goron_mask;
	Location_Logic["Pirates' Fortress Maze Chest"] = Logic.pirates_fortress_access && Logic.goron_mask;
	Location_Logic["Pirates' Fortress Cage"] = Logic.pirates_fortress_access && Logic.goron_mask;
		
	// Pirates' Fortress Interior
	Location_Logic["Hookshot Chest"] = Logic.pirates_fortress_access && ((Logic.bow || (Logic.deku_mask && Logic.magic)) && (Logic.goron_mask || Logic.hookshot));
	Location_Logic["Pirates' Fortress Interior Lower Chest"] = Logic.pirates_fortress_access && (Logic.goron_mask || Logic.hookshot);
	Location_Logic["Pirates' Fortress Interior Upper Chest"] = Logic.pirates_fortress_access && Logic.hookshot;
	Location_Logic["Pirates' Fortress Interior Tank Chest"] = Logic.pirates_fortress_access && Logic.hookshot;
	Location_Logic["Pirates' Fortress Interior Guard Room Chest"] = Logic.pirates_fortress_access && Logic.hookshot;
		
	// Pinnacle Rock
	Location_Logic["Seahorses"] = Logic.west_access && Logic.zora_mask && Logic.any_bottle && Logic.seahorse;
	Location_Logic["Pinnacle Rock Lower Chest"] = Logic.pinnacle_rock_access && Logic.west_access;
	Location_Logic["Pinnacle Rock Upper Chest"] = Logic.pinnacle_rock_access && Logic.west_access;
		
	// Path to Ikana Canyon
	Location_Logic["Invisible Soldier"] = Logic.lens && Logic.magic && Logic.any_bottle && Logic.eponas_song;
	Location_Logic["Path to Ikana Pillar Chest"] = Logic.hookshot;
	Location_Logic["Path to Ikana Grotto"] = Logic.goron_mask;
		
	// Ikana Graveyard
	Location_Logic["Dampe Digging"] = Logic.captains_hat && Logic.ikana_graveyard_access && (Logic.zora_mask || Logic.bow);
	Location_Logic["Iron Knuckle Chest"] = Logic.captains_hat && Logic.ikana_graveyard_access && Logic.explosive;
	Location_Logic["Captain Keeta's Chest"] = Logic.sonata && Logic.ikana_graveyard_access && Logic.bow;
	Location_Logic["Day 1 Grave Bats"] = Logic.captains_hat && Logic.ikana_graveyard_access;
	Location_Logic["Ikana Graveyard Grotto"] = Logic.ikana_graveyard_access && Logic.explosive;
		
	// Ikana Canyon
	Location_Logic["Poe Hut"] = Logic.ikana_canyon_access && Logic.bow;
	Location_Logic["Pamela's Father"] = Logic.song_of_healing && Logic.ikana_canyon_access && Logic.song_of_storms;
	Location_Logic["Secret Shrine Grotto"] = Logic.east_access;
	Location_Logic["Ikana Canyon Ledge"] = Logic.zora_mask && Logic.ocean_title_deed && Logic.deku_mask && Logic.east_access;
	Location_Logic["Canyon Scrub Trade"] = Logic.zora_mask && Logic.ocean_title_deed && Logic.east_access;
		
	// Secret Shrine
	Location_Logic["Secret Shrine Final Chest"] = Logic.shoot_light_arrow && Logic.east_access;
	Location_Logic["Secret Shrine Dinolfos Chest"] = Logic.shoot_light_arrow && Logic.east_access;
	Location_Logic["Secret Shrine Wizzrobe Chest"] = Logic.shoot_light_arrow && Logic.east_access;
	Location_Logic["Secret Shrine Wart Chest"] = Logic.shoot_light_arrow && Logic.east_access;
	Location_Logic["Secret Shrine Garo Master Chest"] = Logic.shoot_light_arrow && Logic.east_access;
		
	// Beneath the Well 
	Location_Logic["Mirror Shield Chest"] = Logic.ikana_canyon_access && ((Logic.shoot_fire_arrow && Logic.shoot_light_arrow) || (Logic.shoot_light_arrow && Logic.gibdo_mask && Logic.any_milk && Logic.big_poe) || (Logic.gibdo_mask && Logic.big_poe && Logic.any_milk && Logic.limitless_magic_beans));
	Location_Logic["Well Right Path Chest"] = Logic.ikana_canyon_access && Logic.gibdo_mask && Logic.any_bottle && (Logic.shoot_light_arrow || Logic.limitless_magic_beans);
	Location_Logic["Well Left Path Chest"] = Logic.ikana_canyon_access && Logic.gibdo_mask && Logic.any_blue_potion;
		
	// Ikana Castle
	Location_Logic["Ikana Castle Pillar"] = Logic.ikana_canyon_access && Logic.deku_mask && Logic.shoot_fire_arrow && Logic.lens && (Logic.shoot_light_arrow || Logic.mirror_shield);
		
	// Stone Tower
	Location_Logic["Inverted Stone Tower Left Chest"] = Logic.istt_access && Logic.any_magic_bean && Logic.water_for_magic_bean;
	Location_Logic["Inverted Stone Tower Middle Chest"] = Logic.istt_access && Logic.any_magic_bean && Logic.water_for_magic_bean;
	Location_Logic["Inverted Stone Tower Right Chest"] = Logic.istt_access && Logic.any_magic_bean && Logic.water_for_magic_bean;
	
	// Woodfall Temple
	Location_Logic["Woodfall Entrance Platform"] = Logic.wft_access;
	Location_Logic["Woodfall Dark Room"] = Logic.wft_access;
	Location_Logic["Woodfall Main Room Switch"] = Logic.wft_access;
	Location_Logic["Hero's Bow Chest"] = Logic.wft_access;
	Location_Logic["Woodfall Map Chest"] = Logic.wft_access;
	Location_Logic["Woodfall Small Key Chest"] = Logic.wft_access;
	Location_Logic["Woodfall Compass Chest"] = Logic.wft_access;
	Location_Logic["Woodfall Boss Key Chest"] = Logic.wft_access && Logic.bow;
	Location_Logic["Woodfall Heart Container"] = Logic.wft_access && Logic.bow;
	
	// Snowhead Temple
	Location_Logic["Fire Arrow Chest"] = Logic.sht_access && (Logic.hookshot || Logic.explosive || Logic.shoot_fire_arrow);
	Location_Logic["Snowhead Boss Key Chest"] = Logic.sht_access && Logic.shoot_fire_arrow;
	Location_Logic["Snowhead Heart Container"] = Logic.sht_access && Logic.shoot_fire_arrow;
	Location_Logic["Snowhead Basement"] = Logic.sht_access;
	Location_Logic["Snowhead Block Room Chest"] = Logic.sht_access;
	Location_Logic["Snowhead Bridge Room Chest"] = Logic.sht_access && (Logic.hookshot || Logic.shoot_fire_arrow);
	Location_Logic["Snowhead Compass Chest"] = Logic.sht_access;
	Location_Logic["Snowhead Ice Puzzle"] = Logic.sht_access && Logic.shoot_fire_arrow; 
	Location_Logic["Snowhead Icicle Room Chest"] = Logic.sht_access && (Logic.hookshot || Logic.explosive || Logic.shoot_fire_arrow);
	Location_Logic["Snowhead Icicle Room Wall"] = Logic.sht_access && (Logic.hookshot || Logic.explosive || Logic.shoot_fire_arrow);
	Location_Logic["Snowhead Main Room Wall"] = Logic.sht_access && (Logic.hookshot || Logic.shoot_fire_arrow);
	Location_Logic["Snowhead Map Chest"] = Logic.sht_access;
	Location_Logic["Snowhead Map Room Ledge"] = Logic.sht_access && (Logic.hookshot || (Logic.lens && (Logic.explosive || Logic.shoot_fire_arrow)));
	Location_Logic["Snowhead Pillar Freezards"] = Logic.sht_access && Logic.shoot_fire_arrow;
	Location_Logic["Snowhead Twin Block"] = Logic.sht_access && (Logic.hookshot || Logic.shoot_fire_arrow || Logic.zora_mask);
	
	// Great Bay Temple
	Location_Logic["Great Bay Entrance Torches"] = Logic.gbt_access;
	Location_Logic["Great Bay Bio Babas"] = Logic.gbt_access;
	Location_Logic["Great Bay Green Valve"] = Logic.gbt_access && Logic.shoot_ice_arrow;
	Location_Logic["Great Bay Seesaw Room"] = Logic.gbt_access && Logic.shoot_ice_arrow && Logic.shoot_fire_arrow;
	Location_Logic["Great Bay Waterwheel Room Lower"] = Logic.gbt_access && Logic.shoot_ice_arrow;
	Location_Logic["Great Bay Waterwheel Room Upper"] = Logic.gbt_access && Logic.shoot_ice_arrow;
	Location_Logic["Ice Arrow Chest"] = Logic.gbt_access;
	Location_Logic["Great Bay Boss Key Chest"] = Logic.gbt_access && Logic.shoot_ice_arrow && Logic.shoot_fire_arrow;
	Location_Logic["Great Bay Map Chest"] = Logic.gbt_access;
	Location_Logic["Great Bay Compass Chest"] = Logic.gbt_access;
	Location_Logic["Great Bay Small Key Chest"] = Logic.gbt_access;
	Location_Logic["Great Bay Heart Container"] = Logic.gbt_access && Logic.shoot_ice_arrow && Logic.shoot_fire_arrow;
	
	// Stone Tower Temple
	Location_Logic["Stone Tower Statue Eye"] = Logic.stt_access && Logic.bow;
	Location_Logic["Stone Tower Compass Chest"] = Logic.stt_access && (Logic.shoot_light_arrow || (Logic.mirror_shield && Logic.goron_mask && Logic.zora_mask && Logic.explosive));
	Location_Logic["Stone Tower Underwater"] = Logic.istt_access && Logic.zora_mask;
	Location_Logic["Stone Tower Eyegore Room Chest"] = Logic.stt_access && ((Logic.shoot_light_arrow && Logic.zora_mask) || (Logic.explosive && Logic.goron_mask));
	Location_Logic["Stone Tower Bridge Crystal"] = Logic.stt_access && Logic.shoot_light_arrow && Logic.zora_mask;
	Location_Logic["Stone Tower Basement Ledge"] = Logic.stt_access && ((Logic.explosive && Logic.goron_mask) || (Logic.shoot_light_arrow && Logic.zora_mask));
	Location_Logic["Stone Tower Map Chest"] = Logic.stt_access && (((Logic.mirror_shield || Logic.shoot_light_arrow) && Logic.explosive && Logic.goron_mask) || (Logic.shoot_light_arrow && Logic.zora_mask));
	Location_Logic["Stone Tower Armos Room Chest"] = Logic.stt_access && (((Logic.mirror_shield || Logic.shoot_light_arrow) && Logic.explosive && Logic.goron_mask) || (Logic.shoot_light_arrow && Logic.zora_mask));
	Location_Logic["Stone Tower Mirror Sun Switch"] = Logic.stt_access && (Logic.shoot_light_arrow || (Logic.mirror_shield && Logic.goron_mask && Logic.zora_mask && Logic.explosive));
	Location_Logic["Stone Tower Mirror Sun Block"] = Logic.stt_access && (Logic.shoot_light_arrow || (Logic.mirror_shield && Logic.goron_mask && Logic.zora_mask && Logic.explosive));
	Location_Logic["Stone Tower Lava Room Fire Ring"] = Logic.stt_access && (Logic.shoot_light_arrow || (Logic.mirror_shield && Logic.goron_mask && Logic.zora_mask && Logic.explosive)) && Logic.goron_mask && (Logic.shoot_light_arrow || Logic.deku_mask);
	Location_Logic["Stone Tower Lava Room Ledge"] = Logic.stt_access && (Logic.shoot_light_arrow || (Logic.mirror_shield && Logic.goron_mask && Logic.zora_mask && Logic.explosive)) && Logic.deku_mask;
	Location_Logic["Light Arrow Chest"] = Logic.stt_access && (Logic.shoot_light_arrow || (Logic.deku_mask && Logic.mirror_shield && Logic.goron_mask && Logic.zora_mask && Logic.explosive));
	Location_Logic["Stone Tower Thin Bridge"] = (Logic.stt_access && (Logic.shoot_light_arrow || (Logic.deku_mask && Logic.mirror_shield && Logic.goron_mask && Logic.zora_mask && Logic.explosive)) && Logic.explosive) || (Logic.istt_access && Logic.deku_mask);
	Location_Logic["Stone Tower Eyegore"] = Logic.stt_access && (Logic.shoot_light_arrow || (Logic.deku_mask && Logic.mirror_shield && Logic.goron_mask && Logic.zora_mask && Logic.explosive));
	Location_Logic["Stone Tower Death Armos"] = Logic.istt_access && Logic.deku_mask;
	
	// Inverted Stone Tower Temple
	Location_Logic["Stone Tower Entrance Sun Switch"] = Logic.istt_access;
	Location_Logic["Stone Tower Updraft Frozen Eye"] = Logic.istt_access && Logic.deku_mask && Logic.shoot_fire_arrow;
	Location_Logic["Stone Tower Updraft Fire Ring"] = Logic.istt_access && Logic.zora_mask && Logic.deku_mask;
	Location_Logic["Stone Tower Updraft Room Chest"] = Logic.istt_access && Logic.deku_mask;
	Location_Logic["Giant's Mask Chest"] = Logic.istt_access && Logic.deku_mask;
	Location_Logic["Stone Tower Death Armos Maze Chest"] = Logic.istt_access && Logic.deku_mask;
	Location_Logic["Stone Tower Wizzrobe"] = Logic.istt_access && Logic.deku_mask;
	Location_Logic["Stone Tower Boss Key Chest"] = Logic.istt_access && Logic.deku_mask;
	Location_Logic["Stone Tower Heart Container"] = Logic.istt_access && Logic.deku_mask && (Logic.giants_mask || Logic.fiercedeity_mask);
		
	// Songs
	Location_Logic["Starting Song"] = true;
	Location_Logic["Boss Blue Warp"] = Logic.woodfall_clear || Logic.snowhead_clear || Logic.great_bay_clear || Logic.ikana_clear;
	Location_Logic["Romani's Game"] = Logic.ranch_day_1_access;
	Location_Logic["Day 1 Grave Tablet"] = Logic.captains_hat && Logic.ikana_graveyard_access;
	Location_Logic["Imprisoned Monkey"] = Logic.poison_swamp_access && Logic.deku_mask;
	Location_Logic["Swamp Music Statue"] = Logic.poison_swamp_access && Logic.deku_mask;
	Location_Logic["Baby Goron"] = Logic.north_access && Logic.goron_mask;
	Location_Logic["Baby Zoras"] = Logic.zora_egg && Logic.zora_mask && Logic.west_access;
	Location_Logic["Ikana King"] = Logic.ikana_canyon_access && Logic.shoot_fire_arrow && Logic.mirror_shield && (Logic.shoot_light_arrow || (Logic.deku_mask && Logic.powder_keg && Logic.goron_mask && Logic.lens));
	Location_Logic["Skull Kid Song"] = (Logic.deku_mask && Logic.magic) || Logic.bow || Logic.zora_mask || Logic.hookshot;
	
	
	for(let i = 0, Access = Location_Access, Has = Game; i < 2; i++) {
		// South Clock Town
		Access["Clock Tower Entrance"] = true;
		Access["South Clock Town Straw Roof Chest"] = true;
		Access["South Clock Town Final Day Chest"] = Has.hookshot || (Has.deku_mask && Has.moons_tear);
		Access["Clock Town Scrub Trade"] = Has.moons_tear;
		Access["Postbox"] = Has.postmans_hat;
			
		// North Clock Town
		Access["Bombers' Hide and Seek"] = (Has.deku_mask && Has.magic) || Has.zora_mask || Has.bow || Has.hookshot;
		Access["Clock Town Map Purchase"] = true;
		Access["Deku Playground Any Day"] = Has.deku_mask;
		Access["Keaton Quiz"] = Has.keaton_mask;
		Access["North Clock Town Tree"] = true;
		Access["Old Lady"] = true;
		Access["Town Great Fairy"] = true;
		Access["Town Great Fairy Non-Human"] = Has.deku_mask || Has.goron_mask || Has.zora_mask;
			
		// West Clock Town
		Access["Bomb Bag Purchase"] = true;
		Access["Big Bomb Bag Purchase"] = true;
		Access["Bank Reward #1"] = true;
		Access["Postman's Has"] = true;
		Access["Rosa Sisters"] = Has.kamaro_mask;
		Access["Swordsman's School"] = true;
		Access["All-Night Mask Purchase"] = Has.giants_wallet;
		Access["Bank Reward #3"] = true;
		Access["Bank Reward #2"] = true;
			
		// Laundry Pool
		Access["Guru Guru"] = true;
		Access["Kafei"] = Has.letter_to_kafei;
		Access["Curiosity Shop Man #1"] = Has.letter_to_kafei;
		Access["Curiosity Shop Man #2"] = Has.letter_to_kafei;
			
		// East Clock Town
		Access["Bombers' Hideout Chest"] = Has.explosive;
		Access["East Clock Town Chest"] = true;
		Access["Gorman"] = Has.deku_mask && Has.goron_mask && Has.zora_mask && Has.romani_mask;
		Access["Honey and Darling Any Day"] = Has.bow || Has.bomb || (Has.deku_mask && Has.magic);
		Access["Madame Aroma in Bar"] = Has.special_delivery && Has.kafei_mask;
		Access["Madame Aroma in Office"] = true;
		Access["Mayor"] = Has.couples_mask;
		Access["Postman's Freedom Reward"] = Has.special_delivery;
		Access["Town Archery #1"] = Has.bow;
		Access["Treasure Chest Has Goron"] = Has.goron_mask;
		Access["Milk Bar Milk"] = Has.romani_mask;
		Access["Milk Bar Chateau"] = Has.romani_mask && Has.adults_wallet;
		
			
		// Stock Pot Inn
		Access["Inn Reservation"] = true;
		Access["Midnight Meeting"] = Has.kafei_mask/* && Has.night_inn_access*/; // does require night inn access, but removed that to remind to set up meeting...
		Access["Toilet Hand"] = Has.land_title_deed || Has.swamp_title_deed || Has.mountain_title_deed || Has.ocean_title_deed || Has.letter_to_kafei || Has.special_delivery;
		Access["Grandma Short Story"] = Has.allnight_mask;
		Access["Grandma Long Story"] = Has.allnight_mask;
		Access["Inn Staff Room Chest"] = true;
		Access["Inn Guest Room Chest"] = Has.room_key;
			
		// Termina Field
		Access["Astronomy Telescope"] = true;
		Access["Gossip Stones"] = (Has.goron_mask && Has.lullaby) || (Has.deku_mask && Has.sonata && (Has.explosive || Has.goron_mask)) || (Has.zora_mask && Has.nwbn && (Has.explosive || Has.goron_mask));
		Access["Business Scrub Purchase"] = Has.adults_wallet;
		Access["Peahat Grotto"] = true;
		Access["Dodongo Grotto"] = true;
		Access["Kamaro"] = Has.song_of_healing;
		Access["Termina Field Pillar Grotto"] = true;
		Access["Termina Field Grass Grotto"] = true;
		Access["Termina Field Underwater Chest"] = Has.zora_mask;
		Access["Termina Field Grass Chest"] = true;
		Access["Termina Field Stump Chest"] = Has.hookshot || (Has.any_magic_bean && Has.water_for_magic_bean) || (Has.bomb && Has.goron_mask); 
		Access["Bio Baba Grotto"] = Has.zora_mask && (Has.explosive || Has.goron_mask);
			
		// Road to Southern Swamp
		Access["Swamp Archery #1"] = Has.bow;
		Access["Swamp Archery #2"] = Has.bow;
		Access["Path to Swamp Grotto"] = true;
		Access["Path to Swamp Tree"] = true;
		Access["Woodfall Map Purchase"] = true;
		Access["Snowhead Map Purchase"] = (Has.deku_mask && Has.magic) || Has.zora_mask || Has.bow || Has.hookshot;
			
		// Southern Swamp
		Access["Koume"] = Has.any_bottle;
		Access["Kotake"] = true;
		Access["Swamp Scrub Trade"] = Has.land_title_deed;
		Access["Pictograph Contest Winner"] = Has.pictobox;
		Access["Boat Archery"] = Has.woodfall_clear && Has.any_bottle; 
		
		Access["Swamp Spider House Reward"] = Has.poison_swamp_access && (Has.hookshot || Has.zora_mask || (Has.deku_mask && (Has.bow || Has.magic || Has.bomb))) && (Has.hookshot || Has.zora_mask || (Has.deku_mask && Has.water_for_magic_bean)) && Has.any_bottle && (Has.hookshot || Has.zora_mask || (Has.water_for_magic_bean && Has.any_magic_bean && (Has.goron_mask || Has.explosive))) && (Has.hookshot || Has.zora_mask || Has.bow || (Has.deku_mask && Has.magic));
		
		Access["Near Swamp Spider House Grotto"] = Has.poison_swamp_access && (Has.deku_mask || Has.zora_mask);
		Access["Mystery Woods Grotto"] = true;
		Access["Swamp Tourist Center Roof"] = Has.goron_mask || (Has.deku_mask && Has.land_title_deed);
			
		// Deku Palace
		Access["Bean Man"] = Has.poison_swamp_access && Has.deku_mask;
		Access["Butler"] = Has.woodfall_clear && Has.poison_swamp_access && Has.deku_mask && Has.any_bottle; 
		Access["Bean Grotto"] = Has.poison_swamp_access && (((Has.hookshot || Has.water_for_magic_bean) && Has.deku_mask)); 
		Access["Deku Palace West Garden"] = Has.poison_swamp_access && Has.deku_mask;
			
		// Woodfall
		Access["Woodfall Bridge Chest"] = Has.poison_swamp_access && Has.deku_mask;
		Access["Behind Woodfall Owl Chest"] = Has.poison_swamp_access && Has.deku_mask;
		Access["Entrance to Woodfall Chest"] = Has.poison_swamp_access && Has.deku_mask;
			
		// Milk Road
		Access["Gorman Bros Milk Purchase"] = true;
		Access["Gorman Bros Race"] = Has.eponas_song;
		Access["Romani Ranch Map Purchase"] = (Has.deku_mask && Has.magic) || Has.zora_mask || Has.bow || Has.hookshot;
		Access["Great Bay Map Purchase"] = (Has.deku_mask && Has.magic) || Has.zora_mask || Has.bow || Has.hookshot;
			
		// Romani Ranch
		Access["Aliens Defense"] = Has.ranch_day_1_access && Has.bow;
		Access["Dog Race"] = true;
		Access["Grog"] = Has.bremen_mask;
		Access["Cremia"] = Has.ranch_day_1_access && Has.bow;
		Access["Doggy Racetrack Roof Chest"] = true;
			
		// Mountain Village
		Access["Mountain Smithy Day 1"] = Has.north_access && Has.adults_wallet && (Has.shoot_fire_arrow || Has.hot_spring_water || Has.snowhead_clear);
		Access["Mountain Smithy Day 2"] = Has.north_access && Has.bottle_gold_dust && (Has.shoot_fire_arrow || Has.hot_spring_water || Has.snowhead_clear);
		Access["Frog Choir"] = Has.dongero_mask && Has.snowhead_clear && Has.wft_access && Has.gbt_access && Has.hookshot && Has.deku_mask && Has.zora_mask && Has.shoot_ice_arrow && Has.shoot_fire_arrow;
		Access["Hungry Goron"] = Has.north_access && Has.goron_mask && Has.magic && (Has.lullaby || Has.shoot_fire_arrow);
		Access["Darmani"] = Has.song_of_healing && Has.north_access && Has.lens && Has.magic;
		Access["Mountain Waterfall Chest"] = Has.snowhead_clear;
		Access["Mountain Spring Grotto"] = Has.snowhead_clear;
			
		// Twin Islands
		Access["Goron Race"] = Has.snowhead_clear && Has.goron_mask && Has.magic;
		Access["Twin Islands Underwater Ramp Chest"] = Has.snowhead_clear && Has.zora_mask;
		Access["Hot Spring Water Grotto"] = Has.north_access && Has.explosive && (Has.shoot_fire_arrow || Has.hot_spring_water || Has.snowhead_clear);
		Access["Twin Islands Cave Chest"] = Has.snowhead_clear && Has.zora_mask;
		Access["Goron Racetrack Grotto"] = Has.north_access && Has.explosive; // hookshot also needs scarecrow song
			
		// Goron Village
		Access["Goron Shop 10 Arrows"] = Has.north_access;
		Access["Goron Shop 10 Bombs"] = Has.north_access;
		Access["Goron Shop Red Potion"] = Has.north_access;
		Access["Powder Keg Challenge"] = Has.north_access && Has.goron_mask && (Has.shoot_fire_arrow || Has.snowhead_clear);
		Access["Lens of Truth Chest"] = Has.north_access;
		Access["Biggest Bomb Bag Purchase"] = Has.north_access && Has.adults_wallet && (Has.goron_mask || (Has.deku_mask && Has.moons_tear && Has.land_title_deed && Has.swamp_title_deed));
		Access["Mountain Scrub Trade"] = Has.north_access && Has.deku_mask && Has.swamp_title_deed;
		Access["Lens Cave Invisible Chest"] = Has.north_access;
		Access["Lens Cave Rock Chest"] = Has.north_access && Has.explosive;
		Access["Goron Village Ledge"] = Has.north_access && Has.deku_mask && Has.swamp_title_deed;
			
		// Path to Snowhead
		Access["Path to Snowhead Grotto"] = Has.north_access && Has.explosive && Has.goron_mask;
		Access["Path to Snowhead Pillar"] = Has.north_access && Has.goron_mask && Has.hookshot;
			
		// Great Bay Coast
		Access["Ocean Spider House Day 1 Reward"] = Has.ocean_skulltulas;
		Access["Fisherman Has"] = Has.great_bay_clear && Has.hookshot;
		Access["Ocean Spider House Chest"] = Has.bow && Has.ocean_skulltulas;
		Access["Mikau"] = Has.west_access && Has.song_of_healing;
		Access["Great Bay Coast Grotto"] = Has.west_access;
		Access["Lab Fish"] = Has.west_access && Has.any_bottle;
		Access["Great Bay Coast Ledge"] = Has.west_access && Has.hookshot && ((Has.any_magic_bean && Has.water_for_magic_bean) || Has.explosive);
		Access["Stone Tower Map Purchase"] = Has.west_access && (Has.hookshot || Has.bow);
		Access["Fisherman Pictograph"] = Has.pictobox && Has.west_access && Has.pirates_fortress_access;
			
		// Zora Cape
		Access["Beaver Race #1"] = Has.hookshot && Has.zora_mask && Has.west_access;
		Access["Beaver Race #2"] = Has.hookshot && Has.zora_mask && Has.west_access;
		Access["Zora Cape Ledge Without Tree Chest"] = Has.hookshot && Has.west_access;
		Access["Zora Cape Ledge With Tree Chest"] = Has.hookshot && Has.west_access;
		Access["Zora Cape Grotto"] = Has.west_access && (Has.goron_mask || Has.explosive);
		Access["Zora Cape Underwater Chest"] = Has.zora_mask && Has.west_access;
		Access["Zora Cape Like-Like"] = Has.west_access && Has.zora_mask;
			
		// Zora Hall
		Access["Zora Shop 10 Arrows"] = Has.zora_mask && Has.west_access;
		Access["Zora Shop Hero's Shield"] = Has.zora_mask && Has.west_access;
		Access["Zora Shop Red Potion"] = Has.zora_mask && Has.west_access;
		Access["Ocean Scrub Trade"] = Has.goron_mask && Has.mountain_title_deed && Has.zora_mask && Has.west_access;
		Access["Evan"] = Has.zora_mask && Has.west_access;
		Access["Lulu's Room Ledge"] = Has.pirates_fortress_access;
		Access["Zora Hall Stage Lights"] = Has.shoot_fire_arrow && Has.west_access;
			
		// Pirates' Fortress Exterior
		Access["Pirates' Fortress Exterior Log Chest"] = Has.pirates_fortress_access;
		Access["Pirates' Fortress Exterior Sand Chest"] = Has.pirates_fortress_access;
		Access["Pirates' Fortress Exterior Corner Chest"] = Has.pirates_fortress_access;
			
		// Pirates' Fortress Sewer
		Access["Pirates' Fortress Cage Room Shallow Chest"] = Has.pirates_fortress_access && Has.goron_mask;
		Access["Pirates' Fortress Cage Room Deep Chest"] = Has.pirates_fortress_access && Has.goron_mask;
		Access["Pirates' Fortress Maze Chest"] = Has.pirates_fortress_access && Has.goron_mask;
		Access["Pirates' Fortress Cage"] = Has.pirates_fortress_access && Has.goron_mask;
			
		// Pirates' Fortress Interior
		Access["Hookshot Chest"] = Has.pirates_fortress_access && ((Has.bow || (Has.deku_mask && Has.magic)) && (Has.goron_mask || Has.hookshot));
		Access["Pirates' Fortress Interior Lower Chest"] = Has.pirates_fortress_access && (Has.goron_mask || Has.hookshot);
		Access["Pirates' Fortress Interior Upper Chest"] = Has.pirates_fortress_access && Has.hookshot;
		Access["Pirates' Fortress Interior Tank Chest"] = Has.pirates_fortress_access && Has.hookshot;
		Access["Pirates' Fortress Interior Guard Room Chest"] = Has.pirates_fortress_access && Has.hookshot;
			
		// Pinnacle Rock
		Access["Seahorses"] = Has.west_access && Has.zora_mask && Has.any_bottle && Has.seahorse;
		Access["Pinnacle Rock Lower Chest"] = Has.pinnacle_rock_access && Has.west_access;
		Access["Pinnacle Rock Upper Chest"] = Has.pinnacle_rock_access && Has.west_access;
			
		// Path to Ikana Canyon
		Access["Invisible Soldier"] = Has.lens && Has.magic && Has.any_bottle && Has.eponas_song;
		Access["Path to Ikana Pillar Chest"] = Has.hookshot;
		Access["Path to Ikana Grotto"] = Has.goron_mask;
			
		// Ikana Graveyard
		Access["Dampe Digging"] = Has.captains_hat && Has.ikana_graveyard_access && (Has.zora_mask || Has.bow);
		Access["Iron Knuckle Chest"] = Has.captains_hat && Has.ikana_graveyard_access && Has.explosive;
		Access["Captain Keeta's Chest"] = Has.sonata && Has.ikana_graveyard_access && (Has.bow || Has.bomb);
		Access["Day 1 Grave Bats"] = Has.captains_hat && Has.ikana_graveyard_access;
		Access["Ikana Graveyard Grotto"] = Has.ikana_graveyard_access && Has.explosive;
			
		// Ikana Canyon
		Access["Poe Hut"] = Has.ikana_canyon_access && (Has.bow || Has.bomb);
		Access["Pamela's Father"] = Has.song_of_healing && Has.ikana_canyon_access && Has.song_of_storms;
		Access["Secret Shrine Grotto"] = Has.east_access;
		Access["Ikana Canyon Ledge"] = Has.east_access && Has.zora_mask && Has.ocean_title_deed && Has.deku_mask;
		Access["Canyon Scrub Trade"] = Has.zora_mask && Has.ocean_title_deed && Has.east_access;
			
		// Secret Shrine
		Access["Secret Shrine Final Chest"] = Has.shoot_light_arrow && Has.east_access;
		Access["Secret Shrine Dinolfos Chest"] = Has.shoot_light_arrow && Has.east_access;
		Access["Secret Shrine Wizzrobe Chest"] = Has.shoot_light_arrow && Has.east_access;
		Access["Secret Shrine Wart Chest"] = Has.shoot_light_arrow && Has.east_access;
		Access["Secret Shrine Garo Master Chest"] = Has.shoot_light_arrow && Has.east_access;
			
		// Beneath the Well 
		Access["Mirror Shield Chest"] = Has.ikana_canyon_access && (
			(Has.shoot_fire_arrow && Has.shoot_light_arrow) // from castle, have fire arrows
			|| (Has.shoot_light_arrow && Has.gibdo_mask && Has.any_milk && Has.big_poe) // from castle, use the stick to bring fire through
			|| (Has.gibdo_mask && Has.big_poe && Has.any_milk && Has.limitless_magic_beans) // normal well path
		);
		Access["Well Right Path Chest"] =  Has.ikana_canyon_access && Has.gibdo_mask && Has.any_bottle && (
			Has.shoot_light_arrow // from castle
			|| Has.limitless_magic_beans // normal well path
		);
		Access["Well Left Path Chest"] = Has.ikana_canyon_access && Has.gibdo_mask && Has.any_blue_potion;
			
		// Ikana Castle
		Access["Ikana Castle Pillar"] = Has.ikana_canyon_access && Has.shoot_fire_arrow && Has.deku_mask && (Has.mirror_shield || Has.zora_mask || Has.shoot_light_arrow);
			
		// Stone Tower
		Access["Inverted Stone Tower Left Chest"] = Has.istt_access && Has.any_magic_bean && Has.water_for_magic_bean;
		Access["Inverted Stone Tower Middle Chest"] = Has.istt_access && Has.any_magic_bean && Has.water_for_magic_bean;
		Access["Inverted Stone Tower Right Chest"] = Has.istt_access && Has.any_magic_bean && Has.water_for_magic_bean;	
		
		// Woodfall Temple
		Access["Woodfall Entrance Platform"] = Has.wft_access;
		Access["Woodfall Dark Room"] = Has.wft_access;
		Access["Woodfall Main Room Switch"] = Has.wft_access;
		Access["Hero's Bow Chest"] = Has.wft_access;
		Access["Woodfall Map Chest"] = Has.wft_access;
		Access["Woodfall Small Key Chest"] = Has.wft_access;
		Access["Woodfall Compass Chest"] = Has.wft_access;
		Access["Woodfall Boss Key Chest"] = Has.wft_access && Has.bow;
		Access["Woodfall Heart Container"] = Has.wft_access && Has.bow;
			
		// Snowhead Temple
		Access["Fire Arrow Chest"] = Has.sht_access && (Has.shoot_fire_arrow || (Has.hookshot && Has.magic) || Has.explosive);
		Access["Snowhead Heart Container"] = Has.sht_access && Has.shoot_fire_arrow;
		Access["Snowhead Boss Key Chest"] = Has.sht_access && Has.shoot_fire_arrow;
		Access["Snowhead Basement"] = Has.sht_access;
		Access["Snowhead Compass Chest"] = Has.sht_access;
		Access["Snowhead Block Room Chest"] = Has.sht_access && (Has.magic || Has.hookshot || Has.explosive || Has.zora_mask);
		Access["Snowhead Bridge Room Chest"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.shoot_fire_arrow || Has.zora_mask);
		Access["Snowhead Ice Puzzle"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.zora_mask);
		Access["Snowhead Icicle Room Chest"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.shoot_fire_arrow);
		Access["Snowhead Icicle Room Wall"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.shoot_fire_arrow);
		Access["Snowhead Main Room Wall"] = Has.sht_access && ((Has.hookshot && Has.magic) || Has.shoot_fire_arrow);
		Access["Snowhead Map Chest"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.shoot_fire_arrow || Has.zora_mask || Has.magic);
		Access["Snowhead Map Room Ledge"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.shoot_fire_arrow);
		Access["Snowhead Pillar Freezards"] = Has.sht_access && Has.shoot_fire_arrow;
		Access["Snowhead Twin Block"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.shoot_fire_arrow || Has.zora_mask);
			
		// Great Bay Temple
		Access["Great Bay Entrance Torches"] = Has.gbt_access;
		Access["Great Bay Bio Babas"] = Has.gbt_access;
		Access["Great Bay Green Valve"] = Has.gbt_access && Has.shoot_ice_arrow;
		Access["Great Bay Seesaw Room"] = Has.gbt_access && Has.shoot_ice_arrow;
		Access["Great Bay Waterwheel Room Lower"] = Has.gbt_access && Has.shoot_ice_arrow;
		Access["Great Bay Waterwheel Room Upper"] = Has.gbt_access && Has.shoot_ice_arrow;
		Access["Ice Arrow Chest"] = Has.gbt_access;
		Access["Great Bay Boss Key Chest"] = Has.gbt_access;
		Access["Great Bay Map Chest"] = Has.gbt_access;
		Access["Great Bay Compass Chest"] = Has.gbt_access;
		Access["Great Bay Small Key Chest"] = Has.gbt_access;
		Access["Great Bay Heart Container"] = Has.gbt_access && Has.shoot_ice_arrow;
		
		// Stone Tower Temple
		Access["Stone Tower Statue Eye"] = Has.stt_access && Has.bow;
		Access["Stone Tower Compass Chest"] = Has.stt_access && (Has.shoot_light_arrow || (Has.mirror_shield && Has.goron_mask && Has.zora_mask));
		Access["Stone Tower Underwater"] = Has.istt_access && Has.zora_mask;
		Access["Stone Tower Eyegore Room Chest"] = Has.stt_access && ((Has.shoot_light_arrow && Has.zora_mask) || (Has.explosive && Has.goron_mask));
		Access["Stone Tower Bridge Crystal"] = Has.stt_access && ((Has.shoot_light_arrow && Has.zora_mask) || (Has.explosive && Has.goron_mask && (Has.zora_mask || Has.light_arrow)));
		Access["Stone Tower Basement Ledge"] = Has.stt_access && ((Has.mirror_shield && Has.explosive && Has.goron_mask) || (Has.explosive && Has.shoot_light_arrow && Has.goron_mask) || (Has.shoot_light_arrow && Has.zora_mask));
		Access["Stone Tower Map Chest"] = Has.stt_access && ((Has.explosive && Has.goron_mask) || (Has.shoot_light_arrow && Has.zora_mask));
		Access["Stone Tower Armos Room Chest"] = Has.stt_access && ((Has.mirror_shield && Has.explosive && Has.goron_mask) || (Has.explosive && Has.shoot_light_arrow && Has.goron_mask) || (Has.shoot_light_arrow && Has.zora_mask));
		Access["Stone Tower Mirror Sun Switch"] = Has.stt_access && (Has.shoot_light_arrow || (Has.mirror_shield && Has.goron_mask && Has.zora_mask && Has.explosive));
		Access["Stone Tower Mirror Sun Block"] = Has.stt_access && (Has.shoot_light_arrow || (Has.mirror_shield && Has.goron_mask && Has.zora_mask && Has.explosive));
		Access["Stone Tower Lava Room Fire Ring"] = Has.stt_access && (Has.shoot_light_arrow || (Has.mirror_shield && Has.goron_mask && Has.zora_mask && Has.explosive)) && Has.goron_mask && (Has.shoot_light_arrow || Has.deku_mask);
		Access["Stone Tower Lava Room Ledge"] = Has.stt_access && (Has.shoot_light_arrow || (Has.mirror_shield && Has.goron_mask && Has.zora_mask && Has.explosive)) && Has.deku_mask;
		Access["Light Arrow Chest"] = Has.stt_access && (Has.shoot_light_arrow || (Has.deku_mask && Has.mirror_shield && Has.goron_mask && Has.zora_mask && Has.explosive));
		Access["Stone Tower Thin Bridge"] = (Has.stt_access && (Has.shoot_light_arrow || (Has.deku_mask && Has.mirror_shield && Has.goron_mask && Has.zora_mask && (Has.explosive || Has.great_fairy_sword))) && Has.explosive) || (Has.istt_access && Has.deku_mask);
		Access["Stone Tower Eyegore"] = Has.stt_access && (Has.shoot_light_arrow || (Has.deku_mask && Has.mirror_shield && Has.goron_mask && Has.zora_mask && Has.explosive));
		Access["Stone Tower Death Armos"] = Has.istt_access && Has.deku_mask;
		
		// Inverted Stone Tower Temple
		Access["Stone Tower Entrance Sun Switch"] = Has.istt_access;
		Access["Stone Tower Updraft Frozen Eye"] = Has.istt_access && Has.shoot_fire_arrow;
		Access["Stone Tower Updraft Fire Ring"] = Has.istt_access && Has.zora_mask && Has.deku_mask;
		Access["Stone Tower Updraft Room Chest"] = Has.istt_access;
		Access["Giant's Mask Chest"] = Has.istt_access;
		Access["Stone Tower Death Armos Maze Chest"] = Has.istt_access && (Has.deku_mask || Has.explosive);
		Access["Stone Tower Wizzrobe"] = Has.istt_access && Has.deku_mask;
		Access["Stone Tower Boss Key Chest"] = Has.istt_access;
		Access["Stone Tower Heart Container"] = Has.istt_access;
			
		// Songs
		Access["Starting Song"] = true;
		Access["Boss Blue Warp"] = Has.woodfall_clear || Has.snowhead_clear || Has.great_bay_clear || Has.ikana_clear;
		Access["Romani's Has"] = Has.ranch_day_1_access;
		Access["Day 1 Grave Tablet"] = Has.captains_hat && Has.ikana_graveyard_access;
		Access["Imprisoned Monkey"] = Has.poison_swamp_access && Has.deku_mask;
		Access["Swamp Music Statue"] = Has.poison_swamp_access && Has.deku_mask;
		Access["Baby Goron"] = Has.north_access && Has.goron_mask;
		Access["Baby Zoras"] = Has.zora_egg && Has.zora_mask && Has.west_access;
		Access["Ikana King"] = Has.ikana_canyon_access && Has.shoot_fire_arrow && Has.mirror_shield && (Has.shoot_light_arrow || ((Has.deku_mask || Has.zora_mask) && Has.powder_keg && Has.goron_mask));
		Access["Skull Kid Song"] = (Has.deku_mask && Has.magic) || Has.bow || Has.zora_mask || Has.hookshot || Has.bomb || Has.blast_mask;
	
		Access = Location_Could_Access;
		Has = CouldHave;
	}
	
	// Peek Logic
	Object.assign(Location_Peek, Location_Access);
	Object.assign(Location_Could_Peek, Location_Could_Access);
	
	// World Model/NPC Text Peeks
	for(let i = 0, Peek = Location_Peek, Has = Game; i < 2; i++) {
		Peek["All-Night Mask Purchase"] = true;
		Peek["Milk Bar Chateau"] = Has.romani_mask;
		Peek["Business Scrub Purchase"] = true;
		Peek["Bio Baba Grotto"] = (Has.zora_mask || Has.hookshot || Has.bow || (Has.deku_mask && Has.magic)) && (Has.explosive || Has.goron_mask);
		Peek["Swamp Tourist Center Roof"] = true;
		Peek["Hungry Goron"] = Has.north_access && Has.goron_mask && Has.magic;
		Peek["Biggest Bomb Bag Purchase"] = Has.north_access && (Has.goron_mask || Has.deku_mask);
		Peek["Goron Village Ledge"] = Has.north_access;
		Peek["Path to Snowhead Pillar"] = Has.north_access && Has.goron_mask;
		Peek["Great Bay Coast Ledge"] = Has.west_access;
		Peek["Zora Cape Like-Like"] = Has.west_access && (Has.zora_mask || Has.bow);
		Peek["Ikana Canyon Ledge"] = Has.east_access;
		Peek["Ikana Castle Pillar"] = Has.ikana_canyon_access && (Has.shoot_light_arrow || Has.mirror_shield || Has.zora_mask);
		Peek["Kafei"] = true;
		Peek["Curiosity Shop Man #1"] = true;
		Peek["Postman's Freedom Reward"] = true;
		Peek["Swamp Spider House Reward"] = Has.poison_swamp_access;
		Peek["Hungry Goron"] = Has.north_access;
		
		Peek = Location_Could_Peek;
		Has = CouldHave;
	}
	Location_Could_Peek["Zora Cape Like-Like"] = CouldHave.west_access && (CouldHave.zora_mask || CouldHave.bow || CouldHave.bomb);
	
	// CSMC Peeks
	for(let i = 0, Peek = Location_Peek, Has = Game; i < 2; i++) {
		Peek["South Clock Town Final Day Chest"] = true;
		Peek["Bombers' Hideout Chest"] = true;
		Peek["Termina Field Underwater Chest"] = true;
		Peek["Termina Field Stump Chest"] = true; 
		Peek["Bean Grotto"] = Has.poison_swamp_access && Has.deku_mask; 
		Peek["Hot Spring Water Grotto"] = Has.north_access && (Has.shoot_fire_arrow || Has.hot_spring_water || Has.snowhead_clear);
		Peek["Twin Islands Underwater Ramp Chest"] = Has.north_access;
		Peek["Twin Islands Cave Chest"] = Has.snowhead_clear;
		Peek["Lens Cave Rock Chest"] = Has.north_access;
		Peek["Zora Cape Ledge Without Tree Chest"] = Has.west_access;
		Peek["Zora Cape Underwater Chest"] = Has.west_access;
		Peek["Pirates' Fortress Interior Upper Chest"] = Has.pirates_fortress_access && (Has.hookshot || Has.goron_mask);
		Peek["Path to Ikana Pillar Chest"] = true;
		Peek["Captain Keeta's Chest"] = Has.ikana_graveyard_access;
		Peek["Snowhead Main Room Wall"] = Has.sht_access && ((Has.hookshot && Has.magic) || Has.shoot_fire_arrow || Has.explosive);
		Peek["Snowhead Map Room Ledge"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.shoot_fire_arrow || Has.zora_mask);
		Peek["Snowhead Twin Block"] = Has.sht_access && (Has.hookshot || Has.explosive || Has.magic || Has.zora_mask);
		Peek["Snowhead Ice Puzzle"] = Has.sht_access;
		Peek["Stone Tower Compass Chest"] = Has.stt_access;
		Peek["Stone Tower Eyegore Room Chest"] = Has.stt_access && (Has.istt_access || (Has.shoot_light_arrow && Has.zora_mask) || (Has.explosive && Has.goron_mask));
		Peek["Stone Tower Bridge Crystal"] = Has.stt_access && ((Has.shoot_light_arrow && Has.zora_mask) || (Has.explosive && Has.goron_mask));
		Peek["Stone Tower Thin Bridge"] = (Has.stt_access && (Has.shoot_light_arrow || (Has.deku_mask && Has.mirror_shield && Has.goron_mask && Has.zora_mask && Has.explosive)) && (Has.explosive || Has.great_fairy_sword)) || (Has.istt_access && Has.deku_mask);
		Peek["Stone Tower Underwater"] = Has.istt_access;
		Peek["Stone Tower Death Armos Maze Chest"] = Has.stt_access || (Has.istt_access && (Has.deku_mask || Has.explosive));
		
		Access = Location_Could_Peek;
		Has = CouldHave;
	}
}
