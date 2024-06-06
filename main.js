function Update() {	
	process_inputs();
	woth_and_barren_processing();
	update_item_logic();
	update_location_logic();
	update_check_display();
	process_hint_inputs();
	handle_item_highlights();
	update_summary_text();
	update_settings();
}
