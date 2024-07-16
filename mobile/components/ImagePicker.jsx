import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';

export default function ImagePickerExample({ image, setImage, icon }) {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (

    <TouchableOpacity style={{ width: "100%" }} onPress={pickImage}>
      {icon}
    </TouchableOpacity>
  );
}

