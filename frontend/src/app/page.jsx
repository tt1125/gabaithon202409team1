import Chat from "@/components/Chat";
import Map from "@/components/Map";

export default function Home() {
  return (
    <main style={{height : '100%' , width : '100%',display : 'flex'}}>
      <div style={{width : '70%'}}><Map defaultPosition={{ lat: 35.681236, lng: 139.767125 }} /></div>
      <div style={{width : '30%'}}><Chat /></div>
    </main>
  );
}
