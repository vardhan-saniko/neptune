import colorsys

COLORS1 = ["#A82DD6", "#CED62D", "#06851B", "#D6892D", "#F42E0B", "#ED0BF4", "#0BF4F4", "#0B47F4", "#7508E1", "#0D0D0C", "#EAAAA0"]

COLORS = ["#A82DD6", "#FDFD05", "#037B17", "#0743F2", "#BD2004", "#E607ED", "#06F5F5", "#B57F3F", "#7508E1", "#0D0D0C", "#EAAAA0"]


def rgb_to_hex(r, g, b):
    return '{:X}{:X}{:X}'.format(r, g, b)


def hsv_to_rgb(h, s, v):
    r, g, b = colorsys.hsv_to_rgb(h, s, v)
    return int(255 * r), int(255 * g), int(255 * b)


def get_distinct_colors(n):
    all_colors = list()
    hue_partition = 1.0 / (n + 1)
    data = (hsv_to_rgb(hue_partition * value, 1.0, 1.0) for value in range(0, n))
    for r, b, g in data:
        all_colors.append(rgb_to_hex(r, g, b))

    return all_colors


def get_n_different_colors(n):
    return COLORS[0:n]


def organization_to_color_map(all_organizations, colors):
    organization_color_map = dict()
    for index, company_type in enumerate(all_organizations):
        organization_color_map[company_type] = colors[index]

    return organization_color_map


def add_colors_sizes_to_final_data(final_data, all_organizations, out_degrees_map):
    colors = get_n_different_colors(len(all_organizations))
    print("color: {}".format(colors))
    organization_color_map = organization_to_color_map(all_organizations, colors)
    for data in final_data['nodes']:
        data['color'] = organization_color_map[data['company_type']]
        data['size'] = out_degrees_map[data['id']] * 100

    return None


def graph_d3_json_format(graph):
    final_data = {'links': [], 'nodes': []}
    # all_companies = set()
    out_degrees_map = dict()
    all_organizations = set()
    all_nodes = graph.nodes()
    all_out_degrees = graph.out_degree()
    present_nodes = []
    for node in all_nodes:
        if not node:
            continue
        node_data = all_nodes[node]
        if not node_data.get('company_type'):
            continue
        present_nodes.append(node)
        node_data.update({'id': node})
        # all_companies.add(node_data['company'])
        out_degrees_map[node] = all_out_degrees[node]
        all_organizations.add(node_data['company_type'])
        final_data['nodes'].append(node_data)

    for link in graph.edges(data=True):

        relationship = None
        if link[0] and link[1] and link[0] in present_nodes and link[1] in present_nodes:
            if not link[2].get('relationship'):
                relationship = False
            elif link[2].get('relationship') == True or link[2].get('relationship').startswith("I met this person"):
                relationship = True
            else:
                relationship = False
            final_data['links'].append({'source': link[0], 'target': link[1], 'relationship': relationship})

    add_colors_sizes_to_final_data(final_data, all_organizations, out_degrees_map)
    # add_sizes_to_final_data(final_data, out_degrees_list)

    return final_data

