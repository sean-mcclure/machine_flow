 function open_endpoints() {
     disable_enter_key()
     hide_title()
     add_overlay({
         "this_class": "endpoint_overlay",
         "close_text_class": "close_modal",
         "height": "100%",
         "width": "100%",
         "speed": "0.5s"
     })
     style_overlay('endpoint_overlay', 1, {
         "background": "rgba(222,222,222, 0.8)"
     })
     style_text('close_modal', 1, {
         "color": "black"
     })

     add_event('close_modal', 1, {
         "type": "click",
         "function": `
            style_text('title', 1, {
                "visibility" : "visible"
            })
            close_overlay('add_params_overlay', 1)
            enable_enter_key()
        `
     })
     add_text('endpoint_overlay', 1, {
         "this_class": "overlay_title",
         "text": "FUNCTIONS"
     })
     style_text('overlay_title', 1, {
         "font-size": "30px",
         "color": "#33AADE",
         "align": "center",
         "font-style": "italic",
         "font-family": "Titan One",
         "text-shadow": "2px 2px 0px rgba(66, 255, 240, 0.96)",
         "margin-top": "26px"
     })

     add_layout('endpoint_overlay', 1, {
         "this_class": "add_endpoint_layout",
         "row_class": "add_endpoint_layout_row",
         "cell_class": "add_endpoint_layout_cell",
         "number_of_rows": 1,
         "number_of_columns": 4
     })
     style_layout('add_endpoint_layout', 1, {
         "height": "40px",
         "width": "auto",
         "align": "center",
         "margin-top": "20px",
         "margin-bottom": "40px",
         "column_widths": ['40%', '30%', '20%', '10%'],
         "border": 0
     })
     add_input('add_endpoint_layout_cell', 1, {
         "this_class": "add_endpoint_url",
         "placeholder": "http://localhost:9191/api",
         "spellcheck": false,
         "default_value": "http://localhost:9191/api"
     })
     style_input('add_endpoint_url', 1, {
         "width": "300px"
     })
     add_event('add_endpoint_url', 1, {
         "type": "enter key",
         "function": "click_element('add_endpoint_button', 1)"
     })
     add_event('add_endpoint_url', 1, {
         "type": "as_change",
         "function": "save_root_url()"
     })
     add_layout('add_endpoint_layout_cell', 3, {
         "this_class": "img_data_layout",
         "row_class": "img_data_layout_row",
         "cell_class": "img_data_layout_cell",
         "number_of_rows": 1,
         "number_of_columns": 2
     })
     style_layout('img_data_layout', 1, {
         "height": "40px",
         "width": "auto",
         "border": 0
     })
     add_input('add_endpoint_layout_cell', 2, {
         "this_class": "endpoint_name",
         "placeholder": "function name...",
         "maxlength": 30,
         "spellcheck": false
     })
     add_event('endpoint_name', 1, {
         "type": "enter key",
         "function": "click_element('add_endpoint_button', 1)"
     })
     add_radiobutton('img_data_layout_cell', 1, {
         "this_class": "check_img",
         "text": "IMAGE"
     })
     add_radiobutton('img_data_layout_cell', 2, {
         "this_class": "check_data",
         "text": "DATA"
     })
     add_button('add_endpoint_layout_cell', 4, {
         "this_class": "add_endpoint_button",
         "text": "ADD"
     })
     style_button('add_endpoint_button', 1, {
         "background": "#33AADE"
     })
     add_event('add_endpoint_button', 1, {
         "type": "click",
         "function": "save_endpoints()"
     })
     add_endpoint_to_list() // add already saved endpoints to overlay
 }

 hold_endpoints = []
 inner_eps = {}

 function save_endpoints() {
     if (listen_for_value('add_endpoint_url', 1) != '' && listen_for_value('endpoint_name', 1) != '' && check_if_checked('image') || listen_for_value('add_endpoint_url', 1) != '' && listen_for_value('endpoint_name', 1) != '' && check_if_checked('data')) {
         inner_eps['url'] = listen_for_value('add_endpoint_url', 1)
         inner_eps['name'] = listen_for_value('endpoint_name', 1)
         inner_eps['img'] = check_if_checked('image')
         inner_eps['data'] = check_if_checked('data')
         hold_endpoints.push(inner_eps)
         inner_eps = {}
         add_value('add_endpoint_url', 1, {
             'value': 'http://localhost:9191/api'
         })
         add_value('endpoint_name', 1, {
             'value': ''
         })
         add_endpoint_to_list()
         animate_element('add_endpoint_button', 1, {
             'type': 'spin',
             'speed': 700
         })
     } else {
         if (listen_for_value('add_endpoint_url', 1) == '') {
             animate_element('add_endpoint_url', 1, {
                 'type': 'rubberBand'
             })
         }
         if (listen_for_value('endpoint_name', 1) == '') {
             animate_element('endpoint_name', 1, {
                 'type': 'rubberBand'
             })
         }
         if (!check_if_checked('image')) {
             animate_element('check_img input', 1, {
                 'type': 'rubberBand'
             })
         }
         if (!check_if_checked('data')) {
             animate_element('check_data input', 1, {
                 'type': 'rubberBand'
             })
         }
     }
 }

 function add_endpoint_to_list() {
     all_remove_element('hold_endpoints_layout')
     all_remove_element('elem_adds')
     uncheck_checkbox('check_img', 1)
     uncheck_checkbox('check_data', 1)
     loop_array({
         "array": hold_endpoints,
         "function": `
    add_layout('endpoint_overlay', 1, {
        "this_class" : "hold_endpoints_layout",
    	"row_class" : "hold_endpoints_layout_row",
    	"cell_class" : "hold_endpoints_layout_cell",
    	"number_of_rows" : 1,
    	"number_of_columns" : 5
    })
    all_style_layout('hold_endpoints_layout', {
    	"height" : "40px",
    	"width" : "350px",
    	"align" : "center",
    	"table-layout" : "fixed",
    	"column_widths" : ['5%','65%','10%','10%', '10%'],
    	"background" : "#bae1ff",
    	"box-shadow" : "2px 2px 2px black",
    	"margin-bottom" : "5px",
    	"border-radius" : "4px",
    	"border" : 0
     	})
    all_style_layout('hold_endpoints_layout_cell', {
        "halign" : "center"
    })
     add_text('hold_endpoints_layout_cell', (index*5) + 1, {
     "this_class" : "x_out_endpoint",
     "text" : "X"
     })
     style_text('x_out_endpoint', last_class_instance('x_out_endpoint'), {
     "color" : "red",
     "margin-left" : "5px",
     "cursor" : "pointer"
     })
     add_event('x_out_endpoint', last_class_instance('x_out_endpoint'), {
    "type" : "click",
    "function" : "delete_endpoint('" + elem.name + "')"
    })
     add_text('hold_endpoints_layout_cell', (index*5) + 2, {
     "this_class" : "elem_adds",
     "text" : elem.name
     })
     all_style_text('elem_adds', {
     "color" : "black"
     })
     store_data('hold_endpoints_layout_row', last_class_instance('hold_endpoints_layout_row'), {
     "key" : "store_url",
     "value" : elem.url
     })
     add_tooltip("hold_endpoints_layout_row", last_class_instance('hold_endpoints_layout_row'), {
    "text" : elem.url,
    "margin-top" : "5px",
    "margin-left" : "5px",
    "background" : "darkslategrey"
    })

    if(elem.name != 'list_data') {
    add_icon('hold_endpoints_layout_cell', (index*5) + 3, {
        "this_class" : "set_params",
        "icon_class" : "fa-sliders"
        })
        all_style_icon('set_params', {
        "font-size" : "30px",
        "cursor" : "pointer",
        "color" : "rgb(121, 51, 255)"
        })
        store_data('set_params', last_class_instance('set_params'), {
        "key" : "store_name",
        "value" : elem.name
        })
        add_event('set_params', last_class_instance('set_params'), {
        "type" : "click",
        "function" : "pop_set_params(this.id)"
        })
     }

     if(elem.img == true && elem.name != 'list_data') {
     add_icon('hold_endpoints_layout_cell', (index*5) + 4, {
        "this_class" : "img_yes",
        "icon_class" : "fa-file-image-o"
        })
        all_style_icon('img_yes', {
        "font-size" : "30px",
        "cursor" : "auto"
        })
     }
     if(elem.data == true) {
     add_icon('hold_endpoints_layout_cell', (index*5) + 5, {
        "this_class" : "data_yes",
        "icon_class" : "fa-database"
        })
        all_style_icon('data_yes', {
        "font-size" : "30px",
        "cursor" : "auto"
        })
    }
    `
     })
     focus_element('add_endpoint_url', 1)
 }

 function hide_title() {
     delay_event({
         "delay": "300",
         "function": `
    style_text('title', 1, {
        "visibility" : "hidden"
        })
        `
     })
 }

 function pop_set_params(icon_id) {
     hold_params = []
     add_overlay({
         "this_class": "add_params_overlay",
         "close_text_class": "close_params",
         "height": "50%",
         "width": "300px",
         "speed": "0.5s"
     })
     style_overlay('add_params_overlay', 1, {
         "background": "white",
         "z-index": 9999999999,
         "height": "100%"
     })
     style_text('close_params', 1, {
         "color": "black",
         "margin-right": "-40px"
     })
     add_event('close_params', 1, {
         "type": "click",
         "function": "setTimeout(function() { empty_contents('add_params_overlay', 1)}, 100)"
     })
     stored_name = fetch_data('set_params', get_target_instance(icon_id), {
         "key": "store_name"
     })
     add_text('add_params_overlay', 1, {
         "this_class": "params_title",
         "text": "Parameters for " + stored_name
     })
     style_text('params_title', 1, {
         "align": "center",
         "padding": "10px",
         "font-size": "18px",
         "margin-top": "10px"
     })
     setTimeout(function() {
         add_layout('add_params_overlay', 1, {
             "this_class": "list_params_layout",
             "row_class": "list_params_layout_row",
             "cell_class": "list_params_layout_cell",
             "number_of_rows": 1,
             "number_of_columns": 2
         })
         style_layout('list_params_layout', 1, {
             "height": "40px",
             "width": "auto",
             "align": "center",
             "margin-top": "20px",
             "margin-bottom": "40px",
             "border": 0
         })
         add_input('list_params_layout_cell', 1, {
             "this_class": "param_name",
             "placeholder": "parameter name...",
             "spellcheck": false,
             "maxlength": 30
         })
         add_button('list_params_layout_cell', 2, {
             "this_class": "param_add_button",
             "text": "ADD"
         })
         style_button('param_add_button', 1, {
             "background": "#33AADE"
         })
         add_event('param_add_button', 1, {
             "type": "click",
             "function": "save_params('" + icon_id + "')"
         })
         add_event('param_name', 1, {
             "type": "enter key",
             "function": "click_element('param_add_button', 1)"
         })
         if (typeof(all_params[stored_name]) !== 'undefined') {
             add_param_to_list(all_params[stored_name])
         }
     }, 200)
 }


 all_params = {}
 hold_params = []
 inner_eps_p = {}

 function save_params(icon_id) {
     if (listen_for_value('param_name', 1) != '') {

         inner_eps_p['parameter'] = listen_for_value('param_name', 1)

         stored_name = fetch_data('set_params', get_target_instance(icon_id), {
             "key": "store_name"
         })

         if (typeof(all_params[stored_name]) !== 'undefined') {
             hold_params = all_params[stored_name]
         }

         hold_params.push(inner_eps_p)

         all_params[stored_name] = hold_params
         inner_eps_p = {}
         add_param_to_list(hold_params)
         add_value('param_name', 1, {
             'value': ''
         })
         animate_element('param_add_button', 1, {
             'type': 'spin',
             'speed': 700
         })
     } else {
         if (listen_for_value('param_name', 1) == '') {
             animate_element('param_name', 1, {
                 'type': 'rubberBand'
             })
         }
     }
 }


 function add_param_to_list(param_arr) {
     all_remove_element('listed_params_layout')
     loop_array({
         "array": param_arr,
         "function": `
    add_layout('add_params_overlay', 1, {
        "this_class" : "listed_params_layout",
    	"row_class" : "listed_params_layout_row",
    	"cell_class" : "listed_params_layout_cell",
    	"number_of_rows" : 1,
    	"number_of_columns" : 2
    })
    all_style_layout('listed_params_layout', {
    	"height" : "30px",
    	"width" : "90%",
    	"align" : "center",
    	"table-layout" : "fixed",
    	"column_widths" : ['10%','90%'],
    	"border" : 0
     	})
    add_text('listed_params_layout_cell', (index*2) + 1, {
    "this_class" : "delete_param",
    "text" : "X"
    })
    all_style_text('delete_param', {
    "color" : "red",
    "align" : "center",
    "cursor" : "pointer"
    })
    add_event('delete_param', last_class_instance('delete_param'), {
    "type" : "click",
    "function" : "delete_parameter(this.id)"
    })
    add_text('listed_params_layout_cell', (index*2) + 2, {
    "this_class" : "param_name",
    "text" : elem.parameter
    })
    `
     })
 }

 hold_root_url = {}

 function save_root_url() {
     hold_root_url['root_url'] = listen_for_value('add_endpoint_url', 1)
 }

 function delete_endpoint(endpoint_name) {
     loop_array({
         "array": hold_endpoints,
         "function": "if(elem.name == '" + endpoint_name + "'){hold_endpoints.splice(index, 1)}"
     })
     delete all_params[endpoint_name];
     $(".hold_endpoints_layout_cell:contains('" + endpoint_name + "')").parent().parent().remove()
 }

 function delete_parameter(id) {
     endpoint_name = $('.params_title').text().replace('Parameters for ', '')
     x_inst = get_target_instance(id)
     parameter_name = $('.listed_params_layout_row').eq(x_inst - 1).find('.listed_params_layout_cell').eq(1).text()
     loop_array({
         "array": all_params[endpoint_name],
         "function": "if(elem.parameter == '" + parameter_name + "') {all_params['" + endpoint_name + "'].splice(index, 1)}"
     })
     $('.listed_params_layout_row').eq(x_inst - 1).remove()
 }

 function check_if_checked(choice) {
     if (choice == 'image') {
         return (document.getElementById($('.check_img').find('input').attr('id')).checked)
     }
     if (choice == 'data') {
         return (document.getElementById($('.check_data').find('input').attr('id')).checked)
     }
 }