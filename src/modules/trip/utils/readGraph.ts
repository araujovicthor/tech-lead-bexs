import fs from 'fs';

export default function readFile(filePath = '') {
  const graph: any = {};

  try {
    const data = fs.readFileSync(filePath, 'utf8');

    data && data.split('\n').forEach((line: any, index: number) => {
      const [parent, child, cost] = line.split(',');

      if (!parent || !child || isNaN(cost)) {
        return undefined;
      }

      graph[parent] || (graph[parent] = {});
      graph[parent][child] = parseFloat(cost);
    });

    return graph;
  } catch (error) {
    return undefined;
  }
}