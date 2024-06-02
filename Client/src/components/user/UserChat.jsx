import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import UserWrapper from "./UserWrapper";

// chat component for user role
export default function UserChat() {
  return (
    <UserWrapper>
      <div style={{ paddingLeft: "4.2rem", width: "100%", height: "100vh" }}>
        <CometChatUI />
      </div>
    </UserWrapper>
  );
}
