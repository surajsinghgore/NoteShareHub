import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
export default function SkeletonComp({number}) {
 
  return (
    Array(number).fill(0).map((_,index)=>{
return    <div className="card1" key={index}>
<div className="topHomePageSkeleton">
  <div className="profileHomePageSkeleton">
  <Skeleton count={1} height={50} style={{borderRadius:"60px"}}/>
  </div>
  <div className="profileHomePageSkeletonTitle">
  <Skeleton count={1} height={50} />
  </div>
 
</div>
 <div className="profileHomePageSkeletonDescription">
  <Skeleton count={1} height={50} />
  </div>

<div className="profileHomePageSkeletonMedia">
<Skeleton count={1} height={540}/>
</div>
<div className="profileHomePageSkeletonBottom"  >
<Skeleton count={1} height={50} />
</div>
</div>
    })
 
  )
}