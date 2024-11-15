import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { db, storage } from '@/firebaseConfig'; // Ensure your firebaseConfig is set correctly
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import UUID from 'react-native-uuid'; // Correct UUID import
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function CameraScreen() {
  // Permissions hooks
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const[description,setDescription] = useState('');
  
  // State management
  const [facing, setFacing] = useState<CameraType>('back');
  const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  
  // Camera reference
  const cameraRef = useRef<CameraView>(null);

  // Handle permissions
  if (permission === null || mediaLibraryPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }

  if (!permission.granted || !mediaLibraryPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need camera and media library permissions
        </Text>
        <Button onPress={requestPermission} title="Grant camera permission" />
        <Button onPress={requestMediaLibraryPermission} title="Grant media library permission" />
      </View>
    );
  }

  // Function to take a picture
  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      
      if (photo?.uri) {
        setLastPhotoUri(photo.uri);
        await MediaLibrary.saveToLibraryAsync(photo.uri); // Save photo to the gallery
        await saveImageURIToFirestore(photo.uri, description);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setIsCapturing(false);
    }
  };

  // Function to save image URI to Firestore
  const saveImageURIToFirestore = async (uri: string, description: string) => {
    try {
      // Step 1: Check if URI is provided
      if (!uri) {
        console.error('No image URI provided');
        return;
      }

      // Step 2: Store the image URI and description in Firestore
      const docRef = await addDoc(collection(db, 'images'), {
        imageUrl: uri, // Store the image URI
        description: description, // Store the description
        createdAt: serverTimestamp(), // Store the timestamp
      });

      console.log('Document written with ID:', docRef.id);
      console.log('Image URI successfully saved to Firestore!');
    } catch (error) {
      console.error('Error saving image URI to Firestore:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView 
        style={{ flex: 9 }} 
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          {/* Button to flip camera */}
          <Button title="Flip Camera" onPress={() => setFacing(facing === 'back' ? 'front' : 'back')} />
          {/* Button to take picture */}
          <Button title="Take Picture" onPress={takePicture} disabled={isCapturing} />
        </View>
      </CameraView>
      <View style={styles.textInput}>
      <TextInput
            style={styles.input}
            placeholder="Tell me what you are feeling!!!"
            value={description}
            onChangeText={setDescription}
          />
      </View>

      {lastPhotoUri && (
        <View style={styles.previewContainer}>
          <Text>Photo Preview:</Text>
          <Image source={{ uri: lastPhotoUri }} style={styles.previewImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  previewContainer: {
    padding: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    marginTop: 20,
    padding:10,
    paddingLeft:10,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  textInput:{
    flex: 1,                 // Allow the container to take full height
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    paddingHorizontal: 20,
  }
});
