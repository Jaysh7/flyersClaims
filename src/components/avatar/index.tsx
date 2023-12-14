import { Avatar } from "antd";

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
        style={{ backgroundColor: color, verticalAlign: "middle" }}
        size="large"
        gap={gap}
      >
        {user}
      </Avatar>
    </>
  );
};

export default AvatarComponent;
