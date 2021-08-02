const BASE_URL = `https://picsum.photos/v2`;
// 임의의 사진 데이터

export async function getList(page = 1) {
  const response = await fetch(`${BASE_URL}/list?page=${page}`);
  const photos = await response.json();
  // 데이터 요청 및 반환
  return photos;
}

export const formatPhotoUri = (id, width, height) => {
  return `https://picsum.photos/id/${id}/${Math.floor(width)}/${Math.floor(
    height
  )}`;
  // id와 size를 통해 URI(url의 상위 개념) 생성
};
