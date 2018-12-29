hold_text_id = []
hold_text_id_for_call = []

function pop_modal(text_id) {

    hold_text_id_for_call.push(text_id)

    if (typeof(hold_paths['read_path']) === 'undefined') {
        alert('add your read, write and result paths')
        style_icon('open_settings', 1, {
            "color": "red"
        })
        animate_element('open_settings', 1, {
            "type": "rubberBand",
            "iterations": 4
        })
        delay_event({
            "delay": 4000,
            "function": "style_icon('open_settings', 1, {'color' : 'black'})"
        })
    } else {

        if (check_list_data()) {

            check_layer = get_everything_before($('#' + text_id).parent().attr('transform'), ',').replace('translate(', '');

            check_existing = $('#' + text_id).parent().find('circle').attr('write_filename');

            if (check_existing.includes('.json') && check_layer != '180' || check_existing.includes('.png') && check_layer != '180') {
                existing_modal(text_id)
            } else {

                check_prev_node_id = $('#' + text_id).parent().find('circle').attr('parent_node_id');
                if (check_prev_node_id == 'not_needed') {
                    check_prev_node_write_file_name = makeid()
                } else {
                    check_prev_node_write_file_name = $('#' + check_prev_node_id).parent().find('circle').attr('write_filename');
                }


                if (check_prev_node_write_file_name.includes('inter_')) {
                    alert('Cannot run task if previous node has not had a task run. This would break dependency.')
                } else {

                    disable_enter_key()
                    this_text = $('#' + text_id).text();
                    if (this_text != 'WORKFLOW') {

                        if (check_if_data_chosen(text_id) == 'no_data_chosen') {
                            alert('choose dataset before running this task')
                        }

                        add_modal({
                            "this_class": "my_modal",
                            "content_class": "modal_content",
                            "confirm_button": false,
                            "allow_outside_click": false
                        })
                        style_modal('my_modal', 1, {
                            "width": "900px",
                            "height": "420px"
                        })
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
                            "function": "close_modal(); enable_enter_key(); hold_text_id=[]; hold_text_id_for_call=[]; click_glow_on_exit()"
                        })
                        if (check_layer != '180') {
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
                        }
                        if (check_layer == '180') {
                            add_event('close_set_node', 1, {
                                "type": "click",
                                "function": "set_writefile_on_node('" + text_id + "', '" + check_layer + "')"
                            })
                        }

                        add_input('modal_content', 1, {
                            "this_class": "node_title",
                            "placeholder": "node name...",
                            "maxlength": 30,
                            "spellcheck": false
                        })
                        style_input('node_title', 1, {
                            "border-style": "none none solid none",
                            "text-align": "center"
                        })
                        add_event('node_title', 1, {
                            "type": "change",
                            "function": "add_node_title('" + text_id + "')"
                        })
                        add_value('node_title', 1, {
                            'value': $('#' + text_id).text()
                        })
                        add_text('modal_content', 1, {
                            "this_class": "line_break_title",
                            "text": "<br><br>"
                        })
                        if (check_layer != '180') {
                            hold_text_id.push(text_id)
                            add_layout('modal_content', 1, {
                                "this_class": "run_layout",
                                "row_class": "run_layout_row",
                                "cell_class": "run_layout_cell",
                                "number_of_rows": 1,
                                "number_of_columns": 1
                            })
                            style_layout('run_layout', 1, {
                                "height": "40px",
                                "width": "auto",
                                "align": "center",
                                "border": 0
                            })
                            add_dropdown('run_layout_cell', 1, {
                                "this_class": "select_endpoints",
                                "title": "choose function...",
                                "options": get_all_endpoint_names()
                            })
                            style_input('select_endpoints', 1, {
                                "width": "200px"
                            })
                            add_event('select_endpoints', 1, {
                                "type": "change",
                                "function": "add_any_params(this.value, '" + hold_text_id[0] + "')"
                            })
                        }
                        if (check_layer == '180') {
                            send_to_call_first_layer()
                            $('.node_title').prop('readonly', true).css('opacity', 0.5)
                            if (listen_for_value('node_title', 1) != 'ADD TASK...') {
                                setTimeout(function() {
                                    choose_from_dropdown('choose_dataset', 1, {
                                        'option': listen_for_value('node_title', 1) + '.json'
                                    })
                                    this_node_id = $('#' + text_id).parent().find('circle').attr('id')
                                    if (check_if_child_exists(this_node_id) == 'child_exists') {
                                        style_dropdown('choose_dataset', 1, {
                                            'pointer-events': 'none',
                                            'opacity': 0.5
                                        })
                                    }
                                }, 1000)
                            }
                        }
                    } else {
                        //alert('cannot edit root node')
                    }
                }
            }
        } else {
            alert('missing list_data endpoint')
            animate_element('endpoints_button', 1, {
                "type": "rubberBand",
                "iterations": 4
            })
        }
    }
}


function add_node_title(text_id) {
    if (listen_for_value('node_title', 1) != '') {
        $('#' + text_id).text(listen_for_value('node_title', 1)).css('z-index', 99999999)
        $('#' + text_id).parent().find('circle').attr('node_title', listen_for_value('node_title', 1).split(' ').join('_'))
    }
}

function get_all_endpoint_names() {
    hold_just_name = []
    loop_array({
        "array": hold_endpoints,
        "function": "elem.name",
        "new_array": hold_just_name
    })
    hold_just_name = remove_from_array(hold_just_name, 'list_data')
    return (hold_just_name)
}


function add_any_params(endpoint_name, text_id) {
    all_remove_element('endpoint_param')
    all_remove_element('function_call')
    all_remove_element('line_break')
    all_remove_element('run_endpoint_button')
    all_remove_element('function_call_title')

    if (typeof(all_params[endpoint_name]) !== 'undefined') {
        param_arr = all_params[endpoint_name]
        add_text('modal_content', 1, {
            "this_class": "line_break",
            "text": "<br><br>"
        })
        loop_array({
            "array": param_arr,
            "function": `
add_input('modal_content', 1, {
"this_class" : "endpoint_param",
"placeholder" : elem.parameter + '...',
"spellcheck" : false
})
style_input('endpoint_param', last_class_instance('endpoint_param'), {
"height" : "22px",
"margin-bottom" : "4px",
"width" : "180px",
"margin-left" : "4px",
"margin-right" : "4px"
})
add_event('endpoint_param', last_class_instance('endpoint_param'), {
"type" : "as_change",
"function" : "dynamic_add_args(this.value, this.id)"
})
`
        })
    }
    function_name = listen_for_value('select_endpoints', 1)
    read_file_name = get_writefile_from_prev_node(text_id)

    hold_check_index_img_data = []
    loop_array({
        "array": hold_endpoints,
        "function": "elem.name == '" + endpoint_name + "'",
        "new_array": hold_check_index_img_data
    })
    chk_indx = hold_check_index_img_data.indexOf(true)

    hold_write_file_name = []
    if (hold_endpoints[chk_indx].img == true) {
        write_file_name = 'wds_' + makeid() + '.png'
        hold_write_file_name.push(write_file_name)
    } else {
        write_file_name = 'wds_' + makeid() + '.json'
        hold_write_file_name.push(write_file_name)
    }

    function_call = function_name + '("' + hold_paths['read_path'] + read_file_name + '", "' + hold_paths['write_path'] + write_file_name + '")'

    delay_event({
        "delay": 200,
        "function": `
add_text('modal_content', 1, {
"this_class" : "line_break",
"text" : "<br><br>"
})
add_text('modal_content', 1, {
"this_class" : "function_call_title",
"text" : "<br><br>BACK-END FUNCTION"
})
style_text('function_call_title', 1, {
"margin-bottom" : "-26px",
"color" : "#33AADE"
})
add_input('modal_content', 1, {
"this_class" : "function_call",
"default_value" : function_call,
"spellcheck" : false
})
style_input('function_call', last_class_instance('function_call'), {
"width" : "95%",
"background" : "white",
"border-style" : "none none solid none",
"font-size" : "16px",
"margin-top" : "30px"
})
add_button('modal_content', 1, {
        "this_class" : "run_endpoint_button",
        "text" : "RUN"
        })
        style_button('run_endpoint_button', 1, {
        "background" : "#33AADE",
        "margin-top" : "30px"
        })
        add_event('run_endpoint_button', 1, {
        "type" : "click",
        "function" : "send_to_call()"
        })
        add_event('run_endpoint_button', 1, {
        "type" : "click",
        "function" : "set_writefile_on_node('" + hold_text_id[0] + "', '" + check_layer + "')"
        })
`
    })
}



function send_to_call() {

    if (listen_for_value('endpoint_param', 1) != '') {

        endpoint_name = listen_for_value('select_endpoints', 1)
        hold_name_index = []
        loop_array({
            "array": hold_endpoints,
            "function": "elem.name == endpoint_name",
            "new_array": hold_name_index
        })
        send_url = hold_endpoints[hold_name_index.indexOf(true)].url
        check_if_img = hold_endpoints[hold_name_index.indexOf(true)].img
        check_if_data = hold_endpoints[hold_name_index.indexOf(true)].data
        if (check_if_img) {
            use_img_data_pass = 'image'
        } else {
            use_img_data_pass = 'data'
        }
        send_params = {}
        send_params['function_choice'] = listen_for_value('function_call', 1)
        call_endpoint(send_url, send_params, use_img_data_pass, hold_paths['result_path'] + write_file_name)
    } else {
        alert('missing first function parameter')
    }
}


function send_to_call_first_layer() {
    hold_name_index = []
    loop_array({
        "array": hold_endpoints,
        "function": "elem.name == 'list_data'",
        "new_array": hold_name_index
    })
    if (typeof(hold_endpoints[hold_name_index.indexOf(true)]) !== 'undefined') {
        send_url = hold_endpoints[hold_name_index.indexOf(true)].url
        send_params = {}
        send_params['function_choice'] = "list_data('" + hold_paths['read_path'] + "', '" + hold_paths['write_path'] + "listed_data.json')"
        call_endpoint(send_url, send_params, 'show_datasets', hold_paths['result_path'] + 'listed_data.json')
    }
}

function append_to_text(current_text, new_text, arg_add) {
    upend = current_text.slice(0, -1)
    res = upend += new_text;
    add_value('function_call', 1, {
        "value": res
    })
}

function add_args_to_function_call(arg) {
    if (check_string_number(arg)) {
        arg_add = ', ' + Number(arg) + ')';
    } else {
        arg_add = ', "' + arg + '")';
    }
    append_to_text(listen_for_value('function_call', 1), arg_add)
}

function dynamic_add_args(arg, id) {
    this_inst = get_target_instance(id)
    call_arg_num = "dynamic_add_args_" + this_inst + "('" + arg + "')";
    eval(call_arg_num)
}

function dynamic_add_args_1(arg) {
    or_call = function_call
    add_value('function_call', 1, {
        'value': or_call
    })
    add_args_to_function_call(arg)
    new_or_call_1 = listen_for_value('function_call', 1)
}

function dynamic_add_args_2(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_1
    })
    add_args_to_function_call(arg)
    new_or_call_2 = listen_for_value('function_call', 1)
}

function dynamic_add_args_3(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_2
    })
    add_args_to_function_call(arg)
    new_or_call_3 = listen_for_value('function_call', 1)
}

function dynamic_add_args_4(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_3
    })
    add_args_to_function_call(arg)
    new_or_call_4 = listen_for_value('function_call', 1)
}

function dynamic_add_args_5(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_4
    })
    add_args_to_function_call(arg)
    new_or_call_5 = listen_for_value('function_call', 1)
}

function dynamic_add_args_6(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_5
    })
    add_args_to_function_call(arg)
    new_or_call_6 = listen_for_value('function_call', 1)
}

function dynamic_add_args_7(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_6
    })
    add_args_to_function_call(arg)
    new_or_call_7 = listen_for_value('function_call', 1)
}

function dynamic_add_args_8(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_7
    })
    add_args_to_function_call(arg)
    new_or_call_8 = listen_for_value('function_call', 1)
}

function dynamic_add_args_9(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_8
    })
    add_args_to_function_call(arg)
    new_or_call_9 = listen_for_value('function_call', 1)
}

function dynamic_add_args_10(arg) {
    add_value('function_call', 1, {
        'value': new_or_call_9
    })
    add_args_to_function_call(arg)
    new_or_call_10 = listen_for_value('function_call', 1)
}


function set_writefile_on_node(text_id, check_layer) {
    if (check_layer == '180') {
        if (listen_for_value('choose_dataset', 1) != null) {
            $('#' + text_id).parent().find('circle').attr('write_filename', listen_for_value('choose_dataset', 1))
        } else {
            $('#' + text_id).parent().find('circle').attr('write_filename', 'no_data_chosen')
        }
    } else {
        if (listen_for_value('endpoint_param', 1) != '') {
            $('#' + text_id).parent().find('circle').attr('write_filename', hold_write_file_name[0])
            hold_write_file_name = []
            hold_text_id = []
        }
    }
}

function get_writefile_from_prev_node(text_id) {
    last_json_file = cycle_through_branch(text_id, 'get_last_json')
    return (last_json_file)
}

hold_branching_node_types = []
hold_branching_node_ids = []
hold_branching_write_files = []

function cycle_through_branch(text_id, cycle_option) {
    this_node_id = $('#' + text_id).parent().find('circle').attr('id')
    this_layer_code = Number(get_everything_before($('#' + text_id).parent().attr('transform'), ',').replace('translate(', ''));
    this_layer = this_layer_code / 180
    hold_branching_node_ids[0] = $('#' + this_node_id).attr('parent_node_id')
    for (i = 0; i < this_layer; i++) {
        hold_branching_node_types.push($('#' + hold_branching_node_ids[i]).attr('type'))
        hold_branching_node_ids.push($('#' + hold_branching_node_ids[i]).attr('parent_node_id'))
        hold_branching_write_files.push($('#' + hold_branching_node_ids[i]).attr('write_filename'))
    }
    res_ids = remove_from_array(hold_branching_node_ids, 'not_needed')
    res_ids = remove_from_array(res_ids, 'undefined')
    res_types = remove_from_array(hold_branching_node_types, 'undefined')
    res_files = remove_from_array(hold_branching_write_files, 'undefined')
    if (cycle_option == 'style_nodes') {
        for (p = 0; p < res_ids.length; p++) {
            $('#' + this_node_id).attr('r', 17).css('fill', 'hotpink').css('opacity', 0.6)
            $('#' + res_ids[p]).attr('r', 17).css('fill', 'hotpink').css('opacity', 0.6)
            $('circle').eq(0).attr('r', 17).css('fill', 'hotpink').css('opacity', 0.6)
        }
    } else {
        check_where_json = []
        loop_array({
            "array": res_files,
            "function": "elem.includes('.json')",
            "new_array": check_where_json
        })
        last_json_indx = check_where_json.indexOf(true)
        last_json_file = res_files[last_json_indx]
        hold_branching_node_types = []
        hold_branching_node_ids = []
        hold_branching_write_files = []
        check_where_json = []
        res_ids = []
        res_types = []
        res_files = []
        return (last_json_file)
    }
    hold_branching_node_types = []
    hold_branching_node_ids = []
    hold_branching_write_files = []
}


function existing_modal(text_id) {
    disable_enter_key()
    this_text = $('#' + text_id).text();
    if (this_text != 'WORKFLOW') {
        add_modal({
            "this_class": "my_modal",
            "content_class": "modal_content",
            "confirm_button": false,
            "allow_outside_click": false
        })
        style_modal('my_modal', 1, {
            "width": "900px",
            "max-height": "400px"
        })
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
        existing_result_path = hold_paths['result_path'] + $('#' + text_id).parent().find('circle').attr('write_filename');

        if ($('#' + text_id).parent().find('circle').attr('write_filename').includes('.png')) {
            show_existing(existing_result_path, 'image', text_id)
        } else {
            show_existing(existing_result_path, 'data', text_id)
        }
    }
}

function check_list_data() {
    check_if_list_data_present = []
    loop_array({
        "array": hold_endpoints,
        "function": "elem.name=='list_data'",
        "new_array": check_if_list_data_present
    })
    if (check_if_list_data_present.indexOf(true) > -1) {
        return (true)
    } else {
        return (false)
    }
}

function check_if_child_exists(clicked_node_id) {
    check_if_child = 'no_child_exists'
    $('circle').each(function(i, val) {
        if ($('circle').eq(i).attr('parent_node_id') == clicked_node_id)
            check_if_child = 'child_exists'
    })
    return (check_if_child)
}

function check_if_data_chosen(text_id) {
    par_node_id = $('#' + text_id).parent().find('circle').attr('parent_node_id');
    par_write_file_name = $('#' + par_node_id).attr('write_filename')
    return (par_write_file_name)
}

function show_path() {
    close_modal();
    enable_enter_key();
}

function hide_path() {
    style_modal('my_modal', 1, {
        'background-color': 'white'
    })
    $('img').css('opacity', 1)
    $('input').css('opacity', 1)
    $('a').css('color', 'black')
    $('select').css('opacity', 1)
    $('button').css('opacity', 1)
    $('.function_call_title').css('opacity', 1)
    $('.function_call_title').css('color', '#33AADE')
    $('.glow_path').css('color', 'purple')
}

function click_glow_on_exit() {
    if (get_style('my_modal', 1, {
            'style': 'background-color'
        }) != 'rgb(255, 255, 255)') {
        click_element('glow_path', 1)
    }
}