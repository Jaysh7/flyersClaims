import { Avatar } from "antd";
const nameSplitter = (name: string) => {
  if (!name) return "";
  const formattedName = name?.split(" ");
  return formattedName?.length > 1
    ? formattedName?.[0] + formattedName?.[1]
    : formattedName?.[0]?.charAt(0) + formattedName?.[0]?.charAt(1);
};
const AvatarComponent = ({
  color,
  gap,
  user
}: {
  color?: string;
  gap?: number;
  user?: string;
}) => {
  return (
    <>
      <Avatar
        style={{
          backgroundColor: color,
          verticalAlign: "middle",
          textTransform: "uppercase",
          fontWeight: "500"
        }}
        size="large"
        gap={gap}
      >
        {nameSplitter(user || "")}
      </Avatar>
    </>
  );
};

export default AvatarComponent;
