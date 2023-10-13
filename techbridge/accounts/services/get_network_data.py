from typing import List
import numpy as np
import networkx as nx
from networkx import DiGraph
from networkx.readwrite import json_graph
import matplotlib.pyplot as plt
import pandas as pd
# from accounts.services.utils import graph_d3_json_format
import json
import os

# basePath = "/Users/vishnuvardhan/GSA1/neptune/techbridge/accounts/services/"

ORGS_PRIORITY_MAPPING = {
    0: 'Uniformed Service Member',
    1: 'Department of Defense (DoD)',
    2: 'Private Sector',
    3: 'Nonprofit',
    4: 'Non-DoD Federal Government',
    5: 'Academia'
}

MILITARY_MAPPING = {
    'Uniformed Service Member': 'Uniformed Service Member',
    'Department of Defense (DoD)': 'Department of Defense (DoD)'
}


def post_process_edges_data(edges):
    final_edges = list()
    for link in edges:
        relationship = None
        if 'relationship' not in link:
            link['relationship'] = False
        elif link['relationship'].startswith("I met this person"):
            link['relationship'] = True
        else:
            link['relationship'] = False

    return edges


def get_organization_type(orgs, org_type_map, id):
    if org_type_map.get(id):
        return org_type_map.get(id)

    if orgs and len(orgs) == 1:
        return orgs[0]

    priority = [k for k,name in ORGS_PRIORITY_MAPPING.items() if name in orgs]

    return ORGS_PRIORITY_MAPPING[min(priority)] if priority else orgs[-1]


def get_military_status(org_type):
    return MILITARY_MAPPING.get(org_type) or 'Civilian'


def get_orgs_mapping(org_type_map):
    if not org_type_map:
        return {}
    mapping = dict()

    for type, names in org_type_map.items():
        for name in names:
            mapping[name] = type

    return mapping


def get_type_of_node(row_data, extras, row):
    print(row_data['id'])
    if 'tb_list' in extras and row_data['id'] in extras.get('tb_list'):
        return "TB"

    if row['section2']['q1'] or row['section2']['q2']:
        return 'roster'

    return "pendant"


def get_number_of_people(row_data):
    return 0


def fetch_network_data(extras, json_data):
    # path = "accounts/services/nwb.json"
    # base_path = os.path.dirname(os.path.abspath(path))
    org_type_map = get_orgs_mapping(extras.get('org_type_map'))

    # with open(basePath + '/nwb.json', 'r') as file:
    #     json_data = json.load(file)

    node_ids = dict()
    edges = list()

    # Add rosters
    for row in json_data:
        row_data = dict()
        row_data['id'] = row['firstName'] + " " + row['lastName']
        row_data['company'] = row['companyName']
        row_data['company_type'] = get_organization_type(row['organizationRole'], org_type_map, row_data['id'])
        row_data['military_status'] = get_military_status(row_data['company_type'])
        row_data['type_of_node'] = get_type_of_node(row_data, extras, row)
        row_data['no_people'] = get_number_of_people(row_data)
        node_ids[row_data['id']] = row_data

    # Add supervisors
    for row in json_data:
        if row["supervisors"] == "n/a" or row["supervisors"] == "N/A" or not row["supervisors"]:
            continue
        for supervisor in row["supervisors"].split(","):
            if supervisor in node_ids:
                # edges.append({'source': row['firstName'] + " " + row['lastName'], 'target': supervisor})
                continue
            row_data = dict()
            row_data['id'] = supervisor
            row_data['company'] = row['companyName']
            row_data['company_type'] = get_organization_type(row['organizationRole'], org_type_map, row_data['id'])
            row_data['military_status'] = get_military_status(row_data['company_type'])
            row_data['type_of_node'] = "TB" if row_data['id'] in 'tb_list' in extras and extras['tb_list'] else "supervisor"
            node_ids[row_data['id']] = row_data
            edges.append({'source': row['firstName'] + " " + row['lastName'], 'target': supervisor})

    # Add Pendants
    sections_data = dict()
    for row in json_data:
        secs = row['section2']
        for key, values in secs.items():
            for val in values:
                if not val["name"] or not val["org"]:
                    continue

                if node_ids.get(val['name']):
                    edges.append({'source': row['firstName'] + " " + row['lastName'], 'target': val['name'],
                                  'relationship': val['relationship']})

                row_data = dict()
                row_data['id'] = val['name']
                row_data['company'] = val['org']
                row_data['company_type'] = get_organization_type("Private Sector", org_type_map, row_data['id'])
                row_data['military_status'] = get_military_status(row_data['company_type'])
                row_data['type_of_node'] = "TB" if 'tb_list' in extras and row_data['id'] in extras['tb_list'] else "pendant"
                node_ids[row_data['id']] = row_data
                edges.append({'source': row['firstName'] + " " + row['lastName'], 'target': val['name'], 'relationship': val['relationship']})

    tbs = [node for node, val in node_ids.items() if val["type_of_node"] == "TB"]

    # for i in range(0, len(tbs)):
    #     for j in range(0, len(tbs)):
    #         edges.append({'source': })

    edges = {(v['source'], v['target']): v for v in edges}.values()
    edges = post_process_edges_data(edges)

    return {"nodes": list(node_ids.values()), "links": edges}


# if __name__ == "__main__":
#     fetch_network_data({'tb_list': ['Ralph Duncan', 'Johannes Schonberg', 'Michael McNutt']},{})
