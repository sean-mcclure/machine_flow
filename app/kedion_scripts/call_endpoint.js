result_options = {
    "show_datasets": "add_drop_to_first()",
    "image": "clear_and_add_results('image')",
    "data": "clear_and_add_results('data')"
}

use_read_path = ''

function call_endpoint(root_url, parameters_object, result_type, full_write_path) {

    use_read_path = full_write_path

    call_api({
        "url": root_url,
        "parameters": JSON.stringify(parameters_object),
        "done": "delay_results('" + result_type + "')",
        "fail": "console.log(error.status + ' : ' + error.statusText)"
    })

    animate_element('run_endpoint_button', 1, {
        "type": "spin",
        "iterations": "infinite"
    })

}

// ******* DELAY FUNCTION
function delay_results(result_type) {
    delay_event({
        "delay": 400,
        "function": result_options[result_type]
    })
}

// ******* RESULT FUNCTIONS
function add_drop_to_first() {
    read_local_file({
        "file_path": use_read_path,
        "done": `
            add_dropdown('modal_content', 1, {
                "this_class" : "choose_dataset",
                "title" : "choose dataset...",
                "options" : filter_drop_options(data)
            })
            style_dropdown('choose_dataset', 1, {
                "height" : "36px",
                "margin-bottom" : "20px"
            })
            add_event('choose_dataset', 1, {
                "type" : "change",
                "function" : "draw_data()"
            })
            add_event('choose_dataset', 1, {
                "type" : "change",
                "function" : "add_value('node_title', 1, {'value' : this.value.replace('.json', '')}); trigger_event('node_title', 1, {'event' : 'change'})"
            })
            style_modal('my_modal', 1, {
    	        "width" : "900px",
    	        "height" : "450px"
    	    })
           `
    })
}

use_result_type = ''

function clear_and_add_results(result_pass) {
    use_result_type = result_pass
    empty_contents('modal_content', 1);
    remove_element('run_endpoint_button', 1)
    add_text('modal_content', 1, {
        "this_class": "close_set_node",
        "text": "X"
    })
    style_text('close_set_node', 1, {
        "float": "right",
        "cursor": "pointer",
        "font-size": "18px"
    })
    add_event('close_set_node', 1, {
        "type": "click",
        "function": "close_modal(); enable_enter_key(); hold_text_id_for_call=[]"
    })

    add_input('modal_content', 1, {
        "this_class": "node_title",
        "placeholder": "node name...",
        "maxlength": 30,
        "spellcheck": false
    })
    style_input('node_title', 1, {
        "border-style": "none none solid none",
        "text-align": "center"
        //"text-transform" : "uppercase"
    })
    add_event('node_title', 1, {
        "type": "change",
        "function": "add_node_title('" + hold_text_id_for_call[0] + "')"
    })
    add_value('node_title', 1, {
        'value': $('#' + hold_text_id_for_call[0]).text()
    })
    add_text('modal_content', 1, {
        "this_class": "line_break_title",
        "text": "<br><br>"
    })

    delay_event({
        "delay": 1000,
        "function": `
        add_layout('modal_content', 1, {
    	"this_class" : "hold_results_layout",
    	"row_class" : "hold_results_layout_row",
    	"cell_class" : "hold_results_layout_cell",
    	"number_of_rows" : 1,
    	"number_of_columns" : 1
    	})
    	style_layout('hold_results_layout', 1, {
    	"max-height" : "400px",
    	"width" : "100%",
    	"align" : "center",
    	"border" : 0
     	})
     	style_layout('hold_results_layout_cell', 1, {
     	    "valign" : "center",
     	    "halign" : "center"
     	})
     	if(use_result_type == 'image') {
        add_image('hold_results_layout_cell', 1, {
            "this_class" : "result_image",
            "image_path" : use_read_path
            });
        style_image('result_image', 1, {
            'width' : '700px'
        })
        style_modal('my_modal', 1, {
    	        "width" : "900px",
    	        "height" : "450px"
    	    })
        }
        if(use_result_type == 'data') {
        show_inter_data(use_read_path)
        }
        `
    })
}

function show_existing(this_node_write_path, result_type, text_id) {
    empty_contents('modal_content', 1);
    remove_element('run_endpoint_button', 1)
    add_text('modal_content', 1, {
        "this_class": "close_set_node",
        "text": "X"
    })
    style_text('close_set_node', 1, {
        "float": "right",
        "cursor": "pointer",
        "font-size": "18px"
    })
    add_event('close_set_node', 1, {
        "type": "click",
        "function": "close_modal(); hold_text_id_for_call=[]; click_glow_on_exit()"
    })
    add_icon('modal_content', 1, {
        "this_class": "glow_path",
        "icon_class": "fa-sun-o"
    })
    style_icon('glow_path', 1, {
        "font-size": "24px",
        "color": "purple",
        "float": "left",
        "cursor": "pointer"
    })
    add_event('glow_path', 1, {
        "type": "click",
        "function": "cycle_through_branch('" + text_id + "', 'style_nodes'); show_path()"
    })
    add_tooltip("glow_path", 1, {
        "text": "show path",
        "margin-top": "0px",
        "margin-left": "5px",
        "background": "darkslategrey"
    })

    add_input('modal_content', 1, {
        "this_class": "node_title",
        "placeholder": "node name...",
        "maxlength": 30,
        "spellcheck": false
    })
    style_input('node_title', 1, {
        "border-style": "none none solid none",
        "text-align": "center"
        //"text-transform" : "uppercase"
    })
    add_event('node_title', 1, {
        "type": "change",
        "function": "add_node_title('" + hold_text_id_for_call[0] + "')"
    })
    add_value('node_title', 1, {
        'value': $('#' + hold_text_id_for_call[0]).text()
    })
    add_text('modal_content', 1, {
        "this_class": "line_break_title",
        "text": "<br><br>"
    })
    add_layout('modal_content', 1, {
        "this_class": "hold_results_layout",
        "row_class": "hold_results_layout_row",
        "cell_class": "hold_results_layout_cell",
        "number_of_rows": 1,
        "number_of_columns": 1
    })
    style_layout('hold_results_layout', 1, {
        "max-height": "400px",
        "width": "100%",
        "align": "center",
        "border": 0
    })
    style_layout('hold_results_layout_cell', 1, {
        "valign": "center",
        "halign": "center"
    })
    if (result_type == 'image') {
        add_image('hold_results_layout_cell', 1, {
            "this_class": "result_image",
            "image_path": this_node_write_path
        });
        style_image('result_image', 1, {
            'width': '700px'
        })
    }
    if (result_type == 'data') {
        show_inter_data(this_node_write_path)
    }
}

function show_inter_data(pass_path) {
    read_local_file({
        "file_path": pass_path,
        "done": `
        add_visual("hold_results_layout_cell", 1, {
            "this_class": "table_data",
            "type": "table",
            "width": "auto",
            "height": "280px",
            "data_color": "#33AADE",
            "data": choose_if_nested(data)
        })
        style_visual('table_data', 1, {
            "background": "white",
            "font-family": "Titillium Web",
            "border": "4px solid darkslategrey",
            "header_background": "#33AADE",
            "header_color": "white"
        })
        style_layout('hold_results_layout', 1, {
    	"height" : "auto",
    	"margin-top" : "20px"
    	})
    	style_modal('my_modal', 1, {
    	        "height" : "420px"
    	    })
        `
    })
}


function filter_drop_options(arr) {
    allowable_files = array_only(arr, "!['wds_', '.png', '.log', 'listed_data'].some(el => e.includes(el))")
    return (allowable_files)
}

function array_only(arr, condition) {
    hold_test = []
    arr.map(function(e, i) {
        if (eval(condition)) {
            hold_test.push(e)
        }
    })
    return (hold_test)
}

function check_if_nested(obj) {
    check_nest = []
    obj.map(function(e, i) {
        $.each(e, function(v) {
            if (typeof(obj[0][v]) == 'object') {
                check_nest.push('nested')
            } else {
                check_nest.push('not nested')
            }
        })
    })
    if (check_nest.includes('nested')) {
        return (true)
    } else {
        return (false)
    }
}

function choose_if_nested(data) {
    if (check_if_nested(data)) {
        use_data = data[0][Object.keys(data[0])[0]]
    } else {
        use_data = data
    }
    return (use_data)
}