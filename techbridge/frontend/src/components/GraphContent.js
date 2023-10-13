import React from 'react';
import './UiComponent.css';
import sctb from "./CentralityDistributionsofSCTB.png";
import nwtb from "./image.png";

export class GraphContent extends React.PureComponent {
    render() {
        return (
            <div>
                <p><strong>Betweenness: </strong>Betweenness centrality measures the number of times a node lies on the shortest path between other nodes. What it tells us: This measure shows which nodes are 'bridges' between nodes in a network. It does this by identifying all the shortest paths and then counting how many times each node falls on one</p>
                <p><strong>Outdegree: </strong>Out degree centrality of a node refers to the number of edges directed from the node divided by the total number of nodes in the graph</p>
                <p><strong>Eigen Vector: </strong>Eigenvector Centrality is an algorithm that measures the transitive influence of nodes. It calculates the centrality of a node based not only on their connections, but also based on the centrality of that node's connections. A high eigenvector score means that a node is connected to many nodes who themselves have high scores.</p>
                <p><strong>Katz: </strong>Katz centrality of a node is same as Eigen Vector centrality, but it works well for directed networks. A node will have null centrality if it doesn't have incoming edges  and so have nodes that are pointed to by only nodes with a null centrality score in case of Eigenvector which shouldn't be the case.</p>
            </div>
        )
    }
}