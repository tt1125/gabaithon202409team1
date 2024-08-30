import Map from "@/components/Map";

export default function Home() {
  return (
    <main>
      <Map defaultPosition={{ lat: 35.681236, lng: 139.767125 }} />
    </main>
  );
}
