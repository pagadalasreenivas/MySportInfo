import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function ImagesListScreen() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'images'));
        const imageList = querySnapshot.docs.map((doc) => doc.data());
        setImages(imageList);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Uploaded Reactions Across sports</Text>
      {images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noImagesText}>No images found. Upload some to get started!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a73e8',
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    alignItems: 'center',
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 12,
    textAlign: 'center',
  },
  noImagesText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 50,
  },
});

