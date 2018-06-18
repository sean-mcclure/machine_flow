function draw_data() {
    remove_element('table_data', 1)
    read_local_file({
        "file_path": hold_paths['result_path'] + listen_for_value('choose_dataset', 1),
        "done": `
        add_visual("modal_content", 1, {
            "this_class": "table_data",
            "type": "table",
            "width": "auto",
            "height": "280px",
            "data_color": "#33AADE",
            "data": data
        })
        style_visual('table_data', 1, {
            "background": "white",
            "font-family": "Titillium Web",
            "border": "4px solid darkslategrey",
            "header_background": "#33AADE",
            "header_color": "white"
        })
        `
    })
}