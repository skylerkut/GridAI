 //Get root node from highest degree node
 export function getAdjacency(linksArr){
    const adjacency = {};

    linksArr.forEach(link => {
    if (!adjacency[link.source]) adjacency[link.source] = [];
    if (!adjacency[link.target]) adjacency[link.target] = [];
    adjacency[link.source].push(link.target);
    adjacency[link.target].push(link.source);
    });
    console.log("Adjacentcy Count:", adjacency);

    let maxConnections = -1;
    let rootNode;
    for (const node in adjacency) {
    const connections = adjacency[node].length;
    if (connections > maxConnections) {
        maxConnections = connections;
        rootNode = node;
        }
    }
    console.log("Root Node", rootNode);
    return {adjacency, rootNode};
 }

// Organize nodes into a parent-child hierarchy recursively
export function createHierarchyFromAdjacency(adjacency, rootNode) {
    const buildHierarchy = (currentNode, visited = new Set()) => {
      visited.add(currentNode);

      const node = {
        name: currentNode,
        children: []
      };

      const neighbors = adjacency[currentNode] || [];
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          const childNode = buildHierarchy(neighbor, visited);
          if (childNode) {
            node.children.push(childNode);
          }
        }
      });
      return node;
    };
    return buildHierarchy(rootNode);
  };

//Return int counts for edges of each node
export function countEdges(nodesArr, linksArr){
      const edgeCounts = {};

    //Count edges for each node
    nodesArr.forEach((node) => {
        edgeCounts[node.id] = 0;
      });
    
      linksArr.forEach((link) => {
          edgeCounts[link.source]++;
          edgeCounts[link.target]++;
      });

      console.log("Edge Count:", edgeCounts);
      return edgeCounts;
}