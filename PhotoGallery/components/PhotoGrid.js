import React from "react";
import { Dimensions, FlatList } from "react-native";
import { formatPhotoUri } from "../api/picsum";

export const PhotoGrid = (photos, numColumns, onEndReached) => {
  const { width } = Dimensions.get("window"); //   screen 너비

  const size = width / numColumns; //   화면에 보일 이미지 크기

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <Image
          source={{
            width: size,
            height: size,
            uri: formatPhotoUri(item.id, size, size),
          }}
        />
      )}
    />
  );
};
