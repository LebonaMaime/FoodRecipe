import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function CustomRecipesScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const route = useRoute();
    const { recipe, index = 0 } = route.params || {};
    const favoriteRecipes = useSelector(
      (state) => state.favorites?.favoriterecipes ?? []
    );
    const recipeId =
      recipe?.idFood ??
      recipe?.id ??
      recipe?.idCategory ??
      recipe?.title ??
      recipe?.image;
    const isFavourite = recipeId
      ? favoriteRecipes.some(
          (favoriteRecipe) =>
            String(favoriteRecipe?.idFood) === String(recipeId)
        )
      : false;
  
    if (!recipe) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>No Recipe Details Available</Text>
        </View>
      );
    }
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite({ ...recipe, idFood: recipeId }));
    };
  
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        testID="scrollContent"
      >
        <View style={styles.imageContainer} testID="imageContainer">
          {recipe.image ? (
            <Image
              source={{ uri: recipe.image }}
              style={[
                styles.articleImage,
                { height: index % 3 === 0 ? hp(25) : hp(35) },
              ]}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.articleImage, styles.imagePlaceholder]}>
              <Text style={styles.imagePlaceholderText}>No image available</Text>
            </View>
          )}
        </View>
        <View style={styles.topButtonsContainer} testID="topButtonsContainer">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>GoBack</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavourite ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.contentContainer} testID="contentContainer">
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Content</Text>
            <Text style={styles.contentText}>{recipe.description}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8FAFC",
    },
    scrollContent: {
      paddingBottom: hp(4),
    },
    imageContainer: {
      width: "100%",
      backgroundColor: "#E2E8F0",
    },
    articleImage: {
      width: "100%",
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    imagePlaceholder: {
      height: hp(30),
      justifyContent: "center",
      alignItems: "center",
    },
    imagePlaceholderText: {
      color: "#64748B",
      fontSize: hp(2),
    },
    contentContainer: {
      paddingHorizontal: wp(5),
      paddingTop: hp(3),
    },
    recipeTitle: {
      fontSize: hp(3.2),
      lineHeight: hp(4),
      fontWeight: "700",
      color: "#1F2937",
      marginBottom: hp(2.5),
      textAlign: "left",
    },
    sectionContainer: {
      padding: wp(4),
      marginBottom: hp(2),
      borderRadius: 16,
      backgroundColor: "#FFFFFF",
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: hp(2.2),
      fontWeight: "700",
      color: "#374151",
      marginBottom: hp(1),
    },
    topButtonsContainer: {
      position: "absolute",
      top: hp(3),
      left: wp(5),
      right: wp(5),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1,
    },
    backButton: {
      minWidth: 68,
      height: hp(5.5),
      paddingHorizontal: wp(3),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: hp(3),
      backgroundColor: "#FFFFFF",
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 4,
    },
    backButtonText: {
      color: "#1F2937",
      fontSize: hp(1.8),
      fontWeight: "600",
    },
    favoriteButton: {
      width: hp(5.5),
      height: hp(5.5),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: hp(3),
      backgroundColor: "#FFFFFF",
      shadowColor: "#0F172A",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 4,
    },
    favoriteButtonText: {
      color: "#EF4444",
      fontSize: hp(3),
      lineHeight: hp(3.5),
    },
    contentText: {
      fontSize: hp(1.9),
      lineHeight: hp(2.8),
      color: "#4B5563",
      textAlign: "left",
    },
    title: {
      margin: wp(6),
      fontSize: hp(2.5),
      color: "#374151",
      textAlign: "center",
    },
  });
  