import Image from "next/image";

export default async function Home() {
  // const response=await fetch('http://localhost:3000/api/timer',{
  //   cache:'force-cache'
  // });

  //   const response=await fetch('http://localhost:3000/api/timer',{
  //   next:{revalidate:10}
  // });
  //Cache for 10 seconds , the fetch fresh data

  // const data = await response.json();

const [fresh,cached,revalidate]=await Promise.all([
  //Always fetch
  fetch('http://localhost:3000/api/timer/utc',{
    cache:'no-store'
  }).then(res=>res.json()),

   fetch('http://localhost:3000/api/timer/iso',{
    cache:'force-cache'
  }).then(res=>res.json()),
   fetch('http://localhost:3000/api/timer/local',{
    next:{revalidate:5}
  }).then(res=>res.json()),
  
])
  return (
    <div>
<h1>Basic Timer (Default Behaviour)</h1>
<p>Fresh (no-store): {fresh.readable}</p>
<p>Cached (force-cache): {cached.readable}</p>
<p>Revalidate (5s): {revalidate.readable}</p>
    </div>
  );
}
