import Chat from "@/components/Chat";
import Map from "@/components/Map";
import { mediaQuery } from "@/styles/globals";
import { useMediaQuery } from "@mui/material";



export default function Home() {

  const isMobileSize = useMediaQuery(mediaQuery.sp)
  return (
    <main style={{height : '100%' , width : '100%',display : 'flex'}}>
      <div style={{width : isMobileSize ? '100%' : '70%'}}><Map defaultPosition={{ lat: 35.681236, lng: 139.767125 }} /></div>
      <div style={{width : isMobileSize ? '100%' : '30%'}}><Chat /></div>
    </main>
  );
}