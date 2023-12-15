import { getFileExtension } from "../../utils/functions";
import { PdfIcon } from "../../assets/icons";
import imageIcon from "../../assets/images/image-icon.png";

type Props = {
  fileName: string;
};

function FileTypeIcon({ fileName }: Props) {
  return getFileExtension(fileName) === "pdf" ? (
    <PdfIcon className="w-8 h-8" />
  ) : (
    <img src={imageIcon} className="w-8 h-8 rounded-lg" />
  );
}

export default FileTypeIcon;
