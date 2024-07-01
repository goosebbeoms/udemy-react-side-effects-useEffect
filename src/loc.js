// 각도를 라디안으로 변환하는 함수
function toRad(value) {
  return (value * Math.PI) / 180;
}

// 두 지점 간의 거리를 계산하는 함수 (Haversine 공식 사용)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // 지구의 반경 (km)
  const dLat = toRad(lat2 - lat1); // 위도 차이
  const dLon = toRad(lng2 - lng1); // 경도 차이
  const l1 = toRad(lat1);
  const l2 = toRad(lat2);

  // Haversine 공식의 중간 계산
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // 최종 거리 (km)
  return d;
}

// 주어진 위치(lat, lon)로부터 places 배열의 장소들을 거리순으로 정렬하는 함수
export function sortPlacesByDistance(places, lat, lon) {
  const sortedPlaces = [...places]; // places 배열을 복사
  sortedPlaces.sort((a, b) => {
    // 각 장소와 주어진 위치 사이의 거리 계산
    const distanceA = calculateDistance(lat, lon, a.lat, a.lon);
    const distanceB = calculateDistance(lat, lon, b.lat, b.lon);
    return distanceA - distanceB; // 거리 차이로 정렬
  });
  return sortedPlaces;
}