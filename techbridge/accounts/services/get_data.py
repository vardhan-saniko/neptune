# from accounts.services.get_nwtb_data import get_nwtb_data
# from accounts.services.get_sctb_data import get_sctb_data
from accounts.services.get_network_data import fetch_network_data
from django.contrib.auth.models import User

import networkx as nx
from networkx import DiGraph


def get_centralities_data(data):
    default = {}
    gr = nx.DiGraph()
    for node in data['nodes']:
        gr.add_node(node['id'])
    for link in data['links']:
        gr.add_edge(link['source'], link['target'])

    for node in data['nodes']:
        default[node['id']] = 0

    average_clustering = nx.average_clustering(gr)
    degree = nx.degree_centrality(gr)
    betweenness = nx.betweenness_centrality(gr)
    clustering = nx.clustering(gr)
    try:
        eigenvector = nx.eigenvector_centrality(gr)
    except:
        eigenvector = default

    try:
        katz = nx.katz_centrality(gr)
    except:
        katz = default

    data = {'betweenness': betweenness, 'clustering': clustering, 'degree': degree, 'eigenvector': eigenvector,
            'katz': katz, 'out_degree': nx.centrality.out_degree_centrality(gr)}

    print("user centralities data: {}".format(data))

    return data


def get_data(user):
    # final_data = {
    #     "sctb": get_sctb_data()['data'],
    #     "nwtb": get_nwtb_data()['data'],
    #     "nwtb_centralities": get_nwtb_data()['nwtb_centralities'],
    #     "sctb_centralities": get_sctb_data()['sctb_centralities'],
    #     "nwtb_centralities1": get_nwtb_data()['nwtb_centralities1'],
    #     "sctb_centralities1": get_sctb_data()['sctb_centralities1'],
    # }

    # k = get_nwtb_data()['data']
    # print("aaaaaaaa")
    # print(k)

    final_data = {}
    survey = user.profile.survey_set.all().first()
    if survey and 'nodes' in survey.processed_data:
        data = survey.processed_data
        print("Processed data: {}".format(data))
        final_data['nwtb'] = data
        final_data['nwtb_centralities'] = get_centralities_data(data)
        return final_data

    data = fetch_network_data(survey.extras, survey.data)
    print(data)
    final_data = {
        "nwtb": data,
        "nwtb_centralities": get_centralities_data(data),
        "name": user.profile.tb_display_name
    }

    return final_data


def fetch_data():
    return fetch_network_data()
