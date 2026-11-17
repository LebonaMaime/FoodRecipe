import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          keyExtractor={(item) => item.idFood}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
      activeOpacity={0.8}
      style={[
        styles.cardContainer,
        { paddingLeft: index % 2 === 0 ? 20 : 0, paddingRight: 15 },
      ]}
      testID="articleDisplay"
    >
      <Image
        source={{ uri: item.recipeImage }}
        style={styles.articleImage}
        resizeMode="cover"
      />
      <Text numberOfLines={2} style={styles.articleText}>
        {item.recipeName}
      </Text>
      <Text numberOfLines={2} style={styles.articleDescription}>
        {item.cookingDescription ?? item.recipeInstructions}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  row: {
    justifyContent: "space-between",
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
    flex: 1,
  },
  articleImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600",
    color: "#52525B",
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280",
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
});