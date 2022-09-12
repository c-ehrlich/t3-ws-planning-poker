import PPButton from "components/ui/PPButton";
import { env } from "env/client.mjs";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

function RoomPage() {
  const router = useRouter();

  const roomId = Array.isArray(router.query.roomId)
    ? router.query.roomId[0]
    : router.query.roomId;

  if (!roomId) return <div>Invalid room</div>;

  function handleShareRoom() {
    navigator.clipboard.writeText(`${env.NEXT_PUBLIC_APP_URL}/room/${roomId}`);
    toast.success("Room URL copied to clipboard", { id: "copied" });
  }

  return (
    <div>
      <p>Welcome to room {roomId}</p>
      <PPButton onClick={handleShareRoom}>Invite</PPButton>
    </div>
  );
}

export default RoomPage;
