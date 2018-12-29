function save_workflow() {
    all_objs = {}
    all_objs['data'] = JSON.stringify(tree_node_data);
    all_objs['circles'] = JSON.stringify($.map($('circle'), function(v) {
        return v.outerHTML
    }));
    all_objs['endpoints'] = JSON.stringify(hold_endpoints)
    all_objs['parameters'] = JSON.stringify(all_params)
    all_objs['paths'] = JSON.stringify(hold_paths)
    download_tree(all_objs)
}

function download_tree(tree_obj) {
    var link = document.createElement("a");
    link.download = 'wds_workflow.json';
    link.href = "data:json," + JSON.stringify(tree_obj);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function pop_reader() {
    add_modal({
        "this_class": "load_workflow",
        "content_class": "load_workflow_content",
        "confirm_button": false,
        "allow_outside_click": true
    })
    style_modal('load_workflow', 1, {
        "width": "auto",
        "height": "auto"
    })
    add_text('load_workflow_content', 1, {
        "this_class": "load_workflow_title",
        "text": "LOAD WORKFLOW<br><br>"
    })
    style_text('load_workflow_title', 1, {
        "font-size": "20px"
    })
    add_upload_button('load_workflow_content', 1, {
        "this_class": "upload_workflow"
    })
    style_upload_button('upload_workflow', 1, {
        "font-size": "16px",
        "align": "center",
        "width": "220px"
    })
}

$(document).on('change', '.upload_workflow', function(event) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var all_objs = JSON.parse(event.target.result);

        localStorage.setItem('node_data', all_objs.data)
        localStorage.setItem('node_circles', all_objs.circles)
        localStorage.setItem('node_paths', all_objs.paths)
        localStorage.setItem('node_endpoints', all_objs.endpoints)
        localStorage.setItem('node_parameters', all_objs.parameters)
        setTimeout(function() {
            location.reload()
        }, 1000)

    }
    reader.readAsText(event.target.files[0]);
});

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function simulate_click(node_id) {
    eventFire(document.getElementById(node_id), 'click');
}

function simulate_node_add() {
    click_element('add_node_button', 1)
}

function circle_to_object(this_circle_str) {
    circle_arr = this_circle_str.split(' ')
    hold_circle_obj = {}
    for (i = 1; i < circle_arr.length; i++) {
        this_line = circle_arr[i].replace(/['"]+/g, '').replace('=', ':').replace("></circle>", '').replace("<circle", '').trim()
        key = this_line.substr(0, this_line.indexOf(':'));
        value = this_line.split(':')[1]
        if (key == 'id' || key == 'type' || key == 'parent_node_id' || key == 'write_filename' || key == 'node_title') {
            hold_circle_obj[key] = value
        }
    }
    return (hold_circle_obj)
}

function build_up_circle_obj(all_circles) {
    all_circle_obj = []
    $.each(all_circles, function(i, this_circle_str) {
        this_circle_obj = circle_to_object(this_circle_str)
        all_circle_obj.push(this_circle_obj)
    })
    return (all_circle_obj)
}

loop_cnt = 0;
hold_num_circles = 0;

function click_assign_draw() {
    if (loop_cnt == 0) {
        hold_num_circles = all_circle_obj.length;
        setTimeout(function() {
            loop_cnt = 0;
            hold_num_circles = 0
        }, (2000 * hold_num_circles) + 1000)
    }
    first_node_id = $('circle').eq(0).attr('id');

    if (loop_cnt++ < hold_num_circles) {
        // adding all non-root nodes
        if (all_circle_obj[loop_cnt - 1].type != 'root') {


            simulate_click(first_node_id)
            setTimeout(function() {
                simulate_node_add()
            }, 400)
            setTimeout(function() {
                simulate_node_add()
            }, 800)

            $('circle').eq(1).attr('id', all_circle_obj[loop_cnt - 1].id);
            loop_array({
                "array": all_circle_obj,
                "function": "alert(elem.parent_node_id)"
            })
        }

    }
    setTimeout(click_assign_draw, 2000)
}


function assign_attributes_to_nodes(all_circles) {
    circ_obj = build_up_circle_obj(all_circles);
    if (circ_obj.length != 0) {
        $('circle').each(function(i, elem) {
            $('circle').eq(i).attr('write_filename', circ_obj[i].write_filename)
            $('circle').eq(i).attr('node_title', circ_obj[i].node_title)
            if (typeof(circ_obj[i].node_title) !== 'undefined') {
                $('text').eq(i).text(circ_obj[i].node_title.split('_').join(' '))
            }
            $('circle').eq(i).attr('id', circ_obj[i].id)
            $('circle').eq(i).attr('parent_node_id', circ_obj[i].parent_node_id)
        })
    }
}

function assign_saved_paths(node_paths) {
    if (node_paths != null) {
        hold_paths['read_path'] = node_paths['read_path']
        hold_paths['write_path'] = node_paths['write_path']
        hold_paths['result_path'] = node_paths['result_path']
    }
}

function assign_saved_endpoints(node_endpoints) {
    if (node_endpoints != null) {
        hold_endpoints = node_endpoints;
    }
}

function assign_saved_parameters(node_parameters) {
    if (node_parameters != null) {
        all_params = node_parameters;
    }
}

function new_workflow() {
    localStorage.setItem('node_data', null)
    localStorage.setItem('node_circles', null)
    localStorage.setItem('node_paths', null)
    localStorage.setItem('node_endpoints', null)
    localStorage.setItem('node_parameters', null)
    localStorage.setItem('tree_height_from_slider', 500)
    localStorage.setItem('tree_width_from_slider', 1400)
    setTimeout(function() {
        location.reload()
    }, 400)
}

function save_on_action() {
    all_objs = {}
    all_objs['data'] = JSON.stringify(tree_node_data);
    all_objs['circles'] = JSON.stringify($.map($('circle'), function(v) {
        return v.outerHTML
    }));
    all_objs['endpoints'] = JSON.stringify(hold_endpoints)
    all_objs['parameters'] = JSON.stringify(all_params)
    all_objs['paths'] = JSON.stringify(hold_paths)
    localStorage.setItem('node_data', all_objs.data)
    localStorage.setItem('node_circles', all_objs.circles)
    localStorage.setItem('node_paths', all_objs.paths)
    localStorage.setItem('node_endpoints', all_objs.endpoints)
    localStorage.setItem('node_parameters', all_objs.parameters)
}