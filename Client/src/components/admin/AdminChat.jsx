import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import AdminWrapper from "./AdminWrapper";

//////////////////// ---- Chat component for admin Dashboard ---- ////////////////////

export default function AdminChat() {
  return (
    <AdminWrapper>
      <div style={{ paddingLeft: "4.2rem", width: "100%", height: "100vh" }}>
        <CometChatUI />
      </div>
    </AdminWrapper>
  );
}
