const fs = require("fs");
const [n, ...arr] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let V; // 총 vertices 개수
let edge = []; // 그래프의 edge 리스트

class Edge {
  constructor(weight, src, dest) {
    this.weight = weight;
    this.src = src;
    this.dest = dest;
  }
}

class Subset {
  constructor() {
    this.parent = 0;
    this.rank = 0;
  }
}

function initGraph(nV, vertices) {
  V = parseInt(nV);

  const verticesIdxs = Array.from(Array(V).keys());

  /**
   * edge 리스트 생성
   * {weight: Number, src: Number, dest: Number}[]
   * vertices 리스트를 x, y, z 각 축으로 정렬한 뒤
   * 인접한 vertice간의 해당 축 차이의 절대값으로 weight를 계산
   */
  for (axis = 0; axis < 3; axis++) {
    verticesIdxs.sort((a, b) => vertices[a][axis] - vertices[b][axis]);

    for (i = 0; i < nV - 1; i++) {
      edge.push(
        new Edge(
          Math.abs(
            vertices[verticesIdxs[i + 1]][axis] -
              vertices[verticesIdxs[i]][axis]
          ),
          verticesIdxs[i],
          verticesIdxs[i + 1]
        )
      );
    }
  }

  // edge를 weight 기준으로 정렬
  edge.sort((a, b) => a.weight - b.weight);
}

function find(subsets, i) {
  if (subsets[i].parent != i)
    subsets[i].parent = find(subsets, subsets[i].parent);
  return subsets[i].parent;
}

function union(subsets, x, y) {
  let xroot = find(subsets, x);
  let yroot = find(subsets, y);

  if (subsets[xroot].rank < subsets[yroot].rank) subsets[xroot].parent = yroot;
  else if (subsets[yroot].rank < subsets[xroot].rank)
    subsets[yroot].parent = xroot;
  else {
    subsets[xroot].parent = yroot;
    subsets[yroot].rank++;
  }
}

function kruskalMST() {
  let subsets = []; // union-find 알고리즘 위한 초기 서브셋
  let totalCost = 0;

  for (let v = 0; v < V; v++) {
    subsets[v] = new Subset();
    subsets[v].parent = v;
    subsets[v].rank = 0;
  }

  let e = 0,
    i = 0;

  // 선택될 edge 개수는 V-1개
  while (e < V - 1) {
    const nextEdge = edge[i++];

    let x = find(subsets, nextEdge.src);
    let y = find(subsets, nextEdge.dest);

    if (x !== y) {
      e++;
      totalCost += nextEdge.weight;
      union(subsets, x, y);
    }
  }

  console.log(totalCost);
}

initGraph(
  n,
  arr.map((el) => el.trim().split(/\s/).map(Number))
);
kruskalMST();
