import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favoriteRecipesList = useSelector(
    (state) => state.favorites?.favoriterecipes ?? []
  );

  const renderRecipeItem = ({ item }) => {
    const recipeName = item?.recipeName || item?.title || "Favorite Recipe";
    const displayName =
      recipeName.length > 20 ? `${recipeName.slice(0, 20)}...` : recipeName;

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
      >
        {(item?.recipeImage || item?.image) && (
          <Image
            source={{ uri: item.recipeImage || item.image }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.recipeTitle}>{displayName}</Text>
          <Text style={styles.recipeCategory}>
            {item?.recipeCategory || item?.category || "Recipe"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View testID="favoriteRecipes">
        <Text style={styles.heading}>My Favorite Recipes</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Go back</Text>
      </TouchableOpacity>
      <FlatList
        data={favoriteRecipesList}
        keyExtractor={(item, index) =>
          String(item?.idFood ?? item?.idC ?? index)
        }
        renderItem={renderRecipeItem}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: hp(3.2),
    marginTop: hp(4),
    marginLeft: wp(5),
    marginBottom: hp(2),
    color: "#374151",
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(3),
  },
  cardContainer: {
    backgroundColor: "#fff",
    marginBottom: hp(2),
    padding: wp(3),
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  textContainer: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(0.5),
  },
  recipeCategory: {
    fontSize: hp(1.6),
    color: "#6B7280",
  },
  backButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
