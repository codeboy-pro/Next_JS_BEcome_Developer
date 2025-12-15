import Link from "next/link"

export default function DashboardMainLayout({tab1,tab2}){
    
    return (
<div>
<nav style={{marginBottom:"10px"}}>
<Link href={"/dashboard_main/tab1"}>tab1</Link> |{" "}
<Link href={"/dashboard_main/tab2"}>tab2</Link>

</nav>

<div>
    {tab1 }
    {tab2}
</div>
</div>
    )
}