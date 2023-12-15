import { getStorage, ref, uploadBytes } from "firebase/storage";
import { EMPLOYEE } from "./constants";

export function uploadClaimAttachment(
  file: any,
  userId: string,
  claimAttachment: string
) {
  const storage = getStorage();
  const storageRef = ref(storage, `${EMPLOYEE}/${userId}/${claimAttachment}`);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then(() => {});
}
