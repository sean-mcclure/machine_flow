load_fonts({
    "font": "Titillium+Web"
})

load_fonts({
    "font": "Titan+One"
})

style_body({
    "background": "#dedede",
    "font-family": "Titillium Web",
    "min-width": "1200px"
})

add_navigation_bar({
    "this_class": "my_nav"
})

style_navigation_bar('my_nav', 1, {
    "height": "95px",
    "width": "100%",
    "padding": 0
})

add_layout('my_nav', 1, {
    "this_class": "nav_layout",
    "cell_class": "nav_layout_cells",
    "row_class": "nav_layout_rows",
    "number_of_rows": 1,
    "number_of_columns": 3
})
style_layout('nav_layout', 1, {
    "height": "60px",
    "column_widths": ['20%', '55%', '25%'],
    "border": 0
})
style_layout('nav_layout_cells', 3, {
    "halign": "center"
})

move_up_down('my_nav', 1, 'up')

add_image('nav_layout_cells', 1, {
    "this_class": "logo",
    "image_path": "images/logo.png"
})
style_image('logo', 1, {
    "width": "230px",
    "padding": "8px"
})

add_text('nav_layout_cells', 2, {
    "this_class": "title",
    "text": "MACHINE FLOW"
})
style_text('title', 1, {
    "font-size": "36px",
    "color": "#33AADE",
    "align": "center",
    "font-style": "italic",
    "font-family": "Titan One",
    "text-shadow": "2px 2px 0px rgba(66, 255, 240, 0.96)"
})

add_layout('nav_layout_cells', 3, {
    "this_class": "hold_buttons",
    "cell_class": "hold_buttons_cells",
    "row_class": "hold_buttons_rows",
    "number_of_rows": 1,
    "number_of_columns": 6
})
style_layout('hold_buttons', 1, {
    "height": "60px",
    "width": "450px",
    "margin-right": "10px",
    "border": 0
})

add_button('hold_buttons_cells', 1, {
    "this_class": "add_node_button",
    "text": "ADD NODE"
})

style_button('add_node_button', 1, {
    "background": "#bae1ff",
    "color": "darkslategrey"
})

add_event('add_node_button', 1, {
    "type": "click",
    "function": "add_node()"
})

add_button('hold_buttons_cells', 2, {
    "this_class": "endpoints_button",
    "text": "ENDPOINTS"
})

style_button('endpoints_button', 1, {
    "background": "#ffdfba",
    "color": "darkslategrey"
})

add_event('endpoints_button', 1, {
    "type": "click",
    "function": "open_endpoints()"
})

add_button('hold_buttons_cells', 3, {
    "this_class": "save_button",
    "text": "SAVE"
})

style_button('save_button', 1, {
    "background": "#ffffba",
    "color": "darkslategrey"
})

add_event('save_button', 1, {
    "type": "click",
    "function": "save_workflow()"
})

add_button('hold_buttons_cells', 4, {
    "this_class": "load_button",
    "text": "LOAD"
})

style_button('load_button', 1, {
    "background": "#baffc9",
    "color": "darkslategrey"
})

add_event('load_button', 1, {
    "type": "click",
    "function": "pop_reader()"
})

add_button('hold_buttons_cells', 5, {
    "this_class": "new_button",
    "text": "NEW"
})

style_button('new_button', 1, {
    "background": "#c0b7ff",
    "color": "darkslategrey"
})

add_event('new_button', 1, {
    "type": "click",
    "function": "new_workflow(); animate_element('new_button', 1, {'type' : 'spin', 'speed' : 300})"
})

add_icon('hold_buttons_cells', 6, {
    "this_class": "open_settings",
    "icon_class": "fa-cog"
})
style_icon('open_settings', 1, {
    "color": "black",
    "cursor": "pointer",
    "font-size": "30px",
    "margin-right": "-4px"
})

add_event('open_settings', 1, {
    "type": "click",
    "function": `
add_modal({
"this_class" : "settings_modal",
"content_class" : "settings_modal_content",
"confirm_button" : false
})
style_modal('settings_modal', 1, {
"width" : "auto"
})
add_text('settings_modal_content', 1, {
    	"this_class" : "line_break_title",
    	"text" : "<br>READ PATH<br><br>"
    	})
add_input('settings_modal_content', 1, {
"this_class" : "read_path_input",
"placeholder" : "...",
"spellcheck" : false,
"default_value" : hold_paths['read_path']
})
add_event('read_path_input', 1, {
"type" : "as_change",
"function" : "save_paths()"
})
add_text('settings_modal_content', 1, {
    	"this_class" : "line_break_title",
    	"text" : "<br><br>WRITE PATH<br><br>"
    	})
add_input('settings_modal_content', 1, {
"this_class" : "write_path_input",
"placeholder" : "...",
"spellcheck" : false,
"default_value" : hold_paths['write_path']
})
add_event('write_path_input', 1, {
"type" : "as_change",
"function" : "save_paths()"
})
add_text('settings_modal_content', 1, {
    	"this_class" : "line_break_title",
    	"text" : "<br><br>RESULT PATH<br><br>"
    	})
add_input('settings_modal_content', 1, {
"this_class" : "result_path_input",
"placeholder" : "...",
"spellcheck" : false,
"default_value" : hold_paths['result_path']
})
add_event('result_path_input', 1, {
"type" : "as_change",
"function" : "save_paths()"
})
style_input('read_path_input', 1, {
"margin-top" : "-12px"
})
style_input('write_path_input', 1, {
"margin-top" : "-12px"
})
style_input('result_path_input', 1, {
"margin-top" : "-12px"
})
`
})


add_navigation_bar({
    "this_class": "second_nav_for_slider"
})
style_navigation_bar('second_nav_for_slider', 1, {
    "height": "95px",
    "width": "100%",
    "background": "white",
    "padding": 0
})

add_layout('second_nav_for_slider', 1, {
    "this_class": "slider_layout",
    "cell_class": "slider_layout_cells",
    "row_class": "slider_layout_rows",
    "number_of_rows": 1,
    "number_of_columns": 2
})
style_layout('slider_layout', 1, {
    "height": "60px",
    "width": "700px",
    "border": 0
})

add_text('slider_layout_cells', 1, {
    "this_class": "slider_title",
    "text": "WORKFLOW HEIGHT<br>"
})
style_text('slider_title', 1, {
    "padding": "10px"
})
add_slider('slider_layout_cells', 1, {
    "this_class": "slide_d3_height",
    "default_value": 500,
    "min_value": 500,
    "max_value": 1000
})
style_slider('slide_d3_height', 1, {
    "margin-left": "10px"
})
add_event('slide_d3_height', 1, {
    "type": "change",
    "function": "localStorage.setItem('tree_height_from_slider', this.value); setTimeout(function() {location.reload()}, 400)"
})

add_text('slider_layout_cells', 2, {
    "this_class": "slider_title_w",
    "text": "WORKFLOW WIDTH<br>"
})
style_text('slider_title_w', 1, {
    "padding": "10px"
})
add_slider('slider_layout_cells', 2, {
    "this_class": "slide_d3_height_w",
    "default_value": 1200,
    "min_value": 1400,
    "max_value": 10000
})
style_slider('slide_d3_height_w', 1, {
    "margin-left": "10px"
})
add_event('slide_d3_height_w', 1, {
    "type": "change",
    "function": "localStorage.setItem('tree_width_from_slider', this.value); setTimeout(function() {location.reload()}, 400)"
})

hold_paths = {
"read_path" : "../data/",
"write_path" : "../data/",
"result_path" : "../data/"
}

function save_paths() {
    hold_paths['read_path'] = listen_for_value('read_path_input', 1)
    hold_paths['write_path'] = listen_for_value('write_path_input', 1)
    hold_paths['result_path'] = listen_for_value('result_path_input', 1)
}

// enter key
function enable_enter_key() {
    $(document).keypress(function(e) {
        var key = e.which;
        if (key == 13) {
            click_element('add_node_button', 1)
            return false;
        }
    });
}

function disable_enter_key() {
    $(document).off("keypress")
}

enable_enter_key();

$(document).on('click', function(e) {
    clicked_id = e.target.id;
    if (e.target.id != '') {
        clicked_class = $('#' + e.target.id).attr('class');
        if (typeof(clicked_class) !== 'undefined') {
            if (!clicked_class.includes('new_button')) {
                save_on_action()
            }
        }
    }
});


function fill_fields() {
    $('.read_path_input').val('../data/')
    $('.write_path_input').val('../data/')
    $('.result_path_input').val('../ml_proto_service/data/')
    $('.add_endpoint_url').val('http://localhost:9191/api')
    $('.endpoint_name').val('list_data');
    check_checkbox('check_data', 1)
    trigger_event('read_path_input', 1, {
        'event': 'change'
    })
    trigger_event('write_path_input', 1, {
        'event': 'change'
    })
    trigger_event('result_path_input', 1, {
        'event': 'change'
    })
    trigger_event('add_endpoint_url', 1, {
        'event': 'change'
    })
    trigger_event('endpoint_name', 1, {
        'event': 'change'
    })
}