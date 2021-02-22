interface IResponse {
  bestRoute: string;
  price: number;
}

export default function Dijkstra(start: string, destination: string, graph: any): IResponse|undefined {
  if (!start || !destination || !graph || Object.keys(graph).length == 0)
    return undefined;

  const optimalRoute = findClosestPath(start, graph);
  const pathToDest: string = getPathToDestination(
    start,
    destination,
    optimalRoute.parents
  );

  return {
    bestRoute: pathToDest,
    price: Number(optimalRoute.distances[destination]),
  };
}

function findClosestPath(start = "", graph: any = {}) {
  const distances: any = {};
  const parents: any = {};
  const verticesVisited: any = [];
  distances[start] = 0;

  let closestVertex = getClosestVertexName(distances, verticesVisited);

  while (closestVertex) {
    const children = graph[closestVertex];

    for (const child in children) {
      const currentDistToChild = distances[closestVertex] + children[child];
      const childKnownDistance = distances[child] || Infinity;

      if (currentDistToChild < childKnownDistance) {
        distances[child] = currentDistToChild;
        parents[child] = closestVertex;
      }
    }

    verticesVisited.push(closestVertex);
    closestVertex = getClosestVertexName(distances, verticesVisited);
  }

  return {
    parents,
    distances,
  };
}

function getClosestVertexName(distances: any = {}, verticesVisited: any = []) {
  let closestName = "";

  Object.keys(distances).forEach((key, index) => {
    closestName =
      !verticesVisited.includes(key) &&
      (!closestName || distances[key] < distances[closestName])
        ? key
        : closestName;
  });

  return closestName;
}

function getPathToDestination(source: string = "", dest: string = "", parents: any = {}) {
  let parent: any = parents[dest];
  const path = [dest];

  while (parent && parent !== source) {
    path.unshift(parent);
    parent = parents[parent];
  }

  path.unshift(source);
  return path.join(" - ");
}
