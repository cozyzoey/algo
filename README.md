# 1517 버블 소트

- 주어진 수열을 머지 소트로 정렬하고 머지를 수행할 때마다 inversion 횟수를 세는 방식으로 구현
- 버블 소트 방식으로 구현하면 시간초과가 발생하여 머지 소트로 변경하여 시간 복잡도 개선 O(N<sup>2</sup>) → O(NlogN)

### 참고 자료

- [Count Inversions in an array | (Using Merge Sort)](https://www.geeksforgeeks.org/counting-inversions/)

# 2887 행성 터널

- Kruskal 알고리즘으로 구현
- 기본적으로 Union-Find 알고리즘을 적용하면 시간초과가 발생하여 경로를 압축한 방식을 적용함

### 참고자료

- [Kruskal’s Minimum Spanning Tree Algorithm](https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/)
- [Union-Find Algorithm](https://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/)
