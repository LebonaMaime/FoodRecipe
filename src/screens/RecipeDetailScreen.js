import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function RecipeDetailScreen(props) {
  const recipe = props.route?.params?.recipe;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector((state) => state.favorites?.favoriterecipes ?? []);

  const isFavourite = recipe
    ? favoriteRecipes.some(
        (favoriteRecipe) =>
          String(favoriteRecipe?.idFood ?? favoriteRecipe?.id ?? favoriteRecipe?.recipeId) ===
          String(recipe.idFood ?? recipe.id ?? recipe.recipeId)
      )
    : false;

  const handleToggleFavorite = () => {
    if (recipe) {
      dispatch(toggleFavorite(recipe));
    }
  };

  if (!recipe) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Recipe details not available.</Text>
      </View>
    );
  }

  const ingredients = recipe.ingredients ?? [];
  const instructionSteps = recipe.recipeInstructions
    ? recipe.recipeInstructions
        .split(/\r?\n+/)
        .map((step) => step.trim())
        .filter(Boolean)
    : [];

  const recipeMeta = [
    {
      icon: "🕒",
      label: recipe.totalTime || recipe.cookingTime || recipe.prepTime || "35 Mins",
    },
    {
      icon: "👥",
      label: recipe.servings ? `${recipe.servings} Servings` : "03 Servings",
    },
    {
      icon: "🔥",
      label: recipe.calories ? `${recipe.calories} Cal` : "103 Cal",
    },
    {
      icon: "🎚️",
      label: recipe.difficulty || "Medium",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.imageContainer} testID="imageContainer">
        {recipe.recipeImage ? (
          <Image
            source={{ uri: recipe.recipeImage }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
        ) : null}
      </View>

      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[styles.favoriteButton, { backgroundColor: "white" }]}
        >
          <Text style={styles.favoriteButtonText}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.recipeDetailsContainer} testID="recipeDetailsContainer">
          <Text style={styles.recipeTitle} testID="recipeTitle">
            {recipe.recipeName || recipe.name || "Recipe"}
          </Text>
          <Text style={styles.recipeCategory} testID="recipeCategory">
            {recipe.recipeCategory || recipe.category || "Uncategorized"}
          </Text>
        </View>

        <View style={styles.miscContainer} testID="miscContainer">
          {recipeMeta.map((item) => (
            <View key={item.icon + item.label} style={styles.miscItem}>
              <Text style={styles.miscIcon}>{item.icon}</Text>
              <Text style={styles.miscText}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <View key={`${ingredient.ingredientName ?? ingredient.name ?? "ingredient"}-${index}`} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  {ingredient.ingredientName || ingredient.name || "Ingredient"}
                  {ingredient.measure ? ` - ${ingredient.measure}` : ""}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.descriptionText}>No ingredients listed.</Text>
          )}
        </View>

        <View style={styles.sectionContainer} testID="sectionContainer">
          <Text style={styles.sectionTitle}>Instructions</Text>
          {instructionSteps.length > 0 ? (
            instructionSteps.map((step, index) => (
              <Text key={`${step}-${index}`} style={styles.instructionsText}>
                {`${index + 1}. ${step}`}
              </Text>
            ))
          ) : (
            <Text style={styles.descriptionText}>
              {recipe.cookingDescription || recipe.recipeInstructions || "No instructions available."}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  recipeImage: {
    width: wp(98),
    height: hp(45),
    borderRadius: 20,
    marginTop: 4,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: wp(5),
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 20,
    marginRight: wp(5),
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  favoriteButtonText: {
    fontSize: hp(2.2),
    color: "red",
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeDetailsContainer: {
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
  },
  recipeCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF",
    marginTop: hp(0.5),
  },
  miscContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: wp(2),
  },
  miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    minWidth: "45%",
    marginBottom: 10,
  },
  miscIcon: {
    fontSize: hp(3),
    marginBottom: 5,
  },
  miscText: {
    fontSize: hp(1.6),
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 2,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
    flexShrink: 1,
  },
  instructionsText: {
    fontSize: hp(2),
    color: "#444",
    lineHeight: hp(3),
    textAlign: "justify",
    marginBottom: hp(1),
  },
  descriptionText: {
    fontSize: hp(1.8),
    color: "#4B5563",
    textAlign: "justify",
    lineHeight: hp(2.5),
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  notFoundText: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#D9534F",
  },
});
