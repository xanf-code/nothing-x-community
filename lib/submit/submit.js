import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import firebase_app from "@/firebase/config";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";

export async function getLinkForResource(file, formbody) {
  const storage = getStorage(firebase_app);
  let randomID = uuidv4();
  const fileName = randomID + "_" + formbody.resourceType;
  const storageRef = ref(storage, `resources/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        message.error(error.message);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            resolve(url);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
}
