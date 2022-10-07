const fs = require("fs");
const [n, ...nums] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

function merge(arr, start, mid, end) {
  // 하위 배열로 2등분
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);

  let i = 0,
    j = 0,
    k = start,
    swaps = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
      // 좌측 배열에 남은 개수만큼 더해줌
      swaps += mid - (start + i) + 1;
    }
  }

  while (i < left.length) {
    arr[k++] = left[i++];
  }

  while (j < right.length) {
    arr[k++] = right[j++];
  }

  return swaps;
}

function mergeSort(arr, start, end) {
  let count = 0;

  if (start < end) {
    let mid = Math.floor((start + end) / 2);

    // 좌측 하위 배열 카운트
    count += mergeSort(arr, start, mid);

    // 우측 하위 배열 카운트
    count += mergeSort(arr, mid + 1, end);

    // 좌, 우측 하위 배열 병합 시 카운트
    count += merge(arr, start, mid, end);
  }

  return count;
}

console.log(mergeSort(nums, 0, n - 1));
