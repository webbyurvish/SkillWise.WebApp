import React from "react";
import { CometChatUserListWithMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { useParams } from "react-router";
import { MentorWrapper } from "../MentorPanel/MentorWrapper";
import { useSelector } from "react-redux";
import UserWrapper from "../user/UserWrapper";

//////////////////// ---- Component to direct chat with mentor ---- ////////////////////

export default function ChatWithMentor() {
  const { uid } = useParams();
  const user = useSelector((state) => state.auth.user);

  return (
    <React.Fragment>
      {user.role === "user" ? (
        <UserWrapper>
          <div
            style={{ paddingLeft: "4.2rem", width: "100%", height: "100vh" }}
          >
            <CometChatUserListWithMessages chatWithUser={uid} />
          </div>
        </UserWrapper>
      ) : (
        <MentorWrapper>
          <div
            style={{ paddingLeft: "4.2rem", width: "100%", height: "100vh" }}
          >
            <CometChatUserListWithMessages chatWithUser={uid} />
          </div>
        </MentorWrapper>
      )}
    </React.Fragment>
  );
}
