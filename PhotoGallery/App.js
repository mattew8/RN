import React, { useCallback, useEffect, useReducer } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getList } from "./api/picsum";
import { PhotoGrid } from "./components/PhotoGrid";
import { actionCreators, initialState, reducer } from "./reducers/photos";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { photos, nextPage, loading, error } = state;

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading());

    try {
      const nextPhotos = await getList(nextPage);
      dispatch(actionCreators.success(nextPhotos, nextPage));
    } catch (e) {
      dispatch(actionCreators.failure());
    }
  }, [nextPage]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Fail to load</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text>{photos.length}</Text>
      <PhotoGrid photos={photos} numColumns={3} onEndReached={fetchPhotos} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
