export default function DashboardMainLayout({feed,stats}){
    return (
        <div style={{display:"flex",gap:"20px"}}>
               <div style={{flex:2}}>{feed}</div>
               <div style={{flex:1}}>{stats}</div>

   
        </div>
    )
}