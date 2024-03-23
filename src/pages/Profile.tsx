import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../libs/firebase";

const Profile = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
  
    if (!file) return null;
    const storageRef = ref(storage, `files/${file.name}`)
    uploadBytes(storageRef, file)
    .then((snapshot) => {
      e.target[0].value = ''
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log(downloadURL)
      })
    })
  }
  return (
  <div className="container mx-auto my-10 rounded py-5 bg-yellow-300 w-full md:w-2/3 lg:w-1/2">
    
  </div>

  );};

export default Profile;
