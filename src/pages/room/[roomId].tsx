import { useRouter } from 'next/router';

function RoomPage() {
  const router = useRouter();

  const roomId = Array.isArray(router.query.roomId)
    ? router.query.roomId[0]
    : router.query.roomId;

  if (!roomId) return <div>Invalid room</div>;

  return <div>Welcome to room {roomId}</div>;
}

export default RoomPage;
